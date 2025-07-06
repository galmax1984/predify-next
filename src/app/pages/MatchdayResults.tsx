"use client";
import { useParams } from "next/navigation";
import { PastFixture } from "@/app/components/PastFixture";

interface FixtureData {
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  competition: string;
  venue: string;
  actualResult: { home: number; away: number };
  userPrediction: { home: number; away: number };
  pointsEarned: number;
}

interface MatchdayData {
  matchday: number;
  date: string;
  fixtures: FixtureData[];
}

// Mock data for different matchdays
const matchdayData: Record<string, MatchdayData> = {
  "8": {
    matchday: 8,
    date: "Oct 27, 2024",
    fixtures: [
      {
        homeTeam: "Arsenal",
        awayTeam: "Liverpool",
        time: "17:30",
        date: "Oct 27",
        competition: "Premier League",
        venue: "Emirates Stadium",
        actualResult: { home: 2, away: 1 },
        userPrediction: { home: 1, away: 1 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Manchester City",
        awayTeam: "Chelsea",
        time: "15:00",
        date: "Oct 27",
        competition: "Premier League",
        venue: "Etihad Stadium",
        actualResult: { home: 3, away: 0 },
        userPrediction: { home: 2, away: 1 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Tottenham",
        awayTeam: "Brighton",
        time: "12:30",
        date: "Oct 27",
        competition: "Premier League",
        venue: "Tottenham Hotspur Stadium",
        actualResult: { home: 1, away: 2 },
        userPrediction: { home: 1, away: 2 },
        pointsEarned: 5,
      },
      {
        homeTeam: "Manchester United",
        awayTeam: "Newcastle",
        time: "15:00",
        date: "Oct 27",
        competition: "Premier League",
        venue: "Old Trafford",
        actualResult: { home: 0, away: 1 },
        userPrediction: { home: 2, away: 0 },
        pointsEarned: 0,
      },
      {
        homeTeam: "West Ham",
        awayTeam: "Aston Villa",
        time: "15:00",
        date: "Oct 27",
        competition: "Premier League",
        venue: "London Stadium",
        actualResult: { home: 2, away: 2 },
        userPrediction: { home: 1, away: 1 },
        pointsEarned: 3,
      },
    ],
  },
  "9": {
    matchday: 9,
    date: "Nov 3, 2024",
    fixtures: [
      {
        homeTeam: "Liverpool",
        awayTeam: "Crystal Palace",
        time: "15:00",
        date: "Nov 3",
        competition: "Premier League",
        venue: "Anfield",
        actualResult: { home: 1, away: 0 },
        userPrediction: { home: 2, away: 0 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Chelsea",
        awayTeam: "Tottenham",
        time: "17:30",
        date: "Nov 3",
        competition: "Premier League",
        venue: "Stamford Bridge",
        actualResult: { home: 2, away: 1 },
        userPrediction: { home: 2, away: 1 },
        pointsEarned: 5,
      },
      {
        homeTeam: "Brighton",
        awayTeam: "Manchester United",
        time: "12:30",
        date: "Nov 3",
        competition: "Premier League",
        venue: "Amex Stadium",
        actualResult: { home: 3, away: 1 },
        userPrediction: { home: 1, away: 2 },
        pointsEarned: 0,
      },
      {
        homeTeam: "Newcastle",
        awayTeam: "Arsenal",
        time: "15:00",
        date: "Nov 3",
        competition: "Premier League",
        venue: "St. James' Park",
        actualResult: { home: 0, away: 2 },
        userPrediction: { home: 0, away: 1 },
        pointsEarned: 1,
      },
      {
        homeTeam: "Aston Villa",
        awayTeam: "Manchester City",
        time: "15:00",
        date: "Nov 3",
        competition: "Premier League",
        venue: "Villa Park",
        actualResult: { home: 1, away: 4 },
        userPrediction: { home: 0, away: 3 },
        pointsEarned: 1,
      },
    ],
  },
};

export default function MatchdayResults() {
  const params = useParams();
  const matchday = params?.matchday as string;
  const data = matchdayData[matchday || "9"];

  if (!data) {
    return (
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold">Matchday not found</h1>
      </div>
    );
  }

  const getTotalPoints = () => {
    return data.fixtures.reduce(
      (total: number, fixture: FixtureData) => total + fixture.pointsEarned,
      0,
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
            Matchday {data.matchday} Results
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{data.date}</span>
            <span className="text-sm text-gray-500">
              Total Points:{" "}
              <span className="font-medium text-blue-600">
                {getTotalPoints()}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.fixtures.map((fixture: FixtureData, index: number) => (
            <PastFixture
              key={index}
              homeTeam={fixture.homeTeam}
              awayTeam={fixture.awayTeam}
              time={fixture.time}
              date={fixture.date}
              competition={fixture.competition}
              venue={fixture.venue}
              actualResult={fixture.actualResult}
              userPrediction={fixture.userPrediction}
              pointsEarned={fixture.pointsEarned}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
