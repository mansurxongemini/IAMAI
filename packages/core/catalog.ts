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
  /** Exam or format version the curriculum follows, the date it was checked, and its official sources. */
  examVersion: string;
  lastVerified: string;
  sources: { label: string; url: string }[];
  phases: number;
  steps: number;
}

export const CATALOG: CatalogEntry[] = [
  {
    "id": "tedx-oratory",
    "category": "rhetoric",
    "code": "TEDX-01",
    "title": {
      "en": "TEDx Talk Preparation",
      "uz": "TEDx nutqiga tayyorgarlik"
    },
    "subtitle": {
      "en": "One clear idea, a script written for the ear, and enough rehearsal to deliver it naturally in under 18 minutes.",
      "uz": "Bitta aniq gʻoya, quloq uchun yozilgan matn va uni 18 daqiqadan kam vaqtda tabiiy yetkazish uchun yetarli mashq."
    },
    "archetypeLabel": {
      "en": "TEDx speaker",
      "uz": "TEDx maʼruzachisi"
    },
    "recommendedWeeks": 7,
    "baselineTotalHours": 48,
    "examVersion": "TEDx talk — TEDx Rules, Content Guidelines and organizer speaker guidance (ted.com, 2026)",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "TED — TEDx Rules",
        "url": "https://www.ted.com/tedx/before-you-start/tedx-rules"
      },
      {
        "label": "TED — TEDx Content Guidelines",
        "url": "https://www.ted.com/tedx/organizer-guide/tedx-content-guidelines"
      },
      {
        "label": "TEDx Organizer Guide — Outline + script",
        "url": "https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/outline-script"
      },
      {
        "label": "TEDx Organizer Guide — Rehearsals",
        "url": "https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/rehearsals"
      },
      {
        "label": "TEDx Organizer Guide — Create + prepare slides",
        "url": "https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/create-prepare-slides"
      }
    ],
    "phases": 3,
    "steps": 27
  },
  {
    "id": "legal-advocacy",
    "category": "rhetoric",
    "code": "ADV-02",
    "title": {
      "en": "Trial Advocacy",
      "uz": "Sud jarayonida advokatlik mahorati"
    },
    "subtitle": {
      "en": "Case theory, direct and cross-examination under the Federal Rules of Evidence, objections, openings and closings.",
      "uz": "Ish nazariyasi, Federal dalillar qoidalari asosida toʻgʻridan-toʻgʻri va qarshi soʻroq, eʼtirozlar, ochilish va yakuniy nutqlar."
    },
    "archetypeLabel": {
      "en": "Trial advocate",
      "uz": "Sud advokati"
    },
    "recommendedWeeks": 9,
    "baselineTotalHours": 64,
    "examVersion": "Trial advocacy — US-style adversarial jury trial (Federal Rules of Evidence)",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "Federal Rules of Evidence, Rule 611 (mode of examination, leading questions)",
        "url": "https://www.law.cornell.edu/rules/fre/rule_611"
      },
      {
        "label": "Federal Rules of Evidence, Rule 613 (prior statements of witnesses)",
        "url": "https://www.law.cornell.edu/rules/fre/rule_613"
      },
      {
        "label": "Federal Rules of Evidence, Rule 103 (rulings on evidence, objections)",
        "url": "https://www.law.cornell.edu/rules/fre/rule_103"
      },
      {
        "label": "Federal Rules of Evidence, Rule 801 (definition of hearsay)",
        "url": "https://www.law.cornell.edu/rules/fre/rule_801"
      },
      {
        "label": "Federal Rules of Evidence, Rule 901 (authenticating evidence)",
        "url": "https://www.law.cornell.edu/rules/fre/rule_901"
      },
      {
        "label": "Ninth Circuit Model Criminal Jury Instruction 1.4 — What Is Not Evidence",
        "url": "https://cdn.ca9.uscourts.gov/datastore/jury-instructions/criminal/1-4-what-is-not-evidence.pdf"
      },
      {
        "label": "Minnesota Rules of Professional Conduct, Rule 3.4(e) (ABA Model Rule text)",
        "url": "https://www.revisor.mn.gov/court_rules/pr/subtype/cond/id/3.4"
      },
      {
        "label": "University of Houston Law Center — Trial structure",
        "url": "https://law.uh.edu/blakely/trial-advocacy-Non-litigators/TrialStructure.pdf"
      }
    ],
    "phases": 3,
    "steps": 33
  },
  {
    "id": "senatorial-rhetoric",
    "category": "rhetoric",
    "code": "SEN-03",
    "title": {
      "en": "Policy Debate and Parliamentary Speaking",
      "uz": "Siyosiy munozara va parlament nutqi"
    },
    "subtitle": {
      "en": "World Schools debate under the WSDC rules, plus formal floor speeches under legislative rules of debate.",
      "uz": "WSDC qoidalari boʻyicha World Schools munozarasi va qonun chiqaruvchi organ qoidalari asosidagi rasmiy nutqlar."
    },
    "archetypeLabel": {
      "en": "Debater and policy speaker",
      "uz": "Munozarachi va siyosat maʼruzachisi"
    },
    "recommendedWeeks": 8,
    "baselineTotalHours": 52,
    "examVersion": "World Schools debate format (WSDC Rules, Aug 2026) + legislative floor debate (US Senate rules)",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "WSDC Tournament Committee & Debate Rules (updated August 2026)",
        "url": "https://www.wsdcdebating.org/_files/ugd/669183_8ee4b95d4bf4409a893cc22e5f1f35b9.pdf"
      },
      {
        "label": "WSDC — General resources (rules, adjudicators guide, motion bank)",
        "url": "https://www.wsdcdebating.org/services-4"
      },
      {
        "label": "Senate Manual (S. Doc. 113-18) — Standing Rules of the Senate, Rule XIX (debate)",
        "url": "https://www.govinfo.gov/content/pkg/CDOC-113sdoc18/html/CDOC-113sdoc18.htm"
      },
      {
        "label": "Robert's Rules of Order — official FAQ (motions, amendments, closing debate)",
        "url": "https://robertsrules.com/frequently-asked-questions/"
      }
    ],
    "phases": 3,
    "steps": 28
  },
  {
    "id": "ielts-academic",
    "category": "academic",
    "code": "IELTS-AC",
    "title": {
      "en": "IELTS Academic: a plan for your next band",
      "uz": "IELTS Academic: keyingi Band uchun reja"
    },
    "subtitle": {
      "en": "All four sections of the computer-delivered test: Listening, Reading, Writing Task 1 and 2, and the three-part Speaking interview.",
      "uz": "Kompyuterda topshiriladigan testning toʻrt boʻlimi: Listening, Reading, Writing Task 1 va 2 hamda uch qismli Speaking suhbati."
    },
    "archetypeLabel": {
      "en": "Academic English",
      "uz": "Akademik ingliz tili"
    },
    "recommendedWeeks": 12,
    "baselineTotalHours": 120,
    "examVersion": "IELTS Academic — current format (on computer, Writing on Paper option)",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "IELTS Academic test format and sections (ielts.org)",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test"
      },
      {
        "label": "IELTS Academic: Listening test format",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening"
      },
      {
        "label": "IELTS Academic: Reading test format",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading"
      },
      {
        "label": "IELTS Academic: Writing test format",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing"
      },
      {
        "label": "IELTS Academic: Speaking test format",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking"
      },
      {
        "label": "IELTS scoring in detail",
        "url": "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
      },
      {
        "label": "IELTS Academic sample test questions",
        "url": "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test"
      },
      {
        "label": "Updates to IELTS Writing test delivery mode (Writing on Paper)",
        "url": "https://ielts.org/organisations/ielts-for-organisations/test-types/ways-to-take-ielts/updates-to-ielts-writing-test-delivery-mode"
      }
    ],
    "phases": 3,
    "steps": 29
  },
  {
    "id": "sat-digital",
    "category": "academic",
    "code": "SAT-DIG",
    "title": {
      "en": "Digital SAT: Reading and Writing plus Math on Bluebook",
      "uz": "Digital SAT: Bluebook orqali Reading and Writing va Math"
    },
    "subtitle": {
      "en": "Two adaptive sections of two modules each: 98 questions in 2 h 14 min, scored 400–1600. Built on Bluebook practice tests and Khan Academy.",
      "uz": "Har biri ikki moduldan iborat ikki adaptiv boʻlim: 2 soat 14 daqiqada 98 savol, 400–1600 ball. Bluebook testlari va Khan Academy asosida."
    },
    "archetypeLabel": {
      "en": "Undergraduate Admissions",
      "uz": "Xalqaro universitet qabuli"
    },
    "recommendedWeeks": 10,
    "baselineTotalHours": 100,
    "examVersion": "Digital SAT (Bluebook, multistage adaptive)",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "How the SAT Is Structured (College Board)",
        "url": "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure"
      },
      {
        "label": "The SAT Reading and Writing Section",
        "url": "https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing"
      },
      {
        "label": "The SAT Math Section: Overview",
        "url": "https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview"
      },
      {
        "label": "SAT Math: Student-Produced Responses",
        "url": "https://satsuite.collegeboard.org/sat/whats-on-the-test/math/student-produced"
      },
      {
        "label": "SAT Suite Calculator Policy",
        "url": "https://satsuite.collegeboard.org/in-school-assessments/calculator-policy"
      },
      {
        "label": "What Do My SAT Suite Scores Mean?",
        "url": "https://satsuite.collegeboard.org/scores/what-scores-mean"
      },
      {
        "label": "Full-Length Digital Practice Tests on Bluebook",
        "url": "https://satsuite.collegeboard.org/practice/practice-tests/bluebook"
      },
      {
        "label": "How to Use Khan Academy (Official SAT Prep)",
        "url": "https://satsuite.collegeboard.org/practice/khan-academy"
      }
    ],
    "phases": 3,
    "steps": 29
  },
  {
    "id": "toefl-ibt",
    "category": "academic",
    "code": "TOEFL-iBT",
    "title": {
      "en": "TOEFL iBT (2026 test): aim for band 5, CEFR C1",
      "uz": "TOEFL iBT (2026 yilgi test): Band 5, CEFR C1 maqsadi"
    },
    "subtitle": {
      "en": "The test updated on 21 Jan 2026: adaptive Reading and Listening, short Writing and Speaking tasks, scored 1–6 (band 5 ≈ 95+ on the old 0–120 scale).",
      "uz": "2026-yil 21-yanvardan yangilangan test: adaptiv Reading va Listening, qisqa Writing va Speaking topshiriqlari, 1–6 shkala (Band 5 ≈ eski 0–120 da 95+)."
    },
    "archetypeLabel": {
      "en": "University English",
      "uz": "Universitet ingliz tili"
    },
    "recommendedWeeks": 11,
    "baselineTotalHours": 110,
    "examVersion": "TOEFL iBT — updated test, 21 Jan 2026",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "ETS: Test content and structure of the TOEFL iBT test",
        "url": "https://www.in.ets.org/toefl/institutions/ibt/about/content-structure.html"
      },
      {
        "label": "ETS: Updated TOEFL iBT Test Overview (PDF)",
        "url": "https://www.eu.ets.org/pdfs/toefl/toefl-ibt-test-at-a-glance.pdf"
      },
      {
        "label": "ETS: TOEFL iBT 2026 Update Test Blueprint and Specifications (PDF)",
        "url": "https://www.in.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf"
      },
      {
        "label": "ETS: A banded score scale for the TOEFL iBT test (April 2026, PDF)",
        "url": "https://www.eu.ets.org/pdfs/toefl/score-scale-update-2026.pdf"
      },
      {
        "label": "ETS: TOEFL TestReady",
        "url": "https://www.eu.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html"
      }
    ],
    "phases": 3,
    "steps": 25
  },
  {
    "id": "lsat",
    "category": "legal",
    "code": "LSAT",
    "title": {
      "en": "LSAT: Logical Reasoning, Reading Comprehension and Argumentative Writing",
      "uz": "LSAT: Logical Reasoning, Reading Comprehension va Argumentative Writing"
    },
    "subtitle": {
      "en": "Current LSAT: two scored Logical Reasoning sections, one scored Reading Comprehension, one unscored section, plus the online writing sample.",
      "uz": "Amaldagi LSAT: ikkita baholanadigan Logical Reasoning, bitta Reading Comprehension, bitta baholanmaydigan boʻlim va onlayn yozma ish."
    },
    "archetypeLabel": {
      "en": "Law School Admission",
      "uz": "Huquq maktabi (law school) qabuli"
    },
    "recommendedWeeks": 12,
    "baselineTotalHours": 150,
    "examVersion": "LSAT format since August 2024 (no Logic Games); August 2027 layout change noted",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "LSAC: Specifications of the LSAT and LSAT Argumentative Writing",
        "url": "https://www.lsac.org/lsat/register-lsat/accommodations/specifications-lsat-and-lsat-argumentative-writing"
      },
      {
        "label": "LSAC: The LSAT will look a little different starting August 2027",
        "url": "https://www.lsac.org/lsat-will-look-little-different-starting-august-2027"
      },
      {
        "label": "LSAC: Logical Reasoning questions",
        "url": "https://www.lsac.org/lsat/prepare/types-lsat-questions/logical-reasoning"
      },
      {
        "label": "LSAC: Reading Comprehension questions",
        "url": "https://www.lsac.org/lsat/prepare/types-lsat-questions/reading-comprehension"
      },
      {
        "label": "LSAC: Practice tests for August 2024 and beyond on LawHub",
        "url": "https://www.lsac.org/blog/practice-tests-august-2024-and-beyond-now-available-lsacs-lawhub"
      },
      {
        "label": "LSAC: LSAT scoring",
        "url": "https://www.lsac.org/lsat/lsat-scoring"
      }
    ],
    "phases": 3,
    "steps": 28
  },
  {
    "id": "sqe",
    "category": "legal",
    "code": "SQE1/2",
    "title": {
      "en": "SQE1 and SQE2: Solicitors Qualifying Examination",
      "uz": "SQE1 va SQE2: solisitorlik malaka imtihoni"
    },
    "subtitle": {
      "en": "FLK1 and FLK2 (170 single-best-answer questions each) and the 16 SQE2 oral and written skills assessments, per the SRA from 1 September 2026.",
      "uz": "FLK1 va FLK2 (har biri 170 ta single best answer savol) hamda SQE2ʼning 16 ta ogʻzaki va yozma topshirigʻi, SRA 2026-yil 1-sentabrdan."
    },
    "archetypeLabel": {
      "en": "England & Wales Solicitor",
      "uz": "Angliya va Uels solisitori"
    },
    "recommendedWeeks": 26,
    "baselineTotalHours": 400,
    "examVersion": "SQE1 and SQE2, SRA assessment specifications for assessments from 1 September 2026",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "SRA: SQE1 Assessment Specification (from 1 September 2026)",
        "url": "https://sqe.sra.org.uk/docs/default-source/pdfs/sqe1-assessment-specification-(from-1-september-2026).pdf?sfvrsn=9a3f672d_2"
      },
      {
        "label": "SRA: SQE1 FLK1 sample questions (original set, with SQE1 structure)",
        "url": "https://sqe.sra.org.uk/docs/default-source/pdfs/sqe1-flk1-original-sample-qs-updated-2-april-26.pdf?sfvrsn=87c505c7_2"
      },
      {
        "label": "SRA: SQE2 Assessment Specification (from 1 September 2026)",
        "url": "https://sqe.sra.org.uk/docs/default-source/pdfs/sqe2-assesment-specification-(from-1-september-2026).pdf"
      },
      {
        "label": "SRA: Assessments in SQE2 (from 1 September 2026)",
        "url": "https://sqe.sra.org.uk/docs/default-source/pdfs/assessments-in-sqe2-(from-1-september-2026).pdf?sfvrsn=2ba845bb_2"
      }
    ],
    "phases": 3,
    "steps": 32
  },
  {
    "id": "bar-ube",
    "category": "legal",
    "code": "UBE-BAR",
    "title": {
      "en": "Uniform Bar Exam (current MBE, MEE, MPT format, through February 2028)",
      "uz": "Uniform Bar Exam (amaldagi MBE, MEE, MPT formati, 2028-yil fevralgacha)"
    },
    "subtitle": {
      "en": "For jurisdictions still on the current UBE: 200-question MBE, six 30-minute MEE essays and two 90-minute MPTs. Not the NextGen bar exam.",
      "uz": "Hali amaldagi UBEʼni oʻtkazayotgan yurisdiksiyalar uchun: 200 savollik MBE, oltita 30 daqiqalik MEE essesi va ikkita 90 daqiqalik MPT. NextGen uchun emas."
    },
    "archetypeLabel": {
      "en": "US Bar Admission",
      "uz": "AQSh advokatura imtihoni"
    },
    "recommendedWeeks": 20,
    "baselineTotalHours": 320,
    "examVersion": "Current (legacy) UBE: MBE 50%, MEE 30%, MPT 20%; last administration February 2028",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "NCBE: Uniform Bar Examination (UBE)",
        "url": "https://www.ncbex.org/exams/ube"
      },
      {
        "label": "NCBE: Multistate Bar Examination (MBE)",
        "url": "https://www.ncbex.org/exams/mbe"
      },
      {
        "label": "NCBE: Preparing for the MBE (subjects, outline, sample questions)",
        "url": "https://www.ncbex.org/exams/mbe/preparing-mbe"
      },
      {
        "label": "NCBE: Multistate Essay Examination (MEE)",
        "url": "https://www.ncbex.org/exams/mee"
      },
      {
        "label": "NCBE: Preparing for the MEE (outline, released questions)",
        "url": "https://www.ncbex.org/exams/mee/preparing-mee"
      },
      {
        "label": "NCBE: Multistate Performance Test (MPT)",
        "url": "https://www.ncbex.org/exams/mpt"
      },
      {
        "label": "NCBE: Preparing for the MPT (skills, released MPTs, point sheets)",
        "url": "https://www.ncbex.org/exams/mpt/preparing-mpt"
      },
      {
        "label": "NCBE: Some subjects to be removed from the MEE in 2026",
        "url": "https://www.ncbex.org/news-resources/some-subjects-be-removed-mee-2026"
      }
    ],
    "phases": 3,
    "steps": 27
  },
  {
    "id": "toles",
    "category": "legal",
    "code": "TOLES-ADV",
    "title": {
      "en": "TOLES Advanced: Legal English for Commercial Law",
      "uz": "TOLES Advanced: tijorat huquqi uchun yuridik ingliz tili"
    },
    "subtitle": {
      "en": "Online proctored TOLES Advanced: 140 reading and writing questions in 120 minutes on legal vocabulary and grammar.",
      "uz": "Onlayn nazorat ostidagi TOLES Advanced: yuridik lugʻat va grammatika boʻyicha 120 daqiqada 140 ta reading va writing savoli."
    },
    "archetypeLabel": {
      "en": "International Commercial Law",
      "uz": "Xalqaro tijorat huquqi"
    },
    "recommendedWeeks": 6,
    "baselineTotalHours": 60,
    "examVersion": "TOLES Advanced (online, proctored): 12 sections, 140 questions, 120 minutes",
    "lastVerified": "2026-11-22",
    "sources": [
      {
        "label": "TOLES official site (Global Legal English Ltd)",
        "url": "https://toleslegal.com/"
      },
      {
        "label": "About TOLES: levels and ownership",
        "url": "https://toleslegal.com/about/"
      },
      {
        "label": "TOLES Advanced exam",
        "url": "https://toleslegal.com/the-toles-advanced-exam-demo/"
      },
      {
        "label": "TOLES Higher exam",
        "url": "https://toleslegal.com/the-toles-higher-exam-demo/"
      },
      {
        "label": "TOLES Foundation exam",
        "url": "https://toleslegal.com/the-toles-foundation-exam-demo/"
      }
    ],
    "phases": 3,
    "steps": 21
  }
];

export const getCatalogEntry = (id: string): CatalogEntry | undefined => CATALOG.find((e) => e.id === id);
