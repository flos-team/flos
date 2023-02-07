import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./page";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
  },
});
