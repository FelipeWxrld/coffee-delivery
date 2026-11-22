import { describe, expect, it } from 'vitest'
import { formatCurrency, formatPrice, maskCep } from './format'

describe('format utils', () => {
  it('formata centavos no padrão brasileiro', () => {
    expect(formatPrice(990)).toBe('9,90')
    expect(formatPrice(123456)).toBe('1.234,56')
  })

  it('formata moeda com símbolo', () => {
    expect(formatCurrency(350)).toBe('R$ 3,50')
  })

  it('aplica máscara de CEP', () => {
    expect(maskCep('01310100')).toBe('01310-100')
    expect(maskCep('0131')).toBe('0131')
    expect(maskCep('01310-100abc99')).toBe('01310-100')
  })
})
