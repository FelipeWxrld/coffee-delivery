# AGENTS.md — Diretrizes para o assistente de IA

> Projeto: **Coffee Delivery** · Autor: **Luiz Felipe Rodrigues Silva**
> Assistente utilizado: **Claude Code** (Anthropic), no aplicativo desktop.

Este arquivo orienta qualquer agente de IA que trabalhe neste repositório e registra como a IA foi usada.

## 1. Contexto do projeto

SPA de e-commerce de café em **React 19 + Vite + TypeScript**. Leia `PRD_SPEC.md` (o quê) e `TECH_SPEC.md` (como) antes de alterar código. O progresso fica em `TASKS_SPEC.md`.

## 2. Comandos

```bash
npm install          # dependências
npm run dev          # servidor de desenvolvimento (http://localhost:5173)
npm test             # testes (Vitest)
npm run lint         # ESLint
npm run build        # checagem de tipos + build de produção
npm run screenshots  # evidências em docs/screenshots (requer npm run dev ativo)
```

Uma tarefa só está concluída quando `npm test`, `npm run lint` e `npm run build` passam.

## 3. Regras de código

1. **TypeScript estrito**: sem `any`; tipos de domínio em `src/@types`.
2. **Componentes funcionais** em `src/components/<Nome>/index.tsx` com `<Nome>.module.css` ao lado.
3. **Cores somente via variáveis CSS** (`var(--color-…)`) — nunca hex fixo em componentes que mudam com o tema.
4. **Estado global** apenas via `CartContext` (useReducer) e `ThemeContext`; alterações do carrinho passam por *actions* do reducer.
5. **Valores monetários em centavos**; formatar com `utils/format.ts`.
6. **Validação** de formulários com schemas Zod em `src/schemas`.
7. **Acessibilidade**: botões só com ícone precisam de `aria-label`; manter foco visível.
8. Toda regra de negócio nova precisa de teste e de entrada no `PRD_SPEC.md`.
9. Commits no padrão *Conventional Commits* (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).

## 4. O que o agente NÃO deve fazer

- Incluir chaves, senhas ou dados pessoais no código ou nos commits.
- Adicionar dependências sem justificar no `TECH_SPEC.md`.
- Copiar assets protegidos por direitos autorais; imagens devem ser originais (SVG) ou livres.
- Marcar tarefas como concluídas sem rodar testes, lint e build.

## 5. Registro de uso da IA

A IA foi usada como **par de programação**; o aluno revisou as decisões e é responsável pelo resultado e por saber explicá-lo.

| Fase | Como a IA ajudou | Validação humana / verificação |
|------|------------------|-------------------------------|
| **Planejamento** | Transformou o enunciado e o protótipo em requisitos, regras de negócio e critérios de aceite (`PRD_SPEC.md`), e propôs a arquitetura (`TECH_SPEC.md`) e o plano (`TASKS_SPEC.md`). | Conferência com o enunciado e o Figma. |
| **Identidade visual** | Gerou a **logo original** em SVG (ver §6) e as ilustrações dos cafés e da entrega. | Revisada nos dois temas e como favicon. |
| **Desenvolvimento** | Escreveu componentes, contextos, reducer, schema Zod e estilos responsivos. | `tsc -b` e build sem erros. |
| **Revisão** | Revisou acessibilidade, contraste do Dark Mode e casos de borda (LocalStorage corrompido, carrinho vazio, quantidade máxima). | Lint sem erros. |
| **Testes** | Criou 35 testes (unitários e integração) e um script Puppeteer para screenshots. | `npm test` → 35/35 passando. |
| **Depuração** | Diagnosticou falha nos testes (Node 25+ sobrepõe o `localStorage` do jsdom) e um bug de CSS (`.container` global sobrescrevia o `padding` vertical dos módulos), corrigidos e verificados pelas screenshots. | Testes e screenshots refeitos. |

### Exemplos de prompts utilizados

- "Desenvolva o Coffee Delivery seguindo o protótipo do Figma com React, Vite, TypeScript, Context API, useReducer, React Router, LocalStorage, React Hook Form + Zod, Dark Mode e responsividade."
- "Crie uma logo original para o Coffee Delivery: um pin de localização com uma xícara fumegante, nas cores roxo e amarelo do protótipo, em SVG que funcione no tema claro e escuro."
- "Escreva testes de integração cobrindo o fluxo completo até a confirmação do pedido."
- "Revise o código procurando problemas de acessibilidade e de contraste no Dark Mode."

## 6. Logo criada com IA

- **Ferramenta:** Claude (Anthropic), gerando o SVG diretamente em código.
- **Prompt (resumo):** "Logo original para uma cafeteria com delivery: um pin de localização roxo (#8047F8) contendo uma xícara amarela (#DBAC2C) com vapor, linhas de velocidade à esquerda e o nome 'Coffee Delivery' em Baloo 2."
- **Conceito:** o *pin* representa a entrega até o endereço do cliente; a xícara com vapor, o café quente; as linhas de velocidade, a entrega rápida.
- **Arquivos:** `src/components/Logo/index.tsx` (componente, adapta-se ao tema), `public/favicon.svg`, `docs/logo.svg`.
