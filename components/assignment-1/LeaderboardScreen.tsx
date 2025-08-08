"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LeaderboardHeader from "./leaderboard/LeaderboardHeader";
import { usePlayerList } from "@/hooks/usePlayerList";
import { LeaderboardAllTimeStats } from "./leaderboard/LeaderboardAllTimeStats";
import { Rankings } from "./leaderboard/Rankings";

export const LeaderboardScreen = () => {
  const { playerList, getWinRate } = usePlayerList();

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <LeaderboardHeader />
        <LeaderboardAllTimeStats playerList={playerList} />
        <Rankings playerList={playerList} getWinRate={getWinRate} />
        {playerList.length > 0 && (
          <Card className="rounded md:rounded-xl py-4 md:py-6 gap-4 md:gap-6  px-4 md:px-6">
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent className=" px-0 md:px-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Player</th>
                      <th className="text-center p-2">Games</th>
                      <th className="text-center p-2">Wins</th>
                      <th className="text-center p-2">Losses</th>
                      <th className="text-center p-2">Draws</th>
                      <th className="text-center p-2">Win Rate</th>
                      <th className="text-center p-2">Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerList.map((player) => (
                      <tr
                        key={player.name}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-2 font-medium">{player.name}</td>
                        <td className="text-center p-2">
                          {player.gamesPlayed}
                        </td>
                        <td className="text-center p-2 text-green-600">
                          {player.wins}
                        </td>
                        <td className="text-center p-2 text-red-600">
                          {player.losses}
                        </td>
                        <td className="text-center p-2 text-yellow-600">
                          {player.draws}
                        </td>
                        <td className="text-center p-2">
                          {getWinRate(player)}%
                        </td>
                        <td className="text-center p-2 font-bold text-blue-600">
                          {player.totalScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
