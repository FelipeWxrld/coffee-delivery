import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchAddressByCep } from '../services/viacep'

afterEach(() => {
  vi.unstubAllGlobals()
})

function mockFetch(implementation: () => Promise<unknown>) {
  const fetchMock = vi.fn(implementation)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('fetchAddressByCep (RF-08 / RN-07)', () => {
  it('retorna o endereço quando o CEP existe', async () => {
    const fetchMock = mockFetch(async () => ({
      ok: true,
      json: async () => ({ logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' }),
    }))

    const result = await fetchAddressByCep('01310-100')

    expect(fetchMock).toHaveBeenCalledWith('https://viacep.com.br/ws/01310100/json/', expect.anything())
    expect(result).toEqual({
      status: 'success',
      address: { street: 'Avenida Paulista', neighborhood: 'Bela Vista', city: 'São Paulo', uf: 'SP' },
    })
  })

  it('retorna not-found quando a API responde { erro: true }', async () => {
    mockFetch(async () => ({ ok: true, json: async () => ({ erro: true }) }))
    expect(await fetchAddressByCep('99999-999')).toEqual({ status: 'not-found' })
  })

  it('retorna error em falha de rede', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    expect(await fetchAddressByCep('01310-100')).toEqual({ status: 'error' })
  })

  it('retorna error quando a API está indisponível (HTTP 500)', async () => {
    mockFetch(async () => ({ ok: false, status: 500, json: async () => ({}) }))
    expect(await fetchAddressByCep('01310-100')).toEqual({ status: 'error' })
  })

  it('não consulta a API com CEP incompleto', async () => {
    const fetchMock = mockFetch(async () => ({}))
    expect(await fetchAddressByCep('0131')).toEqual({ status: 'not-found' })
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
