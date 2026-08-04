import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calculator,
  ExternalLink,
  FileCheck2,
  Newspaper,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { KolamRule, SectionHeading } from "@/components/site/Editorial";
import { sourceById } from "@/data/publicRecord";
import {
  derivedFindings,
  evidenceYearSummaries,
  recentEvidenceItems,
  recentEvidenceSourceById,
  recentEvidenceSources,
} from "@/data/recentEvidence";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence Archive 2019–2026 — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "A year-by-year evidence archive of Tamil Nadu rice prices, paddy procurement, crop conditions, trade policy and public intervention from 2019 to 2026.",
      },
      { property: "og:title", content: "Tamil Nadu Rice Evidence Archive, 2019–2026" },
      {
        property: "og:description",
        content:
          "Official releases, reported government statements, market reporting, calculations and limitations are kept visibly separate.",
      },
    ],
  }),
  component: EvidenceArchive,
});

function sourceDetails(sourceId: string) {
  const recent = recentEvidenceSourceById[sourceId];
  if (recent) {
    return {
      title: recent.title,
      publisher: recent.publisher,
      date: recent.publishedDate,
      url: recent.url,
      kind: recent.kind.replaceAll("-", " "),
    };
  }

  const official = sourceById[sourceId];
  if (official) {
    return {
      title: official.title,
      publisher: official.publisher,
      date: null,
      url: official.url,
      kind: official.kind.replaceAll("-", " "),
    };
  }

  return null;
}

function evidenceTone(type: (typeof recentEvidenceItems)[number]["evidenceType"]) {
  if (type === "Official policy") return "border-paddy bg-paddy/10 text-paddy";
  if (type === "Official statement reported") return "border-turmeric bg-turmeric/15 text-foreground";
  return "border-maroon bg-maroon/5 text-maroon";
}

