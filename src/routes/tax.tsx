import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBanner, KolamRule, SectionHeading } from "@/components/site/Editorial";

export const Route = createFileRoute("/tax")({
  head: () => ({
    meta: [
      { title: "Tax & Package Explainer — Rice Price Tracker" },
      {
        name: "description",
        content:
          "VAT exemption before GST, 5% on branded unit containers from July 2017, and pre-packaged and labelled rice from 18 July 2022 — with a calculator that decomposes a GST-inclusive MRP.",
      },
      { property: "og:title", content: "Rice, GST and Packaging — Tamil Nadu" },
      {
        property: "og:description",
        content: "What is actually taxed when you buy rice, and why GST does not explain ₹10–₹17/kg spikes.",
      },
    ],
  }),
  component: TaxExplainer,
});

function TaxExplainer() {
  const [mrp, setMrp] = useState(60);
  const [taxable, setTaxable] = useState(true);
  const rate = 0.05;
  const base = taxable ? mrp / (1 + rate) : mrp;
  const gst = mrp - base;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 08"
        title="Tax and packaging: what is actually taxed"
        intro="Most arguments about rice and GST confuse three different regimes. Here they are separated, with the arithmetic done in front of you."
      />

      <ol className="mt-6 grid gap-3 md:grid-cols-3">
        {[
          {
            t: "Before July 2017",
            b: "Rice was VAT-exempt in Tamil Nadu. Buying rice, loose or packed, carried no state sales tax.",
          },
          {
            t: "From 1 July 2017",
            b: "Under GST, 5% applied mainly to rice sold in a unit container bearing a registered brand name. Most loose and unbranded rice stayed outside the levy.",
          },
          {
            t: "From 18 July 2022",
            b: "The trigger changed from 'registered brand' to 'pre-packaged and labelled', generally covering packs up to 25 kg. Loose rice and certain larger individual packages may remain outside the levy.",
          },
        ].map((s, i) => (
          <li key={s.t} className="border border-border bg-card p-4">
            <p className="eyebrow">Phase {i + 1}</p>
            <h2 className="mt-1 text-lg font-bold">{s.t}</h2>
            <p className="mt-2 text-sm leading-relaxed">{s.b}</p>
          </li>
        ))}
      </ol>

      <KolamRule className="my-8" />

      <section className="grid gap-6 lg:grid-cols-2" aria-labelledby="calc">
        <div>
          <SectionHeading
            id="calc"
            eyebrow="Calculator"
            title="Decompose a GST-inclusive price"
            intro="If — and only if — your pack is pre-packaged and labelled within the qualifying limits, the printed price already contains 5% GST. Untick the box to see an untaxed loose purchase."
          />
          <div className="mt-4 border border-border bg-card p-4">
            <label htmlFor="mrp" className="eyebrow">
              Printed price you paid (₹ per kg)
            </label>
            <input
              id="mrp"
              type="number"
              min={1}
              max={500}
              step={0.5}
              value={mrp}
              onChange={(e) => setMrp(Number(e.target.value) || 0)}
              className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-lg font-bold"
            />
            <div className="mt-3 flex items-start gap-2">
              <input
                id="taxable"
                type="checkbox"
                checked={taxable}
                onChange={(e) => setTaxable(e.target.checked)}
                className="mt-1 size-4 accent-[var(--color-maroon)]"
              />
              <label htmlFor="taxable" className="text-sm">
                This pack is pre-packaged and labelled, up to 25 kg, and therefore within the 5%
                levy.
              </label>
            </div>

            <dl className="mt-4 divide-y divide-border border border-border">
              <div className="flex justify-between px-3 py-2">
                <dt className="text-sm">Value before tax</dt>
                <dd className="tabular font-bold">₹{base.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt className="text-sm">GST component {taxable ? "(5%)" : "(not applicable)"}</dt>
                <dd className="tabular font-bold">₹{gst.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between bg-secondary px-3 py-2">
                <dt className="text-sm font-bold">Price you paid</dt>
                <dd className="tabular font-bold">₹{mrp.toFixed(2)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              This calculator does not assert that your purchase was taxed. Loose rice weighed out
              at a shop counter is generally outside the levy.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Proportion"
            title="Why GST is not the spike"
            intro="A tax that has not changed since July 2022 cannot explain a price that changed last month."
          />
          <div className="mt-4 space-y-3">
            <div className="border-l-4 border-turmeric bg-turmeric/10 p-4">
              <p className="tabular text-3xl font-extrabold">₹{(60 - 60 / 1.05).toFixed(2)}</p>
              <p className="text-sm">GST inside a ₹60/kg pre-packaged pack</p>
            </div>
            <div className="border-l-4 border-destructive bg-destructive/10 p-4">
              <p className="tabular text-3xl font-extrabold">₹10–₹17</p>
              <p className="text-sm">Typical size of the market movements people are complaining about</p>
            </div>
            <p className="text-sm leading-relaxed">
              The tax is roughly a sixth of the movement, it applies only to qualifying packs, and
              it has been constant for four years. Supply, arrivals, procurement and trade margins
              do the work. Saying so is not a defence of the levy — it is a refusal to blame the
              wrong thing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}