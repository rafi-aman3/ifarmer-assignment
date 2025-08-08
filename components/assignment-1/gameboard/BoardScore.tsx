import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import React from "react";

export const BoardScore = () => {
  const {
    player1,
    player2,
    round,
    player1Score,
    player1Wins,
    player2Score,
    player2Wins,
  } = useAppSelector((state) => state.game);

  return (
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
  );
};
