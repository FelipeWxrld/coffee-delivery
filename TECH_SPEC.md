# TECH_SPEC — Coffee Delivery

> **Autor:** Luiz Felipe Rodrigues Silva · **Versão:** 1.0.0

## 1. Stack

| Tecnologia | Uso |
|-----------|-----|
| **React 19** | Biblioteca de UI (componentes funcionais + hooks). |
| **Vite 7** | Bundler e servidor de desenvolvimento. |
| **TypeScript 5.8** (`strict`) | Tipagem estática. |
| **React Router 7** | Rotas da SPA (`/`, `/checkout`, `/success`, `*`). |
| **Context API + useReducer** | Estado global do carrinho e do tema. |
| **React Hook Form + Zod** (`@hookform/resolvers`) | Formulário de checkout e validação declarativa. |
| **CSS Modules + CSS Custom Properties** | Estilos isolados por componente e temas Light/Dark. |
| **@phosphor-icons/react** | Ícones (mesma família do protótipo). |
| **Vitest + Testing Library + jsdom** | Testes unitários e de integração. |
| **ESLint (typescript-eslint, react-hooks)** | Qualidade de código. |
| **Puppeteer-core** | Geração automatizada das evidências (screenshots). |
| **Vercel** | Hospedagem com rewrite de SPA (`vercel.json`). |

## 2. Arquitetura

```
┌───────────────────────────── App ─────────────────────────────┐
│ ThemeProvider (useState + LocalStorage → <html data-theme>)   │
│  └─ CartProvider (useReducer + LocalStorage)                  │
│      └─ BrowserRouter                                          │
│          └─ Router                                             │
│              └─ DefaultLayout (ScrollToTop + Header + Outlet)  │
│                  ├─ /          → Home  (catálogo + filtros)    │
│                  ├─ /checkout  → Checkout (form + resumo)      │
│                  ├─ /success   → Success (confirmação)         │
│                  └─ *          → NotFound                      │
└───────────────────────────────────────────────────────────────┘
```

Fluxo de dados **unidirecional**: componentes leem estado via hooks (`useCart`, `useTheme`) e alteram-no apenas por funções do contexto, que despacham **ações** para um **reducer puro**. Um `useEffect` sincroniza o estado com o LocalStorage.

### 2.1 Estrutura de pastas

```
src/
├── @types/coffee.ts          # Tipos de domínio (Coffee, CartItem, Order, Address…)
├── components/               # Componentes reutilizáveis (cada um com seu .module.css)
│   ├── CartItemRow/          # Linha do carrinho (quantidade + remover)
│   ├── CoffeeCard/           # Card do catálogo
│   ├── CoffeeCup/            # Ilustração SVG parametrizada de cada café
│   ├── DeliveryIllustration/ # Ilustração SVG da página de sucesso
│   ├── Header/               # Logo, localização, tema e carrinho
│   ├── Logo/                 # Logo original (criada com IA)
│   ├── PaymentOption/        # Radio estilizado de forma de pagamento
│   ├── QuantityInput/        # Seletor − n +
│   ├── ScrollToTop/          # Rola ao topo a cada troca de rota
│   ├── TextInput/            # Input com erro e "Opcional"
│   └── ThemeToggle/          # Botão Light/Dark
├── contexts/                 # CartContext, ThemeContext (Providers)
├── data/coffees.ts           # Catálogo (14 cafés)
├── hooks/                    # useCart, useTheme
├── layouts/DefaultLayout.tsx
├── pages/                    # Home, Checkout, Success, NotFound
├── reducers/cart/            # actions.ts, reducer.ts (+ testes)
├── schemas/checkout.ts       # Schema Zod do formulário (+ testes)
├── services/viacep.ts        # Autopreenchimento de endereço
├── styles/global.css         # Tokens de design e temas
├── test/                     # setup, helper renderApp e testes de integração
└── utils/                    # format (moeda, CEP) e storage (LocalStorage seguro)
```

## 3. Componentes e Props

| Componente | Props principais | Responsabilidade |
|-----------|------------------|------------------|
| `CoffeeCard` | `coffee: Coffee` | Mostra o café e mantém a quantidade local (`useState`) até adicionar ao carrinho. |
| `QuantityInput` | `quantity, onIncrement, onDecrement, min, max, size, label` | Componente **controlado** e sem estado; reutilizado no card e no carrinho. |
| `CartItemRow` | `item: CartItemWithCoffee` | Linha do carrinho; usa `useCart` para alterar/remover. |
| `TextInput` | `ComponentProps<'input'> & { error, optional }` | Compatível com `register` do RHF (no React 19 `ref` é prop). |
| `PaymentOption` | `icon, label` + props de `<input type="radio">` | Radio nativo acessível estilizado como botão. |
| `CoffeeCup` | `art, size, label` | Gera as 14 imagens do catálogo a partir de uma paleta — evita assets bitmap. |
| `Logo` | `showText` | Logo SVG que usa variáveis CSS para funcionar nos dois temas. |
| `Header`, `ThemeToggle` | — | Consomem `useCart` / `useTheme`. |

## 4. Gerenciamento de estado

### 4.1 Carrinho — `CartContext` + `useReducer`

