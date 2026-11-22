# TECH_SPEC — Coffee Delivery

> **Autor:** Luiz Felipe Rodrigues Silva · **Versão:** 2.0 · Requisitos referenciados por ID do [PRD_SPEC.md](PRD_SPEC.md)

## 1. Stack e justificativas

| Tecnologia | Por quê |
|-----------|---------|
| **React 19** | Componentes funcionais e Hooks; no React 19 `ref` é prop comum, o que simplifica inputs com React Hook Form. |
| **Vite 7** | Dev server rápido e build otimizado; integra com Vitest. |
| **TypeScript 5.8 (`strict`)** | Tipagem de domínio e das ações do reducer; proibido `any`. |
| **React Router 7** | Rotas `/`, `/checkout`, `/success` e `*` sem recarregar a página (RF-07). |
| **Context API + useReducer** | Estado global do carrinho com ações puras e testáveis (RF-03, RF-05). |
| **styled-components 6** | Estilização do desafio de origem; `ThemeProvider` com tema tipado (`DefaultTheme`) permite trocar Light/Dark trocando um objeto (RF-14). |
| **React Hook Form + Zod** | Inputs não controlados (menos re-renderizações) e validação declarativa reutilizável em testes (RF-08, RF-09, RF-11). |
| **ViaCEP** | API pública e gratuita de CEP, sem chave (RF-08, RN-07). |
| **@phosphor-icons/react** | Mesma família de ícones do protótipo. |
| **Vitest + Testing Library + jsdom** | Testes rápidos no mesmo pipeline do Vite. |
| **ESLint + typescript-eslint + react-hooks** | Qualidade e regras de Hooks. |
| **puppeteer-core** | Screenshots automatizados (evidências) usando o Edge/Chrome instalado. |
| **Vercel** | Hospedagem estática com rewrite de SPA. |

## 2. Arquitetura

```
main.tsx
└─ App
   └─ ThemeProvider (useLocalStorage → styled ThemeProvider + GlobalStyle)
      └─ CartProvider (useReducer + persistência)
         └─ BrowserRouter → Router
            └─ PageLayout (ScrollToTop + Header + <Outlet/>)
               ├─ /          Home      → HeroIllustration, CoffeeCatalog → CoffeeCard → QuantityInput
               ├─ /checkout  Checkout  → FormProvider
               │                          ├─ DeliveryAddressForm (TextInput, useCepLookup)
               │                          ├─ PaymentMethodSelector
               │                          └─ CartSummary → CartItem → QuantityInput
               ├─ /success   Success   → OrderSuccess, DeliveryIllustration
               └─ *          NotFound  → EmptyState
```

**Responsabilidades:** páginas orquestram; componentes apresentam e recebem dados por props; regras de negócio ficam em `reducers/`, `utils/cart.ts` e `schemas/`; efeitos externos em `services/` e hooks. Fluxo unidirecional: componente → função do contexto → `dispatch(action)` → reducer puro → novo estado → re-renderização + persistência.

## 3. Estrutura de diretórios

```
src/
├── assets/            logo-icon.svg, logo-light.svg, logo-dark.svg (marca criada com IA)
├── components/        CartBadge, CartItem, CartSummary, CoffeeCard, CoffeeCatalog, CoffeeCup,
│                      DeliveryAddressForm, DeliveryIllustration, EmptyCart (EmptyState),
│                      Header, HeroIllustration, Logo, OrderSuccess, PaymentMethodSelector,
│                      QuantityInput, ScrollToTop, TextInput, ThemeToggle   (index.tsx + styles.ts)
├── contexts/          CartContext.tsx, ThemeContext.tsx
├── data/              coffees.ts (catálogo tipado), paymentMethods.ts
├── hooks/             useCart, useTheme, useLocalStorage, useCepLookup
├── layouts/           PageLayout.tsx
├── pages/             Home, Checkout, Success, NotFound
├── reducers/cart/     actions.ts, reducer.ts
├── schemas/           checkout.ts (Zod)
├── services/          viacep.ts
├── styles/            themes.ts (tokens light/dark + breakpoints), global.ts, shared.ts, styled.d.ts
├── tests/             testes unitários e de integração + setup
├── types/             coffee.ts
└── utils/             cart.ts (cálculos), format.ts (BRL, máscara CEP), storage.ts
```

