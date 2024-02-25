import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector, useStore } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { PageError } from 'widgets/PageError';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { articleReducer } from '../../model/slice/ArticleDetailsSlice';
import Skeleton from 'shared/ui/skeleton/Skeleton';
import { Avatar } from 'shared/ui/avatar/Avatar';
import { Text, TextSize } from 'shared/ui/text/Text';
import CalendarIcon from 'shared/assets/icons/article-icon/calendar.svg';
import EyeIcon from 'shared/assets/icons/article-icon/eye.svg';
import { ArticleBlock, ArticleBlockType } from '../../model/types/Article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import cls from './ArticleDetails.module.scss';
import { Button } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('article-details');
  const store = useStore() as ReduxStoreWithManager;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const articleData = useSelector(getArticleDetailsData);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
      store.reducerManager.add('articleDetails', articleReducer);
      return () => {
        store.reducerManager.remove('articleDetails');
      };
    }
  }, [dispatch, id]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (error) {
    return (
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        <PageError />
      </div>
    );
  }
  if (isLoading || !articleData) {
    return (
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        <Skeleton width={200} height={200} border="50%" className={cls.avatar} />
        <Skeleton width={300} height={32} className={cls.title} />
        <Skeleton width={600} height={24} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
        <Skeleton width="100%" height={200} className={cls.skeleton} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      <Button onClick={onBackToList}> {t('Назад')}</Button>
      <div className={cls.avatarWrapper}>
        <Avatar size={300} src={articleData?.img} className={cls.articleImg} />
      </div>
      <Text
        size={TextSize.L}
        title={articleData?.title}
        text={articleData?.subtitle}
        className={cls.title}
      />
      <div className={cls.articleInfo}>
        <CalendarIcon className={cls.icon} />
        {articleData?.createdAt}
      </div>
      <div className={cls.articleInfo}>
        <EyeIcon className={cls.icon} />
        {articleData?.views}
      </div>
      {articleData?.blocks.map(renderBlock)}
    </div>
  );
};
