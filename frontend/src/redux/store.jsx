import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/data/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
