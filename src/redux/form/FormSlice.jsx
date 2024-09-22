import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: [],  
  totalPages: 0,
  totalItems: 0,
};

const formSlice = createSlice({
  name:"form",
  initialState,
  reducers: {
    setform: (state, { payload }) => {
      state.form = payload.lists;       
      state.totalPages = payload.totalPages; 
      state.totalItems = payload.totalItems; 
      
    }
  }
});

const { reducer, actions } = formSlice;

export const { setform } = actions;

export default reducer;