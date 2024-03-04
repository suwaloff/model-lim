import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { ArticleViewSelector } from 'widgets/ArticleViewSelector/ArticleViewSelector';
import { articlesPageAction } from '../../model/slice/articlesPageSlice';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article/model/types/Article';
import cls from './ArticlesPageFilter.module.scss';
import { fetchArticlesList } from 'pages/articlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilter = ({ className }: ArticlesPageFilterProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const order = useSelector(getArticlesPageOrder);
  const sort = useSelector(getArticlesPageSort);
  const search = useSelector(getArticlesPageSearch);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageAction.setView(view));
      dispatch(articlesPageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageAction.setSort(newSort));
      dispatch(articlesPageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageAction.setOrder(newOrder));
      dispatch(articlesPageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(articlesPageAction.setSearch(e.target.value));
      dispatch(articlesPageAction.setPage(1));
      debouncedFetchData();
    },
    [dispatch, fetchData]
  );

  return (
    <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector onViewClick={onChangeView} view={view} />
      </div>
      <div className={cls.inputWrapper}>
        <input
          placeholder={t('поиск..')}
          className={cls.input}
          value={search}
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
};
