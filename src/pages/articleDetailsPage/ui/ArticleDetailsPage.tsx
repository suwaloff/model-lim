import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/text/Text';
import { useSelector, useStore } from 'react-redux';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { getCommentsIsLoading } from '../model/selectors/getComments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails';
import { Page } from 'shared/ui/page/Page';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getCommentsIsLoading);
  const article = useSelector(getArticleDetailsData);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    store.reducerManager.add('articleDetailsComment', articleDetailsCommentsReducer);
    dispatch({ type: '@INIT CommentsReducer' });
    return () => {
      store.reducerManager.remove('articleDetailsComment');
      dispatch({ type: '@DESTROY CommentsReducer' });
    };
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
      dispatch(fetchCommentsByArticleId(id));
    },
    [dispatch]
  );

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('статья не найдена..')}
      </Page>
    );
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      {article && (
        <>
          <Text title={t('Комментарии :')} className={cls.title} />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={isLoading ? isLoading : false} comments={comments} />{' '}
        </>
      )}
    </Page>
  );
};

export default memo(ArticleDetailsPage);
