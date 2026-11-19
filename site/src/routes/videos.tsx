import { RecentChannelVideos } from "@/components/site/RecentChannelVideos";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "@/components/site/VideoGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VIDEOS } from "@/data/content";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Vídeos sobre GTA VI — Vice City Studio" },
      { name: "description", content: "Notícias, análises de trailers, teorias e shorts sobre GTA VI. Filtre por categoria e assista no YouTube." },
      { property: "og:title", content: "Vídeos sobre GTA VI — Vice City Studio" },
      { property: "og:description", content: "Notícias, análises, teorias e shorts sobre GTA VI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
      <SectionHeading eyebrow="Canal" title="Todos os vídeos" />
      <RecentChannelVideos />
      <VideoGrid videos={VIDEOS} />
    </section>
  );
}
