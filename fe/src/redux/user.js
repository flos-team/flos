import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const memberSlice = createSlice({
  name: "LoginUserId",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      //   const ID = action.payload;
      console.log(action);
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserId } = memberSlice.actions;

export default memberSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
