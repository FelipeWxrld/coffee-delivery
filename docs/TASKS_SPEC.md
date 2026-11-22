# TASKS_SPEC — Plano de implementação

> **Autor:** Luiz Felipe Rodrigues Silva · Requisitos do [PRD_SPEC.md](PRD_SPEC.md) · Arquitetura no [TECH_SPEC.md](TECH_SPEC.md)

Checklist em ordem de execução. Cada tarefa tem ID, objetivo, requisitos, arquivos, critério de pronto, teste realizado, commit e status.
Legenda: ✅ concluída · ⏳ pendente.

| ID | Tarefa / objetivo | Requisitos | Arquivos afetados | Critério de pronto | Teste realizado | Commit | Status |
|----|-------------------|-----------|-------------------|--------------------|-----------------|--------|--------|
| T01 | Analisar Figma e enunciado; listar telas, estados e componentes | todos | — | Lista de telas/componentes/estados documentada | Revisão manual com o Figma | — | ✅ |
| T02 | Escrever PRD, TECH, TASKS e AGENTS | todos | `docs/*`, `AGENTS.md` | Documentos versionados | Revisão do checklist do enunciado | `feat: Coffee Delivery…`, `docs: …` | ✅ |
| T03 | Preparar Vite + React + TS strict, ESLint, Vitest | RNF-01, RNF-06 | `package.json`, `vite.config.ts`, `tsconfig*` | `npm run dev/build/test` funcionam | `npm run build` | `feat: Coffee Delivery…` | ✅ |
| T04 | Desenhar identidade com IA (logo, variações, favicon) | RF-16 | `src/assets/*`, `public/favicon.svg` | Logo nítida no Header (44 px) e favicon (16 px) | Inspeção em screenshots claro/escuro | `feat(branding): …` | ✅ |
| T05 | Definir tokens light/dark e GlobalStyle | RF-14 | `src/styles/*` | Todas as cores vêm do tema | Screenshots light/dark | `refactor(style): …` | ✅ |
| T06 | Tipos e catálogo local tipado | RF-01, RN-08 | `src/types`, `src/data` | 14 cafés tipados | `tsc -b` | `refactor(cart): …` | ✅ |
| T07 | Header com logo, localização, tema e CartBadge | RF-04, RF-14 | `components/Header`, `CartBadge`, `ThemeToggle` | Badge soma unidades | `app.test` RF-02/03/04/06 | `refactor(ui): …` | ✅ |
| T08 | Catálogo: CoffeeCard, QuantityInput, CoffeeCatalog | RF-01, RF-02 | `components/CoffeeCard`, `QuantityInput`, `CoffeeCatalog`, `pages/Home` | Cards com imagem, tags, preço, quantidade | `app.test` RF-01 | `refactor(ui): …` | ✅ |
| T09 | Reducer + actions + CartContext | RF-03, RF-05, RN-01, RN-02 | `reducers/cart/*`, `contexts/CartContext.tsx` | Ações puras e imutáveis | `cartReducer.test` (18) | `refactor(cart): …` | ✅ |
| T10 | Cálculos centralizados (subtotal, frete, total) | RF-10, RN-03, RN-04 | `utils/cart.ts`, `utils/format.ts` | Frete definido em um único lugar | `cartUtils.test`, `format.test` | `refactor(cart): …` | ✅ |
| T11 | Persistência do carrinho e do tema | RF-06, RF-14, RN-06 | `utils/storage.ts`, `hooks/useLocalStorage.ts` | Carrinho e tema sobrevivem ao refresh | `useLocalStorage.test`, `app.test` RF-06/RF-14 | `refactor(style): …` | ✅ |
| T12 | Rotas e PageLayout | RF-07 | `Router.tsx`, `layouts/PageLayout.tsx` | Navegação sem recarregar | `app.test` RF-07 | `refactor(ui): …` | ✅ |
| T13 | Formulário de endereço com Zod + RHF | RF-08, RF-11, RN-07 | `schemas/checkout.ts`, `components/DeliveryAddressForm`, `TextInput` | Erros por campo, máscara de CEP | `checkoutSchema.test` (10) | `feat(checkout): …` | ✅ |
| T14 | Consulta ViaCEP com carregamento, não encontrado e falha | RF-08, RN-07, RN-10 | `services/viacep.ts`, `hooks/useCepLookup.ts`, `pages/Checkout` | Autopreenche; bloqueia CEP inexistente; aviso em falha | `viacep.test` (5), `app.test` RF-08/RN-07 | `feat(checkout): …` | ✅ |
| T15 | Pagamento e resumo do pedido | RF-09, RF-10 | `PaymentMethodSelector`, `CartSummary`, `CartItem` | Pagamento obrigatório; totais corretos | `app.test` RF-05/RF-11 | `refactor(ui): …` | ✅ |
| T16 | Sucesso com snapshot e carrinho limpo | RF-12, RF-13, RN-06 | `pages/Success`, `components/OrderSuccess` | Dados corretos com carrinho vazio | `app.test` RF-12/13 | `refactor(ui): …` | ✅ |
| T17 | Estados vazios e 404 | RF-11, RN-09 | `components/EmptyCart`, `pages/NotFound` | Mensagens para carrinho vazio, sem pedido e 404 | `app.test` RN-09 | `refactor(ui): …` | ✅ |
| T18 | Dark mode completo | RF-14 | `styles/themes.ts`, todos os `styles.ts` | Cards, formulário, carrinho e sucesso respeitam o tema | Screenshots dark (desktop, tablet, mobile, 320) | `refactor(style): …` | ✅ |
| T19 | Responsividade 320/390/768/1440 | RF-15 | `styles.ts` dos componentes | Sem rolagem horizontal; fluxo completo no celular | `npm run screenshots` | `docs: atualiza evidências…` | ✅ |
| T20 | Acessibilidade (labels, foco, alertas, teclado) | RNF-03 | `TextInput`, `PaymentMethodSelector`, `CoffeeCatalog` | Queries por label/role funcionam nos testes | `app.test` (consultas por `getByLabelText`/`getByRole`) | `refactor(ui): …` | ✅ |
| T21 | Extras: busca por nome e filtro por categoria | — | `components/CoffeeCatalog` | Busca sem acento; filtro combinado | `app.test` "filtra… busca…" | `refactor(ui): …` | ✅ |
| T22 | Testes de integração do fluxo completo | todos | `src/tests/*` | 60 testes passando | `npm test` | `test: …` | ✅ |
| T23 | Evidências visuais e README | — | `scripts/screenshots.mjs`, `docs/screenshots`, `README.md` | Home, Checkout, Sucesso, Dark e mobile no README | Revisão visual | `docs: …` | ✅ |
| T24 | Registro de uso de IA (≥ 3 interações) | — | `docs/AI_USAGE.md`, `AGENTS.md` | Prompt, objetivo, resposta, decisão, evidência | Revisão | `docs: …` | ✅ |
| T25 | Deploy na Vercel | RNF-07 | `vercel.json` | URL pública abre todas as rotas | `curl` 200 em `/` e `/checkout` | `docs: adiciona links…` | ✅ |
| T26 | Deploy automático a cada push (integração GitHub ↔ Vercel) | RNF-07 | Vercel (configuração) | Push na `main` gera novo deploy | — | — | ⏳ requer conectar o GitHub na conta Vercel |
| T27 | Enviar links no Blackboard e preparar apresentação | — | — | Links enviados | — | — | ⏳ (aluno) |

## Backlog (desafios extras não implementados)

- Histórico de pedidos fictícios; cupom de desconto; testes E2E com Playwright + GitHub Actions; tela de detalhes do produto.
