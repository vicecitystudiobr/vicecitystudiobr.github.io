import { formatDateBR, type Post } from "@/data/content";
import { DemoBadge, Tag } from "./Tag";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:flex-row">
      <div className="relative aspect-video shrink-0 sm:aspect-auto sm:w-48 md:w-56">
        <img src={post.image} alt="" loading="lazy" width={1280} height={720} className="h-full w-full object-cover" />
        {post.demo && <DemoBadge className="absolute left-2 top-2" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {post.label && <Tag label={post.label} />}
          <time dateTime={post.date}>{formatDateBR(post.date)}</time>
        </div>
        <h3 className="text-base font-bold leading-snug md:text-lg">{post.title}</h3>
        <p className="text-sm text-muted-foreground">{post.summary}</p>
        <p className="mt-auto pt-1 text-xs text-muted-foreground">
          Fonte:{" "}
          <a href={post.source.url} target="_blank" rel="noreferrer" className="font-semibold text-neon-cyan hover:underline">
            {post.source.name}
          </a>
        </p>
      </div>
    </article>
  );
}
