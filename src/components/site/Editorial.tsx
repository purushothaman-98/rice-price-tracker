import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {intro ? <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</div> : null}
    </header>
  );
}

export function DemoBanner({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 border border-dashed border-turmeric bg-turmeric/15 px-3 py-2 text-xs leading-relaxed text-foreground",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>
        <strong className="font-bold uppercase tracking-wider">Demonstration data.</strong> Figures
        on this page are illustrative and awaiting connection to verified live feeds. Do not cite
        them.
      </span>
    </p>
  );
}

export function ComparabilityWarning({
  reasons,
  className,
}: {
  reasons: string[];
  className?: string;
}) {
  if (reasons.length === 0) return null;
  return (
    <div
      role="alert"
      className={cn("border-l-4 border-destructive bg-destructive/10 px-3 py-2", className)}
    >
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
        <AlertTriangle aria-hidden="true" className="size-3.5" /> Comparability warning
      </p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-xs leading-relaxed">
        {reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export function Citation({
  sourceTitle,
  publisher,
  date,
  className,
}: {
  sourceTitle: string;
  publisher: string;
  date: string;
  className?: string;
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      <span className="eyebrow mr-1">Source</span>
      <cite className="not-italic font-semibold text-foreground">{sourceTitle}</cite>, {publisher} ·{" "}
      <time dateTime={date}>{date}</time>
    </p>
  );
}

export function KolamRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("kolam-rule", className)} />;
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="my-6">
      <blockquote className="pull-quote">{children}</blockquote>
      {cite ? (
        <figcaption className="mt-2 pl-4 text-xs uppercase tracking-wider text-muted-foreground">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function StatBlock({
  value,
  label,
  sub,
  tone = "default",
}: {
  value: string;
  label: string;
  sub?: ReactNode;
  tone?: "default" | "up" | "down";
}) {
  return (
    <div className="border border-border bg-card p-4">
      <p className="eyebrow">{label}</p>
      <p
        className={cn(
          "tabular mt-1 text-3xl font-bold",
          tone === "up" && "text-destructive",
          tone === "down" && "text-paddy",
        )}
      >
        {value}
      </p>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}