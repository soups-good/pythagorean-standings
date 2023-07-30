export type StandingsData = {
	copyright: string;
	records: StandingsRecord[];
};

export type StandingsRecord = {
	standingsType: string;
	league: IdLink;
	division: IdLink;
	sport: IdLink;
	lastUpdated: string;
	teamRecords: TeamRecord[];
};

export type IdLink = {
	id: number;
	link: string;
};

export type TeamRecord = {
	team: IdNameLink;
	seasion: string;
	streak: {
		streakType: string;
		streakNumber: number;
		streakCode: string;
	};
	divisionRank: string;
	leagueRank: string;
	sportRank: string;
	gamesPlayed: number;
	gamesBack: string;
	wildCardGamesBack: string;
	leagueGamesBack: string;
	springLeagueGamesBack: string;
	sportGamesBack: string;
	divisionGamesBack: string;
	conferenceGamesBack: string;
	leagueRecord: GameRecord & { ties: number };
	lastUpdated: string;
	records: {
		splitRecords: (GameRecord & { type: string })[];
		divisionRecords: (GameRecord & { division: IdNameLink })[];
		overallRecords: (GameRecord & { type: string })[];
		leagueRecords: (GameRecord & { division: IdNameLink })[];
		// Need to calculate xWinLoss to see if it's the same thing as my pythagorean
		expectedRecords: (GameRecord & { type: string })[];
	};
	runsAllowed: number;
	runsScored: number;
	divisionChamp: boolean;
	divisionLeader: boolean;
	hasWildcard: boolean;
	clinched: boolean;
	eliminationNumber: string;
	eliminationNumberSport: string;
	eliminationNumberLeague: string;
	eliminationNumberDivision: string;
	eliminationNumberConference: string;
	wildCardEliminationNumber: string;
	magicNumber: string;
	wins: number;
	losses: number;
	runDifferential: number;
	winningPercentage: number;
};

export type IdNameLink = IdLink & { name: string };

export type GameRecord = {
	wins: number;
	losses: number;
	pct: number;
};
