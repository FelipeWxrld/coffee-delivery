export type CoffeeTag = 'tradicional' | 'gelado' | 'com leite' | 'especial' | 'alcoólico'

/** Paleta da ilustração SVG de cada café (visão superior da xícara). */
export interface CoffeeArt {
  liquid: string
  foam?: string
  /** Desenho na espuma: coração (latte art), pó (cacau/canela) ou nenhum. */
  pattern?: 'heart' | 'dust' | 'ice' | 'none'
  cup?: string
}

export interface Coffee {
  id: string
  name: string
  description: string
  tags: CoffeeTag[]
  /** Preço em centavos, evitando erros de ponto flutuante. */
  priceInCents: number
  art: CoffeeArt
}

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface CartItem {
  id: string
  quantity: number
}

export interface Address {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  uf: string
}

export interface Order {
  id: string
  createdAt: string
  address: Address
  paymentMethod: PaymentMethod
  items: CartItem[]
  itemsTotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}
