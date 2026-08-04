import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tnAnnualRetail, cpiIndex, tncscProcurement, mspTable } from "@/data/prices";
import { timeline } from "@/data/events";
import { ConfidenceBadge } from "@/components/site/ConfidenceBadge";
import {
  ComparabilityWarning,
  DemoBanner,
  KolamRule,
  SectionHeading,
} from "@/components/site/Editorial";
import { PriceLineChart } from "@/components/site/PriceChart";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Price History 2014–Present — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "Annotated Tamil Nadu rice price history from 2014, with GST changes, export restrictions, Cauvery stress, the 2024 shock and the 2024–25 recovery marked on the chart.",
      },
      { property: "og:title", content: "Price History 2014–Present — Rice Price Tracker" },
      {
        property: "og:description",
        content: "Twelve years of Tamil Nadu rice prices with policy and event markers, nominal and inflation-adjusted.",
      },
    ],
  }),
  component: History,
});

const BASE_YEAR = "2018";

function History() {
  const [adjusted, setAdjusted] = useState(false);

  const data = tnAnnualRetail.map((p) => {
    const cpi = cpiIndex[p.period] ?? 100;
    const real = (p.value * (cpiIndex[BASE_YEAR] ?? 100)) / cpi;
    return {
      label: p.label,
      nominal: p.value,
      real: +real.toFixed(2),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 04"
        title="Price history, 2014 to present"
        intro="Annual averages for the Tamil Nadu retail rice benchmark, annotated with the tax, trade, weather and procurement events that people most often invoke to explain them."
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <input
            id="adjust"
            type="checkbox"
            checked={adjusted}
            onChange={(e) => setAdjusted(e.target.checked)}
            className="size-4 accent-[var(--color-maroon)]"
          />
          <label htmlFor="adjust" className="text-sm font-semibold">
            Show inflation-adjusted view (2018 rupees)
          </label>
        </div>
        <span className="text-xs text-muted-foreground">
          Deflator is an approximate CPI index included for demonstration.
        </span>
      </div>

      <div className="mt-4 border border-border bg-card p-4">
        <PriceLineChart
          height={380}
          data={data}
          series={
            adjusted
              ? [
                  { key: "nominal", name: "Nominal ₹/kg", color: "var(--color-chart-1)" },
                  { key: "real", name: "In 2018 rupees", color: "var(--color-chart-4)", dashed: true },
                ]
              : [{ key: "nominal", name: "Nominal ₹/kg", color: "var(--color-chart-1)" }]
          }
          markers={[
            { x: "2017", label: "GST begins" },
            { x: "2022", label: "Pre-packaged 5%" },
            { x: "2024", label: "Shock peak" },
            { x: "2026 (Jan–Jul)", label: "Fine-rice shock" },
          ]}
        />
        <ComparabilityWarning
          className="mt-3"
          reasons={[
            "2023 and 2026 are partial-year averages (January–June and January–July). They are plotted for continuity but must not be read as full-year values.",
            "Values before 2018 are site estimates pending verification against published series.",
          ]}
        />
      </div>

      <KolamRule className="my-8" />

      <section aria-labelledby="tl">
        <SectionHeading id="tl" eyebrow="Annotations" title="What happened, and when" />
        <ol className="mt-4 border-l-2 border-maroon/40 pl-4">
          {timeline.map((e) => (
            <li key={e.id} className="relative pb-6">
              <span
                aria-hidden="true"
                className="absolute -left-[1.42rem] top-1.5 size-3 rounded-full border-2 border-maroon bg-background"
              />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <h3 className="min-w-0 text-base font-bold">{e.label}</h3>
                <ConfidenceBadge level={e.confidence} short className="shrink-0" />
              </div>
              <p className="tabular text-xs uppercase tracking-wider text-muted-foreground">
                <time dateTime={e.date}>{e.date}</time> · {e.category}
              </p>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <KolamRule className="my-8" />

      <section aria-labelledby="proc" className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="proc"
            eyebrow="Supply side"
            title="TNCSC paddy procurement"
            intro="Lakh tonnes procured through Direct Purchase Centres. The 2023–24 dip and the 2024–25 recovery frame both price episodes."
          />
          <table className="mt-4 w-full border border-border bg-card text-sm">
            <caption className="sr-only">TNCSC paddy procurement by season</caption>
            <thead className="bg-secondary text-left">
              <tr>
                <th scope="col" className="px-3 py-2">Season</th>
                <th scope="col" className="px-3 py-2">Lakh tonnes</th>
                <th scope="col" className="px-3 py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {tncscProcurement.map((p) => (
                <tr key={p.season} className="border-t border-border">
                  <td className="px-3 py-2 font-semibold">{p.season}</td>
                  <td className="tabular px-3 py-2">{p.lakhTonnes.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <ConfidenceBadge level={p.confidence} short />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <SectionHeading
            eyebrow="Procurement price"
            title="MSP and the Tamil Nadu incentive"
            intro="₹ per quintal of paddy. This is what farmers are paid at Direct Purchase Centres, not what consumers pay for rice."
          />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] border border-border bg-card text-sm">
              <caption className="sr-only">MSP for common and Grade A paddy with state incentive</caption>
              <thead className="bg-secondary text-left">
                <tr>
                  <th scope="col" className="px-3 py-2">Season</th>
                  <th scope="col" className="px-3 py-2">Common</th>
                  <th scope="col" className="px-3 py-2">Grade A</th>
                  <th scope="col" className="px-3 py-2">TN incentive</th>
                  <th scope="col" className="px-3 py-2">Grade A total</th>
                </tr>
              </thead>
              <tbody>
                {mspTable.map((m) => (
                  <tr key={m.season} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold">{m.season}</td>
                    <td className="tabular px-3 py-2">₹{m.commonMsp}</td>
                    <td className="tabular px-3 py-2">₹{m.gradeAMsp}</td>
                    <td className="tabular px-3 py-2">₹{m.tnIncentive}</td>
                    <td className="tabular px-3 py-2 font-bold">₹{m.gradeAMsp + m.tnIncentive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            All values are ₹/quintal of paddy. Dividing by 100 does not give a rice price: milling
            yield, processing, transport, packing and trade margin all sit in between.
          </p>
        </div>
      </section>
    </div>
  );
}