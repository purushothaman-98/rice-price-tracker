import type { PriceRecord, Periodicity, Unit } from "./types";

// ---------------------------------------------------------------------------
// DEMONSTRATION DATA — needs live verification before publication use.
// Figures below are indicative values compiled for interface development.
// ---------------------------------------------------------------------------

export const DEMO_NOTICE =
  "Demonstration dataset. Values are illustrative and awaiting connection to verified live feeds.";

export interface SeriesPoint {
  period: string;
  label: string;
  value: number;
  periodicity: Periodicity;
  confidence: PriceRecord["confidence"];
  note?: string;
}

/** Tamil Nadu retail rice benchmark — annual averages (₹/kg). */
export const tnAnnualRetail: SeriesPoint[] = [
  { period: "2014", label: "2014", value: 29.4, periodicity: "annual", confidence: "estimated" },
  { period: "2015", label: "2015", value: 30.1, periodicity: "annual", confidence: "estimated" },
  { period: "2016", label: "2016", value: 31.2, periodicity: "annual", confidence: "estimated" },
  { period: "2017", label: "2017", value: 32.6, periodicity: "annual", confidence: "estimated" },
  { period: "2018", label: "2018", value: 34.28, periodicity: "annual", confidence: "official" },
  { period: "2019", label: "2019", value: 38.86, periodicity: "annual", confidence: "official" },
  { period: "2020", label: "2020", value: 46.08, periodicity: "annual", confidence: "official" },
  { period: "2021", label: "2021", value: 46.79, periodicity: "annual", confidence: "official" },
  { period: "2022", label: "2022", value: 48.12, periodicity: "annual", confidence: "official" },
  {
    period: "2023",
    label: "2023 (Jan–Jun)",
    value: 51.99,
    periodicity: "partial-year",
    confidence: "official",
    note: "Partial-year average, not comparable with full-year figures.",
  },
  {
    period: "2024",
    label: "2024",
    value: 58.4,
    periodicity: "annual",
    confidence: "estimated",
    note: "Estimated from monthly demo series.",
  },
  {
    period: "2025",
    label: "2025",
    value: 56.2,
    periodicity: "annual",
    confidence: "estimated",
  },
  {
    period: "2026",
    label: "2026 (Jan–Jul)",
    value: 57.1,
    periodicity: "partial-year",
    confidence: "estimated",
    note: "Partial-year average through July 2026.",
  },
];

/** Monthly retail benchmark for the shock windows (₹/kg). */
export const tnMonthlyRetail: SeriesPoint[] = [
  { period: "2023-07", label: "Jul 2023", value: 52.8, periodicity: "monthly", confidence: "estimated" },
  { period: "2023-10", label: "Oct 2023", value: 54.9, periodicity: "monthly", confidence: "estimated" },
  { period: "2024-01", label: "Jan 2024", value: 57.2, periodicity: "monthly", confidence: "estimated" },
  { period: "2024-02", label: "Feb 2024", value: 58.6, periodicity: "monthly", confidence: "estimated", note: "Stock declaration order month." },
  { period: "2024-04", label: "Apr 2024", value: 60.1, periodicity: "monthly", confidence: "estimated" },
  { period: "2024-06", label: "Jun 2024", value: 61.75, periodicity: "monthly", confidence: "official", note: "Peak of the 2024 broad shock." },
  { period: "2024-09", label: "Sep 2024", value: 60.2, periodicity: "monthly", confidence: "estimated" },
  { period: "2024-12", label: "Dec 2024", value: 58.0, periodicity: "monthly", confidence: "estimated" },
  { period: "2025-06", label: "Jun 2025", value: 56.4, periodicity: "monthly", confidence: "estimated" },
  { period: "2025-12", label: "Dec 2025", value: 55.51, periodicity: "monthly", confidence: "official" },
  { period: "2026-03", label: "Mar 2026", value: 56.1, periodicity: "monthly", confidence: "estimated" },
  { period: "2026-05", label: "May 2026", value: 56.6, periodicity: "monthly", confidence: "estimated" },
  { period: "2026-07", label: "Jul 2026", value: 57.75, periodicity: "monthly", confidence: "official", note: "Fine-rice supply shock; common rice broadly steady." },
];

