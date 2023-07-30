import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StandingsPageComponent } from './standings-page/standings-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StandingsService } from './services/standings.service';

@NgModule({
	declarations: [StandingsPageComponent, HeaderComponent, FooterComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatProgressBarModule,
		HttpClientModule,
		MatTableModule,
	],
	providers: [StandingsService],
	bootstrap: [StandingsPageComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
// My goal is to throw a generic material header in, and then maybe do some ng templates with the data and the mat cards?
// It'd be fun to have a toggle on each division's card that lets you switch between pythag and actual standings
// Also want dark/light themes. Should be themed like mlb
