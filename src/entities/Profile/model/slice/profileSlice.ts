import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileShema } from '../types/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileShema = {
  data: undefined,
  form: undefined,
  isLoading: false,
  readonly: true,
  error: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = { ...state.form, ...action.payload };
    },
    cancelEdit: (state) => {
      state.form = state.data;
      state.readonly = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled.type, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.error = '';
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
