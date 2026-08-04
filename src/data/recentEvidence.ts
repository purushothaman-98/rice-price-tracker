import { procurementPublicRecord, retailPublicRecord } from "./publicRecord";

export type RecentSourceKind =
  | "official-release"
  | "official-notification"
  | "reported-official-statement"
  | "reported-market";

export interface RecentEvidenceSource {
  id: string;
  year: number;
  title: string;
  publisher: string;
  publishedDate: string;
  url: string;
  kind: RecentSourceKind;
  note: string;
}

export interface RecentEvidenceItem {
  id: string;
  year: number;
  date: string;
  theme: "Procurement" | "Weather and crop" | "Market prices" | "Trade policy" | "Public distribution";
  title: string;
  evidenceType: "Official policy" | "Official statement reported" | "Market reporting";
  whatIsSupported: string;
  figures: string[];
  interpretation: string;
  limitation: string;
  sourceIds: string[];
}

export interface EvidenceYearSummary {
  year: number;
  headline: string;
  summary: string;
  evidenceCount: number;
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
    id: "pib-msp-2019",
    year: 2019,
    title: "Procurement of Paddy: KMS 2019–20 MSP",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2019-12-13",
    url: "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1596395",
    kind: "official-release",
    note: "Official Union MSP: ₹1,815/quintal for common paddy and ₹1,835 for Grade A in KMS 2019–20.",
  },
  {
    id: "tnie-tn-incentive-2019",
    year: 2019,
    title: "Tamil Nadu revises paddy support price; DPC communication problems reported",
    publisher: "The New Indian Express",
    publishedDate: "2019-10-10",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2019/Oct/10/state-revises-support-price-for-paddy-dpc-staff-unaware-of-revision-2045546.html",
    kind: "reported-official-statement",
    note: "Reports state incentives of ₹50/common and ₹70/Grade A, creating final DPC prices of ₹1,865 and ₹1,905, alongside implementation delays.",
  },
  {
    id: "pib-covid-procurement-2020",
    year: 2020,
    title: "Paddy procurement in Tamil Nadu during the COVID-19 lockdown",
    publisher: "Press Information Bureau / Food Corporation of India",
    publishedDate: "2020-06-18",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1632926&lang=2&reg=48",
    kind: "official-release",
    note: "Reports 24.79 lakh tonnes procured during KMS 2019–20 at the dated checkpoint and an increase in procurement centres from 1,766 to 2,094.",
  },
  {
    id: "tnie-record-procurement-2020",
    year: 2020,
    title: "Tamil Nadu reports record 32.41 lakh tonnes of paddy procurement in 2019–20",
    publisher: "The New Indian Express",
    publishedDate: "2020-10-04",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2020/Oct/04/collectors-can-open-more-dpcs-for-paddy-kamaraj-2205522.html",
    kind: "reported-official-statement",
    note: "Reports the Food Minister's final-season statement: 2,135 DPCs, 32.41 lakh tonnes, ₹6,130 crore and 5,85,241 farmers.",
  },
  {
    id: "tnie-rain-harvest-2021",
    year: 2021,
    title: "Unseasonal rain raises moisture and quality problems in the delta harvest",
    publisher: "The New Indian Express",
    publishedDate: "2021-01-26",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2021/Jan/26/its-an-unhappy-harvest-seasonfor-delta-farmers-2255298.html",
    kind: "reported-market",
    note: "Reports crop damage, delayed harvest, high moisture, DPC prices and open-market paddy prices below the procurement price.",
  },
  {
    id: "tnie-moisture-request-2021",
    year: 2021,
    title: "Tamil Nadu seeks higher moisture allowance and additional procurement centres",
    publisher: "The New Indian Express",
    publishedDate: "2021-10-04",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2021/Oct/04/tamil-nadu-to-ask-centre-to-increase-moisture-content-level-for-paddy-procurement-2367562.html",
    kind: "reported-official-statement",
    note: "Reports the Chief Minister's direction to seek relaxation of moisture norms after untimely rains and to open additional DPCs/mobile units.",
  },
  {
    id: "tnie-early-procurement-2022",
    year: 2022,
    title: "Tamil Nadu advances KMS procurement to 1 September with revised prices",
    publisher: "The New Indian Express",
    publishedDate: "2022-07-20",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2022/Jul/20/tamil-nadu-farmers-welcome-decision-to-procure-kuruvai-paddy-at-revised-rate-from-september-1-2478817.html",
    kind: "reported-official-statement",
    note: "Reports final state procurement prices of ₹2,115/common and ₹2,160/Grade A and the one-month advancement of the procurement season.",
  },
  {
    id: "tnie-nccf-2022",
    year: 2022,
    title: "NCCF begins paddy procurement in 23 non-delta districts",
    publisher: "The New Indian Express",
    publishedDate: "2022-09-26",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2022/Sep/26/nccf-purchase-of-paddy-begins-in-non-delta-districts-of-tamil-nadu-2502255.html",
    kind: "reported-official-statement",
    note: "Reports institutional expansion beyond the delta, 17% moisture norms and a 68% rice-return norm after milling.",
  },
  {
    id: "pib-rice-export-controls-2022",
    year: 2022,
    title: "Broken-rice export ban and 20% duty on several non-basmati categories",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2022-09-22",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1861558&lang=2&reg=48",
    kind: "official-release",
    note: "Explains the September 2022 export controls intended to increase domestic availability and moderate prices.",
  },
  {
    id: "tnie-moisture-relax-2023",
    year: 2023,
    title: "Centre relaxes procurement specifications after unseasonal rain",
    publisher: "The New Indian Express",
    publishedDate: "2023-02-24",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2023/Feb/24/centre-relaxes-paddy-procurement-norms-for-tamil-nadu-but-farmers-unhappy-over-no-compensation-cla-2550320.html",
    kind: "reported-official-statement",
    note: "Reports moisture relaxation from 17% to 20% and higher limits for immature and damaged grain, with state liability for losses.",
  },
  {
    id: "tnie-fine-arrivals-2023",
    year: 2023,
    title: "Fine-rice price pressure linked to lower arrivals from Andhra Pradesh and Telangana",
    publisher: "The New Indian Express",
    publishedDate: "2023-03-08",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2023/Mar/08/rice-price-may-rise-rs-10-kg-as-arrivals-from-andhra-pradesh-dip-2554176.html",
    kind: "reported-market",
    note: "Reports reduced BPT 5204 and RNR arrivals, depleted mill stocks and a forecast—not an observation—of retail prices rising from about ₹50 to ₹60/kg.",
  },
  {
    id: "tnie-omss-change-2023",
    year: 2023,
    title: "Tamil Nadu considers NCCF rice after OMSS access changes",
    publisher: "The New Indian Express",
    publishedDate: "2023-06-17",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2023/Jun/17/tamil-nadu-may-buy-rice-from-national-coopfederation-soon-2585770.html",
    kind: "reported-official-statement",
    note: "Reports that Tamil Nadu had purchased 60,000 tonnes under OMSS at ₹35.50/kg before considering NCCF procurement following a Union policy change.",
  },
  {
    id: "pib-white-rice-ban-2023",
    year: 2023,
    title: "Non-basmati white-rice exports prohibited",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2023-07-20",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1941139&lang=2&reg=48",
    kind: "official-release",
    note: "Official ban citing 11.5% year-on-year and 3% month-on-month all-India retail rice-price increases and a 35% rise in exports during April–June.",
  },
  {
    id: "pib-parboiled-duty-2023",
    year: 2023,
    title: "20% export duty imposed on parboiled rice",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2023-10-18",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1969128",
    kind: "official-release",
    note: "Records the 25 August 2023 duty and later extension, while reporting a subsequent fall in parboiled-rice export volumes.",
  },
  {
    id: "tnie-kuruvai-drop-2023",
    year: 2023,
    title: "Thanjavur DPCs report 38% fall in kuruvai procurement",
    publisher: "The New Indian Express",
    publishedDate: "2023-11-10",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2023/Nov/10/tns-rice-bowl-has-no-good-news-thanjavur-direct-purchase-centresreport-38-drop-in-kuruvai-paddy-proc-2631617.html",
    kind: "reported-market",
    note: "Reports 1.36 lakh tonnes procured versus 2.19 lakh tonnes a year earlier, lower yield and farmer preference for private traders.",
  },
  {
    id: "tnie-paddy-surge-2024",
    year: 2024,
    title: "Fine-paddy prices rise sharply amid crop and water stress",
    publisher: "The New Indian Express",
    publishedDate: "2024-02-06",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2024/Feb/06/dip-in-production-summer-concern-push-paddy-prices-up-in-tamil-nadu",
    kind: "reported-market",
    note: "Reports Tiruchy samba acreage at 35,000 hectares versus 56,000, fine paddy near ₹1,800/62 kg bag and a forecast of higher rice prices.",
  },
  {
    id: "pib-omss-2024-25",
    year: 2024,
    title: "OMSS reserve-price structure for rice in 2024–25",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2025-02-11",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2101827",
    kind: "official-release",
    note: "Lists the original ₹2,800/quintal private/state channel and ₹2,400 Bharat/community channel, followed by the revised ₹2,250 state/community channel.",
  },
  {
    id: "tnie-procurement-drop-2024",
    year: 2024,
    title: "Tamil Nadu paddy procurement falls by 9.26 lakh tonnes in 2023–24",
    publisher: "The New Indian Express",
    publishedDate: "2024-09-02",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2024/Sep/02/paddy-procurement-in-tamil-nadu-for-pds-dips-by-92l-mt",
    kind: "reported-official-statement",
    note: "Reports 34.96 lakh tonnes versus 44.22 lakh tonnes, estimated rice recovery of 23–24 lakh tonnes and additional interstate supply needs.",
  },
  {
    id: "dgft-white-rice-2024",
    year: 2024,
    title: "Notification 31/2024-25: non-basmati white-rice exports reopened",
    publisher: "Directorate General of Foreign Trade / APEDA",
    publishedDate: "2024-09-28",
    url: "https://apeda.gov.in/sites/default/files/dgft_notifications/Notification_No_31_2024_25.pdf",
    kind: "official-notification",
    note: "Changed exports from prohibited to free subject initially to a USD 490/tonne minimum export price.",
  },
  {
    id: "tnie-paddy-drop-2025",
    year: 2025,
    title: "Bumper-harvest expectations lower open-market paddy prices",
    publisher: "The New Indian Express",
    publishedDate: "2025-01-20",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Jan/20/paddy-rate-drops-in-tamil-nadu-rice-price-may-fall-10-per-cent",
    kind: "reported-market",
    note: "Reports ₹200–₹300 declines per 62 kg bag and RNR paddy at ₹1,300–₹1,400; the predicted retail decline is explicitly a forecast.",
  },
  {
    id: "pib-omss-revision-2025",
    year: 2025,
    title: "Revised OMSS rice price of ₹2,250/quintal for states and community kitchens",
    publisher: "Press Information Bureau / Department of Food and Public Distribution",
    publishedDate: "2025-01-17",
    url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2093933&lang=2&reg=48",
    kind: "official-release",
    note: "Official revision allowing qualifying state purchases without e-auction at a pan-India reserve price of ₹2,250/quintal.",
  },
  {
    id: "dgft-broken-rice-2025",
    year: 2025,
    title: "Notification 61/2024-25: broken-rice exports reopened",
    publisher: "Directorate General of Foreign Trade / APEDA",
    publishedDate: "2025-03-07",
    url: "https://apeda.gov.in/sites/default/files/dgft_notifications/Notification_61_English.pdf",
    kind: "official-notification",
    note: "Changed broken-rice exports from prohibited to free with immediate effect.",
  },
  {
    id: "tnie-procurement-price-2025",
    year: 2025,
    title: "Tamil Nadu fixes final 2025–26 procurement prices",
    publisher: "The New Indian Express",
    publishedDate: "2025-08-30",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Aug/30/ahead-of-kharif-marketing-season-tamil-nadu-fixes-procurement-price-at-rs-2545",
    kind: "reported-official-statement",
    note: "Reports final state prices of ₹2,500/common and ₹2,545/Grade A from 1 September 2025.",
  },
  {
    id: "tnie-procurement-nov-2025",
    year: 2025,
    title: "Tamil Nadu reports much faster same-date procurement in 2025–26",
    publisher: "The New Indian Express",
    publishedDate: "2025-11-19",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Nov/19/cm-stalin-urges-pm-to-relax-paddy-procurement-norms-for-tamil-nadu/",
    kind: "reported-official-statement",
    note: "Reports 14.11 lakh tonnes by 16 November versus about 4.81 lakh tonnes at the same point a year earlier, with 1,932 DPCs.",
  },
  {
    id: "tnie-moisture-rejection-2025",
    year: 2025,
    title: "Centre rejects Tamil Nadu request to raise moisture norm to 22%",
    publisher: "The New Indian Express",
    publishedDate: "2025-11-21",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2025/Nov/21/centre-rejects-tns-plea-to-relax-paddy-moisture-norm-by-5-per-cent",
    kind: "reported-official-statement",
    note: "Reports retention of the 17% moisture ceiling while allowing a limited relaxation for damaged/discoloured/sprouted grain.",
  },
  {
    id: "pib-msp-2026-27",
    year: 2026,
    title: "Cabinet approves paddy MSP for KMS 2026–27",
    publisher: "Press Information Bureau / Ministry of Agriculture and Farmers Welfare",
    publishedDate: "2026-05-13",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2260618",
    kind: "official-release",
    note: "Sets ₹2,441/quintal for common paddy and ₹2,461 for Grade A, both ₹72 above 2025–26.",
  },
  {
    id: "tnie-fine-paddy-jun-2026",
    year: 2026,
    title: "Fine and superfine paddy reaches ₹37–₹42/kg",
    publisher: "The New Indian Express",
    publishedDate: "2026-06-23",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/23/tamil-nadu-prices-of-fine-and-superfine-paddy-hit-all-time-high-of-rs-42kg-as-harvest-ends",
    kind: "reported-market",
    note: "Reports Akshaya Ponni at ₹37–₹42/kg and RNR/Sree around ₹37–₹38/kg as market arrivals weakened.",
  },
  {
    id: "tnie-stock-claim-jul-2026",
    year: 2026,
    title: "Millers claim adequate aggregate stock despite kuruvai risk",
    publisher: "The New Indian Express",
    publishedDate: "2026-07-08",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/08/tn-has-excess-paddy-stocks-kuruvai-crop-failure-wont-push-up-rice-prices-say-mill-owners",
    kind: "reported-market",
    note: "Reports an industry claim of about five lakh tonnes of surplus paddy alongside ₹5–₹6/kg increases in BPT and Sona Ponni.",
  },
  {
    id: "tnie-rice-surge-jul-2026",
    year: 2026,
    title: "Selected Tamil Nadu rice quotations rise ₹10–₹15/kg",
    publisher: "The New Indian Express",
    publishedDate: "2026-07-23",
    url: "https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/23/rice-prices-in-tn-up-by-rs-15kg-due-to-supply-crunch",
    kind: "reported-market",
    note: "Reports local retailer quotations for selected varieties; these are not a weighted state-wide average.",
  },
];

