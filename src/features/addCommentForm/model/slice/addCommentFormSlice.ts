import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/AddCommentForm';

const initialState: AddCommentFormSchema = {
  error: undefined,
  text: '',
};

export const AddCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(fetchProfileData.pending.type, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(fetchProfileData.fulfilled.type, (state, action: PayloadAction<Profile>) => {
  //         state.isLoading = false;
  //         state.error = undefined;
  //         state.data = action.payload;
  //         state.form = action.payload;
  //       })
  //       .addCase(fetchProfileData.rejected.type, (state, action: PayloadAction<string>) => {
  //         state.isLoading = false;
  //         state.error = action.payload;
  //       });
  //   },
});

export const { actions: addCommentFormActions } = AddCommentFormSlice;
export const { reducer: addCommentFormReducer } = AddCommentFormSlice;
