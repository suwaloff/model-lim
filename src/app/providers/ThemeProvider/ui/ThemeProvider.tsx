import { FC, useMemo, useState } from 'react';
import {
  LOCAL_STORAGE_THEME_KEY,
  ThemeContext,
  Theme,
} from '../lib/ThemeContext';

const ThemeProvider: FC = ({ children }) => {
  const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;
  const [theme, SetTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: SetTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
