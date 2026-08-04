import type { SourceRecord } from "./types";

export const sources: SourceRecord[] = [
  {
    id: "src-doca-retail",
    title: "Daily retail and wholesale price monitoring — rice, Tamil Nadu centres",
    publisher: "Department of Consumer Affairs, Government of India",
    sourceType: "government-dataset",
    publicationDate: "2026-07-31",
    geography: "Tamil Nadu",
    confidence: "official",
    summary:
      "Price Monitoring Division series collected from selected reporting centres. Variety and processing form are not always distinguished, which limits fine-versus-common comparisons.",
    demo: true,
  },
  {
    id: "src-tncsc-proc",
    title: "Paddy procurement summary, Kharif and Rabi marketing seasons",
    publisher: "Tamil Nadu Civil Supplies Corporation",
    sourceType: "government-dataset",
    publicationDate: "2026-03-31",
    geography: "Tamil Nadu",
    confidence: "official",
    summary:
      "Season-wise paddy procurement in lakh tonnes through Direct Purchase Centres. Used for the 2022–23, 2023–24 and 2024–25 comparisons on this site.",
    demo: true,
  },
  {
    id: "src-msp",
    title: "Minimum Support Prices for Kharif crops",
    publisher: "Cabinet Committee on Economic Affairs / PIB",
    sourceType: "press-release",
    publicationDate: "2025-06-04",
    geography: "India",
    confidence: "official",
    summary:
      "Announces MSP for common and Grade A paddy. Tamil Nadu adds a state incentive on top of the Union MSP at Direct Purchase Centres.",
    demo: true,
  },
  {
    id: "src-gst-2022",
    title: "GST on pre-packaged and labelled goods — clarifications",
    publisher: "Central Board of Indirect Taxes and Customs",
    sourceType: "press-release",
    publicationDate: "2022-07-18",
    eventDate: "2022-07-18",
    geography: "India",
    confidence: "official",
    summary:
      "Shifts the 5% levy trigger from registered brand names to pre-packaged and labelled commodities, generally in packs up to 25 kg.",
    demo: true,
  },
  {
    id: "src-stock-2024",
    title: "Stock declaration order for rice — traders, millers, retailers",
    publisher: "Department of Food and Public Distribution",
    sourceType: "state-order",
    publicationDate: "2024-02-01",
    eventDate: "2024-02-01",
    geography: "India",
    confidence: "official",
    summary:
      "Requires weekly disclosure of rice stocks on the department portal. A transparency measure, not a stock limit or price cap.",
    demo: true,
  },
  {
    id: "src-export-2023",
    title: "Prohibition on export of non-basmati white rice",
    publisher: "Directorate General of Foreign Trade",
    sourceType: "state-order",
    publicationDate: "2023-07-20",
    eventDate: "2023-07-20",
    geography: "India",
    confidence: "official",
    summary: "Restricts exports to protect domestic availability; later relaxed in stages.",
    demo: true,
  },
  {
    id: "src-parl-proc",
    title: "Lok Sabha unstarred question on paddy procurement and rice prices",
    publisher: "Parliament of India",
    sourceType: "parliamentary-answer",
    publicationDate: "2024-12-10",
    geography: "India",
    confidence: "official",
    summary:
      "Tabled state-wise procurement and average retail price figures; a common route to state-level numbers that are otherwise unpublished.",
    demo: true,
  },
  {
    id: "src-tn-pds",
    title: "Free rice scheme issue price notification",
    publisher: "Cooperation, Food and Consumer Protection Department, Tamil Nadu",
    sourceType: "state-order",
    publicationDate: "2025-04-01",
    geography: "Tamil Nadu",
    confidence: "official",
    summary: "Confirms ₹0/kg issue price of PDS rice for eligible cardholders in Tamil Nadu.",
    demo: true,
  },
  {
    id: "src-crop-est",
    title: "Season and crop report — paddy area, production and yield",
    publisher: "Department of Economics and Statistics, Tamil Nadu",
    sourceType: "government-dataset",
    publicationDate: "2025-11-20",
    geography: "Tamil Nadu",
    confidence: "official",
    summary:
      "Area and production estimates by season. Published with a lag, so it cannot explain a price movement while it is happening.",
    demo: true,
  },
  {
    id: "src-news-2026",
    title: "Fine rice varieties dearer as arrivals from Andhra and Telangana slow",
    publisher: "Reported trade coverage, Tamil dailies",
    sourceType: "news-report",
    publicationDate: "2026-07-18",
    geography: "Tamil Nadu",
    confidence: "reported",
    summary:
      "Market quotations from traders and millers. Useful for direction and variety detail, but not a statistically sampled price series.",
    demo: true,
  },
  {
    id: "src-cauvery",
    title: "Cauvery water release and Kuruvai coverage updates",
    publisher: "Public Works Department, Tamil Nadu",
    sourceType: "government-dataset",
    publicationDate: "2026-07-05",
    geography: "Cauvery delta",
    confidence: "official",
    summary: "Release schedules and command area coverage used to assess Kuruvai risk.",
    demo: true,
  },
  {
    id: "src-site-estimate",
    title: "Rice Price Tracker internal estimate",
    publisher: "Rice Price Tracker",
    sourceType: "site-estimate",
    publicationDate: "2026-08-01",
    geography: "Tamil Nadu",
    confidence: "estimated",
    summary:
      "Interpolated or modelled values used to build and test the interface. These are not observations and must not be cited.",
    demo: true,
  },
];

export interface Correction {
  id: string;
  date: string;
  summary: string;
}

export const corrections: Correction[] = [
  {
    id: "cor-1",
    date: "2026-07-22",
    summary:
      "The 2023 figure of ₹51.99/kg was initially shown as a full-year average. It is a January–June partial-year average and is now labelled as such everywhere.",
  },
  {
    id: "cor-2",
    date: "2026-07-29",
    summary:
      "A district table mixed paddy quotations in ₹/quintal with rice prices in ₹/kg. Paddy rows are now separated and unit conversion metadata is required.",
  },
  {
    id: "cor-3",
    date: "2026-08-02",
    summary:
      "An early draft described Grade A procurement paddy as 'fine rice'. The two are distinct and the variety pages now say so explicitly.",
  },
];

export const methodology = [
  {
    heading: "What counts as a data point",
    body: "Every price on this site carries an observation date, publication date, geography, variety, commodity form, processing, package type, market stage, unit and confidence level. If any of those are unknown, the record is marked Unavailable rather than guessed.",
  },
  {
    heading: "Confidence levels",
    body: "Official data comes from a government dataset, order or parliamentary answer. Reported market quote comes from trade or press reporting. Estimated is our own interpolation for interface development. Unavailable means no credible value exists.",
  },
  {
    heading: "Comparability groups",
    body: "Each record belongs to a comparability group combining commodity, market stage, grade and unit. Charts and tables refuse to average across groups, and the interface warns when a user compares across them.",
  },
  {
    heading: "Unit handling",
    body: "Paddy is quoted in ₹/quintal, retail rice in ₹/kg. Conversion is only performed when the record carries explicit conversion metadata; otherwise the values stay separate.",
  },
  {
    heading: "Corrections",
    body: "Errors are corrected in place with a dated entry in the corrections log. We do not silently edit published numbers.",
  },
];