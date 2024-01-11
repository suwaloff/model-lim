import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTHeme } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { memo, useCallback, ChangeEvent, useEffect } from 'react';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/text/Text';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    store.reducerManager.add('login', loginReducer);

    return () => {
      store.reducerManager.remove('login');
    };
  }, []);

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

export default LoginForm;
