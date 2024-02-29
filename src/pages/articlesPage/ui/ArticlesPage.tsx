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
} from '../model/slice/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageView,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../model/selectors/articlesPageSelectors';
import { useCallback } from 'react';
import { ArticleViewSelector } from 'widgets/ArticleViewSelector/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';
import { Page } from 'shared/ui/page/Page';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const page = useSelector(getArticlesPageNum);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageAction.setView(view));
    },
    [dispatch]
  );

  const onLoadNext = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNext} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector onViewClick={onChangeView} view={view} />
        <ArticleList articles={articles} isLoading={isLoading} view={view} error={error} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
