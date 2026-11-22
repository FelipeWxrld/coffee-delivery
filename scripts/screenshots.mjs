/**
 * Gera as evidências visuais em docs/screenshots usando o Edge/Chrome instalado.
 * Uso: `npm run dev` em um terminal e `npm run screenshots` em outro.
 * Variáveis opcionais: BASE_URL (padrão http://localhost:5173) e BROWSER_PATH.
 */
import { mkdir } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173'
const BROWSER_PATH =
  process.env.BROWSER_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const OUT = 'docs/screenshots'

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1 }
const TABLET = { width: 768, height: 1024, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
const SMALL = { width: 320, height: 640, deviceScaleFactor: 2, isMobile: true, hasTouch: true }

const CART = {
  items: [
    { id: 'expresso-tradicional', quantity: 1 },
    { id: 'latte', quantity: 2 },
    { id: 'cubano', quantity: 1 },
  ],
  lastOrder: null,
}

await mkdir(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: BROWSER_PATH, headless: true })

async function shot(name, { viewport, theme = 'light', path = '/', cart, fullPage = true, action }) {
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
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
  await page.close()
  console.log('✓', name)
}

/** Digita o CEP e espera a consulta ao ViaCEP terminar. */
async function typeCep(page, cep) {
  await page.type('#cep', cep)
  await page.waitForFunction(() => !document.querySelector('#cep[aria-busy="true"]'), { timeout: 10000 })
  await new Promise((r) => setTimeout(r, 300))
}

async function fillCheckout(page, submit = true) {
  await typeCep(page, '01310100')
  await page.type('#number', '1000')
  await page.type('#complement', 'Apto 42')
  // Se o ViaCEP estiver indisponível, preenche manualmente.
  for (const [id, value] of [['street', 'Avenida Paulista'], ['neighborhood', 'Bela Vista'], ['city', 'São Paulo'], ['uf', 'SP']]) {
    const current = await page.$eval(`#${id}`, (el) => el.value)
    if (!current) await page.type(`#${id}`, value)
  }
  await page.click('input[value="credit"] + span')
  if (submit) {
    await page.click('button[type="submit"]')
    await page.waitForSelector('h1')
  }
}

for (const theme of ['light', 'dark']) {
  await shot(`home-desktop-${theme}`, { viewport: DESKTOP, theme })
  await shot(`checkout-desktop-${theme}`, { viewport: DESKTOP, theme, path: '/checkout', cart: CART })
  await shot(`success-desktop-${theme}`, { viewport: DESKTOP, theme, path: '/checkout', cart: CART, action: fillCheckout })
  await shot(`home-mobile-${theme}`, { viewport: MOBILE, theme })
  await shot(`checkout-mobile-${theme}`, { viewport: MOBILE, theme, path: '/checkout', cart: CART })
  await shot(`success-mobile-${theme}`, { viewport: MOBILE, theme, path: '/checkout', cart: CART, action: fillCheckout })
}

await shot('home-tablet-light', { viewport: TABLET })
await shot('checkout-tablet-dark', { viewport: TABLET, theme: 'dark', path: '/checkout', cart: CART })
await shot('home-320-light', { viewport: SMALL })
await shot('checkout-320-dark', { viewport: SMALL, theme: 'dark', path: '/checkout', cart: CART })

// Fluxo e estados do formulário
await shot('flow-1-checkout-cep-autofill', {
  viewport: DESKTOP,
  path: '/checkout',
  cart: CART,
  fullPage: false,
  action: (page) => typeCep(page, '01310100'),
})
await shot('flow-2-checkout-filled', {
  viewport: DESKTOP,
  path: '/checkout',
  cart: CART,
  fullPage: false,
  action: (page) => fillCheckout(page, false),
})
await shot('checkout-cep-not-found', {
  viewport: DESKTOP,
  path: '/checkout',
  cart: CART,
  fullPage: false,
  action: (page) => typeCep(page, '99999999'),
})
await shot('checkout-validation-errors', {
  viewport: DESKTOP,
  path: '/checkout',
  cart: CART,
  action: (page) => page.click('button[type="submit"]'),
})
await shot('checkout-empty-cart', { viewport: DESKTOP, path: '/checkout', fullPage: false })

await browser.close()
