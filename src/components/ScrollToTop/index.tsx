import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Volta ao topo a cada troca de rota (comportamento esperado em SPAs). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo?.({ top: 0 })
  }, [pathname])

  return null
}
