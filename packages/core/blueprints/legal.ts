import type { Blueprint } from '../schemas';

export const LEGAL_BLUEPRINTS: Blueprint[] = [
  {
    id: 'lsat',
    category: 'legal',
    code: 'LSAT',
    title: {
      en: 'LSAT 170+ Analytical Mastery',
      uz: 'LSAT 170+ mantiqiy tahlil mahorati',
    },
    subtitle: {
      en: 'Logical Reasoning flaw taxonomy, conditional chains, and comparative Reading Comprehension.',
      uz: 'Mantiqiy xatolar taksonomiyasi, shartli zanjirlar va qiyosiy Reading Comprehension.',
    },
    archetypeLabel: {
      en: 'Law School Admission',
      uz: 'Huquq maktabi qabuli',
    },
    recommendedWeeks: 10,
    baselineTotalHours: 120,
    phases: [
      {
        id: 'lsat-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Conditional Logic & Argument Anatomy',
          uz: '1-bosqich · Shartli mantiq va argument anatomiyasi',
        },
        objective: {
          en: 'Identify conclusions, premises, and formal contrapositives instantaneously.',
          uz: 'Xulosa, asos va mantiqiy qarama-qarshi shartlarni bir qarashda ajratish.',
        },
        modules: [
          {
            id: 'lsat-conditional',
            title: {
              en: 'Sufficient/Necessary Logic & Quantifier Chains',
              uz: 'Yetarli/zaruriy shartlar mantiqi va kvantor zanjirlari',
            },
            summary: {
              en: 'Diagram multi-premise rules without confusing converse and inverse traps.',
              uz: 'Teskari shart tuzoqlariga tushmasdan koʻp asosli qoidalarni aniq sxemalash.',
            },
            baselineHours: 24,
            difficulty: 'foundational',
            keyFramework: 'Formal Contrapositive & Some/Most Bridges',
            steps: [
              {
                id: 'lsat-s1',
                title: {
                  en: 'Automate sufficient vs necessary indicator words',
                  uz: 'Yetarli va zaruriy shart koʻrsatkichlarini avtomatlashtirish',
                },
                drill: {
                  en: 'Translate 40 "unless", "only if", and "requires" statements into arrow notation.',
                  uz: '40 ta "unless", "only if" va "requires" jumlalarini mantiqiy strelka sxemasiga oʻgiring.',
                },
                framework: 'Unless-Negation Rule',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s2',
                title: {
                  en: 'Chain contrapositives cleanly across 3+ premises',
                  uz: '3 va undan ortiq asosli zanjirlarni bogʻlash',
                },
                drill: {
                  en: 'Solve 25 Must-Be-True and Parallel Reasoning items via pure deductive chains.',
                  uz: '25 ta Must-Be-True va Parallel Reasoning savolini aniq deduktiv zanjir orqali yeching.',
                },
                framework: 'Deductive Chain Linking',
                estimatedMinutes: 65,
              },
              {
                id: 'lsat-s3',
                title: {
                  en: 'Audit quantifier overlaps (Most + Most = Some)',
                  uz: 'Kvantorlar kesishuvini (Most + Most = Some) aniq qoʻllash',
                },
                drill: {
                  en: 'Drill 20 formal quantifier inference items eliminating unsupported scope shifts.',
                  uz: '20 ta kvantor xulosa savolida asoslanmagan kengaytirishlarni chiqarib tashlang.',
                },
                framework: 'Quantifier Overlap Law',
                estimatedMinutes: 55,
              },
            ],
          },
          {
            id: 'lsat-flaws',
            title: {
              en: 'Logical Reasoning Flaw Taxonomy & Assumptions',
              uz: 'Mantiqiy xatolar taksonomiyasi va yashirin taxminlar',
            },
            summary: {
              en: 'Spot the exact logical gap before looking at a single answer choice.',
              uz: 'Javob variantlariga qarashdan oldin argumentdagi aniq mantiqiy uzilishni topish.',
            },
            baselineHours: 28,
            difficulty: 'executive',
            keyFramework: 'Negation Test + 15 Classic Flaws',
            steps: [
              {
                id: 'lsat-s4',
                title: {
                  en: 'Separate Necessary vs Sufficient Assumptions cleanly',
                  uz: 'Zaruriy va Yetarli taxmin savollarini aniq ajratish',
                },
                drill: {
                  en: 'Apply the Negation Test to 30 Necessary Assumption items until zero misses.',
                  uz: '30 ta Necessary Assumption savolida inkor sinovini xatosiz darajagacha mashq qiling.',
                },
                framework: 'Logical Negation Test',
                estimatedMinutes: 70,
              },
              {
                id: 'lsat-s5',
                title: {
                  en: 'Catalog the 15 recurring LSAT argument flaws',
                  uz: 'Eng koʻp uchraydigan 15 ta LSAT mantiqiy xatosini tizimlashtirish',
                },
                drill: {
                  en: 'Name the flaw in plain English (causation/correlation, whole-to-part, sampling) on 35 items.',
                  uz: '35 ta savolda xato turini (sabab-korrelyatsiya, qism-butun, tanlanma) aniq nomlab bering.',
                },
                framework: 'Pre-Choice Flaw Naming',
                estimatedMinutes: 65,
              },
              {
                id: 'lsat-s6',
                title: {
                  en: 'Master Strengthen, Weaken & Evaluate-the-Argument',
                  uz: 'Kuchaytirish, zaiflashtirish va baholash savollari mahorati',
                },
                drill: {
                  en: 'Attack or reinforce the link between premise and conclusion rather than external facts.',
                  uz: 'Tashqi faktlarga emas, aynan asos va xulosa oʻrtasidagi boʻshliqqa zarba bering.',
                },
                framework: 'Bridge-Target Targeting',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'lsat-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Reading Comprehension & Structural Mastery',
          uz: '2-bosqich · Reading Comprehension va tuzilma tahlili',
        },
        objective: {
          en: 'Read for viewpoint architecture and authorial attitude across law, science & humanities.',
          uz: 'Huquq, fan va gumanitar matnlarda muallif pozitsiyasi va qarashlar tuzilmasini aniq oʻqish.',
        },
        modules: [
          {
            id: 'lsat-rc-structure',
            title: {
              en: 'Viewpoint Tracking & Comparative Passages',
              uz: 'Nuqtai nazarlarni kuzatish va qiyosiy matnlar',
            },
            summary: {
              en: 'Distinguish author stance from cited critics and dissect Passage A vs Passage B.',
              uz: 'Muallif pozitsiyasini keltirilgan tanqidchilardan ajratib, A va B matnlarni aniq taqqoslash.',
            },
            baselineHours: 24,
            difficulty: 'executive',
            keyFramework: 'Viewpoint Ledger + Structural Skim',
            steps: [
              {
                id: 'lsat-s7',
                title: {
                  en: 'Track every viewpoint shift with margin labels',
                  uz: 'Har bir nuqtai nazar almashuvini chetki belgilar bilan qayd etish',
                },
                drill: {
                  en: 'Summarize paragraph purpose in 4 words while highlighting authorial tone words.',
                  uz: 'Muallif ohangini belgilagan holda har bir xatboshi vazifasini 4 soʻzda yozing.',
                },
                framework: 'Viewpoint Tagging',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s8',
                title: {
                  en: 'Solve Comparative Passages via agreement/conflict grid',
                  uz: 'Qiyosiy matnlarni kelishuv va ziddiyat jadvali bilan yechish',
                },
                drill: {
                  en: 'Complete 6 comparative sets noting exact point of overlap and divergence.',
                  uz: '6 ta qiyosiy matn toʻplamida aniq umumiy va farqli nuqtalarni ajratib yozing.',
                },
                framework: 'Overlap-Divergence Matrix',
                estimatedMinutes: 65,
              },
              {
                id: 'lsat-s9',
                title: {
                  en: 'Eliminate extreme-language distractors in Inference items',
                  uz: 'Xulosa savollaridagi haddan tashqari keskin chalgʻituvchilarni chiqarib tashlash',
                },
                drill: {
                  en: 'Verify every correct inference against a direct textual citation.',
                  uz: 'Har bir toʻgʻri xulosani matndagi aniq qator bilan tasdiqlang.',
                },
                framework: 'Strict Textual Proof',
                estimatedMinutes: 55,
              },
            ],
          },
          {
            id: 'lsat-lr-hard',
            title: {
              en: 'Level-5 Logical Reasoning & Parallel Flaw Speed',
              uz: '5-darajali murakkab LR va Parallel Flaw tezligi',
            },
            summary: {
              en: 'Solve questions 16–25 calmly inside 35-minute sections.',
              uz: '35 daqiqalik boʻlimda 16–25-murakkab savollarni bosiq va aniq yechish.',
            },
            baselineHours: 22,
            difficulty: 'executive',
            keyFramework: 'Abstract Pattern Matching',
            steps: [
              {
                id: 'lsat-s10',
                title: {
                  en: 'Abstract Parallel Reasoning into A/B/C templates',
                  uz: 'Parallel Reasoning savollarini A/B/C shabloniga oʻgirish',
                },
                drill: {
                  en: 'Match conclusion strength and premise structure first to cut 3 choices in 20 seconds.',
                  uz: 'Avval xulosa kuchi va asos tuzilmasini solishtirib, 20 soniyada 3 ta variantni chiqarib tashlang.',
                },
                framework: 'Conclusion-First Elimination',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s11',
                title: {
                  en: 'Practice 10-in-10 opening LR sprint',
                  uz: 'Ilk 10 ta LR savolini 10 daqiqada yechish mashqi',
                },
                drill: {
                  en: 'Build a 10-minute time cushion for the final 10 high-difficulty items.',
                  uz: 'Soʻnggi 10 ta murakkab savol uchun 10 daqiqalik vaqt zaxirasini yarating.',
                },
                framework: '10-in-10 Time Bank',
                estimatedMinutes: 55,
              },
              {
                id: 'lsat-s12',
                title: {
                  en: 'Perform Blind Review on every timed section',
                  uz: 'Har bir vaqtli boʻlimdan keyin Blind Review oʻtkazish',
                },
                drill: {
                  en: 'Re-work flagged items untimed before checking the answer key to isolate timing vs logic gaps.',
                  uz: 'Kalitga qarashdan oldin belgilangan savollarni vaqtsiz qayta ishlab, mantiqiy boʻshliqni aniqlang.',
                },
                framework: 'Blind Review Discipline',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'lsat-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Full 4-Section PrepTests & Peak Calibration',
          uz: '3-bosqich · Toʻliq 4 boʻlimli PrepTestlar va choʻqqi kalibrlash',
        },
        objective: {
          en: 'Sustain 170+ focus across 4 consecutive 35-minute sections.',
          uz: 'Ketma-ket 4 ta 35 daqiqalik boʻlim davomida 170+ diqqat va aniqlikni saqlash.',
        },
        modules: [
          {
            id: 'lsat-preptests',
            title: {
              en: 'Full PrepTest Stamina & Wrong-Answer Journal',
              uz: 'Toʻliq PrepTest chidamliligi va xatolar jurnali',
            },
            summary: {
              en: 'Simulate full LawHub exam conditions and eliminate every recurring trap.',
              uz: 'LawHub imtihon muhitini toʻliq simulyatsiya qilib, takrorlanuvchi tuzoqlarni yopish.',
            },
            baselineHours: 22,
            difficulty: 'executive',
            keyFramework: 'PrepTest + Blind Review + Journal Loop',
            steps: [
              {
                id: 'lsat-s13',
                title: {
                  en: 'Sit full 4-section timed PrepTest',
                  uz: 'Toʻliq 4 boʻlimli vaqtli PrepTest topshirish',
                },
                drill: {
                  en: 'Enforce strict 35-minute sections with a single 10-minute intermission after Section 2.',
                  uz: '2-boʻlimdan keyin faqat bitta 10 daqiqalik tanaffus bilan qatʼiy rejimda ishlang.',
                },
                framework: 'Official 4-Section Cadence',
                estimatedMinutes: 150,
              },
              {
                id: 'lsat-s14',
                title: {
                  en: 'Articulate why wrong choices tempted you',
                  uz: 'Notoʻgʻri variant nega jozibador koʻringanini yozma tahlil qilish',
                },
                drill: {
                  en: 'Write 2-line entries explaining both the fatal flaw in your choice and proof for the right one.',
                  uz: 'Tanlagan notoʻgʻri variantingizdagi xato va toʻgʻri javob dalilini 2 qatorda yozing.',
                },
                framework: 'Temptation-Proof Audit',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s15',
                title: {
                  en: 'Drill LSAT Argumentative Writing 35-minute structure',
                  uz: 'LSAT Argumentative Writing 35 daqiqalik tuzilma mashqi',
                },
                drill: {
                  en: 'Weigh competing perspectives cleanly and defend one decision criterion explicitly.',
                  uz: 'Raqobatdosh qarashlarni xolis solishtirib, yagona qaror mezonini izchil himoya qiling.',
                },
                framework: 'Structured Legal Essay',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sqe',
    category: 'legal',
    code: 'SQE1/2',
    title: {
      en: 'SQE1 & SQE2 Solicitor Qualification',
      uz: 'SQE1 va SQE2 Angliya solisitorlik imtihoni',
    },
    subtitle: {
      en: 'FLK1/FLK2 single-best-answer law application plus SQE2 advocacy, drafting & interviewing.',
      uz: 'FLK1/FLK2 huquqiy qoʻllash testlari hamda SQE2 advokatlik, hujjat tuzish va mijoz suhbati.',
    },
    archetypeLabel: {
      en: 'England & Wales Solicitor',
      uz: 'Angliya va Uels solisitori',
    },
    recommendedWeeks: 12,
    baselineTotalHours: 160,
    phases: [
      {
        id: 'sqe-p1',
        order: 1,
        title: {
          en: 'Phase 1 · FLK1 Functioning Legal Knowledge',
          uz: '1-bosqich · FLK1 amaliy huquqiy bilimlar',
        },
        objective: {
          en: 'Apply Business Law, Dispute Resolution, Contract, Tort, Legal System & Ethics under SRA standards.',
          uz: 'Biznes huquqi, nizolarni hal qilish, shartnoma, delikt va SRA etikasini aniq qoʻllash.',
        },
        modules: [
          {
            id: 'sqe-flk1-core',
            title: {
              en: 'FLK1 · Business Law, Contract, Tort & Dispute Resolution',
              uz: 'FLK1 · Biznes, shartnoma, delikt va nizolarni hal qilish',
            },
            summary: {
              en: 'Synthesize Companies Act 2006, CPR timelines, and remedies into rapid SBA decisions.',
              uz: 'Companies Act 2006, CPR muddatlari va himoya vositalarini tezkor SBA yechimlariga aylantirish.',
            },
            baselineHours: 36,
            difficulty: 'intermediate',
            keyFramework: 'Day-One Solicitor Application Standard',
            steps: [
              {
                id: 'sqe-s1',
                title: {
                  en: 'Master director duties, shareholder resolutions & insolvency',
                  uz: 'Direktor majburiyatlari, aksiyador qarorlari va bankrotlik tartibi',
                },
                drill: {
                  en: 'Solve 45 SBA questions on s.171–177 CA 2006, special resolutions, and priority waterfalls.',
                  uz: 'CA 2006 171–177-moddalar va qaror qabul qilish boʻyicha 45 ta SBA savolini yeching.',
                },
                framework: 'CA 2006 Decision Tree',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-s2',
                title: {
                  en: 'Drill CPR Part 7/8/24/36 procedural steps & limitation periods',
                  uz: 'CPR protsessual bosqichlari va daʼvo muddatlari mashqi',
                },
                drill: {
                  en: 'Build a one-page timeline chart for service, acknowledgment, defence, and Part 36 costs.',
                  uz: 'Hujjat topshirish, javob muddatlari va Part 36 xarajatlari boʻyicha bir sahifalik jadval tuzing.',
                },
                framework: 'CPR Litigation Timeline',
                estimatedMinutes: 65,
              },
              {
                id: 'sqe-s3',
                title: {
                  en: 'Apply pervasive SRA Principles & Code of Conduct',
                  uz: 'SRA tamoyillari va kasbiy etika kodeksini qoʻllash',
                },
                drill: {
                  en: 'Evaluate 25 ethics dilemmas covering conflict of interest, confidentiality, and undertakings.',
                  uz: 'Manfaatlar toʻqnashuvi va maxfiylikka oid 25 ta kasbiy etika kazusini tahlil qiling.',
                },
                framework: 'SRA Ethics Priority Filter',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'sqe-p2',
        order: 2,
        title: {
          en: 'Phase 2 · FLK2 Property, Wills, Criminal & Solicitors Accounts',
          uz: '2-bosqich · FLK2 mulk, meros, jinoyat va solisitor hisoblari',
        },
        objective: {
          en: 'Master registered/unregistered land, probate, criminal procedure, and client account ledgers.',
          uz: 'Koʻchmas mulk, meros, jinoyat protsessi va mijoz hisob-kitob qoidalarini puxta egallash.',
        },
        modules: [
          {
            id: 'sqe-flk2-core',
            title: {
              en: 'FLK2 · Property Practice, Land, Wills & Criminal Law',
              uz: 'FLK2 · Mulk amaliyoti, yer huquqi, vasiyat va jinoyat huquqi',
            },
            summary: {
              en: 'Distinguish overriding interests, IHT reliefs, and PACE/bail procedure cleanly.',
              uz: 'Ustuvor huquqlar, meros soligʻi imtiyozlari va jinoyat protsessi qoidalarini aniq farqlash.',
            },
            baselineHours: 38,
            difficulty: 'executive',
            keyFramework: 'Statutory Checklist + Ledger Double-Entry',
            steps: [
              {
                id: 'sqe-s4',
                title: {
                  en: 'Master LRA 2002 priorities & commercial lease covenants',
                  uz: 'LRA 2002 ustuvorliklari va tijorat ijarasi majburiyatlari',
                },
                drill: {
                  en: 'Solve 40 Land & Property SBA scenarios on Schedule 3 overriding interests and AGA liability.',
                  uz: 'Schedule 3 ustuvor huquqlari va ijara javobgarligi boʻyicha 40 ta kazus yeching.',
                },
                framework: 'Title Priority Matrix',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-s5',
                title: {
                  en: 'Drill Wills, Intestacy, Trusts & IHT calculations',
                  uz: 'Vasiyatnoma, qonun boʻyicha meros, trastlar va IHT hisob-kitoblari',
                },
                drill: {
                  en: 'Compute nil-rate bands, PETs, and trustee fiduciary breaches across 25 problem sets.',
                  uz: '25 ta masalada meros soligʻi chegaralari va trast majburiyatlarini aniq hisoblang.',
                },
                framework: 'Estate & Tax Computation Sheet',
                estimatedMinutes: 70,
              },
              {
                id: 'sqe-s6',
                title: {
                  en: 'Lock Solicitors Accounts Rules & Criminal Practice',
                  uz: 'Solisitor hisoblari qoidalari va jinoyat amaliyoti',
                },
                drill: {
                  en: 'Record 20 client/business account ledger entries and drill Magistrates vs Crown Court allocation.',
                  uz: '20 ta mijoz/biznes hisob yozuvini tuzib, sudlovga tegishlilik qoidalarini mashq qiling.',
                },
                framework: 'Dual-Ledger Account Audit',
                estimatedMinutes: 65,
              },
            ],
          },
        ],
      },
      {
        id: 'sqe-p3',
        order: 3,
        title: {
          en: 'Phase 3 · SQE2 Practical Legal Skills & Simulations',
          uz: '3-bosqich · SQE2 amaliy yuridik koʻnikmalar va simulyatsiya',
        },
        objective: {
          en: 'Deliver client-ready oral advocacy, interviewing, legal writing, drafting, and research.',
          uz: 'Mijoz uchun tayyor ogʻzaki himoya, suhbat, yuridik yozuv, hujjat tuzish va tadqiqot koʻnikmalari.',
        },
        modules: [
          {
            id: 'sqe-skills',
            title: {
              en: 'SQE2 · Advocacy, Client Interviewing & Legal Drafting',
              uz: 'SQE2 · Sud himoyasi, mijoz suhbati va yuridik hujjat tuzish',
            },
            summary: {
              en: 'Balance 50% legal accuracy and 50% practical skill criteria across timed stations.',
              uz: 'Vaqtli amaliy stansiyalarda 50% huquqiy aniqlik va 50% amaliy mahorat muvozanatini saqlash.',
            },
            baselineHours: 46,
            difficulty: 'executive',
            keyFramework: '50/50 Law-and-Skills Assessment Rubric',
            steps: [
              {
                id: 'sqe-s7',
                title: {
                  en: 'Conduct 25-minute structured Client Interview + Attendance Note',
                  uz: '25 daqiqalik tuzilgan mijoz suhbati va bayonnoma yozish',
                },
                drill: {
                  en: 'Extract facts empathetically, advise on costs/options, and draft a crisp legal analysis note.',
                  uz: 'Faktlarni diqqat bilan toʻplang, xarajat va variantlarni tushuntirib, aniq bayonnoma yozing.',
                },
                framework: 'Listen-Advise-Record Station',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-s8',
                title: {
                  en: 'Deliver 15-minute Interim Application Advocacy',
                  uz: '15 daqiqalik oraliq iltimosnoma boʻyicha sud nutqi',
                },
                drill: {
                  en: 'Address the District Judge with proper etiquette, statutory test, and structured submission.',
                  uz: 'Sud odobi, qonuniy mezon va izchil dalillar bilan 15 daqiqalik nutq taqdim eting.',
                },
                framework: 'Courtroom Submission Structure',
                estimatedMinutes: 60,
              },
              {
                id: 'sqe-s9',
                title: {
                  en: 'Execute 45-minute Legal Drafting & Case Matter Analysis',
                  uz: '45 daqiqalik yuridik hujjat tuzish va ish tahlili (CMA)',
                },
                drill: {
                  en: 'Draft a Particulars of Claim or Board Minute plus commercial client advice letter on time.',
                  uz: 'Daʼvo arizasi yoki kengash bayonnomasini hamda mijozga tijorat xatini vaqtida tuzing.',
                },
                framework: 'Client-Focused Commercial Drafting',
                estimatedMinutes: 75,
              },
            ],
          },
          {
            id: 'sqe-mocks',
            title: {
              en: 'Full 180-Question FLK Mocks & Final Calibration',
              uz: 'Toʻliq 180 savolli FLK sinovlari va yakuniy kalibrlash',
            },
            summary: {
              en: 'Build stamina for back-to-back 90-question SBA papers at 1.7 min/question.',
              uz: 'Har bir savolga 1,7 daqiqa tempida ketma-ket 90 savolli bloklarga chidamlilik hosil qilish.',
            },
            baselineHours: 40,
            difficulty: 'executive',
            keyFramework: '1.7-Min SBA Pacing Protocol',
            steps: [
              {
                id: 'sqe-s10',
                title: {
                  en: 'Sit full 90-question FLK1 & FLK2 timed papers',
                  uz: 'Toʻliq 90 savolli FLK1 va FLK2 vaqtli sinovlarini topshirish',
                },
                drill: {
                  en: 'Target 70%+ raw score while logging every missed statutory exception.',
                  uz: '70%+ natijani maqsad qilib, har bir oʻtkazib yuborilgan qonuniy istisnoni qayd eting.',
                },
                framework: 'SBA Stamina Block',
                estimatedMinutes: 155,
              },
              {
                id: 'sqe-s11',
                title: {
                  en: 'Patch weak black-letter sub-topics with flash rules',
                  uz: 'Zaif huquqiy kichik mavzularni tezkor qoida kartalari bilan yopish',
                },
                drill: {
                  en: 'Distill bottom-3 scoring topics into 1-page exception checklists.',
                  uz: 'Eng past ball olingan 3 ta mavzuni 1 sahifalik istisnolar roʻyxatiga jamlang.',
                },
                framework: 'Bottom-Three Patching',
                estimatedMinutes: 60,
              },
              {
                id: 'sqe-s12',
                title: {
                  en: 'Run final SQE2 timed oral & written rehearsal',
                  uz: 'Yakuniy SQE2 ogʻzaki va yozma vaqtli repetitsiyasi',
                },
                drill: {
                  en: 'Complete one Advocacy + one Legal Writing station consecutively with rubric grading.',
                  uz: 'Bitta Advokatlik va bitta Yuridik yozuv stansiyasini ketma-ket topshirib baholang.',
                },
                framework: 'Dual-Station Dress Rehearsal',
                estimatedMinutes: 75,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bar-ube',
    category: 'legal',
    code: 'UBE-BAR',
    title: {
      en: 'UBE / Bar Exam Strategic Plan',
      uz: 'UBE / Bar Exam strategik tayyorgarlik rejasi',
    },
    subtitle: {
      en: 'MBE 7-subject black-letter precision, 30-minute MEE IRAC essays, and 90-minute MPT drafting.',
      uz: 'MBE 7 fan boʻyicha qatʼiy qoidalar, 30 daqiqalik MEE IRAC insholari va 90 daqiqalik MPT.',
    },
    archetypeLabel: {
      en: 'US Bar Admission',
      uz: 'AQSH advokatlik litsenziyasi',
    },
    recommendedWeeks: 10,
    baselineTotalHours: 180,
    phases: [
      {
        id: 'bar-p1',
        order: 1,
        title: {
          en: 'Phase 1 · MBE Seven-Subject Black-Letter Core',
          uz: '1-bosqich · MBE yetti asosiy fan qoidalari',
        },
        objective: {
          en: 'Master Civil Procedure, Con Law, Contracts, Criminal, Evidence, Property, and Torts.',
          uz: 'Fuqarolik protsessi, Konstitutsiyaviy, Shartnoma, Jinoyat, Dalillar, Mulk va Delikt fanlarini egallash.',
        },
        modules: [
          {
            id: 'bar-mbe-core',
            title: {
              en: 'MBE High-Frequency Rule Mastery & Nuance Traps',
              uz: 'MBE yuqori chastotali qoidalar va istisno tuzoqlari',
            },
            summary: {
              en: 'Focus 80% of study energy on heavily tested doctrines like Hearsay, UCC Art. 2, and Jurisdiction.',
              uz: '80% kuch-gʻayratni eng koʻp tushadigan Hearsay, UCC 2-modda va yurisdiksiya qoidalariga yoʻnaltirish.',
            },
            baselineHours: 64,
            difficulty: 'intermediate',
            keyFramework: 'Rule-Element-Exception Recall',
            steps: [
              {
                id: 'bar-s1',
                title: {
                  en: 'Master Evidence Hearsay & Impeachment flowcharts',
                  uz: 'Dalillar huquqida Hearsay va guvoh raddiyasi sxemalarini egallash',
                },
                drill: {
                  en: 'Solve 50 licensed MBE Evidence questions separating non-hearsay from FRE 803/804 exceptions.',
                  uz: '50 ta rasmiy MBE Dalillar savolida FRE 803/804 istisnolarini aniq ajrating.',
                },
                framework: 'FRE 801–804 Decision Gate',
                estimatedMinutes: 90,
              },
              {
                id: 'bar-s2',
                title: {
                  en: 'Drill Contracts (Common Law vs UCC) & Remedies',
                  uz: 'Shartnoma huquqi (Common Law va UCC) hamda tovon qoidalari',
                },
                drill: {
                  en: 'Complete 50 mixed Contracts sets checking Statute of Frauds, parol evidence, and breach.',
                  uz: '50 ta aralash Shartnoma savolida firibgarlik nizomi va shartnoma buzilishini tekshiring.',
                },
                framework: 'Common Law vs UCC Split',
                estimatedMinutes: 85,
              },
              {
                id: 'bar-s3',
                title: {
                  en: 'Lock Civil Procedure & Constitutional Standards of Review',
                  uz: 'Fuqarolik protsessi va Konstitutsiyaviy tekshiruv standartlari',
                },
                drill: {
                  en: 'Drill 50 items on Erie, PJ/SMJ, Rule 56 summary judgment, and strict/intermediate scrutiny.',
                  uz: '50 ta savolda yurisdiksiya, Rule 56 va konstitutsiyaviy tekshiruv mezonlarini mashq qiling.',
                },
                framework: 'Scrutiny & Jurisdiction Matrix',
                estimatedMinutes: 85,
              },
            ],
          },
        ],
      },
      {
        id: 'bar-p2',
        order: 2,
        title: {
          en: 'Phase 2 · MEE Issue-Spotting & MPT Execution',
          uz: '2-bosqich · MEE masala aniqlash va MPT hujjat tuzish',
        },
        objective: {
          en: 'Produce crisp 30-minute MEE IRAC essays and complete 90-minute MPT files without running out of time.',
          uz: '30 daqiqalik aniq MEE IRAC insholari va 90 daqiqalik MPT ishlarini vaqtida toʻliq bajarish.',
        },
        modules: [
          {
            id: 'bar-mee',
            title: {
              en: 'MEE 30-Minute IRAC Discipline & MEE-Only Subjects',
              uz: 'MEE 30 daqiqalik IRAC intizomi va qoʻshimcha fanlar',
            },
            summary: {
              en: 'Hit every fact trigger across Secured Transactions, Business Associations, Family & Trusts.',
              uz: 'Taʼminlangan bitimlar, korporativ, oila va trast fanlaridagi har bir fakt signalini qamrab olish.',
            },
            baselineHours: 48,
            difficulty: 'executive',
            keyFramework: 'CIRAC Fact-Application Engine',
            steps: [
              {
                id: 'bar-s4',
                title: {
                  en: 'Write 6 timed 30-minute MEE essays with explicit fact matching',
                  uz: '6 ta 30 daqiqalik MEE inshosini aniq fakt bogʻlash bilan yozish',
                },
                drill: {
                  en: 'Use "Here, because..." in every Analysis paragraph so no fact goes unused.',
                  uz: 'Har bir tahlil xatboshisida "Bu holatda, chunki..." qolipi bilan barcha faktlarni ishlating.',
                },
                framework: 'Every-Fact-Used CIRAC',
                estimatedMinutes: 90,
              },
              {
                id: 'bar-s5',
                title: {
                  en: 'Master Article 9 Attachment, Perfection & Priority',
                  uz: 'UCC 9-modda: birikish, rasmiylashtirish va ustuvorlik qoidalari',
                },
                drill: {
                  en: 'Outline 4 past NCBE Secured Transactions essays under strict 25-minute clocks.',
                  uz: '4 ta oldingi NCBE inshosini qatʼiy 25 daqiqalik rejimda rejalashtiring.',
                },
                framework: 'PMSI Priority Ladder',
                estimatedMinutes: 70,
              },
              {
                id: 'bar-s6',
                title: {
                  en: 'Condense MEE-only subjects into 2-page rule sheets',
                  uz: 'MEE maxsus fanlarini 2 sahifalik qoida varaqlariga jamlash',
                },
                drill: {
                  en: 'Write verbatim high-yield rule statements from memory for Corporations, Agency & Wills.',
                  uz: 'Korporatsiya, vakillik va meros boʻyicha asosiy qoidalarni xotiradan aniq yozib chiqing.',
                },
                framework: 'Active Rule Recall Sheet',
                estimatedMinutes: 65,
              },
            ],
          },
          {
            id: 'bar-mpt',
            title: {
              en: 'MPT 90-Minute Closed-Universe Drafting',
              uz: 'MPT 90 daqiqalik yopiq manbali yuridik yozuv',
            },
            summary: {
              en: 'Read Task Memo + Library first, synthesize statutes/cases, and finish polished drafts on time.',
              uz: 'Vazifa xati va kutubxonani birinchi oʻqib, qonun va pretsedentlarni vaqtida yakuniy hujjatga jamlash.',
            },
            baselineHours: 32,
            difficulty: 'executive',
            keyFramework: '45-Min Read/Outline + 45-Min Draft Split',
            steps: [
              {
                id: 'bar-s7',
                title: {
                  en: 'Extract exact formatting & issues from the Task Memo',
                  uz: 'Vazifa xatidan aniq format va masalalarni ajratib olish',
                },
                drill: {
                  en: 'Build your document headings directly from the Task Memo in the first 7 minutes.',
                  uz: 'Ilk 7 daqiqada hujjat sarlavhalarini bevosita Vazifa xatidan koʻchirib tuzing.',
                },
                framework: 'Skeleton-First MPT',
                estimatedMinutes: 45,
              },
              {
                id: 'bar-s8',
                title: {
                  en: 'Synthesize Library cases into clear factor tests',
                  uz: 'Kutubxona pretsedentlarini aniq mezonlar roʻyxatiga sintezlash',
                },
                drill: {
                  en: 'Distinguish controlling precedent facts against your client’s file systematically.',
                  uz: 'Asosiy pretsedent faktlarini mijozingiz ishidagi faktlar bilan tizimli solishtiring.',
                },
                framework: 'Case-Fact Analogizing',
                estimatedMinutes: 65,
              },
              {
                id: 'bar-s9',
                title: {
                  en: 'Complete 2 full 90-minute MPTs (Objective Memo & Persuasive Brief)',
                  uz: '2 ta toʻliq 90 daqiqalik MPT (Xolis memo va Ishontiruvchi murojaat)',
                },
                drill: {
                  en: 'Enforce hard stop at minute 45 to start writing regardless of reading perfection.',
                  uz: '45-daqiqada qatʼiy toʻxtab, toʻgʻridan-toʻgʻri yozish bosqichiga oʻting.',
                },
                framework: 'Hard-45 Pivot Rule',
                estimatedMinutes: 90,
              },
            ],
          },
        ],
      },
      {
        id: 'bar-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Two-Day UBE Dress Rehearsal',
          uz: '3-bosqich · Ikki kunlik toʻliq UBE repetitsiyasi',
        },
        objective: {
          en: 'Validate 68%+ MBE accuracy and clean Day-1 writing stamina.',
          uz: '68%+ MBE aniqligini va 1-kun yozma chidamliligini tasdiqlash.',
        },
        modules: [
          {
            id: 'bar-sim',
            title: {
              en: 'Simulated 200-Question MBE & Six-Essay Endurance',
              uz: '200 savolli MBE va 6 insholik chidamlilik sinovi',
            },
            summary: {
              en: 'Replicate official exam pacing and close remaining sub-topic leaks.',
              uz: 'Rasmiy imtihon tempini toʻliq takrorlab, qolgan kichik boʻshliqlarni yopish.',
            },
            baselineHours: 36,
            difficulty: 'executive',
            keyFramework: '1.8-Min MBE Rhythm + Daily Rule Recall',
            steps: [
              {
                id: 'bar-s10',
                title: {
                  en: 'Sit 100-question morning + 100-question afternoon MBE',
                  uz: 'Ertalabki 100 va tushdan keyingi 100 savolli MBE bloki',
                },
                drill: {
                  en: 'Check pacing every 33 questions (strictly 1 hour per 33 items).',
                  uz: 'Har 33 ta savolda vaqtni tekshiring (qatʼiy 1 soatda 33 savol).',
                },
                framework: '33-Per-Hour Checkpoint',
                estimatedMinutes: 180,
              },
              {
                id: 'bar-s11',
                title: {
                  en: 'Audit MBE misses into a tight rule-exception deck',
                  uz: 'MBE xatolarini ixcham qoida-istisno kartalariga jamlash',
                },
                drill: {
                  en: 'Write 1-sentence rules only for questions missed on substance, not fatigue.',
                  uz: 'Faqat huquqiy mohiyat boʻyicha yoʻl qoʻyilgan xatolar uchun bir gaplik qoida yozing.',
                },
                framework: 'High-Yield Exception Log',
                estimatedMinutes: 60,
              },
              {
                id: 'bar-s12',
                title: {
                  en: 'Run 3-hour continuous 6-MEE afternoon block',
                  uz: '3 soatlik uzluksiz 6 ta MEE insho bloki',
                },
                drill: {
                  en: 'Keep strict 30-minute hard stops on each essay to guarantee zero blank answers.',
                  uz: 'Birorta insho chala qolmasligi uchun har birida 30-daqiqada qatʼiy toʻxtang.',
                },
                framework: 'Zero-Blank 30m Discipline',
                estimatedMinutes: 180,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'toles',
    category: 'legal',
    code: 'TOLES-ADV',
    title: {
      en: 'TOLES Legal English & Commercial Drafting',
      uz: 'TOLES yuridik ingliz tili va tijorat shartnomalari',
    },
    subtitle: {
      en: 'Modern commercial contract precision, legal collocations, and cross-border advisory clarity.',
      uz: 'Zamonaviy tijorat shartnomalari aniqligi, yuridik iboralar va xalqaro maslahat xatlari.',
    },
    archetypeLabel: {
      en: 'International Commercial Law',
      uz: 'Xalqaro tijorat huquqi',
    },
    recommendedWeeks: 6,
    baselineTotalHours: 48,
    phases: [
      {
        id: 'toles-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Modern Plain Legal English & Collocations',
          uz: '1-bosqich · Zamonaviy aniq yuridik ingliz tili va birikmalar',
        },
        objective: {
          en: 'Eliminate archaic legalese and command exact commercial verbs, prepositions, and terms.',
          uz: 'Eskirgan murakkab iboralardan xalos boʻlib, aniq tijorat feʼllari va predloglarini egallash.',
        },
        modules: [
          {
            id: 'toles-collocations',
            title: {
              en: 'Commercial Legal Collocations & Preposition Accuracy',
              uz: 'Tijorat huquqi birikmalari va predlog aniqligi',
            },
            summary: {
              en: 'Master exact pairings (breach of, liable for, pursuant to, subject to, without prejudice).',
              uz: 'Aniq huquqiy juftliklarni (breach of, liable for, subject to, without prejudice) xatosiz qoʻllash.',
            },
            baselineHours: 16,
            difficulty: 'foundational',
            keyFramework: 'Precision Legal Collocation Ledger',
            steps: [
              {
                id: 'toles-s1',
                title: {
                  en: 'Replace archaic legalese with modern City-firm English',
                  uz: 'Eskirgan yuridik qoliplarni zamonaviy xalqaro standartga oʻgirish',
                },
                drill: {
                  en: 'Rewrite 20 clauses removing "hereinafter", "witnesseth", and redundant doublets.',
                  uz: '20 ta bandni eskirgan soʻzlar va ortiqcha takrorlarsiz zamonaviy tilda qayta yozing.',
                },
                framework: 'Plain Commercial Redraft',
                estimatedMinutes: 55,
              },
              {
                id: 'toles-s2',
                title: {
                  en: 'Drill high-stakes contract prepositions & modal verbs',
                  uz: 'Shartnomadagi muhim predloglar va modal feʼllar mashqi',
                },
                drill: {
                  en: 'Distinguish "shall" (obligation), "must" (condition), and "may" (discretion) in 35 items.',
                  uz: '35 ta bandda "shall" (majburiyat), "must" (shart) va "may" (huquq) farqini aniq qoʻllang.',
                },
                framework: 'Obligation vs Discretion Rule',
                estimatedMinutes: 50,
              },
              {
                id: 'toles-s3',
                title: {
                  en: 'Master corporate, M&A & employment core vocabulary',
                  uz: 'Korporativ, M&A va mehnat huquqi asosiy terminologiyasi',
                },
                drill: {
                  en: 'Complete 40 contextual cloze exercises on indemnities, warranties, and restrictive covenants.',
                  uz: 'Kafolatlar, tovon va cheklovchi shartlar boʻyicha 40 ta kontekstli mashq bajaring.',
                },
                framework: 'Commercial Context Cloze',
                estimatedMinutes: 55,
              },
            ],
          },
        ],
      },
      {
        id: 'toles-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Contract Boilerplate & Risk Allocation',
          uz: '2-bosqich · Shartnoma standart bandlari va xatar taqsimoti',
        },
        objective: {
          en: 'Draft, audit, and negotiate commercial clauses without ambiguity.',
          uz: 'Tijorat shartnomasi bandlarini noaniqliksiz tuzish, tekshirish va tahrirlash.',
        },
        modules: [
          {
            id: 'toles-drafting',
            title: {
              en: 'Contract Clause Drafting & Ambiguity Elimination',
              uz: 'Shartnoma bandlarini tuzish va noaniqlikni bartaraf etish',
            },
            summary: {
              en: 'Craft airtight force majeure, limitation of liability, termination, and jurisdiction clauses.',
              uz: 'Fors-major, javobgarlikni cheklash, bekor qilish va yurisdiksiya bandlarini aniq yozish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Active-Voice Risk Allocation',
            steps: [
              {
                id: 'toles-s4',
                title: {
                  en: 'Spot and fix syntactic ambiguity in commercial clauses',
                  uz: 'Tijorat bandlaridagi sintaktik noaniqliklarni topib tuzatish',
                },
                drill: {
                  en: 'Redline 10 defective clauses using numbered sub-paragraphs and defined terms.',
                  uz: '10 ta noaniq bandni raqamlangan kichik qismlar va aniq atamalar bilan qayta tahrirlang.',
                },
                framework: 'Tabulated Clause Clarity',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s5',
                title: {
                  en: 'Contrast warranties, representations & indemnities',
                  uz: 'Kafolat (warranty), bayonot (representation) va tovon (indemnity) farqlari',
                },
                drill: {
                  en: 'Draft side-by-side protective provisions from both Buyer and Seller perspectives.',
                  uz: 'Xaridor va Sotuvchi nuqtai nazaridan yonma-yon himoya bandlarini tuzing.',
                },
                framework: 'Bilateral Risk Framing',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s6',
                title: {
                  en: 'Audit Boilerplate: Entire Agreement, Severability & Assignment',
                  uz: 'Standart bandlar auditi: Yaxlit shartnoma, boʻlinuvchanlik va huquq oʻtkazish',
                },
                drill: {
                  en: 'Verify enforceability phrasing across 8 cross-border boilerplate clauses.',
                  uz: '8 ta xalqaro standart bandning yuridik kuchini taʼminlovchi ifodalarini tekshiring.',
                },
                framework: 'Boilerplate Integrity Audit',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
      {
        id: 'toles-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Client Advisory Memos & Timed TOLES Papers',
          uz: '3-bosqich · Mijozga maslahat xatlari va vaqtli TOLES sinovlari',
        },
        objective: {
          en: 'Achieve Gold/Advanced 85%+ accuracy on timed 120-minute TOLES papers.',
          uz: '120 daqiqalik vaqtli TOLES sinovlarida 85%+ (Gold/Advanced) aniqlikka erishish.',
        },
        modules: [
          {
            id: 'toles-mocks',
            title: {
              en: 'Cross-Border Client Letters & Full Timed Papers',
              uz: 'Xalqaro mijoz xatlari va toʻliq vaqtli sinovlar',
            },
            summary: {
              en: 'Translate dense legal advice into crisp, executive commercial English.',
              uz: 'Murakkab yuridik maslahatni aniq va tushunarli tijorat tiliga oʻgirish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Executive Legal Advisory Register',
            steps: [
              {
                id: 'toles-s7',
                title: {
                  en: 'Draft 2 executive client advisory emails',
                  uz: '2 ta mijozga moʻljallangan rasmiy yuridik maslahat xati yozish',
                },
                drill: {
                  en: 'Open with the bottom-line risk verdict, followed by 3 concise actionable options.',
                  uz: 'Xatni asosiy xatar xulosasi bilan boshlab, 3 ta aniq amaliy yechim taklif qiling.',
                },
                framework: 'BLUF Legal Advisory',
                estimatedMinutes: 55,
              },
              {
                id: 'toles-s8',
                title: {
                  en: 'Complete full 120-minute TOLES Advanced mock paper',
                  uz: 'Toʻliq 120 daqiqalik TOLES Advanced sinovini topshirish',
                },
                drill: {
                  en: 'Score strictly on grammar, precision drafting, and commercial register.',
                  uz: 'Grammatika, shartnoma aniqligi va rasmiy uslub boʻyicha qatʼiy baholang.',
                },
                framework: 'Full Paper Timing Check',
                estimatedMinutes: 120,
              },
              {
                id: 'toles-s9',
                title: {
                  en: 'Review personal Legal English error & collocation bank',
                  uz: 'Shaxsiy yuridik ingliz tili xatolar va birikmalar bankini yakunlash',
                },
                drill: {
                  en: 'Drill your top 30 previously missed prepositions and formal contract terms.',
                  uz: 'Oldin xato qilingan 30 ta asosiy predlog va shartnoma atamalarini qayta mustahkamlang.',
                },
                framework: 'Gold-Band Precision Review',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
    ],
  },
];
