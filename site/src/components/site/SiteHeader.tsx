import { Link } from "@tanstack/react-router";
import emblem from "@/assets/vice-city-studio-emblem.webp";
import { YOUTUBE_CHANNEL_URL } from "@/data/content";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "./SocialIcon";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/videos", label: "Vídeos" },
  { to: "/novidades", label: "Novidades" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Vice City Studio — início">
          <img src={emblem} alt="" width={44} height={44} className="size-10 rounded-full md:size-11" />
          <span className="hidden font-display text-sm font-black leading-tight sm:block">
            Vice City
            <span className="block text-neon-pink">Studio</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="ml-auto flex gap-1 overflow-x-auto md:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-muted data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="neon" size="sm" className="hidden rounded-full md:inline-flex">
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
            <SocialIcon id="youtube" className="size-4" /> YouTube
          </a>
        </Button>
      </div>
    </header>
  );
}
