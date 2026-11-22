import styled from 'styled-components'
import { media } from '../../styles/themes'

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => `color-mix(in srgb, ${theme.colors.background} 88%, transparent)`};
  backdrop-filter: blur(8px);
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 2rem;

  ${media.small} {
    padding-block: 1.25rem;
  }
`

export const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const Location = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.375rem;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purpleText};
  font-size: 0.875rem;

  svg {
    color: ${({ theme }) => theme.colors.purple};
  }

  ${media.small} {
    justify-content: center;
    width: 2.375rem;
    padding: 0;

    span {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  }
`
