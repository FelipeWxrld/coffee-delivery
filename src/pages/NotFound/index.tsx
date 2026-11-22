import { EmptyState } from '../../components/EmptyCart'

export function NotFound() {
  return (
    <EmptyState
      title="Ops! Essa xícara está vazia (404)"
      description="A página que você procura não existe."
      actionLabel="Voltar para o catálogo"
    />
  )
}
