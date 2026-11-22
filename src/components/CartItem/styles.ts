import styled from 'styled-components'
import { media } from '../../styles/themes'

export const ItemContainer = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 0.5rem 0.25rem 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.button};

  ${media.small} {
    gap: 0.75rem;

    & > svg {
      width: 48px;
      height: 48px;
    }
  }
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const ItemName = styled.span`
  color: ${({ theme }) => theme.colors.subtitle};
`

export const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  text-transform: uppercase;
  transition: background-color 0.15s;

  svg {
    color: ${({ theme }) => theme.colors.purple};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`

export const ItemPrice = styled.strong`
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
`
