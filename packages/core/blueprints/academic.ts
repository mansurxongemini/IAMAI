import type { Blueprint } from '../schemas';

export const ACADEMIC_BLUEPRINTS: Blueprint[] = [
  {
    id: 'ielts-academic',
    category: 'academic',
    code: 'IELTS-AC',
    title: {
      en: 'IELTS Academic Mastery',
      uz: 'IELTS Academic yuqori ball dasturi',
    },
    subtitle: {
      en: 'Band 7.5–8.5 precision across Writing Task 1/2, Speaking Part 3, Reading & Listening.',
      uz: 'Writing Task 1/2, Speaking Part 3, Reading va Listening boʻyicha Band 7.5–8.5 aniqligi.',
    },
    archetypeLabel: {
      en: 'Academic English',
      uz: 'Akademik ingliz tili',
    },
    recommendedWeeks: 8,
    baselineTotalHours: 96,
    phases: [
      {
        id: 'ielts-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnostic Calibration & Core Mechanics',
          uz: '1-bosqich · Diagnostika va asosiy mexanikani sozlash',
        },
        objective: {
          en: 'Audit band descriptors and lock high-yield Listening/Reading accuracy.',
          uz: 'Baholash mezonlarini aniq tushunish hamda Listening va Reading aniqligini barqarorlashtirish.',
        },
        modules: [
          {
            id: 'ielts-listening-basics',
            title: {
              en: 'Listening Precision & Section 3–4 Distractor Defense',
              uz: 'Listening aniqligi va 3–4-boʻlim chalgʻituvchilaridan himoya',
            },
            summary: {
              en: 'Eliminate spelling traps, plural slips, and multi-speaker academic distractors.',
              uz: 'Imlo xatolari, koʻplik shakllari va akademik suhbatdagi chalgʻituvchilarni bartaraf etish.',
            },
            baselineHours: 14,
            difficulty: 'foundational',
            keyFramework: 'Predict-Track-Verify Listening Loop',
            steps: [
              {
                id: 'ielts-s1',
                title: {
                  en: 'Pre-read Section 3–4 stems for grammatical constraints',
                  uz: '3–4-boʻlim savollarini grammatik cheklovlar boʻyicha oldindan oʻqish',
                },
                drill: {
                  en: 'Underline word-limit rules and predict exact part of speech before audio starts.',
                  uz: 'Audio boshlanishidan oldin soʻz chegarasi va kutilayotgan soʻz turkumini belgilang.',
                },
                framework: 'Pre-Audio Prediction Grid',
                estimatedMinutes: 45,
              },
              {
                id: 'ielts-s2',
                title: {
                  en: 'Track speaker self-corrections and hedging cues',
                  uz: 'Soʻzlovchining oʻzini tuzatish va ikkilanish signallarini tutish',
                },
                drill: {
                  en: 'Complete 2 Cambridge Section 3–4 drills logging every distractor trigger word.',
                  uz: '2 ta Cambridge 3–4-boʻlim mashqini bajarib, har bir chalgʻituvchi signal soʻzini yozib oling.',
                },
                framework: 'Distractor Signpost Log',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s3',
                title: {
                  en: 'Run 10-minute error log for spelling & plurals',
                  uz: 'Imlo va koʻplik shakllari boʻyicha 10 daqiqalik xatolar daftari',
                },
                drill: {
                  en: 'Maintain a personal 50-word high-frequency academic spelling checklist.',
                  uz: 'Koʻp uchraydigan 50 ta akademik soʻzning shaxsiy imlo roʻyxatini yuriting.',
                },
                framework: 'Zero-Slip Spelling Audit',
                estimatedMinutes: 35,
              },
            ],
          },
          {
            id: 'ielts-reading-tfng',
            title: {
              en: 'Reading Speed, T/F/NG Logic & Heading Matching',
              uz: 'Reading tezligi, T/F/NG mantiqi va sarlavhalarni moslashtirish',
            },
            summary: {
              en: 'Master synonym mapping and strict textual boundaries for Passage 2–3.',
              uz: '2–3-matnlarda sinonim xaritalash va matn chegarasiga qatʼiy amal qilish.',
            },
            baselineHours: 16,
            difficulty: 'intermediate',
            keyFramework: 'Synonym Triangulation + Strict Evidence Test',
            steps: [
              {
                id: 'ielts-s4',
                title: {
                  en: 'Separate False vs Not Given with binary logic',
                  uz: 'False va Not Given farqini aniq mantiqiy mezon bilan ajratish',
                },
                drill: {
                  en: 'Solve 30 T/F/NG questions writing the exact contradicting line or missing variable.',
                  uz: '30 ta T/F/NG savolini yechib, har biri uchun zid jumla yoki yetishmayotgan omilni yozing.',
                },
                framework: 'Contradiction vs Silence Rule',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s5',
                title: {
                  en: 'Execute 15-20-25 minute Passage pacing',
                  uz: 'Matnlar boʻyicha 15–20–25 daqiqalik vaqt taqsimoti',
                },
                drill: {
                  en: 'Complete one full timed Reading test keeping Passage 1 strictly under 15 minutes.',
                  uz: 'Toʻliq vaqtli Reading testini ishlang va 1-matnni 15 daqiqadan oshirmang.',
                },
                framework: '15-20-25 Pacing Discipline',
                estimatedMinutes: 65,
              },
              {
                id: 'ielts-s6',
                title: {
                  en: 'Build a paraphrase equivalence bank',
                  uz: 'Parafraza va sinonim ekvivalentlar bankini yaratish',
                },
                drill: {
                  en: 'Extract 25 question-to-passage synonym pairs from every completed mock.',
                  uz: 'Har bir sinov testidan savol va matn oʻrtasidagi 25 ta parafraza juftligini chiqarib yozing.',
                },
                framework: 'Paraphrase Ledger',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'ielts-p2',
        order: 2,
        title: {
          en: 'Phase 2 · C1 Writing Architecture & Executive Speaking',
          uz: '2-bosqich · C1 darajadagi Writing va ravon Speaking',
        },
        objective: {
          en: 'Eliminate memorized templates and produce coherent, nuanced C1 arguments.',
          uz: 'Yodlangan qoliplardan voz kechib, mantiqiy izchil va chuqur C1 dalillar yozish hamda soʻzlash.',
        },
        modules: [
          {
            id: 'ielts-w2-cohesion',
            title: {
              en: 'Writing Task 2 · Thesis Precision & C1 Cohesion',
              uz: 'Writing Task 2 · Tezis aniqligi va C1 bogʻliqlik',
            },
            summary: {
              en: 'Build clear, fully extended body paragraphs with natural lexical range.',
              uz: 'Tabiiy akademik leksika bilan toʻliq rivojlantirilgan asosiy xatboshilar qurish.',
            },
            baselineHours: 22,
            difficulty: 'executive',
            keyFramework: 'PEEL + Counter-Argument Concession',
            steps: [
              {
                id: 'ielts-s7',
                title: {
                  en: 'Spend 5 minutes planning position & topic sentences',
                  uz: 'Pozitsiya va tayanch jumlalarni rejalashtirishga 5 daqiqa ajratish',
                },
                drill: {
                  en: 'Outline 6 essays (Opinion, Discussion, Problem-Solution) with clear thesis + 2 reasons.',
                  uz: '6 xil insho turi boʻyicha aniq tezis va 2 ta asosiy dalil bilan reja tuzing.',
                },
                framework: '5-Minute Blueprint Outline',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s8',
                title: {
                  en: 'Extend claims using Cause → Mechanism → Consequence',
                  uz: 'Fikrni Sabab → Mexanizm → Oqibat zanjiri bilan chuqurlashtirish',
                },
                drill: {
                  en: 'Write 4 body paragraphs where every sentence logically advances the topic claim.',
                  uz: 'Har bir jumlasi asosiy fikrni mantiqan rivojlantiruvchi 4 ta xatboshi yozing.',
                },
                framework: 'Logic-Chain Extension',
                estimatedMinutes: 75,
              },
              {
                id: 'ielts-s9',
                title: {
                  en: 'Audit Task 2 against the 4 official band criteria',
                  uz: 'Task 2 inshosini 4 ta rasmiy baholash mezoni boʻyicha tekshirish',
                },
                drill: {
                  en: 'Replace mechanical linkers ("Firstly", "Moreover") with referential cohesion.',
                  uz: 'Mexanik bogʻlovchilar oʻrniga tabiiy maʼnoviy bogʻlanishlardan foydalaning.',
                },
                framework: 'TR-CC-LR-GRA Band 8 Audit',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'ielts-w1-synthesis',
            title: {
              en: 'Writing Task 1 · High-Contrast Data Overview',
              uz: 'Writing Task 1 · Maʼlumotlarning aniq umumiy tahlili',
            },
            summary: {
              en: 'Write crisp Band 8 overviews grouping trends cleanly in 20 minutes.',
              uz: '20 daqiqa ichida asosiy tendensiyalarni guruhlab Band 8 darajasida umumlashtirish.',
            },
            baselineHours: 14,
            difficulty: 'intermediate',
            keyFramework: 'Overview-First Comparative Grouping',
            steps: [
              {
                id: 'ielts-s10',
                title: {
                  en: 'Draft a 2-sentence data-free Overview paragraph',
                  uz: 'Raqamlarsiz 2 jumlalik kuchli umumiy xulosa (Overview) yozish',
                },
                drill: {
                  en: 'Practice 5 charts (line, bar, map, process, table) writing only Intro + Overview.',
                  uz: '5 xil grafik turi uchun faqat kirish va umumiy xulosa qismlarini yozib mashq qiling.',
                },
                framework: 'Macro-Trend Overview',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s11',
                title: {
                  en: 'Group comparative figures instead of listing chronologically',
                  uz: 'Maʼlumotlarni ketma-ket sanamasdan solishtirma guruhlash',
                },
                drill: {
                  en: 'Write 2 full 170-word Task 1 reports strictly inside 20 minutes each.',
                  uz: 'Har biri 20 daqiqa ichida 170 soʻzlik 2 ta toʻliq Task 1 hisobotini yozing.',
                },
                framework: 'Comparative Clustering',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s12',
                title: {
                  en: 'Upgrade trend verbs and approximation precision',
                  uz: 'Tendensiya feʼllari va taxminiy nisbat ifodalarini boyitish',
                },
                drill: {
                  en: 'Master 15 precise academic proportion phrases (just under a third, plateaued at).',
                  uz: '15 ta aniq akademik nisbat va dinamika iboralarini kontekstda qoʻllang.',
                },
                framework: 'Precision Data Lexicon',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'ielts-speaking-p3',
            title: {
              en: 'Speaking Part 2–3 · Spontaneous Depth & Fluency',
              uz: 'Speaking Part 2–3 · Erkin chuqurlik va ravon nutq',
            },
            summary: {
              en: 'Deliver natural 2-minute narratives and abstract Part 3 policy analysis.',
              uz: 'Tabiiy 2 daqiqalik hikoya va Part 3 boʻyicha chuqur tahliliy javoblar berish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Direct Stance → Nuance → Example',
            steps: [
              {
                id: 'ielts-s13',
                title: {
                  en: 'Master 1-minute Part 2 keyword story mapping',
                  uz: 'Part 2 uchun 1 daqiqalik kalit soʻzlar xaritasini tuzish',
                },
                drill: {
                  en: 'Speak for full 2 minutes on 5 cue cards using Past-Present-Reflection arcs.',
                  uz: '5 ta mavzu boʻyicha Oʻtmish–Hozir–Xulosa qolipida toʻliq 2 daqiqa soʻzlang.',
                },
                framework: 'Three-Timeline Cue Map',
                estimatedMinutes: 55,
              },
              {
                id: 'ielts-s14',
                title: {
                  en: 'Handle abstract Part 3 questions with structured nuance',
                  uz: 'Mavhum Part 3 savollariga muvozanatli va chuqur javob berish',
                },
                drill: {
                  en: 'Answer 10 analytical prompts contrasting short-term vs long-term societal effects.',
                  uz: '10 ta tahliliy savolga qisqa va uzoq muddatli oqibatlarni taqqoslab javob bering.',
                },
                framework: 'Perspective-Shift Speaking',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s15',
                title: {
                  en: 'Record pronunciation chunking & sentence stress',
                  uz: 'Talaffuz boʻlaklari va mantiqiy urgʻuni yozib tahlil qilish',
                },
                drill: {
                  en: 'Eliminate flat monotone and over-rehearsed idioms; focus on natural rhythm.',
                  uz: 'Bir xil ohang va sunʼiy iboralarni olib tashlab, tabiiy nutq urgʻusiga eʼtibor bering.',
                },
                framework: 'Prosodic Chunking Drill',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'ielts-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Full Exam Simulations & Error Elimination',
          uz: '3-bosqich · Toʻliq imtihon simulyatsiyasi va xatolarni tugatish',
        },
        objective: {
          en: 'Stabilize Band 7.5+ output under continuous 2h45m exam fatigue.',
          uz: '2 soat 45 daqiqalik uzluksiz imtihon bosimi ostida Band 7.5+ natijani barqarorlashtirish.',
        },
        modules: [
          {
            id: 'ielts-full-mocks',
            title: {
              en: 'Full Timed Mock Series & Root-Cause Calibration',
              uz: 'Toʻliq vaqtli sinov imtihonlari va ildiz sabab tahlili',
            },
            summary: {
              en: 'Run computer-delivered full mocks and close every recurring band bottleneck.',
              uz: 'Kompyuter formatidagi toʻliq sinovlarni topshirib, takrorlanuvchi xatolarni yopish.',
            },
            baselineHours: 14,
            difficulty: 'executive',
            keyFramework: 'Mock-Diagnose-Patch Cycle',
            steps: [
              {
                id: 'ielts-s16',
                title: {
                  en: 'Sit full Listening + Reading + Writing block',
                  uz: 'Listening + Reading + Writing blokini uzluksiz topshirish',
                },
                drill: {
                  en: 'Simulate exam-day morning timing with zero breaks between sections.',
                  uz: 'Boʻlimlar orasida tanaffussiz, imtihon kuni soatida toʻliq sinovdan oʻting.',
                },
                framework: 'Full Stamina Simulation',
                estimatedMinutes: 165,
              },
              {
                id: 'ielts-s17',
                title: {
                  en: 'Audit Writing essays for lexical & grammatical precision',
                  uz: 'Insholarni leksik va grammatik aniqlik boʻyicha chuqur tahrirlash',
                },
                drill: {
                  en: 'Rewrite your weakest paragraph to remove article, preposition, and agreement errors.',
                  uz: 'Eng zaif xatboshini artikl, predlog va zamon mosligi xatolarisiz qayta yozing.',
                },
                framework: 'Precision Redline Edit',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s18',
                title: {
                  en: 'Execute final 14-minute full Speaking mock',
                  uz: 'Yakuniy 14 daqiqalik toʻliq Speaking sinovi',
                },
                drill: {
                  en: 'Complete Parts 1, 2, and 3 continuously and review fluency hesitation markers.',
                  uz: '1, 2 va 3-qismlarni uzluksiz topshirib, toʻxtalish va ravonlikni baholang.',
                },
                framework: 'Live Examiner Simulation',
                estimatedMinutes: 40,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sat-digital',
    category: 'academic',
    code: 'SAT-DIG',
    title: {
      en: 'Digital SAT 1500+ Blueprint',
      uz: 'Digital SAT 1500+ tayyorgarlik dasturi',
    },
    subtitle: {
      en: 'Adaptive Reading & Writing logic, Desmos speed, and hard Module 2 precision.',
      uz: 'Adaptiv Reading & Writing mantiqi, Desmos tezligi va murakkab 2-modul aniqligi.',
    },
    archetypeLabel: {
      en: 'Undergraduate Admissions',
      uz: 'Xalqaro universitet qabuli',
    },
    recommendedWeeks: 8,
    baselineTotalHours: 90,
    phases: [
      {
        id: 'sat-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Reading & Writing Core Rules',
          uz: '1-bosqich · Reading & Writing asosiy qoidalari',
        },
        objective: {
          en: 'Secure near-100% accuracy on Standard English Conventions and Transitions.',
          uz: 'Grammatika qoidalari va mantiqiy bogʻlovchilarda deyarli 100% aniqlikka erishish.',
        },
        modules: [
          {
            id: 'sat-conventions',
            title: {
              en: 'Standard English Conventions & Boundaries',
              uz: 'Akademik ingliz tili meʼyorlari va tinish belgilari',
            },
            summary: {
              en: 'Turn punctuation, clauses, and modifiers into fast 20-second points.',
              uz: 'Tinish belgilari, ergash gaplar va aniqlovchilarni 20 soniyalik kafolatlangan ballga aylantirish.',
            },
            baselineHours: 16,
            difficulty: 'foundational',
            keyFramework: 'Clause Boundary Matrix',
            steps: [
              {
                id: 'sat-s1',
                title: {
                  en: 'Master independent vs dependent clause joins',
                  uz: 'Mustaqil va tobe gaplarni bogʻlash qoidalarini egallash',
                },
                drill: {
                  en: 'Complete 40 boundary drills targeting semicolons, colons, dashes, and comma splices.',
                  uz: 'Nuqtali vergul, ikki nuqta va tire boʻyicha 40 ta tezkor mashq bajaring.',
                },
                framework: 'Four-Way Clause Join',
                estimatedMinutes: 55,
              },
              {
                id: 'sat-s2',
                title: {
                  en: 'Eliminate dangling modifiers & subject-verb traps',
                  uz: 'Notoʻgʻri aniqlovchi va ega-kesim mosligi tuzoqlarini bartaraf etish',
                },
                drill: {
                  en: 'Strip prepositional clutter to isolate true subject-verb pairs in 30 items.',
                  uz: '30 ta testda yordamchi iboralarni chetga olib, haqiqiy ega-kesim juftligini toping.',
                },
                framework: 'Core-Clause Stripping',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s3',
                title: {
                  en: 'Lock Rhetorical Synthesis & Transitions speed',
                  uz: 'Ritorik sintez va bogʻlovchilar tezligini mustahkamlash',
                },
                drill: {
                  en: 'Read the question goal first on student-notes items to solve in under 25 seconds.',
                  uz: 'Talaba qaydlari savollarida avval maqsadni oʻqib, 25 soniyadan tez yechishni mashq qiling.',
                },
                framework: 'Goal-First Synthesis',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'sat-rw-logic',
            title: {
              en: 'Command of Evidence & Logical Inference',
              uz: 'Dalillar tahlili va mantiqiy xulosa chiqarish',
            },
            summary: {
              en: 'Dissect dense single-paragraph scientific and literary claims systematically.',
              uz: 'Ilmiy va adabiy qisqa matnlardagi asosiy daʼvolarni tizimli parchalash.',
            },
            baselineHours: 20,
            difficulty: 'executive',
            keyFramework: 'Claim-Evidence Alignment Test',
            steps: [
              {
                id: 'sat-s4',
                title: {
                  en: 'Isolate hypothesis vs data support in science passages',
                  uz: 'Ilmiy matnlarda gipoteza va tajriba dalilini ajratish',
                },
                drill: {
                  en: 'Solve 25 strengthen/weaken evidence questions by predicting the answer before reading choices.',
                  uz: '25 ta dalil savolida javob variantlarini koʻrmasdan oldin mantiqiy xulosani oldindan ayting.',
                },
                framework: 'Pre-Phrase Prediction',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s5',
                title: {
                  en: 'Master Words-in-Context precision',
                  uz: 'Kontekstdagi aniq soʻz tanlash mahorati',
                },
                drill: {
                  en: 'Identify contrast/support clue words and eliminate emotionally mismatched options.',
                  uz: 'Matndagi ziddiyat yoki qoʻllab-quvvatlash ishoralariga qarab ortiqcha variantlarni chiqarib tashlang.',
                },
                framework: 'Context Clue Triangulation',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s6',
                title: {
                  en: 'Handle paired-text relationship questions',
                  uz: 'Juft matnlar oʻrtasidagi munosabat savollarini yechish',
                },
                drill: {
                  en: 'Summarize Text 1 and Text 2 theses in 5 words each before comparing choices.',
                  uz: 'Variantlarga oʻtishdan oldin 1- va 2-matn tezisini 5 tadan soʻzda yozing.',
                },
                framework: 'Five-Word Dual Thesis',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
      {
        id: 'sat-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Math Mastery & Desmos Leverage',
          uz: '2-bosqich · Matematika mahorati va Desmos ustunligi',
        },
        objective: {
          en: 'Automate Algebra/Functions with Desmos and solve hard Module 2 geometry cleanly.',
          uz: 'Algebra va funksiyalarni Desmos bilan tezlashtirib, murakkab 2-modul masalalarini aniq yechish.',
        },
        modules: [
          {
            id: 'sat-algebra-desmos',
            title: {
              en: 'Algebra, Systems & Desmos Regression Speed',
              uz: 'Algebra, tenglamalar tizimi va Desmos regressiyasi',
            },
            summary: {
              en: 'Convert multi-step symbolic algebra into 15-second graphical solutions.',
              uz: 'Koʻp bosqichli algebraik masalalarni 15 soniyalik grafik yechimlarga aylantirish.',
            },
            baselineHours: 20,
            difficulty: 'intermediate',
            keyFramework: 'Desmos Sliders & Regression Playbook',
            steps: [
              {
                id: 'sat-s7',
                title: {
                  en: 'Solve systems, quadratics & constants via Desmos',
                  uz: 'Tizimlar, kvadrat funksiyalar va parametrlarni Desmos orqali yechish',
                },
                drill: {
                  en: 'Use regression (~) and sliders on 25 official Bluebook-style algebra problems.',
                  uz: '25 ta rasmiy turdagi algebra masalasini regressiya (~) va slayderlar bilan yeching.',
                },
                framework: 'Desmos Graphical Verification',
                estimatedMinutes: 65,
              },
              {
                id: 'sat-s8',
                title: {
                  en: 'Master discriminant & no-solution parameter traps',
                  uz: 'Diskriminant va yechimsiz parametr tuzoqlarini egallash',
                },
                drill: {
                  en: 'Drill 20 constant-k questions checking slope equality and b^2 - 4ac conditions.',
                  uz: '20 ta parametrli masalada burchak koeffitsienti va diskriminant shartlarini tekshiring.',
                },
                framework: 'Parameter Condition Checklist',
                estimatedMinutes: 55,
              },
              {
                id: 'sat-s9',
                title: {
                  en: 'Nail exponential growth & percentage change modeling',
                  uz: 'Eksponensial oʻsish va foiz oʻzgarishi modellarini yechish',
                },
                drill: {
                  en: 'Translate word-problem time intervals (per decade, every 6 months) into exact exponents.',
                  uz: 'Matnli masalalardagi vaqt oraliqlarini aniq daraja koʻrsatkichlariga aylantiring.',
                },
                framework: 'Interval-Scaled Exponents',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'sat-adv-math',
            title: {
              en: 'Hard Module 2 Geometry, Trig & Data Analysis',
              uz: 'Murakkab 2-modul: Geometriya, trigonometriya va statistika',
            },
            summary: {
              en: 'Conquer the final 6 hard questions that separate 1400 from 1550.',
              uz: '1400 va 1550 ball orasini ajratuvchi soʻnggi 6 ta murakkab masalani zabt etish.',
            },
            baselineHours: 18,
            difficulty: 'executive',
            keyFramework: 'Circle Theorems + Similar Triangle Ratios',
            steps: [
              {
                id: 'sat-s10',
                title: {
                  en: 'Master circle equations, radians & arc proportions',
                  uz: 'Aylana tenglamasi, radianlar va yoy nisbatlari',
                },
                drill: {
                  en: 'Solve 20 hard circle and right-triangle trigonometry items without careless unit slips.',
                  uz: '20 ta murakkab aylana va trigonometriya masalasini birlik xatosiz yeching.',
                },
                framework: 'Completing-the-Square Speed',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s11',
                title: {
                  en: 'Solve 3D volume scaling & similar solids',
                  uz: '3D hajm masshtablash va oʻxshash jismlar masalalari',
                },
                drill: {
                  en: 'Apply k, k^2, k^3 scaling ratios across 15 composite solid problems.',
                  uz: '15 ta murakkab fazoviy masalada k, k² va k³ nisbatlarini qoʻllang.',
                },
                framework: 'Dimensional Scaling Rule',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s12',
                title: {
                  en: 'Audit statistical bias, margin of error & median shifts',
                  uz: 'Statistik xatolik, ishonch oraligʻi va mediana siljishi',
                },
                drill: {
                  en: 'Distinguish observational vs experimental causation across 15 data prompts.',
                  uz: '15 ta statistika savolida kuzatuv va tajriba oʻrtasidagi sababiyat farqini aniqlang.',
                },
                framework: 'Study Design Validity Filter',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'sat-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Bluebook Adaptive Simulations',
          uz: '3-bosqich · Bluebook adaptiv simulyatsiyalari',
        },
        objective: {
          en: 'Lock timing across adaptive Modules 1 and 2 and close all error patterns.',
          uz: 'Adaptiv 1- va 2-modullar vaqtini barqarorlashtirib, barcha xato turlarini yopish.',
        },
        modules: [
          {
            id: 'sat-bluebook-mocks',
            title: {
              en: 'Adaptive Full-Length Mocks & Error Taxonomy',
              uz: 'Toʻliq adaptiv sinovlar va xatolar taksonomiyasi',
            },
            summary: {
              en: 'Execute timed full tests and classify every miss by concept vs rushing.',
              uz: 'Vaqtli toʻliq testlarni bajarib, har bir xatoni bilim yoki shoshilish sababiga ajratish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Two-Pass Pacing + Error Ledger',
            steps: [
              {
                id: 'sat-s13',
                title: {
                  en: 'Run 2-pass timing on hard Module 2',
                  uz: 'Murakkab 2-modulda ikki oʻtishli vaqt strategiyasini qoʻllash',
                },
                drill: {
                  en: 'Flag any question exceeding 90 seconds on pass 1 and return cleanly with remaining buffer.',
                  uz: '90 soniyadan oshgan savolni belgilab oʻting va qolgan vaqt zaxirasi bilan qayting.',
                },
                framework: 'Two-Pass Time Protection',
                estimatedMinutes: 135,
              },
              {
                id: 'sat-s14',
                title: {
                  en: 'Categorize every mistake in a 4-reason log',
                  uz: 'Har bir xatoni 4 sababli tahlil daftariga kiritish',
                },
                drill: {
                  en: 'Tag misses: Misread Question | Concept Gap | Desmos Slip | Time Pressure.',
                  uz: 'Xatolarni belgilang: Shartni notoʻgʻri oʻqish | Bilim boʻshligʻi | Desmos xatosi | Vaqt bosimi.',
                },
                framework: 'Four-Bucket Error Audit',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s15',
                title: {
                  en: 'Re-solve all logged misses cold after 72 hours',
                  uz: 'Qayd etilgan barcha xato savollarni 72 soatdan soʻng qayta yechish',
                },
                drill: {
                  en: 'Verify zero repeat mistakes on a custom 30-question redemption set.',
                  uz: '30 ta tanlangan murakkab savolda takroriy xato yoʻqligini tasdiqlang.',
                },
                framework: '72-Hour Redemption Drill',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'toefl-ibt',
    category: 'academic',
    code: 'TOEFL-iBT',
    title: {
      en: 'TOEFL iBT 110+ Intensive',
      uz: 'TOEFL iBT 110+ intensiv dasturi',
    },
    subtitle: {
      en: 'Academic lecture synthesis, integrated speaking delivery, and concise academic writing.',
      uz: 'Akademik maʼruza sintezi, integratsiyalashgan Speaking va aniq akademik Writing.',
    },
    archetypeLabel: {
      en: 'University English',
      uz: 'Universitet ingliz tili',
    },
    recommendedWeeks: 6,
    baselineTotalHours: 68,
    phases: [
      {
        id: 'toefl-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Academic Reading & Lecture Note-Taking',
          uz: '1-bosqich · Akademik Reading va maʼruza konspekti',
        },
        objective: {
          en: 'Extract professor structure rapidly and score 28+ on Reading & Listening.',
          uz: 'Professor maʼruzasi tuzilmasini tez ajratib, Reading va Listeningda 28+ ball olish.',
        },
        modules: [
          {
            id: 'toefl-reading',
            title: {
              en: 'Academic Reading & Prose Summary Mastery',
              uz: 'Akademik Reading va matn xulosasi mahorati',
            },
            summary: {
              en: 'Master negative factual, sentence simplification, and 3-choice summary items.',
              uz: 'Inkor fakt, jumlani soddalashtirish va 3 tanlovli xulosa savollarini aniq yechish.',
            },
            baselineHours: 14,
            difficulty: 'foundational',
            keyFramework: 'Paragraph Function Mapping',
            steps: [
              {
                id: 'toefl-s1',
                title: {
                  en: 'Map paragraph roles while reading',
                  uz: 'Oʻqish jarayonida har bir xatboshining vazifasini belgilash',
                },
                drill: {
                  en: 'Tag each paragraph (Theory, Counter-Evidence, Example) to nail final summary items.',
                  uz: 'Yakuniy xulosa savoli uchun har bir xatboshini (Nazariya, Dalil, Misol) deb belgilang.',
                },
                framework: 'Role-Tag Reading',
                estimatedMinutes: 55,
              },
              {
                id: 'toefl-s2',
                title: {
                  en: 'Drill Sentence Insertion & Reference cohesion',
                  uz: 'Jumla joylashtirish va ishora olmoshlari bogʻliqligi mashqi',
                },
                drill: {
                  en: 'Track demonstrative anchors ("this shift", "such resistance") across 20 items.',
                  uz: '20 ta testda koʻrsatish olmoshlari orqali aniq joylashuvni aniqlang.',
                },
                framework: 'Cohesion Anchor Match',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s3',
                title: {
                  en: 'Keep each 10-question passage strictly under 17 minutes',
                  uz: 'Har bir 10 savolli matnni 17 daqiqadan oshirmay ishlash',
                },
                drill: {
                  en: 'Complete two consecutive 10-question academic passages at target speed.',
                  uz: 'Ketma-ket ikkita 10 savolli akademik matnni belgilangan vaqtda yakunlang.',
                },
                framework: '17-Minute Passage Clock',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'toefl-listening',
            title: {
              en: 'Structured Lecture Note-Taking & Attitude Cues',
              uz: 'Tizimli maʼruza konspekti va munosabat ohanglari',
            },
            summary: {
              en: 'Capture professor transitions, examples, and tone shifts without transcribing.',
              uz: 'Hammasini yozishga urinmasdan, professor burilishlari, misollari va ohangini qayd etish.',
            },
            baselineHours: 14,
            difficulty: 'intermediate',
            keyFramework: 'Two-Column Lecture Skeleton',
            steps: [
              {
                id: 'toefl-s4',
                title: {
                  en: 'Use symbol shorthand for cause, contrast & examples',
                  uz: 'Sabab, ziddiyat va misollar uchun qisqa belgilar tizimi',
                },
                drill: {
                  en: 'Note 3 five-minute university lectures using only arrows, abbreviations, and keywords.',
                  uz: '3 ta 5 daqiqalik maʼruzani faqat strelkalar va kalit soʻzlar bilan konspekt qiling.',
                },
                framework: 'Symbol Shorthand Flow',
                estimatedMinutes: 50,
              },
              {
                id: 'toefl-s5',
                title: {
                  en: 'Catch professor attitude & function replay questions',
                  uz: 'Professor munosabati va qayta eshittiriluvchi savollarni tutish',
                },
                drill: {
                  en: 'Identify sarcasm, skepticism, and emphasis cues across 15 replay prompts.',
                  uz: '15 ta qayta eshittirish savolida kinoya, shubha va urgʻu ohanglarini ajrating.',
                },
                framework: 'Prosody & Intent Radar',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s6',
                title: {
                  en: 'Log Campus Conversation problem-solution arcs',
                  uz: 'Kampus suhbatlaridagi muammo va yechim yoyini qayd etish',
                },
                drill: {
                  en: 'Track student problem, advisor constraint, and agreed next step cleanly.',
                  uz: 'Talaba muammosi, maslahatchi sharti va kelishilgan yechimni aniq ajratib yozing.',
                },
                framework: 'Problem-Constraint-Action Grid',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'toefl-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Integrated Speaking & Academic Discussion Writing',
          uz: '2-bosqich · Integratsiyalashgan Speaking va akademik Writing',
        },
        objective: {
          en: 'Synthesize reading + audio cleanly inside 45–60s Speaking and 10–20m Writing limits.',
          uz: 'Matn va audioni 45–60 soniyalik Speaking hamda 10–20 daqiqalik Writing doirasida aniq sintezlash.',
        },
        modules: [
          {
            id: 'toefl-speaking',
            title: {
              en: 'Speaking Tasks 1–4 · Timed Synthesis Delivery',
              uz: 'Speaking 1–4-topshiriqlar · Vaqtli sintez nutqi',
            },
            summary: {
              en: 'Deliver smooth, zero-filler 45s and 60s responses with crisp time splits.',
              uz: 'Toʻxtalishsiz va aniq vaqt taqsimoti bilan 45 va 60 soniyalik ravon javoblar berish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: '15s-Context / 45s-Lecture Split',
            steps: [
              {
                id: 'toefl-s7',
                title: {
                  en: 'Lock Task 1 15s prep / 45s dual-reason frame',
                  uz: '1-topshiriq uchun 15 soniya tayyorgarlik / 45 soniya javob qolipi',
                },
                drill: {
                  en: 'Record 8 independent prompts with Stance (5s) + Reason/Example 1 (20s) + Reason 2 (20s).',
                  uz: '8 ta mustaqil mavzuda Pozitsiya + 2 ta aniq misol qolipida 45 soniyalik yozuvlar qiling.',
                },
                framework: '45-Second Balanced Frame',
                estimatedMinutes: 50,
              },
              {
                id: 'toefl-s8',
                title: {
                  en: 'Master Tasks 2 & 3 Reading-to-Listening integration',
                  uz: '2- va 3-topshiriqlarda matn va audio uygʻunligi',
                },
                drill: {
                  en: 'Spend max 12 seconds on reading summary and 48 seconds on speaker reasons/examples.',
                  uz: 'Matn xulosasiga koʻpi bilan 12 soniya, maʼruza misollariga esa 48 soniya ajrating.',
                },
                framework: '12/48 Weighting Rule',
                estimatedMinutes: 55,
              },
              {
                id: 'toefl-s9',
                title: {
                  en: 'Deliver crisp Task 4 two-example lecture recaps',
                  uz: '4-topshiriqda ikki misolli maʼruza bayonini aniq aytish',
                },
                drill: {
                  en: 'Record 6 academic lecture recaps connecting each example back to the main concept.',
                  uz: '6 ta maʼruza bayonida har bir misolni asosiy ilmiy tushunchaga bogʻlab tushuntiring.',
                },
                framework: 'Concept-Example-Link',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'toefl-writing',
            title: {
              en: 'Integrated Essay & 10-Minute Academic Discussion',
              uz: 'Integratsiyalashgan insho va 10 daqiqalik akademik muhokama',
            },
            summary: {
              en: 'Contrast 3 reading points against lecture rebuttals and write sharp discussion posts.',
              uz: 'Matndagi 3 ta daʼvoni maʼruza raddiyalari bilan solishtirib, oʻtkir muhokama posti yozish.',
            },
            baselineHours: 14,
            difficulty: 'executive',
            keyFramework: '3-Point Contrast Matrix + Discussion Value-Add',
            steps: [
              {
                id: 'toefl-s10',
                title: {
                  en: 'Map 3 reading claims directly to 3 lecture challenges',
                  uz: '3 ta matn daʼvosini 3 ta maʼruza raddiyasiga juftlash',
                },
                drill: {
                  en: 'Write 2 full 280-word Integrated Essays in 20 minutes focusing on lecturer precision.',
                  uz: '20 daqiqa ichida maʼruzachi dalillariga urgʻu berilgan 2 ta 280 soʻzlik insho yozing.',
                },
                framework: 'Point-by-Point Rebuttal Grid',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s11',
                title: {
                  en: 'Master the 10-minute Academic Discussion post',
                  uz: '10 daqiqalik Akademik muhokama postini mukammallashtirish',
                },
                drill: {
                  en: 'Write 130–160 words engaging one student’s idea while introducing one fresh dimension.',
                  uz: 'Bitta talaba fikriga munosabat bildirib, yangi nuqtai nazar qoʻshuvchi 140 soʻzlik post yozing.',
                },
                framework: 'Engage-Extend-Conclude 10m',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s12',
                title: {
                  en: 'Reserve 90 seconds for automated grammar redlining',
                  uz: 'Soʻnggi 90 soniyani grammatik tekshiruvga ajratish',
                },
                drill: {
                  en: 'Scan specifically for verb tense consistency, reporting verbs, and punctuation.',
                  uz: 'Zamon mosligi, koʻchirma feʼllari va tinish belgilarini maqsadli tekshiring.',
                },
                framework: '90-Second Final Sweep',
                estimatedMinutes: 35,
              },
            ],
          },
        ],
      },
      {
        id: 'toefl-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Full 2-Hour TOEFL Simulations',
          uz: '3-bosqich · Toʻliq 2 soatlik TOEFL simulyatsiyalari',
        },
        objective: {
          en: 'Validate 110+ consistency under real computer-test pacing.',
          uz: 'Haqiqiy kompyuter testi tempida 110+ natijaning barqarorligini tasdiqlash.',
        },
        modules: [
          {
            id: 'toefl-mocks',
            title: {
              en: 'Timed Full-Length Practice & Bottleneck Patching',
              uz: 'Toʻliq vaqtli sinov va nozik nuqtalarni tuzatish',
            },
            summary: {
              en: 'Run back-to-back 2-hour mocks and refine Speaking delivery fluency.',
              uz: '2 soatlik toʻliq sinovlarni oʻtkazib, Speaking ravonligini sayqallash.',
            },
            baselineHours: 10,
            difficulty: 'executive',
            keyFramework: 'Full-Cycle Calibration',
            steps: [
              {
                id: 'toefl-s13',
                title: {
                  en: 'Complete full 2-hour timed mock exam',
                  uz: 'Toʻliq 2 soatlik vaqtli sinov imtihonini topshirish',
                },
                drill: {
                  en: 'Simulate headset conditions and strict 15s Speaking prep intervals.',
                  uz: 'Quloqchin va qatʼiy 15 soniyalik Speaking tayyorgarlik rejimida topshiring.',
                },
                framework: 'Test-Day Simulation',
                estimatedMinutes: 120,
              },
              {
                id: 'toefl-s14',
                title: {
                  en: 'Transcribe and polish 2 weakest Speaking recordings',
                  uz: 'Eng zaif 2 ta Speaking yozuvini matnga tushirib qayta sayqallash',
                },
                drill: {
                  en: 'Cut filler words and re-record until delivery sounds crisp and unhurried.',
                  uz: 'Ortiqcha pauza va parazit soʻzlarni olib tashlab, bosiq ohangda qayta yozing.',
                },
                framework: 'Audio Redo Calibration',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s15',
                title: {
                  en: 'Lock final test-day checklist & transition cues',
                  uz: 'Imtihon kuni nazorat roʻyxati va tayanch iboralarni mustahkamlash',
                },
                drill: {
                  en: 'Review personal shorthand key and high-yield academic reporting verbs.',
                  uz: 'Shaxsiy konspekt belgilari va akademik bayon feʼllarini qayta koʻrib chiqing.',
                },
                framework: 'Pre-Flight Readiness Sheet',
                estimatedMinutes: 35,
              },
            ],
          },
        ],
      },
    ],
  },
];
