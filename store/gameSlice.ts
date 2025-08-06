import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  player1: string;
  player2: string;
}

const initialState: GameState = {
  player1: "",
  player2: "",
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
  },
});

export const { setPlayers } = gameSlice.actions;

export default gameSlice.reducer;
