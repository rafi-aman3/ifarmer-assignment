import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import gameReducer from "./gameSlice";
import leaderboardReducer from "./leaderboardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
