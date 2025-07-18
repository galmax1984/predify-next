import { NextRequest } from "next/server";

const matchdaysData = [
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
      {
        homeTeam: "Manchester City",
        awayTeam: "Chelsea",
        time: "15:00",
        competition: "Premier League",
        venue: "Etihad Stadium",
        status: "finished",
        actualResult: { home: 3, away: 0 },
        userPrediction: { home: 2, away: 1 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Tottenham",
        awayTeam: "Brighton",
        time: "12:30",
        competition: "Premier League",
        venue: "Tottenham Hotspur Stadium",
        status: "finished",
        actualResult: { home: 1, away: 2 },
        userPrediction: { home: 1, away: 2 },
        pointsEarned: 5,
      },
      {
        homeTeam: "Manchester United",
        awayTeam: "Newcastle",
        time: "15:00",
        competition: "Premier League",
        venue: "Old Trafford",
        status: "finished",
        actualResult: { home: 0, away: 1 },
        userPrediction: { home: 2, away: 0 },
        pointsEarned: 0,
      },
      {
        homeTeam: "West Ham",
        awayTeam: "Aston Villa",
        time: "15:00",
        competition: "Premier League",
        venue: "London Stadium",
        status: "finished",
        actualResult: { home: 2, away: 2 },
        userPrediction: { home: 1, away: 1 },
        pointsEarned: 3,
      },
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
      {
        homeTeam: "Chelsea",
        awayTeam: "Tottenham",
        time: "17:30",
        competition: "Premier League",
        venue: "Stamford Bridge",
        status: "finished",
        actualResult: { home: 2, away: 1 },
        userPrediction: { home: 2, away: 1 },
        pointsEarned: 5,
      },
      {
        homeTeam: "Brighton",
        awayTeam: "Manchester United",
        time: "12:30",
        competition: "Premier League",
        venue: "Amex Stadium",
        status: "finished",
        actualResult: { home: 3, away: 1 },
        userPrediction: { home: 1, away: 2 },
        pointsEarned: 0,
      },
      {
        homeTeam: "Newcastle",
        awayTeam: "Arsenal",
        time: "15:00",
        competition: "Premier League",
        venue: "St. James' Park",
        status: "finished",
        actualResult: { home: 0, away: 2 },
        userPrediction: { home: 0, away: 1 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Aston Villa",
        awayTeam: "Manchester City",
        time: "15:00",
        competition: "Premier League",
        venue: "Villa Park",
        status: "finished",
        actualResult: { home: 1, away: 4 },
        userPrediction: { home: 0, away: 3 },
        pointsEarned: 1,
      },
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
        status: "upcoming" as const,
      },
      {
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        time: "17:30",
        competition: "Premier League",
        venue: "Emirates Stadium",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Tottenham",
        awayTeam: "Newcastle",
        time: "12:30",
        competition: "Premier League",
        venue: "Tottenham Hotspur Stadium",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Manchester United",
        awayTeam: "Brighton",
        time: "15:00",
        competition: "Premier League",
        venue: "Old Trafford",
        status: "upcoming" as const,
      },
      {
        homeTeam: "West Ham",
        awayTeam: "Aston Villa",
        time: "15:00",
        competition: "Premier League",
        venue: "London Stadium",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Crystal Palace",
        awayTeam: "Fulham",
        time: "15:00",
        competition: "Premier League",
        venue: "Selhurst Park",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Everton",
        awayTeam: "Brentford",
        time: "15:00",
        competition: "Premier League",
        venue: "Goodison Park",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Wolves",
        awayTeam: "Sheffield United",
        time: "15:00",
        competition: "Premier League",
        venue: "Molineux Stadium",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Burnley",
        awayTeam: "Luton Town",
        time: "15:00",
        competition: "Premier League",
        venue: "Turf Moor",
        status: "upcoming" as const,
      },
      {
        homeTeam: "Nottingham Forest",
        awayTeam: "Bournemouth",
        time: "15:00",
        competition: "Premier League",
        venue: "City Ground",
        status: "upcoming" as const,
      },
    ],
  },
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ matchday: string }> }
) {
  const { matchday } = await params;
  const matchdayNum = parseInt(matchday, 10);
  const data = matchdaysData.find((m) => m.matchday === matchdayNum);
  if (!data) {
    return new Response(JSON.stringify({ error: "Matchday not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
} 