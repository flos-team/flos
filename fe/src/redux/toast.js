import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isToast: false,
    toastMessage: "",
  },
  reducers: {
    setIsToastValue: (state, action) => {
      state.isToast = action.payload;
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsToastValue, setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
