import { Card, CardContent } from "@/components/ui/card";
import { Target, Trophy, Users } from "lucide-react";
import type { PlayerStats } from "@/store/leaderboardSlice";

interface LeaderboardAllTimeStatsProps {
  playerList: PlayerStats[];
}

export const LeaderboardAllTimeStats = ({
  playerList,
}: LeaderboardAllTimeStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      <Card className=" rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
        <CardContent className=" p-0 md:p-4 text-center">
          <Users className="size-6 md:size-8 mx-auto mb-2 text-blue-600" />
          <p className=" text-xl md:text-2xl font-bold">{playerList.length}</p>
          <p className=" text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Total Players
          </p>
        </CardContent>
      </Card>
      <Card className="rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
        <CardContent className=" p-0 md:p-4 text-center">
          <Target className="size-6 md:size-8 mx-auto mb-2 text-green-600" />
          <p className="text-xl md:text-2xl font-bold">
            {playerList.reduce((sum, player) => sum + player.gamesPlayed, 0)}
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Games Played
          </p>
        </CardContent>
      </Card>
      <Card className="rounded md:rounded-xl py-2 md:py-6  px-2 md:px-6">
        <CardContent className=" p-0 md:p-4 text-center">
          <Trophy className=" size-6 md:size-8 mx-auto mb-2 text-yellow-600" />
          <p className="text-xl md:text-2xl font-bold">
            {playerList.reduce((sum, player) => sum + player.totalScore, 0)}
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Total Points
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
