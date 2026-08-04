import type { TimelineEvent, FactCheckClaim } from "./types";

export const timeline: TimelineEvent[] = [
  {
    id: "gst-2017",
    date: "2017-07-01",
    label: "GST regime begins",
    category: "tax",
    description:
      "Rice was VAT-exempt in Tamil Nadu before GST. From July 2017, 5% applied mainly to rice sold in a unit container bearing a registered brand name.",
    confidence: "official",
  },
  {
    id: "gst-2022",
    date: "2022-07-18",
    label: "5% GST on pre-packaged and labelled rice",
    category: "tax",
    description:
      "The levy shifted from 'registered brand' to 'pre-packaged and labelled', generally covering packs up to 25 kg. Loose rice and certain larger individual packages may remain outside the levy.",
    confidence: "official",
  },
  {
    id: "arrivals-2023",
    date: "2023-09-01",
    label: "Inter-state arrival weakness",
    category: "supply",
    description:
      "Reduced fine-rice arrivals from Andhra Pradesh, Telangana and Karnataka tightened Tamil Nadu's fine-rice supply.",
    confidence: "reported",
  },
  {
    id: "cauvery-2023",
    date: "2023-08-15",
    label: "Cauvery release shortfall and Kuruvai stress",
    category: "weather",
    description:
      "Lower Cauvery releases constrained Kuruvai transplanting in the delta, pushing risk into the Samba season.",
    confidence: "reported",
  },
  {
    id: "export-2023",
    date: "2023-07-20",
    label: "Export restrictions on non-basmati white rice",
    category: "policy",
    description:
      "Central export restrictions were intended to protect domestic availability. Their pass-through to Tamil Nadu retail prices was partial.",
    confidence: "official",
  },
  {
    id: "stock-2024",
    date: "2024-02-01",
    label: "Rice stock declaration order",
    category: "policy",
    description:
      "Traders, millers and large retailers were required to declare rice stocks, a disclosure measure rather than a price control.",
    confidence: "official",
  },
  {
    id: "bharat-2024",
    date: "2024-02-06",
    label: "Bharat Rice and OMSS sales",
    category: "policy",
    description:
      "Subsidised Bharat Rice and open market sales were used to add supply at the margin through NCCF, NAFED and Kendriya Bhandar outlets.",
    confidence: "official",
  },
  {
    id: "peak-2024",
    date: "2024-06-15",
    label: "Retail peak, around ₹61.75/kg",
    category: "market",
    description:
      "The Tamil Nadu retail benchmark reached its highest monthly demo value in this window, a broad shock across both fine and common rice.",
    confidence: "official",
  },
  {
    id: "recovery-2025",
    date: "2025-01-15",
    label: "2024–25 harvest recovery",
    category: "supply",
    description:
      "A stronger harvest and TNCSC procurement of 47.99 lakh tonnes eased pressure; the benchmark fell to ₹55.51/kg by December 2025.",
    confidence: "official",
  },
  {
    id: "shock-2026",
    date: "2026-07-01",
    label: "Fine-rice supply shock",
    category: "market",
    description:
      "A narrower episode: total paddy availability looks adequate, but specific fine varieties tightened, lifting the benchmark to ₹57.75/kg.",
    confidence: "official",
  },
];

export const investigationClaims: FactCheckClaim[] = [
  {
    id: "c1",
    claim: "GST caused the 2024 rice price spike.",
    verdict: "unsupported",
    reasoning:
      "The 5% pre-packaged levy took effect in July 2022 and does not change during a spike. A 5% levy on a ₹50/kg pack is about ₹2.40/kg, far below the ₹10–₹17/kg movements observed, and loose rice is generally untaxed.",
  },
  {
    id: "c2",
    claim: "TNCSC paddy procurement fell sharply in 2023–24.",
    verdict: "supported",
    reasoning:
      "Demo records show 44.22 lakh tonnes in 2022–23 falling to 34.96 lakh tonnes in 2023–24, then recovering to 47.99 lakh tonnes in 2024–25.",
  },
  {
    id: "c3",
    claim: "Private buyers outbid Direct Purchase Centres, diverting paddy away from procurement.",
    verdict: "partly-true",
    reasoning:
      "Market quotations above MSP plus state incentive were widely reported and are consistent with the procurement decline, but no dataset separates diversion from a genuinely smaller harvest.",
  },
  {
    id: "c4",
    claim: "Export restrictions lowered Tamil Nadu retail prices.",
    verdict: "unknown",
    reasoning:
      "Restrictions coincided with continued price increases into mid-2024. Isolating their effect from harvest and arrival changes is not possible with published data.",
  },
  {
    id: "c5",
    claim: "Retail margins widened during the shock.",
    verdict: "partly-true",
    reasoning:
      "Wholesale-to-retail spreads in reported quotations widened in several markets, but the sample is thin and not an official margin series.",
  },
  {
    id: "c6",
    claim: "Stock declaration orders brought prices down.",
    verdict: "unsupported",
    reasoning:
      "Prices continued rising for roughly four months after the February 2024 order. The decline coincided with the 2024–25 harvest, not the order.",
  },
];

