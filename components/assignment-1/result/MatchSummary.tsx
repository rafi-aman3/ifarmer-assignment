import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import React from "react";

export const MatchSummary = () => {
  const gameState = useAppSelector((state) => state.game);
  const { player1Score, player2Score, player1Wins, player2Wins, round } =
    gameState;
  return (
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Draws</p>
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
  );
};
