import { createSlice } from '@reduxjs/toolkit';
import { UserShema } from '../types/User';

const initialState: UserShema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
