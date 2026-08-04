import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { priceRecords, toCsv, downloadCsv, uniq, unitLabel } from "@/data/prices";
import type { PriceRecord } from "@/data/types";
import { ConfidenceBadge, ConfidenceLegend } from "@/components/site/ConfidenceBadge";
import {
  ComparabilityWarning,
  DemoBanner,
  SectionHeading,
  StatBlock,
} from "@/components/site/Editorial";
import { PriceLineChart } from "@/components/site/PriceChart";
import { Download } from "lucide-react";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Live Price Explorer — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "Filter Tamil Nadu rice and paddy prices by district, market, variety, processing, package and market stage. Charts, tables and CSV export with comparability warnings.",
      },
      { property: "og:title", content: "Live Price Explorer — Tamil Nadu Rice Price Tracker" },
      {
        property: "og:description",
        content:
          "Compare rice prices safely: never silently mixing paddy with rice or official data with market quotations.",
      },
    ],
  }),
  component: Explorer,
});

const ALL = "all";

interface Filters {
  district: string;
  market: string;
  from: string;
  to: string;
  commodity: string;
  variety: string;
  processing: string;
  grade: string;
  packageType: string;
  marketStage: string;
  confidence: string;
}

const initial: Filters = {
  district: ALL,
  market: ALL,
  from: "2025-12",
  to: "2026-07",
  commodity: "milled-rice",
  variety: ALL,
  processing: ALL,
  grade: ALL,
  packageType: ALL,
  marketStage: "retail",
  confidence: ALL,
};

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const id = `f-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 border border-input bg-card px-2 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const opt = (values: string[], allLabel: string) => [
  { value: ALL, label: allLabel },
  ...values.map((v) => ({ value: v, label: v })),
];

function Explorer() {
  const [f, setF] = useState<Filters>(initial);
  const set = (k: keyof Filters, v: string) => setF((prev) => ({ ...prev, [k]: v }));

  const districts = useMemo(
    () => uniq(priceRecords.map((r) => r.district).filter(Boolean) as string[]).sort(),
    [],
  );
  const markets = useMemo(
    () =>
      uniq(
        priceRecords
          .filter((r) => f.district === ALL || r.district === f.district)
          .map((r) => r.market)
          .filter(Boolean) as string[],
      ).sort(),
    [f.district],
  );
  const varietyNames = useMemo(() => uniq(priceRecords.map((r) => r.variety)).sort(), []);
  const periods = useMemo(() => uniq(priceRecords.map((r) => r.observationDate)).sort(), []);

  const rows = useMemo(
    () =>
      priceRecords.filter((r) => {
        if (f.district !== ALL && r.district !== f.district) return false;
        if (f.market !== ALL && r.market !== f.market) return false;
        if (r.observationDate < f.from || r.observationDate > f.to) return false;
        if (f.commodity !== ALL && r.commodity !== f.commodity) return false;
        if (f.variety !== ALL && r.variety !== f.variety) return false;
        if (f.processing !== ALL && r.processing !== f.processing) return false;
        if (f.grade !== ALL && r.grade !== f.grade) return false;
        if (f.packageType !== ALL && r.packageType !== f.packageType) return false;
        if (f.marketStage !== ALL && r.marketStage !== f.marketStage) return false;
        if (f.confidence !== ALL && r.confidence !== f.confidence) return false;
        return true;
      }),
    [f],
  );

  const groups = useMemo(() => uniq(rows.map((r) => r.comparabilityGroup)), [rows]);
  const units = useMemo(() => uniq(rows.map((r) => r.unit)), [rows]);
  const commodities = useMemo(() => uniq(rows.map((r) => r.commodity)), [rows]);
  const stages = useMemo(() => uniq(rows.map((r) => r.marketStage)), [rows]);
  const confidences = useMemo(() => uniq(rows.map((r) => r.confidence)), [rows]);

  const warnings: string[] = [];
  if (commodities.length > 1)
    warnings.push(
      "Your selection mixes paddy with milled rice. These are different commodities at different stages of processing and must not be averaged or charted on one axis.",
    );
  if (units.length > 1)
    warnings.push(
      "Your selection mixes ₹/kg with ₹/quintal. No conversion has been applied because these records do not carry conversion metadata.",
    );
  if (stages.length > 1)
    warnings.push(
      "Your selection mixes market stages (for example retail with wholesale or PDS). Spreads between stages are not price differences for the same transaction.",
    );
  if (confidences.includes("official") && confidences.includes("reported"))
    warnings.push(
      "Your selection mixes official benchmark data with reported newspaper and trade quotations. These are collected differently and are not statistically comparable.",
    );
  if (groups.length > 1)
    warnings.push(
      `Your selection spans ${groups.length} comparability groups. Summary statistics below are therefore shown per group, not as a single average.`,
    );

  const perGroup = useMemo(() => {
    return groups.map((g) => {
      const gr = rows.filter((r) => r.comparabilityGroup === g);
      const vals = gr.map((r) => r.value);
      return {
        group: g,
        unit: gr[0]?.unit ?? "INR/kg",
        count: gr.length,
        min: Math.min(...vals),
        max: Math.max(...vals),
        avg: vals.reduce((a, b) => a + b, 0) / (vals.length || 1),
      };
    });
  }, [groups, rows]);

  const chartData = useMemo(() => {
    if (groups.length !== 1) return [];
    const byPeriod = new Map<string, number[]>();
    for (const r of rows) {
      const arr = byPeriod.get(r.observationDate) ?? [];
      arr.push(r.value);
      byPeriod.set(r.observationDate, arr);
    }
    return Array.from(byPeriod.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, vals]) => ({
        label: period,
        avg: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2),
        min: +Math.min(...vals).toFixed(2),
        max: +Math.max(...vals).toFixed(2),
      }));
  }, [rows, groups.length]);

  const single = perGroup.length === 1 ? perGroup[0]! : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 02"
        title="Live price explorer"
        intro="Filter the record set, then read the summary per comparability group. This tool will not silently average unlike prices — if your selection is not comparable, it tells you and splits the statistics."
      />

      <form
        className="mt-6 grid gap-3 border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Price filters"
      >
        <Select label="District" value={f.district} onChange={(v) => { set("district", v); set("market", ALL); }} options={opt(districts, "All districts")} />
        <Select label="Market" value={f.market} onChange={(v) => set("market", v)} options={opt(markets, "All markets")} />
        <Select label="From period" value={f.from} onChange={(v) => set("from", v)} options={periods.map((p) => ({ value: p, label: p }))} />
        <Select label="To period" value={f.to} onChange={(v) => set("to", v)} options={periods.map((p) => ({ value: p, label: p }))} />
        <Select
          label="Paddy or rice"
          value={f.commodity}
          onChange={(v) => set("commodity", v)}
          options={[
            { value: ALL, label: "Both (not comparable)" },
            { value: "paddy", label: "Paddy" },
            { value: "milled-rice", label: "Milled rice" },
          ]}
        />
        <Select label="Variety" value={f.variety} onChange={(v) => set("variety", v)} options={opt(varietyNames, "All varieties")} />
        <Select
          label="Processing"
          value={f.processing}
          onChange={(v) => set("processing", v)}
          options={[
            { value: ALL, label: "Any processing" },
            { value: "raw", label: "Raw" },
            { value: "boiled", label: "Boiled" },
            { value: "parboiled", label: "Parboiled" },
            { value: "not-applicable", label: "Not applicable (paddy)" },
          ]}
        />
        <Select
          label="Grade"
          value={f.grade}
          onChange={(v) => set("grade", v)}
          options={[
            { value: ALL, label: "Any grade" },
            { value: "fine", label: "Fine" },
            { value: "common", label: "Common" },
            { value: "unspecified", label: "Unspecified" },
          ]}
        />
        <Select
          label="Package"
          value={f.packageType}
          onChange={(v) => set("packageType", v)}
          options={[
            { value: ALL, label: "Any package" },
            { value: "loose", label: "Loose" },
            { value: "pre-packaged", label: "Pre-packaged and labelled" },
          ]}
        />
        <Select
          label="Market stage"
          value={f.marketStage}
          onChange={(v) => set("marketStage", v)}
          options={[
            { value: ALL, label: "Any stage" },
            { value: "retail", label: "Retail (private market)" },
            { value: "wholesale", label: "Wholesale" },
            { value: "farmgate", label: "Farmgate / paddy market" },
            { value: "pds", label: "PDS" },
          ]}
        />
        <Select
          label="Source confidence"
          value={f.confidence}
          onChange={(v) => set("confidence", v)}
          options={[
            { value: ALL, label: "Any confidence" },
            { value: "official", label: "Official data" },
            { value: "reported", label: "Reported market quote" },
            { value: "estimated", label: "Estimated" },
          ]}
        />
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={() => setF(initial)}
            className="min-h-11 border border-border px-3 text-sm font-bold hover:bg-secondary"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => downloadCsv("rice-price-tracker-demo.csv", toCsv(rows))}
            className="inline-flex min-h-11 items-center gap-2 bg-primary px-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Download aria-hidden="true" className="size-4" /> CSV
          </button>
        </div>
      </form>

      <ComparabilityWarning className="mt-4" reasons={warnings} />

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock value={String(rows.length)} label="Records selected" />
        {single ? (
          <>
            <StatBlock value={`${single.min.toFixed(2)}`} label={`Minimum (${unitLabel(single.unit)})`} />
            <StatBlock value={`${single.max.toFixed(2)}`} label={`Maximum (${unitLabel(single.unit)})`} />
            <StatBlock
              value={`${single.avg.toFixed(2)}`}
              label={`Mean (${unitLabel(single.unit)})`}
              sub={`Range ${(single.max - single.min).toFixed(2)}`}
            />
          </>
        ) : (
          <div className="border border-border bg-card p-4 sm:col-span-3">
            <p className="eyebrow">Summary withheld</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your selection spans more than one comparability group, so a single min, max and mean
              would be misleading. Per-group statistics are shown below.
            </p>
          </div>
        )}
      </div>

      {groups.length > 1 ? (
        <div className="mt-4 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[36rem] text-sm">
            <caption className="sr-only">Summary statistics per comparability group</caption>
            <thead className="bg-secondary text-left">
              <tr>
                <th scope="col" className="px-3 py-2">Comparability group</th>
                <th scope="col" className="px-3 py-2">n</th>
                <th scope="col" className="px-3 py-2">Min</th>
                <th scope="col" className="px-3 py-2">Max</th>
                <th scope="col" className="px-3 py-2">Mean</th>
              </tr>
            </thead>
            <tbody>
              {perGroup.map((g) => (
                <tr key={g.group} className="border-t border-border">
                  <td className="px-3 py-2 font-mono text-xs">{g.group}</td>
                  <td className="tabular px-3 py-2">{g.count}</td>
                  <td className="tabular px-3 py-2">{g.min.toFixed(2)}</td>
                  <td className="tabular px-3 py-2">{g.max.toFixed(2)}</td>
                  <td className="tabular px-3 py-2">{g.avg.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {chartData.length > 1 ? (
        <section className="mt-6 border border-border bg-card p-4" aria-label="Price chart">
          <h3 className="text-base font-bold">
            Selected series — mean with min and max envelope ({single ? unitLabel(single.unit) : ""})
          </h3>
          <PriceLineChart
            data={chartData}
            yLabel={single ? unitLabel(single.unit) : "₹"}
            series={[
              { key: "avg", name: "Mean", color: "var(--color-chart-1)" },
              { key: "min", name: "Minimum", color: "var(--color-chart-3)", dashed: true },
              { key: "max", name: "Maximum", color: "var(--color-chart-2)", dashed: true },
            ]}
          />
        </section>
      ) : null}

      <section className="mt-6" aria-label="Record table">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold">Records ({Math.min(rows.length, 120)} shown)</h3>
          <ConfidenceLegend />
        </div>
        <div className="mt-2 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[52rem] text-sm">
            <caption className="sr-only">Filtered price records</caption>
            <thead className="bg-secondary text-left">
              <tr>
                {["Period", "District", "Market", "Variety", "Form", "Stage", "Package", "Value", "Confidence"].map(
                  (h) => (
                    <th key={h} scope="col" className="whitespace-nowrap px-3 py-2">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 120).map((r: PriceRecord) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="tabular whitespace-nowrap px-3 py-1.5">{r.observationDate}</td>
                  <td className="whitespace-nowrap px-3 py-1.5">{r.district}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-muted-foreground">{r.market}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 font-semibold">{r.variety}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-xs">
                    {r.commodity} / {r.processing}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-xs">{r.marketStage}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-xs">{r.packageType}</td>
                  <td className="tabular whitespace-nowrap px-3 py-1.5 font-bold">
                    {r.value.toFixed(2)} {unitLabel(r.unit)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5">
                    <ConfidenceBadge level={r.confidence} short />
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-muted-foreground">
                    No records match these filters. That is an unavailability, not a zero price.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}