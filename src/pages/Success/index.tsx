import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { Link, Navigate } from 'react-router'
import type { PaymentMethod } from '../../@types/coffee'
import { DeliveryIllustration } from '../../components/DeliveryIllustration'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/format'
import styles from './Success.module.css'

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

export function Success() {
  const { lastOrder } = useCart()

  // Sem pedido finalizado não há o que confirmar.
  if (!lastOrder) return <Navigate to="/" replace />

  const { address, paymentMethod, totalInCents } = lastOrder

  return (
    <section className={`container ${styles.success}`}>
      <div>
        <h1>Uhu! Pedido confirmado</h1>
        <p className={styles.subtitle}>Agora é só aguardar que logo o café chegará até você</p>

        <div className={styles.infoBorder}>
          <ul className={styles.info}>
            <li>
              <span style={{ backgroundColor: 'var(--color-purple)' }}>
                <MapPin size={16} weight="fill" />
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
              <span style={{ backgroundColor: 'var(--color-yellow)' }}>
                <Timer size={16} weight="fill" />
              </span>
              <p>
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </p>
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--color-yellow-dark)' }}>
                <CurrencyDollar size={16} />
              </span>
              <p>
                Pagamento na entrega ({formatCurrency(totalInCents)})
                <br />
                <strong>{PAYMENT_LABELS[paymentMethod]}</strong>
              </p>
            </li>
          </ul>
        </div>

        <Link to="/" className={styles.back}>
          Fazer novo pedido
        </Link>
      </div>

      <DeliveryIllustration />
    </section>
  )
}
