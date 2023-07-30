import { Component, OnInit } from '@angular/core';
import { StandingsService } from '../services/standings.service';
import { take, tap } from 'rxjs';
import { TeamRecord } from '../models/standings-data.model';

@Component({
	selector: 'app-standings-page',
	templateUrl: './standings-page.component.html',
	styleUrls: ['./standings-page.component.scss'],
})
export class StandingsPageComponent implements OnInit {
	data: {
		division: string;
		teamRecords: (TeamRecord & {
			pythagoreanWins: number;
			pythagoreanLosses: number;
			pythagoreanPct: string;
		})[];
	}[] = [];

	displayedColumns: string[] = ['team', 'pyWins', 'pyLosses', 'pyPct'];

	public constructor(private standingsService: StandingsService) {}

	public ngOnInit(): void {
		this.standingsService
			.getStandingsByDivision()
			.pipe(
				tap(standings => {
					this.data = Object.entries(standings).reduce(
						(
							acc: {
								division: string;
								teamRecords: (TeamRecord & {
									pythagoreanWins: number;
									pythagoreanLosses: number;
									pythagoreanPct: string;
								})[];
							}[],
							[division, teamRecords]
						) => {
							const teamRecordsWithPythagoras = teamRecords.map(
								d => this.calculatePythagoreanExpectation(d)
							);
							acc.push({
								division,
								teamRecords: teamRecordsWithPythagoras.sort(
									(a, b) =>
										+b.pythagoreanPct - +a.pythagoreanPct
								),
							});
							return acc;
						},
						[]
					);
				}),
				take(1)
			)
			.subscribe();
	}

	private calculatePythagoreanExpectation(
		teamRecord: TeamRecord
	): TeamRecord & {
		pythagoreanWins: number;
		pythagoreanLosses: number;
		pythagoreanPct: string;
	} {
		const gamesPlayed = teamRecord.gamesPlayed;
		const runDifferential = Math.pow(
			teamRecord.runsAllowed / teamRecord.runsScored,
			2
		);
		const pythagoreanPct = 1 / (1 + runDifferential);
		const pythagoreanWins = Math.round(pythagoreanPct * gamesPlayed);
		const pythagoreanLosses = Math.round(gamesPlayed - pythagoreanWins);

		return {
			...teamRecord,
			pythagoreanWins,
			pythagoreanLosses,
			pythagoreanPct: pythagoreanPct.toPrecision(3),
		};
	}
}
