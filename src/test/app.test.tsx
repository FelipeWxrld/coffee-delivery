import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { STORAGE_KEYS } from '../utils/storage'
import { renderApp } from './renderApp'

beforeEach(() => {
  // Evita chamadas reais ao ViaCEP durante os testes.
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Coffee Delivery — fluxo da aplicação', () => {
  it('exibe o catálogo com 14 cafés', () => {
    renderApp()
    expect(screen.getByRole('heading', { name: /nossos cafés/i })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(14)
  })

  it('filtra o catálogo por categoria', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: 'alcoólico' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('adiciona cafés ao carrinho, atualiza o badge e persiste no LocalStorage', async () => {
    const user = userEvent.setup()
    renderApp()

    const latte = screen.getByRole('article', { name: 'Latte' })
    await user.click(within(latte).getByRole('button', { name: /aumentar quantidade/i }))
    await user.click(within(latte).getByRole('button', { name: /adicionar latte/i }))

    expect(screen.getByTestId('cart-badge')).toHaveTextContent('2')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)
    expect(stored.items).toEqual([{ id: 'latte', quantity: 2 }])
  })

  it('restaura o carrinho salvo no LocalStorage', () => {
    localStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify({ items: [{ id: 'cubano', quantity: 3 }], lastOrder: null }),
    )
    renderApp('/checkout')
    expect(screen.getByText('Cubano')).toBeInTheDocument()
    // 3 x 9,90 + 3,50 de entrega
    expect(screen.getByTestId('order-total')).toHaveTextContent('R$ 33,20')
  })

  it('mostra estado vazio no checkout sem itens', () => {
    renderApp('/checkout')
    expect(screen.getByRole('heading', { name: /carrinho está vazio/i })).toBeInTheDocument()
  })

  it('exibe erros de validação ao enviar o formulário vazio', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify({ items: [{ id: 'latte', quantity: 1 }], lastOrder: null }),
    )
    renderApp('/checkout')

    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByText('Informe um CEP válido (00000-000)')).toBeInTheDocument()
    expect(screen.getByText('Selecione uma forma de pagamento')).toBeInTheDocument()
  })

  it('finaliza o pedido e mostra a confirmação', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify({ items: [{ id: 'latte', quantity: 1 }], lastOrder: null }),
    )
    renderApp('/checkout')

    await user.type(screen.getByLabelText('CEP'), '01310100')
    await user.type(screen.getByLabelText('Rua'), 'Avenida Paulista')
    await user.type(screen.getByLabelText('Número'), '1000')
    await user.type(screen.getByLabelText('Bairro'), 'Bela Vista')
    await user.type(screen.getByLabelText('Cidade'), 'São Paulo')
    await user.type(screen.getByLabelText('UF'), 'sp')
    await user.click(screen.getByLabelText(/dinheiro/i))
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('heading', { name: /pedido confirmado/i })).toBeInTheDocument()
    expect(screen.getByText(/avenida paulista, 1000/i)).toBeInTheDocument()
    expect(screen.getByText('Dinheiro')).toBeInTheDocument()
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument()
  })

  it('alterna entre Light e Dark Mode', async () => {
    const user = userEvent.setup()
    renderApp()
    const toggle = screen.getByRole('button', { name: /ativar modo escuro/i })
    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"')
    await user.click(screen.getByRole('button', { name: /ativar modo claro/i }))
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('redireciona /success para a home quando não há pedido', () => {
    renderApp('/success')
    expect(screen.getByRole('heading', { name: /nossos cafés/i })).toBeInTheDocument()
  })

  it('exibe página 404 para rotas inexistentes', () => {
    renderApp('/rota-inexistente')
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument()
  })
})
