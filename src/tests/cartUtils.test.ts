import { describe, expect, it } from 'vitest'
import { findCoffee } from '../data/coffees'
import {
  calculateDeliveryFee,
  calculateSubtotal,
  clampQuantity,
  countUnits,
  DELIVERY_FEE_IN_CENTS,
} from '../utils/cart'

const latte = findCoffee('latte')!
const cubano = findCoffee('cubano')!

describe('cálculos do carrinho (RN-03 / RN-04)', () => {
  const items = [
    { coffee: latte, quantity: 2 },
    { coffee: cubano, quantity: 1 },
  ]

  it('subtotal = Σ preço × quantidade, em centavos', () => {
    expect(calculateSubtotal(items)).toBe(990 * 3)
  })

  it('evita erro de ponto flutuante', () => {
    // 0,10 + 0,20 em reais seria 0.30000000000000004; em centavos é exato.
    const tenCents = { ...latte, priceInCents: 10 }
    const twentyCents = { ...latte, priceInCents: 20 }
    expect(calculateSubtotal([{ coffee: tenCents, quantity: 1 }, { coffee: twentyCents, quantity: 1 }])).toBe(30)
  })

  it('cobra entrega apenas quando há itens', () => {
    expect(calculateDeliveryFee(items)).toBe(DELIVERY_FEE_IN_CENTS)
    expect(calculateDeliveryFee([])).toBe(0)
  })

  it('RF-04: conta unidades, não tipos de café', () => {
    expect(countUnits(items)).toBe(3)
  })

  it('limita a quantidade entre 1 e 99', () => {
    expect(clampQuantity(0)).toBe(1)
    expect(clampQuantity(150)).toBe(99)
    expect(clampQuantity(7)).toBe(7)
  })
})
