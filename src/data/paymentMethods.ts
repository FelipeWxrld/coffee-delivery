import type { PaymentMethod } from '../types/coffee'

/** Rótulos das formas de pagamento (apenas informativas — RN-05). */
export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  credit: 'Cartão de crédito',
  debit: 'Cartão de débito',
  cash: 'Dinheiro',
}

export const PAYMENT_METHODS = Object.keys(PAYMENT_LABELS) as PaymentMethod[]
