import { describe, expect, it } from 'vitest'
import { checkoutSchema } from '../schemas/checkout'

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

describe('checkoutSchema (RF-08, RF-09, RN-07)', () => {
  it('aceita dados válidos com complemento vazio (opcional)', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true)
  })

  it('aceita CEP sem hífen e número S/N', () => {
    expect(checkoutSchema.safeParse({ ...valid, cep: '01310100', number: 's/n' }).success).toBe(true)
  })

  it.each([
    ['cep', '123', 'Informe um CEP válido (00000-000)'],
    ['street', '', 'Informe a rua'],
    ['number', '', 'Informe o número'],
    ['number', 'abc', 'Use apenas números (ou S/N)'],
    ['neighborhood', '', 'Informe o bairro'],
    ['city', '', 'Informe a cidade'],
    ['uf', 'XX', 'UF inválida'],
  ])('valida o campo %s = "%s"', (field, value, message) => {
    const result = checkoutSchema.safeParse({ ...valid, [field]: value })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe(message)
  })

  it('exige uma forma de pagamento válida', () => {
    for (const paymentMethod of [undefined, 'pix']) {
      const result = checkoutSchema.safeParse({ ...valid, paymentMethod })
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('Selecione uma forma de pagamento')
    }
  })
})
