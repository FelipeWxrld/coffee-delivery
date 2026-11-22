import { CircleNotch } from '@phosphor-icons/react'
import styled, { keyframes } from 'styled-components'
import { media } from '../../styles/themes'

export const FormCard = styled.section`
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.card};

  ${media.mobile} {
    padding: 1.5rem 1rem;
  }
`

export const CardHeader = styled.header`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;

  svg {
    flex-shrink: 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subtitle};
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 12.5rem 1fr 3.75rem;
  gap: 1rem 0.75rem;

  .cep,
  .number,
  .neighborhood {
    grid-column: 1 / 2;
  }

  .street {
    grid-column: 1 / -1;
  }

  .complement {
    grid-column: 2 / -1;
  }

  .city {
    grid-column: 2 / 3;
  }

  .uf {
    grid-column: 3 / 4;
  }

  /* No celular o endereço vira uma coluna (com Cidade + UF lado a lado). */
  ${media.mobile} {
    grid-template-columns: 1fr 4.5rem;

    .cep,
    .street,
    .number,
    .complement,
    .neighborhood {
      grid-column: 1 / -1;
    }

    .city {
      grid-column: 1 / 2;
    }

    .uf {
      grid-column: 2 / 3;
    }
  }
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const Spinner = styled(CircleNotch)`
  animation: ${spin} 0.8s linear infinite;
`
