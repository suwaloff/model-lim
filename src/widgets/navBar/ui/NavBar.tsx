import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/modal/Modal';
import { useCallback, useState } from 'react';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { ThemeSwitcher } from 'widgets/themeSwitcher';
import { LangSwitcher } from 'widgets/langSwitcher';
import cls from './NavBar.module.scss';
import { LoginModal } from 'features/AuthByUsername';

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  const closeModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const showModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cls.NavBar, {}, [className])}>
      <div className={cls.userСontrols}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
        <Button theme={ButtonTHeme.BACKGROUND} onClick={showModal}>
          Войти
        </Button>
      </div>
      <LoginModal onClose={closeModal} isOpen={isAuthModal} />
    </div>
  );
};
