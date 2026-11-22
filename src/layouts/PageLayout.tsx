import { Outlet } from 'react-router'
import { Header } from '../components/Header'
import { ScrollToTop } from '../components/ScrollToTop'

/** Layout comum às rotas: Header fixo + conteúdo da página atual. */
export function PageLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
