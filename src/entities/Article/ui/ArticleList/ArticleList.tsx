import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading = true, view = ArticleView.SMALL } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {new Array(ArticleView.SMALL ? 20 : 4).fill(0).map((index, item) => (
          <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
        ))}
      </div>
    );
  }

  const renderArticles = (article: Article) => {
    return <ArticleListItem article={article} view={view} className={cls.card} key={article.id} />;
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticles) : null}
    </div>
  );
};
