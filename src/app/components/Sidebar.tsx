"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCountdown } from "@/app/hooks/useCountdown";

export function Sidebar() {
  const pathname = usePathname();
  const [isResultsOpen, setIsResultsOpen] = useState(true);

  // Get next matchday earliest match time (for demo, using a future date)
  const nextMatchdayEarliestMatch = new Date("2025-07-07T12:30:00");
  const nextMatchCountdown = useCountdown(nextMatchdayEarliestMatch);

  const previousMatchdays = [
    { matchday: 9, date: "Nov 3" },
    { matchday: 8, date: "Oct 27" },
    { matchday: 7, date: "Oct 20" },
    { matchday: 6, date: "Oct 13" },
    { matchday: 5, date: "Oct 6" },
    { matchday: 4, date: "Sep 29" },
  ];

  const isCurrentPage = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg border-r border-gray-200">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
          FootballForecast
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        {/* Main tabs */}
        <div className="space-y-1 mb-8">
          <Link href="/">
            <div
              className={`px-3 py-2 text-sm font-medium transition-colors flex items-center justify-between ${
                isCurrentPage("/")
                  ? "text-gray-900 border-b-2 border-blue-500 bg-transparent"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>To Predict</span>
              {nextMatchCountdown.total > 0 && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                  {nextMatchCountdown.days > 0
                    ? `${nextMatchCountdown.days}d ${nextMatchCountdown.hours}h`
                    : `${nextMatchCountdown.hours}h`}
                </span>
              )}
            </div>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsResultsOpen(!isResultsOpen)}
              className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-between transition-colors"
            >
              <span>Results 123</span>
              {isResultsOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isResultsOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-200 pl-4">
                {previousMatchdays.map((md) => (
                  <Link key={md.matchday} href={`/matchday/${md.matchday}`}>
                    <div
                      className={`px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                        isCurrentPage(`/matchday/${md.matchday}`)
                          ? "text-blue-600 bg-blue-50 border-l-2 border-blue-500 -ml-4 pl-6"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <span>Matchday {md.matchday}</span>
                      <span className="text-xs text-gray-400">{md.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/leaderboard">
            <div
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isCurrentPage("/leaderboard")
                  ? "text-gray-900 border-b-2 border-blue-500 bg-transparent"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Leaderboard
            </div>
          </Link>
        </div>
      </nav>

      {/* Current Matchday Info */}
      <div className="p-6 border-t border-gray-100">
        <div className="text-xs text-gray-500 font-medium">
          Current: Matchday 10
        </div>
      </div>
    </div>
  );
}
