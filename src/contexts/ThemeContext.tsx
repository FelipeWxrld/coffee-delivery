import { createContext, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { GlobalStyle } from '../styles/global'
import { themes } from '../styles/themes'
import { STORAGE_KEYS } from '../utils/storage'

export type ThemeMode = 'light' | 'dark'

export interface ThemeContextValue {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const isThemeMode = (value: unknown): value is ThemeMode => value === 'light' || value === 'dark'

/** Fallback para a preferência do sistema quando não há escolha salva (RF-14). */
function getSystemTheme(): ThemeMode {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(STORAGE_KEYS.theme, getSystemTheme, isThemeMode)

  // Mantém o atributo no <html> (usado pelo script anti-"flash" do index.html).
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [setTheme])

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
