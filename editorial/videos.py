"""Write public metadata for the studio's recent YouTube uploads."""
import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen
from xml.etree import ElementTree

CHANNEL = 'https://www.youtube.com/@ViceCityStudio-BR'
CHANNEL_ID = re.compile(r'UC[A-Za-z0-9_-]{22}')
VIDEO_ID = re.compile(r'[A-Za-z0-9_-]{11}')
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015'}


def get(url):
    with urlopen(url, timeout=20) as response:
        return response.read(3_000_000)


def resolve_channel():
    html = get(CHANNEL).decode('utf-8')
    url = re.search(r'<link\b[^>]*rel="canonical"[^>]*href="https://www\.youtube\.com/channel/(UC[A-Za-z0-9_-]{22})"', html)
    if url:
        return url[1]
    external = re.search(r'"externalId":"(UC[A-Za-z0-9_-]{22})"', html)
    if external:
        return external[1]
    raise ValueError('O canal não informou seu ID. Configure YOUTUBE_CHANNEL_ID no repositório.')


def recent_videos(feed, channel_id):
    root = ElementTree.fromstring(feed)
    if root.findtext('yt:channelId', namespaces=NS) != channel_id:
        raise ValueError('O RSS não pertence ao canal consultado.')
    videos = {}
    for entry in root.findall('a:entry', NS):
        key = entry.findtext('yt:videoId', namespaces=NS)
        title = entry.findtext('a:title', namespaces=NS)
        date = entry.findtext('a:published', namespaces=NS)
        if not (key and VIDEO_ID.fullmatch(key) and title and date):
            raise ValueError('O RSS contém um vídeo sem metadados válidos.')
        datetime.fromisoformat(date.replace('Z', '+00:00'))
        videos[key] = {'id': key, 'title': title, 'published': date,
                       'url': f'https://www.youtube.com/watch?v={key}'}
    return sorted(videos.values(), key=lambda item: datetime.fromisoformat(
        item['published'].replace('Z', '+00:00')), reverse=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--channel-id')
    parser.add_argument('--input-xml', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    channel_id = args.channel_id or resolve_channel()
    if not CHANNEL_ID.fullmatch(channel_id):
        raise ValueError('ID do canal do YouTube inválido.')
    feed = args.input_xml.read_bytes() if args.input_xml else get(
        f'https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}')
    videos = recent_videos(feed, channel_id)
    data = {'channel': CHANNEL, 'videos': videos}
    args.output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{len(videos)} vídeo(s) no feed do canal.')


if __name__ == '__main__':
    main()
