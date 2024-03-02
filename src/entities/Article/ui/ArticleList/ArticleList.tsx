import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  error?: string;
  view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading, view = ArticleView.SMALL } = props;

  const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 10 : 3)
      .fill(0)
      .map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
      ));

  const renderArticles = (article: Article) => {
    return <ArticleListItem article={article} view={view} className={cls.card} key={article.id} />;
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticles) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};
