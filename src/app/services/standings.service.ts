import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StandingsData, TeamRecord } from '../models/standings-data.model';
import { Observable, combineLatest, map } from 'rxjs';
import { divisionMap } from '../models/division-map.const';

@Injectable({
	providedIn: 'root',
})
export class StandingsService {
	constructor(private http: HttpClient) {}
	// Set up models for the standings
	public getStandings(): Observable<StandingsData> {
		return combineLatest([
			this.http.get<StandingsData>(
				'https://statsapi.mlb.com/api/v1/standings?leagueId=103'
			),
			this.http.get<StandingsData>(
				'https://statsapi.mlb.com/api/v1/standings?leagueId=104'
			),
		]).pipe(
			map(d =>
				d.reduce((acc, curr) => {
					return {
						...acc,
						records: acc.records.concat(curr.records),
					};
				})
			)
		);
	}

	public getStandingsByDivision(): Observable<Record<string, TeamRecord[]>> {
		return this.getStandings().pipe(
			map(standings => {
				return standings.records.reduce((topAcc, topCurr) => {
					const insideReduce = topCurr.teamRecords.reduce(
						(acc: Record<string, TeamRecord[]>, curr) => {
							if (
								!Array.isArray(
									acc[divisionMap[topCurr.division.id]]
								)
							) {
								acc[divisionMap[topCurr.division.id]] = [];
							}

							acc[divisionMap[topCurr.division.id]].push(curr);
							return acc;
						},
						{}
					);
					return {
						...topAcc,
						...insideReduce,
					};
				}, {});
			})
		);
	}
}
