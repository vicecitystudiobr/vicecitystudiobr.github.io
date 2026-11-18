# Publicar uma notícia

O workflow **Coletar pautas de GTA VI** consulta a página oficial a cada 30 minutos e também pode ser iniciado manualmente na aba Actions. O arquivo `pautas.json` da execução lista data, título e fonte das pautas ainda ausentes do site.

1. Abra a fonte oficial e confirme data, título e fatos.
2. Acrescente um item em `approved.json`, com um título e um resumo próprios em cada idioma.
3. Rode `python3 editorial/render.py` na raiz do repositório.
4. Revise as duas páginas iniciais e inclua o JSON e os HTMLs na mesma alteração.

A coleta tem acesso de leitura e os rascunhos ficam no artefato do GitHub Actions. A pasta editorial contém somente código público de coleta e notícias aprovadas para o site.

## Vídeos do canal

A mesma execução consulta o feed público do YouTube e escreve somente os metadados de vídeos recentes na branch `video-feed`. O site lê `videos.json` dessa branch. A variável pública `YOUTUBE_CHANNEL_ID` do repositório é opcional e pode fixar o ID canônico do canal se a resolução do nome falhar. A automação não envia vídeos ao YouTube nem publica notícias.
