import styled from 'styled-components'
import { media } from '../../styles/themes'

export const Options = styled.div`
  display: flex;
  gap: 0.75rem;

  ${media.mobile} {
    flex-direction: column;
  }
`

export const Option = styled.label`
  flex: 1;
  min-width: 0;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 3.1875rem;
    padding: 0 1rem;
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.75rem;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;
  }

  span svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.purple};
  }

  span:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  input:checked + span {
    border-color: ${({ theme }) => theme.colors.purple};
    background: ${({ theme }) => theme.colors.purpleLight};
  }

  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`