/** Approximate CPI deflator (2018 = 100) used for the inflation-adjusted view. */
export const cpiIndex: Record<string, number> = {
  "2014": 84,
  "2015": 88,
  "2016": 92,
  "2017": 95,
  "2018": 100,
  "2019": 104,
  "2020": 110,
  "2021": 116,
  "2022": 124,
  "2023": 132,
  "2024": 138,
  "2025": 143,
  "2026": 148,
};

export interface ProcurementRecord {
  season: string;
  lakhTonnes: number;
  confidence: PriceRecord["confidence"];
  note?: string;
}

export const tncscProcurement: ProcurementRecord[] = [
  { season: "2021–22", lakhTonnes: 42.5, confidence: "estimated" },
  { season: "2022–23", lakhTonnes: 44.22, confidence: "official" },
  { season: "2023–24", lakhTonnes: 34.96, confidence: "official", note: "Sharp decline during the shock year." },
  { season: "2024–25", lakhTonnes: 47.99, confidence: "official", note: "Harvest-led recovery." },
  { season: "2025–26", lakhTonnes: 45.1, confidence: "estimated", note: "Season in progress." },
];

export interface MspRecord {
  season: string;
  commonMsp: number; // ₹/quintal
  gradeAMsp: number; // ₹/quintal
  tnIncentive: number; // ₹/quintal
  confidence: PriceRecord["confidence"];
}

export const mspTable: MspRecord[] = [
  { season: "2021–22", commonMsp: 1940, gradeAMsp: 1960, tnIncentive: 70, confidence: "official" },
  { season: "2022–23", commonMsp: 2040, gradeAMsp: 2060, tnIncentive: 75, confidence: "official" },
  { season: "2023–24", commonMsp: 2183, gradeAMsp: 2203, tnIncentive: 75, confidence: "official" },
  { season: "2024–25", commonMsp: 2300, gradeAMsp: 2320, tnIncentive: 100, confidence: "official" },
  { season: "2025–26", commonMsp: 2369, gradeAMsp: 2389, tnIncentive: 100, confidence: "estimated" },
];

export interface DistrictSnapshot {
  district: string;
  zone: "delta" | "west" | "north" | "south" | "metro";
  retailFine: number;
  retailCommon: number;
  monthChangePct: number;
  confidence: PriceRecord["confidence"];
}

export const districtSnapshots: DistrictSnapshot[] = [
  { district: "Chennai", zone: "metro", retailFine: 64.5, retailCommon: 51.0, monthChangePct: 3.2, confidence: "reported" },
  { district: "Coimbatore", zone: "west", retailFine: 62.0, retailCommon: 49.5, monthChangePct: 2.4, confidence: "reported" },
  { district: "Madurai", zone: "south", retailFine: 60.5, retailCommon: 48.8, monthChangePct: 1.8, confidence: "reported" },
  { district: "Thanjavur", zone: "delta", retailFine: 57.9, retailCommon: 46.2, monthChangePct: 0.6, confidence: "reported" },
  { district: "Tiruchirappalli", zone: "delta", retailFine: 58.8, retailCommon: 47.1, monthChangePct: 1.1, confidence: "reported" },
  { district: "Salem", zone: "west", retailFine: 61.2, retailCommon: 49.0, monthChangePct: 2.0, confidence: "estimated" },
  { district: "Tirunelveli", zone: "south", retailFine: 59.4, retailCommon: 47.6, monthChangePct: 1.4, confidence: "estimated" },
  { district: "Vellore", zone: "north", retailFine: 60.8, retailCommon: 48.4, monthChangePct: 2.6, confidence: "estimated" },
  { district: "Erode", zone: "west", retailFine: 60.0, retailCommon: 48.1, monthChangePct: 1.7, confidence: "estimated" },
  { district: "Cuddalore", zone: "delta", retailFine: 58.2, retailCommon: 46.9, monthChangePct: 0.9, confidence: "estimated" },
  { district: "Nagapattinam", zone: "delta", retailFine: 57.4, retailCommon: 45.9, monthChangePct: 0.4, confidence: "estimated" },
  { district: "Dindigul", zone: "south", retailFine: 59.9, retailCommon: 47.9, monthChangePct: 1.6, confidence: "estimated" },
];

