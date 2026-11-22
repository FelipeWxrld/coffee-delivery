import styled from 'styled-components'
import { media } from '../../styles/themes'

export const SummaryCard = styled.section`
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.summary};
  background: ${({ theme }) => theme.colors.card};

  ${media.mobile} {
    padding: 1.5rem 1rem;
    border-radius: ${({ theme }) => theme.radius.card};
  }
`

export const Items = styled.ul`
  list-style: none;
`

export const Totals = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  div {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  dd {
    font-size: 1rem;
  }

  .total {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
  }

  .total dd {
    font-size: 1.25rem;
  }
`

export const ConfirmButton = styled.button`
  width: 100%;
  min-height: 2.875rem;
  margin-top: 1.5rem;
  padding: 0.75rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.yellow};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.yellowDark};
  }
`
