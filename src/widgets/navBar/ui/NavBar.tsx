import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/modal/Modal';
import { useCallback, useState } from 'react';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { ThemeSwitcher } from 'widgets/themeSwitcher';
import { LangSwitcher } from 'widgets/langSwitcher';
import cls from './NavBar.module.scss';

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToogleModal = useCallback(() => {
    setIsAuthModal((prew) => !prew);
  }, []);

  return (
    <div className={classNames(cls.NavBar, {}, [className])}>
      <div className={cls.userСontrols}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
        <Button theme={ButtonTHeme.BACKGROUND} onClick={onToogleModal}>
          Войти
        </Button>
      </div>
      <Modal isOpen={isAuthModal} onClose={onToogleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil veniam ducimus eligendi
        reiciendis asperiores aliquid quidem deserunt ipsam quos eveniet, provident architecto,
        consequuntur libero! Placeat laborum temporibus exercitationem ea.
      </Modal>
    </div>
  );
};
