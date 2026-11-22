# TASKS_SPEC — Coffee Delivery

> **Autor:** Luiz Felipe Rodrigues Silva

Planejamento das etapas de implementação e acompanhamento. Legenda: ✅ concluída · 🔄 em andamento · ⏳ pendente.

## Etapa 1 — Planejamento e especificação

| # | Tarefa | Status |
|---|--------|--------|
| 1.1 | Analisar protótipo do Figma (telas Home, Checkout, Sucesso) e o enunciado | ✅ |
| 1.2 | Escrever `PRD_SPEC.md` (requisitos, regras de negócio, critérios de aceite) | ✅ |
| 1.3 | Escrever `TECH_SPEC.md` (arquitetura, estado, testes) | ✅ |
| 1.4 | Escrever `AGENTS.md` (diretrizes de uso do assistente de IA) | ✅ |

## Etapa 2 — Setup do projeto

| # | Tarefa | Status |
|---|--------|--------|
| 2.1 | Criar projeto Vite + React + TypeScript (`strict`) | ✅ |
| 2.2 | Configurar ESLint, Vitest, Testing Library e jsdom | ✅ |
| 2.3 | Definir design tokens (cores, fontes) e estilos globais | ✅ |
| 2.4 | Inicializar Git e repositório no GitHub | ✅ |

## Etapa 3 — Identidade visual

| # | Tarefa | Status |
|---|--------|--------|
| 3.1 | Criar logo original com IA (pin de entrega + xícara) em SVG | ✅ |
| 3.2 | Aplicar logo no header e como favicon | ✅ |
| 3.3 | Criar ilustrações SVG dos 14 cafés (`CoffeeCup`) e da entrega | ✅ |

## Etapa 4 — Domínio e estado

| # | Tarefa | Status |
|---|--------|--------|
| 4.1 | Tipos de domínio e catálogo de cafés | ✅ |
| 4.2 | Actions + reducer do carrinho (regras RN02, RN03, RN11) | ✅ |
| 4.3 | `CartContext` com valores derivados e persistência no LocalStorage | ✅ |
| 4.4 | `ThemeContext` com persistência e preferência do sistema | ✅ |
| 4.5 | Hooks `useCart` e `useTheme` | ✅ |

## Etapa 5 — Telas e componentes

| # | Tarefa | Status |
|---|--------|--------|
| 5.1 | Rotas (React Router) e `DefaultLayout` | ✅ |
| 5.2 | `Header` (logo, localização, tema, carrinho com badge) | ✅ |
| 5.3 | Home: hero, benefícios, filtros, grade de `CoffeeCard` | ✅ |
| 5.4 | Checkout: formulário (RHF + Zod), `PaymentOption`, resumo com `CartItemRow` | ✅ |
| 5.5 | Autopreenchimento de endereço via ViaCEP | ✅ |
| 5.6 | Página de sucesso e página 404 | ✅ |
| 5.7 | Estado vazio do carrinho | ✅ |

## Etapa 6 — Dark Mode e responsividade

| # | Tarefa | Status |
|---|--------|--------|
| 6.1 | Paleta dark com contraste adequado | ✅ |
| 6.2 | Breakpoints desktop / tablet / mobile em todas as telas | ✅ |
| 6.3 | Revisão de acessibilidade (aria-labels, foco, teclado) | ✅ |

## Etapa 7 — Qualidade

| # | Tarefa | Status |
|---|--------|--------|
| 7.1 | Testes unitários: reducer, schema, utils | ✅ |
| 7.2 | Testes de integração do fluxo completo | ✅ |
| 7.3 | Lint e build sem erros | ✅ |
| 7.4 | Revisão de código assistida por IA | ✅ |

## Etapa 8 — Entrega

| # | Tarefa | Status |
|---|--------|--------|
| 8.1 | Script de screenshots (desktop, tablet, mobile, light/dark) | ✅ |
| 8.2 | `README.md` com evidências e registro de uso de IA | ✅ |
| 8.3 | Deploy na Vercel com rewrite de SPA | ✅ |
| 8.4 | Enviar links (GitHub + deploy) no Blackboard | ⏳ (aluno) |

## Melhorias futuras (backlog)

- Busca textual no catálogo.
- Histórico de pedidos.
- Testes end-to-end com Playwright em CI (GitHub Actions).
- PWA (instalação e uso offline do catálogo).