function EvidenceArchive() {
  const sourceCount = recentEvidenceSources.length;
  const officialCount = recentEvidenceSources.filter(
    (source) => source.kind === "official-release" || source.kind === "official-notification",
  ).length;
  const reportedOfficialCount = recentEvidenceSources.filter(
    (source) => source.kind === "reported-official-statement",
  ).length;
  const marketCount = recentEvidenceSources.filter(
    (source) => source.kind === "reported-market",
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-maroon underline decoration-maroon/40 underline-offset-4 hover:decoration-maroon"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to the public record
      </Link>

      <section className="mt-4 border-b border-border pb-8" aria-labelledby="evidence-heading">
        <div className="inline-flex items-center gap-2 border border-paddy bg-paddy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-paddy">
          <FileCheck2 className="size-4" aria-hidden="true" /> Evidence archive
        </div>
        <p className="eyebrow mt-5">Tamil Nadu rice system · 2019–2026</p>
        <h1
          id="evidence-heading"
          className="mt-2 max-w-5xl text-4xl font-extrabold leading-[1.02] sm:text-6xl"
        >
          Eight years of policy, procurement, crop shocks and market evidence.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          This archive does not turn every newspaper quotation into an official price. It records
          what each source actually supports, separates fact from interpretation, and preserves the
          limits of local quotations, industry claims, forecasts and in-progress government data.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="border-l-4 border-maroon bg-card p-4">
            <p className="eyebrow">Source records</p>
            <p className="mt-2 text-3xl font-extrabold">{sourceCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">Directly linked documents and articles</p>
          </article>
          <article className="border-l-4 border-paddy bg-card p-4">
            <p className="eyebrow">Official releases</p>
            <p className="mt-2 text-3xl font-extrabold">{officialCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">PIB, DGFT and official notifications</p>
          </article>
          <article className="border-l-4 border-turmeric bg-card p-4">
            <p className="eyebrow">Reported official statements</p>
            <p className="mt-2 text-3xl font-extrabold">{reportedOfficialCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">Government figures carried by the press</p>
          </article>
          <article className="border-l-4 border-maroon bg-card p-4">
            <p className="eyebrow">Market reports</p>
            <p className="mt-2 text-3xl font-extrabold">{marketCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">Local quotations, arrivals and actor claims</p>
          </article>
        </div>
      </section>

      <section className="py-9" aria-labelledby="year-map">
        <SectionHeading
          id="year-map"
          eyebrow="Evidence map"
          title="The story changes from year to year"
          intro="Use these year cards to jump into the detailed record. Each summary is an interpretation of the cited evidence, not a replacement for it."
        />

        <nav aria-label="Evidence archive years" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {evidenceYearSummaries.map((year) => (
            <a
              key={year.year}
              href={`#year-${year.year}`}
              className="group border border-border bg-card p-4 hover:border-maroon hover:bg-secondary"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-3xl font-extrabold text-maroon">{year.year}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {year.evidenceCount} {year.evidenceCount === 1 ? "analysis" : "analyses"}
                </span>
              </div>
              <h2 className="mt-3 text-base font-bold group-hover:text-maroon">{year.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{year.summary}</p>
            </a>
          ))}
        </nav>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="archive-record">
        <SectionHeading
          id="archive-record"
          eyebrow="Year-by-year archive"
          title="What happened, what it may mean, and what remains unknown"
          intro="Official policy, reported government statements and market reporting carry different evidentiary weight. Their labels remain visible throughout."
        />

        <div className="mt-7 space-y-12">
          {evidenceYearSummaries.map((yearSummary) => {
            const items = recentEvidenceItems.filter((item) => item.year === yearSummary.year);
            return (
              <section
                key={yearSummary.year}
                id={`year-${yearSummary.year}`}
                className="scroll-mt-6 border-t-4 border-double border-maroon pt-5"
                aria-labelledby={`heading-${yearSummary.year}`}
              >
                <div className="grid gap-3 md:grid-cols-[9rem_minmax(0,1fr)] md:items-start">
                  <div>
                    <p className="text-5xl font-extrabold text-maroon">{yearSummary.year}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {items.length} evidence {items.length === 1 ? "record" : "records"}
                    </p>
                  </div>
                  <div>
                    <h2 id={`heading-${yearSummary.year}`} className="text-2xl font-extrabold">
                      {yearSummary.headline}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {yearSummary.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    <article key={item.id} className="border border-border bg-card p-4 sm:p-5">
                      <div className="grid gap-4 lg:grid-cols-[11rem_minmax(0,1fr)]">
                        <div>
                          <p className="eyebrow">{item.date}</p>
                          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {item.theme}
                          </p>
                          <span
                            className={`mt-3 inline-flex border px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${evidenceTone(item.evidenceType)}`}
                          >
                            {item.evidenceType}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-extrabold">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed">{item.whatIsSupported}</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.figures.map((figure) => (
                              <span
                                key={figure}
                                className="border border-border bg-secondary px-2 py-1 text-xs font-bold"
                              >
                                {figure}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="border-l-4 border-paddy bg-paddy/10 p-3">
                              <p className="eyebrow">Interpretation</p>
                              <p className="mt-1 text-sm leading-relaxed">{item.interpretation}</p>
                            </div>
                            <div className="border-l-4 border-turmeric bg-turmeric/10 p-3">
                              <p className="eyebrow">Limitation</p>
                              <p className="mt-1 text-sm leading-relaxed">{item.limitation}</p>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-2 md:grid-cols-2">
                            {item.sourceIds.map((sourceId) => {
                              const source = sourceDetails(sourceId);
                              if (!source) return null;
                              return (
                                <a
                                  key={sourceId}
                                  href={source.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group border border-border bg-background p-3 hover:border-maroon"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="eyebrow">
                                        {source.kind}{source.date ? ` · ${source.date}` : ""}
                                      </p>
                                      <p className="mt-1 text-sm font-bold group-hover:text-maroon">
                                        {source.title}
                                      </p>
                                      <p className="mt-1 text-xs text-muted-foreground">{source.publisher}</p>
                                    </div>
                                    <ExternalLink className="size-4 shrink-0 text-maroon" aria-hidden="true" />
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="archive-analysis">
        <SectionHeading
          id="archive-analysis"
          eyebrow="Cross-year analysis"
          title="What the combined evidence supports"
          intro="These findings are calculations or bounded interpretations. Every card states the arithmetic or evidence basis and the caution required."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {derivedFindings.map((finding) => (
            <article key={finding.title} className="border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{finding.confidence} confidence</p>
                  <h3 className="mt-1 text-lg font-extrabold">{finding.title}</h3>
                </div>
                {finding.calculation ? (
                  <Calculator className="size-5 shrink-0 text-maroon" aria-hidden="true" />
                ) : (
                  <TrendingUp className="size-5 shrink-0 text-maroon" aria-hidden="true" />
                )}
              </div>
              <p className="tabular mt-4 text-3xl font-extrabold text-maroon">{finding.value}</p>
              {finding.calculation ? (
                <p className="mt-2 border-l-2 border-maroon pl-3 font-mono text-xs leading-relaxed text-muted-foreground">
                  {finding.calculation}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed">{finding.finding}</p>
              <div className="mt-4 flex gap-2 border-l-4 border-turmeric bg-turmeric/10 p-3">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-maroon" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-muted-foreground">{finding.caution}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {finding.sourceIds.map((sourceId) => {
                  const source = sourceDetails(sourceId);
                  if (!source) return null;
                  return (
                    <a
                      key={sourceId}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-maroon underline decoration-maroon/40 underline-offset-2 hover:decoration-maroon"
                    >
                      {source.publisher} <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="source-index">
        <SectionHeading
          id="source-index"
          eyebrow="Source index"
          title="All linked evidence, ordered by year"
          intro="This is a curated archive of major relevant milestones, not an exhaustive database of every article published. Official documents are preferred where available."
        />

        <div className="mt-6 space-y-7">
          {evidenceYearSummaries.map((year) => {
            const yearSources = recentEvidenceSources.filter((source) => source.year === year.year);
            return (
              <section key={year.year} aria-labelledby={`sources-${year.year}`}>
                <h2 id={`sources-${year.year}`} className="flex items-center gap-2 text-xl font-extrabold">
                  <Newspaper className="size-5 text-maroon" aria-hidden="true" /> {year.year}
                </h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {yearSources.map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group border border-border bg-card p-4 hover:border-maroon"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="eyebrow">
                            {source.kind.replaceAll("-", " ")} · {source.publishedDate}
                          </p>
                          <h3 className="mt-1 font-bold group-hover:text-maroon">{source.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{source.publisher}</p>
                        </div>
                        <ExternalLink className="mt-1 size-4 shrink-0 text-maroon" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.note}</p>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
