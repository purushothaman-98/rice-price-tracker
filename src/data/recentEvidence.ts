import { procurementPublicRecord } from "./publicRecord";

export type RecentSourceKind =
  | "official-release"
  | "official-notification"
  | "reported-official-statement"
  | "reported-market";

export interface RecentEvidenceSource {
  id: string;
  title: string;
  publisher: string;
  publishedDate: string;
  url: string;
  kind: RecentSourceKind;
  note: string;
}

export interface RecentEvidenceItem {
  date: string;
  title: string;
  evidenceType: "Official policy" | "Official statement reported" | "Market reporting";
  whatIsSupported: string;
  figures: string[];
  interpretation: string;
  limitation: string;
  sourceIds: string[];
}

export interface DerivedFinding {
  title: string;
  value: string;
  calculation?: string;
  finding: string;
  caution: string;
  confidence: "high" | "moderate";
  sourceIds: string[];
}

export const recentEvidenceSources: RecentEvidenceSource[] = [
  {
    id: "pib-omss-2024-25",
    title: "Open Market Sale Scheme reserve prices for 2024–25",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2025-02-14",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2101827",
    kind: "official-release",
    note: "Lists rice reserve prices applicable from 1 August 2024 to 31 March 2025, including separate rates for private parties and Bharat-brand/community-kitchen channels.",
  },
  {
    id: "dgft-white-rice-2024",
    title: "Notification 31/2024-25: Non-basmati white-rice export policy",
    publisher: "Directorate General of Foreign Trade / APEDA",
    publishedDate: "2024-09-28",
    url: "https://apeda.gov.in/sites/default/files/dgft_notifications/Notification_No_31_2024_25.pdf",
    kind: "official-notification",
    note: "Changed non-basmati white-rice exports from prohibited to free, subject at that time to a minimum export price of USD 490 per tonne.",
  },
  {
    id: "dgft-broken-rice-2025",
    title: "Notification 61/2024-25: Broken-rice export policy",
    publisher: "Directorate General of Foreign Trade / APEDA",
    publishedDate: "2025-03-07",
    url: "https://apeda.gov.in/sites/default/files/dgft_notifications/Notification_61_English.pdf",
    kind: "official-notification",
    note: "Changed broken-rice exports from prohibited to free with immediate effect.",
  },
  {
    id: "tn-dipr-procurement-review-2025",
    title: "Chief Minister review on paddy procurement and storage",
    publisher: "Tamil Nadu Information and Public Relations Department",
    publishedDate: "2025-10-02",
    url: "https://dipr.tn.gov.in/ords/r/dipr/info-prdept103/press-release1/209376864752734",
    kind: "official-release",
    note: "Official release index containing DIPR P.R. No. 2341 on paddy procurement and storage warehouses.",
  },
  {
    id: "tnie-paddy-drop-2025",
    title: "Paddy rate drops in Tamil Nadu; traders expect rice-price relief",
    publisher: "The New Indian Express",
    publishedDate: "2025-01-20",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Jan/20/paddy-rate-drops-in-tamil-nadu-rice-price-may-fall-10-per-cent",
    kind: "reported-market",
    note: "Reports open-market paddy-price declines and a trade forecast of lower fine-rice retail prices. The forecast is not itself an observed retail-price series.",
  },
  {
    id: "tnie-procurement-price-2025",
    title: "Tamil Nadu fixes 2025–26 paddy procurement prices",
    publisher: "The New Indian Express",
    publishedDate: "2025-08-30",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Aug/30/ahead-of-kharif-marketing-season-tamil-nadu-fixes-procurement-price-at-rs-2545",
    kind: "reported-official-statement",
    note: "Reports the state government release setting final procurement prices for common and Grade A paddy from 1 September 2025.",
  },
  {
    id: "tnie-procurement-nov-2025",
    title: "Tamil Nadu seeks higher procurement target and moisture relaxation",
    publisher: "The New Indian Express",
    publishedDate: "2025-11-19",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Nov/19/cm-stalin-urges-pm-to-relax-paddy-procurement-norms-for-tamil-nadu/",
    kind: "reported-official-statement",
    note: "Reports figures contained in the Chief Minister's letter, including same-date procurement, DPC count, farmers covered and payment value.",
  },
  {
    id: "pib-msp-2026-27",
    title: "Cabinet approves MSP for Kharif Marketing Season 2026–27",
    publisher: "Press Information Bureau / Ministry of Agriculture and Farmers Welfare",
    publishedDate: "2026-05-13",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2260618",
    kind: "official-release",
    note: "Sets Union MSP at ₹2,441 per quintal for common paddy and ₹2,461 for Grade A, both ₹72 above 2025–26.",
  },
  {
    id: "tnie-paddy-surge-jan-2026",
    title: "Fine and superfine paddy prices rise during samba harvest",
    publisher: "The New Indian Express",
    publishedDate: "2026-01-26",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jan/26/paddy-prices-surge-by-30-per-cent-as-samba-harvest-picks-up-pace-in-tamil-nadu",
    kind: "reported-market",
    note: "Reports price increases of up to 30% for fine and superfine paddy, attributed by millers to strong demand and lower neighbouring-state supply.",
  },
  {
    id: "tnie-fine-paddy-jun-2026",
    title: "Fine and superfine paddy reaches ₹37–₹42/kg",
    publisher: "The New Indian Express",
    publishedDate: "2026-06-23",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/23/tamil-nadu-prices-of-fine-and-superfine-paddy-hit-all-time-high-of-rs-42kg-as-harvest-ends",
    kind: "reported-market",
    note: "Reports Akshaya Ponni paddy at ₹37–₹42/kg, RNR and Sree at about ₹37–₹38/kg, and fine-rice retail quotations above ₹60–₹70/kg.",
  },
  {
    id: "tnie-stock-claim-jul-2026",
    title: "Millers say total paddy availability is adequate despite kuruvai risk",
    publisher: "The New Indian Express",
    publishedDate: "2026-07-08",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/08/tn-has-excess-paddy-stocks-kuruvai-crop-failure-wont-push-up-rice-prices-say-mill-owners",
    kind: "reported-market",
    note: "Reports industry claims of about five lakh tonnes of surplus stock, large annual fine-paddy inflows from Karnataka, and ₹5–₹6/kg increases in BPT and Sona Ponni while overall rice prices remained broadly stable.",
  },
  {
    id: "tnie-rice-surge-jul-2026",
    title: "Tamil Nadu rice quotations rise ₹5–₹15/kg in reported markets",
    publisher: "The New Indian Express, Tiruchy edition",
    publishedDate: "2026-07-23",
    url: "https://epaper.newindianexpress.com/4178632/The-New-Indian-Express-Tiruchy/",
    kind: "reported-market",
    note: "Reports a retailer's quotations for selected lower-grade and boiled-rice varieties; this is local market evidence, not a state-wide official average.",
  },
];

