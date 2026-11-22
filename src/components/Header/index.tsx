import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import styles from './Header.module.css'

export function Header() {
  const { totalQuantity, lastOrder } = useCart()
  const location = lastOrder
    ? `${lastOrder.address.city}, ${lastOrder.address.uf.toUpperCase()}`
    : 'Porto Alegre, RS'

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <Link to="/" aria-label="Coffee Delivery — página inicial">
          <Logo />
        </Link>

        <nav className={styles.actions} aria-label="Ações">
          <span className={styles.location}>
            <MapPin size={22} weight="fill" aria-hidden />
            <span>{location}</span>
          </span>

          <ThemeToggle />

          <Link
            to="/checkout"
            className={styles.cart}
            aria-label={`Carrinho com ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingCart size={22} weight="fill" />
            {totalQuantity > 0 && (
              <span className={styles.badge} data-testid="cart-badge">
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
