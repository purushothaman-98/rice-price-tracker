import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/data/articles";
import { timeline } from "@/data/events";
import { DemoBanner, KolamRule, SectionHeading } from "@/components/site/Editorial";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom & Fact Checks — Rice Price Tracker" },
      {
        name: "description",
        content:
          "Explainers, analysis and fact checks on Tamil Nadu rice prices, each with an explicit list of what we know and what we do not.",
      },
      { property: "og:title", content: "Newsroom & Fact Checks — Rice Price Tracker" },
      {
        property: "og:description",
        content: "Rice price journalism with variety, unit and uncertainty stated up front.",
      },
    ],
  }),
  component: Newsroom,
});

const kindStyle: Record<string, string> = {
  explainer: "bg-paddy text-paddy-foreground",
  "fact-check": "bg-destructive text-destructive-foreground",
  analysis: "bg-maroon text-maroon-foreground",
  timeline: "bg-turmeric text-turmeric-foreground",
};

function Newsroom() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 10"
        title="Newsroom"
        intro="We do not publish a price-hike headline without saying which variety, which unit and which market stage it refers to. Every piece carries its own uncertainty."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {articles.map((a) => (
          <article key={a.slug} className="flex flex-col border border-border bg-card p-4">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
              <span
                className={`shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${kindStyle[a.kind]}`}
              >
                {a.kind.replace("-", " ")}
              </span>
              <span className="tabular min-w-0 truncate text-xs text-muted-foreground">
                <time dateTime={a.date}>{a.date}</time> · {a.readMinutes} min read
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold leading-tight">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.standfirst}</p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="border-l-4 border-paddy bg-paddy/10 p-2">
                <p className="eyebrow">What we know</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed">
                  {a.known.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
              <div className="border-l-4 border-muted-foreground/50 bg-muted p-2">
                <p className="eyebrow">What we do not know</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed">
                  {a.unknown.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>

            {a.href ? (
              <Link
                to={a.href}
                className="mt-4 inline-flex min-h-11 items-center self-start border border-maroon px-3 text-sm font-bold hover:bg-maroon hover:text-maroon-foreground"
              >
                Continue to the module
              </Link>
            ) : null}
          </article>
        ))}
      </div>

      <KolamRule className="my-8" />

      <section aria-labelledby="tl2">
        <SectionHeading id="tl2" eyebrow="Reference" title="Running timeline" />
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {timeline.map((e) => (
            <li key={e.id} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 border-b border-border py-2">
              <time dateTime={e.date} className="tabular text-xs text-muted-foreground">
                {e.date}
              </time>
              <p className="text-sm font-semibold">{e.label}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}