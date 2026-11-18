'use strict';

const languageLink = document.querySelector('.language');
const translationUrl = languageLink?.href;

// The homepage sections share IDs across both languages.
languageLink?.addEventListener('click', () => {
  const destination = new URL(translationUrl);
  const anchor = window.location.hash;
  if (anchor && document.getElementById(anchor.slice(1))) {
    destination.hash = anchor;
  }
  languageLink.href = destination.href;
});

const videoList = document.querySelector('[data-video-list]');

if (videoList) {
  showRecentVideos(videoList).catch(() => {
    // Keep the direct channel link available when the feed is unavailable.
  });
}

async function showRecentVideos(list) {
  const endpoint = 'https://raw.githubusercontent.com/vicecitystudiobr/vicecitystudiobr.github.io/video-feed/videos.json';
  const response = await fetch(endpoint, { credentials: 'omit', cache: 'no-cache' });
  if (!response.ok) return;

  const { videos } = await response.json();
  if (!Array.isArray(videos)) return;

  const locale = document.documentElement.lang;
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'America/Sao_Paulo' });

  for (const video of videos) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(video.id) || typeof video.title !== 'string') continue;
    const date = new Date(video.published);
    if (Number.isNaN(date.getTime())) continue;

    const item = document.createElement('li');
    const link = document.createElement('a');
    const time = document.createElement('time');
    link.href = 'https://www.youtube.com/watch?v=' + video.id;
    link.textContent = video.title;
    time.dateTime = date.toISOString();
    time.textContent = dateFormat.format(date);
    item.append(time, link);
    list.append(item);
  }

  if (list.childElementCount) list.hidden = false;
}
