import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearLeaderboard, type PlayerStats } from "@/store/leaderboardSlice";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { Trash2, Trophy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlayerCard } from "./PlayerCard";

interface RankingProps {
  playerList: PlayerStats[];
  getWinRate: Function;
}

export const Rankings = ({ playerList, getWinRate }: RankingProps) => {
  const dispatch = useAppDispatch();

  const handleClearLeaderboard = () => {
    if (
      confirm(
        "Are you sure you want to clear the leaderboard? This action cannot be undone."
      )
    ) {
      dispatch(clearLeaderboard());
    }
  };

  return (
    <Card className="rounded md:rounded-xl py-4 md:py-6 gap-4 md:gap-6  px-4 md:px-6">
      <CardHeader className="flex px-0 md:px-4 flex-row items-center justify-between">
        <CardTitle className="text-xl">Player Rankings</CardTitle>
        {playerList.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearLeaderboard}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent className=" px-0 md:px-6">
        {playerList.length === 0 ? (
          <Alert>
            <Trophy className="h-4 w-4" />
            <AlertDescription>
              No games played yet. Start a new game to see players on the
              leaderboard!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-2 md:space-y-4">
            {playerList.map((player, index) => (
              <PlayerCard
                key={player.name}
                index={index}
                player={player}
                getWinRate={getWinRate}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
