import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/appLink/AppLink';
import cls from './NavBar.module.scss';
import { ThemeSwitcher } from 'widgets/themeSwitcher';

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  return (
    <div className={classNames(cls.NavBar, {}, [className])}>
      <ThemeSwitcher />
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.PRIMARY} className={cls.main} to={'/'}>
          Main
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.about}
          to={'/about'}
        >
          About
        </AppLink>
      </div>
    </div>
  );
};
