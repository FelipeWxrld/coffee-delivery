const currency = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formata centavos como número brasileiro sem símbolo: 990 -> "9,90". */
export function formatPrice(cents: number): string {
  return currency.format(cents / 100)
}

/** Formata centavos com símbolo: 990 -> "R$ 9,90". */
export function formatCurrency(cents: number): string {
  return `R$ ${formatPrice(cents)}`
}

/** Aplica a máscara 00000-000 a um CEP digitado. */
export function maskCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}
