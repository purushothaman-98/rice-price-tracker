import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  FileCheck2,
  Newspaper,
  ShieldAlert,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { KolamRule, SectionHeading } from "@/components/site/Editorial";
import {
  procurementPublicRecord,
  retailPublicRecord,
  sourceById,
} from "@/data/publicRecord";
import {
  derivedFindings,
  evidenceYearSummaries,
  recentEvidenceSources,
} from "@/data/recentEvidence";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tamil Nadu Rice Prices, 2014–Present — Rice Price Tracker" },
      {
        name: "description",
        content:
          "A source-linked public record of Tamil Nadu retail rice prices, paddy procurement and evidence-based analysis from 2014 onward, with a detailed 2019–2026 evidence archive.",
      },
      { property: "og:title", content: "Tamil Nadu Rice Prices and Evidence, 2014–Present" },
      {
        property: "og:description",
        content:
          "Official price records, procurement data, press releases, market reporting and inference are kept visibly separate.",
      },
    ],
  }),
  component: Home,
});

const loadedRetail = retailPublicRecord.filter(
  (record): record is (typeof retailPublicRecord)[number] & { value: number } => record.value !== null,
);
const maxRetail = Math.max(...loadedRetail.map((record) => record.value));
const procurementFocus = procurementPublicRecord.filter((record) => record.season >= "2019–20");
const maxProcurement = Math.max(...procurementFocus.map((record) => record.lakhTonnes));
const officialRetailSource = sourceById["rajya-sabha-1830"];
const procurementSource = sourceById["tncsc-procurement"];

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <section aria-labelledby="hero-heading" className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 border border-paddy bg-paddy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-paddy">
          <FileCheck2 className="size-4" aria-hidden="true" />
          Source-linked public record
        </div>
        <p className="eyebrow mt-5">Tamil Nadu · 2014 to the latest source-linked evidence</p>
        <h1
          id="hero-heading"
          className="mt-2 max-w-5xl text-4xl font-extrabold leading-[1.02] sm:text-6xl"
        >
          Rice prices, procurement and public policy—without filling the gaps.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          The official retail-price series is shown only where a comparable source is loaded. A
          separate evidence archive follows Tamil Nadu&apos;s rice system from 2019 to 2026 through
          official releases, reported government statements, crop conditions and market reporting.
          Paddy, retail rice and PDS prices remain separate measurements.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="border-l-4 border-maroon bg-card p-4">
            <p className="eyebrow">Official retail record</p>
            <p className="mt-2 text-3xl font-extrabold">2018–Jul 2023</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Five annual averages and one partial-year observation. Missing periods are not estimated.
            </p>
          </article>
          <article className="border-l-4 border-turmeric bg-card p-4">
            <p className="eyebrow">Evidence desk</p>
            <p className="mt-2 text-3xl font-extrabold">2019–2026</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Eight years of policy, procurement, crop shocks, trade controls and source-labelled market evidence.
            </p>
          </article>
          <article className="border-l-4 border-paddy bg-card p-4">
            <p className="eyebrow">Official procurement record</p>
            <p className="mt-2 text-3xl font-extrabold">2014–15 onward</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Season-wise TNCSC paddy procurement and centre counts, including dated in-progress data.
            </p>
          </article>
        </div>
      </section>

      <section className="py-9" aria-labelledby="retail-record">
        <SectionHeading
          id="retail-record"
          eyebrow="Official retail record"
          title="What the comparable price series currently supports"
          intro="The Parliament record supplies Tamil Nadu annual average retail-rice prices for 2018–2022 and an average through July 2023. It does not supply a complete annual series for every year on this site."
        />

        <div className="mt-6 space-y-3">
          {loadedRetail.map((record) => (
            <article
              key={record.year}
              className="grid gap-3 border border-border bg-card p-4 sm:grid-cols-[8rem_minmax(0,1fr)_7rem] sm:items-center"
            >
              <div>
                <p className="text-2xl font-extrabold text-maroon">{record.year}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {record.observationType.replaceAll("-", " ")}
                </p>
              </div>
              <div>
                <div className="h-8 bg-secondary" aria-hidden="true">
                  <div
                    className={record.observationType === "partial-year" ? "h-full bg-turmeric" : "h-full bg-maroon"}
                    style={{ width: `${Math.max(12, (record.value / maxRetail) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{record.note}</p>
              </div>
              <p className="tabular text-2xl font-extrabold sm:text-right">₹{record.value.toFixed(2)}/kg</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="border-l-4 border-turmeric bg-turmeric/10 p-4">
            <p className="font-bold">What is deliberately missing</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              No comparable annual value is loaded for 2014–2017 or 2024–2026. The July 2023 figure
              is partial-year and cannot be treated as a full-year average.
            </p>
          </div>
          <a
            href={officialRetailSource.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
          >
            Open Parliament source <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="evidence-map">
        <SectionHeading
          id="evidence-map"
          eyebrow="Evidence desk · 2019–2026"
          title="Eight years, eight different market and policy phases"
          intro="These summaries link to the detailed archive. Each year page preserves the supported facts, numerical observations, interpretation, limitations and direct source links."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {evidenceYearSummaries.map((year) => (
            <a
              key={year.year}
              href={`/evidence#year-${year.year}`}
              className="group border border-border bg-card p-4 hover:border-maroon hover:bg-secondary"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-3xl font-extrabold text-maroon">{year.year}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {year.evidenceCount} {year.evidenceCount === 1 ? "record" : "records"}
                </span>
              </div>
              <h2 className="mt-3 text-base font-bold group-hover:text-maroon">{year.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{year.summary}</p>
            </a>
          ))}
        </div>

        <Link
          to="/evidence"
          className="mt-5 inline-flex min-h-11 items-center gap-2 bg-maroon px-4 text-sm font-bold text-maroon-foreground hover:bg-maroon/90"
        >
          Open the full 2019–2026 evidence archive <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="procurement-trajectory">
        <SectionHeading
          id="procurement-trajectory"
          eyebrow="Paddy procurement"
          title="The public procurement system changed scale after 2019"
          intro="These are lakh tonnes of paddy procured by TNCSC. They are not retail-rice prices, total production or a direct measure of household availability."
        />

        <div className="mt-6 overflow-x-auto pb-3">
          <div className="flex min-w-[760px] items-end gap-3 border-b border-border px-2 pt-3">
            {procurementFocus.map((record) => {
              const height = Math.max(28, Math.round((record.lakhTonnes / maxProcurement) * 190));
              return (
                <article key={record.season} className="flex min-w-24 flex-1 flex-col items-stretch justify-end">
                  <p className="tabular mb-2 text-center text-xs font-bold">{record.lakhTonnes.toFixed(2)}</p>
                  <div
                    className="bg-paddy/80"
                    style={{ height: `${height}px` }}
                    title={`${record.season}: ${record.lakhTonnes.toFixed(2)} lakh tonnes from ${record.centres.toLocaleString("en-IN")} centres`}
                  />
                  <p className="mt-2 text-center text-xs font-semibold">{record.season}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The 2025–26 value is a dated in-progress figure up to 2 June 2026. Hover over a bar for
            the associated centre count. No paddy-to-retail-rice price conversion is made.
          </p>
          <a
            href={procurementSource.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
          >
            Open TNCSC record <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <KolamRule />

      <section className="py-9" aria-labelledby="key-findings">
        <SectionHeading
          id="key-findings"
          eyebrow="Evidence-based analysis"
          title="The most important cross-year findings"
          intro="The archive contains the full calculations and source trail. These highlights remain bounded by the evidence stated on each card."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {derivedFindings.slice(0, 4).map((finding) => (
            <article key={finding.title} className="border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{finding.confidence} confidence</p>
                  <h2 className="mt-1 text-lg font-extrabold">{finding.title}</h2>
                </div>
                <TrendingUp className="size-5 shrink-0 text-maroon" aria-hidden="true" />
              </div>
              <p className="tabular mt-4 text-3xl font-extrabold text-maroon">{finding.value}</p>
              <p className="mt-3 text-sm leading-relaxed">{finding.finding}</p>
              <div className="mt-4 flex gap-2 border-l-4 border-turmeric bg-turmeric/10 p-3">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-maroon" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-muted-foreground">{finding.caution}</p>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/evidence"
          className="mt-5 inline-flex min-h-11 items-center gap-2 border border-maroon px-4 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
        >
          Review every calculation and source <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <section className="mt-2 border-y-4 border-double border-maroon bg-secondary px-4 py-7">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="eyebrow">Evidence standard</p>
            <h2 className="mt-1 text-2xl font-extrabold">News is context—not an automatic price series.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The archive contains {recentEvidenceSources.length} curated source records. Official
              releases, reported official statements and local market reports are labelled separately.
              Forecasts remain forecasts, industry stock figures remain claims, and local quotations
              are never promoted to a statewide official average.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:max-w-xs">
            <Link
              to="/evidence"
              className="inline-flex min-h-11 items-center gap-2 bg-maroon px-3 text-sm font-bold text-maroon-foreground hover:bg-maroon/90"
            >
              <Newspaper className="size-4" aria-hidden="true" /> Evidence archive
            </Link>
            <Link
              to="/sources"
              className="inline-flex min-h-11 items-center gap-2 border border-maroon px-3 text-sm font-bold text-maroon hover:bg-maroon hover:text-maroon-foreground"
            >
              Methodology <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
