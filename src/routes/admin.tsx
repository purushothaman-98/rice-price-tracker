import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBanner, SectionHeading } from "@/components/site/Editorial";
import { toCsv, downloadCsv } from "@/data/prices";
import type { PriceRecord } from "@/data/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Data Entry Prototype — Rice Price Tracker" },
      {
        name: "description",
        content:
          "Local prototype for adding rice price and source records with unit validation, comparability groups and confidence labelling.",
      },
      { property: "og:title", content: "Data Entry Prototype — Rice Price Tracker" },
      {
        property: "og:description",
        content: "A local-only admin screen for capturing price and source records with validation.",
      },
    ],
  }),
  component: Admin,
});

interface Draft {
  observationDate: string;
  publicationDate: string;
  state: string;
  district: string;
  market: string;
  variety: string;
  commodity: PriceRecord["commodity"];
  processing: PriceRecord["processing"];
  packageType: PriceRecord["packageType"];
  marketStage: PriceRecord["marketStage"];
  unit: PriceRecord["unit"];
  value: string;
  conversionNote: string;
  sourceUrl: string;
  sourceType: string;
  confidence: PriceRecord["confidence"];
  notes: string;
  comparabilityGroup: string;
}

const empty: Draft = {
  observationDate: "",
  publicationDate: "",
  state: "Tamil Nadu",
  district: "",
  market: "",
  variety: "",
  commodity: "milled-rice",
  processing: "raw",
  packageType: "loose",
  marketStage: "retail",
  unit: "INR/kg",
  value: "",
  conversionNote: "",
  sourceUrl: "",
  sourceType: "government-dataset",
  confidence: "official",
  notes: "",
  comparabilityGroup: "",
};

