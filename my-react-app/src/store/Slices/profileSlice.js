// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: { fullName: '', photoURL: '' },
    loading: true,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProfileData, setLoading } = profileSlice.actions;
export default profileSlice.reducer;