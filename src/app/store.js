import { configureStore } from "@reduxjs/toolkit";
import { theMealDBAPI } from "../services/theMealDBAPI.js";

export const store = configureStore({
  reducer: {
    [theMealDBAPI.reducerPath]: theMealDBAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(theMealDBAPI.middleware);
  },
});