export const recentEvidenceItems: RecentEvidenceItem[] = [
  {
    id: "evidence-2019-price-floor",
    year: 2019,
    date: "Jul–Oct 2019",
    theme: "Procurement",
    title: "The administered paddy floor rose, but transmission to DPCs was uneven",
    evidenceType: "Official statement reported",
    whatIsSupported: "The Union MSP was ₹1,815/quintal for common paddy and ₹1,835 for Grade A. Tamil Nadu added ₹50 and ₹70 respectively, producing final DPC prices of ₹1,865 and ₹1,905. Reporting from Thanjavur found that some DPC staff had not received or implemented the revised order when procurement began.",
    figures: ["Common ₹1,865/qtl final TN price", "Grade A ₹1,905/qtl", "State incentive: ₹50/₹70"],
    interpretation: "2019 shows why a legal price announcement and an effective farmer price are separate stages. Administrative communication and centre readiness affect whether the policy floor is actually accessible.",
    limitation: "The article documents problems at selected centres; it does not prove statewide non-compliance or quantify how many farmers were affected.",
    sourceIds: ["pib-msp-2019", "tnie-tn-incentive-2019"],
  },
  {
    id: "evidence-2020-covid-scale",
    year: 2020,
    date: "Mar–Sep 2020",
    theme: "Procurement",
    title: "Lockdown-era procurement expanded rather than contracting",
    evidenceType: "Official statement reported",
    whatIsSupported: "PIB reported 24.79 lakh tonnes procured during KMS 2019–20 at a June checkpoint, including 4.94 lakh tonnes during lockdown, with centres increased from 1,766 to 2,094. The final state statement later reported 32.41 lakh tonnes through 2,135 DPCs, ₹6,130 crore paid and 5,85,241 farmers covered.",
    figures: ["24.79 LMT by June checkpoint", "32.41 LMT final season", "2,135 DPCs", "₹6,130 crore"],
    interpretation: "The procurement network became an important shock absorber during COVID-19. The rise reflects institutional scaling and farmer participation, not automatically a rise in retail rice prices.",
    limitation: "Checkpoint and final-season figures must not be mixed. Procurement volume is paddy, while PDS distribution and retail rice prices are different measurements.",
    sourceIds: ["pib-covid-procurement-2020", "tnie-record-procurement-2020", "tncsc-procurement"],
  },
  {
    id: "evidence-2021-rain-moisture",
    year: 2021,
    date: "Jan–Oct 2021",
    theme: "Weather and crop",
    title: "Rain converted a production problem into a procurement-quality problem",
    evidenceType: "Market reporting",
    whatIsSupported: "Unseasonal rain delayed harvest, raised moisture and damaged crops. In one delta report, open-market paddy prices fell below the DPC price while millers warned that lower-quality wet grain could require interstate sourcing. Later in the year Tamil Nadu sought moisture relaxation and additional DPC/mobile units.",
    figures: ["DPC price reported: ₹19.18–₹19.58/kg paddy", "Open market: below ₹850/62 kg bag", "Moisture norm pressure"],
    interpretation: "When grain is wet, the key bottleneck may be eligibility and drying capacity rather than aggregate production alone. Farmers can face distress even while consumer prices later rise because quality loss and handling costs move in opposite directions.",
    limitation: "The price quotations are local and contemporaneous. They cannot be converted into a statewide retail-rice series.",
    sourceIds: ["tnie-rain-harvest-2021", "tnie-moisture-request-2021"],
  },
  {
    id: "evidence-2022-system-and-trade",
    year: 2022,
    date: "Jul–Sep 2022",
    theme: "Trade policy",
    title: "Procurement expanded geographically while national export controls tightened",
    evidenceType: "Official policy",
    whatIsSupported: "Tamil Nadu advanced procurement to 1 September and paid ₹2,115/common and ₹2,160/Grade A. NCCF procurement began in 23 non-delta districts. Nationally, broken-rice exports were prohibited and a 20% duty was imposed on several non-basmati categories in September.",
    figures: ["Common ₹2,115/qtl", "Grade A ₹2,160/qtl", "23 non-delta districts", "20% export duty"],
    interpretation: "Two policy layers operated simultaneously: the state widened farmer access to procurement, while the Union government attempted to protect domestic availability through trade restrictions.",
    limitation: "Neither policy alone identifies the effect on Tamil Nadu retail prices. Export restrictions act nationally, while procurement access varies by district and crop quality.",
    sourceIds: ["tnie-early-procurement-2022", "tnie-nccf-2022", "pib-rice-export-controls-2022"],
  },
  {
    id: "evidence-2023-rain-and-fine-rice",
    year: 2023,
    date: "Feb–Mar 2023",
    theme: "Market prices",
    title: "Weather damage and fine-variety arrival shortages appeared together",
    evidenceType: "Market reporting",
    whatIsSupported: "After unseasonal rain, procurement specifications were relaxed to accept up to 20% moisture with other quality relaxations. Separately, market reporting described lower BPT 5204 and RNR arrivals from Andhra Pradesh and Telangana, depleted mill stocks and stronger private paddy prices. The reported ₹10/kg retail increase was a forecast.",
    figures: ["Moisture relaxed: 17% → 20%", "Fine paddy: ₹1,400/63 kg bag reported", "₹50 → ₹60/kg rice was forecast"],
    interpretation: "The 2023 pressure had at least two channels: damaged local procurement conditions and reduced inflow of specific fine varieties. This supports analysing fine rice separately from common/PDS rice.",
    limitation: "The article does not provide a weighted arrival series or observed statewide retail increase. Forecasts remain forecasts until confirmed by dated price data.",
    sourceIds: ["tnie-moisture-relax-2023", "tnie-fine-arrivals-2023"],
  },
  {
    id: "evidence-2023-policy-and-kuruvai",
    year: 2023,
    date: "Jun–Nov 2023",
    theme: "Trade policy",
    title: "Domestic-supply intervention intensified as kuruvai procurement weakened",
    evidenceType: "Official policy",
    whatIsSupported: "Tamil Nadu explored NCCF purchases after changes to OMSS access. The Union government prohibited non-basmati white-rice exports in July and imposed a 20% duty on parboiled rice in August. In Thanjavur, kuruvai procurement was reported at 1.36 lakh tonnes versus 2.19 lakh tonnes a year earlier, with lower yield and private-trader preference.",
    figures: ["OMSS purchase reported: 60,000 tonnes at ₹35.50/kg", "White-rice export ban: 20 Jul", "Parboiled duty: 20%", "Thanjavur procurement: −38%"],
    interpretation: "By late 2023, both policy and local evidence pointed to tighter availability conditions, but the mechanisms differed: export control addressed national supply, while Cauvery-linked yield and farmer channel choice affected Tamil Nadu procurement.",
    limitation: "A district procurement decline is not a statewide production estimate. The Union policy's stated intention to lower prices does not prove the magnitude of its Tamil Nadu effect.",
    sourceIds: ["tnie-omss-change-2023", "pib-white-rice-ban-2023", "pib-parboiled-duty-2023", "tnie-kuruvai-drop-2023"],
  },
  {
    id: "evidence-2024-price-shock",
    year: 2024,
    date: "Jan–Feb 2024",
    theme: "Market prices",
    title: "Fine-paddy prices surged as acreage and water availability weakened",
    evidenceType: "Market reporting",
    whatIsSupported: "Tiruchy reporting placed samba acreage at 35,000 hectares versus 56,000 a year earlier and fine paddy near ₹1,800 per 62 kg bag versus about ₹1,300. Officials and millers expected higher rice prices, while the Union government introduced weekly stock disclosure and Bharat Rice.",
    figures: ["Samba acreage: 35k vs 56k ha", "Fine paddy: ~₹1,800/62 kg", "Stock disclosure from 2 Feb", "Bharat Rice ₹29/kg"],
    interpretation: "The episode combined a raw-material shock with transparency and public-stock interventions. The market evidence was strongest for fine paddy, while Bharat Rice targeted a lower-priced consumer channel.",
    limitation: "Predicted rice increases are not observed outcomes. Stock disclosure is not a stock ceiling, and Bharat Rice is not the private-market benchmark.",
    sourceIds: ["tnie-paddy-surge-2024", "stock-disclosure-2024", "bharat-rice-2024"],
  },
  {
    id: "evidence-2024-procurement-and-reopening",
    year: 2024,
    date: "Sep 2024",
    theme: "Procurement",
    title: "Procurement fell sharply even as national export policy began reopening",
    evidenceType: "Official statement reported",
    whatIsSupported: "Tamil Nadu procurement fell from 44.22 to 34.96 lakh tonnes in 2023–24. Reporting estimated 23–24 lakh tonnes of rice recovery and additional interstate requirements. Later in September, non-basmati white-rice exports reopened subject initially to a USD 490/tonne minimum export price.",
    figures: ["44.22 → 34.96 LMT paddy", "Decline: 9.26 LMT", "Rice recovery estimate: 23–24 LMT", "Export MEP: USD 490/t"],
    interpretation: "The state faced a weaker procurement year while the national policy stance shifted from emergency restriction toward normalization as broader stocks improved.",
    limitation: "Procurement is not total production: farmers may sell to private mills. The rice-recovery estimate and additional transport cost are reported estimates, not a full audited supply balance.",
    sourceIds: ["tnie-procurement-drop-2024", "dgft-white-rice-2024", "tncsc-procurement"],
  },
  {
    id: "evidence-2025-relief-and-policy-normalisation",
    year: 2025,
    date: "Jan–Mar 2025",
    theme: "Market prices",
    title: "Harvest relief and policy normalization arrived together",
    evidenceType: "Market reporting",
    whatIsSupported: "Open-market paddy prices reportedly fell ₹200–₹300 per 62 kg bag, with RNR at ₹1,300–₹1,400. The Union government revised OMSS state/community-kitchen rice to ₹2,250/quintal and reopened broken-rice exports in March.",
    figures: ["Paddy −₹200 to −₹300/62 kg", "RNR ₹1,300–₹1,400/bag", "OMSS state price ₹22.50/kg", "Broken rice exports: free"],
    interpretation: "The early-2025 evidence suggests a temporary easing phase driven by harvest supply, while national policy moved further away from the 2022–24 restriction regime.",
    limitation: "The predicted 10% retail decline was not an observed state series. OMSS reserve prices exclude the full retail cost chain.",
    sourceIds: ["tnie-paddy-drop-2025", "pib-omss-revision-2025", "dgft-broken-rice-2025"],
  },
  {
    id: "evidence-2025-procurement-acceleration",
    year: 2025,
    date: "Sep–Nov 2025",
    theme: "Procurement",
    title: "Higher state prices and expanded DPC capacity produced much faster early procurement",
    evidenceType: "Official statement reported",
    whatIsSupported: "Tamil Nadu fixed ₹2,500/common and ₹2,545/Grade A. By 16 November, it reported 14.11 lakh tonnes through 1,932 DPCs from 1,86,674 farmers for ₹3,559 crore, versus about 4.81 lakh tonnes at the same date a year earlier. The request to raise moisture tolerance from 17% to 22% was later rejected.",
    figures: ["Common ₹2,500/qtl", "Grade A ₹2,545/qtl", "14.11 LMT by 16 Nov", "1,932 DPCs", "Moisture ceiling remained 17%"],
    interpretation: "Procurement throughput improved dramatically, but wet-weather quality rules remained a binding constraint for some farmers. Capacity and eligibility can therefore move in opposite directions.",
    limitation: "Same-date progress is not a final-season comparison. Faster procurement can reflect harvest timing, crop size, centre count, incentives and farmer preference together.",
    sourceIds: ["tnie-procurement-price-2025", "tnie-procurement-nov-2025", "tnie-moisture-rejection-2025"],
  },
  {
    id: "evidence-2026-fine-segment",
    year: 2026,
    date: "May–Jul 2026",
    theme: "Market prices",
    title: "Aggregate procurement strength coexisted with fine-variety price stress",
    evidenceType: "Market reporting",
    whatIsSupported: "The Union MSP rose by ₹72/quintal. Press reporting quoted Akshaya Ponni paddy at ₹37–₹42/kg and RNR/Sree around ₹37–₹38/kg. Millers simultaneously claimed adequate aggregate stocks while acknowledging ₹5–₹6/kg rises in BPT and Sona Ponni; later local reporting described selected rice increases of ₹10–₹15/kg.",
    figures: ["MSP: +₹72/qtl", "Akshaya Ponni ₹37–₹42/kg paddy", "RNR/Sree ₹37–₹38/kg", "Selected rice +₹10–₹15/kg"],
    interpretation: "The strongest supported reading is market segmentation: total paddy availability and public procurement can be healthy while specific fine varieties tighten because of origin, quality, old-stock preference and inter-state arrivals.",
    limitation: "Industry stock figures are claims, and press quotations are local observations. No official weighted Tamil Nadu retail series for July 2026 is loaded here.",
    sourceIds: ["pib-msp-2026-27", "tnie-fine-paddy-jun-2026", "tnie-stock-claim-jul-2026", "tnie-rice-surge-jul-2026", "tncsc-procurement"],
  },
];

