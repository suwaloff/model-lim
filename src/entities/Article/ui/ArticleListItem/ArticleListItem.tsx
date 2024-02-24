import { classNames } from 'shared/lib/classNames/classNames';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/Article';
import { Text, TextTheme } from 'shared/ui/text/Text';
import EyeIcon from 'shared/assets/icons/article-icon/eye.svg';
import cls from './ArticleListItem.module.scss';
import { Avatar } from 'shared/ui/avatar/Avatar';
import { Button } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { article, className, view } = props;
  const { t } = useTranslation('article');
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  const types = <Text text={article.type.join()} className={cls.type} />;
  const views = (
    <>
      <EyeIcon className={cls.icon} />
      <Text text={String(article.views)} className={cls.views} />
    </>
  );

  if (view === ArticleView.BIG) {
    let textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <div className={cls.card}>
          <div className={cls.header}>
            <Avatar src={article.userId.avatar} alt={article.title} size={30} />
            <Text text={article.userId.username} className={cls.userName} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle}>{t('Читать далее..')}</Button>
            {views}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <div className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </div>
    </div>
  );
});
