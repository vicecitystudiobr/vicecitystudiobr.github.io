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
