import type { Coffee } from '../types/coffee'

/** Taxa de entrega fixa e fictícia (RN-03). Único lugar onde o valor é definido. */
export const DELIVERY_FEE_IN_CENTS = 350

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99

export interface PricedItem {
  coffee: Coffee
  quantity: number
}

/** subtotal = Σ (preço unitário × quantidade) — RN-03. */
export function calculateSubtotal(items: PricedItem[]): number {
  return items.reduce((sum, { coffee, quantity }) => sum + coffee.priceInCents * quantity, 0)
}

/** Taxa cobrada apenas quando há itens no carrinho. */
export function calculateDeliveryFee(items: PricedItem[]): number {
  return items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0
}

/** Soma das unidades (não dos tipos) — usado no badge do Header (RF-04). */
export function countUnits(items: { quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function clampQuantity(value: number): number {
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value))
}
