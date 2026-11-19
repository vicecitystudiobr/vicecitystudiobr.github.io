import { useQuery } from "@tanstack/react-query";

const feedUrl = "https://raw.githubusercontent.com/vicecitystudiobr/vicecitystudiobr.github.io/video-feed/videos.json";

type FeedVideo = { id: string; title: string; published: string };

function isFeedVideo(value: unknown): value is FeedVideo {
  if (typeof value !== "object" || value === null) return false;
  const video = value as Partial<FeedVideo>;
  return typeof video.id === "string" && /^[A-Za-z0-9_-]{11}$/.test(video.id)
    && typeof video.title === "string" && typeof video.published === "string"
    && !Number.isNaN(Date.parse(video.published));
}

export function RecentChannelVideos() {
  const { data } = useQuery({
    queryKey: ["channel-videos"],
    queryFn: async ({ signal }) => {
      const response = await fetch(feedUrl, { credentials: "omit", cache: "no-cache", signal });
      if (!response.ok) throw new Error("Feed do canal indisponível");
      const { videos } = await response.json();
      return Array.isArray(videos) ? videos.filter(isFeedVideo) : [];
    },
    retry: false,
  });

  if (!data?.length) return null;

  return (
    <section className="mb-8 rounded-xl border border-border p-5" aria-label="Publicados no canal">
      <h3 className="mb-3 font-bold">Publicados no canal</h3>
      <ul className="space-y-2">
        {data.map((video) => (
          <li key={video.id}>
            <a className="text-neon-cyan hover:underline" href={`https://www.youtube.com/watch?v=${video.id}`}>
              {video.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
