import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector, useStore } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { Loader } from 'shared/ui/loader/Loader';
import { PageError } from 'widgets/PageError';
import cls from './ArticleDetails.module.scss';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { articleReducer } from 'entities/Article/model/slice/ArticleDetailsSlice';
import Skeleton from 'shared/ui/skeleton/Skeleton';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
  const { className, id } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();
  const error = useSelector(getArticleDetailsError);
  //const isLoading = useSelector(getArticleDetailsIsLoading);
  const isLoading = true;
  const data = useSelector(getArticleDetailsData);

  useEffect(() => {
    dispatch(fetchArticleById(id));
    store.reducerManager.add('articleDetails', articleReducer);
    return () => {
      store.reducerManager.remove('articleDetails');
    };
  }, [dispatch, id]);

  if (error) {
    return (
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        <PageError />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        <Skeleton width={200} height={200} border="50%" className={cls.avatar} />
        <Skeleton width={300} height={32} className={cls.title} />
        <Skeleton width={600} height={24} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
        <Skeleton width={300} height={32} className={cls.skeleton} />
        <Skeleton width={600} height={24} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
      </div>
    );
  }

  return <div className={classNames(cls.ArticleDetails, {}, [className])}>{data?.title}</div>;
};
