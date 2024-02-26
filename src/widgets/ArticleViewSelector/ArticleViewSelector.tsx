import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article';
import GridIcon from 'shared/assets/icons/article-icon/grid.svg';
import ListIcon from 'shared/assets/icons/article-icon/list.svg';
import { Button, ButtonTHeme } from 'shared/ui/button';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: <GridIcon />,
  },
  {
    view: ArticleView.BIG,
    icon: <ListIcon />,
  },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
  const { view, onViewClick, className } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          theme={ButtonTHeme.CLEAR}
          onClick={onClick(viewType.view)}
          key={viewType.view}
          className={classNames('', { [cls.selected]: viewType.view == view }, [])}
        >
          {viewType.icon}
        </Button>
      ))}
    </div>
  );
};
