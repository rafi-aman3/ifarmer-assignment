import { useAppSelector } from "@/store/hooks";
import React from "react";

export const PlayingStateSM = () => {
  const { gameStatus, currentTurn, player1, player2 } = useAppSelector(
    (state) => state.game
  );

  if (gameStatus !== "playing") return;

  const getCurrentPlayerName = () => {
    return currentTurn === "X" ? player1 : player2;
  };

  return (
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
  );
};

export const PlayingStateLg = () => {
    const { gameStatus, currentTurn, player1, player2 } = useAppSelector(
        (state) => state.game
      );
    
      if (gameStatus !== "playing") return;

      const getCurrentPlayerName = () => {
        return currentTurn === "X" ? player1 : player2;
      };

      return (<div className="space-y-3">
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
      </div>)


}