function validate(d: Draft, existing: Draft[]): string[] {
  const errs: string[] = [];
  if (!d.observationDate) errs.push("Observation date is required.");
  if (!d.publicationDate) errs.push("Publication date is required.");
  if (!d.variety) errs.push("Variety is required.");
  if (!d.value || Number.isNaN(Number(d.value))) errs.push("Value must be a number.");
  if (d.confidence !== "unavailable" && !d.sourceUrl)
    errs.push("A source URL is required unless the record is marked Unavailable.");
  if (d.commodity === "paddy" && d.unit === "INR/kg" && !d.conversionNote)
    errs.push(
      "Paddy is normally quoted in ₹/quintal. Entering ₹/kg requires conversion metadata in the conversion note field.",
    );
  const group = d.comparabilityGroup || `${d.commodity}|${d.marketStage}|${d.unit}`;
  const clash = existing.find(
    (e) =>
      (e.comparabilityGroup || `${e.commodity}|${e.marketStage}|${e.unit}`) === group &&
      e.unit !== d.unit,
  );
  if (clash)
    errs.push(
      "This comparability group already contains records in a different unit. Mixing ₹/kg with ₹/quintal in one group is blocked without conversion metadata.",
    );
  return errs;
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{label}</span>
      {children}
      {hint ? <span className="text-[11px] text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

const inputCls = "min-h-11 border border-input bg-card px-2 text-sm";

function Admin() {
  const [draft, setDraft] = useState<Draft>(empty);
  const [rows, setRows] = useState<Draft[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const set = (k: keyof Draft, v: string) => setDraft((p) => ({ ...p, [k]: v }) as Draft);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(draft, rows);
    setErrors(errs);
    if (errs.length) return;
    setRows((r) => [{ ...draft }, ...r]);
    setDraft(empty);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <DemoBanner />
      <SectionHeading
        className="mt-6"
        eyebrow="Module 11"
        title="Data entry prototype"
        intro="A local-only capture screen. Records stay in this browser session and are not published. Validation blocks the mistakes that most often corrupt price datasets."
      />

      <form onSubmit={submit} className="mt-6 grid gap-3 border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Observation date">
          <input type="date" value={draft.observationDate} onChange={(e) => set("observationDate", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Publication date">
          <input type="date" value={draft.publicationDate} onChange={(e) => set("publicationDate", e.target.value)} className={inputCls} />
        </Field>
        <Field label="State">
          <input value={draft.state} onChange={(e) => set("state", e.target.value)} className={inputCls} />
        </Field>
        <Field label="District">
          <input value={draft.district} onChange={(e) => set("district", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Market">
          <input value={draft.market} onChange={(e) => set("market", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Variety">
          <input value={draft.variety} onChange={(e) => set("variety", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Commodity form">
          <select value={draft.commodity} onChange={(e) => set("commodity", e.target.value)} className={inputCls}>
            <option value="milled-rice">Milled rice</option>
            <option value="paddy">Paddy</option>
          </select>
        </Field>
        <Field label="Processing">
          <select value={draft.processing} onChange={(e) => set("processing", e.target.value)} className={inputCls}>
            <option value="raw">Raw</option>
            <option value="boiled">Boiled</option>
            <option value="parboiled">Parboiled</option>
            <option value="not-applicable">Not applicable</option>
          </select>
        </Field>
        <Field label="Package type">
          <select value={draft.packageType} onChange={(e) => set("packageType", e.target.value)} className={inputCls}>
            <option value="loose">Loose</option>
            <option value="pre-packaged">Pre-packaged and labelled</option>
            <option value="unspecified">Unspecified</option>
          </select>
        </Field>
        <Field label="Market stage">
          <select value={draft.marketStage} onChange={(e) => set("marketStage", e.target.value)} className={inputCls}>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
            <option value="farmgate">Farmgate</option>
            <option value="procurement">Procurement</option>
            <option value="pds">PDS</option>
          </select>
        </Field>
        <Field label="Unit">
          <select value={draft.unit} onChange={(e) => set("unit", e.target.value)} className={inputCls}>
            <option value="INR/kg">₹/kg</option>
            <option value="INR/quintal">₹/quintal</option>
          </select>
        </Field>
        <Field label="Value">
          <input type="number" step="0.01" value={draft.value} onChange={(e) => set("value", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Conversion metadata" hint="Required when a unit is not the conventional one for this commodity.">
          <input value={draft.conversionNote} onChange={(e) => set("conversionNote", e.target.value)} className={inputCls} placeholder="e.g. divided by 100 from ₹/quintal" />
        </Field>
        <Field label="Source URL">
          <input type="url" value={draft.sourceUrl} onChange={(e) => set("sourceUrl", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Source type">
          <select value={draft.sourceType} onChange={(e) => set("sourceType", e.target.value)} className={inputCls}>
            <option value="government-dataset">Government dataset</option>
            <option value="parliamentary-answer">Parliamentary answer</option>
            <option value="press-release">Press release</option>
            <option value="state-order">Order or notification</option>
            <option value="news-report">News report</option>
            <option value="site-estimate">Site estimate</option>
          </select>
        </Field>
        <Field label="Status">
          <select value={draft.confidence} onChange={(e) => set("confidence", e.target.value)} className={inputCls}>
            <option value="official">Official data</option>
            <option value="reported">Reported market quote</option>
            <option value="estimated">Estimated</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </Field>
        <Field label="Comparability group" hint="Leave blank to derive from commodity, stage and unit.">
          <input value={draft.comparabilityGroup} onChange={(e) => set("comparabilityGroup", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Notes">
          <textarea value={draft.notes} onChange={(e) => set("notes", e.target.value)} className="min-h-11 border border-input bg-card px-2 py-1 text-sm" rows={2} />
        </Field>

        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
          <button type="submit" className="min-h-11 bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            Add record
          </button>
          <button
            type="button"
            disabled={rows.length === 0}
            onClick={() =>
              downloadCsv(
                "admin-draft-records.csv",
                toCsv(
                  rows.map((r, i) => ({
                    id: `draft-${i}`,
                    observationDate: r.observationDate,
                    periodicity: "daily",
                    state: r.state,
                    district: r.district,
                    market: r.market,
                    variety: r.variety,
                    commodity: r.commodity,
                    processing: r.processing,
                    grade: "unspecified",
                    packageType: r.packageType,
                    marketStage: r.marketStage,
                    unit: r.unit,
                    value: Number(r.value),
                    confidence: r.confidence,
                    sourceId: r.sourceUrl,
                    comparabilityGroup:
                      r.comparabilityGroup || `${r.commodity}|${r.marketStage}|${r.unit}`,
                    demo: true,
                  })) as PriceRecord[],
                ),
              )
            }
            className="min-h-11 border border-border px-4 text-sm font-bold disabled:opacity-50"
          >
            Export drafts as CSV
          </button>
        </div>
      </form>

      {errors.length ? (
        <div role="alert" className="mt-4 border-l-4 border-destructive bg-destructive/10 p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-destructive">
            Record rejected
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <section className="mt-6" aria-label="Draft records">
        <h2 className="text-base font-bold">Session records ({rows.length})</h2>
        <div className="mt-2 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[44rem] text-sm">
            <caption className="sr-only">Records captured in this browser session</caption>
            <thead className="bg-secondary text-left">
              <tr>
                {["Observed", "District", "Variety", "Form", "Stage", "Value", "Status"].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.observationDate}-${i}`} className="border-t border-border">
                  <td className="tabular px-3 py-1.5">{r.observationDate}</td>
                  <td className="px-3 py-1.5">{r.district}</td>
                  <td className="px-3 py-1.5 font-semibold">{r.variety}</td>
                  <td className="px-3 py-1.5 text-xs">{r.commodity} / {r.processing}</td>
                  <td className="px-3 py-1.5 text-xs">{r.marketStage}</td>
                  <td className="tabular px-3 py-1.5 font-bold">
                    {r.value} {r.unit === "INR/kg" ? "₹/kg" : "₹/quintal"}
                  </td>
                  <td className="px-3 py-1.5 text-xs">{r.confidence}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">
                    No records captured yet in this session.
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