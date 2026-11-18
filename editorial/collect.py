"""Collect draft leads from the official GTA VI page for editorial review."""
import argparse
import json
import re
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen

SOURCE = 'https://www.rockstargames.com/VI'
ARTICLE = re.compile(r'https://www\.rockstargames\.com/newswire/article/[a-z0-9]+')
DATE = re.compile(r'[A-Z][a-z]+ \d{1,2}, \d{4}$')


class NewsLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current = None
        self.items = {}

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            url = dict(attrs).get('href', '')
            self.current = (url, []) if ARTICLE.fullmatch(url) else None

    def handle_data(self, data):
        if self.current:
            self.current[1].append(data)

    def handle_endtag(self, tag):
        if tag != 'a' or self.current is None:
            return
        url, fragments = self.current
        self.current = None
        copy = ' '.join(' '.join(fragments).split())
        date = DATE.search(copy)
        if date:
            title = copy[:date.start()].strip()
            if title:
                self.items[url] = {
                    'source_url': url,
                    'source_title': title,
                    'date': datetime.strptime(date[0], '%B %d, %Y').date().isoformat(),
                    'status': 'draft',
                }


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--input-html', type=Path)
    cli.add_argument('--output', type=Path, required=True)
    args = cli.parse_args()
    if args.input_html:
        payload = args.input_html.read_text(encoding='utf-8')
    else:
        with urlopen(SOURCE, timeout=20) as response:
            payload = response.read().decode('utf-8')
    parser = NewsLinks()
    parser.feed(payload)
    if not parser.items:
        raise SystemExit('Nenhuma notícia reconhecida na página oficial.')
    approved = json.loads(Path(__file__).with_name('approved.json').read_text(encoding='utf-8'))
    published_urls = {post['url'] for post in approved}
    leads = [item for url, item in parser.items.items() if url not in published_urls]
    args.output.write_text(json.dumps(leads, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{len(leads)} nova(s) pauta(s) para revisão.')


if __name__ == '__main__':
    main()
