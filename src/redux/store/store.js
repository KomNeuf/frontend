import { configureStore } from "@reduxjs/toolkit";
import api from "../api";
import authReducer from "../slices/user.slice";
import favoritesReducer from "../slices/favorites.slice";
const store = configureStore({
  reducer: {
    [api.adminApis.reducerPath]: api.adminApis.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.adminApis.middleware),
});

export default store;
