import { createSlice } from '@reduxjs/toolkit';
import { ProfileShema } from '../types/Profile';

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
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