## 4. Tipos (`src/types/coffee.ts`)

```ts
interface Coffee { id; name; description; tags: CoffeeTag[]; priceInCents: number; art: CoffeeArt }
interface CartItem { id: string; quantity: number }                // só referência + quantidade
type PaymentMethod = 'credit' | 'debit' | 'cash'
interface DeliveryAddress { cep; street; number; complement?; neighborhood; city; uf }
interface OrderItem { id; name; priceInCents; quantity }           // snapshot (RN-06)
interface Order { id; createdAt; address: DeliveryAddress; paymentMethod; items: OrderItem[];
                  subtotalInCents; deliveryFeeInCents; totalInCents }
```

## 5. Estado global — Context API + useReducer

**Estado:** `{ items: CartItem[]; lastOrder: Order | null }`.

**Ações** (união discriminada + *action creators*): `ADD_ITEM`, `INCREMENT_ITEM`, `DECREMENT_ITEM`, `REMOVE_ITEM`, `CHECKOUT`, `CLEAR_CART`.

**Reducer** (`reducers/cart/reducer.ts`) — puro e imutável (`map`, `filter`, spread):
- `ADD_ITEM`: ignora quantidade não inteira ou < 1 (RN-01); soma se o id existe (RN-02); limita a 99.
- `INCREMENT/DECREMENT_ITEM`: `clampQuantity` mantém 1–99 (RN-01).
- `REMOVE_ITEM`: `filter` (RF-05).
- `CHECKOUT`: `{ items: [], lastOrder: order }` — esvazia e guarda o snapshot em uma transição atômica (RF-13).

**Valores derivados** no Provider (`useMemo`): itens enriquecidos com o café do catálogo (`find`), `totalQuantity` (`countUnits` → RF-04), `subtotalInCents` (`calculateSubtotal` → `reduce`), `deliveryFeeInCents`, `totalInCents` (RF-10).

**API do contexto (`useCart`)**: `items, totalQuantity, subtotalInCents, deliveryFeeInCents, totalInCents, lastOrder, addItem, incrementItem, decrementItem, removeItem, clearCart, checkout`.

## 6. Hooks, efeitos e persistência

| Hook | Responsabilidade |
|------|------------------|
| `useCart` / `useTheme` | Acesso tipado aos contextos; lançam erro se usados fora do Provider. |
| `useLocalStorage(key, fallback, isValid)` | `useState` com inicialização preguiçosa a partir do localStorage + `useEffect` que grava a cada mudança. Usado pelo tema. |
| `useCepLookup(cep, onFound)` | `useEffect` dispara quando o CEP tem 8 dígitos; estados `idle → loading → success / not-found / error`; `AbortController` cancela requisições antigas. |

**Carrinho:** `useReducer(cartReducer, undefined, loadInitialState)` lê `@coffee-delivery:cart-state-1.0.0`, valida com o *type guard* `isCartState` e descarta ids fora do catálogo (RN-10); `useEffect` grava a cada mudança (RF-06). **Tema:** chave `@coffee-delivery:theme`; fallback `prefers-color-scheme`; script inline no `index.html` aplica o tema antes do React para evitar "flash".

## 7. Rotas

| Rota | Página | Regra |
|------|--------|-------|
| `/` | Home | Catálogo, busca e filtros. |
| `/checkout` | Checkout | Estado vazio se não há itens (RF-11, RN-09). |
| `/success` | Success | Mostra `lastOrder`; sem pedido → estado vazio (RN-09). |
| `*` | NotFound | 404. |

## 8. Formulário e validação (Zod + React Hook Form)

`schemas/checkout.ts`:

| Campo | Regra | Mensagem |
|-------|-------|----------|
| `cep` | `/^\d{5}-?\d{3}$/` | Informe um CEP válido (00000-000) |
| `street` | mín. 3 | Informe a rua |
| `number` | obrigatório, `/^(\d+[A-Za-z]?\|s\/?n)$/i` | Informe o número / Use apenas números (ou S/N) |
| `complement` | opcional, máx. 60 | Máximo de 60 caracteres |
| `neighborhood`, `city` | mín. 2 | Informe o bairro / a cidade |
| `uf` | uma das 27 UFs (case-insensitive) | UF inválida |
| `paymentMethod` | `enum(['credit','debit','cash'])` | Selecione uma forma de pagamento |

