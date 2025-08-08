"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearLeaderboard, loadLeaderboard } from "@/store/leaderboardSlice";
import {
  ArrowLeft,
  Award,
  Medal,
  Target,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { newGame } from "@/store/gameSlice";

export const LeaderboardScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { players } = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(loadLeaderboard());
  }, [dispatch]);

  const playerList = Object.values(players).sort((a, b) => {
    // Sort by total score first, then by win rate
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    const aWinRate = a.gamesPlayed > 0 ? a.wins / a.gamesPlayed : 0;
    const bWinRate = b.gamesPlayed > 0 ? b.wins / b.gamesPlayed : 0;
    return bWinRate - aWinRate;
  });

  const handleClearLeaderboard = () => {
    if (
      confirm(
        "Are you sure you want to clear the leaderboard? This action cannot be undone."
      )
    ) {
      dispatch(clearLeaderboard());
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">
            {index + 1}
          </div>
        );
    }
  };

  const getWinRate = (player: (typeof playerList)[0]) => {
    if (player.gamesPlayed === 0) return 0;
    return Math.round((player.wins / player.gamesPlayed) * 100);
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 1:
        return "bg-gray-100 text-gray-800 border-gray-300";
      case 2:
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <p className=" hidden md:block">Back</p>
          </Button>
          <h1 className="text-lg md:text-4xl font-bold text-center flex items-center gap-2">
            <Trophy className=" size-5 md:size-8 text-yellow-500" />
            Leaderboard
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              dispatch(newGame());
              router.push("/");
            }}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <p className=" hidden md:block">New Game</p>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4">
          <Card className=" rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
            <CardContent className=" p-0 md:p-4 text-center">
              <Users className="size-6 md:size-8 mx-auto mb-2 text-blue-600" />
              <p className=" text-xl md:text-2xl font-bold">
                {playerList.length}
              </p>
              <p className=" text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Total Players
              </p>
            </CardContent>
          </Card>
          <Card className="rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
            <CardContent className=" p-0 md:p-4 text-center">
              <Target className="size-6 md:size-8 mx-auto mb-2 text-green-600" />
              <p className="text-xl md:text-2xl font-bold">
                {playerList.reduce(
                  (sum, player) => sum + player.gamesPlayed,
                  0
                )}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Games Played
              </p>
            </CardContent>
          </Card>
          <Card className="rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
            <CardContent className=" p-0 md:p-4 text-center">
              <Trophy className=" size-6 md:size-8 mx-auto mb-2 text-yellow-600" />
              <p className="text-xl md:text-2xl font-bold">
                {playerList.reduce((sum, player) => sum + player.totalScore, 0)}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Total Points
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded md:rounded-xl py-4 md:py-6 gap-4 md:gap-6  px-4 md:px-6">
          <CardHeader className="flex px-0 md:px-4 flex-row items-center justify-between">
            <CardTitle className="text-xl">Player Rankings</CardTitle>
            {playerList.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearLeaderboard}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent className=" px-0 md:px-6">
            {playerList.length === 0 ? (
              <Alert>
                <Trophy className="h-4 w-4" />
                <AlertDescription>
                  No games played yet. Start a new game to see players on the
                  leaderboard!
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2 md:space-y-4">
                {playerList.map((player, index) => (
                  <div
                    key={player.name}
                    className={`flex items-center justify-between p-3 md:p-4 rounded-sm md:rounded-lg border-2 transition-all duration-200 ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950 dark:to-amber-950 dark:border-yellow-800"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index)}
                        <Badge className={getRankBadgeColor(index)}>
                          #{index + 1}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{player.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {player.gamesPlayed} games • {getWinRate(player)}% win
                          rate
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {player.totalScore}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Stats */}
        {playerList.length > 0 && (
          <Card className="rounded md:rounded-xl py-4 md:py-6 gap-4 md:gap-6  px-4 md:px-6">
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent className=" px-0 md:px-6">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Player</th>
                      <th className="text-center p-2">Games</th>
                      <th className="text-center p-2">Wins</th>
                      <th className="text-center p-2">Losses</th>
                      <th className="text-center p-2">Draws</th>
                      <th className="text-center p-2">Win Rate</th>
                      <th className="text-center p-2">Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerList.map((player) => (
                      <tr
                        key={player.name}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-2 font-medium">{player.name}</td>
                        <td className="text-center p-2">
                          {player.gamesPlayed}
                        </td>
                        <td className="text-center p-2 text-green-600">
                          {player.wins}
                        </td>
                        <td className="text-center p-2 text-red-600">
                          {player.losses}
                        </td>
                        <td className="text-center p-2 text-yellow-600">
                          {player.draws}
                        </td>
                        <td className="text-center p-2">
                          {getWinRate(player)}%
                        </td>
                        <td className="text-center p-2 font-bold text-blue-600">
                          {player.totalScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