export interface EscalationIndicator {
  id: string;
  indicator: string;
  status2024: string;
  status2026: string;
  triggered: boolean;
}

export const escalationIndicators: EscalationIndicator[] = [
  {
    id: "e1",
    indicator: "Common rice also rising sharply",
    status2024: "Yes — broad-based increase",
    status2026: "No — common rice broadly steady",
    triggered: false,
  },
  {
    id: "e2",
    indicator: "TNCSC procurement falling year on year",
    status2024: "Yes — 44.22 → 34.96 lakh tonnes",
    status2026: "Not yet — season in progress",
    triggered: false,
  },
  {
    id: "e3",
    indicator: "Fine-rice arrivals from AP/TS/KA weak",
    status2024: "Yes",
    status2026: "Yes — the core of the current episode",
    triggered: true,
  },
  {
    id: "e4",
    indicator: "Kuruvai transplanting shortfall in the delta",
    status2024: "Yes",
    status2026: "Watch — Cauvery releases under review",
    triggered: false,
  },
  {
    id: "e5",
    indicator: "Paddy market quotations sustained above MSP + incentive",
    status2024: "Yes",
    status2026: "Partly — fine paddy only",
    triggered: true,
  },
  {
    id: "e6",
    indicator: "Central stock-declaration or OMSS intervention",
    status2024: "Yes — February 2024",
    status2026: "No order issued so far",
    triggered: false,
  },
];

export interface PowerRow {
  power: string;
  authority: string;
  available: string;
  used: string;
}

export const powerTable: PowerRow[] = [
  {
    power: "Stock limits on traders and millers",
    authority: "Essential Commodities Act, Union / State",
    available: "Yes — limits can be imposed by order",
    used: "In 2024, disclosure via stock declaration was used rather than hard limits.",
  },
  {
    power: "Stock declaration requirement",
    authority: "Union Department of Food and Public Distribution",
    available: "Yes",
    used: "Used — February 2024 order covering traders, millers and large retailers.",
  },
  {
    power: "MRP and package enforcement",
    authority: "Legal Metrology, Tamil Nadu",
    available: "Yes — declaration and net-quantity rules",
    used: "Routine inspections; not deployed as a price-control instrument.",
  },
  {
    power: "GST rate change on rice",
    authority: "GST Council",
    available: "Yes",
    used: "Rate on pre-packaged and labelled rice unchanged since 18 July 2022.",
  },
  {
    power: "Export policy",
    authority: "Union Ministry of Commerce (DGFT)",
    available: "Yes",
    used: "Used in 2023 restrictions on non-basmati white rice; later relaxed.",
  },
  {
    power: "Open Market Sale Scheme releases",
    authority: "Food Corporation of India",
    available: "Yes",
    used: "Used, though Tamil Nadu-specific offtake is not separately published.",
  },
  {
    power: "Subsidised retail supply (Bharat Rice)",
    authority: "NCCF, NAFED, Kendriya Bhandar",
    available: "Yes",
    used: "Used from early 2024; volumes small relative to state consumption.",
  },
  {
    power: "State procurement price incentive over MSP",
    authority: "Government of Tamil Nadu / TNCSC",
    available: "Yes",
    used: "Used every season; incentive raised to ₹100/quintal in the demo table for 2024–25.",
  },
  {
    power: "PDS issue price",
    authority: "Government of Tamil Nadu",
    available: "Yes",
    used: "Used — ₹0/kg for eligible cardholders, insulating basic consumption from market prices.",
  },
  {
    power: "Direct price control on private retail rice",
    authority: "State / Union",
    available: "Technically possible under emergency powers",
    used: "Not used. Private retail rice prices remain market-determined.",
  },
];