import { configureStore } from "@reduxjs/toolkit";
import { theMealDBAPI } from "../services/theMealDBAPI.js";
import paginationSlice from "../features/pagination/paginationSlice";
import navbarSlice from "../features/navbar/navbarSlice.js";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    navbar: navbarSlice,
    [theMealDBAPI.reducerPath]: theMealDBAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(theMealDBAPI.middleware);
  },
});