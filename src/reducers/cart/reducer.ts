import type { CartItem, Order } from '../../@types/coffee'
import { ActionTypes, type CartAction } from './actions'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99

export interface CartState {
  items: CartItem[]
  lastOrder: Order | null
}

export const initialCartState: CartState = { items: [], lastOrder: null }

const clamp = (value: number) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value))

/**
 * Reducer puro do carrinho. Regras de negócio:
 * - adicionar um café já presente soma as quantidades (limitado a MAX_QUANTITY);
 * - a quantidade nunca fica abaixo de 1 (para tirar o item usa-se "Remover");
 * - finalizar o pedido salva o pedido e esvazia o carrinho.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const { id, quantity } = action.payload
      if (!Number.isInteger(quantity) || quantity < MIN_QUANTITY) return state

      const exists = state.items.some((item) => item.id === id)
      const items = exists
        ? state.items.map((item) =>
            item.id === id ? { ...item, quantity: clamp(item.quantity + quantity) } : item,
          )
        : [...state.items, { id, quantity: clamp(quantity) }]

      return { ...state, items }
    }

    case ActionTypes.INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: clamp(item.quantity + 1) } : item,
        ),
      }

    case ActionTypes.DECREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: clamp(item.quantity - 1) } : item,
        ),
      }

    case ActionTypes.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }

    case ActionTypes.CHECKOUT:
      return { items: [], lastOrder: action.payload.order }

    case ActionTypes.CLEAR_CART:
      return { ...state, items: [] }

    default:
      return state
  }
}

/** Valida o formato do estado vindo do LocalStorage. */
export function isCartState(value: unknown): value is CartState {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Partial<CartState>
  return (
    Array.isArray(v.items) &&
    v.items.every(
      (item) =>
        typeof item?.id === 'string' &&
        Number.isInteger(item?.quantity) &&
        item.quantity >= MIN_QUANTITY &&
        item.quantity <= MAX_QUANTITY,
    ) &&
    (v.lastOrder === null || typeof v.lastOrder === 'object')
  )
}
