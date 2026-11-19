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
