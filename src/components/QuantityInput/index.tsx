import { Minus, Plus } from '@phosphor-icons/react'
import styles from './QuantityInput.module.css'

interface QuantityInputProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
  size?: 'md' | 'sm'
  label?: string
}

export function QuantityInput({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Quantidade',
}: QuantityInputProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Diminuir quantidade"
      >
        <Minus size={14} weight="bold" />
      </button>
      <span aria-live="polite" data-testid="quantity">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Aumentar quantidade"
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  )
}
