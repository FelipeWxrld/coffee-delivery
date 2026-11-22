import { createContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { Coffee, DeliveryAddress, Order, PaymentMethod } from '../types/coffee'
import { findCoffee } from '../data/coffees'
import {
  addItemAction,
  checkoutAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from '../reducers/cart/actions'
import { cartReducer, initialCartState, isCartState, type CartState } from '../reducers/cart/reducer'
import { calculateDeliveryFee, calculateSubtotal, countUnits } from '../utils/cart'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

export interface CartItemWithCoffee {
  coffee: Coffee
  quantity: number
  subtotalInCents: number
}

export interface CheckoutData {
  address: DeliveryAddress
  paymentMethod: PaymentMethod
}

export interface CartContextValue {
  items: CartItemWithCoffee[]
  /** Soma das unidades (badge do Header — RF-04). */
  totalQuantity: number
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  lastOrder: Order | null
  addItem: (id: string, quantity: number) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  checkout: (data: CheckoutData) => Order
}

export const CartContext = createContext<CartContextValue | null>(null)

function createOrderId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** Inicialização preguiçosa: restaura do LocalStorage e descarta cafés inexistentes (RN-10). */
function loadInitialState(): CartState {
  const stored = readStorage(STORAGE_KEYS.cart, initialCartState, isCartState)
  return { ...stored, items: stored.items.filter((item) => findCoffee(item.id)) }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  // Persistência (RF-06): toda mudança do estado é salva.
  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, state)
  }, [state])

  const value = useMemo<CartContextValue>(() => {
    const items: CartItemWithCoffee[] = state.items.flatMap((item) => {
      const coffee = findCoffee(item.id)
      return coffee
        ? [{ coffee, quantity: item.quantity, subtotalInCents: coffee.priceInCents * item.quantity }]
        : []
    })

    const subtotalInCents = calculateSubtotal(items)
    const deliveryFeeInCents = calculateDeliveryFee(items)
    const totalInCents = subtotalInCents + deliveryFeeInCents

    return {
      items,
      totalQuantity: countUnits(items),
      subtotalInCents,
      deliveryFeeInCents,
      totalInCents,
      lastOrder: state.lastOrder,
      addItem: (id, quantity) => dispatch(addItemAction(id, quantity)),
      incrementItem: (id) => dispatch(incrementItemAction(id)),
      decrementItem: (id) => dispatch(decrementItemAction(id)),
      removeItem: (id) => dispatch(removeItemAction(id)),
      clearCart: () => dispatch(clearCartAction()),
      checkout: ({ address, paymentMethod }) => {
        if (items.length === 0) {
          throw new Error('Não é possível finalizar um pedido com o carrinho vazio.')
        }
        // Snapshot independente do carrinho (RN-06): nome e preço copiados no momento da compra.
        const order: Order = {
          id: createOrderId(),
          createdAt: new Date().toISOString(),
          address,
          paymentMethod,
          items: items.map(({ coffee, quantity }) => ({
            id: coffee.id,
            name: coffee.name,
            priceInCents: coffee.priceInCents,
            quantity,
          })),
          subtotalInCents,
          deliveryFeeInCents,
          totalInCents,
        }
        dispatch(checkoutAction(order))
        return order
      },
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
