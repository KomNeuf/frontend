import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    isFavoriteUpdated: false,
  },
  reducers: {
    updateFavoriteStatus(state, action) {
      state.isFavoriteUpdated = action.payload;
    },
    resetFavoriteStatus(state) {
      state.isFavoriteUpdated = false;
    },
  },
});

export const { updateFavoriteStatus, resetFavoriteStatus } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
