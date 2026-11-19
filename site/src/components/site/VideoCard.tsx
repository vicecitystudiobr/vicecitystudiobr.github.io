import { ExternalLink } from "lucide-react";
import { getWatchUrl, type Video } from "@/data/content";
import { DemoBadge, Tag } from "./Tag";

export function VideoCard({ video }: { video: Video }) {
  const isShort = video.category === "Shorts";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card-gradient shadow-card transition-all hover:-translate-y-1 hover:border-neon-pink/60">
      <a href={getWatchUrl(video)} target="_blank" rel="noreferrer" className="relative block aspect-video overflow-hidden" tabIndex={-1} aria-hidden="true">
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded-md bg-night/85 px-2 py-0.5 text-xs font-bold">
          {isShort ? "Short · " : ""}
          {video.duration}
        </span>
        {video.demo && <DemoBadge className="absolute left-2 top-2" />}
      </a>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Tag label={video.category} className="self-start" />
        <h3 className="text-base font-bold leading-snug md:text-lg">{video.title}</h3>
        <a
          href={getWatchUrl(video)}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-neon-cyan hover:underline"
        >
          Assistir no YouTube <ExternalLink className="size-4" />
          <span className="sr-only">: {video.title}</span>
        </a>
      </div>
    </article>
  );
}
