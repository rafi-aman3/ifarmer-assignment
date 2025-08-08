"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOutIcon, RotateCcw, Target, Trophy } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { makeMove, nextRound, resetBoard, resetGame } from "@/store/gameSlice";
import { useRouter } from "next/navigation";

export const GameBoard = () => {
  const dispatch = useAppDispatch();
  const {
    player1,
    player2,
    board,
    gameStatus,
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
      "relative w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 text-4xl md:text-5xl lg:text-6xl font-black border-2 md:border-4 transition-colors duration-200 group";

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

    if (isXCell) {
      baseClasses += " text-blue-600 dark:text-blue-400";
    } else if (isOCell) {
      baseClasses += " text-red-600 dark:text-red-400";
    }

    if (gameStatus !== "playing" || hasValue) {
      baseClasses += " cursor-not-allowed";
    } else {
      baseClasses += " cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700";

      // Add hover effects for current turn preview
      if (currentTurn === "X") {
        baseClasses += " hover:border-blue-500 dark:hover:border-blue-400";
      } else {
        baseClasses += " hover:border-red-500 dark:hover:border-red-400";
      }
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
      router.push("/assignment-1/result");
    }
  }, [matchComplete, router]);

  if (!player1 || !player2) return null;

  return (
    <div className="container h-full mx-auto px-0 md:px-4 py-4 md:py-8">
      <div className="container mx-auto px-4 pt-0 pb-8 md:py-8">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push("/assignment-1/leaderboard")}
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <p className=" hidden md:block">Leaderboard</p>
          </Button>
          <h1 className="text-xl md:text-3xl font-bold text-center">
            TIC TAC TOE
          </h1>
          <Button
            variant="outline"
            onClick={handleExitGame}
            className="flex items-center gap-2"
          >
            <p className=" hidden md:block"> Exit Game</p>

            <LogOutIcon />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 px-4 md:px-0 gap-4 md:gap-8 h-full">
        {gameStatus == "playing" && (
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 bg-card p-4 block w-full space-y-4 md:hidden">
            <p className=" text-md">Current Turn:</p>
            {gameStatus === "playing" && (
              <div className="flex items-center gap-3 space-y-3">
                <div
                  className={`w-10 h-10 mb-0  rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ${
                    currentTurn === "X"
                      ? "bg-gradient-to-br from-blue-500 to-blue-700"
                      : "bg-gradient-to-br from-red-500 to-red-700"
                  }`}
                >
                  {currentTurn}
                </div>
                <p className="text-xl font-bold">{getCurrentPlayerName()}</p>
              </div>
            )}
          </div>
        )}

        {gameStatus === "won" && (
          <div className=" text-lg font-semibold text-gray-700 dark:text-gray-300 bg-card p-4 block w-full space-y-4 md:hidden">
            {gameStatus === "won" && roundWinner && (
              <div className=" flex flex-col items-center space-y-4">
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
          </div>
        )}

        {gameStatus === "draw" && (
          <div className=" md:hidden flex flex-col bg-card p-4 items-center space-y-4">
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

        <div className=" w-full md:w-auto col-span-1 lg:col-span-7 flex items-center justify-center">
          <div className="relative">
            <Card className=" w-full md:w-auto p-4 md:p-8 rounded md:rounded-3xl shadow-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-1 md:gap-4 p-4 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded md:rounded-2xl">
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => handleCellClick(index)}
                      disabled={!!cell || gameStatus !== "playing"}
                      className={getCellClassName(index)}
                    >
                      <span className="relative z-10 drop-shadow-lg text-6xl md:text-7xl">
                        {getCellContent(index)}
                      </span>
                      {!cell && gameStatus === "playing" && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100/20 dark:to-blue-900/20 rounded md:rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200" />
                          {/* Hover preview for current player's symbol */}
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-6xl md:text-7xl font-black opacity-0 group-hover:opacity-30 transition-opacity duration-200 pointer-events-none ${
                              currentTurn === "X"
                                ? "text-blue-500 dark:text-blue-400"
                                : "text-red-500 dark:text-red-400"
                            }`}
                          >
                            {currentTurn === "X" ? "✕" : "○"}
                          </span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div
              className={`flex justify-center mt-4 md:mt-0 w-full md:w-auto md:absolute md:-bottom-16 md:left-1/2 md:transform md:-translate-x-1/2 ${
                gameStatus != "playing" ? "opacity-0" : "opacity-100"
              }`}
            >
              <Button
                onClick={handleResetBoard}
                variant="outline"
                className="flex items-center gap-2 rounded-full px-6 py-3 hover:scale-105 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Round
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className=" hidden md:block shadow-lg">
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
