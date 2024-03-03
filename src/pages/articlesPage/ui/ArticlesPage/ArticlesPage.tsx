import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView } from 'entities/Article';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlesPageAction,
  articlesPageReducer,
  getArticles,
} from '../../model/slice/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageView,
  getArticlesPageIsLoading,
} from '../../model/selectors/articlesPageSelectors';
import { useCallback } from 'react';
import { ArticleViewSelector } from 'widgets/ArticleViewSelector/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';
import { Page } from 'widgets/Page/Page';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const error = useSelector(getArticlesPageError);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  const onLoadNext = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNext} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticlesPageFilter />
        <ArticleList articles={articles} isLoading={isLoading} view={view} error={error} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
