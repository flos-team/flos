import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./page";
import userReducer from "./user";
import toastReducer from "./toast";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    toast: toastReducer,
  },
});
