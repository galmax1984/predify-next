"use client";
import { Badge } from "@/app/components/ui/badge";
import { PredictionInput } from "./PredictionInput";

interface FixtureProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  competition: string;
  status?: "upcoming" | "live" | "finished";
  venue?: string;
  onPredictionChange?: (homeScore: number, awayScore: number) => void;
}

export function Fixture({
  homeTeam,
  awayTeam,
  time,
  competition,
  status = "upcoming",
  venue,
  onPredictionChange,
}: FixtureProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "finished":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-1.5 hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Badge
          variant="outline"
          className={`text-xs ${getStatusColor(status)}`}
        >
          {time}
        </Badge>
        <span className="text-xs text-muted-foreground">{competition}</span>
        {venue && (
          <span className="text-xs text-muted-foreground hidden sm:inline">
            • {venue}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center">
        <PredictionInput
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          onPredictionChange={onPredictionChange}
        />
      </div>
    </div>
  );
}
