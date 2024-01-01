import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetInput: (state) => {
      state.username = '';
      state.password = '';
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginByUsername.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled.type, (state) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(loginByUsername.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
