import { Link } from 'react-router'
import { CoffeeCup } from '../../components/CoffeeCup'

export function NotFound() {
  return (
    <section
      className="container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '5rem 1.25rem', textAlign: 'center' }}
    >
      <CoffeeCup art={{ liquid: '#d7d5d5', pattern: 'none' }} size={140} />
      <h1 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-base-title)' }}>
        Ops! Essa xícara está vazia (404)
      </h1>
      <p>A página que você procura não existe.</p>
      <Link to="/" style={{ color: 'var(--color-purple)', fontWeight: 700 }}>
        Voltar para o catálogo
      </Link>
    </section>
  )
}
