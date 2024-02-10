import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileShema, ValidateProfileError } from '../types/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileShema = {
  data: undefined,
  form: undefined,
  isLoading: false,
  readonly: true,
  error: undefined,
  validateErrors: [],
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
      state.validateErrors = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled.type, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileData.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled.type, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.validateErrors = undefined;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(
        updateProfileData.rejected.type,
        (state, action: PayloadAction<ValidateProfileError[]>) => {
          state.isLoading = false;
          state.validateErrors = action.payload;
        }
      );
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
