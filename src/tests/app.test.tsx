import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { STORAGE_KEYS } from '../utils/storage'
import { renderApp } from './renderApp'
import { coffees } from '../data/coffees'

/** Simula o ViaCEP: um CEP existente, um inexistente e um que falha. */
function mockViaCep() {
  return vi.fn(async (url: string) => {
    if (url.includes('01310100')) {
      return {
        ok: true,
        json: async () => ({ logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' }),
      }
    }
    if (url.includes('99999999')) return { ok: true, json: async () => ({ erro: true }) }
    throw new TypeError('Failed to fetch')
  })
}

function seedCart(items = [{ id: 'latte', quantity: 1 }]) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({ items, lastOrder: null }))
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockViaCep())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Home e catálogo', () => {
  it('RF-01: exibe todos os cafés do catálogo com nome, descrição, preço e tags', () => {
    renderApp()
    expect(screen.getAllByRole('article')).toHaveLength(coffees.length)
    const latte = screen.getByRole('article', { name: 'Latte' })
    expect(within(latte).getByText(/o dobro de leite/i)).toBeInTheDocument()
    expect(within(latte).getByText('9,90')).toBeInTheDocument()
    expect(within(latte).getByText('com leite')).toBeInTheDocument()
  })

  it('filtra por categoria e busca por nome (sem acento)', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: 'alcoólico' }))
    expect(screen.getAllByRole('article')).toHaveLength(coffees.filter((c) => c.tags.includes('alcoólico')).length)

    await user.click(screen.getByRole('button', { name: 'alcoólico' }))
    await user.type(screen.getByLabelText(/buscar café/i), 'arabe')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('article', { name: 'Árabe' })).toBeInTheDocument()
  })

  it('RF-02/03/04/06: adiciona cafés, soma unidades no badge e persiste', async () => {
    const user = userEvent.setup()
    renderApp()

    const latte = screen.getByRole('article', { name: 'Latte' })
    await user.click(within(latte).getByRole('button', { name: /aumentar quantidade/i }))
    await user.click(within(latte).getByRole('button', { name: /adicionar latte/i }))
    await user.click(within(latte).getByRole('button', { name: /adicionar latte/i }))

    const cubano = screen.getByRole('article', { name: 'Cubano' })
    await user.click(within(cubano).getByRole('button', { name: /adicionar cubano/i }))

    // 2 + 1 lattes (mesma linha) + 1 cubano = 4 unidades
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('4')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)
    expect(stored.items).toEqual([
      { id: 'latte', quantity: 3 },
      { id: 'cubano', quantity: 1 },
    ])
  })
})

