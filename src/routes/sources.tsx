import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { sources, corrections, methodology } from "@/data/sources";
import { ConfidenceBadge, ConfidenceLegend } from "@/components/site/ConfidenceBadge";
import { DemoBanner, KolamRule, SectionHeading } from "@/components/site/Editorial";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Source Library & Methodology — Rice Price Tracker" },
      {
        name: "description",
        content:
          "Every dataset, order, parliamentary answer and report behind this site, with publication date, geography, confidence level, corrections history and methodology.",
      },
      { property: "og:title", content: "Source Library & Methodology" },
      {
        property: "og:description",
        content: "Searchable sources with confidence levels, plus our corrections log and data standards.",
      },
    ],
  }),
  component: SourceLibrary,
});

function SourceLibrary() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");

  const filtered = useMemo(
    () =>
      sources.filter((s) => {
        if (type !== "all" && s.sourceType !== type) return false;
        const hay = `${s.title} ${s.publisher} ${s.summary} ${s.geography}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      }),
    [q, type],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 09"
        title="Source library"
        intro="Nothing on this site should be believed because we said it. Each entry records who published it, when, for which geography, and how much weight it can carry."
      />

      <form
        className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <div>
          <label htmlFor="q" className="eyebrow">
            Search sources
          </label>
          <input
            id="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="procurement, GST, Cauvery…"
            className="mt-1 min-h-11 w-full border border-input bg-card px-3 text-sm placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label htmlFor="type" className="eyebrow">
            Source type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 min-h-11 w-full border border-input bg-card px-2 text-sm"
          >
            {[
              ["all", "All types"],
              ["government-dataset", "Government dataset"],
              ["parliamentary-answer", "Parliamentary answer"],
              ["press-release", "Press release"],
              ["state-order", "Order or notification"],
              ["news-report", "News report"],
              ["site-estimate", "Site estimate"],
            ].map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </form>

      <ConfidenceLegend className="mt-4" />

      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {filtered.map((s) => (
          <li key={s.id} className="border border-border bg-card p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
              <h2 className="min-w-0 text-base font-bold">{s.title}</h2>
              <ConfidenceBadge level={s.confidence} short className="shrink-0" />
            </div>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {s.publisher} · {s.sourceType.replace("-", " ")}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{s.summary}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <div>
                <dt className="inline font-bold">Published: </dt>
                <dd className="inline">
                  <time dateTime={s.publicationDate}>{s.publicationDate}</time>
                </dd>
              </div>
              {s.eventDate ? (
                <div>
                  <dt className="inline font-bold">Event: </dt>
                  <dd className="inline">
                    <time dateTime={s.eventDate}>{s.eventDate}</time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="inline font-bold">Geography: </dt>
                <dd className="inline">{s.geography}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Record ID: </dt>
                <dd className="inline font-mono">{s.id}</dd>
              </div>
            </dl>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="text-sm text-muted-foreground">No sources match that search.</li>
        ) : null}
      </ul>

      <KolamRule className="my-8" />

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Standards" title="Methodology" />
          <dl className="mt-4 space-y-3">
            {methodology.map((m) => (
              <div key={m.heading} className="border-l-4 border-maroon bg-card p-3">
                <dt className="text-sm font-bold">{m.heading}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionHeading eyebrow="Accountability" title="Corrections history" />
          <ol className="mt-4 space-y-3">
            {corrections.map((c) => (
              <li key={c.id} className="border border-border bg-card p-3">
                <p className="tabular text-xs uppercase tracking-wider text-muted-foreground">
                  <time dateTime={c.date}>{c.date}</time>
                </p>
                <p className="mt-1 text-sm leading-relaxed">{c.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}