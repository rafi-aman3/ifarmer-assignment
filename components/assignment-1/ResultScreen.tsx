"use client";
import { newGame, resetGame } from "@/store/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePlayerStats } from "@/store/leaderboardSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Medal, RotateCcw, Target, Trophy, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const ResultScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const gameState = useAppSelector((state) => state.game);
  const {
    player1,
    player2,
    matchWinner,
    player1Score,
    player2Score,
    player1Wins,
    player2Wins,
    round,
  } = gameState;

  useEffect(() => {
    if (!player1 || !player2) {
      router.push("/");
      return;
    }

    dispatch(
      updatePlayerStats({
        player1,
        player2,
        player1Score,
        player2Score,
        matchWinner,
      })
    );
  }, [
    dispatch,
    player1,
    player2,
    player1Score,
    player2Score,
    matchWinner,
    router,
  ]);

  const handleNewMatch = () => {
    dispatch(newGame());
    router.push("/");
  };

  const handleRematch = () => {
    dispatch(resetGame());
    router.push("/assignment-1/game");
  };

  const handleViewLeaderboard = () => {
    router.push("/assignment-1/leaderboard");
  };

  if (!player1 || !player2) return null;

  const isEarlyWin = round < 5;
  const isDraw = !matchWinner;
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        <Card className="text-center py-4 md:py-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
          <CardHeader className=" px-4 md:px-6 pb-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              {isDraw ? (
                <Target className="w-10 h-10 text-white" />
              ) : (
                <Trophy className="w-10 h-10 text-white" />
              )}
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              {isDraw ? (
                <span className="text-orange-600">🤝 Match Draw!</span>
              ) : (
                <span className="text-yellow-600">🎉 {matchWinner} Wins!</span>
              )}
            </CardTitle>
            {isEarlyWin && !isDraw && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Victory achieved in {round} rounds!
              </p>
            )}
          </CardHeader>
        </Card>

        <Card className=" md:py-6 py-4">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Final Match Results
            </CardTitle>
          </CardHeader>
          <CardContent className=" md:px-6 px-4">
            <div className="grid grid-cols-2 gap-2 md:gap-6">
              <div
                className={`text-center p-2 md:p-4 rounded-sm md:rounded-lg ${
                  matchWinner === player1
                    ? "bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  {matchWinner === player1 && (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  )}
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    ✕
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">{player1}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">{player1Score}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Points
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {player1Wins} round wins
                  </Badge>
                </div>
              </div>

              <div
                className={`text-center p-2 md:p-4 rounded-sm md:rounded-lg ${
                  matchWinner === player2
                    ? "bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  {matchWinner === player2 && (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  )}
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    ○
                  </div>
                  <h3 className="text-xl font-bold text-red-600">{player2}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">{player2Score}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Points
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {player2Wins} round wins
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:py-6 py-4">
          <CardHeader>
            <CardTitle className="text-center">Match Summary</CardTitle>
          </CardHeader>
          <CardContent className=" px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{round}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rounds Played
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {player1Wins + player2Wins}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Wins
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {round - player1Wins - player2Wins}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Draws
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {player1Score + player2Score}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Points
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleRematch}
            size="lg"
            className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Rematch
          </Button>

          <Button
            onClick={handleViewLeaderboard}
            size="lg"
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Medal className="w-5 h-5" />
            Leaderboard
          </Button>

          <Button
            onClick={handleNewMatch}
            size="lg"
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            New Players
          </Button>
        </div>
      </div>
    </div>
  );
};
