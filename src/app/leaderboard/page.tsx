"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  positionChange: number; // positive for up, negative for down, 0 for no change
}

const playerNames = [
  "Alex Johnson",
  "Sarah Wilson",
  "Mike Chen",
  "Emma Davis",
  "Tom Rodriguez",
  "Lisa Thompson",
  "David Kim",
  "Rachel Green",
  "James Brown",
  "Anna Martinez",
  "Chris Taylor",
  "Sophie Anderson",
  "Ryan Lee",
  "Maya Patel",
  "Lucas White",
  "Zoe Clark",
  "Nathan Hall",
  "Olivia Young",
  "Daniel Garcia",
  "Grace Miller",
  "Ethan Jones",
  "Chloe Wright",
  "Mason Lopez",
  "Ava Scott",
  "Noah Turner",
  "Mia Adams",
  "Liam Baker",
  "Isabella Cooper",
  "Benjamin Ward",
  "Charlotte Hill",
];

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const data: LeaderboardEntry[] = Array.from({ length: 30 }, (_, i) => ({
      rank: i + 1,
      playerName: playerNames[i],
      wins: Math.floor(Math.random() * 20) + 5,
      draws: Math.floor(Math.random() * 15) + 2,
      losses: Math.floor(Math.random() * 10) + 1,
      points: 0,
      positionChange: Math.floor(Math.random() * 11) - 5,
    }))
      .map((entry) => ({
        ...entry,
        points: entry.wins * 3 + entry.draws * 1,
      }))
      .sort((a, b) => b.points - a.points);
    setLeaderboardData(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 text-sm">
            Current standings for all players
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-gray-200"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50">
                  <TableHead className="w-16 text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    Rank
                  </TableHead>
                  <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    Player Name
                  </TableHead>
                  <TableHead className="text-center w-16 text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    W
                  </TableHead>
                  <TableHead className="text-center w-16 text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    D
                  </TableHead>
                  <TableHead className="text-center w-16 text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    L
                  </TableHead>
                  <TableHead className="text-center w-20 text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    Points
                  </TableHead>
                  <TableHead className="text-center w-20 text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                    Change
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {leaderboardData
                  .filter((entry) =>
                    entry.playerName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )
                  .map((entry, index) => (
                    <TableRow
                      key={entry.rank}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <TableCell className="text-center font-medium text-gray-900 py-4">
                        #{entry.rank}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 py-4">
                        {entry.playerName}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {entry.wins}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          {entry.draws}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          {entry.losses}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold text-lg text-gray-900 py-4">
                        {entry.points}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex items-center justify-center gap-1">
                          {entry.positionChange > 0 ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <ChevronUp className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                {entry.positionChange}
                              </span>
                            </div>
                          ) : entry.positionChange < 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <ChevronDown className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                {Math.abs(entry.positionChange)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
