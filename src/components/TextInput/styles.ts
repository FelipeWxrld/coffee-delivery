import styled from 'styled-components'

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

export const FieldBox = styled.div<{ $invalid: boolean }>`
  display: flex;
  align-items: center;
  height: 2.625rem;
  padding: 0 0.75rem;
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.button)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.input};
  transition: border-color 0.15s;

  &:focus-within {
    border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.yellowDark)};
  }

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.label};
  }
`

export const OptionalTag = styled.span`
  font-size: 0.75rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.label};
`

export const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`

export const Hint = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.label};
`
