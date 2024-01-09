import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { ThemeSwitcher } from 'widgets/themeSwitcher';
import { LangSwitcher } from 'widgets/langSwitcher';
import { LoginModal, loginActions } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import cls from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  const dispatch = useDispatch();
  const { authData } = useSelector(getUserAuthData);
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
      <div className={classNames(cls.NavBar, {}, [className])}>
        <div className={cls.userСontrols}>
          <ThemeSwitcher />
          <LangSwitcher className={cls.lang} />
          <Button theme={ButtonTHeme.BACKGROUND} onClick={onLogout}>
            {t('выйти')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.NavBar, {}, [className])}>
      <div className={cls.userСontrols}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
        <Button theme={ButtonTHeme.BACKGROUND} onClick={onShowModal}>
          {t('войти')}
        </Button>
      </div>
      <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />
    </div>
  );
};
