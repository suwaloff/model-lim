import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortField, ArticleType, ArticleView } from 'entities/Article';

import { SortOrder } from 'shared/types';

export interface ArticlesPageShema extends EntityState<Article> {
  error?: string;
  isLoading?: boolean;
  view: ArticleView;
  //pagination
  page: number;
  limit: number;
  hasMore: boolean;
  _inited: boolean;
  //filters
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;
}
