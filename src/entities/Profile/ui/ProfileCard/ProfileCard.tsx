import { classNames } from 'shared/lib/classNames/classNames';
import { Profile } from 'entities/Profile/model/types/Profile';
import { Loader } from 'shared/ui/loader/Loader';
import { PageError } from 'widgets/PageError';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { className, data, error, isLoading, onChangeFirstName, onChangeLastName, readonly } =
    props;

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className])}>
        <PageError />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className])}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>
        <input
          value={data?.first || ''}
          readOnly={readonly}
          onChange={(e) => onChangeFirstName(e.target.value)}
        ></input>
        <input
          value={data?.lastname || ''}
          readOnly={readonly}
          onChange={(e) => onChangeLastName(e.target.value)}
        ></input>
      </div>
    </div>
  );
};
