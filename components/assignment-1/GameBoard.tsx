"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { LogOutIcon, Trophy } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { resetGame } from "@/store/gameSlice";
import { useRouter } from "next/navigation";
import { useWinningLine } from "@/hooks/useWinningLine";
import { PlayingStateLg, PlayingStateSM } from "./gameboard/PlayingState";
import { RoundWonStateLG, RoundWonStateSM } from "./gameboard/RoundWonState";
import { RoundDrawLG, RoundDrawSM } from "./gameboard/RoundDraw";
import { MainBoard } from "./gameboard/MainBoard";
import { BoardScore } from "./gameboard/BoardScore";

export const GameBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { player1, player2, matchComplete } = useAppSelector(
    (state) => state.game
  );

  const { getCellClassName, handleNextRound, handleResetBoard } =
    useWinningLine();

  const handleExitGame = () => {
    dispatch(resetGame());
    router.push("/");
  };

  useEffect(() => {
    if (!player1 || !player2) {
      router.push("/");
    }
  }, [player1, player2, router]);

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
        <PlayingStateSM />
        <RoundWonStateSM handleNextRound={handleNextRound} />
        <RoundDrawSM handleNextRound={handleNextRound} />
        <MainBoard
          getCellClassName={getCellClassName}
          handleResetBoard={handleResetBoard}
        />

        <div className="lg:col-span-3 space-y-6">
          <Card className=" hidden md:block shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Current Turn
              </h3>
              <PlayingStateLg />
              <RoundWonStateLG handleNextRound={handleNextRound} />
              <RoundDrawLG handleNextRound={handleNextRound} />
            </CardContent>
          </Card>

          <BoardScore />
        </div>
      </div>
    </div>
  );
};
