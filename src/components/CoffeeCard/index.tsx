import { useState } from 'react'
import { Check, ShoppingCartSimple } from '@phosphor-icons/react'
import type { Coffee } from '../../@types/coffee'
import { useCart } from '../../hooks/useCart'
import { MAX_QUANTITY } from '../../reducers/cart/reducer'
import { formatPrice } from '../../utils/format'
import { CoffeeCup } from '../CoffeeCup'
import { QuantityInput } from '../QuantityInput'
import styles from './CoffeeCard.module.css'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  function handleAddToCart() {
    addItem(coffee.id, quantity)
    setQuantity(1)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className={styles.card} aria-labelledby={`coffee-${coffee.id}`}>
      <div className={styles.image}>
        <CoffeeCup art={coffee.art} label={coffee.name} />
      </div>

      <ul className={styles.tags} aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <h3 id={`coffee-${coffee.id}`}>{coffee.name}</h3>
      <p className={styles.description}>{coffee.description}</p>

      <footer className={styles.footer}>
        <p className={styles.price}>
          R$ <strong>{formatPrice(coffee.priceInCents)}</strong>
        </p>

        <div className={styles.actions}>
          <QuantityInput
            quantity={quantity}
            max={MAX_QUANTITY}
            label={`Quantidade de ${coffee.name}`}
            onIncrement={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          />
          <button
            type="button"
            className={`${styles.cartButton} ${justAdded ? styles.added : ''}`}
            onClick={handleAddToCart}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
          >
            {justAdded ? (
              <Check size={22} weight="bold" />
            ) : (
              <ShoppingCartSimple size={22} weight="fill" />
            )}
          </button>
        </div>
      </footer>
    </article>
  )
}
