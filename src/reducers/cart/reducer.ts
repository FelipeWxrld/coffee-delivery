import type { CartItem, Order } from '../../types/coffee'
import { clampQuantity, MAX_QUANTITY, MIN_QUANTITY } from '../../utils/cart'
import { ActionTypes, type CartAction } from './actions'

export interface CartState {
  items: CartItem[]
  lastOrder: Order | null
}

export const initialCartState: CartState = { items: [], lastOrder: null }

/**
 * Reducer puro e imutável do carrinho (map/filter/spread; nunca altera o estado recebido).
 * - RN-01: adição exige quantidade inteira ≥ 1; no carrinho o "−" para em 1
 *   (para tirar o item usa-se "Remover").
 * - RN-02: adicionar um café já presente soma a quantidade, sem duplicar linhas.
 * - RN-06 / RF-13: finalizar guarda o snapshot do pedido e esvazia o carrinho.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const { id, quantity } = action.payload
      if (!Number.isInteger(quantity) || quantity < MIN_QUANTITY) return state

      const exists = state.items.some((item) => item.id === id)
      const items = exists
        ? state.items.map((item) =>
            item.id === id ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
          )
        : [...state.items, { id, quantity: clampQuantity(quantity) }]

      return { ...state, items }
    }

    case ActionTypes.INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: clampQuantity(item.quantity + 1) } : item,
        ),
      }

    case ActionTypes.DECREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: clampQuantity(item.quantity - 1) } : item,
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

/** Valida o formato do estado vindo do LocalStorage (dados corrompidos são descartados). */
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
    (v.lastOrder === null ||
      (typeof v.lastOrder === 'object' && Array.isArray((v.lastOrder as Order).items)))
  )
}
