import { useState } from "react";
import { Play } from "lucide-react";
import { getWatchUrl, type Video } from "@/data/content";

/**
 * Player leve: mostra só a miniatura e carrega o iframe do YouTube depois do clique.
 */
export function YouTubePlayer({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);

  if (open && video.youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-night shadow-neon-pink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (open && !video.youtubeId) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">Este é um vídeo de demonstração. Assista aos vídeos no canal.</p>
        <a href={getWatchUrl(video)} target="_blank" rel="noreferrer" className="font-bold text-neon-cyan underline">
          Abrir o canal no YouTube
        </a>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Reproduzir: ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl shadow-card ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <img
        src={video.thumbnail}
        alt=""
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-neon text-primary-foreground shadow-neon-pink transition-transform group-hover:scale-110 md:size-24">
        <Play className="ml-1 size-8 fill-current md:size-10" />
      </span>
      <span className="absolute bottom-3 right-3 rounded-md bg-night/85 px-2 py-1 text-xs font-bold text-foreground">
        {video.duration}
      </span>
    </button>
  );
}
