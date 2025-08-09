import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import gameReducer from "./gameSlice";
import leaderboardReducer from "./leaderboardSlice";
import { productApi } from "./api/product";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
