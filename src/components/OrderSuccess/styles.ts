import styled from 'styled-components'
import { media } from '../../styles/themes'

/** Borda em gradiente amarelo → roxo, como no protótipo. */
export const InfoBorder = styled.div`
  margin-top: 2.5rem;
  padding: 1px;
  border-radius: ${({ theme }) => theme.radius.card};
  background: linear-gradient(
    102.89deg,
    ${({ theme }) => theme.colors.yellow} 2.61%,
    ${({ theme }) => theme.colors.purple} 98.76%
  );
`

export const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.background};
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  li > span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    color: #fff;
  }

  ${media.small} {
    padding: 1.5rem 1.25rem;
  }
`
