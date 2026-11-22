# PRD_SPEC — Coffee Delivery

> **Autor:** Luiz Felipe Rodrigues Silva · **Disciplina:** Single Page Application (SPA) — Projeto Final 05
> **Versão:** 2.0 · **Atualizado em:** 22/11/2026
> **Referências:** [Figma](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297) — Home (frame 2:1550), Checkout (217:511), Confirmação (222:824) · Enunciado no Notion

## 1. Visão geral

O **Coffee Delivery** é uma SPA de e-commerce para uma cafeteria fictícia. O cliente consulta os cafés, escolhe quantidades, monta um carrinho, informa o endereço, seleciona a forma de pagamento e recebe a confirmação de um pedido fictício.

### 1.1 Problema

Pedir café para entrega costuma exigir muitos passos e telas confusas. O cliente quer ver rapidamente o que há no cardápio, quanto vai pagar (incluindo frete) e ter certeza de que o pedido foi feito para o endereço certo.

### 1.2 Objetivos

| Objetivo | Como medimos |
|----------|--------------|
| Compra em poucos passos | Home → Checkout → Confirmação em 3 telas, sem recarregar a página |
| Transparência de valores | Subtotal, entrega e total sempre visíveis e consistentes |
| Menos erros de endereço | CEP consultado em API pública com preenchimento automático e mensagens de erro claras |
| Acesso em qualquer dispositivo | Fluxo completo usável de 320 px a 1440 px, nos temas claro e escuro |
| Objetivos de aprendizagem | Aplicar React, TypeScript, Context API, useReducer, Hooks, rotas, formulários, persistência, testes e IA de forma crítica |

### 1.3 Público-alvo

Pessoas que pedem café pelo celular ou computador, valorizam rapidez e clareza de preço e prazo. Inclui usuários de teclado e leitores de tela.

### 1.4 Escopo

**Dentro do escopo:** catálogo, busca e filtro, carrinho persistido, checkout com validação e consulta de CEP, pagamento informativo, confirmação, Dark Mode, responsividade, marca própria criada com IA.

**Fora do escopo (exclusões):** back-end próprio, banco de dados, autenticação, pagamento real, rastreamento em tempo real, painel administrativo.

## 2. Fluxos de usuário

```
Home (catálogo)                 Checkout                         Confirmação
─────────────────               ───────────────────────          ────────────────────
escolhe quantidade  ──► add ──► revisa itens (+ / − / remover) ─► endereço, previsão
filtra / busca                  informa CEP → autopreenche         e forma de pagamento
badge soma unidades             completa número/complemento       carrinho esvaziado
                                escolhe pagamento
                                confirma (se tudo válido) ──────►
```

Fluxos alternativos: carrinho vazio no checkout → estado vazio com link para o catálogo; CEP não encontrado → erro no campo e confirmação bloqueada; API de CEP indisponível → aviso e preenchimento manual; `/success` sem pedido → estado vazio; rota inexistente → 404.

## 3. Requisitos funcionais

| ID | Requisito | Critério de aceite verificável | Teste |
|----|-----------|-------------------------------|-------|
| RF-01 | Exibir catálogo de cafés com imagem, nome, descrição, preço e categoria/tag | Os 14 cafés aparecem na Home com todos os dados | `app.test` "RF-01" |
| RF-02 | Selecionar a quantidade de cada café antes de adicioná-lo | Quantidade inteira entre 1 e 99; "−" desabilitado em 1 | `app.test` "RF-02/03/04/06" |
| RF-03 | Adicionar ao carrinho e acumular quantidade de produto repetido | Adicionar 2 + 1 Lattes gera **uma** linha com 3 | `cartReducer.test`, `app.test` |
| RF-04 | Contador de unidades no Header | Badge mostra a **soma das quantidades** (3 Lattes + 1 Cubano = 4) | `app.test`, `cartUtils.test` |
| RF-05 | Aumentar, diminuir e remover itens individualmente | Totais e badge atualizam imediatamente | `app.test` "RF-05" |
| RF-06 | Persistir carrinho com localStorage | Itens recuperados após atualizar a página | `app.test` "RF-06" |
| RF-07 | Navegar entre Home, Checkout e Confirmação com React Router | Troca de telas sem recarregamento completo | `app.test` "RF-07" |
| RF-08 | Endereço com consulta obrigatória a API pública de CEP | CEP válido preenche rua, bairro, cidade e UF; número/complemento manuais; erros para CEP inválido, não encontrado ou falha | `app.test` "RF-08", "RN-07", `viacep.test` |
| RF-09 | Selecionar forma de pagamento: crédito, débito ou dinheiro | Uma opção é obrigatória | `checkoutSchema.test`, `app.test` "RF-11" |
| RF-10 | Exibir subtotal, taxa de entrega e total | Valores consistentes e em BRL | `app.test` "RF-06", `cartUtils.test` |
| RF-11 | Impedir finalização com carrinho vazio ou formulário inválido | Mensagens por campo com `role="alert"`; foco no 1º erro; estado vazio sem itens | `app.test` "RF-11", "RN-09" |
| RF-12 | Confirmar pedido e mostrar endereço e pagamento | Tela de sucesso com dados do pedido | `app.test` "RF-12/13" |
| RF-13 | Limpar o carrinho após confirmar, preservando o pedido | Sucesso correto com carrinho vazio | `app.test` "RF-12/13" |
| RF-14 | Alternar light/dark mode | Tema aplicado em todas as telas e persistido | `app.test` "RF-14" |
| RF-15 | Adaptar layout para dispositivos móveis | Fluxo completo usável em 320/390/768/1440 px | `npm run screenshots` |
| RF-16 | Aplicar logo original criada com IA | Logo no Header, favicon e documentação da marca | README "Branding com IA" |