export interface VarietyMove {
  variety: string;
  grade: "fine" | "common";
  price: number;
  changePct: number;
  confidence: PriceRecord["confidence"];
}

export const varietyMovement: VarietyMove[] = [
  { variety: "Ponni (raw)", grade: "fine", price: 64.0, changePct: 5.4, confidence: "reported" },
  { variety: "Ponni (boiled)", grade: "fine", price: 62.5, changePct: 4.8, confidence: "reported" },
  { variety: "BPT 5204 / Sona Masoori", grade: "fine", price: 63.2, changePct: 6.1, confidence: "reported" },
  { variety: "RNR 15048", grade: "fine", price: 61.0, changePct: 4.2, confidence: "reported" },
  { variety: "HMT", grade: "fine", price: 60.4, changePct: 3.5, confidence: "estimated" },
  { variety: "Kollam (parboiled)", grade: "common", price: 49.8, changePct: 0.8, confidence: "estimated" },
  { variety: "Amman Sona", grade: "fine", price: 59.6, changePct: 3.1, confidence: "estimated" },
  { variety: "Common rice (loose)", grade: "common", price: 47.2, changePct: 0.3, confidence: "estimated" },
  { variety: "Karnataka Ponni", grade: "fine", price: 62.8, changePct: 5.0, confidence: "reported" },
];

/** Row-level records powering the Live Price Explorer. */
const districts = districtSnapshots.map((d) => d.district);
const markets: Record<string, string> = {
  Chennai: "Koyambedu Wholesale",
  Coimbatore: "Mettupalayam Road Market",
  Madurai: "Central Market",
  Thanjavur: "Thanjavur Regulated Market",
  Tiruchirappalli: "Gandhi Market",
  Salem: "Salem Main Market",
  Tirunelveli: "Palayamkottai Market",
  Vellore: "Vellore Town Market",
  Erode: "Erode Regulated Market",
  Cuddalore: "Cuddalore OT Market",
  Nagapattinam: "Nagapattinam Market",
  Dindigul: "Dindigul Market",
};

const varietyDefs: Array<{
  name: string;
  grade: PriceRecord["grade"];
  processing: PriceRecord["processing"];
  base: number;
}> = [
  { name: "Ponni", grade: "fine", processing: "raw", base: 63 },
  { name: "Ponni", grade: "fine", processing: "boiled", base: 61.5 },
  { name: "BPT 5204", grade: "fine", processing: "raw", base: 62.5 },
  { name: "RNR 15048", grade: "fine", processing: "raw", base: 60.5 },
  { name: "Kollam", grade: "common", processing: "parboiled", base: 49.5 },
  { name: "Common rice", grade: "common", processing: "raw", base: 47 },
];

const monthsBack = ["2025-12", "2026-02", "2026-04", "2026-06", "2026-07"];

function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

