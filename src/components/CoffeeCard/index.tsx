import { useEffect, useRef, useState } from 'react'
import { Check, ShoppingCartSimple } from '@phosphor-icons/react'
import type { Coffee } from '../../types/coffee'
import { useCart } from '../../hooks/useCart'
import { MAX_QUANTITY, MIN_QUANTITY } from '../../utils/cart'
import { formatPrice } from '../../utils/format'
import { CoffeeCup } from '../CoffeeCup'
import { QuantityInput } from '../QuantityInput'
import { Actions, CardContainer, CartButton, Description, Footer, ImageWrapper, Name, Price, Tags } from './styles'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(MIN_QUANTITY)
  const [justAdded, setJustAdded] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function handleAddToCart() {
    addItem(coffee.id, quantity)
    setQuantity(MIN_QUANTITY)
    setJustAdded(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <CardContainer aria-labelledby={`coffee-${coffee.id}`}>
      <ImageWrapper>
        <CoffeeCup art={coffee.art} label={coffee.name} />
      </ImageWrapper>

      <Tags aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </Tags>

      <Name id={`coffee-${coffee.id}`}>{coffee.name}</Name>
      <Description>{coffee.description}</Description>

      <Footer>
        <Price>
          R$ <strong>{formatPrice(coffee.priceInCents)}</strong>
        </Price>

        <Actions>
          <QuantityInput
            quantity={quantity}
            label={`Quantidade de ${coffee.name}`}
            onIncrement={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            onDecrement={() => setQuantity((q) => Math.max(MIN_QUANTITY, q - 1))}
          />
          <CartButton
            type="button"
            $added={justAdded}
            onClick={handleAddToCart}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
          >
            {justAdded ? <Check size={22} weight="bold" /> : <ShoppingCartSimple size={22} weight="fill" />}
          </CartButton>
          <span className="sr-only" aria-live="polite">
            {justAdded ? `${coffee.name} adicionado ao carrinho` : ''}
          </span>
        </Actions>
      </Footer>
    </CardContainer>
  )
}
