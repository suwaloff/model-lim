import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesPageShema } from '../types/ArticlesPageShema';
import { Article, ArticleView } from 'entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
import { ArticleSortField } from 'entities/Article/model/types/Article';
import { SortOrder } from 'shared/types';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageShema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    _inited: false,
    ids: [],
    entities: {},
    search: '',
    sort: ArticleSortField.CREATED,
    order: 'asc',
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.SMALL ? 10 : 4;
      state._inited = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesList.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled.type, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        state.error = undefined;
        articlesAdapter.addMany(state, action.payload);
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageAction } = articlesPageSlice;
