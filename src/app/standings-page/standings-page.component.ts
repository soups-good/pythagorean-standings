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
	data: { division: string; teamRecords: TeamRecord[] }[] = [];

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
								teamRecords: TeamRecord[];
							}[],
							[key, value]
						) => {
							acc.push({
								division: key,
								teamRecords: value,
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
}
