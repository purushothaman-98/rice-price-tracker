export type RecordStatus = "official" | "partial-year" | "unavailable";

export interface RetailRecordPoint {
  year: string;
  label: string;
  value: number | null;
  unit: "INR/kg";
  status: RecordStatus;
  observationType: "annual-average" | "partial-year" | "unavailable";
  note: string;
  sourceId: string | null;
}

export interface ProcurementPoint {
  season: string;
  centres: number;
  lakhTonnes: number;
  note?: string;
  sourceId: "tncsc-procurement";
}

export interface PublicRecordSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: "official-data" | "official-policy" | "law";
  note: string;
}

export interface PolicyEvent {
  date: string;
  year: string;
  title: string;
  summary: string;
  sourceIds: string[];
}

export const sources: PublicRecordSource[] = [
  {
    id: "rajya-sabha-1830",
    title: "Rajya Sabha Unstarred Question 1830: Prices of Essential Commodities",
    publisher: "Parliament of India / Department of Consumer Affairs",
    url: "https://sansad.in/getFile/annex/260/AU1830.pdf?source=pqars",
    kind: "official-data",
    note: "Provides Tamil Nadu annual average retail rice prices for 2018–2022 and a 2023 average through July.",
  },
  {
    id: "price-monitoring-system",
    title: "Price Monitoring System",
    publisher: "Department of Consumer Affairs",
    url: "https://fcainfoweb.nic.in/",
    kind: "official-data",
    note: "Official portal for daily essential-commodity price monitoring. It is listed here as the source system, not as a substitute for a dated observation.",
  },
  {
    id: "tncsc-procurement",
    title: "Decentralised Paddy Procurement: season-wise centres and quantity",
    publisher: "Tamil Nadu Civil Supplies Corporation",
    url: "https://tncsc.tn.gov.in/en/PROCUREMENT.html",
    kind: "official-data",
    note: "Season-wise procurement-centre count and paddy quantity procured from 2014–15 onward.",
  },
  {
    id: "tncsc-pds",
    title: "Public Distribution System: rice allotment and issue price",
    publisher: "Tamil Nadu Civil Supplies Corporation",
    url: "https://www.tncsc.tn.gov.in/en/PDS.html",
    kind: "official-policy",
    note: "Shows rice supplied free of cost to eligible rice-card holders and current category-wise issue-price information.",
  },
  {
    id: "tn-vat-schedule",
    title: "Schedules under the Tamil Nadu Value Added Tax Act, 2006",
    publisher: "India Code / Government of Tamil Nadu",
    url: "https://upload.indiacode.nic.in/showfile?actid=AC_TN_85_691_00003_00003_1551088141095&filename=schedules_under_tamil_nadu_value_added_tax_act%2C_2006.pdf&type=notification",
    kind: "law",
    note: "Primary legal reference for the pre-GST Tamil Nadu VAT schedule.",
  },
  {
    id: "cbic-rice-rate",
    title: "GST goods and services rates: rice pre-packaged and labelled",
    publisher: "Central Board of Indirect Taxes and Customs",
    url: "https://cbic-gst.gov.in/gst-goods-services-rates.html",
    kind: "official-policy",
    note: "Lists rice under HSN 1006 at 5% when supplied pre-packaged and labelled.",
  },
  {
    id: "export-policy-2023",
    title: "Centre prohibits export of non-basmati white rice",
    publisher: "Press Information Bureau",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1941139",
    kind: "official-policy",
    note: "Official 20 July 2023 announcement changing export policy from free with duty to prohibited.",
  },
  {
    id: "stock-disclosure-2024",
    title: "Mandatory stock disclosure of rice and paddy",
    publisher: "Press Information Bureau",
    url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2001790",
    kind: "official-policy",
    note: "Official 2 February 2024 announcement requiring weekly stock declarations by specified market participants.",
  },
  {
    id: "bharat-rice-2024",
    title: "Launch of Bharat Rice at an MRP of ₹29/kg",
    publisher: "Press Information Bureau",
    url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2003160",
    kind: "official-policy",
    note: "Official 6 February 2024 launch notice for 5 kg and 10 kg packs during Phase I.",
  },
  {
    id: "essential-commodities-act",
    title: "Essential Commodities Act, 1955",
    publisher: "India Code",
    url: "https://www.indiacode.nic.in/bitstream/123456789/1579/1/A1955-10Eng.pdf",
    kind: "law",
    note: "Primary legal text for powers relating to supply, distribution, stock and price-control orders for essential commodities.",
  },
];

