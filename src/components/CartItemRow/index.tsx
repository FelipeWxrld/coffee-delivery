import { Trash } from '@phosphor-icons/react'
import type { CartItemWithCoffee } from '../../contexts/CartContext'
import { useCart } from '../../hooks/useCart'
import { MAX_QUANTITY } from '../../reducers/cart/reducer'
import { formatCurrency } from '../../utils/format'
import { CoffeeCup } from '../CoffeeCup'
import { QuantityInput } from '../QuantityInput'
import styles from './CartItemRow.module.css'

interface CartItemRowProps {
  item: CartItemWithCoffee
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { coffee, quantity, subtotalInCents } = item

  return (
    <li className={styles.row}>
      <CoffeeCup art={coffee.art} size={64} />

      <div className={styles.info}>
        <span className={styles.name}>{coffee.name}</span>
        <div className={styles.actions}>
          <QuantityInput
            size="sm"
            quantity={quantity}
            max={MAX_QUANTITY}
            label={`Quantidade de ${coffee.name}`}
            onIncrement={() => incrementItem(coffee.id)}
            onDecrement={() => decrementItem(coffee.id)}
          />
          <button
            type="button"
            className={styles.remove}
            onClick={() => removeItem(coffee.id)}
            aria-label={`Remover ${coffee.name} do carrinho`}
          >
            <Trash size={16} />
            Remover
          </button>
        </div>
      </div>

      <strong className={styles.price}>{formatCurrency(subtotalInCents)}</strong>
    </li>
  )
}
