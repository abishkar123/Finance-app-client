import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = {}; 
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser, logout } = actions;

export default reducer;
