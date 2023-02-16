import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "home",
};

export const pagerSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    feed: (state) => {
      state.value = "feed";
    },
    global: (state) => {
      state.value = "global";
    },
    home: (state) => {
      state.value = "home";
    },
    garden: (state) => {
      state.value = "garden";
    },
    profile: (state) => {
      state.value = "profile";
    },
    test: (state) => {
      state.value = "test";      
    }
  },
});

// Action creators are generated for each case reducer function
export const { feed, global, home, garden, profile, test } = pagerSlice.actions;

export default pagerSlice.reducer;
