import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { YouTubePlayer } from "@/components/site/YouTubePlayer";

const video = {
  id: "x", title: "Teste", description: "", category: "Análises" as const, thumbnail: "/t.jpg",
  youtubeId: "abc123", duration: "1:00", publishedAt: "2026-01-01", demo: true,
};

describe("player do YouTube", () => {
  it("só carrega o player depois do clique", () => {
    const { container } = render(<YouTubePlayer video={video} />);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /reproduzir/i }));
    expect(container.querySelector("iframe")?.getAttribute("src")).toContain("abc123");
  });
});
