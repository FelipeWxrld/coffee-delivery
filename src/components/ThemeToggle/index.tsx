import { Moon, Sun } from '@phosphor-icons/react'
import styled from 'styled-components'
import { useTheme } from '../../hooks/useTheme'

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purple};
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    transform: rotate(-15deg);
  }
`

/** Alterna Light/Dark Mode (RF-14). O rótulo descreve a ação que será executada. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {isDark ? <Sun size={22} weight="fill" /> : <Moon size={22} weight="fill" />}
    </ToggleButton>
  )
}
