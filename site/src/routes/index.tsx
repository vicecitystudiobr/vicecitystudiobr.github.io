import { RecentChannelVideos } from "@/components/site/RecentChannelVideos";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import banner from "@/assets/vice-city-studio-banner.jpg";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/site/SocialIcon";
import { YouTubePlayer } from "@/components/site/YouTubePlayer";
import { VideoGrid } from "@/components/site/VideoGrid";
import { PostCard } from "@/components/site/PostCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DemoBadge, Tag } from "@/components/site/Tag";
import { POSTS, VIDEOS, YOUTUBE_CHANNEL_URL, formatDateBR, getFeaturedVideo, getWatchUrl } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vice City Studio — O universo de GTA VI, detalhe por detalhe" },
      { name: "description", content: "Novidades, análises de trailers e teorias sobre Vice City. Assista aos vídeos do estúdio no YouTube." },
      { property: "og:title", content: "Vice City Studio — O universo de GTA VI, detalhe por detalhe" },
      { property: "og:description", content: "Novidades, análises de trailers e teorias sobre Vice City." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = getFeaturedVideo();
  const latest = VIDEOS.filter((v) => v.id !== featured.id);

  return (
    <>
      {/* Abertura */}
      <section className="relative isolate overflow-hidden">
        <div className="relative aspect-[16/9] max-h-[62vh] w-full overflow-hidden md:aspect-auto md:h-[min(62vh,620px)]">
          <img
            src={banner}
            alt="Vice City Studio: skyline ao pôr do sol com palmeiras, carro e reflexos neon"
            width={1672}
            height={941}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-4 pt-2 md:-mt-6">
          <h1 className="animate-float-up max-w-4xl text-3xl font-black leading-[1.08] text-glow-pink md:text-5xl lg:text-6xl">
            O universo de GTA VI, <span className="text-neon-gradient">detalhe por detalhe.</span>
          </h1>
          <p className="animate-float-up mt-4 max-w-xl text-lg font-medium text-foreground/90 [animation-delay:100ms] md:text-xl">
            Novidades, análises de trailers e teorias sobre Vice City.
          </p>
          <div className="animate-float-up mt-6 flex flex-col gap-3 [animation-delay:200ms] sm:flex-row">
            <Button asChild variant="neon" size="xl">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
                <SocialIcon id="youtube" /> Assistir no YouTube
              </a>
            </Button>
            <Button asChild variant="neonOutline" size="xl">
              <Link to="/videos">
                Explorar vídeos <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vídeo em destaque */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16" aria-labelledby="destaque">
        <SectionHeading eyebrow="Em destaque" title="Vídeo da semana" />
        <div className="grid items-center gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <YouTubePlayer video={featured} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag label={featured.category} />
              {featured.demo && <DemoBadge />}
              <span className="text-xs text-muted-foreground">{formatDateBR(featured.publishedAt)}</span>
            </div>
            <h3 id="destaque" className="text-2xl font-black leading-tight md:text-3xl">
              {featured.title}
            </h3>
            <p className="text-muted-foreground">{featured.description}</p>
            {featured.demo && (
              <p className="text-xs text-muted-foreground">
                Exemplo: o player usa o trailer oficial até o link do vídeo real ser adicionado.
              </p>
            )}
            <Button asChild variant="neonOutline" size="lg" className="self-start rounded-full">
              <a href={getWatchUrl(featured)} target="_blank" rel="noreferrer">
                <SocialIcon id="youtube" className="size-4" /> Ver no YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Últimos vídeos */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Canal"
          title="Últimos vídeos"
          action={
            <Link to="/videos" className="inline-flex items-center gap-1 text-sm font-bold text-neon-cyan hover:underline">
              Ver todos <ArrowRight className="size-4" />
            </Link>
          }
        />
        <RecentChannelVideos />
        <VideoGrid videos={latest} limit={6} />
      </section>

      {/* Novidades */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Radar Vice City"
          title="Novidades"
          action={
            <Link to="/novidades" className="inline-flex items-center gap-1 text-sm font-bold text-neon-cyan hover:underline">
              Todas as novidades <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {POSTS.slice(0, 4).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
