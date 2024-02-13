import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleDetailsShema } from '../types/ArticleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/Article';

const initialState: ArticleDetailsShema = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleById.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled.type, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleActions } = articleDetailsSlice;
export const { reducer: articleReducer } = articleDetailsSlice;
