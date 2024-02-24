import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading, view = ArticleView.SMALL } = props;

  const renderArticles = (article: Article) => {
    return <ArticleListItem article={article} view={view} className={cls.card} />;
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.length > 0 ? articles.map(renderArticles) : null}
    </div>
  );
};
