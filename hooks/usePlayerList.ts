import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadLeaderboard } from "@/store/leaderboardSlice";
import { useEffect } from "react";

export function usePlayerList() {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(loadLeaderboard());
  }, [dispatch]);

  const playerList = Object.values(players).sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    const aWinRate = a.gamesPlayed > 0 ? a.wins / a.gamesPlayed : 0;
    const bWinRate = b.gamesPlayed > 0 ? b.wins / b.gamesPlayed : 0;
    return bWinRate - aWinRate;
  });

  const getWinRate = (player: (typeof playerList)[0]) => {
    if (player.gamesPlayed === 0) return 0;
    return Math.round((player.wins / player.gamesPlayed) * 100);
  };

  return { playerList, getWinRate };
}
