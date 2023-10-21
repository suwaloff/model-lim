import { LOCAL_STORAGE_THEME_KEY, Theme } from './ThemeContext';
import { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

interface IUseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): IUseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  };

  return { theme, toggleTheme };
}
