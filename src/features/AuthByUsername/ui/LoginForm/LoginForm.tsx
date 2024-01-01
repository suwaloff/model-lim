import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Button, ButtonTHeme } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import { memo, useCallback, ChangeEvent } from 'react';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/text/Text';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);

  const onChangeUsername = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      dispatch(loginActions.setUsername(event?.target?.value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      dispatch(loginActions.setPassword(event?.target?.value));
    },
    [dispatch]
  );

  const setLoginValue = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
    dispatch(loginActions.resetInput());
  }, [username, password, dispatch]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h1 className={cls.authHeader}>{t('Авторизация')}</h1>
      <input
        type="text"
        placeholder={t('Логин')}
        className={cls.loginInput}
        onChange={onChangeUsername}
        value={username}
      />
      <input
        type="password"
        placeholder={t('Пароль')}
        className={cls.loginInput}
        onChange={onChangePassword}
        value={password}
      />
      {error && <Text text={error} theme={TextTheme.ERROR} />}
      <Button
        className={cls.loginBtn}
        theme={ButtonTHeme.BACKGROUND}
        onClick={setLoginValue}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
      <div className={cls.linksSection}>
        {/* fix------------------------------------------------------------------- */}
        <h3>регистрация</h3>
        <h3>забыли пароль?</h3>
      </div>
    </div>
  );
});
