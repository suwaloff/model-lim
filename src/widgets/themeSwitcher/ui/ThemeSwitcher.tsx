import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme, Theme } from 'app/providers/ThemeProvider';
import LighTeme from 'shared/assets/icons/light-theme.svg';
import DarkTeme from 'shared/assets/icons/dark-theme.svg';
import { Button } from 'shared/ui/button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { memo } from 'react';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ButtonTHeme.CLEAR}
      square
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkTeme /> : <LighTeme />}
    </Button>
  );
});
