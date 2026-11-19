import { RecentChannelVideos } from "@/components/site/RecentChannelVideos";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "@/components/site/VideoGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VIDEOS } from "@/data/content";

export const Route = createFileRoute("/videos")({
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
