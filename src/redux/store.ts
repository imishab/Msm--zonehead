import { configureStore } from '@reduxjs/toolkit';
import { ZoneApi } from './api/ZoneApi';
import zoneReducer from './slices/pageSlice';

export const store = configureStore({
  reducer: {
    zone: zoneReducer,
    [ZoneApi.reducerPath]: ZoneApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ZoneApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
