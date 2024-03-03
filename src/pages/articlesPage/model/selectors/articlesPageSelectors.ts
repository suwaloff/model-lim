import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';
import { ArticleSortField } from 'entities/Article/model/types/Article';

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || undefined;
export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;
export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order || 'asc';
export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort || ArticleSortField.CREATED;
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
