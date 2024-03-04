import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageAction } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesPageAction.setPage(page + 1));
      dispatch(fetchArticlesList({}));
    }
  }
);
