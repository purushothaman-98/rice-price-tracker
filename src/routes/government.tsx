import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { powerTable } from "@/data/events";
import { mspTable } from "@/data/prices";
import { DemoBanner, KolamRule, SectionHeading } from "@/components/site/Editorial";
import { ArrowDown, Check, Minus } from "lucide-react";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: [
      { title: "What Government Can Actually Do — Rice Price Tracker" },
      {
        name: "description",
        content:
          "MSP, the Tamil Nadu procurement incentive, ₹0/kg PDS rice, stock declaration orders, GST, export policy, OMSS and Bharat Rice: what each lever does and which are actually used.",
      },
      { property: "og:title", content: "What Government Can Actually Do About Rice Prices" },
      {
        property: "og:description",
        content: "An interactive explainer of every rice price lever in Tamil Nadu, and whether it is used.",
      },
    ],
  }),
  component: GovernmentRole,
});

const latest = mspTable[mspTable.length - 1]!;

const steps = [
  {
    id: "msp",
    title: "Union MSP for paddy",
    value: `₹${latest.gradeAMsp}/quintal (Grade A), ₹${latest.commonMsp}/quintal (Common)`,
    body: "Announced nationally before each season. It sets the floor at which government agencies buy paddy — not rice, and not from shops.",
  },
  {
    id: "incentive",
    title: "+ Tamil Nadu state incentive",
    value: `₹${latest.tnIncentive}/quintal`,
    body: "Tamil Nadu adds an incentive on top of MSP at Direct Purchase Centres to keep procurement competitive with private buyers.",
  },
  {
    id: "dpc",
    title: "= Price paid to the farmer at a DPC",
    value: `₹${latest.gradeAMsp + latest.tnIncentive}/quintal for Grade A paddy`,
    body: "If private traders quote above this, paddy flows away from procurement. That is exactly what the 2023–24 procurement decline looks like.",
  },
  {
    id: "mill",
    title: "→ Milling, transport, packing, trade margin",
    value: "Not publicly measured",
    body: "Between farmgate paddy and retail rice sit milling yield, drying, transport, packing and several trade margins. No official series decomposes this in Tamil Nadu.",
  },
  {
    id: "outcome",
    title: "Two different end prices",
    value: "₹0/kg through PDS · market-determined in private retail",
    body: "PDS rice is issued free to eligible cardholders. Rice bought from a private shop is set by the market, and almost no routine instrument directly caps it.",
  },
];

function GovernmentRole() {
  const [open, setOpen] = useState<string>("msp");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 05"
        title="The government's role, lever by lever"
        intro="Two prices are set by the state — what farmers get at a procurement centre and what cardholders pay in a fair price shop. The price on a private shop's shelf is not one of them."
      />

      <section className="mt-6" aria-label="Price formation flow">
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.id}>
              <div className="border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={open === s.id}
                  onClick={() => setOpen(open === s.id ? "" : s.id)}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 text-left hover:bg-secondary"
                >
                  <span className="tabular shrink-0 border border-maroon px-2 py-0.5 text-xs font-bold text-maroon">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold">{s.title}</span>
                    <span className="tabular block text-xs text-muted-foreground">{s.value}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-muted-foreground">
                    {open === s.id ? <Minus className="size-4" /> : <ArrowDown className="size-4" />}
                  </span>
                </button>
                {open === s.id ? (
                  <p className="border-t border-border px-3 py-3 text-sm leading-relaxed">{s.body}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <KolamRule className="my-8" />

      <section aria-labelledby="instruments">
        <SectionHeading
          id="instruments"
          eyebrow="Instruments"
          title="Different powers do different things"
          intro="These are often bundled together in public argument. They are not interchangeable, and most of them cannot move a retail price directly."
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Essential Commodities Act", "Enables stock limits and control orders. Availability of a power is not the same as its use."],
            ["Stock declaration orders", "Require traders and millers to disclose holdings. Disclosure, not a cap."],
            ["Legal Metrology / MRP", "Enforces correct declarations and net quantity on packs. It does not set the price level."],
            ["GST", "5% on qualifying pre-packaged and labelled rice since 18 July 2022. Unchanged rates cannot cause a spike."],
            ["Export policy", "Restricting exports raises domestic availability at the margin; pass-through to retail is slow and partial."],
            ["OMSS", "FCI releases stock into the open market. Tamil Nadu-specific offtake is not separately published."],
            ["Bharat Rice", "Subsidised retail rice sold through NCCF, NAFED and Kendriya Bhandar. Volumes are small relative to demand."],
            ["TNCSC procurement", "State buying at MSP plus incentive. Supports farmers and fills the PDS pipeline."],
            ["NCCF purchases", "Central agency buying used to supply subsidised retail channels."],
            ["Crop compensation", "Relief for damaged crop. It addresses farm income, not consumer prices."],
          ].map(([t, b]) => (
            <div key={t} className="border border-border bg-card p-3">
              <h3 className="text-sm font-bold">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <KolamRule className="my-8" />

      <section aria-labelledby="power">
        <SectionHeading
          id="power"
          eyebrow="Accountability"
          title="Power available versus power actually used"
        />
        <div className="mt-4 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[48rem] text-sm">
            <caption className="sr-only">Comparison of available and exercised powers</caption>
            <thead className="bg-secondary text-left">
              <tr>
                <th scope="col" className="px-3 py-2">Power</th>
                <th scope="col" className="px-3 py-2">Authority</th>
                <th scope="col" className="px-3 py-2">Available</th>
                <th scope="col" className="px-3 py-2">Actually used</th>
              </tr>
            </thead>
            <tbody>
              {powerTable.map((r) => (
                <tr key={r.power} className="border-t border-border align-top">
                  <th scope="row" className="px-3 py-2 text-left font-bold">{r.power}</th>
                  <td className="px-3 py-2 text-muted-foreground">{r.authority}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1">
                      <Check aria-hidden="true" className="size-3.5 text-paddy" />
                      {r.available}
                    </span>
                  </td>
                  <td className="px-3 py-2">{r.used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}