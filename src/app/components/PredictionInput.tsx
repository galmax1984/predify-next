"use client";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";

interface PredictionInputProps {
  homeTeam: string;
  awayTeam: string;
  onPredictionChange?: (homeScore: number, awayScore: number) => void;
}

export function PredictionInput({
  homeTeam,
  awayTeam,
  onPredictionChange,
}: PredictionInputProps) {
  const [homeScore, setHomeScore] = useState<string>("");
  const [awayScore, setAwayScore] = useState<string>("");

  const handleHomeScoreChange = (value: string) => {
    const numValue = value.replace(/\D/g, "").slice(0, 2);
    setHomeScore(numValue);
    if (onPredictionChange && numValue && awayScore) {
      onPredictionChange(parseInt(numValue), parseInt(awayScore));
    }
  };

  const handleAwayScoreChange = (value: string) => {
    const numValue = value.replace(/\D/g, "").slice(0, 2);
    setAwayScore(numValue);
    if (onPredictionChange && homeScore && numValue) {
      onPredictionChange(parseInt(homeScore), parseInt(numValue));
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Input
        value={homeScore}
        onChange={(e) => handleHomeScoreChange(e.target.value)}
        className="w-14 h-10 text-center text-lg font-bold bg-muted/50 border border-border rounded-lg px-1.5 py-0.5"
        placeholder="0"
        maxLength={2}
      />
      <div className="flex items-center gap-3 flex-1 justify-center px-4">
        <span className="text-sm font-semibold text-foreground">
          {homeTeam}
        </span>
        <span className="text-muted-foreground text-lg font-bold">-</span>
        <span className="text-sm font-semibold text-foreground">
          {awayTeam}
        </span>
      </div>
      <Input
        value={awayScore}
        onChange={(e) => handleAwayScoreChange(e.target.value)}
        className="w-14 h-10 text-center text-lg font-bold bg-muted/50 border border-border rounded-lg px-1.5 py-0.5"
        placeholder="0"
        maxLength={2}
      />
    </div>
  );
}
