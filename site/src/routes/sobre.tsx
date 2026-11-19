import { createFileRoute } from "@tanstack/react-router";
import skylineArt from "@/assets/vice-city-studio-skyline.jpg";
import { SocialIcon } from "@/components/site/SocialIcon";
import { SOCIAL_LINKS } from "@/data/content";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o estúdio — Vice City Studio" },
      { name: "description", content: "Conheça o Vice City Studio, estúdio independente de conteúdo sobre GTA VI, e siga no YouTube, TikTok e Instagram." },
      { property: "og:title", content: "Sobre o estúdio — Vice City Studio" },
      { property: "og:description", content: "Estúdio independente de conteúdo sobre GTA VI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-12 md:pt-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card-gradient p-6 shadow-card md:p-12">
        <div className="sunset-stripes pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gradient-neon opacity-30 blur-[2px]" />
        <img
          src={skylineArt}
          alt="Arte do Vice City Studio com skyline ao pôr do sol"
          width={1024}
          height={1024}
          className="relative mb-6 size-32 rounded-full shadow-neon-pink md:float-right md:mb-4 md:ml-8 md:size-56"
        />
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan">Sobre o estúdio</p>
        <h1 className="relative text-3xl font-black md:text-5xl">
          Feito por fãs, <span className="text-neon-gradient">para fãs.</span>
        </h1>
        <p className="relative mt-5 text-lg leading-relaxed text-foreground/90">
          O Vice City Studio é um estúdio independente que acompanha cada passo de GTA VI. Analisamos trailers
          quadro a quadro, reunimos as novidades oficiais, separamos rumores de fatos e damos espaço às melhores teorias
          da comunidade — sempre com o clima neon de Vice City.
        </p>
        <ul className="relative clear-both mt-8 grid gap-3 sm:grid-cols-3">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4 transition-all hover:border-neon-pink hover:shadow-neon-pink"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-gradient-neon text-primary-foreground">
                  <SocialIcon id={s.id} />
                </span>
                <span>
                  <span className="block font-bold">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
