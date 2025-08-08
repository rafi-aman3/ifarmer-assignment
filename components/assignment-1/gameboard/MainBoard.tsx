import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { makeMove } from "@/store/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RotateCcw } from "lucide-react";
import React from "react";

interface MainBoardProps {
  getCellClassName: (index: number) => string | undefined;
  handleResetBoard: () => void;
}

export const MainBoard = ({
  getCellClassName,
  handleResetBoard,
}: MainBoardProps) => {
  const dispatch = useAppDispatch();
  const { board, gameStatus, currentTurn } = useAppSelector(
    (state) => state.game
  );

  const handleCellClick = (index: number) => {
    if (board[index] || gameStatus !== "playing") return;

    dispatch(makeMove(index));
  };

  const getCellContent = (index: number) => {
    const value = board[index];
    if (!value) return "";
    return value === "X" ? "✕" : "○";
  };

  return (
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
  );
};
