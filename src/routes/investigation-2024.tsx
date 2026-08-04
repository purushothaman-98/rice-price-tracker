import { createFileRoute } from "@tanstack/react-router";
import { investigationSections } from "@/data/articles";
import { investigationClaims } from "@/data/events";
import { tncscProcurement } from "@/data/prices";
import {
  Citation,
  DemoBanner,
  KolamRule,
  PullQuote,
  SectionHeading,
} from "@/components/site/Editorial";
import { PriceLineChart } from "@/components/site/PriceChart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/investigation-2024")({
  head: () => ({
    meta: [
      { title: "The 2023–24 Rice Price Investigation — Rice Price Tracker" },
      {
        name: "description",
        content:
          "How thin mill stocks, weak arrivals, Cauvery stress and a 21% fall in TNCSC procurement produced Tamil Nadu's 2024 rice price shock — with every claim fact-checked.",
      },
      { property: "og:title", content: "The 2023–24 Rice Price Investigation" },
      {
        property: "og:description",
        content: "A chapter-by-chapter account of Tamil Nadu's 2024 rice shock, with a fact-check rail.",
      },
    ],
  }),
  component: Investigation,
});

const verdictStyle: Record<string, string> = {
  supported: "border-paddy bg-paddy/15",
  "partly-true": "border-turmeric bg-turmeric/20",
  unsupported: "border-destructive bg-destructive/10",
  unknown: "border-muted-foreground/50 bg-muted",
};

const procData = tncscProcurement.map((p) => ({ label: p.season, tonnes: p.lakhTonnes }));

function Investigation() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />

      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Module 06 · Investigation</p>
        <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">
          The year Tamil Nadu&apos;s rice market ran thin
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Between mid-2023 and mid-2024, the retail benchmark climbed from about ₹52 to ₹61.75 a
          kilo. Seven things happened at once. Only some of them can be shown from published data.
        </p>
        <Citation
          className="mt-4"
          sourceTitle="Paddy procurement summary and retail price monitoring"
          publisher="TNCSC and Department of Consumer Affairs"
          date="2026-03-31"
        />
      </header>

      <KolamRule className="my-8" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          {investigationSections.map((s) => (
            <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
              <p className="eyebrow">{s.eyebrow}</p>
              <h3 className="mt-1 text-2xl font-bold">{s.heading}</h3>
              {s.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-base leading-relaxed">
                  {p}
                </p>
              ))}
              {s.stat ? (
                <div className="mt-4 inline-block border-l-4 border-maroon bg-card px-4 py-3">
                  <p className="tabular text-3xl font-extrabold text-maroon">{s.stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.stat.label}
                  </p>
                </div>
              ) : null}
              {s.id === "s4" ? (
                <div className="mt-5 border border-border bg-card p-4">
                  <h4 className="text-sm font-bold">TNCSC procurement by season (lakh tonnes)</h4>
                  <PriceLineChart
                    height={260}
                    yLabel="lakh t"
                    data={procData}
                    series={[
                      { key: "tonnes", name: "Procurement", color: "var(--color-chart-3)" },
                    ]}
                    markers={[{ x: "2023–24", label: "Shock year" }]}
                  />
                </div>
              ) : null}
              {s.id === "s6" ? (
                <PullQuote cite="Rice Price Tracker · interpretation">
                  Disclosure orders tell you who holds the rice. They do not, on their own, make
                  anyone sell it.
                </PullQuote>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="border-4 border-double border-maroon bg-card p-4">
            <h3 className="text-lg font-bold">Fact-check rail</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Every claim commonly made about this episode, graded against what published data can
              actually show.
            </p>
            <ul className="mt-3 space-y-3">
              {investigationClaims.map((c) => (
                <li key={c.id} className={cn("border-l-4 p-3", verdictStyle[c.verdict])}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em]">
                    {c.verdict.replace("-", " ")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{c.claim}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.reasoning}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <KolamRule className="my-8" />

      <SectionHeading
        eyebrow="What we still do not know"
        title="The gaps that keep this story unfinished"
        intro="We publish these openly so readers can judge how much weight our interpretation deserves."
      />
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          "Mill-level stock positions before February 2024 were never published.",
          "Inter-state arrival volumes into Tamil Nadu are not measured at usable frequency.",
          "There is no official wholesale-to-retail margin series for rice in Tamil Nadu.",
          "District-level Direct Purchase Centre performance is not published in a comparable form.",
          "The split between reduced production and private diversion cannot be resolved with public data.",
          "Tamil Nadu-specific OMSS and Bharat Rice offtake volumes are not disclosed.",
        ].map((g) => (
          <li key={g} className="border border-dashed border-muted-foreground/50 bg-muted p-3 text-sm">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}