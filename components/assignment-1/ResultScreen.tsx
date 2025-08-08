"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePlayerStats } from "@/store/leaderboardSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Target, Trophy } from "lucide-react";
import FinalResultCards from "./result/FinalResultCards";
import { MatchSummary } from "./result/MatchSummary";
import ResultActions from "./result/ResultActions";

export const ResultScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const gameState = useAppSelector((state) => state.game);
  const { player1, player2, matchWinner, player1Score, player2Score, round } =
    gameState;

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
        <FinalResultCards />
        <MatchSummary />
        <ResultActions />
      </div>
    </div>
  );
};
