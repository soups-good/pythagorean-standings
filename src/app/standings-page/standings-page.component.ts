import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-standings-page',
	templateUrl: './standings-page.component.html',
	styleUrls: ['./standings-page.component.scss'],
})
export class StandingsPageComponent implements OnInit {
	data: string[] = [];

	public ngOnInit(): void {
		this.data.push('');
	}
}
