import approvedNews from "../../../editorial/approved.json";
/**
 * Fonte central de conteúdo do Vice City Studio.
 * Para atualizar o site, edite apenas este arquivo: links das redes, vídeos e novidades.
 * Itens com `demo: true` são exemplos de demonstração e exibem o selo "Demonstração".
 */
import thumbBoulevard from "@/assets/thumb-boulevard.jpg";
import thumbAnalysis from "@/assets/thumb-analysis.jpg";
import thumbEverglades from "@/assets/thumb-everglades.jpg";
import thumbBeach from "@/assets/thumb-beach.jpg";
import skyline from "@/assets/skyline-sunset.jpg";

/* ---------- Redes sociais ---------- */

export type SocialLink = { id: "youtube" | "tiktok" | "instagram"; label: string; url: string; handle: string; demo: boolean };

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@ViceCityStudio-BR", handle: "@ViceCityStudio-BR", demo: false },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@vice.city.studio", handle: "@vice.city.studio", demo: false },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/vicecitystudiobr/", handle: "@vicecitystudiobr", demo: false },
];

export const YOUTUBE_CHANNEL_URL = SOCIAL_LINKS.find((s) => s.id === "youtube")!.url;

/* ---------- Vídeos ---------- */

export const VIDEO_CATEGORIES = ["Notícias", "Análises", "Teorias", "Shorts"] as const;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
export type VideoFilter = VideoCategory | "Todos";

export type Video = {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  thumbnail: string;
  /** ID do vídeo no YouTube (o trecho depois de "v=" no link). Vazio = abre o canal. */
  youtubeId?: string;
  duration: string;
  publishedAt: string; // AAAA-MM-DD
  featured?: boolean;
  demo: boolean;
};

export const VIDEOS: Video[] = [
  {
    id: "trailer-quadro-a-quadro",
    title: "Trailer de GTA VI quadro a quadro: tudo o que você não viu",
    description:
      "Pausamos cada cena do trailer para encontrar placas, carros, bairros e pistas escondidas sobre o mapa de Leonida.",
    category: "Análises",
    thumbnail: thumbBoulevard,
    youtubeId: "QdBZY2fkU-0",
    duration: "18:42",
    publishedAt: "2026-11-14",
    featured: true,
    demo: true,
  },
  {
    id: "noticias-semana",
    title: "Resumo da semana: o que mudou em GTA VI",
    description: "As principais novidades oficiais e o que a comunidade descobriu nos últimos dias.",
    category: "Notícias",
    thumbnail: thumbBeach,
    duration: "09:15",
    publishedAt: "2026-11-12",
    demo: true,
  },
  {
    id: "teoria-everglades",
    title: "A teoria do pântano: o que se esconde além de Vice City?",
    description: "Juntamos pistas sobre os pântanos e a área rural de Leonida.",
    category: "Teorias",
    thumbnail: thumbEverglades,
    duration: "14:03",
    publishedAt: "2026-11-09",
    demo: true,
  },
  {
    id: "analise-personagens",
    title: "Lucia e Jason: análise dos protagonistas",
    description: "O que os trailers revelam sobre a história e a dinâmica da dupla.",
    category: "Análises",
    thumbnail: thumbAnalysis,
    duration: "16:27",
    publishedAt: "2026-11-06",
    demo: true,
  },
  {
    id: "short-carro-escondido",
    title: "O carro escondido no segundo 47",
    description: "Um detalhe rápido que quase ninguém percebeu.",
    category: "Shorts",
    thumbnail: thumbBoulevard,
    duration: "0:45",
    publishedAt: "2026-11-05",
    demo: true,
  },
  {
    id: "noticias-data",
    title: "Data de lançamento: o que é oficial até agora",
    description: "Separamos o que foi confirmado pela Rockstar do que ainda é especulação.",
    category: "Notícias",
    thumbnail: thumbAnalysis,
    duration: "07:58",
    publishedAt: "2026-11-02",
    demo: true,
  },
  {
    id: "teoria-mapa",
    title: "Teoria: o mapa é maior do que parece",
    description: "Comparamos o horizonte dos trailers com mapas reais da Flórida.",
    category: "Teorias",
    thumbnail: thumbBeach,
    duration: "12:31",
    publishedAt: "2026-10-29",
    demo: true,
  },
  {
    id: "short-praia",
    title: "Ocean Beach em 30 segundos",
    description: "A praia mais famosa de Vice City em um corte rápido.",
    category: "Shorts",
    thumbnail: thumbEverglades,
    duration: "0:30",
    publishedAt: "2026-10-27",
    demo: true,
  },
];

export function getFeaturedVideo(videos: Video[] = VIDEOS): Video {
  return videos.find((v) => v.featured) ?? videos[0]!;
}

export function filterVideos(videos: Video[], filter: VideoFilter): Video[] {
  return filter === "Todos" ? videos : videos.filter((v) => v.category === filter);
}

export function getWatchUrl(video: Video): string {
  return video.youtubeId
    ? video.category === "Shorts"
      ? `https://www.youtube.com/shorts/${video.youtubeId}`
      : `https://www.youtube.com/watch?v=${video.youtubeId}`
    : YOUTUBE_CHANNEL_URL;
}

/* ---------- Novidades ---------- */

export type PostLabel = "Oficial" | "Análise" | "Rumor";

export type Post = {
  id: string;
  title: string;
  summary: string;
  date: string; // AAAA-MM-DD
  image: string;
  source: { name: string; url: string };
  label?: PostLabel;
  demo: boolean;
};

export const POSTS: Post[] = [
  ...approvedNews.flatMap((entry): Post[] => {
    const [title, summary] = entry.pt;
    if (!title || !summary) return [];
    return [{
      id: entry.url.split("/").pop() || entry.url,
      title,
      summary,
      date: entry.date,
      label: "Oficial",
      image: skyline,
      source: { name: "Rockstar Newswire", url: entry.url },
      demo: false,
    }];
  }),
  {
    id: "novo-trailer",
    title: "Rockstar divulga novas imagens de Leonida",
    summary: "Capturas oficiais mostram a orla de Vice City ao anoitecer e novos veículos.",
    date: "2026-11-15",
    image: skyline,
    source: { name: "Rockstar Newswire", url: "https://www.rockstargames.com/newswire" },
    label: "Oficial",
    demo: true,
  },
  {
    id: "analise-clima",
    title: "Clima dinâmico: o que as cenas de chuva indicam",
    summary: "Reflexos no asfalto e tempestades sugerem um sistema de clima mais detalhado.",
    date: "2026-11-11",
    image: thumbBoulevard,
    source: { name: "Vice City Studio", url: "https://www.youtube.com/" },
    label: "Análise",
    demo: true,
  },
  {
    id: "rumor-online",
    title: "Rumor: modo online teria cidade compartilhada desde o lançamento",
    summary: "Informação circula em fóruns, sem confirmação oficial até o momento.",
    date: "2026-11-08",
    image: thumbBeach,
    source: { name: "Fóruns da comunidade", url: "https://www.reddit.com/r/GTA6/" },
    label: "Rumor",
    demo: true,
  },
  {
    id: "analise-fauna",
    title: "Jacarés, flamingos e a fauna de Leonida",
    summary: "Listamos os animais vistos nos trailers e onde eles aparecem no mapa.",
    date: "2026-11-03",
    image: thumbEverglades,
    source: { name: "Vice City Studio", url: "https://www.youtube.com/" },
    label: "Análise",
    demo: true,
  },
];

export function formatDateBR(iso: string): string {
  const [y = 1970, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
