import { createFileRoute, Link } from "@tanstack/react-router";
import { tnMonthlyRetail, tnAnnualRetail, varietyMovement } from "@/data/prices";
import { ConfidenceBadge, ConfidenceLegend } from "@/components/site/ConfidenceBadge";
import {
  Citation,
  ComparabilityWarning,
  DemoBanner,
  KolamRule,
  PullQuote,
  SectionHeading,
  StatBlock,
} from "@/components/site/Editorial";
import { DistrictMap } from "@/components/site/DistrictMap";
import { PriceLineChart } from "@/components/site/PriceChart";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today's Rice Picture — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "Is rice getting dearer in Tamil Nadu? Today's retail benchmark, what changed, which varieties moved, and what the evidence does and does not show.",
      },
      { property: "og:title", content: "Today's Rice Picture — Tamil Nadu Rice Price Tracker" },
      {
        property: "og:description",
        content:
          "Current Tamil Nadu retail rice benchmark with sources, units and uncertainty labelled.",
      },
    ],
  }),
  component: Home,
});

const latest = tnMonthlyRetail[tnMonthlyRetail.length - 1]!;
const prevMonth = tnMonthlyRetail[tnMonthlyRetail.length - 2]!;
const yearAgo = tnMonthlyRetail.find((p) => p.period === "2025-06")!;

const monthChange = latest.value - prevMonth.value;
const yearChange = latest.value - yearAgo.value;