describe('Checkout', () => {
  it('RF-06: restaura o carrinho salvo e calcula subtotal + entrega', () => {
    seedCart([{ id: 'cubano', quantity: 3 }])
    renderApp('/checkout')
    expect(screen.getByText('Cubano')).toBeInTheDocument()
    expect(screen.getByTestId('order-subtotal')).toHaveTextContent('R$ 29,70')
    expect(screen.getByTestId('order-total')).toHaveTextContent('R$ 33,20')
  })

  it('RF-05: incrementa, decrementa e remove itens atualizando totais e badge', async () => {
    const user = userEvent.setup()
    seedCart([
      { id: 'latte', quantity: 1 },
      { id: 'cubano', quantity: 1 },
    ])
    renderApp('/checkout')

    await user.click(screen.getAllByRole('button', { name: /aumentar quantidade/i })[0])
    expect(screen.getByTestId('order-total')).toHaveTextContent('R$ 33,20')
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('3')

    await user.click(screen.getByRole('button', { name: /remover latte/i }))
    expect(screen.queryByText('Latte')).not.toBeInTheDocument()
    expect(screen.getByTestId('order-total')).toHaveTextContent('R$ 13,40')
  })

  it('RN-09: mostra estado vazio sem itens', () => {
    renderApp('/checkout')
    expect(screen.getByRole('heading', { name: /carrinho está vazio/i })).toBeInTheDocument()
  })

  it('RF-11: exibe erros de validação e não confirma formulário vazio', async () => {
    const user = userEvent.setup()
    seedCart()
    renderApp('/checkout')

    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByText('Informe um CEP válido (00000-000)')).toBeInTheDocument()
    expect(screen.getByText('Selecione uma forma de pagamento')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /pedido confirmado/i })).not.toBeInTheDocument()
  })

  it('RF-08: preenche rua, bairro, cidade e UF a partir do CEP', async () => {
    const user = userEvent.setup()
    seedCart()
    renderApp('/checkout')

    await user.type(screen.getByLabelText('CEP'), '01310100')

    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Avenida Paulista'))
    expect(screen.getByLabelText('CEP')).toHaveValue('01310-100')
    expect(screen.getByLabelText('Bairro')).toHaveValue('Bela Vista')
    expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
    expect(screen.getByLabelText('UF')).toHaveValue('SP')
    expect(screen.getByLabelText('Número')).toHaveValue('')
    expect(screen.getByText(/endereço encontrado/i)).toBeInTheDocument()
  })

  it('RN-07: informa CEP não encontrado e impede a confirmação', async () => {
    const user = userEvent.setup()
    seedCart()
    renderApp('/checkout')

    await user.type(screen.getByLabelText('CEP'), '99999999')
    expect(await screen.findByText(/cep não encontrado/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText('Rua'), 'Rua Teste')
    await user.type(screen.getByLabelText('Número'), '10')
    await user.type(screen.getByLabelText('Bairro'), 'Centro')
    await user.type(screen.getByLabelText('Cidade'), 'Recife')
    await user.type(screen.getByLabelText('UF'), 'PE')
    await user.click(screen.getByText('Dinheiro'))
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByText(/cep não encontrado/i)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /pedido confirmado/i })).not.toBeInTheDocument()
  })

  it('RN-07: em falha da API permite preencher manualmente e confirmar', async () => {
    const user = userEvent.setup()
    seedCart()
    renderApp('/checkout')

    await user.type(screen.getByLabelText('CEP'), '12345678')
    expect(await screen.findByText(/não foi possível consultar o cep/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText('Rua'), 'Rua das Flores')
    await user.type(screen.getByLabelText('Número'), '12')
    await user.type(screen.getByLabelText('Bairro'), 'Centro')
    await user.type(screen.getByLabelText('Cidade'), 'Curitiba')
    await user.type(screen.getByLabelText('UF'), 'pr')
    await user.click(screen.getByText('Cartão de débito'))
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('heading', { name: /pedido confirmado/i })).toBeInTheDocument()
    expect(screen.getByText(/rua das flores, 12/i)).toBeInTheDocument()
    // UF digitada em minúsculas é salva em maiúsculas.
    expect(within(screen.getByRole('main')).getByText(/Curitiba, PR/)).toBeInTheDocument()
  })
})

describe('Confirmação', () => {
  it('RF-12/13: confirma o pedido, mostra o resumo e esvazia o carrinho', async () => {
    const user = userEvent.setup()
    seedCart([{ id: 'latte', quantity: 2 }])
    renderApp('/checkout')

    await user.type(screen.getByLabelText('CEP'), '01310100')
    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Avenida Paulista'))
    await user.type(screen.getByLabelText('Número'), '1000')
    await user.type(screen.getByLabelText(/complemento/i), 'Apto 42')
    await user.click(screen.getByText('Dinheiro'))
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('heading', { name: /pedido confirmado/i })).toBeInTheDocument()
    expect(screen.getByText(/avenida paulista, 1000 - apto 42/i)).toBeInTheDocument()
    expect(screen.getByText('Dinheiro')).toBeInTheDocument()
    expect(screen.getByText(/R\$ 23,30/)).toBeInTheDocument()
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument()

    // RN-06: o snapshot do pedido sobrevive ao carrinho vazio.
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)
    expect(stored.items).toEqual([])
    expect(stored.lastOrder.items).toEqual([{ id: 'latte', name: 'Latte', priceInCents: 990, quantity: 2 }])
  })

  it('RN-09: /success sem pedido mostra mensagem de estado vazio', () => {
    renderApp('/success')
    expect(screen.getByRole('heading', { name: /nenhum pedido confirmado/i })).toBeInTheDocument()
  })
})

describe('Tema, rotas e acessibilidade', () => {
  it('RF-14: alterna Light/Dark e persiste a escolha', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: /ativar modo escuro/i }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"')
    await user.click(screen.getByRole('button', { name: /ativar modo claro/i }))
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('RF-14: restaura o tema salvo', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '"dark"')
    renderApp()
    expect(screen.getByRole('button', { name: /ativar modo claro/i })).toBeInTheDocument()
  })

  it('RF-07: navega da Home ao Checkout pelo carrinho, sem recarregar', async () => {
    const user = userEvent.setup()
    seedCart()
    renderApp()
    await user.click(screen.getByRole('link', { name: /carrinho com 1 unidade/i }))
    expect(screen.getByRole('heading', { name: /complete seu pedido/i })).toBeInTheDocument()
  })

  it('exibe página 404 para rotas inexistentes', () => {
    renderApp('/rota-inexistente')
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument()
  })
})
