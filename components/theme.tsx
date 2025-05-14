"use client"

import { type ReactNode, useState, useMemo, createContext, useContext } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import type { PaletteMode } from "@mui/material"

// Create a context for the theme mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "dark" as PaletteMode,
})

// Custom hook to use the color mode context
export const useColorMode = () => useContext(ColorModeContext)

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("dark")

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
      mode,
    }),
    [mode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light mode
                primary: {
                  main: "#6366F1",
                },
                secondary: {
                  main: "#9333EA",
                },
                background: {
                  default: "#F9FAFB",
                  paper: "#FFFFFF",
                },
              }
            : {
                // Dark mode
                primary: {
                  main: "#818CF8",
                },
                secondary: {
                  main: "#A78BFA",
                },
                background: {
                  default: "#111827",
                  paper: "#1F2937",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow:
                  mode === "dark"
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 6,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 6,
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
