import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { Trophy } from "lucide-react";
import React from "react";

const FinalResultCards = () => {
  const gameState = useAppSelector((state) => state.game);
  const {
    player1,
    player2,
    matchWinner,
    player1Score,
    player2Score,
    player1Wins,
    player2Wins,
  } = gameState;

  return (
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
  );
};

export default FinalResultCards;
