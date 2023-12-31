import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Button, ButtonTHeme } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h1 className={cls.authHeader}>{t('Авторизация')}</h1>
      <input type="text" placeholder={t('Логин')} className={cls.loginInput} />
      <input type="text" placeholder={t('Пароль')} className={cls.loginInput} />
      <Button className={cls.loginBtn} theme={ButtonTHeme.BACKGROUND}>
        {t('Войти')}
      </Button>
      <div className={cls.linksSection}>
        <h3>регистрация</h3>
        <h3>забыли пароль?</h3>
      </div>
    </div>
  );
};
