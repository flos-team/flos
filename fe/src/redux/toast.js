import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    value: {
      isToast: false,
    },
  },
  reducers: {
    setIsToastValue: (state, action) => {
      state.value = action.payload;
      console.dir(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsToastValue } = toastSlice.actions;

export default toastSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
