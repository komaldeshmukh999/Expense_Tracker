// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: false,
    update1: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUpdate: (state, action) => {
      state.update1 = action.payload;
    },
  },
});

export const { setLogin, setUpdate } = authSlice.actions;
export default authSlice.reducer;