const chartData = tnMonthlyRetail.map((p) => ({
  label: p.label,
  benchmark: p.value,
}));

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />

      {/* HERO */}
      <section aria-labelledby="hero-heading" className="mt-6">
        <p className="eyebrow">Today&apos;s rice picture · Updated 31 July 2026</p>
        <h2
          id="hero-heading"
          className="mt-2 text-3xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
        >
          Rice is dearer again in Tamil Nadu — but this time only the fine varieties are moving.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          The state retail benchmark is up about {monthChange.toFixed(2)} rupees a kilo since May.
          Common rice, boiled ration-grade rice and PDS supply are broadly steady. That difference
          is the whole story, and it is the difference between a 2024-style shock and a narrower
          2026 episode.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock
            value={`₹${latest.value.toFixed(2)}`}
            label="TN retail benchmark, ₹/kg"
            sub={
              <>
                <time dateTime="2026-07">July 2026</time> monthly average ·{" "}
                <ConfidenceBadge level={latest.confidence} short />
              </>
            }
          />
          <StatBlock
            value={`${monthChange >= 0 ? "+" : ""}${monthChange.toFixed(2)}`}
            label="Change vs previous month"
            tone={monthChange >= 0 ? "up" : "down"}
            sub={`From ₹${prevMonth.value.toFixed(2)}/kg in ${prevMonth.label}`}
          />
          <StatBlock
            value={`${yearChange >= 0 ? "+" : ""}${yearChange.toFixed(2)}`}
            label="Change vs a year earlier"
            tone={yearChange >= 0 ? "up" : "down"}
            sub={`From ₹${yearAgo.value.toFixed(2)}/kg in ${yearAgo.label}`}
          />
          <StatBlock
            value="₹0.00"
            label="PDS issue price, ₹/kg"
            sub="Eligible cardholders in Tamil Nadu · Official data"
          />
        </div>

        <Citation
          className="mt-3"
          sourceTitle="Daily retail and wholesale price monitoring — rice, Tamil Nadu centres"
          publisher="Department of Consumer Affairs"
          date="2026-07-31"
        />
        <ConfidenceLegend className="mt-3" />
      </section>

      <KolamRule className="my-8" />

      {/* WHAT CHANGED */}
      <section aria-labelledby="what-changed" className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <SectionHeading
            id="what-changed"
            eyebrow="Editorial summary"
            title="What changed?"
            intro="We separate what is measured from what we think it means. You should be able to disagree with our interpretation without disputing our facts."
          />
          <dl className="mt-4 space-y-3">
            {[
              {
                t: "Fact",
                b: "The July 2026 Tamil Nadu retail benchmark stands at ₹57.75/kg, against ₹55.51/kg in December 2025 and a June 2024 peak of ₹61.75/kg.",
                tone: "border-l-paddy",
              },
              {
                t: "Evidence",
                b: "Fine varieties — Ponni, BPT 5204, RNR — moved 3–6% month on month in reported market quotations. Common rice moved under 1%. TNCSC procurement recovered to 47.99 lakh tonnes in 2024–25, so total paddy availability is not the binding constraint.",
                tone: "border-l-turmeric",
              },
              {
                t: "Interpretation",
                b: "This reads as a variety-specific supply problem concentrated in fine rice milled from Andhra Pradesh, Telangana and Karnataka paddy, not a general rice shortage in Tamil Nadu.",
                tone: "border-l-maroon",
              },
              {
                t: "Unknown",
                b: "We do not have July 2026 inter-state arrival volumes, mill-level stock positions, or any official split between paddy cost and trade margin. Anyone claiming certainty on cause is going beyond the data.",
                tone: "border-l-muted-foreground",
              },
            ].map((row) => (
              <div key={row.t} className={`border-l-4 bg-card px-3 py-2 ${row.tone}`}>
                <dt className="eyebrow">{row.t}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{row.b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="border border-border bg-card p-4">
          <h3 className="text-lg font-bold">Read this before quoting a number</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Paddy is quoted in ₹/quintal. Retail rice is quoted in ₹/kg. They are not the same measurement.</li>
            <li>An annual average and a single day&apos;s market quote cannot be compared directly.</li>
            <li>&quot;Grade A paddy&quot; in procurement is not the same thing as commercial fine rice.</li>
          </ul>
          <Link
            to="/explorer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 bg-primary px-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            Open the price explorer <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <KolamRule className="my-8" />

      {/* MAP + VARIETY STRIP */}
      <section aria-labelledby="map-heading" className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="map-heading"
            eyebrow="Where"
            title="District and market movement"
            intro="Select a district to see its fine and common rice quotations. Metro and western markets are moving faster than the delta."
          />
          <div className="mt-4">
            <DistrictMap />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="What"
            title="Variety movement strip"
            intro="One-month change in reported retail quotations. Fine varieties are separated from common rice because averaging them together hides the entire story."
          />
          <ul className="mt-4 divide-y divide-border border border-border bg-card">
            {varietyMovement.map((v) => (
              <li key={v.variety} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{v.variety}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {v.grade} · <ConfidenceBadge level={v.confidence} short />
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="tabular text-sm font-bold">₹{v.price.toFixed(2)}</p>
                  <p
                    className={`tabular text-xs font-bold ${v.changePct >= 2 ? "text-destructive" : "text-paddy"}`}
                  >
                    +{v.changePct.toFixed(1)}%
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <KolamRule className="my-8" />

      {/* MAIN STORY */}
      <section aria-labelledby="story-heading" className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <article>
          <p className="eyebrow">The main story</p>
          <h2 id="story-heading" className="mt-1 text-2xl font-extrabold sm:text-4xl">
            Two shocks, two shapes: 2024 was broad, 2026 is narrow
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            In 2024, almost everything in the rice basket rose together. Depleted mill stocks, weak
            inter-state arrivals, Cauvery stress and a 21% fall in state paddy procurement produced
            a benchmark peak of ₹61.75/kg in June that year. Common rice rose with fine rice, which
            is what makes a price episode a genuine consumer emergency.
          </p>
          <p className="mt-3 text-base leading-relaxed">
            The 2026 episode looks different in shape. Procurement recovered to 47.99 lakh tonnes in
            2024–25. Common rice and PDS-grade boiled rice have barely moved. What has tightened is
            a specific set of fine varieties that Tamil Nadu largely does not grow.
          </p>

          <PullQuote cite="Rice Price Tracker · interpretation, not measurement">
            A shortage of Ponni is not a shortage of rice. Conflating the two is how a market story
            becomes a panic story.
          </PullQuote>

          <p className="mt-3 text-base leading-relaxed">
            That distinction matters for policy. Tools aimed at total availability — export
            restrictions, open market sales, stock declarations — bite differently when the
            constraint is one segment of the market rather than the whole of it.
          </p>

          <div className="mt-6 border border-border bg-card p-4">
            <h3 className="text-base font-bold">Benchmark, December 2023 to July 2026</h3>
            <PriceLineChart
              data={chartData}
              series={[{ key: "benchmark", name: "TN retail benchmark (₹/kg)", color: "var(--color-chart-1)" }]}
              markers={[
                { x: "Feb 2024", label: "Stock declaration" },
                { x: "Jun 2024", label: "2024 peak" },
                { x: "Jul 2026", label: "Fine-rice shock" },
              ]}
            />
            <ComparabilityWarning
              className="mt-3"
              reasons={[
                "This series mixes official monthly figures with site estimates for months where no official value is published. Estimated points are labelled in the explorer.",
              ]}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/investigation-2024"
              className="inline-flex min-h-11 items-center border border-maroon px-3 text-sm font-bold hover:bg-maroon hover:text-maroon-foreground"
            >
              Read the 2023–24 investigation
            </Link>
            <Link
              to="/watch-2026"
              className="inline-flex min-h-11 items-center border border-maroon px-3 text-sm font-bold hover:bg-maroon hover:text-maroon-foreground"
            >
              Follow the 2026 watch
            </Link>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="border border-border bg-card p-4">
            <h3 className="eyebrow">Annual averages, ₹/kg</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {tnAnnualRetail.slice(-6).map((y) => (
                <li key={y.period} className="flex items-baseline justify-between gap-2">
                  <span className="min-w-0 truncate">{y.label}</span>
                  <span className="tabular shrink-0 font-bold">₹{y.value.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Partial-year values are marked in the label and are not comparable with full-year
              averages.
            </p>
          </div>
          <div className="border-l-4 border-turmeric bg-turmeric/10 p-4">
            <h3 className="text-base font-bold">If your ration card is active</h3>
            <p className="mt-2 text-sm leading-relaxed">
              PDS rice is issued at ₹0/kg to eligible cardholders in Tamil Nadu. Market movements do
              not change that entitlement. This site exists mainly for the purchases you make
              outside it.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}