import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setform: (state, { payload }) => {
      state.form = payload;
    },
  },
});

const { reducer, actions } = formSlice;

export const { setform } = actions;

export default reducer;
