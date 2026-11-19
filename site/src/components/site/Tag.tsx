import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
  {
    variants: {
      tone: {
        cyan: "bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/40",
        pink: "bg-neon-pink/15 text-neon-pink ring-1 ring-neon-pink/40",
        purple: "bg-neon-purple/20 text-foreground ring-1 ring-neon-purple/60",
        sunset: "bg-sunset/15 text-sunset ring-1 ring-sunset/40",
        demo: "bg-background/80 text-muted-foreground ring-1 ring-border backdrop-blur",
      },
    },
    defaultVariants: { tone: "cyan" },
  },
);

const TONE_BY_LABEL: Record<string, NonNullable<VariantProps<typeof tagVariants>["tone"]>> = {
  Notícias: "cyan",
  Análises: "pink",
  Teorias: "purple",
  Shorts: "sunset",
  Oficial: "cyan",
  Análise: "pink",
  Rumor: "sunset",
};

export function Tag({ label, className }: { label: string; className?: string }) {
  return <span className={cn(tagVariants({ tone: TONE_BY_LABEL[label] ?? "cyan" }), className)}>{label}</span>;
}

export function DemoBadge({ className }: { className?: string }) {
  return <span className={cn(tagVariants({ tone: "demo" }), className)}>Demonstração</span>;
}
