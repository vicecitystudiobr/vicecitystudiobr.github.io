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

## Metadados e GA4

Os metadados das rotas React são definidos em `seo-pages.json`. O build
inclui as tags no HTML inicial. A navegação React mantém o título, a URL
canônica e os metadados da página em sincronia.

O GA4 usa o fluxo Web `16371130186` e o ID `G-SBSRDXEF5M`. Os arquivos
`analytics.js` e `analytics.css`, na raiz, atendem às páginas PT/EN e
às rotas React. O bootstrap básico carrega a tag somente após aceite.
O rodapé abre as preferências em todas as páginas públicas.

A integração envia `page_view` manualmente uma vez por rota, `social_click`
com `platform`, e `contact_click`. Os eventos incluem `language`. A tag
mede engajamento enquanto o Analytics está autorizado. A localização
enviada exclui fragmentos e parâmetros e o referenciador inicial é
reduzido à origem.

Antes da ativação, desligue a Medição aprimorada no fluxo Web. A tag
publicada pelo Google ainda registrava histórico, cliques de saída,
buscas e formulários automaticamente durante a implementação. A
configuração `send_page_view: false` só suprime a visualização automática
inicial. Validada a alteração no fluxo, defina `analyticsEnabled = true`
em `analytics.js` e publique. Confirme no DebugView um `page_view` por
navegação. Registre `platform` como dimensão personalizada de evento
para detalhar redes nos relatórios.

[Guia do Google para medir SPAs no GA4](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
