import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './slices/tradesSlices';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    trades: tradesReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});