import styled from 'styled-components'

export const QuantityContainer = styled.div<{ $size: 'md' | 'sm' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: ${({ $size }) => ($size === 'md' ? '2.375rem' : '2rem')};
  padding: ${({ $size }) => ($size === 'md' ? '0.5rem' : '0.25rem 0.5rem')};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.button};

  span {
    min-width: 1.25rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.title};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Área de toque confortável sem alterar o visual do protótipo. */
    min-width: 1.5rem;
    min-height: 1.5rem;
    color: ${({ theme }) => theme.colors.purple};
    transition: color 0.15s;
  }

  button:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.purpleText};
  }
`
