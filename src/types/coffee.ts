export type CoffeeTag = 'tradicional' | 'gelado' | 'com leite' | 'especial' | 'alcoólico'

/** Paleta da ilustração SVG de cada café (visão superior da xícara). */
export interface CoffeeArt {
  liquid: string
  foam?: string
  /** Desenho na bebida: coração (latte art), pó (cacau/canela), gelo ou nenhum. */
  pattern?: 'heart' | 'dust' | 'ice' | 'none'
  cup?: string
}

export interface Coffee {
  id: string
  name: string
  description: string
  tags: CoffeeTag[]
  /** Preço em centavos, evitando erros de ponto flutuante (RN-04). */
  priceInCents: number
  art: CoffeeArt
}

/** Item do carrinho: guarda só a referência e a quantidade (o catálogo é a fonte de verdade). */
export interface CartItem {
  id: string
  quantity: number
}

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface DeliveryAddress {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  uf: string
}

/** Cópia dos dados do produto no momento da compra (snapshot — RN-06). */
export interface OrderItem {
  id: string
  name: string
  priceInCents: number
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  items: OrderItem[]
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}
