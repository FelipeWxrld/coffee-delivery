import type { ReactNode } from 'react'
import styled from 'styled-components'
import { PrimaryLink } from '../../styles/shared'
import { CoffeeCup } from '../CoffeeCup'

const EmptyContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 1.25rem;
  text-align: center;

  h1 {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 2rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.title};
  }
`

interface EmptyStateProps {
  title: string
  description: ReactNode
  actionLabel?: string
  actionTo?: string
}

/** Estado vazio reutilizável (RN-09): carrinho vazio, pedido inexistente, 404. */
export function EmptyState({ title, description, actionLabel = 'Ver cafés', actionTo = '/' }: EmptyStateProps) {
  return (
    <EmptyContainer role="status">
      <CoffeeCup art={{ liquid: '#D7D5D5', pattern: 'none' }} size={140} />
      <h1>{title}</h1>
      <p>{description}</p>
      <PrimaryLink to={actionTo}>{actionLabel}</PrimaryLink>
    </EmptyContainer>
  )
}

export function EmptyCart() {
  return (
    <EmptyState
      title="Seu carrinho está vazio"
      description="Adicione um café delicioso para continuar com o pedido."
    />
  )
}
