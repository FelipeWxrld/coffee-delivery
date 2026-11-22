import { describe, expect, it } from 'vitest'
import type { Order } from '../types/coffee'
import {
  addItemAction,
  checkoutAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from '../reducers/cart/actions'
import { cartReducer, initialCartState, isCartState } from '../reducers/cart/reducer'
import { MAX_QUANTITY } from '../utils/cart'

describe('cartReducer', () => {
  it('RF-03: adiciona um novo item ao carrinho', () => {
    const state = cartReducer(initialCartState, addItemAction('latte', 2))
    expect(state.items).toEqual([{ id: 'latte', quantity: 2 }])
  })

  it('RN-02: soma a quantidade quando o item já existe, sem duplicar linhas', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 2))
    state = cartReducer(state, addItemAction('latte', 3))
    expect(state.items).toEqual([{ id: 'latte', quantity: 5 }])
  })

  it.each([0, -1, 1.5])('RN-01: ignora quantidade inválida na adição (%s)', (quantity) => {
    const state = cartReducer(initialCartState, addItemAction('latte', quantity))
    expect(state).toBe(initialCartState)
  })

  it(`não ultrapassa ${MAX_QUANTITY} unidades por item`, () => {
    let state = cartReducer(initialCartState, addItemAction('latte', MAX_QUANTITY))
    state = cartReducer(state, incrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('RN-01: incrementa e decrementa sem ficar abaixo de 1', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, incrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(2)
    state = cartReducer(state, decrementItemAction('latte'))
    state = cartReducer(state, decrementItemAction('latte'))
    expect(state.items[0].quantity).toBe(1)
  })

  it('RF-05: remove um item individualmente', () => {
    let state = cartReducer(initialCartState, addItemAction('latte', 1))
    state = cartReducer(state, addItemAction('cubano', 1))
    state = cartReducer(state, removeItemAction('latte'))
    expect(state.items).toEqual([{ id: 'cubano', quantity: 1 }])
  })

  it('não altera o estado anterior (imutabilidade)', () => {
    const before = cartReducer(initialCartState, addItemAction('latte', 1))
    const snapshot = structuredClone(before)
    cartReducer(before, incrementItemAction('latte'))
    cartReducer(before, removeItemAction('latte'))
    expect(before).toEqual(snapshot)
  })

  it('RF-13: finaliza o pedido salvando o snapshot e esvaziando o carrinho', () => {
    const order = { id: '1', items: [] } as unknown as Order
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

  it.each([
    null,
    'x',
    { items: 'x' },
    { items: [{ id: 1, quantity: 1 }], lastOrder: null },
    { items: [{ id: 'a', quantity: 0 }], lastOrder: null },
    { items: [], lastOrder: { id: 'sem-itens' } },
  ])('rejeita dados corrompidos: %j', (value) => {
    expect(isCartState(value)).toBe(false)
  })
})
