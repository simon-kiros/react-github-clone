import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface LoadingBarState {
  loading: boolean | null;
}

const initialState: LoadingBarState = {
  loading: true,
};

export const loadingBarSlice = createSlice({
  name: "loadingBar",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingBarSlice.actions;
export const loadingBarSelector = (state: RootState) => state.loadingBar;
export default loadingBarSlice.reducer;
