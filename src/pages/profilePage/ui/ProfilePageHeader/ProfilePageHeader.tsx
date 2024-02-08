import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTHeme } from 'shared/ui/button';
import { Text } from 'shared/ui/text/Text';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const data = useSelector(getProfileData);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={data?.username} className={cls.title} ></Text>
      {readonly ? (
        <Button theme={ButtonTHeme.OUTLINE} onClick={onEdit} className={cls.editBtn} >
          {' '}
          {t('Редактировать')}
        </Button>
      ) : (
        <>
          <Button theme={ButtonTHeme.OUTLINE_RED} onClick={onCancelEdit} className={cls.editBtn}>
            {' '}
            {t('Отмена')}
          </Button>
          <Button theme={ButtonTHeme.OUTLINE} onClick={onSave} className={cls.btn}>
            {' '}
            {t('Сохранить')}
          </Button>
        </>
      )}
    </div>
  );
};
