import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export function checkWinner(board: (string | null)[]): string | null {
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
      return board[a];
    }
  }
  return null;
}

interface GameState {
  player1: string;
  player2: string;
  board: string[];
  currentTurn: string;
  gameStatus: "playing" | "won" | "draw";
  winner: string | null;
  roundWinner: string | null;
  round: number;
  player1Wins: number;
  player2Wins: number;
  player1Score: number;
  player2Score: number;
  matchWinner: string | null;
  matchComplete: boolean;
}

const initialState: GameState = {
  player1: "",
  player2: "",
  board: Array(9).fill(null),
  currentTurn: "X",
  gameStatus: "playing",
  winner: null,
  roundWinner: null,
  round: 1,
  player1Wins: 0,
  player2Wins: 0,
  player1Score: 0,
  player2Score: 0,
  matchWinner: null,
  matchComplete: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (
      state,
      action: PayloadAction<{ player1: string; player2: string }>
    ) => {
      state.player1 = action.payload.player1;
      state.player2 = action.payload.player2;
    },
    makeMove: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (state.board[index] || state.gameStatus !== "playing") return;

      state.board[index] = state.currentTurn;

      const winner = checkWinner(state.board);
      console.log(winner);

      if (winner) {
        state.gameStatus = "won";
        state.winner = winner;
        state.roundWinner = winner === "X" ? state.player1 : state.player2;
      } else if (state.board.every((cell) => cell !== null)) {
        state.gameStatus = "draw";
        state.winner = null;
        state.roundWinner = null;
      } else {
        state.currentTurn = state.currentTurn === "X" ? "O" : "X";
      }
    },
    nextRound: (state) => {
      if (state.roundWinner === state.player1) {
        state.player1Wins += 1;
        state.player1Score += 2;
        state.player2Score += 1;
      } else if (state.roundWinner === state.player2) {
        state.player2Wins += 1;
        state.player2Score += 2;
        state.player1Score += 1;
      }

      if (
        state.round >= 5 ||
        state.player1Wins >= 3 ||
        state.player2Wins >= 3
      ) {
        state.matchComplete = true;
        if (state.player1Wins > state.player2Wins) {
          state.matchWinner = state.player1;
        } else if (state.player2Wins > state.player1Wins) {
          state.matchWinner = state.player2;
        } else {
          state.matchWinner = null; // Draw
        }
      } else {
        state.round += 1;
        state.board = Array(9).fill(null);
        state.gameStatus = "playing";
        state.winner = null;
        state.roundWinner = null;
        state.currentTurn = "X";
      }
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.gameStatus = "playing";
      state.winner = null;
      state.roundWinner = null;
      state.currentTurn = "X";
    },
    resetGame: (state) => {
      return {
        ...initialState,
        player1: state.player1,
        player2: state.player2,
      };
    },
    newGame: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setPlayers,
  makeMove,
  nextRound,
  resetBoard,
  resetGame,
  newGame,
} = gameSlice.actions;

export default gameSlice.reducer;
