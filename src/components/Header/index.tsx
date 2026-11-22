import { MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { Container } from '../../styles/shared'
import { CartBadge } from '../CartBadge'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { Actions, HeaderContainer, HeaderContent, Location } from './styles'

export function Header() {
  const { lastOrder } = useCart()
  const location = lastOrder
    ? `${lastOrder.address.city}, ${lastOrder.address.uf.toUpperCase()}`
    : 'Porto Alegre, RS'

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Link to="/" aria-label="Coffee Delivery — página inicial">
            <Logo />
          </Link>

          <Actions aria-label="Ações">
            <Location title={location}>
              <MapPin size={22} weight="fill" aria-hidden />
              <span>{location}</span>
            </Location>
            <ThemeToggle />
            <CartBadge />
          </Actions>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  )
}
