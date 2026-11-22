import { useMemo, useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import type { Coffee, CoffeeTag } from '../../types/coffee'
import { CoffeeCard } from '../CoffeeCard'
import { CatalogHeader, Empty, Filters, Grid, Search, Title } from './styles'

const FILTERS: CoffeeTag[] = ['tradicional', 'especial', 'com leite', 'alcoólico', 'gelado']

/** Remove acentos e caixa para a busca ("arabe" encontra "Árabe"). */
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

interface CoffeeCatalogProps {
  coffees: Coffee[]
}

/** Catálogo com busca por nome e filtro por categoria (desafios extras). */
export function CoffeeCatalog({ coffees }: CoffeeCatalogProps) {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<CoffeeTag[]>([])

  const visibleCoffees = useMemo(() => {
    const term = normalize(query.trim())
    return coffees.filter(
      (coffee) =>
        activeFilters.every((tag) => coffee.tags.includes(tag)) &&
        (term === '' || normalize(coffee.name).includes(term)),
    )
  }, [coffees, query, activeFilters])

  function toggleFilter(tag: CoffeeTag) {
    setActiveFilters((current) =>
      current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
    )
  }

  return (
    <section aria-labelledby="catalog-title">
      <CatalogHeader>
        <Title id="catalog-title">Nossos cafés</Title>

        <Search>
          <MagnifyingGlass size={18} aria-hidden />
          <label htmlFor="coffee-search" className="sr-only">
            Buscar café pelo nome
          </label>
          <input
            id="coffee-search"
            type="search"
            placeholder="Buscar café"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Search>

        <Filters role="group" aria-label="Filtrar por categoria">
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
        </Filters>
      </CatalogHeader>

      <p className="sr-only" aria-live="polite">
        {visibleCoffees.length} {visibleCoffees.length === 1 ? 'café encontrado' : 'cafés encontrados'}
      </p>

      {visibleCoffees.length > 0 ? (
        <Grid>
          {visibleCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </Grid>
      ) : (
        <Empty>Nenhum café encontrado com a busca e os filtros selecionados.</Empty>
      )}
    </section>
  )
}
