# Vice City Studio

A vitrine pública usa React, TanStack Router e Vite. O GitHub Pages publica os
arquivos estáticos da raiz do repositório, incluindo as páginas legais legadas.

## Atualização

1. Na pasta `site`, instale as dependências com `npm ci` e rode `npm test`.
2. Rode `node build-pages.mjs`. Use Node.js 24.
3. Na raiz do repositório, substitua `index.html`, `favicon.png`, `site-assets/`,
   `videos/index.html`, `novidades/index.html` e `sobre/index.html` pelos
   respectivos arquivos de `site/dist/`. Remova os arquivos com hash antigos
   de `site-assets/` ao atualizar a pasta.
4. Envie as fontes e os arquivos publicados no mesmo pull request.

Os destaques e exemplos ficam em `src/data/content.ts`. As notícias aprovadas
vêm de `editorial/approved.json` na raiz. O feed público de vídeos continua
sendo atualizado pelo workflow existente. O projeto Lovable sincroniza com
seu repositório de origem e novas mudanças feitas lá precisam ser portadas
para esta vitrine.

## Metadados e futura integração com GA4

Os metadados das rotas React são definidos em `seo-pages.json`. O build
inclui as tags no HTML inicial. A navegação React mantém o título, a URL
canônica e os metadados da página em sincronia.

O GA4 está desativado. Para ativar, configure um fluxo Web para
`https://vicecitystudio.com.br/` e use o ID de medição `G-…`. Defina o
consentimento e revise a política de privacidade antes de inserir a tag.
Inclua o mesmo bootstrap no HTML-base da vitrine e nas páginas estáticas
PT/EN em produção. Use uma única forma de medir o carregamento inicial e
as mudanças de rota do TanStack Router. Confira no DebugView que cada
navegação gera um único `page_view`.

[Guia do Google para medir SPAs no GA4](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
