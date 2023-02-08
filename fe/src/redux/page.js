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
      // console.log(state.value);
    },
    global: (state) => {
      state.value = "global";
      // console.log(state.value);
    },
    home: (state) => {
      state.value = "home";
      // console.log(state.value);
    },
    garden: (state) => {
      state.value = "garden";
      // console.log(state.value);
    },
    profile: (state) => {
      state.value = "profile";
      // console.log(state.value);
    },
    test: (state) => {
      state.value = "test";      
    }
  },
});

// Action creators are generated for each case reducer function
export const { feed, global, home, garden, profile, test } = pagerSlice.actions;

export default pagerSlice.reducer;