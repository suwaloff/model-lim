import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/text/Text';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../index';

interface CommentListProps {
  className?: string;
  comments: Comment[];
  isLoading: boolean;
}

export const CommentList = (props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments.length ? (
        comments.map((comment) => (
          <CommentCard comment={comment} isLoading={isLoading} key={comment.id} />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </div>
  );
};
