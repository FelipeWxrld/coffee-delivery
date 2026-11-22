/**
 * Gera as evidências visuais em docs/screenshots usando o Edge/Chrome instalado.
 * Uso: npm run dev (em outro terminal) e depois `npm run screenshots`.
 * Variáveis: BASE_URL (padrão http://localhost:5173), BROWSER_PATH.
 */
import { mkdir } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173'
const BROWSER_PATH =
  process.env.BROWSER_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const OUT = 'docs/screenshots'

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1 }
const TABLET = { width: 820, height: 1180, deviceScaleFactor: 1 }
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }

const CART = { items: [{ id: 'expresso-tradicional', quantity: 1 }, { id: 'latte', quantity: 2 }, { id: 'cubano', quantity: 1 }], lastOrder: null }

await mkdir(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: BROWSER_PATH, headless: true })

async function shot(name, { viewport, theme, path = '/', cart, fullPage = true, action }) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' })
  await page.evaluate(
    (theme, cart) => {
      localStorage.clear()
      localStorage.setItem('@coffee-delivery:theme', JSON.stringify(theme))
      if (cart) localStorage.setItem('@coffee-delivery:cart-state-1.0.0', JSON.stringify(cart))
    },
    theme,
    cart,
  )
  await page.goto(BASE_URL + path, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  if (action) await action(page)
  await new Promise((r) => setTimeout(r, 300))
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
  await page.close()
  console.log('✓', name)
}

async function fillCheckout(page, submit = true) {
  await page.type('#cep', '01310100')
  await page.type('#street', 'Avenida Paulista')
  await page.type('#number', '1000')
  await page.type('#complement', 'Apto 42')
  await page.type('#neighborhood', 'Bela Vista')
  await page.type('#city', 'São Paulo')
  await page.type('#uf', 'SP')
  await page.click('input[value="credit"] + span')
  if (submit) {
    await page.click('button[type="submit"]')
    await page.waitForSelector('h1')
  }
}

for (const theme of ['light', 'dark']) {
  await shot(`home-desktop-${theme}`, { viewport: DESKTOP, theme })
  await shot(`checkout-desktop-${theme}`, { viewport: DESKTOP, theme, path: '/checkout', cart: CART })
  await shot(`success-desktop-${theme}`, {
    viewport: DESKTOP,
    theme,
    path: '/checkout',
    cart: CART,
    action: (page) => fillCheckout(page),
  })
  await shot(`home-mobile-${theme}`, { viewport: MOBILE, theme })
  await shot(`checkout-mobile-${theme}`, { viewport: MOBILE, theme, path: '/checkout', cart: CART })
  await shot(`success-mobile-${theme}`, {
    viewport: MOBILE,
    theme,
    path: '/checkout',
    cart: CART,
    action: (page) => fillCheckout(page),
  })
}

await shot('home-tablet-light', { viewport: TABLET, theme: 'light' })
await shot('checkout-validation-desktop-light', {
  viewport: DESKTOP,
  theme: 'light',
  path: '/checkout',
  cart: CART,
  action: (page) => page.click('button[type="submit"]'),
})

await browser.close()
