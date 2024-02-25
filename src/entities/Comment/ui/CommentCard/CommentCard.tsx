import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/Comment';
import { Text } from 'shared/ui/text/Text';
import cls from './CommentCard.module.scss';
import { Avatar } from 'shared/ui/avatar/Avatar';
import { DEFAULT_USER_AVATAR } from 'shared/consts/localstorage';
import Skeleton from 'shared/ui/skeleton/Skeleton';
import { AppLink } from 'shared/ui/appLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
  const { comment, className, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.userData}>
          <Skeleton width={35} height={35} border="50%" />
          <Skeleton width={100} height={18} border="14px" className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} border="8px" className={cls.text} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.userData}>
        {comment.user.avatar ? (
          <Avatar src={comment.user.avatar} size={35} />
        ) : (
          <Avatar src={DEFAULT_USER_AVATAR} size={35} />
        )}
        <Text title={comment.user.username} className={cls.username} />
      </AppLink>
      <Text text={comment.text} className={cls.text} />
    </div>
  );
};