export const priceRecords: PriceRecord[] = (() => {
  const out: PriceRecord[] = [];
  let i = 0;
  for (const district of districts) {
    for (const v of varietyDefs) {
      for (const month of monthsBack) {
        i += 1;
        const drift = monthsBack.indexOf(month) * (v.grade === "fine" ? 0.9 : 0.15);
        const jitter = (seeded(i) - 0.5) * 3;
        const retail = +(v.base + drift + jitter).toFixed(2);
        out.push({
          id: `r-${i}`,
          observationDate: month,
          periodicity: "monthly",
          state: "Tamil Nadu",
          district,
          market: markets[district] ?? null,
          variety: v.name,
          commodity: "milled-rice",
          processing: v.processing,
          grade: v.grade,
          packageType: i % 3 === 0 ? "pre-packaged" : "loose",
          marketStage: "retail",
          unit: "INR/kg",
          value: retail,
          confidence: i % 4 === 0 ? "reported" : "estimated",
          sourceId: i % 4 === 0 ? "src-news-2026" : "src-site-estimate",
          comparabilityGroup: `milled-rice|retail|${v.grade}|INR/kg`,
          demo: true,
        });
        out.push({
          id: `w-${i}`,
          observationDate: month,
          periodicity: "monthly",
          state: "Tamil Nadu",
          district,
          market: markets[district] ?? null,
          variety: v.name,
          commodity: "milled-rice",
          processing: v.processing,
          grade: v.grade,
          packageType: "loose",
          marketStage: "wholesale",
          unit: "INR/kg",
          value: +(retail - 6 - seeded(i + 99) * 2).toFixed(2),
          confidence: "estimated",
          sourceId: "src-site-estimate",
          comparabilityGroup: `milled-rice|wholesale|${v.grade}|INR/kg`,
          demo: true,
        });
      }
    }
    // Paddy quotations (₹/quintal) — deliberately a different unit and stage.
    for (const month of monthsBack) {
      i += 1;
      out.push({
        id: `p-${i}`,
        observationDate: month,
        periodicity: "monthly",
        state: "Tamil Nadu",
        district,
        market: markets[district] ?? null,
        variety: "Grade A paddy",
        commodity: "paddy",
        processing: "not-applicable",
        grade: "unspecified",
        packageType: "loose",
        marketStage: "farmgate",
        unit: "INR/quintal",
        value: +(2280 + seeded(i) * 260).toFixed(0),
        confidence: "reported",
        sourceId: "src-news-2026",
        comparabilityGroup: "paddy|farmgate|unspecified|INR/quintal",
        demo: true,
      });
    }
  }
  // PDS reference rows
  for (const district of districts) {
    i += 1;
    out.push({
      id: `pds-${i}`,
      observationDate: "2026-07",
      periodicity: "monthly",
      state: "Tamil Nadu",
      district,
      market: "PDS fair price shop",
      variety: "PDS rice",
      commodity: "milled-rice",
      processing: "boiled",
      grade: "common",
      packageType: "loose",
      marketStage: "pds",
      unit: "INR/kg",
      value: 0,
      confidence: "official",
      sourceId: "src-tn-pds",
      comparabilityGroup: "milled-rice|pds|common|INR/kg",
      notes: "₹0/kg issue price for eligible cardholders in Tamil Nadu.",
      demo: true,
    });
  }
  return out;
})();

export const uniq = <T,>(xs: T[]) => Array.from(new Set(xs));

export function toCsv(rows: PriceRecord[]): string {
  const cols: (keyof PriceRecord)[] = [
    "observationDate",
    "periodicity",
    "state",
    "district",
    "market",
    "variety",
    "commodity",
    "processing",
    "grade",
    "packageType",
    "marketStage",
    "unit",
    "value",
    "confidence",
    "sourceId",
    "comparabilityGroup",
    "demo",
  ];
  const head = cols.join(",");
  const body = rows
    .map((r) =>
      cols
        .map((c) => {
          const v = r[c];
          const s = v === null || v === undefined ? "" : String(v);
          return s.includes(",") ? `"${s}"` : s;
        })
        .join(","),
    )
    .join("\n");
  return `${head}\n${body}`;
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const unitLabel = (u: Unit) => (u === "INR/kg" ? "₹/kg" : "₹/quintal");