import { Component, OnInit } from '@angular/core';
import { StandingsService } from '../services/standings.service';
import { take, tap } from 'rxjs';
import { StandingsData, StandingsRecord } from '../models/standings-data.model';

@Component({
	selector: 'app-standings-page',
	templateUrl: './standings-page.component.html',
	styleUrls: ['./standings-page.component.scss'],
})
export class StandingsPageComponent implements OnInit {
	data: string[] = [];

	public constructor(private standingsService: StandingsService) {}

	public ngOnInit(): void {
		this.standingsService
			.getStandingsByDivision()
			.pipe(
				tap(standings => {
					console.log(standings);
				}),
				take(1)
			)
			.subscribe();
		this.data.push('');
	}
}
