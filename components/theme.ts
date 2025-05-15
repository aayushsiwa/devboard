// theme.ts
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// Common typography
const baseTypography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
  h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
  body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
  button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
};

// Dynamic component overrides
const getComponentOverrides = (theme: Theme): ThemeOptions['components'] => ({
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        },
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.light,
        },
      },
      outlined: {
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 6,
          '& fieldset': {
            borderColor: theme.palette.divider,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          color: theme.palette.primary.light,
        },
      },
    },
  },
});

// Light Theme
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6E40C9',
      contrastText: '#ffffff',
      light: '#A78BFA',
      dark: '#4C2B8A',
    },
    secondary: {
      main: '#2D333B',
      contrastText: '#ffffff',
      light: '#545B64',
      dark: '#1A1F24',
    },
    background: {
      default: '#F5F6F5',
      paper: '#ffffff',
    },
    text: {
      primary: '#2D333B',
      secondary: '#545B64',
    },
    error: { main: '#D32F2F' },
    warning: { main: '#F9A825' },
    success: { main: '#2EA043' },
    divider: '#E1E4E8',
  },
  typography: baseTypography,
  shape: { borderRadius: 6 },
  spacing: 8,
  components: getComponentOverrides(
    // create a temporary theme to pass for overrides
    createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#6E40C9',
          contrastText: '#ffffff',
          light: '#A78BFA',
          dark: '#4C2B8A',
        },
        secondary: {
          main: '#2D333B',
          contrastText: '#ffffff',
          light: '#545B64',
          dark: '#1A1F24',
        },
        background: {
          default: '#F5F6F5',
          paper: '#ffffff',
        },
        text: {
          primary: '#2D333B',
          secondary: '#545B64',
        },
        error: { main: '#D32F2F' },
        warning: { main: '#F9A825' },
        success: { main: '#2EA043' },
        divider: '#E1E4E8',
      },
      typography: baseTypography,
      shape: { borderRadius: 6 },
      spacing: 8,
    })
  ),
});

// Dark Theme
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A78BFA',
      contrastText: '#000000',
      light: '#C4B5FD',
      dark: '#6E40C9',
    },
    secondary: {
      main: '#1A1F24',
      contrastText: '#ffffff',
      light: '#2D333B',
      dark: '#000000',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
    error: { main: '#EF5350' },
    warning: { main: '#FFD54F' },
    success: { main: '#2EA043' },
    divider: '#30363d',
  },
  typography: baseTypography,
  shape: { borderRadius: 6 },
  spacing: 8,
  components: getComponentOverrides(
    createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#A78BFA',
          contrastText: '#000000',
          light: '#C4B5FD',
          dark: '#6E40C9',
        },
        secondary: {
          main: '#1A1F24',
          contrastText: '#ffffff',
          light: '#2D333B',
          dark: '#000000',
        },
        background: {
          default: '#0D1117',
          paper: '#161B22',
        },
        text: {
          primary: '#E6EDF3',
          secondary: '#8B949E',
        },
        error: { main: '#EF5350' },
        warning: { main: '#FFD54F' },
        success: { main: '#2EA043' },
        divider: '#30363d',
      },
      typography: baseTypography,
      shape: { borderRadius: 6 },
      spacing: 8,
    })
  ),
});
