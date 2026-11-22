import { createContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { Address, Coffee, Order, PaymentMethod } from '../@types/coffee'
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
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

export const DELIVERY_FEE_IN_CENTS = 350

export interface CartItemWithCoffee {
  coffee: Coffee
  quantity: number
  subtotalInCents: number
}

export interface CheckoutData {
  address: Address
  paymentMethod: PaymentMethod
}

export interface CartContextValue {
  items: CartItemWithCoffee[]
  /** Soma das quantidades (badge do carrinho). */
  totalQuantity: number
  itemsTotalInCents: number
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

function loadInitialState(): CartState {
  const stored = readStorage(STORAGE_KEYS.cart, initialCartState, isCartState)
  // Descarta itens cujo café não existe mais no catálogo.
  return { ...stored, items: stored.items.filter((item) => findCoffee(item.id)) }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  // Persistência: toda mudança do estado do carrinho é salva no LocalStorage.
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

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const itemsTotalInCents = items.reduce((sum, item) => sum + item.subtotalInCents, 0)
    const deliveryFeeInCents = items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0

    return {
      items,
      totalQuantity,
      itemsTotalInCents,
      deliveryFeeInCents,
      totalInCents: itemsTotalInCents + deliveryFeeInCents,
      lastOrder: state.lastOrder,
      addItem: (id, quantity) => dispatch(addItemAction(id, quantity)),
      incrementItem: (id) => dispatch(incrementItemAction(id)),
      decrementItem: (id) => dispatch(decrementItemAction(id)),
      removeItem: (id) => dispatch(removeItemAction(id)),
      clearCart: () => dispatch(clearCartAction()),
      checkout: ({ address, paymentMethod }) => {
        if (state.items.length === 0) {
          throw new Error('Não é possível finalizar um pedido com o carrinho vazio.')
        }
        const order: Order = {
          id: createOrderId(),
          createdAt: new Date().toISOString(),
          address,
          paymentMethod,
          items: state.items,
          itemsTotalInCents,
          deliveryFeeInCents,
          totalInCents: itemsTotalInCents + deliveryFeeInCents,
        }
        dispatch(checkoutAction(order))
        return order
      },
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
