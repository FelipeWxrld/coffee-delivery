import { Outlet } from 'react-router'
import { Header } from '../components/Header'
import { ScrollToTop } from '../components/ScrollToTop'

export function DefaultLayout() {
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
