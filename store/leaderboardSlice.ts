import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerStats {
  name: string;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
}

interface LeaderboardState {
  players: Record<string, PlayerStats>;
}

const initialState: LeaderboardState = {
  players: {},
};

const LEADERBOARD_STORAGE_KEY = "tic-tac-toe-leaderboard";

const loadFromStorage = (): Record<string, PlayerStats> => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (players: Record<string, PlayerStats>) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(players));
  } catch {}
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    loadLeaderboard: (state) => {
      state.players = loadFromStorage();
    },
    updatePlayerStats: (
      state,
      action: PayloadAction<{
        player1: string;
        player2: string;
        player1Score: number;
        player2Score: number;
        matchWinner: string | null;
      }>
    ) => {
      const { player1, player2, player1Score, player2Score, matchWinner } =
        action.payload;

      // Initialize players if they don't exist
      if (!state.players[player1]) {
        state.players[player1] = {
          name: player1,
          totalScore: 0,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
        };
      }
      if (!state.players[player2]) {
        state.players[player2] = {
          name: player2,
          totalScore: 0,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
        };
      }

      // Update scores
      state.players[player1].totalScore += player1Score;
      state.players[player2].totalScore += player2Score;

      // Update game counts
      state.players[player1].gamesPlayed += 1;
      state.players[player2].gamesPlayed += 1;

      // Update win/loss/draw counts
      if (matchWinner === player1) {
        state.players[player1].wins += 1;
        state.players[player2].losses += 1;
      } else if (matchWinner === player2) {
        state.players[player2].wins += 1;
        state.players[player1].losses += 1;
      } else {
        state.players[player1].draws += 1;
        state.players[player2].draws += 1;
      }

      // Save to localStorage
      saveToStorage(state.players);
    },
    clearLeaderboard: (state) => {
      state.players = {};
      saveToStorage({});
    },
  },
});

export const { updatePlayerStats, clearLeaderboard, loadLeaderboard } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
