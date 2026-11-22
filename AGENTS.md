# AGENTS.md — Diretrizes para o assistente de IA

> Projeto **Coffee Delivery** · Autor: **Luiz Felipe Rodrigues Silva**
> Assistente utilizado: **Claude Code** (Anthropic). Registro das interações em [docs/AI_USAGE.md](docs/AI_USAGE.md).

## 1. Contexto

SPA de e-commerce de uma cafeteria fictícia: catálogo → carrinho/checkout → confirmação. Sem back-end, autenticação ou pagamento real. A única API externa é a de CEP (ViaCEP).

- **Figma:** [Coffee Delivery • Projeto Final React](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297) — Home `2:1550`, Checkout `217:511`, Confirmação `222:824`, Style Guide.
- **Especificações (ler antes de escrever código):** [docs/PRD_SPEC.md](docs/PRD_SPEC.md) (o quê), [docs/TECH_SPEC.md](docs/TECH_SPEC.md) (como), [docs/TASKS_SPEC.md](docs/TASKS_SPEC.md) (ordem e status).

## 2. Tecnologias

React 19 · Vite · TypeScript strict · React Router · Context API + useReducer · styled-components · React Hook Form + Zod · Vitest + Testing Library · ESLint · Vercel.

## 3. Como o agente deve trabalhar

1. **Ler os SPECs** e identificar os IDs de requisito (RF-xx / RN-xx) afetados.
2. **Trabalhar em tarefas pequenas**, uma por vez, seguindo o `TASKS_SPEC.md`. Não gerar a aplicação inteira de uma só vez.
3. Para cada tarefa: propor o plano e os critérios de aceite, implementar, **rodar testes, lint e build**, mostrar a evidência e só então avançar.
4. **Explicar as decisões** (por que useReducer, por que centavos etc.) para que o aluno consiga defendê-las.
5. Atualizar o SPEC correspondente e marcar a tarefa no `TASKS_SPEC.md`.
6. Registrar interações relevantes em `docs/AI_USAGE.md` (prompt, objetivo, resposta, decisão, evidência).
7. Na dúvida sobre uma regra de negócio, **perguntar** ao aluno em vez de inventar.

## 4. Boas práticas de código

- Sem `any`; tipos de domínio em `src/types`.
- Componentes em `src/components/<Nome>/index.tsx` + `styles.ts` (styled-components).
- Cores somente via tema (`theme.colors.*`); nada de hex fixo em componentes que mudam com o tema.
- Estado do carrinho **somente** via ações do reducer; nunca mutar o estado (usar `map`, `filter`, spread).
- Dinheiro em **centavos**; formatar com `utils/format.ts`; frete apenas em `utils/cart.ts`.
- Validações em schemas Zod (`src/schemas`).
- Acessibilidade: label em todo campo, `aria-label` em botões só com ícone, foco visível, mensagens de erro com `role="alert"`.
- Toda regra nova precisa de teste em `src/tests` e de entrada no PRD.

## 5. Limites de escopo

- Não adicionar back-end, login, banco de dados ou pagamento real.
- Não adicionar dependências sem justificar no TECH_SPEC.
- Não usar imagens com direitos de terceiros; ilustrações são SVG próprios.
- Não incluir segredos, `.env` reais ou dados pessoais no repositório.
- Não marcar tarefas como concluídas sem testes passando.

## 6. Comandos

```bash
npm install
npm run dev            # http://localhost:5173
npm test               # Vitest (60 testes)
npm run lint
npm run build
npm run screenshots    # evidências em docs/screenshots (com o dev server ativo)
```

**Definição de pronto:** funcionalidade observável, requisito atendido, testes realizados, documentação atualizada e commit registrado.

## 7. Padrão de commits

Conventional Commits em português: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`, `build:`, `chore:` — com escopo opcional, ex.: `feat(checkout): consulta de CEP`.

## 8. Prompt inicial recomendado

> Atue como mentor de React e TypeScript neste projeto final Coffee Delivery. Leia PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md, AGENTS.md e o Figma. Identifique requisitos, dependências, componentes e riscos. Proponha apenas a próxima tarefa pequena, com critérios de aceite e um plano de testes. Não implemente toda a aplicação de uma vez. Explique as decisões e peça que eu valide o resultado antes de avançar.
