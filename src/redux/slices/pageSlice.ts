import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  zoneInfo: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('zoneInfo') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
};

const zoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    setZoneDetails: (state, action) => {
      state.zoneInfo = action.payload.zoneInfo;
      state.token = action.payload.token;
      localStorage.setItem('zoneInfo', JSON.stringify(action.payload.zoneInfo));
      localStorage.setItem('token', action.payload.token);
    },
    clearZoneDetails: (state) => {
      state.zoneInfo = null;
      state.token = null;
      localStorage.removeItem('zoneInfo');
      localStorage.removeItem('token');
    },
  },
});

export const { setZoneDetails, clearZoneDetails } = zoneSlice.actions;

export default zoneSlice.reducer;
