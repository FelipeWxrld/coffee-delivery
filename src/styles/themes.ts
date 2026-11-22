/**
 * Tokens de design (cores semânticas, tipografia, raios e breakpoints).
 * Os valores do tema claro seguem o Style Guide do Figma; o tema escuro
 * mantém a mesma semântica com contraste adequado (WCAG 2.2 AA).
 */
const base = {
  fonts: {
    title: "'Baloo 2', system-ui, sans-serif",
    text: "'Roboto', system-ui, sans-serif",
  },
  radius: { sm: '4px', md: '6px', card: '6px 36px', summary: '6px 44px', pill: '999px' },
  container: '70rem',
} as const

export const lightTheme = {
  ...base,
  name: 'light' as 'light' | 'dark',
  colors: {
    yellowDark: '#C47F17',
    yellow: '#DBAC2C',
    yellowLight: '#F1E9C9',
    purpleDark: '#4B2995',
    purple: '#8047F8',
    purpleLight: '#EBE5F9',
    /** Texto em roxo sobre superfícies (no escuro precisa ser mais claro). */
    purpleText: '#4B2995',

    title: '#272221',
    subtitle: '#403937',
    text: '#574F4D',
    label: '#8D8686',
    hover: '#D7D5D5',
    button: '#E6E5E5',
    input: '#EDEDED',
    card: '#F3F2F2',
    background: '#FAFAFA',
    surface: '#FFFFFF',

    onAccent: '#FFFFFF',
    danger: '#C0392B',
    warning: '#8A5A00',
    focus: '#8047F8',
    heroGlow: 'radial-gradient(circle at 15% 35%, #DBAC2C33 0, transparent 40%), radial-gradient(circle at 85% 60%, #8047F826 0, transparent 40%)',
  },
}

export type AppTheme = typeof lightTheme

export const darkTheme: AppTheme = {
  ...base,
  name: 'dark',
  colors: {
    yellowDark: '#E0A33A',
    yellow: '#E6B843',
    yellowLight: '#3A2F17',
    purpleDark: '#6A3FD9',
    purple: '#A47BFF',
    purpleLight: '#2B2340',
    purpleText: '#C9B3FF',

    title: '#F5F0EC',
    subtitle: '#E8E1DD',
    text: '#CFC6C2',
    label: '#A39893',
    hover: '#4A403B',
    button: '#352D29',
    input: '#2B2421',
    card: '#221C19',
    background: '#16120F',
    surface: '#1D1815',

    onAccent: '#FFFFFF',
    danger: '#FF8A7A',
    warning: '#F2C46B',
    focus: '#C9B3FF',
    heroGlow: 'radial-gradient(circle at 15% 35%, #DBAC2C22 0, transparent 40%), radial-gradient(circle at 85% 60%, #8047F833 0, transparent 40%)',
  },
}

export const themes = { light: lightTheme, dark: darkTheme }

/** Breakpoints (mobile first na leitura: desktop ≥ 1100, tablet 768–1099, mobile < 768). */
export const media = {
  laptop: '@media (max-width: 1100px)',
  tablet: '@media (max-width: 1024px)',
  tabletPortrait: '@media (max-width: 900px)',
  mobile: '@media (max-width: 640px)',
  small: '@media (max-width: 480px)',
}
