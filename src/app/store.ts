import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import itemReducer from '../components/itemSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
