import type { Order } from '../../@types/coffee'

export const ActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  INCREMENT_ITEM: 'INCREMENT_ITEM',
  DECREMENT_ITEM: 'DECREMENT_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CHECKOUT: 'CHECKOUT',
  CLEAR_CART: 'CLEAR_CART',
} as const

export type CartAction =
  | { type: typeof ActionTypes.ADD_ITEM; payload: { id: string; quantity: number } }
  | { type: typeof ActionTypes.INCREMENT_ITEM; payload: { id: string } }
  | { type: typeof ActionTypes.DECREMENT_ITEM; payload: { id: string } }
  | { type: typeof ActionTypes.REMOVE_ITEM; payload: { id: string } }
  | { type: typeof ActionTypes.CHECKOUT; payload: { order: Order } }
  | { type: typeof ActionTypes.CLEAR_CART }

export const addItemAction = (id: string, quantity: number): CartAction => ({
  type: ActionTypes.ADD_ITEM,
  payload: { id, quantity },
})

export const incrementItemAction = (id: string): CartAction => ({
  type: ActionTypes.INCREMENT_ITEM,
  payload: { id },
})

export const decrementItemAction = (id: string): CartAction => ({
  type: ActionTypes.DECREMENT_ITEM,
  payload: { id },
})

export const removeItemAction = (id: string): CartAction => ({
  type: ActionTypes.REMOVE_ITEM,
  payload: { id },
})

export const checkoutAction = (order: Order): CartAction => ({
  type: ActionTypes.CHECKOUT,
  payload: { order },
})

export const clearCartAction = (): CartAction => ({ type: ActionTypes.CLEAR_CART })
