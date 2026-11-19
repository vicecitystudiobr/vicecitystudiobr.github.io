import { describe, expect, it } from "vitest";
import { filterVideos, getWatchUrl, type Video } from "@/data/content";

const base = { description: "", thumbnail: "", duration: "1:00", publishedAt: "2026-01-01", demo: true };
const videos: Video[] = [
  { ...base, id: "a", title: "A", category: "Notícias" },
  { ...base, id: "b", title: "B", category: "Análises", youtubeId: "abc" },
  { ...base, id: "c", title: "C", category: "Shorts", youtubeId: "xyz" },
];

describe("conteúdo", () => {
  it("filtro por categoria mostra só os vídeos daquela categoria", () => {
    expect(filterVideos(videos, "Análises").map((v) => v.id)).toEqual(["b"]);
    expect(filterVideos(videos, "Todos")).toHaveLength(3);
  });

  it("link de assistir aponta para o YouTube", () => {
    expect(getWatchUrl(videos[1]!)).toBe("https://www.youtube.com/watch?v=abc");
    expect(getWatchUrl(videos[2]!)).toBe("https://www.youtube.com/shorts/xyz");
  });
});
