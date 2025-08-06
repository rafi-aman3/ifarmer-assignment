"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Button } from "../ui/button";
import { RotateCcw, Target, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export const GameBoard = () => {
  const { player1, player2 } = useAppSelector((state) => state.game);
  const round = 5;
  const player1Score = 10;
  const board = [0,1,2,3,4,5,6,7,8,9]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            // onClick={() => router.push('/leaderboard')}
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Round {round} of 5
          </h1>
          <Button
            variant="outline"
            // onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            New Game
          </Button>
        </div>

        {/* Score Board */}
        <Card className="bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    ✕
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">{player1}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{player1Score} points</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    player1Wins round wins
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    ○
                  </div>
                  <h3 className="text-xl font-bold text-red-600">{player2}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">player2Score points</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    player2Wins round wins
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Status */}
        <Card>
          <CardContent className="p-6 text-center">
            {/* {gameStatus === 'playing' && ( */}
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <p className="text-lg">
                <span className="font-semibold">getCurrentPlayerName</span>'s
                turn
                <Badge variant="outline" className="ml-2">
                  currentPlayer
                </Badge>
              </p>
            </div>
            {/* )} */}

            {/* {gameStatus === 'won' && roundWinner && ( */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <p className="text-xl font-bold text-green-600">
                  🎉 roundWinner wins this round!
                </p>
              </div>
              <Button
                // onClick={handleNextRound}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                Next Round
              </Button>
            </div>
            {/* )} */}

            {/* {gameStatus === 'draw' && ( */}
            <div className="space-y-4">
              <p className="text-xl font-bold text-orange-600">
                🤝 It's a draw!
              </p>
              <Button
                // onClick={handleNextRound}
                size="lg"
                variant="outline"
              >
                Next Round
              </Button>
            </div>
            {/* )} */}
          </CardContent>
        </Card>

        {/* Game Board */}
        <Card className="mx-auto max-w-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-2 mx-auto w-fit">
              {board.map((cell, index) => (
                <button
                  key={index}
                  // onClick={() => handleCellClick(index)}
                  // disabled={!!cell || gameStatus !== "playing"}
                  // className={getCellClassName(index)}
                >
                  getCellContent(index)
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        {/* {gameStatus === "playing" && ( */}
          <div className="text-center">
            <Button
              // onClick={handleResetBoard}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Board
            </Button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};
