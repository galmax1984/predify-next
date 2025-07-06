import { Badge } from "@/app/components/ui/badge";

interface PastFixtureProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  competition: string;
  venue?: string;
  actualResult: { home: number; away: number };
  userPrediction: { home: number; away: number };
  pointsEarned: number;
}

export function PastFixture({
  homeTeam,
  awayTeam,
  time,
  date,

  actualResult,
  userPrediction,
  pointsEarned,
}: PastFixtureProps) {
  const getPointsColor = (points: number) => {
    if (points === 5) return "text-green-600 bg-green-100 border-green-300";
    if (points === 3) return "text-blue-600 bg-blue-100 border-blue-300";
    if (points === 1) return "text-yellow-600 bg-yellow-100 border-yellow-300";
    return "text-red-600 bg-red-100 border-red-300";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors shadow-sm">
      {/* Header with Date/Time and Points */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs bg-primary/10 text-primary border-primary/20"
          >
            {date.replace(", 2024", "")}
          </Badge>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <Badge
          className={`text-xs font-semibold ${getPointsColor(pointsEarned)}`}
          variant="outline"
        >
          +{pointsEarned}
        </Badge>
      </div>

      {/* Teams and Scores */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground flex-1">
            {homeTeam}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-black rounded text-center flex items-center justify-center text-gray-600">
              <span className="text-xs font-bold">{actualResult.home}</span>
            </div>
            <div className="w-7 h-7 bg-blue-100 border border-blue-300 rounded text-center flex items-center justify-center">
              <span className="text-xs font-bold text-blue-700">
                {userPrediction.home}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground flex-1">
            {awayTeam}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-black rounded text-center flex items-center justify-center text-black">
              <span className="text-xs font-bold">{actualResult.away}</span>
            </div>
            <div className="w-7 h-7 bg-blue-100 border border-blue-300 rounded text-center flex items-center justify-center">
              <span className="text-xs font-bold text-blue-700">
                {userPrediction.away}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Result Type */}
      <div className="flex items-center justify-between pt-2 border-t border-border" />
    </div>
  );
}
