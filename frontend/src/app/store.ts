import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import DefaultSlice from '../slices/slice';

export const store = configureStore({
  reducer: {
    DefaultSlice,
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
