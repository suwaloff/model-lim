import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import {
  getArticleType,
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  replace?: boolean;
}
export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articles/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const limit = getArticlesPageLimit(getState());
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const page = getArticlesPageNum(getState());
  const type = getArticleType(getState());
  try {
    addQueryParams({ sort, order, search, type });
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
