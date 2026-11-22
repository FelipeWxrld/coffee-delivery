# AI_USAGE — Registro de uso de Inteligência Artificial

> **Autor:** Luiz Felipe Rodrigues Silva
> **Assistente:** Claude Code (Anthropic), no aplicativo desktop, com acesso ao terminal, ao navegador embutido (para ler o Notion e o Figma) e ao repositório.

A IA foi usada como par de programação para planejar, implementar, revisar, depurar e testar. As decisões foram revisadas pelo aluno, que responde pelo resultado e deve saber explicá-lo.

## Interações relevantes

### 1. Planejamento: do enunciado aos SPECs

- **Prompt (resumo):** "Desenvolva o Coffee Delivery seguindo o protótipo do Figma, com React, Vite, TypeScript, Context API, useReducer, React Router, localStorage, React Hook Form + Zod, Dark Mode, responsividade, logo criada por IA e documentação PRD/TECH/TASKS/AGENTS."
- **Objetivo:** transformar o enunciado em requisitos, regras de negócio, arquitetura e plano de tarefas antes de codificar.
- **Resposta resumida:** propôs a arquitetura (Providers → Router → Layout → páginas), o modelo de estado (`items` + `lastOrder`), o uso de centavos para dinheiro e os documentos de especificação.
- **Decisão tomada:** aceitei a arquitetura e o cálculo em centavos. Defini o frete fixo de R$ 3,50 e a regra de o "−" parar em 1 no carrinho.
- **Evidência:** commit `feat: Coffee Delivery…`; seções 2–5 do [TECH_SPEC.md](TECH_SPEC.md).

### 2. Conferência com o Notion e o Figma (gap analysis)

- **Prompt:** "O Figma e o Notion agora estão logados, por favor, faça de acordo com as referências."
- **Objetivo:** comparar a primeira versão com o enunciado completo e o protótipo.
- **Resposta resumida:** a IA leu o enunciado no navegador e apontou o que faltava. Faltavam a consulta obrigatória de CEP com estados de erro e carregamento, styled-components como estilização esperada e os componentes sugeridos (CartBadge, CartSummary, DeliveryAddressForm, PaymentMethodSelector, EmptyCart…). Também faltavam os documentos em `docs/` com IDs RF/RN, a pasta `src/assets` com variações da logo e este registro de IA. Nas telas do Figma, conferiu Home, Checkout e Sucesso.
- **Decisão tomada:** migrar de CSS Modules para styled-components, para seguir o desafio de origem. Reorganizar os componentes conforme o enunciado e implementar os estados do CEP. Reescrever os SPECs com rastreabilidade RF ↔ testes.
- **Evidência:** commits `refactor(style)`, `feat(checkout)`, `refactor(ui)`; tabela RF × testes no [PRD_SPEC.md](PRD_SPEC.md).

### 3. Depuração: testes quebrando com `localStorage` indefinido

- **Prompt (contexto):** saída do `vitest` com `TypeError: Cannot read properties of undefined (reading 'clear')` em todos os testes.
- **Objetivo:** entender por que o jsdom "não tinha" localStorage.
- **Resposta resumida:** o Node 25+ expõe um `localStorage` global experimental que, sem `--localstorage-file`, fica indefinido e **sobrepõe** o do jsdom. Sugeriu instalar um `Storage` em memória no `setup.ts`.
- **Decisão tomada:** aceita. Implementação isolada no setup dos testes, sem afetar o código da aplicação.
- **Evidência:** `src/tests/setup.ts` (classe `MemoryStorage`); suíte passando (60/60).

### 4. Revisão visual: bug de espaçamento encontrado nas screenshots

- **Prompt (contexto):** a IA gerou screenshots com Puppeteer e analisou as imagens.
- **Objetivo:** verificar a fidelidade ao Figma e a responsividade.
- **Resposta resumida:** notou que o Header e o hero estavam "colados" no topo. A classe global `.container` (`padding: 0 1.25rem`) era carregada depois dos módulos e zerava o `padding` vertical.
- **Decisão tomada:** trocar para `padding-inline`; depois, com styled-components, o problema deixou de existir por construção (`Container` só define o eixo horizontal).
- **Evidência:** screenshots em `docs/screenshots` antes e depois da correção; `src/styles/shared.ts`.

### 5. Testes de integração dos estados do CEP

- **Prompt (resumo):** "Escreva testes cobrindo o fluxo completo, inclusive CEP encontrado, não encontrado e falha da API."
- **Objetivo:** garantir RF-08, RN-07 e RN-10 sem depender da internet.
- **Resposta resumida:** criou um `fetch` simulado com 3 CEPs (existente, `{ erro: true }` e erro de rede). Um teste falhou porque o radio de pagamento tem `pointer-events: none`; a correção foi clicar no texto visível da opção, como faz o usuário real.
- **Decisão tomada:** manter o radio nativo escondido (acessível por teclado) e ajustar o teste.
- **Evidência:** `src/tests/app.test.tsx` e `src/tests/viacep.test.ts`.

### 6. Branding com IA

- Ver README, seção **Branding com IA** (ferramenta, prompt, resultado, motivos da escolha e direitos de uso).

## Uso responsável

- Nenhum dado pessoal, senha ou chave foi incluído no código. O commit usa o e-mail `noreply` do GitHub.
- Sugestões da IA foram validadas por testes (`npm test`), lint, build e screenshots antes de cada commit.
- O código gerado foi lido e entendido; os pontos centrais (reducer, Context, Zod, persistência, CEP) estão explicados no TECH_SPEC para a apresentação.
