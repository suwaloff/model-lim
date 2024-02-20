import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentShema } from '../types/ArticleDetailsCommentShema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComment || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentShema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsByArticleId.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled.type,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          state.error = undefined;
          commentsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchCommentsByArticleId.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