## 4. Regras de negócio

| ID | Regra | Decisão adotada |
|----|-------|-----------------|
| RN-01 | Quantidades | Adição só com inteiro ≥ 1. No carrinho, **o "−" para em 1** (botão desabilitado); para tirar o item usa-se "Remover". Máximo de 99 por item. |
| RN-02 | Produto único | Adicionar de novo o mesmo café soma a quantidade na linha existente. |
| RN-03 | Cálculo e frete | `subtotal = Σ(preço × quantidade)`; `total = subtotal + entrega`. **Entrega fixa fictícia de R$ 3,50**, cobrada apenas com itens no carrinho, definida em um único lugar (`utils/cart.ts`). |
| RN-04 | Valores monetários | Cálculos em **centavos** (inteiros); exibição em BRL com 2 casas (`Intl.NumberFormat('pt-BR')`). Todos os cafés custam R$ 9,90. |
| RN-05 | Pagamento | Crédito, débito ou dinheiro, **apenas informativo** — pago na entrega, sem transação. |
| RN-06 | Persistência | Carrinho e tema no localStorage. O pedido confirmado é um **snapshot** (nome, preço, quantidade, endereço, pagamento, totais) independente do carrinho atual. |
| RN-07 | Endereço | Complemento opcional (máx. 60). CEP `00000-000` (máscara automática). Número: dígitos com letra opcional ou `S/N`. UF: uma das 27 siglas. ViaCEP preenche logradouro, bairro, cidade e UF; trata carregamento, CEP não encontrado e API indisponível (nesse caso o usuário preenche manualmente). |
| RN-08 | Dados | Catálogo em arquivo local tipado (`data/coffees.ts`); a única API externa é a de CEP. |
| RN-09 | Estados vazios | Mensagens para carrinho vazio, confirmação sem pedido válido e rota inexistente. |
| RN-10 | Navegação | Não confirmar com erros de validação, CEP não encontrado/em consulta, ou itens inexistentes (itens cujo id não está no catálogo são descartados ao restaurar). |

Previsão de entrega exibida: 20 a 30 minutos (valor fictício, como no protótipo).

## 5. Requisitos não funcionais

| ID | Categoria | Requisito |
|----|-----------|-----------|
| RNF-01 | Compatibilidade | React 19 + Vite + TypeScript `strict`; navegadores modernos (Chrome, Edge, Firefox, Safari — últimas 2 versões). |
| RNF-02 | Responsividade | Breakpoints testados em 320, 390, 768 e 1440 px; sem rolagem horizontal; alvos de toque ≥ 32 px. |
| RNF-03 | Acessibilidade (WCAG 2.2 AA) | Labels associados (visualmente ocultos, como no protótipo), `aria-invalid`/`aria-describedby`, erros com `role="alert"`, foco visível, radios nativos navegáveis por teclado, `aria-live` para busca/CEP/carrinho, `prefers-reduced-motion`. |
| RNF-04 | Desempenho | Sem imagens bitmap (ilustrações SVG); bundle ≈ 150 kB gzip; consulta de CEP cancelada (AbortController) se o CEP mudar. |
| RNF-05 | Persistência/robustez | Dados corrompidos no localStorage são descartados sem quebrar a app. |
| RNF-06 | Qualidade | ESLint sem erros; 60 testes automatizados; build sem erros de tipo. |
| RNF-07 | Publicação | Deploy na Vercel com rewrite de SPA (`vercel.json`). |

## 6. Marca e temas

- **Marca:** "Coffee Delivery" mantido. Logo original criada com IA: pin de localização (entrega) com xícara fumegante (café) e linhas de velocidade (entrega rápida). Variações para fundo claro e escuro + ícone/favicon. Detalhes no README, seção *Branding com IA*.
- **Paleta:** amarelo `#DBAC2C` / `#C47F17` / `#F1E9C9` e roxo `#8047F8` / `#4B2995` / `#EBE5F9`, seguindo o Style Guide do Figma; tons base neutros quentes.
- **Tipografia:** Baloo 2 (títulos) e Roboto (textos).
- **Light/Dark:** tokens semânticos (fundo, superfície, textos, bordas, botões, foco, erro, aviso) definidos para os dois temas; cards, formulários, carrinho e sucesso respeitam o tema. Preferência salva com fallback para `prefers-color-scheme`.

## 7. Critérios de aceite gerais e decisões de produto

- [x] O projeto inicia e compila sem erros.
- [x] Todos os RF-01 a RF-16 têm critério verificável e evidência (teste ou screenshot).
- [x] Todas as RN-01 a RN-10 estão implementadas e documentadas.
- [x] Funciona em desktop, tablet e celular, nos dois temas.

**Decisões de produto:** "−" para em 1 (evita remoção acidental); filtro por categoria usa "E" (todas as tags selecionadas); busca ignora acentos; extras implementados: busca por nome e filtro por categoria, botão "Fazer novo pedido" na confirmação.
