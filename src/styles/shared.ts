import { Link } from 'react-router'
import styled from 'styled-components'

/** Largura máxima e respiro lateral comuns a todas as páginas. */
export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container};
  margin-inline: auto;
  padding-inline: 1.25rem;
`

export const TitleL = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.title};
`

export const TitleXS = styled.h2`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const PrimaryLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.purple};
  }
`
