import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollSchema } from '../types/SaveScrollShema';

const initialState: SaveScrollSchema = {
  scroll: {},
};

export const SaveScrollSlice = createSlice({
  name: 'saveScroll',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const { actions: SaveScrollActions } = SaveScrollSlice;
export const { reducer: SaveScrollReducer } = SaveScrollSlice;
