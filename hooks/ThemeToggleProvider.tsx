import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { lightTheme, darkTheme } from '../components/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ColorModeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  setMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeToggleProvider = ({ children }: { children: ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setModeState] = useState<ThemeMode>('light');

  // Read saved mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode) {
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode: ThemeMode) => {
    localStorage.setItem('themeMode', newMode);
    setModeState(newMode);
  };

  const effectiveMode = useMemo(() => {
    return mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode;
  }, [mode, prefersDarkMode]);

  const theme = useMemo(() => {
    return effectiveMode === 'light' ? lightTheme : darkTheme;
  }, [effectiveMode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
