# Site Vila Bella

Este repositório contém o site institucional da Vila Bella, com landing page, catálogo de produtos, área de membros e fluxo completo de compras. Use-o como ponto de partida para ajustar textos, imagens e integrações específicas da marca.

## Iniciando localmente

1. Instale as dependências com `npm install`.
2. Rode `npm run dev` e abra o endereço fornecido pelo Vite para ver as alterações em tempo real.

## Scripts disponíveis

- `npm run dev` – ambiente de desenvolvimento com recarga automática.
- `npm run build` – gera o build de produção em `dist/`.
- `npm run preview` – testa o build de produção localmente.
- `npm run lint` – executa o ESLint em todo o projeto.

## Deploy

1. Gere o build com `npm run build`.
2. Faça o deploy da pasta `dist/` no serviço de hospedagem da sua escolha.

## Estrutura relevante

- `src/pages` – páginas completas como home, catálogo, produto e fluxo de checkout.
- `src/components` – componentes reutilizáveis de layout e UI (header, footer, botões, etc.).
- `src/contexts` – contextos como autenticação e carrinho de compras.
- `src/lib` e `src/hooks` – helpers e hooks personalizados usados pela aplicação.

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS e shadcn-ui
- TanStack Query, React Router, Sonner e outras bibliotecas de estado/ UI
