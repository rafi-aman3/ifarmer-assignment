import { Button } from "@/components/ui/button";
import { newGame } from "@/store/gameSlice";
import { useAppDispatch } from "@/store/hooks";
import { ArrowLeft, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LeaderboardHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <p className=" hidden md:block">Back</p>
      </Button>
      <h1 className="text-lg md:text-4xl font-bold text-center flex items-center gap-2">
        <Trophy className=" size-5 md:size-8 text-yellow-500" />
        Leaderboard
      </h1>
      <Button
        variant="outline"
        onClick={() => {
          dispatch(newGame());
          router.push("/");
        }}
        className="flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        <p className=" hidden md:block">New Game</p>
      </Button>
    </div>
  );
};

export default LeaderboardHeader;
