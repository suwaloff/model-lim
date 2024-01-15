import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileShema } from '../types/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileShema = {
  data: undefined,
  isLoading: false,
  readonly: true,
  error: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled.type, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