export const retailPublicRecord: RetailRecordPoint[] = [
  {
    year: "2014",
    label: "2014",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No verified annual Tamil Nadu retail-rice value has been loaded for this year.",
    sourceId: null,
  },
  {
    year: "2015",
    label: "2015",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No verified annual Tamil Nadu retail-rice value has been loaded for this year.",
    sourceId: null,
  },
  {
    year: "2016",
    label: "2016",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No verified annual Tamil Nadu retail-rice value has been loaded for this year.",
    sourceId: null,
  },
  {
    year: "2017",
    label: "2017",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No verified annual Tamil Nadu retail-rice value has been loaded for this year.",
    sourceId: null,
  },
  {
    year: "2018",
    label: "2018",
    value: 34.28,
    unit: "INR/kg",
    status: "official",
    observationType: "annual-average",
    note: "State-wise annual average retail price of rice.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2019",
    label: "2019",
    value: 38.86,
    unit: "INR/kg",
    status: "official",
    observationType: "annual-average",
    note: "State-wise annual average retail price of rice.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2020",
    label: "2020",
    value: 46.08,
    unit: "INR/kg",
    status: "official",
    observationType: "annual-average",
    note: "State-wise annual average retail price of rice.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2021",
    label: "2021",
    value: 46.79,
    unit: "INR/kg",
    status: "official",
    observationType: "annual-average",
    note: "State-wise annual average retail price of rice.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2022",
    label: "2022",
    value: 48.12,
    unit: "INR/kg",
    status: "official",
    observationType: "annual-average",
    note: "State-wise annual average retail price of rice.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2023",
    label: "Jan–Jul 2023",
    value: 51.99,
    unit: "INR/kg",
    status: "partial-year",
    observationType: "partial-year",
    note: "Average through July 2023. This is not a full-year annual average.",
    sourceId: "rajya-sabha-1830",
  },
  {
    year: "2024",
    label: "2024",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No source-linked annual Tamil Nadu retail-rice value has been loaded yet.",
    sourceId: null,
  },
  {
    year: "2025",
    label: "2025",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "No source-linked annual Tamil Nadu retail-rice value has been loaded yet.",
    sourceId: null,
  },
  {
    year: "2026",
    label: "2026",
    value: null,
    unit: "INR/kg",
    status: "unavailable",
    observationType: "unavailable",
    note: "The official price-monitoring portal is linked, but no dated comparable annual value is loaded on this homepage.",
    sourceId: "price-monitoring-system",
  },
];

export const procurementPublicRecord: ProcurementPoint[] = [
  { season: "2014–15", centres: 1722, lakhTonnes: 15.8, sourceId: "tncsc-procurement" },
  { season: "2015–16", centres: 1808, lakhTonnes: 17.84, sourceId: "tncsc-procurement" },
  { season: "2016–17", centres: 659, lakhTonnes: 2.12, sourceId: "tncsc-procurement" },
  { season: "2017–18", centres: 1447, lakhTonnes: 14.93, sourceId: "tncsc-procurement" },
  { season: "2018–19", centres: 1766, lakhTonnes: 19.11, sourceId: "tncsc-procurement" },
  { season: "2019–20", centres: 2135, lakhTonnes: 32.41, sourceId: "tncsc-procurement" },
  { season: "2020–21", centres: 2731, lakhTonnes: 44.95, sourceId: "tncsc-procurement" },
  { season: "2021–22", centres: 3182, lakhTonnes: 43.28, sourceId: "tncsc-procurement" },
  { season: "2022–23", centres: 4019, lakhTonnes: 44.22, sourceId: "tncsc-procurement" },
  {
    season: "2023–24",
    centres: 3209,
    lakhTonnes: 34.96,
    note: "A lower procurement year in the official TNCSC series.",
    sourceId: "tncsc-procurement",
  },
  {
    season: "2024–25",
    centres: 3777,
    lakhTonnes: 47.99,
    note: "Procurement recovered above the preceding season.",
    sourceId: "tncsc-procurement",
  },
  {
    season: "2025–26",
    centres: 4208,
    lakhTonnes: 56.2,
    note: "Official TNCSC figure reported up to 2 June 2026; the season was still in progress.",
    sourceId: "tncsc-procurement",
  },
];

export const policyTimeline: PolicyEvent[] = [
  {
    date: "2014–30 Jun 2017",
    year: "2014",
    title: "Pre-GST Tamil Nadu tax framework",
    summary: "Rice and paddy should be read against the Tamil Nadu VAT schedule in force before GST. The legal schedule is linked rather than reduced to a one-line tax claim.",
    sourceIds: ["tn-vat-schedule"],
  },
  {
    date: "1 Jul 2017",
    year: "2017",
    title: "GST begins",
    summary: "The early GST framework distinguished taxable branded or unit-container rice from exempt unbranded rice. The current rate page and CBIC materials provide the official tax context.",
    sourceIds: ["cbic-rice-rate"],
  },
  {
    date: "18 Jul 2022 onward",
    year: "2022",
    title: "Pre-packaged and labelled test becomes central",
    summary: "The current CBIC rate schedule lists rice at 5% when it is pre-packaged and labelled. Variety alone does not determine the tax treatment.",
    sourceIds: ["cbic-rice-rate"],
  },
  {
    date: "20 Jul 2023",
    year: "2023",
    title: "Non-basmati white-rice exports prohibited",
    summary: "The Union government changed the export policy from free with a 20% duty to prohibited, citing domestic availability and prices.",
    sourceIds: ["export-policy-2023"],
  },
  {
    date: "2 Feb 2024",
    year: "2024",
    title: "Weekly rice and paddy stock disclosure mandated",
    summary: "Specified traders, retailers, chains, processors and millers were directed to disclose category-wise stocks every Friday. Disclosure is not the same as a universal price ceiling.",
    sourceIds: ["stock-disclosure-2024", "essential-commodities-act"],
  },
  {
    date: "6 Feb 2024",
    year: "2024",
    title: "Bharat Rice launched at ₹29/kg in Phase I",
    summary: "The official launch covered 5 kg and 10 kg packs through central cooperative channels. It was a targeted retail intervention, not Tamil Nadu's private-market benchmark.",
    sourceIds: ["bharat-rice-2024"],
  },
  {
    date: "Current official PDS page",
    year: "2026",
    title: "Tamil Nadu PDS rice remains a separate policy price",
    summary: "TNCSC states that rice is distributed free of cost to eligible rice-card holders. That entitlement is distinct from private retail prices and paddy procurement prices.",
    sourceIds: ["tncsc-pds"],
  },
];

export const sourceById = Object.fromEntries(sources.map((source) => [source.id, source])) as Record<
  string,
  PublicRecordSource
>;
