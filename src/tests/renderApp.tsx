import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Router } from '../Router'

/** Renderiza a aplicação completa com uma rota inicial (MemoryRouter). */
export function renderApp(initialPath = '/') {
  return render(
    <ThemeProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <Router />
        </MemoryRouter>
      </CartProvider>
    </ThemeProvider>,
  )
}
