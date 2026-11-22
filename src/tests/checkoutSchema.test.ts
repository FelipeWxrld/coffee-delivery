import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './checkout'

const valid = {
  cep: '01310-100',
  street: 'Avenida Paulista',
  number: '1000',
  complement: '',
  neighborhood: 'Bela Vista',
  city: 'São Paulo',
  uf: 'sp',
  paymentMethod: 'credit',
}

describe('checkoutSchema', () => {
  it('aceita dados válidos', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true)
  })

  it('aceita CEP sem hífen e número S/N', () => {
    expect(checkoutSchema.safeParse({ ...valid, cep: '01310100', number: 's/n' }).success).toBe(true)
  })

  it.each([
    ['cep', '123', 'Informe um CEP válido (00000-000)'],
    ['street', '', 'Informe a rua'],
    ['number', 'abc', 'Use apenas números (ou S/N)'],
    ['uf', 'XX', 'UF inválida'],
    ['city', '', 'Informe a cidade'],
  ])('valida o campo %s', (field, value, message) => {
    const result = checkoutSchema.safeParse({ ...valid, [field]: value })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe(message)
  })

  it('exige forma de pagamento', () => {
    const result = checkoutSchema.safeParse({ ...valid, paymentMethod: undefined })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Selecione uma forma de pagamento')
  })
})