```ts
interface CartState { items: CartItem[]; lastOrder: Order | null }
```

**Ações** (`reducers/cart/actions.ts`): `ADD_ITEM`, `INCREMENT_ITEM`, `DECREMENT_ITEM`, `REMOVE_ITEM`, `CHECKOUT`, `CLEAR_CART`, cada uma com *action creator* tipado (união discriminada).

**Reducer** (`reducers/cart/reducer.ts`): função pura que aplica as regras RN02, RN03 e RN11. Por ser pura, é testada isoladamente.

**Valores derivados** (`useMemo` no Provider): itens enriquecidos com os dados do café, `totalQuantity`, `itemsTotalInCents`, `deliveryFeeInCents`, `totalInCents`. Só se guarda o mínimo (`id` + `quantity`); preço e nome vêm sempre do catálogo, evitando dados desatualizados.

**Persistência**: inicialização *lazy* do `useReducer` lê o LocalStorage (`@coffee-delivery:cart-state-1.0.0`), valida com o *type guard* `isCartState` e descarta ids inexistentes; um `useEffect` grava a cada mudança. A chave versionada permite migrar o formato no futuro.

### 4.2 Tema — `ThemeContext`

`useState<'light' | 'dark'>` inicializado pela preferência salva ou por `prefers-color-scheme`. Um `useEffect` define `document.documentElement.dataset.theme` e salva a escolha. Todas as cores são **CSS Custom Properties** redefinidas em `[data-theme='dark']`, então nenhum componente precisa conhecer o tema. Um script inline no `index.html` aplica o tema antes do React montar, evitando "flash" de tema errado.

### 4.3 Estado local e de formulário

- `useState` para quantidade no card, feedback "adicionado" e filtros do catálogo.
- React Hook Form gerencia o formulário de checkout (inputs **não controlados** → menos re-renderizações), com `zodResolver(checkoutSchema)`.
- `watch('cep')` + `useEffect` com `AbortController` consulta o ViaCEP e usa `setValue` para preencher o endereço.

## 5. Rotas

| Rota | Página | Observações |
|------|--------|-------------|
| `/` | `Home` | Hero + catálogo com filtros. |
| `/checkout` | `Checkout` | Estado vazio se não houver itens. |
| `/success` | `Success` | `<Navigate to="/">` se não houver `lastOrder`. |
| `*` | `NotFound` | 404 amigável. |

## 6. Responsividade e Design System

- Tokens do Figma em `styles/global.css` (cores *yellow/purple/base*, fontes **Baloo 2** e **Roboto**).
- *Mobile-friendly* com CSS Grid e breakpoints em **1100px**, **1024px**, **900px**, **640px**, **560px** e **480px**: grade de cafés 4 → 3 → 2 → 1 colunas; checkout em 2 colunas → 1; formulário de endereço reorganizado; opções de pagamento empilhadas; header compacto (localização vira só ícone).

## 7. Estratégia de testes

Executar: `npm test` (ou `npm run test:coverage`).

| Nível | Arquivo | O que cobre |
|-------|---------|-------------|
| Unitário | `reducers/cart/reducer.test.ts` | Todas as ações, limites 1–99, soma de quantidades, checkout, validação do LocalStorage. |
| Unitário | `schemas/checkout.test.ts` | Dados válidos, CEP sem hífen, `S/N`, mensagens de cada campo, pagamento obrigatório. |
| Unitário | `utils/format.test.ts` | Formatação de moeda pt-BR e máscara de CEP. |
| Integração | `test/app.test.tsx` | Renderiza a app inteira (`MemoryRouter`): catálogo, filtro, adicionar ao carrinho + badge + LocalStorage, restauração do carrinho, estado vazio, erros de validação, fluxo completo até a confirmação, alternância de tema, redirecionamento de `/success` e 404. |

**Resultado atual:** 4 arquivos, **35 testes passando**. `fetch` é *mockado* para não depender do ViaCEP. O `setup.ts` instala um `localStorage` em memória porque o Node 25+ expõe um `localStorage` global próprio que sobrepõe o do jsdom.

Além disso: `npm run lint` (ESLint), `npm run build` (checagem de tipos `tsc -b` + build) e `npm run screenshots` (testes visuais/evidências em 3 tamanhos de tela e 2 temas).

## 8. Decisões técnicas

| Decisão | Motivo |
|---------|--------|
| Preços em centavos (`priceInCents`) | Evita erros de ponto flutuante (0,1 + 0,2). |
| Carrinho guarda só `{ id, quantity }` | Fonte única de verdade para dados do produto. |
| CSS Modules + variáveis CSS em vez de CSS-in-JS | Zero runtime, troca de tema instantânea só com um atributo no `<html>`. |
| Ilustrações SVG geradas por componente | Imagens originais, leves, nítidas em qualquer densidade e adaptáveis ao tema. |
| Hooks `useCart`/`useTheme` com erro fora do Provider | Falha rápida e mensagem clara em caso de uso incorreto. |
| `lastOrder` no mesmo reducer do carrinho | Confirmar pedido e esvaziar o carrinho acontecem em uma única transição atômica. |
| ViaCEP opcional e tolerante a falhas | Melhora a UX sem bloquear o fluxo se a API estiver indisponível. |
