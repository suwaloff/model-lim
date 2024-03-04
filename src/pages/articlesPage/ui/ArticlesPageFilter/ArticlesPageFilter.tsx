import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import {
  getArticleType,
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
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/Article';
import { fetchArticlesList } from 'pages/articlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/tabs/Tabs';
import cls from './ArticlesPageFilter.module.scss';

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
  const articleType = useSelector(getArticleType);

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
  const onChangeArticleType = useCallback(
    (tab: TabItem) => {
      dispatch(articlesPageAction.setArticleType(tab.value as ArticleType));
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

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
    ],
    []
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
      <div className={cls.footerWrapper}>
        <Tabs onTabClick={onChangeArticleType} tabs={typeTabs} value={articleType} />
        <div className={cls.inputWrapper}>
          <input
            placeholder={t('поиск..')}
            className={cls.input}
            value={search}
            onChange={onChangeSearch}
          />
        </div>
      </div>
    </div>
  );
};
