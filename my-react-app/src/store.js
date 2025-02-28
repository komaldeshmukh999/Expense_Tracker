// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./store/Slices/authSlice"
import profileReducer from "./store/Slices/profileSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:profileReducer,
  },
});