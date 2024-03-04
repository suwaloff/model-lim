import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageAction } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article/model/types/Article';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const searchFromUrl = searchParams.get('search');
      const sortFromUrl = searchParams.get('sort') as ArticleSortField;

      if (orderFromUrl) {
        dispatch(articlesPageAction.setOrder(orderFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articlesPageAction.setSearch(searchFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlesPageAction.setSort(sortFromUrl));
      }

      dispatch(articlesPageAction.initState());
      dispatch(fetchArticlesList({}));
    }
  }
);
