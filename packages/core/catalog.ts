// AUTO-GENERATED from blueprints by a one-off script. Lightweight metadata only, so catalog
// pages don't ship every blueprint's full curriculum. Regenerate when blueprints change
// (the catalog test asserts it stays in sync).
import type { BilingualText, BlueprintCategory } from './schemas';

export interface CatalogEntry {
  id: string;
  category: BlueprintCategory;
  code: string;
  title: BilingualText;
  subtitle: BilingualText;
  archetypeLabel: BilingualText;
  recommendedWeeks: number;
  baselineTotalHours: number;
  phases: number;
  steps: number;
}

export const CATALOG: CatalogEntry[] = [
  {
    "id": "tedx-oratory",
    "category": "rhetoric",
    "code": "TEDX-01",
    "title": {
      "en": "TEDx Keynote Mastery",
      "uz": "TEDx sahna va asosiy maʼruza mahorati"
    },
    "subtitle": {
      "en": "Idea-throughline architecture, narrative tension, and calm stage command.",
      "uz": "Asosiy gʻoya oʻqi, dramatik hikoya qurilishi va sahnada bosiq hukmronlik."
    },
    "archetypeLabel": {
      "en": "TEDx Speaker",
      "uz": "TEDx maʼruzachisi"
    },
    "recommendedWeeks": 6,
    "baselineTotalHours": 42,
    "phases": 3,
    "steps": 18
  },
  {
    "id": "legal-advocacy",
    "category": "rhetoric",
    "code": "ADV-02",
    "title": {
      "en": "Trial Advocacy & Persuasive Argumentation",
      "uz": "Sud nutqi va ishontiruvchi huquqiy argumentatsiya"
    },
    "subtitle": {
      "en": "Case theory discipline, cross-examination control, and courtroom ethos.",
      "uz": "Ish nazariyasi intizomi, qarshi soʻroq nazorati va sud zalidagi nufuz."
    },
    "archetypeLabel": {
      "en": "Trial Advocate",
      "uz": "Sud advokati"
    },
    "recommendedWeeks": 8,
    "baselineTotalHours": 52,
    "phases": 3,
    "steps": 18
  },
  {
    "id": "senatorial-rhetoric",
    "category": "rhetoric",
    "code": "SEN-03",
    "title": {
      "en": "Senatorial & Policy Debating",
      "uz": "Senatorlik notiqligi va siyosiy-strategik debat"
    },
    "subtitle": {
      "en": "Institutional ethos, legislative framing, coalition persuasion, and hostile Q&A.",
      "uz": "Institutsional salobat, qonunchilik ramkalashi, koalitsiya ishontirishi va keskin savollar."
    },
    "archetypeLabel": {
      "en": "Senator & Statesman",
      "uz": "Senator va davlat arbobi"
    },
    "recommendedWeeks": 6,
    "baselineTotalHours": 40,
    "phases": 3,
    "steps": 18
  },
  {
    "id": "ielts-academic",
    "category": "academic",
    "code": "IELTS-AC",
    "title": {
      "en": "IELTS Academic Mastery",
      "uz": "IELTS Academic yuqori ball dasturi"
    },
    "subtitle": {
      "en": "Band 7.5–8.5 precision across Writing Task 1/2, Speaking Part 3, Reading & Listening.",
      "uz": "Writing Task 1/2, Speaking Part 3, Reading va Listening boʻyicha Band 7.5–8.5 aniqligi."
    },
    "archetypeLabel": {
      "en": "Academic English",
      "uz": "Akademik ingliz tili"
    },
    "recommendedWeeks": 8,
    "baselineTotalHours": 96,
    "phases": 3,
    "steps": 18
  },
  {
    "id": "sat-digital",
    "category": "academic",
    "code": "SAT-DIG",
    "title": {
      "en": "Digital SAT 1500+ Blueprint",
      "uz": "Digital SAT 1500+ tayyorgarlik dasturi"
    },
    "subtitle": {
      "en": "Adaptive Reading & Writing logic, Desmos speed, and hard Module 2 precision.",
      "uz": "Adaptiv Reading & Writing mantiqi, Desmos tezligi va murakkab 2-modul aniqligi."
    },
    "archetypeLabel": {
      "en": "Undergraduate Admissions",
      "uz": "Xalqaro universitet qabuli"
    },
    "recommendedWeeks": 8,
    "baselineTotalHours": 90,
    "phases": 3,
    "steps": 15
  },
  {
    "id": "toefl-ibt",
    "category": "academic",
    "code": "TOEFL-iBT",
    "title": {
      "en": "TOEFL iBT 110+ Intensive",
      "uz": "TOEFL iBT 110+ intensiv dasturi"
    },
    "subtitle": {
      "en": "Academic lecture synthesis, integrated speaking delivery, and concise academic writing.",
      "uz": "Akademik maʼruza sintezi, integratsiyalashgan Speaking va aniq akademik Writing."
    },
    "archetypeLabel": {
      "en": "University English",
      "uz": "Universitet ingliz tili"
    },
    "recommendedWeeks": 6,
    "baselineTotalHours": 68,
    "phases": 3,
    "steps": 15
  },
  {
    "id": "lsat",
    "category": "legal",
    "code": "LSAT",
    "title": {
      "en": "LSAT 170+ Analytical Mastery",
      "uz": "LSAT 170+ mantiqiy tahlil mahorati"
    },
    "subtitle": {
      "en": "Logical Reasoning flaw taxonomy, conditional chains, and comparative Reading Comprehension.",
      "uz": "Mantiqiy xatolar taksonomiyasi, shartli zanjirlar va qiyosiy Reading Comprehension."
    },
    "archetypeLabel": {
      "en": "Law School Admission",
      "uz": "Huquq maktabi qabuli"
    },
    "recommendedWeeks": 10,
    "baselineTotalHours": 120,
    "phases": 3,
    "steps": 15
  },
  {
    "id": "sqe",
    "category": "legal",
    "code": "SQE1/2",
    "title": {
      "en": "SQE1 & SQE2 Solicitor Qualification",
      "uz": "SQE1 va SQE2 Angliya solisitorlik imtihoni"
    },
    "subtitle": {
      "en": "FLK1/FLK2 single-best-answer law application plus SQE2 advocacy, drafting & interviewing.",
      "uz": "FLK1/FLK2 huquqiy qoʻllash testlari hamda SQE2 advokatlik, hujjat tuzish va mijoz suhbati."
    },
    "archetypeLabel": {
      "en": "England & Wales Solicitor",
      "uz": "Angliya va Uels solisitori"
    },
    "recommendedWeeks": 12,
    "baselineTotalHours": 160,
    "phases": 3,
    "steps": 12
  },
  {
    "id": "bar-ube",
    "category": "legal",
    "code": "UBE-BAR",
    "title": {
      "en": "UBE / Bar Exam Strategic Plan",
      "uz": "UBE / Bar Exam strategik tayyorgarlik rejasi"
    },
    "subtitle": {
      "en": "MBE 7-subject black-letter precision, 30-minute MEE IRAC essays, and 90-minute MPT drafting.",
      "uz": "MBE 7 fan boʻyicha qatʼiy qoidalar, 30 daqiqalik MEE IRAC insholari va 90 daqiqalik MPT."
    },
    "archetypeLabel": {
      "en": "US Bar Admission",
      "uz": "AQSH advokatlik litsenziyasi"
    },
    "recommendedWeeks": 10,
    "baselineTotalHours": 180,
    "phases": 3,
    "steps": 12
  },
  {
    "id": "toles",
    "category": "legal",
    "code": "TOLES-ADV",
    "title": {
      "en": "TOLES Legal English & Commercial Drafting",
      "uz": "TOLES yuridik ingliz tili va tijorat shartnomalari"
    },
    "subtitle": {
      "en": "Modern commercial contract precision, legal collocations, and cross-border advisory clarity.",
      "uz": "Zamonaviy tijorat shartnomalari aniqligi, yuridik iboralar va xalqaro maslahat xatlari."
    },
    "archetypeLabel": {
      "en": "International Commercial Law",
      "uz": "Xalqaro tijorat huquqi"
    },
    "recommendedWeeks": 6,
    "baselineTotalHours": 48,
    "phases": 3,
    "steps": 9
  }
];

export const getCatalogEntry = (id: string): CatalogEntry | undefined => CATALOG.find((e) => e.id === id);
