"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOutIcon, RotateCcw, Target, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { makeMove, nextRound, resetBoard, resetGame } from "@/store/gameSlice";
import { useRouter } from "next/navigation";

export const GameBoard = () => {
  const dispatch = useAppDispatch();
  const {
    player1,
    player2,
    board,
    gameStatus,
    winner,
    round,
    currentTurn,
    player1Score,
    player1Wins,
    player2Score,
    player2Wins,
    roundWinner,
    matchComplete,
  } = useAppSelector((state) => state.game);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const handleCellClick = (index: number) => {
    if (board[index] || gameStatus !== "playing") return;

    dispatch(makeMove(index));
  };

  const router = useRouter();

  const handleExitGame = () => {
    dispatch(resetGame());
    router.push("/");
  };

  const getCellContent = (index: number) => {
    const value = board[index];
    if (!value) return "";
    return value === "X" ? "✕" : "○";
  };

  const getCellClassName = (index: number) => {
    const isWinningCell = winningLine?.includes(index);
    const hasValue = !!board[index];
    const isXCell = board[index] === "X";
    const isOCell = board[index] === "O";

    let baseClasses =
      "relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 text-4xl md:text-5xl lg:text-6xl font-black border-4 transition-colors duration-200";

    // Background and border styling
    if (isWinningCell) {
      baseClasses +=
        " bg-gradient-to-br from-green-200 to-green-300 dark:from-green-600 dark:to-green-700 border-green-400 dark:border-green-500 shadow-lg";
    } else if (hasValue) {
      baseClasses +=
        " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600";
    } else {
      baseClasses +=
        " bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500";
    }

    // Text color
    if (isXCell) {
      baseClasses += " text-blue-600 dark:text-blue-400";
    } else if (isOCell) {
      baseClasses += " text-red-600 dark:text-red-400";
    }

    // Interactive states - simplified
    if (gameStatus !== "playing" || hasValue) {
      baseClasses += " cursor-not-allowed";
    } else {
      baseClasses += " cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700";
    }

    return baseClasses;
  };

  const getCurrentPlayerName = () => {
    return currentTurn === "X" ? player1 : player2;
  };

  const getWinningLine = (board: (string | null)[]): number[] | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [a, b, c];
      }
    }
    return null;
  };

  const handleNextRound = () => {
    setWinningLine(null);
    dispatch(nextRound());
  };

  const handleResetBoard = () => {
    setWinningLine(null);
    dispatch(resetBoard());
  };

  useEffect(() => {
    if (!player1 || !player2) {
      router.push("/");
    }
  }, [player1, player2, router]);

  useEffect(() => {
    if (gameStatus === "won") {
      const line = getWinningLine(board);
      setWinningLine(line);
    } else {
      setWinningLine(null);
    }
  }, [gameStatus, board]);

  useEffect(() => {
    if (matchComplete) {
      router.push("/victory");
    }
  }, [matchComplete, router]);

  if (!player1 || !player2) return null;

  return (
    <div className="container h-full mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            // onClick={() => router.push("/leaderboard")}
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            TIC TAC TOE
          </h1>
          <Button
            variant="outline"
            onClick={handleExitGame}
            className="flex items-center gap-2"
          >
            Exit Game
            <LogOutIcon />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 h-full">
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="relative">
            <Card className="p-8 rounded-3xl shadow-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-2xl">
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => handleCellClick(index)}
                      disabled={!!cell || gameStatus !== "playing"}
                      className={getCellClassName(index)}
                      style={{ borderRadius: "20px" }}
                    >
                      <span className="relative z-10 drop-shadow-lg text-6xl md:text-7xl">
                        {getCellContent(index)}
                      </span>
                      {!cell && gameStatus === "playing" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100/20 dark:to-blue-900/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {gameStatus === "playing" && (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <Button
                  onClick={handleResetBoard}
                  variant="outline"
                  className="flex items-center gap-2 rounded-full px-6 py-3 hover:scale-105 transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Round
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Current Turn
              </h3>

              {gameStatus === "playing" && (
                <div className="space-y-3">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ${
                      currentTurn === "X"
                        ? "bg-gradient-to-br from-blue-500 to-blue-700"
                        : "bg-gradient-to-br from-red-500 to-red-700"
                    }`}
                  >
                    {currentTurn}
                  </div>
                  <p className="text-xl font-bold">{getCurrentPlayerName()}</p>
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div>
                </div>
              )}

              {gameStatus === "won" && roundWinner && (
                <div className="space-y-4">
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
                  <p className="text-lg font-bold text-green-600">
                    🎉 {roundWinner} Wins!
                  </p>
                  <Button
                    onClick={handleNextRound}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Next Round
                  </Button>
                </div>
              )}

              {gameStatus === "draw" && (
                <div className="space-y-4">
                  <Target className="w-12 h-12 text-orange-500 mx-auto" />
                  <p className="text-lg font-bold text-orange-600">🤝 Draw!</p>
                  <Button
                    onClick={handleNextRound}
                    variant="outline"
                    className="w-full"
                  >
                    Next Round
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                Round {round} of 5
              </h3>

              <div className="flex justify-center gap-2 mb-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i < round - 1
                        ? "bg-green-500 text-white"
                        : i === round - 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ✕
                    </div>
                    <span className="font-medium text-blue-600">{player1}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{player1Score}</p>
                    <p className="text-xs text-gray-500">{player1Wins} wins</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ○
                    </div>
                    <span className="font-medium text-red-600">{player2}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{player2Score}</p>
                    <p className="text-xs text-gray-500">{player2Wins} wins</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
