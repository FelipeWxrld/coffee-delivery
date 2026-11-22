import { useMemo, useState } from 'react'
import { Coffee as CoffeeIcon, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import type { CoffeeTag } from '../../@types/coffee'
import { CoffeeCard } from '../../components/CoffeeCard'
import { CoffeeCup } from '../../components/CoffeeCup'
import { coffees } from '../../data/coffees'
import styles from './Home.module.css'

const FEATURES = [
  { icon: ShoppingCart, text: 'Compra simples e segura', color: 'var(--color-yellow-dark)' },
  { icon: Package, text: 'Embalagem mantém o café intacto', color: 'var(--color-base-text)' },
  { icon: Timer, text: 'Entrega rápida e rastreada', color: 'var(--color-yellow)' },
  { icon: CoffeeIcon, text: 'O café chega fresquinho até você', color: 'var(--color-purple)' },
]

const FILTERS: CoffeeTag[] = ['tradicional', 'especial', 'com leite', 'alcoólico', 'gelado']

export function Home() {
  const [activeFilters, setActiveFilters] = useState<CoffeeTag[]>([])

  const filteredCoffees = useMemo(
    () =>
      activeFilters.length === 0
        ? coffees
        : coffees.filter((coffee) => activeFilters.every((tag) => coffee.tags.includes(tag))),
    [activeFilters],
  )

  function toggleFilter(tag: CoffeeTag) {
    setActiveFilters((current) =>
      current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
    )
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p className={styles.subtitle}>
              Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
            </p>

            <ul className={styles.features}>
              {FEATURES.map(({ icon: Icon, text, color }) => (
                <li key={text}>
                  <span style={{ backgroundColor: color }}>
                    <Icon size={16} weight="fill" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroImage} aria-hidden>
            <div className={styles.blob} />
            <CoffeeCup art={{ liquid: '#6b3b1c', foam: '#f3e3cc', pattern: 'heart' }} size={300} />
            <span className={`${styles.bean} ${styles.bean1}`} />
            <span className={`${styles.bean} ${styles.bean2}`} />
            <span className={`${styles.bean} ${styles.bean3}`} />
          </div>
        </div>
      </section>

      <section className={`container ${styles.catalog}`} aria-labelledby="catalog-title">
        <div className={styles.catalogHeader}>
          <h2 id="catalog-title">Nossos cafés</h2>

          <div className={styles.filters} role="group" aria-label="Filtrar por categoria">
            {FILTERS.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeFilters.includes(tag)}
                onClick={() => toggleFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredCoffees.length > 0 ? (
          <div className={styles.grid}>
            {filteredCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nenhum café combina com todos os filtros selecionados.</p>
        )}
      </section>
    </>
  )
}
