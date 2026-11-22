import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { useTheme as useStyledTheme } from 'styled-components'
import { PAYMENT_LABELS } from '../../data/paymentMethods'
import type { Order } from '../../types/coffee'
import { formatCurrency } from '../../utils/format'
import { InfoBorder, InfoList } from './styles'

interface OrderSuccessProps {
  order: Order
}

/** Resumo do pedido confirmado, lido do snapshot `order` (RF-12, RN-06). */
export function OrderSuccess({ order }: OrderSuccessProps) {
  const { colors } = useStyledTheme()
  const { address, paymentMethod, totalInCents } = order

  return (
    <InfoBorder>
      <InfoList>
        <li>
          <span style={{ backgroundColor: colors.purple }}>
            <MapPin size={16} weight="fill" aria-hidden />
          </span>
          <p>
            Entrega em{' '}
            <strong>
              {address.street}, {address.number}
              {address.complement ? ` - ${address.complement}` : ''}
            </strong>
            <br />
            {address.neighborhood} - {address.city}, {address.uf}
          </p>
        </li>
        <li>
          <span style={{ backgroundColor: colors.yellow }}>
            <Timer size={16} weight="fill" aria-hidden />
          </span>
          <p>
            Previsão de entrega
            <br />
            <strong>20 min - 30 min</strong>
          </p>
        </li>
        <li>
          <span style={{ backgroundColor: colors.yellowDark }}>
            <CurrencyDollar size={16} aria-hidden />
          </span>
          <p>
            Pagamento na entrega ({formatCurrency(totalInCents)})
            <br />
            <strong>{PAYMENT_LABELS[paymentMethod]}</strong>
          </p>
        </li>
      </InfoList>
    </InfoBorder>
  )
}
