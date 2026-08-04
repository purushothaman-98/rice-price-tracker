// Shared domain types for Rice Price Tracker.
// All records in this project are DEMONSTRATION data unless marked otherwise.

export type Confidence = "official" | "reported" | "estimated" | "unavailable";

export type Commodity = "paddy" | "milled-rice";
export type Processing = "raw" | "boiled" | "parboiled" | "not-applicable";
export type Grade = "fine" | "common" | "mixed" | "unspecified";
export type PackageType = "loose" | "pre-packaged" | "unspecified";
export type MarketStage = "retail" | "wholesale" | "farmgate" | "procurement" | "pds";
export type Unit = "INR/kg" | "INR/quintal";
export type Periodicity = "daily" | "monthly" | "annual" | "partial-year";

export interface PriceRecord {
  id: string;
  observationDate: string; // ISO or YYYY-MM / YYYY
  periodicity: Periodicity;
  state: string;
  district: string | null;
  market: string | null;
  variety: string;
  commodity: Commodity;
  processing: Processing;
  grade: Grade;
  packageType: PackageType;
  marketStage: MarketStage;
  unit: Unit;
  value: number;
  confidence: Confidence;
  sourceId: string;
  comparabilityGroup: string;
  notes?: string;
  demo: boolean;
}

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  sourceType:
    | "government-dataset"
    | "parliamentary-answer"
    | "press-release"
    | "state-order"
    | "news-report"
    | "research"
    | "site-estimate";
  publicationDate: string;
  eventDate?: string;
  geography: string;
  url?: string;
  confidence: Confidence;
  summary: string;
  demo: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  category: "tax" | "supply" | "policy" | "weather" | "market";
  description: string;
  confidence: Confidence;
}

export interface Variety {
  slug: string;
  name: string;
  aliases: string[];
  grade: Grade;
  typicalUse: string;
  paddyOrigin: string;
  interstateDependence: "high" | "medium" | "low" | "not-applicable";
  millingForm: string;
  priceSources: string[];
  taxContext: string;
  dataGaps: string[];
}

export interface FactCheckClaim {
  id: string;
  claim: string;
  verdict: "supported" | "partly-true" | "unsupported" | "unknown";
  reasoning: string;
}

export const confidenceLabel: Record<Confidence, string> = {
  official: "Official data",
  reported: "Reported market quote",
  estimated: "Estimated",
  unavailable: "Unavailable",
};

export const unitConvert = (value: number, from: Unit, to: Unit): number => {
  if (from === to) return value;
  return from === "INR/quintal" ? value / 100 : value * 100;
};

export const formatINR = (value: number, unit: Unit = "INR/kg") =>
  `₹${value.toFixed(2)}/${unit === "INR/kg" ? "kg" : "quintal"}`;