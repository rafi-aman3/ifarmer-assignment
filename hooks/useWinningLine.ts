import { nextRound, resetBoard } from "@/store/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export function useWinningLine() {
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const { board, gameStatus, currentTurn } = useAppSelector(
    (state) => state.game
  );

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (gameStatus === "won") {
      const line = getWinningLine(board);
      setWinningLine(line);
    } else {
      setWinningLine(null);
    }
  }, [gameStatus, board]);

  const handleNextRound = () => {
    setWinningLine(null);
    dispatch(nextRound());
  };

  const handleResetBoard = () => {
    setWinningLine(null);
    dispatch(resetBoard());
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

      if (currentTurn === "X") {
        baseClasses += " hover:border-blue-500 dark:hover:border-blue-400";
      } else {
        baseClasses += " hover:border-red-500 dark:hover:border-red-400";
      }
    }

    return baseClasses;
  };

  return { getCellClassName, handleNextRound, handleResetBoard };
}
