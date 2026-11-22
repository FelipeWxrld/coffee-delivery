import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/format'
import { CartItem } from '../CartItem'
import { ConfirmButton, Items, SummaryCard, Totals } from './styles'

interface CartSummaryProps {
  isSubmitting?: boolean
}

/** Itens selecionados + subtotal, entrega e total (RF-10) + botão de confirmação. */
export function CartSummary({ isSubmitting = false }: CartSummaryProps) {
  const { items, subtotalInCents, deliveryFeeInCents, totalInCents } = useCart()

  return (
    <SummaryCard aria-label="Resumo do pedido">
      <Items>
        {items.map((item) => (
          <CartItem key={item.coffee.id} item={item} />
        ))}
      </Items>

      <Totals>
        <div>
          <dt>Total de itens</dt>
          <dd data-testid="order-subtotal">{formatCurrency(subtotalInCents)}</dd>
        </div>
        <div>
          <dt>Entrega</dt>
          <dd>{formatCurrency(deliveryFeeInCents)}</dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd data-testid="order-total">{formatCurrency(totalInCents)}</dd>
        </div>
      </Totals>

      <ConfirmButton type="submit" disabled={isSubmitting || items.length === 0}>
        Confirmar pedido
      </ConfirmButton>
    </SummaryCard>
  )
}
