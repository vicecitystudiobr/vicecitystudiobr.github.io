import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan">{eyebrow}</p>
        <h2 className="text-2xl font-black md:text-4xl">{title}</h2>
        <div className="neon-divider mt-3 w-16" />
      </div>
      {action}
    </div>
  );
}
