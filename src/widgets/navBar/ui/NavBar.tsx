import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { ThemeSwitcher } from 'widgets/themeSwitcher';
import { LangSwitcher } from 'widgets/langSwitcher';
import { LoginModal, loginActions } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './NavBar.module.scss';

interface NavBarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const { t } = useTranslation();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
    dispatch(loginActions.resetInput());
  }, [dispatch]);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    setIsAuthModal(false);
    dispatch(userActions.logOut());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cls.NavBar, {}, [className])}>
        <div className={cls.userСontrols}>
          <ThemeSwitcher />
          <LangSwitcher className={cls.lang} />
          <Button theme={ButtonTHeme.MAIN} onClick={onLogout}>
            {t('выйти')}
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className={classNames(cls.NavBar, {}, [className])}>
      <div className={cls.userСontrols}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
        <Button theme={ButtonTHeme.MAIN} onClick={onShowModal}>
          {t('войти')}
        </Button>
      </div>
      {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />}
    </header>
  );
});