export const recentEvidenceItems: RecentEvidenceItem[] = [
  {
    date: "1 Aug 2024–31 Mar 2025",
    title: "OMSS created two different official release-price channels",
    evidenceType: "Official policy",
    whatIsSupported:
      "The Union government listed an FCI rice reserve price of ₹2,800 per quintal for private parties, small traders and state governments, and ₹2,400 per quintal for central cooperatives selling Bharat-brand rice and for community kitchens. Transport costs were additional.",
    figures: ["₹28/kg private/state channel", "₹24/kg Bharat/community channel", "Transport extra"],
    interpretation:
      "The government was using public stocks through differentiated channels rather than imposing one universal private-retail ceiling.",
    limitation:
      "An FCI reserve price is not the final consumer price and cannot be compared directly with a packaged retail quotation without transport, milling, packaging and distribution costs.",
    sourceIds: ["pib-omss-2024-25"],
  },
  {
    date: "28 Sep 2024 and 7 Mar 2025",
    title: "The export-control cycle moved from restriction toward reopening",
    evidenceType: "Official policy",
    whatIsSupported:
      "Non-basmati white-rice exports changed from prohibited to free subject to a USD 490/tonne minimum export price in September 2024. Broken-rice exports changed from prohibited to free in March 2025.",
    figures: ["USD 490/tonne MEP in Sep 2024", "Broken rice: free from 7 Mar 2025"],
    interpretation:
      "The national policy stance had shifted from emergency domestic-availability protection toward export normalization by 2025.",
    limitation:
      "This policy sequence does not by itself establish the direction or size of Tamil Nadu retail-price effects.",
    sourceIds: ["dgft-white-rice-2024", "dgft-broken-rice-2025"],
  },
  {
    date: "20 Jan 2025",
    title: "A bumper-harvest phase produced reported paddy-price relief",
    evidenceType: "Market reporting",
    whatIsSupported:
      "Traders reported open-market paddy prices falling by ₹200–₹300 per 62 kg bag. RNR paddy in Ramanathapuram was reported at ₹1,300–₹1,400 per bag after ₹1,700–₹2,000 earlier.",
    figures: ["₹200–₹300 decline per 62 kg bag", "RNR: ₹1,300–₹1,400/bag", "Retail fall was a forecast"],
    interpretation:
      "The report is evidence that raw-material conditions can reverse quickly between harvest phases.",
    limitation:
      "The article's suggested 10% retail decline was a forecast. It should not be stored as an observed price movement without subsequent data.",
    sourceIds: ["tnie-paddy-drop-2025"],
  },
  {
    date: "1 Sep–16 Nov 2025",
    title: "Higher administered prices coincided with much faster early procurement",
    evidenceType: "Official statement reported",
    whatIsSupported:
      "Tamil Nadu set final procurement prices at ₹2,500/quintal for common paddy and ₹2,545 for Grade A. By 16 November, the government reported 14.11 lakh tonnes procured through 1,932 DPCs from 1,86,674 farmers for ₹3,559 crore, compared with about 4.81 lakh tonnes at the same point a year earlier.",
    figures: ["Common ₹2,500/qtl", "Grade A ₹2,545/qtl", "14.11 lakh tonnes by 16 Nov", "1,932 DPCs"],
    interpretation:
      "The 2025–26 season began with substantially stronger procurement throughput than the same-date comparison in 2024–25.",
    limitation:
      "Same-date progress is not a final-season total, and faster procurement may reflect harvest timing, centre capacity, policy and crop size together.",
    sourceIds: ["tnie-procurement-price-2025", "tnie-procurement-nov-2025", "tn-dipr-procurement-review-2025"],
  },
  {
    date: "13 May 2026",
    title: "Union MSP rises ₹72 per quintal for 2026–27",
    evidenceType: "Official policy",
    whatIsSupported:
      "The Union MSP was fixed at ₹2,441 per quintal for common paddy and ₹2,461 for Grade A, up from ₹2,369 and ₹2,389 respectively in 2025–26.",
    figures: ["Common ₹2,441/qtl", "Grade A ₹2,461/qtl", "+₹72/qtl"],
    interpretation:
      "The administered farm-price floor rose by about 3%, but it remains a procurement price rather than a retail-rice ceiling or forecast.",
    limitation:
      "Tamil Nadu may add a state incentive; the final amount paid in the state must be recorded separately when officially announced.",
    sourceIds: ["pib-msp-2026-27"],
  },
  {
    date: "Jan–Jun 2026",
    title: "Reported stress concentrated in fine and superfine paddy",
    evidenceType: "Market reporting",
    whatIsSupported:
      "January reporting described increases of up to 30% for fine and superfine paddy. By late June, Akshaya Ponni paddy was quoted at ₹37–₹42/kg and RNR/Sree around ₹37–₹38/kg; reported fine-rice retail quotations were above ₹60–₹70/kg.",
    figures: ["Up to 30% reported rise", "Akshaya Ponni ₹37–₹42/kg paddy", "RNR/Sree ₹37–₹38/kg paddy", "Fine rice ₹60–₹70/kg retail"],
    interpretation:
      "The pressure appears strongest in varieties whose supply depends on premium paddy and inter-state arrivals, not uniformly across every rice category.",
    limitation:
      "These are press-reported quotations from particular markets and actors, not a complete Tamil Nadu weighted average.",
    sourceIds: ["tnie-paddy-surge-jan-2026", "tnie-fine-paddy-jun-2026"],
  },
  {
    date: "8–23 Jul 2026",
    title: "Adequate total stock and sharp variety-level increases can coexist",
    evidenceType: "Market reporting",
    whatIsSupported:
      "Millers claimed about five lakh tonnes of surplus paddy stock and said overall rice prices were broadly stable, while BPT and Sona Ponni had risen ₹5–₹6/kg. Later reporting quoted selected lower-grade and boiled-rice varieties rising ₹10–₹15/kg, with a 25 kg bag moving from roughly ₹1,100–₹1,250 to about ₹1,500 in one retailer's account.",
    figures: ["Industry claim: ~5 lakh tonnes surplus", "BPT/Sona Ponni +₹5–₹6/kg", "Selected rice +₹10–₹15/kg", "One 25 kg bag quote: ~₹1,500"],
    interpretation:
      "The evidence fits a segmented market: aggregate availability may be adequate while specific varieties, origins and processing categories tighten sharply.",
    limitation:
      "The stock figure is an industry claim and the price observations are local quotations. Neither should be promoted to an official state-wide benchmark.",
    sourceIds: ["tnie-stock-claim-jul-2026", "tnie-rice-surge-jul-2026"],
  },
];

