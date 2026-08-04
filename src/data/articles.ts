export interface Article {
  slug: string;
  kind: "explainer" | "fact-check" | "analysis" | "timeline";
  title: string;
  standfirst: string;
  date: string;
  readMinutes: number;
  known: string[];
  unknown: string[];
  href?: string;
}

export const articles: Article[] = [
  {
    slug: "why-fine-rice-only",
    kind: "analysis",
    title: "Why only fine rice is dearer this time",
    standfirst:
      "Total paddy availability in Tamil Nadu looks adequate in 2026. The pressure sits in a handful of fine varieties sourced from outside the state.",
    date: "2026-07-28",
    readMinutes: 7,
    known: [
      "Fine varieties in the demo series rose 3–6% month on month.",
      "Common rice and PDS-grade boiled rice moved less than 1%.",
      "Most fine rice sold in Tamil Nadu is milled from paddy grown in AP, Telangana and Karnataka.",
    ],
    unknown: [
      "Actual inter-state arrival volumes for July 2026.",
      "How much of the increase is mill margin rather than paddy cost.",
    ],
    href: "/watch-2026",
  },
  {
    slug: "gst-is-not-the-spike",
    kind: "fact-check",
    title: "Fact check: GST is not what makes rice jump ₹15 a kilo",
    standfirst:
      "A 5% levy on qualifying pre-packaged rice has been unchanged since 18 July 2022. Unchanged taxes cannot explain changing prices.",
    date: "2026-07-24",
    readMinutes: 5,
    known: [
      "5% on a ₹50/kg pre-packaged pack is roughly ₹2.40/kg.",
      "Loose rice is generally outside the levy.",
      "The rate has not changed since July 2022.",
    ],
    unknown: [
      "How much rice by volume in Tamil Nadu is actually sold pre-packaged versus loose.",
    ],
    href: "/tax",
  },
  {
    slug: "procurement-dip-2023-24",
    kind: "analysis",
    title: "The procurement dip that preceded the 2024 shock",
    standfirst:
      "TNCSC procurement fell from 44.22 to 34.96 lakh tonnes. Whether that was diversion or a smaller harvest is still not settled.",
    date: "2026-06-30",
    readMinutes: 9,
    known: [
      "Procurement fell about 21% year on year in 2023–24.",
      "It recovered to 47.99 lakh tonnes in 2024–25.",
    ],
    unknown: [
      "The split between reduced production and paddy sold to private buyers.",
      "District-level Direct Purchase Centre performance.",
    ],
    href: "/investigation-2024",
  },
  {
    slug: "reading-a-rice-price",
    kind: "explainer",
    title: "How to read a rice price without being misled",
    standfirst:
      "A number is meaningless without its variety, its unit, its market stage and the date it was observed.",
    date: "2026-06-12",
    readMinutes: 6,
    known: [
      "Paddy is quoted in ₹/quintal; retail rice in ₹/kg.",
      "Annual averages and single-day quotes are not comparable.",
      "'Grade A paddy' is a procurement grading term, not commercial fine rice.",
    ],
    unknown: ["Which variety most published Tamil Nadu 'rice price' figures actually refer to."],
    href: "/explorer",
  },
  {
    slug: "what-government-can-do",
    kind: "explainer",
    title: "What the government can actually do about your rice bill",
    standfirst:
      "MSP sets what farmers are paid. PDS sets what cardholders pay. Almost nothing directly sets the private retail price.",
    date: "2026-05-20",
    readMinutes: 8,
    known: [
      "PDS rice is ₹0/kg for eligible cardholders in Tamil Nadu.",
      "Stock declaration is a disclosure tool, not a price cap.",
    ],
    unknown: ["The measured retail effect of OMSS and Bharat Rice sales in Tamil Nadu."],
    href: "/government",
  },
  {
    slug: "timeline-2014-2026",
    kind: "timeline",
    title: "Twelve years of Tamil Nadu rice prices, annotated",
    standfirst:
      "Tax changes, export policy, Cauvery stress and two very different price shocks, laid against the retail benchmark.",
    date: "2026-05-02",
    readMinutes: 4,
    known: ["Annual averages from 2018 to 2022 are official figures."],
    unknown: ["Pre-2018 values in this build are estimates pending verification."],
    href: "/history",
  },
];

