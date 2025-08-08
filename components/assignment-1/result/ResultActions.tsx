import { Button } from "@/components/ui/button";
import { newGame, resetGame } from "@/store/gameSlice";
import { useAppDispatch } from "@/store/hooks";
import { Medal, RotateCcw, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ResultActions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRematch = () => {
    dispatch(resetGame());
    router.push("/assignment-1/game");
  };

  const handleViewLeaderboard = () => {
    router.push("/assignment-1/leaderboard");
  };

  const handleNewMatch = () => {
    dispatch(newGame());
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button
        onClick={handleRematch}
        size="lg"
        className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Rematch
      </Button>

      <Button
        onClick={handleViewLeaderboard}
        size="lg"
        variant="outline"
        className="flex items-center justify-center gap-2"
      >
        <Medal className="w-5 h-5" />
        Leaderboard
      </Button>

      <Button
        onClick={handleNewMatch}
        size="lg"
        variant="outline"
        className="flex items-center justify-center gap-2"
      >
        <Users className="w-5 h-5" />
        New Players
      </Button>
    </div>
  );
};

export default ResultActions;
