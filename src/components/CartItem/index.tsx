import { Trash } from '@phosphor-icons/react'
import type { CartItemWithCoffee } from '../../contexts/CartContext'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/format'
import { CoffeeCup } from '../CoffeeCup'
import { QuantityInput } from '../QuantityInput'
import { Info, ItemActions, ItemContainer, ItemName, ItemPrice, RemoveButton } from './styles'

interface CartItemProps {
  item: CartItemWithCoffee
}

/** Linha do carrinho: aumentar, diminuir (mínimo 1) e remover (RF-05). */
export function CartItem({ item }: CartItemProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { coffee, quantity, subtotalInCents } = item

  return (
    <ItemContainer>
      <CoffeeCup art={coffee.art} size={64} />

      <Info>
        <ItemName>{coffee.name}</ItemName>
        <ItemActions>
          <QuantityInput
            size="sm"
            quantity={quantity}
            label={`Quantidade de ${coffee.name}`}
            onIncrement={() => incrementItem(coffee.id)}
            onDecrement={() => decrementItem(coffee.id)}
          />
          <RemoveButton
            type="button"
            onClick={() => removeItem(coffee.id)}
            aria-label={`Remover ${coffee.name} do carrinho`}
          >
            <Trash size={16} aria-hidden />
            Remover
          </RemoveButton>
        </ItemActions>
      </Info>

      <ItemPrice>{formatCurrency(subtotalInCents)}</ItemPrice>
    </ItemContainer>
  )
}
