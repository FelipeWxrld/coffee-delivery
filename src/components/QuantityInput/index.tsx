import { Minus, Plus } from '@phosphor-icons/react'
import { MAX_QUANTITY, MIN_QUANTITY } from '../../utils/cart'
import { QuantityContainer } from './styles'

interface QuantityInputProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
  size?: 'md' | 'sm'
  /** Nome acessível do grupo, ex.: "Quantidade de Latte". */
  label?: string
}

/** Seletor controlado "− n +" reutilizado no card do catálogo e no carrinho. */
export function QuantityInput({
  quantity,
  onIncrement,
  onDecrement,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
  size = 'md',
  label = 'Quantidade',
}: QuantityInputProps) {
  return (
    <QuantityContainer $size={size} role="group" aria-label={label}>
      <button type="button" onClick={onDecrement} disabled={quantity <= min} aria-label="Diminuir quantidade">
        <Minus size={14} weight="bold" />
      </button>
      <span aria-live="polite" data-testid="quantity">
        {quantity}
      </span>
      <button type="button" onClick={onIncrement} disabled={quantity >= max} aria-label="Aumentar quantidade">
        <Plus size={14} weight="bold" />
      </button>
    </QuantityContainer>
  )
}
