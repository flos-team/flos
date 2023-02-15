import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  followingIdList:[]
};

export const memberSlice = createSlice({
  name: "LoginUserId",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //   const ID = action.payload;
      state.userData = action.payload;
    },
    setFollowingIdList: (state, action) => {
      state.followingIdList = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setFollowingIdList } = memberSlice.actions;

export default memberSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
