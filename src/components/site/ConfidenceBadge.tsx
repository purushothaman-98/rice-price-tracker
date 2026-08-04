import { cn } from "@/lib/utils";
import type { Confidence } from "@/data/types";
import { confidenceLabel } from "@/data/types";

const styles: Record<Confidence, string> = {
  official: "bg-paddy text-paddy-foreground border-paddy",
  reported: "bg-turmeric text-turmeric-foreground border-turmeric",
  estimated: "bg-secondary text-secondary-foreground border-border",
  unavailable: "bg-muted text-muted-foreground border-dashed border-muted-foreground/50",
};

export function ConfidenceBadge({
  level,
  className,
  short,
}: {
  level: Confidence;
  className?: string;
  short?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]",
        styles[level],
        className,
      )}
      title={confidenceLabel[level]}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />
      {short ? level : confidenceLabel[level]}
    </span>
  );
}

export function ConfidenceLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="eyebrow">Confidence key</span>
      {(["official", "reported", "estimated", "unavailable"] as Confidence[]).map((c) => (
        <ConfidenceBadge key={c} level={c} />
      ))}
    </div>
  );
}