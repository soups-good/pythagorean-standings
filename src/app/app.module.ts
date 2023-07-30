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
// TODOs left - add more data, maybe make a toggle to switch the pythag vs not pythag
// Enable sorting? Stretch goal - MatTableDataSource
// Text overflow?
// I think the current responsive is fine, but the scrollbar would be nice
// Frankly, I could deploy just this right now and see what happens
// Google analytics!
