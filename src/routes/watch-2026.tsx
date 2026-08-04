import { createFileRoute } from "@tanstack/react-router";
import { escalationIndicators } from "@/data/events";
import { varietyMovement, tnMonthlyRetail } from "@/data/prices";
import { ConfidenceBadge } from "@/components/site/ConfidenceBadge";
import { DemoBanner, KolamRule, SectionHeading, StatBlock } from "@/components/site/Editorial";
import { PriceLineChart } from "@/components/site/PriceChart";
import { AlertTriangle, CircleCheck } from "lucide-react";

export const Route = createFileRoute("/watch-2026")({
  head: () => ({
    meta: [
      { title: "2026 Watch — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "Tracking the 2026 fine-rice supply shock against the 2024 broad shock: arrivals from Andhra, Telangana and Karnataka, Kuruvai risk, exports, margins and escalation indicators.",
      },
      { property: "og:title", content: "2026 Watch — Is this another 2024?" },
      {
        property: "og:description",
        content: "Escalation indicators comparing the 2026 fine-rice episode with the 2024 broad rice shock.",
      },
    ],
  }),
  component: Watch2026,
});

const comparisonData = tnMonthlyRetail
  .filter((p) => p.period >= "2023-07")
  .map((p) => ({ label: p.label, benchmark: p.value }));

const trackers = [
  {
    place: "Andhra Pradesh arrivals",
    status: "Weak",
    detail: "Reported slowdown in BPT 5204 and RNR despatches to Tamil Nadu mills.",
    confidence: "reported" as const,
  },
  {
    place: "Telangana arrivals",
    status: "Weak",
    detail: "RNR 15048 supply tighter; quotations up in reported trade coverage.",
    confidence: "reported" as const,
  },
  {
    place: "Karnataka arrivals",
    status: "Mixed",
    detail: "Karnataka Ponni still moving, but at higher quoted rates.",
    confidence: "estimated" as const,
  },
  {
    place: "Tamil Nadu Kuruvai risk",
    status: "Watch",
    detail: "Cauvery release schedule under review; delta transplanting progress not yet confirmed.",
    confidence: "estimated" as const,
  },
  {
    place: "Export policy",
    status: "Open",
    detail: "No new restriction announced in this episode.",
    confidence: "official" as const,
  },
  {
    place: "Paddy market quotations",
    status: "Above MSP for fine paddy",
    detail: "Fine paddy quoted above MSP plus state incentive; common paddy near the floor.",
    confidence: "reported" as const,
  },
  {
    place: "Retail margins",
    status: "Widening",
    detail: "Wholesale-to-retail spread in demo records widened on fine varieties only.",
    confidence: "estimated" as const,
  },
  {
    place: "Government response",
    status: "None specific",
    detail: "No stock declaration order or state-level intervention specific to this episode.",
    confidence: "official" as const,
  },
];

function Watch2026() {
  const triggered = escalationIndicators.filter((i) => i.triggered).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 07 · Live watch"
        title="Is 2026 turning into another 2024?"
        intro="Short answer, on current evidence: not yet. Total paddy availability looks adequate. What is short is a specific set of fine varieties Tamil Nadu mostly imports from neighbouring states."
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock value={`${triggered} of ${escalationIndicators.length}`} label="Escalation indicators triggered" tone={triggered >= 4 ? "up" : "default"} />
        <StatBlock value="₹57.75" label="July 2026 benchmark, ₹/kg" />
        <StatBlock value="₹61.75" label="June 2024 peak, ₹/kg" />
        <StatBlock value="< 1%" label="Common rice monthly change" tone="down" />
      </div>

      <div className="mt-6 border border-border bg-card p-4">
        <h3 className="text-base font-bold">Benchmark through both episodes</h3>
        <PriceLineChart
          data={comparisonData}
          series={[{ key: "benchmark", name: "TN retail benchmark (₹/kg)", color: "var(--color-chart-1)" }]}
          markers={[
            { x: "Jun 2024", label: "2024 peak" },
            { x: "Dec 2025", label: "Post-recovery low" },
            { x: "Jul 2026", label: "Current" },
          ]}
        />
      </div>

      <KolamRule className="my-8" />

      <section aria-labelledby="esc">
        <SectionHeading
          id="esc"
          eyebrow="Escalation"
          title="When would this become comparable to 2024?"
          intro="These are the conditions we watch. If four or more turn true at once, this episode stops being a fine-rice story and becomes a general one."
        />
        <div className="mt-4 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[42rem] text-sm">
            <caption className="sr-only">Escalation indicators comparing 2024 and 2026</caption>
            <thead className="bg-secondary text-left">
              <tr>
                <th scope="col" className="px-3 py-2">Indicator</th>
                <th scope="col" className="px-3 py-2">2024</th>
                <th scope="col" className="px-3 py-2">2026</th>
                <th scope="col" className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {escalationIndicators.map((i) => (
                <tr key={i.id} className="border-t border-border align-top">
                  <th scope="row" className="px-3 py-2 text-left font-bold">{i.indicator}</th>
                  <td className="px-3 py-2 text-muted-foreground">{i.status2024}</td>
                  <td className="px-3 py-2">{i.status2026}</td>
                  <td className="px-3 py-2">
                    {i.triggered ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-destructive">
                        <AlertTriangle aria-hidden="true" className="size-3.5" /> Triggered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-paddy">
                        <CircleCheck aria-hidden="true" className="size-3.5" /> Not yet
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <KolamRule className="my-8" />

      <section aria-labelledby="track" className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading id="track" eyebrow="Trackers" title="What we are monitoring" />
          <ul className="mt-4 divide-y divide-border border border-border bg-card">
            {trackers.map((t) => (
              <li key={t.place} className="px-3 py-3">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <h3 className="min-w-0 text-sm font-bold">{t.place}</h3>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-maroon">
                    {t.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
                <ConfidenceBadge level={t.confidence} short className="mt-2" />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            eyebrow="Segment split"
            title="Fine versus common, this month"
            intro="This chart is the reason we describe 2026 as a narrow episode."
          />
          <ul className="mt-4 space-y-2">
            {varietyMovement.map((v) => (
              <li key={v.variety} className="border border-border bg-card p-3">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                  <span className="min-w-0 truncate text-sm font-semibold">{v.variety}</span>
                  <span className="tabular shrink-0 text-sm font-bold">+{v.changePct.toFixed(1)}%</span>
                </div>
                <div
                  className="mt-2 h-2 w-full bg-muted"
                  role="img"
                  aria-label={`${v.variety} up ${v.changePct} percent`}
                >
                  <div
                    className={v.grade === "fine" ? "h-2 bg-destructive" : "h-2 bg-paddy"}
                    style={{ width: `${Math.min(100, (v.changePct / 7) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}