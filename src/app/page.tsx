"use client";
import { useState, useEffect } from "react";
import { Fixture } from "@/app/components/Fixture";
import { Button } from "@/app/components/ui/button";
import { apiNextMatchday } from "@/app/lib/api-paths";

interface MatchdayData {
  matchday: number;
  status: "past" | "ongoing";
  fixtures: {
    homeTeam: string;
    awayTeam: string;
    time: string;
    competition: string;
    venue: string;
    status: "upcoming" | "live" | "finished";
    actualResult?: { home: number; away: number };
    userPrediction?: { home: number; away: number };
    pointsEarned?: number;
  }[];
}

export default function Index() {
  const [predictions, setPredictions] = useState<
    Record<number, { home: number; away: number }>
  >({});
  const [currentMatchday, setCurrentMatchday] = useState<MatchdayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // On mount, fetch the next matchday for 'To Predict'
  useEffect(() => {
    const fetchNextMatchday = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiNextMatchday());
        if (!response.ok) {
          throw new Error("Failed to fetch next matchday");
        }
        const data = await response.json();
        setCurrentMatchday(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch next matchday");
      } finally {
        setLoading(false);
      }
    };
    fetchNextMatchday();
  }, []);

  const handlePredictionChange = (
    fixtureIndex: number,
    homeScore: number,
    awayScore: number,
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [fixtureIndex]: { home: homeScore, away: awayScore },
    }));
  };

  const allPredictionsSet =
    currentMatchday &&
    Object.keys(predictions).length === (currentMatchday.fixtures?.length ?? 0) &&
    Object.values(predictions).every(
      (pred) => pred.home !== undefined && pred.away !== undefined,
    );

  const handleSubmit = () => {
    if (allPredictionsSet && currentMatchday?.status === "ongoing") {
      console.log("Submitting predictions:", predictions);
      // Here you would typically send predictions to your backend
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-1 container mx-auto px-6 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading matchday {currentMatchday?.matchday}...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !currentMatchday) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-1 container mx-auto px-6 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-4">
                {error || "Failed to load matchday data"}
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 container mx-auto px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold text-foreground">
                Matchday {currentMatchday.matchday} Predictions
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {(currentMatchday.fixtures?.length ?? 0)} fixtures
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Enter your score predictions for each fixture below
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-3 mb-6">
            {currentMatchday.fixtures.map((fixture, index) => (
              <Fixture
                key={index}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                time={fixture.time}
                competition={fixture.competition}
                venue={fixture.venue}
                status={fixture.status}
                onPredictionChange={(home, away) =>
                  handlePredictionChange(index, home, away)
                }
              />
            ))}
          </div>

          <div className="flex justify-center pt-6 border-t border-border">
            <Button
              size="lg"
              className="w-full max-w-md"
              disabled={!allPredictionsSet}
              onClick={handleSubmit}
            >
              Submit All Predictions ({Object.keys(predictions).length}/
              {(currentMatchday.fixtures?.length ?? 0)})
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
