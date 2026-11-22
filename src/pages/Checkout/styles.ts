import styled from 'styled-components'
import { media } from '../../styles/themes'

export const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 40rem) minmax(0, 28rem);
  justify-content: space-between;
  gap: 2rem;
  padding-block: 2.5rem 5rem;

  /* Tablet e celular: endereço, pagamento e resumo em uma coluna (RF-15). */
  ${media.tablet} {
    grid-template-columns: minmax(0, 1fr);
    padding-top: 1rem;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & > h1,
  & > h2 {
    margin-bottom: 0.25rem;
  }
`
