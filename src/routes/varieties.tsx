import { createFileRoute } from "@tanstack/react-router";
import { varieties, gradeAWarning } from "@/data/varieties";
import { DemoBanner, KolamRule, SectionHeading } from "@/components/site/Editorial";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/varieties")({
  head: () => ({
    meta: [
      { title: "Variety Atlas — Tamil Nadu Rice Price Tracker" },
      {
        name: "description",
        content:
          "Ponni, BPT 5204, RNR, HMT, Kollam, boiled and raw rice, PDS rice: aliases, origin, milling form, tax context and known data gaps for every variety sold in Tamil Nadu.",
      },
      { property: "og:title", content: "Variety Atlas — Tamil Nadu Rice Price Tracker" },
      {
        property: "og:description",
        content: "What each rice variety in Tamil Nadu actually is, where it comes from, and what we cannot measure about it.",
      },
    ],
  }),
  component: VarietyAtlas,
});

const dependenceLabel: Record<string, string> = {
  high: "High dependence on other states",
  medium: "Partial dependence on other states",
  low: "Mostly Tamil Nadu supply",
  "not-applicable": "Not applicable",
};

function VarietyAtlas() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 03"
        title="Variety atlas"
        intro="A rice price is meaningless without knowing which rice. These cards set out what each market name covers, where the paddy comes from, how it is milled, how it is taxed, and what we still cannot measure."
      />

      <div
        role="note"
        className="mt-6 flex gap-3 border-l-4 border-destructive bg-destructive/10 p-4"
      >
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div>
          <h2 className="text-base font-bold">Grade A paddy is not the same as fine rice</h2>
          <p className="mt-1 text-sm leading-relaxed">{gradeAWarning}</p>
        </div>
      </div>

      <KolamRule className="my-8" />

      <div className="grid gap-4 md:grid-cols-2">
        {varieties.map((v) => (
          <article key={v.slug} id={v.slug} className="border border-border bg-card p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
              <div className="min-w-0">
                <h2 className="text-xl font-bold">{v.name}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Also called: {v.aliases.join(", ")}
                </p>
              </div>
              <span className="shrink-0 border border-maroon px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-maroon">
                {v.grade}
              </span>
            </div>

            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div>
                <dt className="eyebrow">Typical use</dt>
                <dd>{v.typicalUse}</dd>
              </div>
              <div>
                <dt className="eyebrow">Paddy origin</dt>
                <dd>{v.paddyOrigin}</dd>
              </div>
              <div>
                <dt className="eyebrow">Inter-state dependence</dt>
                <dd>{dependenceLabel[v.interstateDependence]}</dd>
              </div>
              <div>
                <dt className="eyebrow">Milling form</dt>
                <dd>{v.millingForm}</dd>
              </div>
              <div>
                <dt className="eyebrow">Price sources</dt>
                <dd>{v.priceSources.join("; ")}</dd>
              </div>
              <div>
                <dt className="eyebrow">Taxation context</dt>
                <dd>{v.taxContext}</dd>
              </div>
              <div>
                <dt className="eyebrow">Known data gaps</dt>
                <dd>
                  <ul className="list-disc space-y-1 pl-5">
                    {v.dataGaps.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}