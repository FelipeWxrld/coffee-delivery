import { z } from 'zod'

export const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const checkoutSchema = z.object({
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido (00000-000)'),
  street: z.string().trim().min(3, 'Informe a rua'),
  number: z
    .string()
    .trim()
    .min(1, 'Informe o número')
    .regex(/^(\d+[A-Za-z]?|s\/?n)$/i, 'Use apenas números (ou S/N)'),
  complement: z.string().trim().max(60, 'Máximo de 60 caracteres').optional(),
  neighborhood: z.string().trim().min(2, 'Informe o bairro'),
  city: z.string().trim().min(2, 'Informe a cidade'),
  uf: z
    .string()
    .trim()
    .refine((value) => (UFS as readonly string[]).includes(value.toUpperCase()), 'UF inválida'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    errorMap: () => ({ message: 'Selecione uma forma de pagamento' }),
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
