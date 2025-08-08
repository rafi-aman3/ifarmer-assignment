import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Trophy } from "lucide-react";
import React from "react";

interface RoundWonStateSMProps {
  handleNextRound: () => void;
}

export const RoundWonStateSM = ({ handleNextRound }: RoundWonStateSMProps) => {
  const { gameStatus, roundWinner } = useAppSelector((state) => state.game);

  if (gameStatus !== "won") return;
  return (
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
  );
};

export const RoundWonStateLG = ({ handleNextRound }: RoundWonStateSMProps) => {
  const { gameStatus, roundWinner } = useAppSelector((state) => state.game);

  if (gameStatus !== "won") return;
  return (
    <div className="space-y-4">
      <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
      <p className="text-lg font-bold text-green-600">🎉 {roundWinner} Wins!</p>
      <Button
        onClick={handleNextRound}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      >
        Next Round
      </Button>
    </div>
  );
};
