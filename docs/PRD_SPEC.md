# PRD_SPEC — Coffee Delivery

> **Autor:** Luiz Felipe Rodrigues Silva · **Versão:** 1.0.0 · **Data:** 22/11/2026

## 1. Visão do produto

O **Coffee Delivery** é uma Single Page Application (SPA) de e-commerce para uma cafeteria fictícia. O usuário navega por um catálogo de cafés, monta um carrinho, informa o endereço de entrega, escolhe a forma de pagamento e finaliza um pedido fictício (sem cobrança real).

### 1.1 Objetivos

- Oferecer uma experiência de compra simples, rápida e agradável em qualquer dispositivo.
- Aplicar na prática os conceitos de React estudados no semestre: componentes, props, hooks, Context API, `useReducer`, React Router, formulários com validação e persistência local.
- Reproduzir fielmente o protótipo do Figma, com identidade visual própria (logo criada com IA) e Dark Mode.

### 1.2 Público-alvo

Pessoas que querem pedir café para entrega pelo celular ou computador — perfil "compra rápida", que valoriza poucos cliques e informação clara de preço e prazo.

### 1.3 Fora do escopo

- Pagamento online real, login/cadastro de usuários, painel administrativo, rastreamento em tempo real e back-end próprio.

## 2. Requisitos funcionais (RF)

| ID | Requisito | Prioridade |
|----|-----------|-----------|
| RF01 | Exibir catálogo com os 14 cafés: imagem, categorias (tags), nome, descrição e preço. | Alta |
| RF02 | Permitir escolher a quantidade de um café no card antes de adicioná-lo ao carrinho. | Alta |
| RF03 | Adicionar café ao carrinho; se já existir, somar a quantidade. | Alta |
| RF04 | Exibir no header um contador com a quantidade total de itens no carrinho. | Alta |
| RF05 | Na tela de checkout, listar os itens com possibilidade de aumentar, diminuir e remover. | Alta |
| RF06 | Calcular total dos itens, taxa de entrega e total do pedido em tempo real. | Alta |
| RF07 | Formulário de endereço: CEP, rua, número, complemento (opcional), bairro, cidade e UF. | Alta |
| RF08 | Selecionar forma de pagamento: cartão de crédito, cartão de débito ou dinheiro. | Alta |
| RF09 | Validar o formulário (React Hook Form + Zod) exibindo mensagens por campo. | Alta |
| RF10 | Confirmar o pedido e exibir a página de sucesso com endereço, previsão e pagamento. | Alta |
| RF11 | Persistir carrinho e último pedido no LocalStorage (sobrevive a recarregamentos). | Alta |
| RF12 | Alternar entre Light Mode e Dark Mode, lembrando a preferência do usuário. | Alta |
| RF13 | Filtrar o catálogo por categoria (tradicional, especial, com leite, alcoólico, gelado). | Média |
| RF14 | Preencher rua, bairro, cidade e UF automaticamente a partir do CEP (ViaCEP). | Média |
| RF15 | Exibir página 404 para rotas inexistentes e estado vazio no checkout sem itens. | Média |

## 3. Requisitos não funcionais (RNF)

| ID | Requisito |
|----|-----------|
| RNF01 | Desenvolvido com React 19, Vite e TypeScript em modo `strict`. |
| RNF02 | Responsivo: desktop (≥ 1024px), tablet (768–1023px) e mobile (< 768px), sem rolagem horizontal. |
| RNF03 | Acessibilidade: HTML semântico, `aria-label` em botões de ícone, foco visível, navegação por teclado nas opções de pagamento, contraste adequado nos dois temas, respeito a `prefers-reduced-motion`. |
| RNF04 | Desempenho: bundle único com gzip ≈ 130 kB; sem imagens bitmap (ilustrações em SVG). |
| RNF05 | Robustez: dados corrompidos no LocalStorage são descartados sem quebrar a aplicação. |
| RNF06 | Qualidade: ESLint sem erros, testes automatizados (Vitest + Testing Library) passando. |
| RNF07 | Deploy contínuo em plataforma estática (Vercel) com fallback de rotas para SPA. |
| RNF08 | Versionamento com Git e commits descritivos (padrão Conventional Commits). |

## 4. Regras de negócio (RN)

| ID | Regra |
|----|-------|
| RN01 | Todos os cafés custam **R$ 9,90**; valores são tratados em **centavos** para evitar erros de ponto flutuante. |
| RN02 | Quantidade mínima por item: **1**; máxima: **99**. O botão "−" não remove o item — para isso existe "Remover". |
| RN03 | Adicionar um café que já está no carrinho **soma** as quantidades (respeitando o máximo). |
| RN04 | Taxa de entrega fixa de **R$ 3,50**, cobrada apenas quando há itens no carrinho. |
| RN05 | Total do pedido = soma de (preço × quantidade) + taxa de entrega. |
| RN06 | Não é possível finalizar pedido com carrinho vazio (o checkout exibe estado vazio). |
| RN07 | CEP no formato `00000-000` (o hífen é opcional na digitação; máscara automática). |
| RN08 | Número aceita dígitos (com letra opcional, ex.: `12A`) ou `S/N`. Complemento é opcional (máx. 60 caracteres). |
| RN09 | UF deve ser uma das 27 siglas brasileiras válidas (maiúsculas ou minúsculas). |
| RN10 | Forma de pagamento é obrigatória; o pagamento é feito na entrega. |
| RN11 | Ao confirmar, o pedido é salvo como "último pedido" e o carrinho é esvaziado. |
| RN12 | A página de sucesso só é acessível se existir um pedido confirmado; caso contrário, redireciona para a home. |
| RN13 | A previsão de entrega exibida é de 20 a 30 minutos. |
| RN14 | O tema inicial segue a preferência do sistema operacional; após alternância, a escolha do usuário prevalece. |

## 5. Critérios de aceite

**Catálogo**
- [x] Dado que acesso `/`, vejo 14 cards de café com imagem, tags, nome, descrição, preço, seletor de quantidade e botão de carrinho.
- [x] Ao clicar em uma categoria, apenas cafés que possuem **todas** as categorias selecionadas aparecem.

**Carrinho**
- [x] Ao adicionar 2 Lattes, o badge do header mostra `2` e o card volta a quantidade para 1.
- [x] Ao recarregar a página, o carrinho continua igual (LocalStorage).
- [x] No checkout, "+" / "−" alteram a quantidade e os totais; "−" não baixa de 1; "Remover" exclui o item.

**Checkout**
- [x] Ao enviar o formulário vazio, aparecem mensagens de erro nos campos obrigatórios e na forma de pagamento.
- [x] Ao digitar um CEP válido, rua/bairro/cidade/UF são preenchidos automaticamente (quando o ViaCEP responde).
- [x] Com dados válidos, clicar em "Confirmar pedido" leva à página de sucesso.

**Confirmação**
- [x] A página de sucesso exibe endereço, previsão "20 min - 30 min", forma de pagamento e total.
- [x] Após confirmar, o carrinho fica vazio e o header mostra a cidade do pedido.

**Tema e responsividade**
- [x] O botão de lua/sol alterna Light/Dark, e a preferência persiste após recarregar.
- [x] Em 390px de largura, todas as telas são utilizáveis sem rolagem horizontal.

Cada critério é coberto por testes automatizados (ver `TECH_SPEC.md §7`) e por evidências em `docs/screenshots`.