O `Checkout` cria o formulário (`useForm` + `zodResolver`) e o compartilha via `FormProvider`; `DeliveryAddressForm` e `PaymentMethodSelector` usam `useFormContext`. A máscara de CEP é aplicada no `onChange` do `register`. Ao encontrar o CEP, `setValue` preenche os campos disponíveis e o foco vai para "Número". Com CEP não encontrado, `setError('cep')` e o `onSubmit` recusa a confirmação (RN-10); com falha da API, um aviso orienta o preenchimento manual.

## 9. Regras de cálculo (`utils/cart.ts`)

`DELIVERY_FEE_IN_CENTS = 350` · `calculateSubtotal` · `calculateDeliveryFee` (0 sem itens) · `countUnits` · `clampQuantity(1–99)`. Formatação em `utils/format.ts` (`formatPrice`, `formatCurrency`, `maskCep`).

## 10. Tema, tokens, breakpoints e acessibilidade

- `styles/themes.ts`: `lightTheme` e `darkTheme` com os **mesmos tokens semânticos** (`background`, `card`, `input`, `button`, `hover`, `title`, `subtitle`, `text`, `label`, `purple*`, `yellow*`, `onAccent`, `danger`, `warning`, `focus`, `heroGlow`), fontes, raios e `container`. `styled.d.ts` estende `DefaultTheme`, então `theme.colors.x` é verificado pelo TypeScript.
- `media`: `laptop ≤ 1100`, `tablet ≤ 1024`, `tabletPortrait ≤ 900`, `mobile ≤ 640`, `small ≤ 480`. Grade 4 → 3 → 2 → 1 coluna; checkout em 1 coluna no tablet/celular; endereço em coluna; pagamentos empilhados; Header compacto.
- Acessibilidade: ver RNF-03 no PRD. Contraste do Dark Mode ajustado (ex.: roxo de texto `#C9B3FF` sobre `#2B2340`).

## 11. Testes e qualidade

```bash
npm test               # 7 arquivos, 60 testes
npm run test:coverage  # cobertura (v8)
npm run lint           # ESLint
npm run build          # tsc -b + vite build
npm run screenshots    # evidências visuais (com npm run dev ativo)
```

| Arquivo | Casos | Requisitos |
|---------|-------|-----------|
| `cartReducer.test.ts` | adicionar, somar, quantidade inválida, limite 99, incrementar/decrementar até 1, remover, **imutabilidade**, checkout, limpar, validação do localStorage | RF-03, RF-05, RF-13, RN-01, RN-02 |
| `cartUtils.test.ts` | subtotal, precisão em centavos, frete só com itens, unidades vs tipos, clamp | RF-04, RF-10, RN-03, RN-04 |
| `checkoutSchema.test.ts` | dados válidos, CEP sem hífen, S/N, mensagens de cada campo, pagamento obrigatório/inválido | RF-08, RF-09, RN-07 |
| `viacep.test.ts` | sucesso, `{ erro: true }`, falha de rede, HTTP 500, CEP incompleto | RF-08, RN-07 |
| `useLocalStorage.test.ts` | valor inicial, restauração, JSON corrompido | RF-06, RF-14 |
| `format.test.ts` | BRL e máscara de CEP | RN-04 |
| `app.test.tsx` | catálogo, busca/filtro, carrinho + badge + persistência, totais, +/−/remover, estados vazios, validação, autopreenchimento do CEP, CEP não encontrado, falha da API, confirmação com snapshot, tema, navegação, 404 | RF-01 a RF-14, RN-06, RN-09, RN-10 |

`fetch` é simulado nos testes (sem depender da internet). O `setup.ts` instala um `localStorage` em memória porque o Node 25+ expõe um `localStorage` global que sobrepõe o do jsdom. Responsividade (RF-15) é validada pelo script de screenshots em 320, 390, 768 e 1440 px.

## 12. Deploy

Vercel (`vercel.json` reescreve todas as rotas para `index.html`). `public/_redirects` mantém compatibilidade com Netlify.