export const evidenceYearSummaries: EvidenceYearSummary[] = [
  { year: 2019, headline: "A higher price floor met implementation friction", summary: "The MSP-plus-incentive structure was clear, but DPC communication problems showed that announced support and accessible support are not identical.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2019).length },
  { year: 2020, headline: "COVID accelerated procurement-system scale", summary: "Tamil Nadu expanded centres and reached a then-record procurement volume, using public procurement as a farmer and food-security buffer.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2020).length },
  { year: 2021, headline: "Rain exposed moisture and quality bottlenecks", summary: "Wet paddy could be rejected or discounted even when DPC prices were above private quotations, revealing the importance of drying, storage and eligibility rules.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2021).length },
  { year: 2022, headline: "Procurement access widened as trade controls tightened", summary: "The state advanced the season and expanded non-delta procurement while the Union government restricted broken and non-basmati rice exports.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2022).length },
  { year: 2023, headline: "Fine-rice dependence became visible", summary: "Lower BPT/RNR arrivals, depleted stocks, rain damage, Cauvery-linked weakness and export restrictions combined into a more complex supply episode.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2023).length },
  { year: 2024, headline: "A broad intervention year", summary: "Fine-paddy inflation, lower procurement, stock disclosure, Bharat Rice, OMSS and later export reopening all appeared within the same year.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2024).length },
  { year: 2025, headline: "Harvest relief and procurement acceleration", summary: "Paddy prices eased early, export restrictions normalized, and the next procurement season began with higher state prices and much faster throughput.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2025).length },
  { year: 2026, headline: "The market split by variety", summary: "Strong aggregate procurement and stock claims did not prevent sharp prices in fine and superfine paddy, supporting a segmented rather than universal-shortage interpretation.", evidenceCount: recentEvidenceItems.filter((item) => item.year === 2026).length },
];

const retail2018 = retailPublicRecord.find((point) => point.year === "2018")?.value ?? 0;
const retail2022 = retailPublicRecord.find((point) => point.year === "2022")?.value ?? 0;
const procurement2018 = procurementPublicRecord.find((point) => point.season === "2018–19")?.lakhTonnes ?? 0;
const procurement2020 = procurementPublicRecord.find((point) => point.season === "2020–21")?.lakhTonnes ?? 0;
const procurement2022 = procurementPublicRecord.find((point) => point.season === "2022–23")?.lakhTonnes ?? 0;
const procurement2023 = procurementPublicRecord.find((point) => point.season === "2023–24")?.lakhTonnes ?? 0;
const procurement2024 = procurementPublicRecord.find((point) => point.season === "2024–25")?.lakhTonnes ?? 0;
const procurement2025 = procurementPublicRecord.find((point) => point.season === "2025–26")?.lakhTonnes ?? 0;

export const derivedFindings: DerivedFinding[] = [
  {
    title: "Official retail average rose substantially before the 2023 shock year",
    value: "+40.4%",
    calculation: `((₹${retail2022.toFixed(2)} − ₹${retail2018.toFixed(2)}) / ₹${retail2018.toFixed(2)}) × 100`,
    finding: "The official Tamil Nadu annual average retail-rice price increased from ₹34.28/kg in 2018 to ₹48.12/kg in 2022.",
    caution: "This is a change between two annual averages. It does not describe every variety, district, month or household purchase.",
    confidence: "high",
    sourceIds: ["rajya-sabha-1830"],
  },
  {
    title: "Procurement more than doubled between 2018–19 and 2020–21",
    value: "+135.2%",
    calculation: `((${procurement2020.toFixed(2)} − ${procurement2018.toFixed(2)}) / ${procurement2018.toFixed(2)}) × 100`,
    finding: `TNCSC procurement rose from ${procurement2018.toFixed(2)} to ${procurement2020.toFixed(2)} lakh tonnes across the two seasons that included the COVID-era scale-up.`,
    caution: "The calculation measures public procurement, not total state output and not retail-rice inflation.",
    confidence: "high",
    sourceIds: ["tncsc-procurement", "pib-covid-procurement-2020", "tnie-record-procurement-2020"],
  },
  {
    title: "The 2023–24 procurement fall was large",
    value: "−20.9%",
    calculation: `((${procurement2023.toFixed(2)} − ${procurement2022.toFixed(2)}) / ${procurement2022.toFixed(2)}) × 100`,
    finding: `Official TNCSC procurement declined from ${procurement2022.toFixed(2)} to ${procurement2023.toFixed(2)} lakh tonnes.`,
    caution: "Procurement can fall because production falls, farmers sell privately, eligibility rules bind, or several of these occur together.",
    confidence: "high",
    sourceIds: ["tncsc-procurement", "tnie-procurement-drop-2024"],
  },
  {
    title: "The following season recovered strongly",
    value: "+37.3%",
    calculation: `((${procurement2024.toFixed(2)} − ${procurement2023.toFixed(2)}) / ${procurement2023.toFixed(2)}) × 100`,
    finding: `Procurement rebounded from ${procurement2023.toFixed(2)} to ${procurement2024.toFixed(2)} lakh tonnes in 2024–25.`,
    caution: "A recovery in aggregate paddy procurement does not guarantee lower prices for fine varieties dependent on specific origins or quality attributes.",
    confidence: "high",
    sourceIds: ["tncsc-procurement"],
  },
  {
    title: "Same-date procurement in November 2025 was almost three times the prior year",
    value: "2.93×",
    calculation: "14.11 lakh tonnes ÷ 4.81 lakh tonnes",
    finding: "The reported same-date comparison indicates much faster early-season procurement throughput in 2025–26.",
    caution: "This is not a final-season growth rate. Harvest timing, DPC count, rainfall and farmer selling choices can alter the pace.",
    confidence: "high",
    sourceIds: ["tnie-procurement-nov-2025"],
  },
  {
    title: "The current in-progress procurement figure already exceeds 2024–25",
    value: "+17.1%",
    calculation: `((${procurement2025.toFixed(2)} − ${procurement2024.toFixed(2)}) / ${procurement2024.toFixed(2)}) × 100`,
    finding: `The TNCSC page reports ${procurement2025.toFixed(2)} lakh tonnes for 2025–26 up to 2 June 2026, versus ${procurement2024.toFixed(2)} lakh tonnes in 2024–25.`,
    caution: "The latest figure is explicitly dated and in progress. It must not be presented as a like-for-like final-season comparison.",
    confidence: "high",
    sourceIds: ["tncsc-procurement"],
  },
  {
    title: "The 2026 evidence supports a segmented market, not one uniform shortage",
    value: "Variety-specific",
    finding: "High fine-paddy quotations and selected rice-price increases appeared alongside strong public procurement and industry claims of adequate aggregate stocks. The most defensible interpretation is tightness in specific fine varieties and supply origins.",
    caution: "This remains an inference from multiple sources. It requires district arrivals, mill stocks and official variety-level retail data for stronger causal certainty.",
    confidence: "moderate",
    sourceIds: ["tnie-fine-paddy-jun-2026", "tnie-stock-claim-jul-2026", "tnie-rice-surge-jul-2026", "tncsc-procurement"],
  },
];

export const recentEvidenceSourceById = Object.fromEntries(
  recentEvidenceSources.map((source) => [source.id, source]),
) as Record<string, RecentEvidenceSource>;
