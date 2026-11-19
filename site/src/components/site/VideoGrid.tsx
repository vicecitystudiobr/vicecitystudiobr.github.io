import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VIDEO_CATEGORIES, filterVideos, type Video, type VideoFilter } from "@/data/content";
import { VideoCard } from "./VideoCard";

const FILTERS: VideoFilter[] = ["Todos", ...VIDEO_CATEGORIES];

export function VideoGrid({ videos, limit }: { videos: Video[]; limit?: number }) {
  const [filter, setFilter] = useState<VideoFilter>("Todos");
  const list = filterVideos(videos, filter).slice(0, limit);

  return (
    <div>
      <div role="group" aria-label="Filtrar vídeos por categoria" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant="chip"
            size="sm"
            data-active={filter === f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="shrink-0 px-4"
          >
            {f}
          </Button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-muted-foreground">Nenhum vídeo nesta categoria ainda.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
