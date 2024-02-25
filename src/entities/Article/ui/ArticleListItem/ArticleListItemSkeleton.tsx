import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from '../../model/types/Article';
import { memo } from 'react';
import Skeleton from 'shared/ui/skeleton/Skeleton';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemProps) => {
  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <div className={cls.card}>
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50% " />
            <Skeleton width={150} height={20} border="14px" className={cls.userName} />
            <Skeleton width={150} height={20} border="14px" className={cls.date} />
          </div>
          <Skeleton width={350} height={36} border="14px" className={cls.title} />
          <Skeleton height={300} className={cls.img} border="14px" />
          <div className={cls.footer}>
            <Skeleton width={200} height={36} border="24px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <div className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.img} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} border="14px" className={cls.type} />
        </div>
        <Skeleton width={200} height={16} border="14px" className={cls.title} />
      </div>
    </div>
  );
});
