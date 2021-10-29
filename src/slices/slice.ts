/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    reducer: (state: any, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

export const { reducer } = slice.actions;

export default slice.reducer;
