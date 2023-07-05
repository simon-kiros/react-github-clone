import { configureStore } from "@reduxjs/toolkit";
import loadingBarReducer from "src/redux/loadingBarSlice";

export const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
