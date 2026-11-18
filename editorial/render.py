"""Regenerate the public news section in both languages."""
from datetime import date
from html import escape
from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
START = '<!-- editorial-news:start -->'
END = '<!-- editorial-news:end -->'


def cards(posts, language):
    result = []
    for post in posts:
        timestamp = date.fromisoformat(post['date'])
        display = timestamp.strftime('%d/%m/%Y' if language == 'pt' else '%b %d, %Y')
        title, description = map(escape, post[language])
        url = escape(post['url'], quote=True)
        source = 'Ler na Rockstar Games' if language == 'pt' else 'Read at Rockstar Games'
        result.append(f'<article class="card news-card"><time datetime="{timestamp}">{display}</time>'
                      f'<h3>{title}</h3><p>{description}</p><a href="{url}">{source} →</a></article>')
    return '\n'.join(result)


def main():
    posts = json.loads((HERE / 'approved.json').read_text(encoding='utf-8'))
    posts.sort(key=lambda post: post['date'], reverse=True)
    for language, filename in [('pt', 'index.html'), ('en', 'en/index.html')]:
        page = HERE.parent / filename
        html = page.read_text(encoding='utf-8')
        initial, content = html.split(START, 1)
        _, final = content.split(END, 1)
        page.write_text(f'{initial}{START}\n{cards(posts, language)}\n{END}{final}', encoding='utf-8')


if __name__ == '__main__':
    main()
