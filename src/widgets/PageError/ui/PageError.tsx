import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import Fail from 'shared/assets/icons/fail.svg';
import cls from './PageError.module.scss';
import { useTranslation } from 'react-i18next';

interface PageErrorProps {
  className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reload = () => {
    location.reload();
  };

  const goToMainPage = () => {
    location.href = '/';
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <Fail />
      <h1>{t('Упс! Что-то пошло не так')}</h1>
      <div>
        <Button theme={ButtonTHeme.MAIN} onClick={reload} className={cls.btn}>
          {t('Обновить')}
        </Button>
        <Button theme={ButtonTHeme.MAIN} onClick={goToMainPage} className={cls.btn}>
          {t('На главную')}
        </Button>
      </div>
    </div>
  );
};
