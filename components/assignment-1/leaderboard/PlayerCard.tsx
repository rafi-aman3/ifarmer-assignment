import { Badge } from "@/components/ui/badge";
import { Award, Medal, Trophy } from "lucide-react";
import React from "react";
import { clearLeaderboard, type PlayerStats } from "@/store/leaderboardSlice";

interface PlayerCardProps {
  index: number;
  player: PlayerStats;
  getWinRate: Function;
}

export const PlayerCard = ({ index, player, getWinRate }: PlayerCardProps) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">
            {index + 1}
          </div>
        );
    }
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 1:
        return "bg-gray-100 text-gray-800 border-gray-300";
      case 2:
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };
  return (
    <div
      className={`flex items-center justify-between p-3 md:p-4 rounded-sm md:rounded-lg border-2 transition-all duration-200 ${
        index === 0
          ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950 dark:to-amber-950 dark:border-yellow-800"
          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getRankIcon(index)}
          <Badge className={getRankBadgeColor(index)}>#{index + 1}</Badge>
        </div>
        <div>
          <h3 className="font-bold text-lg">{player.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {player.gamesPlayed} games • {getWinRate(player)}% win rate
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-2xl font-bold text-blue-600">{player.totalScore}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
      </div>
    </div>
  );
};
