import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  ExternalLink,
  FileCheck2,
  Landmark,
  Newspaper,
  Scale,
  ShieldAlert,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { KolamRule, SectionHeading } from "@/components/site/Editorial";
import {
  policyTimeline,
  procurementPublicRecord,
  retailPublicRecord,
  sourceById,
  sources,
  type PublicRecordSource,
} from "@/data/publicRecord";
import {
  derivedFindings,
  recentEvidenceItems,
  recentEvidenceSourceById,
  recentEvidenceSources,
  type RecentEvidenceSource,
} from "@/data/recentEvidence";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tamil Nadu Rice Prices, 2014–Present — Rice Price Tracker" },
      {
        name: "description",
        content:
          "A source-linked public record of Tamil Nadu retail rice prices, paddy procurement, recent market evidence, PDS policy, tax changes and government interventions from 2014 onward.",
      },
      {
        property: "og:title",
        content: "Tamil Nadu Rice Prices, 2014–Present",
      },
      {
        property: "og:description",
        content:
          "Official observations, recent press evidence and derived findings are separated by source type, calculation and limitation.",
      },
    ],
  }),
  component: Home,
});

const loadedRetail = retailPublicRecord.filter(
  (record): record is (typeof retailPublicRecord)[number] & { value: number } => record.value !== null,
);
const maxRetail = Math.max(...loadedRetail.map((record) => record.value));
const maxProcurement = Math.max(...procurementPublicRecord.map((record) => record.lakhTonnes));
const lowestLoaded = loadedRetail.reduce((lowest, point) =>
  point.value < lowest.value ? point : lowest,
);
const highestLoaded = loadedRetail.reduce((highest, point) =>
  point.value > highest.value ? point : highest,
);

function SourceLink({ source, compact = false }: { source: PublicRecordSource; compact?: boolean }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-1 font-semibold text-maroon underline decoration-maroon/40 underline-offset-2 hover:decoration-maroon"
          : "inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
      }
    >
      {compact ? source.publisher : "Open official source"}
      <ExternalLink className={compact ? "size-3" : "size-4"} aria-hidden="true" />
    </a>
  );
}

function RecentSourceLink({ source, compact = false }: { source: RecentEvidenceSource; compact?: boolean }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-1 font-semibold text-maroon underline decoration-maroon/40 underline-offset-2 hover:decoration-maroon"
          : "inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
      }
    >
      {compact ? source.publisher : "Open source"}
      <ExternalLink className={compact ? "size-3" : "size-4"} aria-hidden="true" />
    </a>
  );
}

function SourceReference({ sourceId }: { sourceId: string }) {
  const recent = recentEvidenceSourceById[sourceId];
  if (recent) return <RecentSourceLink source={recent} compact />;

  const official = sourceById[sourceId];
  if (official) return <SourceLink source={official} compact />;

  return null;
}

