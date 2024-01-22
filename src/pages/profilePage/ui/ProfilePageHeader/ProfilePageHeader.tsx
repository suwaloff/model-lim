import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTHeme } from 'shared/ui/button';
import { Text } from 'shared/ui/text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePageHeader.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions } from 'entities/Profile';
import { useCallback } from 'react';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')}></Text>
      {readonly ? (
        <Button theme={ButtonTHeme.OUTLINE} onClick={onEdit}>
          {' '}
          {t('Редактировать')}
        </Button>
      ) : (
        <Button theme={ButtonTHeme.OUTLINE} onClick={onCancelEdit}>
          {' '}
          {t('Отмена')}
        </Button>
      )}
    </div>
  );
};
