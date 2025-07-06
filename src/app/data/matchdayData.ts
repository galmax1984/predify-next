// Stubbed matchday data and data access functions

export const matchdaysData = [
  {
    matchday: 8,
    status: "past",
    fixtures: [
      {
        homeTeam: "Arsenal",
        awayTeam: "Liverpool",
        time: "17:30",
        competition: "Premier League",
        venue: "Emirates Stadium",
        status: "finished",
        actualResult: { home: 2, away: 1 },
        userPrediction: { home: 1, away: 1 },
        pointsEarned: 1,
      },
      // ... more fixtures ...
    ],
  },
  {
    matchday: 9,
    status: "past",
    fixtures: [
      {
        homeTeam: "Liverpool",
        awayTeam: "Crystal Palace",
        time: "15:00",
        competition: "Premier League",
        venue: "Anfield",
        status: "finished",
        actualResult: { home: 1, away: 0 },
        userPrediction: { home: 2, away: 0 },
        pointsEarned: 1,
      },
      // ... more fixtures ...
    ],
  },
  {
    matchday: 10,
    status: "ongoing",
    fixtures: [
      {
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        time: "15:00",
        competition: "Premier League",
        venue: "Etihad Stadium",
        status: "upcoming",
      },
      {
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        time: "17:30",
        competition: "Premier League",
        venue: "Emirates Stadium",
        status: "upcoming",
      },
      // ... more fixtures ...
    ],
  },
];

export function getNextMatchday() {
  return matchdaysData.find((m) => m.status === "ongoing") || matchdaysData[matchdaysData.length - 1];
}

export function getPreviousMatchdays() {
  return matchdaysData
    .filter((m) => m.status === "past")
    .map((m) => ({ matchday: m.matchday, date: `Mock Date for ${m.matchday}` }));
}

export function getMatchdayById(id: number) {
  return matchdaysData.find((m) => m.matchday === id);
} 