const procurement2023 = procurementPublicRecord.find((point) => point.season === "2023–24")!;
const procurement2024 = procurementPublicRecord.find((point) => point.season === "2024–25")!;
const procurement2025 = procurementPublicRecord.find((point) => point.season === "2025–26")!;

const recoveryLakhTonnes = procurement2024.lakhTonnes - procurement2023.lakhTonnes;
const recoveryPct = (recoveryLakhTonnes / procurement2023.lakhTonnes) * 100;
const currentLeadLakhTonnes = procurement2025.lakhTonnes - procurement2024.lakhTonnes;
const currentLeadPct = (currentLeadLakhTonnes / procurement2024.lakhTonnes) * 100;
const earlyProcurementMultiple = 14.11 / 4.81;
const commonMspIncreasePct = (72 / 2369) * 100;

export const derivedFindings: DerivedFinding[] = [
  {
    title: "Official procurement rebound after 2023–24",
    value: `+${recoveryPct.toFixed(1)}%`,
    calculation: `${procurement2024.lakhTonnes.toFixed(2)} − ${procurement2023.lakhTonnes.toFixed(2)} = ${recoveryLakhTonnes.toFixed(2)} lakh tonnes`,
    finding:
      "TNCSC procurement rose from 34.96 lakh tonnes in 2023–24 to 47.99 lakh tonnes in 2024–25.",
    caution:
      "Procurement is not total production and does not identify which commercial rice varieties were available to private retailers.",
    confidence: "high",
    sourceIds: ["tncsc-procurement"],
  },
  {
    title: "The in-progress 2025–26 total already exceeded the prior full season",
    value: `+${currentLeadPct.toFixed(1)}%`,
    calculation: `${procurement2025.lakhTonnes.toFixed(2)} − ${procurement2024.lakhTonnes.toFixed(2)} = ${currentLeadLakhTonnes.toFixed(2)} lakh tonnes`,
    finding:
      "The TNCSC figure reported up to 2 June 2026 was 56.20 lakh tonnes, 8.21 lakh tonnes above the 2024–25 total.",
    caution:
      "The 2025–26 value is an as-of figure from an in-progress season. It should remain explicitly dated and not be treated as a final closed-season observation.",
    confidence: "high",
    sourceIds: ["tncsc-procurement"],
  },
  {
    title: "Early 2025–26 procurement was nearly three times the same-date level",
    value: `${earlyProcurementMultiple.toFixed(2)}×`,
    calculation: "14.11 lakh tonnes ÷ 4.81 lakh tonnes",
    finding:
      "By 16 November 2025, reported procurement was about 193% above the comparable point in the previous season.",
    caution:
      "This is a same-date progress comparison, not a full-season growth rate. Harvest timing and operational changes may explain part of the gap.",
    confidence: "moderate",
    sourceIds: ["tnie-procurement-nov-2025"],
  },
  {
    title: "The 2026–27 Union paddy MSP increase is about 3%",
    value: `+${commonMspIncreasePct.toFixed(1)}%`,
    calculation: "₹72 ÷ ₹2,369 for common paddy",
    finding:
      "The central procurement floor increased modestly relative to the much larger variety-specific market movements reported during 2026.",
    caution:
      "MSP and open-market fine-paddy prices are different instruments and markets. The comparison provides scale, not causation.",
    confidence: "high",
    sourceIds: ["pib-msp-2026-27", "tnie-fine-paddy-jun-2026"],
  },
  {
    title: "Best-supported reading of July 2026: segmentation, not one uniform shortage",
    value: "Moderate confidence",
    finding:
      "Record procurement and industry claims of adequate aggregate stock sit alongside sharp reported increases in selected fine, boiled and lower-grade varieties. The combined evidence is more consistent with origin- and variety-specific tightness than with every category of rice becoming equally scarce.",
    caution:
      "This remains an inference. A firm conclusion requires official variety-level arrivals, mill stocks and district-weighted retail prices.",
    confidence: "moderate",
    sourceIds: ["tncsc-procurement", "tnie-stock-claim-jul-2026", "tnie-rice-surge-jul-2026", "tnie-fine-paddy-jun-2026"],
  },
];

export const recentEvidenceSourceById = Object.fromEntries(
  recentEvidenceSources.map((source) => [source.id, source]),
) as Record<string, RecentEvidenceSource>;
