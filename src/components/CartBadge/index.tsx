import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { useCart } from '../../hooks/useCart'

const CartLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.yellowDark};
`

const Counter = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.yellowDark};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.75rem;
  font-weight: 700;
`

/** Botão do carrinho com contador da soma das unidades (RF-04). */
export function CartBadge() {
  const { totalQuantity } = useCart()
  const label = `Carrinho com ${totalQuantity} ${totalQuantity === 1 ? 'unidade' : 'unidades'}`

  return (
    <CartLink to="/checkout" aria-label={label}>
      <ShoppingCart size={22} weight="fill" aria-hidden />
      {totalQuantity > 0 && (
        <Counter data-testid="cart-badge" aria-hidden>
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </Counter>
      )}
    </CartLink>
  )
}
