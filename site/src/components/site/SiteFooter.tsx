import emblem from "@/assets/vice-city-studio-emblem.webp";
import { SOCIAL_LINKS } from "@/data/content";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-night">
      <div className="neon-divider" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <img src={emblem} alt="" width={48} height={48} loading="lazy" className="size-12 rounded-full" />
          <p className="font-display text-sm font-black">Vice City Studio</p>
        </div>
        <ul className="flex gap-3">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-neon-pink hover:text-neon-pink hover:shadow-neon-pink"
              >
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <nav aria-label="Informações legais e contato" className="mx-auto flex flex-wrap justify-center gap-x-5 gap-y-2 px-4 pb-6 text-sm text-muted-foreground">
        <a href="/privacy.html">Privacidade</a>
        <a href="/terms.html">Termos de uso</a>
        <a href="/data-deletion.html">Exclusão de dados</a>
        <a href="/contact.html">Contato</a>
        <a href="/en/" lang="en">English</a>
      </nav>
      <p className="mx-auto max-w-3xl px-4 pb-10 text-center text-xs leading-relaxed text-muted-foreground">
        Vice City Studio é um projeto independente de fãs, sem vínculo com a Rockstar Games ou a Take-Two
        Interactive.
      </p>
    </footer>
  );
}
