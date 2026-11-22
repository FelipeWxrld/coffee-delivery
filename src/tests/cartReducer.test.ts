import { describe, expect, it } from 'vitest'
import type { Order } from '../../@types/coffee'
import {
  addItemAction,
  checkoutAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from './actions'
import { cartReducer, initialCartState, isCartState, MAX_QUANTITY } from './reducer'

describe('cartReducer', () => {
  it('adiciona um novo item ao carrinho', () => {
    const state = cartReducer(initialCartState, addItemAction('latte', 2))
    expect(state.items).toEqual([{ id: 'latte', quantity: 2 }])
  })

  it('soma a quantidade quando o item já existe', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 2))
    state = cartReducer(state, addItemAction('latte', 3))
    expect(state.items).toEqual([{ id: 'latte', quantity: 5 }])
  })

  it('ignora quantidades inválidas', () => {
    const state = cartReducer(initialCartState, addItemAction('latte', 0))
    expect(state).toBe(initialCartState)
  })

  it(`não ultrapassa ${MAX_QUANTITY} unidades`, () => {
    let state = cartReducer(initialCartState, addItemAction('latte', MAX_QUANTITY))
    state = cartReducer(state, incrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('incrementa e decrementa sem ficar abaixo de 1', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, incrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(2)
    state = cartReducer(state, decrementItemAction('latte'))
    state = cartReducer(state, decrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(1)
  })

  it('remove um item', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, addItemAction('cubano', 1))
    state = cartReducer(state, removeItemAction('latte'))
    expect(state.items).toEqual([{ id: 'cubano', quantity: 1 }])
  })

  it('finaliza o pedido salvando-o e esvaziando o carrinho', () => {
    const order = { id: '1' } as Order
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, checkoutAction(order))
    expect(state.items).toHaveLength(0)
    expect(state.lastOrder).toBe(order)
  })

  it('limpa o carrinho', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, clearCartAction())
    expect(state.items).toHaveLength(0)
  })
})

describe('isCartState', () => {
  it('aceita um estado válido', () => {
    expect(isCartState({ items: [{ id: 'latte', quantity: 1 }], lastOrder: null })).toBe(true)
  })

  it.each([null, 'x', { items: 'x' }, { items: [{ id: 1, quantity: 1 }], lastOrder: null }, { items: [{ id: 'a', quantity: 0 }], lastOrder: null }])(
    'rejeita dados corrompidos: %j',
    (value) => {
      expect(isCartState(value)).toBe(false)
    },
  )
})