export interface ScrollySection {
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
  stat?: { value: string; label: string };
}

export const investigationSections: ScrollySection[] = [
  {
    id: "s1",
    eyebrow: "Chapter 1",
    heading: "Mills went into the season with thin stocks",
    body: [
      "Through mid-2023, millers in the delta and in western Tamil Nadu reported carrying unusually low finished-rice stocks. Low carry-in stock removes the buffer that normally absorbs a weak arrival month.",
      "Because stock data was not published before the February 2024 declaration order, the picture rests on trade reporting. We label it Reported, not Official.",
    ],
    stat: { value: "Low", label: "Reported mill carry-in stocks, mid-2023" },
  },
  {
    id: "s2",
    eyebrow: "Chapter 2",
    heading: "Fine-rice arrivals from neighbouring states slowed",
    body: [
      "Tamil Nadu does not grow most of the fine rice it eats. BPT 5204, RNR and much of the Ponni sold in cities is milled from paddy grown in Andhra Pradesh, Telangana and Karnataka.",
      "When those arrivals slow, the fine-rice segment tightens even if Tamil Nadu's own paddy output is unremarkable.",
    ],
  },
  {
    id: "s3",
    eyebrow: "Chapter 3",
    heading: "Cauvery releases fell short and Kuruvai suffered",
    body: [
      "Reduced Cauvery releases in August 2023 constrained Kuruvai transplanting across the delta command area. Unseasonal rain later damaged standing and harvested crop in parts of Thanjavur, Nagapattinam and Cuddalore.",
      "The consequence was not only less paddy but wetter paddy, which mills discount and Direct Purchase Centres may reject on moisture grounds.",
    ],
  },
  {
    id: "s4",
    eyebrow: "Chapter 4",
    heading: "Private buyers outbid the Direct Purchase Centres",
    body: [
      "With market quotations running above MSP plus the state incentive, farmers who could sell privately did. TNCSC procurement fell from 44.22 lakh tonnes in 2022–23 to 34.96 lakh tonnes in 2023–24.",
      "We cannot separate diversion from a genuinely smaller harvest with published data. The fact-check rail marks this claim Partly true.",
    ],
    stat: { value: "−21%", label: "TNCSC procurement, 2023–24 vs 2022–23" },
  },
  {
    id: "s5",
    eyebrow: "Chapter 5",
    heading: "Margins widened between wholesale and retail",
    body: [
      "Reported wholesale-to-retail spreads widened in several markets during the first half of 2024. There is no official margin series for rice in Tamil Nadu, so this remains an inference from a thin sample.",
    ],
  },
  {
    id: "s6",
    eyebrow: "Chapter 6",
    heading: "The state reached for disclosure, not control",
    body: [
      "The February 2024 stock declaration order required traders, millers and large retailers to report holdings. Export restrictions were already in place. Bharat Rice and OMSS added supply at the margin.",
      "Prices nevertheless kept climbing to a monthly peak around ₹61.75/kg in June 2024.",
    ],
    stat: { value: "₹61.75", label: "Peak monthly retail benchmark, June 2024 (₹/kg)" },
  },
  {
    id: "s7",
    eyebrow: "Chapter 7",
    heading: "The correction came from the harvest",
    body: [
      "The 2024–25 season delivered 47.99 lakh tonnes of procurement and the benchmark eased to ₹55.51/kg by December 2025.",
      "The most defensible reading is that supply, not policy, ended the episode. That is an interpretation, and we label it as one.",
    ],
    stat: { value: "47.99", label: "TNCSC procurement 2024–25 (lakh tonnes)" },
  },
];