function evidenceTone(type: (typeof recentEvidenceItems)[number]["evidenceType"]) {
  if (type === "Official policy") return "border-paddy bg-paddy/10 text-paddy";
  if (type === "Official statement reported") return "border-turmeric bg-turmeric/15 text-foreground";
  return "border-maroon bg-maroon/5 text-maroon";
}

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <section aria-labelledby="hero-heading" className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 border border-paddy bg-paddy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-paddy">
          <FileCheck2 className="size-4" aria-hidden="true" />
          Source-linked public record
        </div>
        <p className="eyebrow mt-5">Tamil Nadu · 2014 to the latest source-linked evidence</p>
        <h2
          id="hero-heading"
          className="mt-2 max-w-5xl text-4xl font-extrabold leading-[1.02] sm:text-6xl"
        >
          Tamil Nadu rice prices, procurement and public policy — without filling the gaps.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Official series, government press releases and reported market observations are shown as
          different evidence layers. Retail rice, paddy procurement and PDS prices remain separate.
          Every inference below states its calculation and what the available evidence cannot prove.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="border-l-4 border-maroon bg-card p-4">
            <p className="eyebrow">Retail record currently loaded</p>
            <p className="mt-2 text-3xl font-extrabold">2018–Jul 2023</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Five full-year annual averages plus one partial-year average through July 2023.
            </p>
          </article>
          <article className="border-l-4 border-turmeric bg-card p-4">
            <p className="eyebrow">Recent evidence desk</p>
            <p className="mt-2 text-3xl font-extrabold">2024–2026</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Official policy notes, procurement statements and source-labelled market reporting.
            </p>
          </article>
          <article className="border-l-4 border-paddy bg-card p-4">
            <p className="eyebrow">Paddy procurement record</p>
            <p className="mt-2 text-3xl font-extrabold">2014–15 onward</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Season-wise TNCSC centres and quantity, including the dated in-progress 2025–26 figure.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="retail-record" className="py-9">
        <SectionHeading
          id="retail-record"
          eyebrow="The retail record"
          title="What the official series currently supports"
          intro="The Parliament source gives annual average retail rice prices for 2018–2022 and a 2023 average through July. The homepage does not manufacture values for the surrounding years."
        />

        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-2">
            <span className="size-3 bg-maroon" aria-hidden="true" /> Full-year annual average
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 bg-turmeric" aria-hidden="true" /> Partial-year average
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 border border-dashed border-muted-foreground" aria-hidden="true" /> No comparable value loaded
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {retailPublicRecord.map((record) => {
            const source = record.sourceId ? sourceById[record.sourceId] : null;
            const barHeight = record.value
              ? Math.max(28, Math.round((record.value / maxRetail) * 150))
              : 0;

            return (
              <article
                key={record.year}
                className="flex min-h-64 flex-col justify-between border border-border bg-card p-3"
              >
                <div>
                  <p className="eyebrow">{record.year}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{record.label}</p>
                </div>

                <div className="mt-4 flex min-h-40 items-end">
                  {record.value === null ? (
                    <div className="flex h-28 w-full items-center justify-center border border-dashed border-muted-foreground/60 bg-muted/30 px-2 text-center text-xs text-muted-foreground">
                      Not loaded
                    </div>
                  ) : (
                    <div
                      className={
                        record.observationType === "partial-year"
                          ? "w-full bg-turmeric px-2 py-2 text-turmeric-foreground"
                          : "w-full bg-maroon px-2 py-2 text-maroon-foreground"
                      }
                      style={{ height: `${barHeight}px` }}
                    >
                      <p className="tabular text-xl font-extrabold">₹{record.value.toFixed(2)}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">per kg</p>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">{record.note}</p>
                  {source ? (
                    <div className="mt-2 text-xs">
                      <SourceLink source={source} compact />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 border-l-4 border-turmeric bg-turmeric/10 p-4">
          <p className="font-bold">Comparability rule</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            The 2023 figure is an average through July and is not a full-year value. Missing years are
            not interpolated. A monthly market quotation must not be inserted into this annual series
            unless it is shown as a separate observation type.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="border border-border bg-card p-4">
            <p className="eyebrow">Lowest loaded official point</p>
            <p className="mt-1 text-3xl font-extrabold">₹{lowestLoaded.value.toFixed(2)}/kg</p>
            <p className="mt-1 text-sm text-muted-foreground">{lowestLoaded.label}</p>
          </article>
          <article className="border border-border bg-card p-4">
            <p className="eyebrow">Highest loaded official point</p>
            <p className="mt-1 text-3xl font-extrabold">₹{highestLoaded.value.toFixed(2)}/kg</p>
            <p className="mt-1 text-sm text-muted-foreground">{highestLoaded.label} · partial-year</p>
          </article>
        </div>
      </section>

      <KolamRule />

      <section aria-labelledby="procurement-record" className="py-9">
        <SectionHeading
          id="procurement-record"
          eyebrow="Paddy and procurement"
          title="A continuous official record is available from 2014–15"
          intro="This is paddy procured by TNCSC, measured in lakh tonnes. It is not a retail rice price and cannot be converted into one without milling yield, processing, transport, packaging and margin data."
        />

        <div className="mt-6 overflow-x-auto pb-3">
          <div className="grid min-w-[920px] grid-cols-12 items-end gap-2 border-b border-border px-2 pt-4">
            {procurementPublicRecord.map((record) => {
              const height = Math.max(18, Math.round((record.lakhTonnes / maxProcurement) * 190));
              return (
                <article key={record.season} className="flex flex-col items-stretch justify-end">
                  <p className="tabular mb-2 text-center text-xs font-bold">{record.lakhTonnes.toFixed(2)}</p>
                  <div
                    className="bg-paddy/80 px-1 py-2 text-center text-[10px] font-bold text-paddy-foreground"
                    style={{ height: `${height}px` }}
                    title={`${record.season}: ${record.lakhTonnes.toFixed(2)} lakh tonnes from ${record.centres.toLocaleString("en-IN")} centres`}
                  >
                    <span className="sr-only">
                      {record.season}: {record.lakhTonnes.toFixed(2)} lakh tonnes, {record.centres.toLocaleString("en-IN")} centres
                    </span>
                  </div>
                  <p className="mt-2 text-center text-[11px] font-semibold">{record.season}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The 2025–26 value is explicitly an in-progress figure reported by TNCSC up to 2 June 2026.
            Hover over a bar to see the centre count. The chart preserves the unit used by the official source.
          </p>
          <SourceLink source={sourceById["tncsc-procurement"]} />
        </div>
      </section>

      <KolamRule />

      <section aria-labelledby="recent-evidence" className="py-9">
        <SectionHeading
          id="recent-evidence"
          eyebrow="Recent evidence desk · 2024–2026"
          title="Press releases and news are evidence layers, not substitutes for a price series"
          intro="Official policy documents tell us what changed legally. Government statements report programme progress. News reports provide market quotations and actor claims. The cards below preserve those differences."
        />

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="border border-paddy bg-paddy/10 px-2 py-1 font-bold text-paddy">Official policy</span>
          <span className="border border-turmeric bg-turmeric/15 px-2 py-1 font-bold">Official statement reported</span>
          <span className="border border-maroon bg-maroon/5 px-2 py-1 font-bold text-maroon">Market reporting</span>
        </div>

        <div className="mt-6 space-y-4">
          {recentEvidenceItems.map((item) => (
            <article key={`${item.date}-${item.title}`} className="border border-border bg-card p-4 sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[10rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow">{item.date}</p>
                  <span className={`mt-3 inline-flex border px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${evidenceTone(item.evidenceType)}`}>
                    {item.evidenceType}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{item.whatIsSupported}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.figures.map((figure) => (
                      <span key={figure} className="border border-border bg-secondary px-2 py-1 text-xs font-bold">
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

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {item.sourceIds.map((sourceId) => (
                      <SourceReference key={sourceId} sourceId={sourceId} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <KolamRule />

      <section aria-labelledby="derived-analysis" className="py-9">
        <SectionHeading
          id="derived-analysis"
          eyebrow="Transparent inference"
          title="What can be calculated or inferred from the available evidence?"
          intro="Calculated values are derived from cited observations. Interpretive findings are labelled separately and never promoted to official facts."
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

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                {finding.sourceIds.map((sourceId) => (
                  <SourceReference key={sourceId} sourceId={sourceId} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <KolamRule />

      <section aria-labelledby="policy-record" className="py-9">
        <SectionHeading
          id="policy-record"
          eyebrow="What shaped the market"
          title="Policy events are annotations, not proof of price impact"
          intro="The timeline records what government actually announced or what the law provides. It does not claim that an intervention caused a price movement unless evidence establishes that link."
        />

        <ol className="mt-6 space-y-3">
          {policyTimeline.map((event) => (
            <li key={`${event.date}-${event.title}`} className="grid gap-3 border-l-4 border-maroon bg-card p-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
              <div>
                <p className="eyebrow">{event.date}</p>
                <p className="mt-1 text-2xl font-extrabold text-maroon">{event.year}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  {event.sourceIds.map((sourceId) => (
                    <SourceLink key={sourceId} source={sourceById[sourceId]} compact />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <KolamRule />

      <section aria-labelledby="read-correctly" className="py-9">
        <SectionHeading
          id="read-correctly"
          eyebrow="Public education"
          title="Four distinctions that prevent misleading comparisons"
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Wheat,
              title: "Paddy is not retail rice",
              body: "Procurement data describe unmilled paddy purchased from farmers. Retail rice includes conversion and distribution costs.",
            },
            {
              icon: Scale,
              title: "₹/quintal is not ₹/kg rice",
              body: "A paddy quote may be divided by 100 only to express paddy per kilogram. That still does not create a retail rice price.",
            },
            {
              icon: Landmark,
              title: "PDS is a policy price",
              body: "Free PDS rice for eligible cardholders can remain unchanged while private-market rice prices move.",
            },
            {
              icon: FileCheck2,
              title: "Tax follows supply conditions",
              body: "The current 5% GST entry concerns rice that is pre-packaged and labelled. A premium variety is not automatically taxable because of its name.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article key={title} className="border border-border bg-card p-4">
              <Icon className="size-5 text-maroon" aria-hidden="true" />
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <KolamRule />

      <section aria-labelledby="source-shelf" className="py-9">
        <SectionHeading
          id="source-shelf"
          eyebrow="Open the evidence"
          title="Source shelf: official records, press releases and reported markets"
          intro="Every source opens directly in a new tab. Source type and publication date remain visible so a reported quotation is never mistaken for an official state-wide series."
        />

        <h3 className="mt-6 flex items-center gap-2 text-lg font-extrabold">
          <FileCheck2 className="size-5 text-maroon" aria-hidden="true" /> Primary official record
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {sources.map((source) => (
            <article key={source.id} className="border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{source.kind.replaceAll("-", " ")}</p>
                  <h4 className="mt-1 font-bold">{source.title}</h4>
                </div>
                <ExternalLink className="mt-1 size-4 shrink-0 text-maroon" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.note}</p>
              <div className="mt-3 text-xs">
                <SourceLink source={source} compact />
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-8 flex items-center gap-2 text-lg font-extrabold">
          <Newspaper className="size-5 text-maroon" aria-hidden="true" /> Recent release and market evidence
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {recentEvidenceSources.map((source) => (
            <article key={source.id} className="border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">
                    {source.kind.replaceAll("-", " ")} · {source.publishedDate}
                  </p>
                  <h4 className="mt-1 font-bold">{source.title}</h4>
                </div>
                <ExternalLink className="mt-1 size-4 shrink-0 text-maroon" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.note}</p>
              <div className="mt-3 text-xs">
                <RecentSourceLink source={source} compact />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-2 border-y-4 border-double border-maroon bg-secondary px-4 py-7">
        <p className="eyebrow">Continue the record</p>
        <h2 className="mt-1 text-2xl font-extrabold">Explore the history without losing the source trail.</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The dedicated pages provide deeper context. Prototype explorer pages may still contain demonstration records; the homepage above separates official observations, reported evidence and inference.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/history"
            className="inline-flex min-h-11 items-center gap-2 bg-maroon px-3 text-sm font-bold text-maroon-foreground hover:bg-maroon/90"
          >
            Open the historical record <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/sources"
            className="inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
          >
            Read methodology and sources <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
