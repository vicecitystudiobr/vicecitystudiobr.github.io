import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "@/components/site/PostCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { POSTS } from "@/data/content";

export const Route = createFileRoute("/novidades")({
  head: () => ({
    meta: [
      { title: "Novidades de GTA VI — Vice City Studio" },
      { name: "description", content: "Posts curtos sobre GTA VI, identificados como Oficial, Análise ou Rumor, sempre com a fonte." },
      { property: "og:title", content: "Novidades de GTA VI — Vice City Studio" },
      { property: "og:description", content: "Oficial, análise ou rumor: as novidades de GTA VI com a fonte." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-12 md:pt-16">
      <SectionHeading eyebrow="Radar Vice City" title="Novidades" />
      <p className="mb-8 max-w-2xl text-muted-foreground">
        Cada post indica se a informação é <strong className="text-neon-cyan">Oficial</strong>, uma{" "}
        <strong className="text-neon-pink">Análise</strong> do estúdio ou um{" "}
        <strong className="text-sunset">Rumor</strong> ainda sem confirmação.
      </p>
      <div className="flex flex-col gap-5">
        {POSTS.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
