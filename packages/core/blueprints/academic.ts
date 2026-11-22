import type { Blueprint } from '../schemas';

/*
  Academic English exam curricula. Every format fact below was checked against the official pages
  listed in each blueprint's `sources` on the `lastVerified` date. Drills point to official free or
  partner materials by name; no test content is reproduced here.
*/
export const ACADEMIC_BLUEPRINTS: Blueprint[] = [
  {
    id: 'ielts-academic',
    category: 'academic',
    code: 'IELTS-AC',
    title: {
      en: 'IELTS Academic: a plan for your next band',
      uz: 'IELTS Academic: keyingi Band uchun reja',
    },
    subtitle: {
      en: 'All four sections of the computer-delivered test: Listening, Reading, Writing Task 1 and 2, and the three-part Speaking interview.',
      uz: 'Kompyuterda topshiriladigan testning toʻrt boʻlimi: Listening, Reading, Writing Task 1 va 2 hamda uch qismli Speaking suhbati.',
    },
    archetypeLabel: {
      en: 'Academic English',
      uz: 'Akademik ingliz tili',
    },
    recommendedWeeks: 12,
    baselineTotalHours: 120,
    examVersion: 'IELTS Academic — current format (on computer, Writing on Paper option)',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'IELTS Academic test format and sections (ielts.org)', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test' },
      { label: 'IELTS Academic: Listening test format', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening' },
      { label: 'IELTS Academic: Reading test format', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading' },
      { label: 'IELTS Academic: Writing test format', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing' },
      { label: 'IELTS Academic: Speaking test format', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking' },
      { label: 'IELTS scoring in detail', url: 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail' },
      { label: 'IELTS Academic sample test questions', url: 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test' },
      { label: 'Updates to IELTS Writing test delivery mode (Writing on Paper)', url: 'https://ielts.org/organisations/ielts-for-organisations/test-types/ways-to-take-ielts/updates-to-ielts-writing-test-delivery-mode' },
    ],
    phases: [
      {
        id: 'ielts-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose, then fix Listening and Reading',
          uz: '1-bosqich · Diagnostika, soʻng Listening va Reading',
        },
        objective: {
          en: 'Measure your starting band in all four sections, then remove the Listening and Reading errors that cost the most marks.',
          uz: 'Toʻrt boʻlim boʻyicha boshlangʻich Bandni aniqlash, soʻng Listening va Reading boʻlimlarida eng koʻp ball olib ketayotgan xatolarni yoʻqotish.',
        },
        modules: [
          {
            id: 'ielts-diagnostic',
            title: {
              en: 'Baseline test and the band criteria',
              uz: 'Boshlangʻich test va baholash mezonlari',
            },
            summary: {
              en: 'Sit a timed baseline in every section, learn how each one is marked, and set a target band per section.',
              uz: 'Har bir boʻlim boʻyicha vaqtli boshlangʻich test, har boʻlim qanday baholanishini oʻrganish va boʻlimlar uchun Band maqsadini qoʻyish.',
            },
            baselineHours: 12,
            difficulty: 'foundational',
            keyFramework: 'Baseline and error log',
            steps: [
              {
                id: 'ielts-s19',
                title: {
                  en: 'Timed baseline: Listening and Reading',
                  uz: 'Vaqtli boshlangʻich test: Listening va Reading',
                },
                drill: {
                  en: 'On screen, do one full official Listening test (about 30 min, 4 parts, 40 questions) and one Academic Reading test (60 min, 3 passages, 40 questions). Mark both and note the raw score out of 40.',
                  uz: 'Ekranda bitta toʻliq rasmiy Listening testi (taxminan 30 daqiqa, 4 qism, 40 savol) va bitta Academic Reading testini (60 daqiqa, 3 matn, 40 savol) ishlang. Ikkalasini tekshirib, 40 tadan toʻgʻri javoblar sonini yozing.',
                },
                framework: 'Baseline test',
                estimatedMinutes: 100,
              },
              {
                id: 'ielts-s20',
                title: {
                  en: 'Timed baseline: Writing and Speaking',
                  uz: 'Vaqtli boshlangʻich test: Writing va Speaking',
                },
                drill: {
                  en: 'Write one Task 1 (150+ words, 20 min) and one Task 2 (250+ words, 40 min). Record a mock Speaking test: Part 1 (4–5 min), Part 2 (1 min to prepare, 2 min talk), Part 3 (4–5 min).',
                  uz: 'Bitta Task 1 (150+ soʻz, 20 daqiqa) va bitta Task 2 (250+ soʻz, 40 daqiqa) yozing. Sinov Speaking testini yozib oling: Part 1 (4–5 daqiqa), Part 2 (1 daqiqa tayyorgarlik, 2 daqiqa nutq), Part 3 (4–5 daqiqa).',
                },
                framework: 'Baseline test',
                estimatedMinutes: 90,
              },
              {
                id: 'ielts-s21',
                title: {
                  en: 'Score yourself with the public band descriptors',
                  uz: 'Ochiq band descriptorlar bilan oʻzingizni baholash',
                },
                drill: {
                  en: 'Read the public Writing and Speaking band descriptors. Give your baseline essays a band on each of the four Writing criteria and your recording a band on each of the four Speaking criteria, with one reason per band.',
                  uz: 'Writing va Speaking uchun ochiq band descriptorlarni oʻqing. Boshlangʻich insholaringizga toʻrtta Writing mezoni, yozuvingizga esa toʻrtta Speaking mezoni boʻyicha Band qoʻying va har biriga bitta sabab yozing.',
                },
                framework: 'Four-criteria check',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s22',
                title: {
                  en: 'Set section targets and start an error log',
                  uz: 'Boʻlim maqsadlari va xatolar daftarini boshlash',
                },
                drill: {
                  en: 'Write a target band for each section; the overall band is the average of the four, rounded to the nearest half band. Start an error log with columns: section, question type, cause, fix.',
                  uz: 'Har bir boʻlim uchun maqsad Bandni yozing; umumiy Band toʻrt boʻlimning oʻrtachasi boʻlib, eng yaqin yarim Bandga yaxlitlanadi. Xatolar daftarini oching: boʻlim, savol turi, sabab, tuzatish.',
                },
                framework: 'Error log',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'ielts-listening-basics',
            title: {
              en: 'Listening · four parts, 40 questions',
              uz: 'Listening · 4 qism, 40 savol',
            },
            summary: {
              en: 'Answers come in recording order and you hear each recording once. Keep to word limits and handle the academic Parts 3 and 4.',
              uz: 'Javoblar yozuvdagi tartibda keladi va har bir yozuv faqat bir marta eshittiriladi. Soʻz chegarasiga rioya qilish va akademik 3–4-qismlarni oʻzlashtirish.',
            },
            baselineHours: 16,
            difficulty: 'foundational',
            keyFramework: 'Predict, listen, check',
            steps: [
              {
                id: 'ielts-s1',
                title: {
                  en: 'Predict answers before the audio starts',
                  uz: 'Audio boshlanishidan oldin javobni taxmin qilish',
                },
                drill: {
                  en: 'For 4 official Listening parts, use the reading time to mark the word limit and the kind of answer each gap needs (noun, number, name, date). Count how many predictions matched.',
                  uz: '4 ta rasmiy Listening qismida oʻqish vaqtidan foydalanib, soʻz chegarasini va har bir boʻshliqqa qanday javob kerakligini (ot, son, ism, sana) belgilang. Nechta taxmin toʻgʻri chiqqanini sanang.',
                },
                framework: 'Gap prediction',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s23',
                title: {
                  en: 'Maps, plans and diagram labelling',
                  uz: 'Xarita, reja va diagrammalarni belgilash',
                },
                drill: {
                  en: 'Complete 3 plan, map or diagram labelling tasks from official practice material. Before each, find the starting point; afterwards, log every direction word you missed.',
                  uz: 'Rasmiy mashq materialidan 3 ta reja, xarita yoki diagramma belgilash topshirigʻini bajaring. Har biridan oldin boshlangʻich nuqtani toping, keyin oʻtkazib yuborgan har bir yoʻnalish soʻzini yozib qoʻying.',
                },
                framework: 'Direction cues',
                estimatedMinutes: 45,
              },
              {
                id: 'ielts-s2',
                title: {
                  en: 'Parts 3 and 4: catch changed information',
                  uz: '3 va 4-qismlar: oʻzgartirilgan maʼlumotni ilgʻash',
                },
                drill: {
                  en: 'Do two Part 3 and two Part 4 recordings. For every wrong answer, find the line in the transcript where a speaker corrected or changed the information, and log it.',
                  uz: 'Ikkita Part 3 va ikkita Part 4 yozuvini ishlang. Har bir notoʻgʻri javob uchun transkriptda soʻzlovchi maʼlumotni tuzatgan yoki oʻzgartirgan qatorni toping va daftarga yozing.',
                },
                framework: 'Transcript check',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s3',
                title: {
                  en: 'Spelling, numbers and word limits',
                  uz: 'Imlo, raqamlar va soʻz chegarasi',
                },
                drill: {
                  en: 'Build a 60-word list of words you misspelled or missed (names, dates, places, academic terms). Dictate it to yourself twice; aim for zero errors on the second pass.',
                  uz: 'Notoʻgʻri yozgan yoki oʻtkazib yuborgan 60 ta soʻzdan roʻyxat tuzing (ismlar, sanalar, joylar, akademik atamalar). Uni oʻzingizga ikki marta diktant qiling; ikkinchi safar xato boʻlmasin.',
                },
                framework: 'Spelling list',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'ielts-reading-tfng',
            title: {
              en: 'Academic Reading · 3 passages in 60 minutes',
              uz: 'Academic Reading · 60 daqiqada 3 ta matn',
            },
            summary: {
              en: 'Separate False from Not Given, match headings to main ideas, and finish three passages (2,150–2,750 words in total) in time.',
              uz: 'False va Not Given farqini ajratish, sarlavhalarni asosiy gʻoyaga moslash va jami 2150–2750 soʻzli uch matnni vaqtida tugatish.',
            },
            baselineHours: 18,
            difficulty: 'intermediate',
            keyFramework: 'Locate, compare, decide',
            steps: [
              {
                id: 'ielts-s4',
                title: {
                  en: 'True / False / Not Given and Yes / No / Not Given',
                  uz: 'True / False / Not Given va Yes / No / Not Given',
                },
                drill: {
                  en: 'Answer 30 TFNG and YNNG statements. For each, copy the sentence that agrees or contradicts; if there is none, write why it is Not Given. Target: 26 of 30.',
                  uz: '30 ta TFNG va YNNG gapiga javob bering. Har biri uchun mos keladigan yoki zid boʻlgan jumlani koʻchirib yozing; bunday jumla boʻlmasa, nega Not Given ekanini yozing. Maqsad: 30 tadan 26 ta.',
                },
                framework: 'Contradiction or silence',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s24',
                title: {
                  en: 'Matching headings',
                  uz: 'Sarlavhalarni moslashtirish',
                },
                drill: {
                  en: 'Do 3 matching-headings sets. Write a five-word main idea for each paragraph before you look at the list, then check which wrong heading matched only a detail.',
                  uz: '3 ta matching headings topshirigʻini bajaring. Roʻyxatga qarashdan oldin har bir xatboshining asosiy gʻoyasini besh soʻzda yozing, keyin qaysi notoʻgʻri sarlavha faqat detalga mos kelganini tekshiring.',
                },
                framework: 'Main idea first',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s6',
                title: {
                  en: 'Build a paraphrase bank',
                  uz: 'Parafrazalar bankini yaratish',
                },
                drill: {
                  en: 'From two passages you have finished, collect 30 pairs of question wording and passage wording that mean the same. Review the list before your next Reading test.',
                  uz: 'Ishlab boʻlgan ikki matndan savoldagi va matndagi bir xil maʼnoli 30 juft ifodani yigʻing. Keyingi Reading testidan oldin roʻyxatni takrorlang.',
                },
                framework: 'Paraphrase bank',
                estimatedMinutes: 40,
              },
              {
                id: 'ielts-s5',
                title: {
                  en: 'Pace a full Reading test',
                  uz: 'Toʻliq Reading testida vaqtni taqsimlash',
                },
                drill: {
                  en: 'Do one full Academic Reading test in 60 minutes and note the clock when you finish each passage. Compare accuracy per passage with your baseline and adjust your split.',
                  uz: 'Bitta toʻliq Academic Reading testini 60 daqiqada ishlang va har bir matnni tugatgan vaqtni yozing. Har bir matn boʻyicha natijani boshlangʻich test bilan solishtiring va vaqt taqsimotini tuzating.',
                },
                framework: 'Passage pacing',
                estimatedMinutes: 70,
              },
            ],
          },
        ],
      },
      {
        id: 'ielts-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build Writing and Speaking',
          uz: '2-bosqich · Writing va Speaking koʻnikmalari',
        },
        objective: {
          en: 'Write both tasks to the four public criteria and speak at length in all three parts without memorised scripts.',
          uz: 'Ikkala Writing topshirigʻini toʻrtta ochiq mezon asosida yozish va Speaking’ning uch qismida yodlangan matnsiz uzoq gapira olish.',
        },
        modules: [
          {
            id: 'ielts-w1-synthesis',
            title: {
              en: 'Writing Task 1 · graphs, tables, maps and processes',
              uz: 'Writing Task 1 · grafik, jadval, xarita va jarayonlar',
            },
            summary: {
              en: 'At least 150 words in about 20 minutes: a clear overview, grouped key features, and accurate figures and comparisons.',
              uz: 'Taxminan 20 daqiqada kamida 150 soʻz: aniq overview, guruhlangan asosiy belgilar, toʻgʻri raqam va taqqoslashlar.',
            },
            baselineHours: 14,
            difficulty: 'intermediate',
            keyFramework: 'Overview first',
            steps: [
              {
                id: 'ielts-s10',
                title: {
                  en: 'Write the overview first',
                  uz: 'Avval overview yozish',
                },
                drill: {
                  en: 'For 6 Task 1 visuals (line, bar, table, pie, map, process), write only the overview: two sentences naming the main trends or stages, with no figures. Check each against Task achievement.',
                  uz: '6 ta Task 1 vizuali (chiziqli, ustunli, jadval, doiraviy, xarita, jarayon) uchun faqat overview yozing: asosiy tendensiya yoki bosqichlarni aytuvchi, raqamsiz ikki jumla. Har birini Task achievement mezoni bilan tekshiring.',
                },
                framework: 'Overview sentence',
                estimatedMinutes: 45,
              },
              {
                id: 'ielts-s11',
                title: {
                  en: 'Group and compare the data',
                  uz: 'Maʼlumotlarni guruhlash va taqqoslash',
                },
                drill: {
                  en: 'Write 2 full Task 1 reports on charts or tables, 20 minutes each. Each body paragraph groups related features and makes at least two accurate comparisons.',
                  uz: 'Diagramma yoki jadval boʻyicha 2 ta toʻliq Task 1 hisobotini har biri 20 daqiqada yozing. Har bir asosiy xatboshi bogʻliq belgilarni guruhlasin va kamida ikkita toʻgʻri taqqoslash qilsin.',
                },
                framework: 'Grouped comparisons',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s12',
                title: {
                  en: 'Maps and processes',
                  uz: 'Xarita va jarayonlar',
                },
                drill: {
                  en: 'Write one map report and one process report, 20 minutes each, using passive forms and sequence words. Score both on the four criteria and note one fix per criterion.',
                  uz: 'Bitta xarita va bitta jarayon hisobotini har biri 20 daqiqada, passiv shakllar va ketma-ketlik soʻzlari bilan yozing. Ikkalasini toʻrt mezon boʻyicha baholang va har bir mezonga bitta tuzatish yozing.',
                },
                framework: 'Sequence and passive',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s25',
                title: {
                  en: 'Accuracy pass on Task 1',
                  uz: 'Task 1 boʻyicha aniqlik tekshiruvi',
                },
                drill: {
                  en: 'Rewrite your weakest Task 1 report after checking every figure, tense and comparative form. Count errors before and after; aim to halve them.',
                  uz: 'Eng zaif Task 1 hisobotingizdagi har bir raqam, zamon va qiyosiy shaklni tekshirib, uni qayta yozing. Oldin va keyingi xatolarni sanang; ularni ikki baravar kamaytirishga intiling.',
                },
                framework: 'Error count',
                estimatedMinutes: 35,
              },
            ],
          },
          {
            id: 'ielts-w2-cohesion',
            title: {
              en: 'Writing Task 2 · a clear position, fully developed',
              uz: 'Writing Task 2 · aniq pozitsiya va toʻliq rivojlangan fikr',
            },
            summary: {
              en: 'At least 250 words in about 40 minutes. Task 2 counts twice as much as Task 1, so build a relevant, well-supported argument.',
              uz: 'Taxminan 40 daqiqada kamida 250 soʻz. Task 2 Task 1 dan ikki baravar koʻp hisoblanadi, shuning uchun mavzuga mos va yaxshi asoslangan argument quriladi.',
            },
            baselineHours: 22,
            difficulty: 'executive',
            keyFramework: 'Plan, argue, check',
            steps: [
              {
                id: 'ielts-s7',
                title: {
                  en: 'Plan an essay in 5 minutes',
                  uz: 'Inshoni 5 daqiqada rejalashtirish',
                },
                drill: {
                  en: 'Plan 6 Task 2 prompts of different kinds (opinion, discussion, problem and solution, two-part question): answer every part of the question, one main idea per body paragraph, one example each.',
                  uz: 'Har xil turdagi 6 ta Task 2 savoliga reja tuzing (fikr, muhokama, muammo va yechim, ikki qismli savol): savolning har bir qismiga javob, har bir asosiy xatboshida bitta gʻoya va bitta misol boʻlsin.',
                },
                framework: '5-minute plan',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s8',
                title: {
                  en: 'Develop body paragraphs',
                  uz: 'Asosiy xatboshilarni rivojlantirish',
                },
                drill: {
                  en: 'Write 4 body paragraphs: claim, explanation, example, link back to the question. Highlight any sentence that does not move the argument forward and rewrite it.',
                  uz: '4 ta asosiy xatboshi yozing: daʼvo, izoh, misol, savolga qaytish. Argumentni oldinga siljitmaydigan har bir jumlani belgilab, qayta yozing.',
                },
                framework: 'Claim, explain, example',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s9',
                title: {
                  en: 'Cohesion without stacking linkers',
                  uz: 'Bogʻlovchilarni toʻplamasdan bogʻliqlik',
                },
                drill: {
                  en: 'Rewrite one essay, replacing repeated linking words with reference words (this, these, such) and a clearer paragraph order. Compare both versions on Coherence and cohesion.',
                  uz: 'Bitta inshoni qayta yozing: takrorlangan bogʻlovchilar oʻrniga koʻrsatish soʻzlari (this, these, such) va aniqroq xatboshi tartibini ishlating. Ikki variantni Coherence and cohesion mezoni boʻyicha solishtiring.',
                },
                framework: 'Reference and order',
                estimatedMinutes: 45,
              },
              {
                id: 'ielts-s26',
                title: {
                  en: 'Two timed essays, scored on the criteria',
                  uz: 'Ikkita vaqtli insho va mezonlar boʻyicha baholash',
                },
                drill: {
                  en: 'Write two Task 2 essays in 40 minutes each and score them against the four public band-descriptor criteria. Log your three most frequent grammar or vocabulary errors.',
                  uz: 'Ikkita Task 2 inshosini har biri 40 daqiqada yozing va ularni ochiq band descriptorlarning toʻrt mezoni boʻyicha baholang. Eng koʻp takrorlanadigan uchta grammatika yoki leksika xatoingizni yozib qoʻying.',
                },
                framework: 'Timed essay',
                estimatedMinutes: 90,
              },
              {
                id: 'ielts-s27',
                title: {
                  en: 'Fix and rewrite your weakest essay',
                  uz: 'Eng zaif inshoni tuzatib, qayta yozish',
                },
                drill: {
                  en: 'Take your lowest-scoring essay, correct every logged error, and rewrite it in 40 minutes. Re-score it and record the change on each criterion.',
                  uz: 'Eng past baholangan inshoingizni oling, daftardagi barcha xatolarni tuzating va uni 40 daqiqada qayta yozing. Qayta baholab, har bir mezondagi oʻzgarishni yozing.',
                },
                framework: 'Rewrite and re-score',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'ielts-speaking-p3',
            title: {
              en: 'Speaking · Parts 1, 2 and 3',
              uz: 'Speaking · 1, 2 va 3-qismlar',
            },
            summary: {
              en: 'An 11–14 minute face-to-face interview: short answers on familiar topics, a 2-minute talk, then a deeper discussion of the same theme.',
              uz: 'Imtihonchi bilan 11–14 daqiqalik yuzma-yuz suhbat: tanish mavzularda qisqa javoblar, 2 daqiqalik nutq, soʻng shu mavzuda chuqurroq muhokama.',
            },
            baselineHours: 22,
            difficulty: 'intermediate',
            keyFramework: 'Answer, extend, example',
            steps: [
              {
                id: 'ielts-s13',
                title: {
                  en: 'Part 1: natural, extended answers',
                  uz: 'Part 1: tabiiy va kengaytirilgan javoblar',
                },
                drill: {
                  en: 'Record answers to 20 Part 1 questions (home, work, studies, interests): 2–3 sentences each with a reason or example. Replay and replace any phrase that sounds memorised.',
                  uz: '20 ta Part 1 savoliga (uy, ish, oʻqish, qiziqishlar) javobni yozib oling: har biri sabab yoki misol bilan 2–3 jumla. Qayta tinglab, yodlanganga oʻxshagan iboralarni almashtiring.',
                },
                framework: 'Answer plus reason',
                estimatedMinutes: 40,
              },
              {
                id: 'ielts-s14',
                title: {
                  en: 'Part 2: the full two-minute talk',
                  uz: 'Part 2: toʻliq ikki daqiqalik nutq',
                },
                drill: {
                  en: 'Do 6 cue cards: 1 minute of notes, then speak for the full 2 minutes. Time each talk and note where you stopped or repeated yourself.',
                  uz: '6 ta cue card ishlang: 1 daqiqa qayd yozing, soʻng toʻliq 2 daqiqa gapiring. Har bir nutqni vaqtga oling va qayerda toʻxtab qolganingiz yoki takrorlaganingizni yozing.',
                },
                framework: 'One-minute notes',
                estimatedMinutes: 50,
              },
              {
                id: 'ielts-s15',
                title: {
                  en: 'Part 3: explain, compare, speculate',
                  uz: 'Part 3: tushuntirish, taqqoslash, taxmin qilish',
                },
                drill: {
                  en: 'Answer 12 abstract Part 3 questions: give a view, explain why, then compare or speculate. Record and transcribe two answers to check your range of grammar.',
                  uz: '12 ta mavhum Part 3 savoliga javob bering: fikr bildiring, sababini tushuntiring, soʻng taqqoslang yoki taxmin qiling. Ikki javobni yozib olib, matnga oʻgiring va grammatik xilma-xillikni tekshiring.',
                },
                framework: 'View, reason, compare',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s28',
                title: {
                  en: 'Self-score two full Speaking tests',
                  uz: 'Ikkita toʻliq Speaking testini oʻzingiz baholash',
                },
                drill: {
                  en: 'Record two full Speaking tests and score each on Fluency and coherence, Lexical resource, Grammatical range and accuracy, and Pronunciation. Choose one fix per criterion.',
                  uz: 'Ikkita toʻliq Speaking testini yozib oling va har birini Fluency and coherence, Lexical resource, Grammatical range and accuracy hamda Pronunciation mezonlari boʻyicha baholang. Har bir mezonga bitta tuzatish tanlang.',
                },
                framework: 'Four-criteria check',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'ielts-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Timed full tests',
          uz: '3-bosqich · Vaqtli toʻliq testlar',
        },
        objective: {
          en: 'Take complete tests under exam timing, review every error, and make your section bands stable.',
          uz: 'Imtihon vaqtida toʻliq testlar ishlash, har bir xatoni tahlil qilish va boʻlimlar boʻyicha Bandni barqarorlashtirish.',
        },
        modules: [
          {
            id: 'ielts-full-mocks',
            title: {
              en: 'Full mock tests on computer',
              uz: 'Kompyuterda toʻliq sinov testlari',
            },
            summary: {
              en: 'Two mocks in test conditions, each followed by an error review sorted by cause.',
              uz: 'Imtihon sharoitida ikki sinov testi va har biridan keyin xatolarni sabablari boʻyicha tahlil qilish.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Mock, review, retest',
            steps: [
              {
                id: 'ielts-s16',
                title: {
                  en: 'Mock 1: Listening and Reading',
                  uz: '1-sinov: Listening va Reading',
                },
                drill: {
                  en: 'Sit an official Listening test and an Academic Reading test back to back on screen with no pauses (about 90 minutes). Mark both and log errors by question type.',
                  uz: 'Rasmiy Listening va Academic Reading testlarini ekranda tanaffussiz ketma-ket ishlang (taxminan 90 daqiqa). Ikkalasini tekshirib, xatolarni savol turi boʻyicha yozing.',
                },
                framework: 'Timed mock',
                estimatedMinutes: 100,
              },
              {
                id: 'ielts-s17',
                title: {
                  en: 'Mock 1: Writing and Speaking',
                  uz: '1-sinov: Writing va Speaking',
                },
                drill: {
                  en: 'Do Task 1 and Task 2 in one 60-minute block (typed, or by hand if you chose Writing on Paper), then record a full Speaking test. Score both on the public criteria.',
                  uz: 'Task 1 va Task 2 ni bitta 60 daqiqalik blokda bajaring (kompyuterda yoki Writing on Paper tanlagan boʻlsangiz, qoʻlda), soʻng toʻliq Speaking testini yozib oling. Ikkalasini ochiq mezonlar boʻyicha baholang.',
                },
                framework: 'Timed mock',
                estimatedMinutes: 100,
              },
              {
                id: 'ielts-s18',
                title: {
                  en: 'Review every mock error',
                  uz: 'Sinovdagi har bir xatoni tahlil qilish',
                },
                drill: {
                  en: 'Sort every mock error into vocabulary, misread question, timing, word limit or grammar. Spend 30 minutes of targeted practice on the largest group.',
                  uz: 'Sinovdagi har bir xatoni leksika, savolni notoʻgʻri oʻqish, vaqt, soʻz chegarasi yoki grammatika guruhiga ajrating. Eng katta guruhga 30 daqiqa maqsadli mashq qiling.',
                },
                framework: 'Error sort',
                estimatedMinutes: 60,
              },
              {
                id: 'ielts-s29',
                title: {
                  en: 'Mock 2 and comparison with your targets',
                  uz: '2-sinov va maqsadlar bilan solishtirish',
                },
                drill: {
                  en: 'Sit a second Listening and Reading mock under exam timing and compare each section with Mock 1 and your targets. If a centre near you offers the free IELTS Trial Test, book it.',
                  uz: 'Ikkinchi Listening va Reading sinovini imtihon vaqtida ishlang va har bir boʻlimni 1-sinov hamda maqsadlaringiz bilan solishtiring. Yaqin markazda bepul IELTS Trial Test boʻlsa, unga yoziling.',
                },
                framework: 'Retest',
                estimatedMinutes: 100,
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
      en: 'Digital SAT: Reading and Writing plus Math on Bluebook',
      uz: 'Digital SAT: Bluebook orqali Reading and Writing va Math',
    },
    subtitle: {
      en: 'Two adaptive sections of two modules each: 98 questions in 2 h 14 min, scored 400–1600. Built on Bluebook practice tests and Khan Academy.',
      uz: 'Har biri ikki moduldan iborat ikki adaptiv boʻlim: 2 soat 14 daqiqada 98 savol, 400–1600 ball. Bluebook testlari va Khan Academy asosida.',
    },
    archetypeLabel: {
      en: 'Undergraduate Admissions',
      uz: 'Xalqaro universitet qabuli',
    },
    recommendedWeeks: 10,
    baselineTotalHours: 100,
    examVersion: 'Digital SAT (Bluebook, multistage adaptive)',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'How the SAT Is Structured (College Board)', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/structure' },
      { label: 'The SAT Reading and Writing Section', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing' },
      { label: 'The SAT Math Section: Overview', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview' },
      { label: 'SAT Math: Student-Produced Responses', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/student-produced' },
      { label: 'SAT Suite Calculator Policy', url: 'https://satsuite.collegeboard.org/in-school-assessments/calculator-policy' },
      { label: 'What Do My SAT Suite Scores Mean?', url: 'https://satsuite.collegeboard.org/scores/what-scores-mean' },
      { label: 'Full-Length Digital Practice Tests on Bluebook', url: 'https://satsuite.collegeboard.org/practice/practice-tests/bluebook' },
      { label: 'How to Use Khan Academy (Official SAT Prep)', url: 'https://satsuite.collegeboard.org/practice/khan-academy' },
    ],
    phases: [
      {
        id: 'sat-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose, then fix the grammar rules',
          uz: '1-bosqich · Diagnostika, soʻng grammatika qoidalari',
        },
        objective: {
          en: 'Find your starting score and weakest content domains, then secure the rule-based Reading and Writing questions.',
          uz: 'Boshlangʻich ball va eng zaif content domainlarni aniqlash, soʻng qoidaga asoslangan Reading and Writing savollarini mustahkamlash.',
        },
        modules: [
          {
            id: 'sat-diagnostic',
            title: {
              en: 'Bluebook baseline test',
              uz: 'Bluebook boshlangʻich testi',
            },
            summary: {
              en: 'Take a full adaptive practice test, read the content-domain breakdown, and pick the domains to work on first.',
              uz: 'Toʻliq adaptiv mashq testini topshirish, content domainlar boʻyicha natijani oʻqish va birinchi navbatda ishlanadigan domainlarni tanlash.',
            },
            baselineHours: 10,
            difficulty: 'foundational',
            keyFramework: 'Baseline and error log',
            steps: [
              {
                id: 'sat-s16',
                title: {
                  en: 'Baseline: Reading and Writing section',
                  uz: 'Boshlangʻich test: Reading and Writing boʻlimi',
                },
                drill: {
                  en: 'Start a full-length practice test in Bluebook and do the Reading and Writing section under timing: two 32-minute modules, 54 questions. Pause the test when the section ends.',
                  uz: 'Bluebook’da toʻliq mashq testini boshlang va Reading and Writing boʻlimini vaqt bilan ishlang: ikki 32 daqiqalik modul, 54 savol. Boʻlim tugagach, testni pauza qiling.',
                },
                framework: 'Baseline test',
                estimatedMinutes: 70,
              },
              {
                id: 'sat-s17',
                title: {
                  en: 'Baseline: Math section',
                  uz: 'Boshlangʻich test: Math boʻlimi',
                },
                drill: {
                  en: 'Resume the same test and do Math: two 35-minute modules, 44 questions, with the built-in Desmos calculator or an approved non-CAS handheld one. Then view your score in My Practice.',
                  uz: 'Oʻsha testni davom ettirib, Math boʻlimini ishlang: ikki 35 daqiqalik modul, 44 savol; ichki Desmos kalkulyatori yoki ruxsat etilgan CAS’siz kalkulyatordan foydalaning. Soʻng My Practice’da natijani koʻring.',
                },
                framework: 'Baseline test',
                estimatedMinutes: 80,
              },
              {
                id: 'sat-s18',
                title: {
                  en: 'Read your content-domain results',
                  uz: 'Content domain natijalarini oʻqish',
                },
                drill: {
                  en: 'List your result in each of the eight content domains (four per section). Mark the two weakest per section and count how many questions you missed in each.',
                  uz: 'Sakkizta content domain (har boʻlimda toʻrttadan) boʻyicha natijangizni yozing. Har bir boʻlimdagi eng zaif ikkitasini belgilang va har birida nechta savolni xato qilganingizni sanang.',
                },
                framework: 'Domain map',
                estimatedMinutes: 40,
              },
              {
                id: 'sat-s19',
                title: {
                  en: 'Khan Academy Course Challenge and an error log',
                  uz: 'Khan Academy Course Challenge va xatolar daftari',
                },
                drill: {
                  en: 'Take the Course Challenge in Official SAT Prep on Khan Academy for your weaker section. Start an error log: question, domain, skill, why you missed it, rule or method to remember.',
                  uz: 'Khan Academy’dagi Official SAT Prep kursida zaifroq boʻlimingiz uchun Course Challenge’ni topshiring. Xatolar daftarini oching: savol, domain, koʻnikma, xato sababi, eslab qolish kerak boʻlgan qoida yoki usul.',
                },
                framework: 'Error log',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'sat-conventions',
            title: {
              en: 'Standard English Conventions and Expression of Ideas',
              uz: 'Standard English Conventions va Expression of Ideas',
            },
            summary: {
              en: 'Punctuation between clauses, verb and pronoun forms, agreement, and revising a text to meet a stated goal: questions that reward exact rules.',
              uz: 'Gap qismlari orasidagi tinish belgilari, feʼl va olmosh shakllari, moslashuv hamda matnni berilgan maqsadga moslab tahrirlash: aniq qoidani talab qiladigan savollar.',
            },
            baselineHours: 14,
            difficulty: 'foundational',
            keyFramework: 'Rule, example, test',
            steps: [
              {
                id: 'sat-s1',
                title: {
                  en: 'Sentence boundaries and punctuation',
                  uz: 'Gap chegaralari va tinish belgilari',
                },
                drill: {
                  en: 'Learn when to use a period, semicolon, colon, dash or comma between clauses. Do 25 such questions from the Student Question Bank; target 22 of 25 and log each miss with its rule.',
                  uz: 'Gap qismlari orasida nuqta, nuqtali vergul, ikki nuqta, tire yoki vergul qachon qoʻyilishini oʻrganing. Student Question Bank’dan 25 ta shunday savol ishlang; maqsad 25 tadan 22 ta, har bir xatoni qoidasi bilan yozing.',
                },
                framework: 'Clause punctuation',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s2',
                title: {
                  en: 'Verb forms, pronouns and agreement',
                  uz: 'Feʼl shakllari, olmoshlar va moslashuv',
                },
                drill: {
                  en: 'Do 25 questions on verb tense, subject–verb and pronoun agreement, modifiers, plurals and possessives. Write the rule next to every miss.',
                  uz: 'Feʼl zamoni, ega va kesim hamda olmosh moslashuvi, aniqlovchilar, koʻplik va qaratqich shakllari boʻyicha 25 ta savol ishlang. Har bir xato yoniga qoidasini yozing.',
                },
                framework: 'Form and agreement',
                estimatedMinutes: 55,
              },
              {
                id: 'sat-s20',
                title: {
                  en: 'Expression of Ideas: transitions and goals',
                  uz: 'Expression of Ideas: oʻtish soʻzlari va maqsadlar',
                },
                drill: {
                  en: 'Do 20 Expression of Ideas questions. Before choosing, name the relationship (contrast, cause, example, addition) or the goal stated in the question.',
                  uz: '20 ta Expression of Ideas savolini ishlang. Javob tanlashdan oldin munosabatni (zidlik, sabab, misol, qoʻshimcha) yoki savolda aytilgan maqsadni nomlang.',
                },
                framework: 'Name the relationship',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s3',
                title: {
                  en: 'Mixed rule questions at test pace',
                  uz: 'Test sur’atida aralash qoida savollari',
                },
                drill: {
                  en: 'Do 20 mixed Conventions and Expression of Ideas questions at about 1 minute each (the section allows about 71 seconds per question). Redo every miss the next day without the answer.',
                  uz: '20 ta aralash Conventions va Expression of Ideas savolini har biriga taxminan 1 daqiqadan ishlang (boʻlimda bir savolga oʻrtacha 71 soniya bor). Har bir xatoni ertasi kuni javobga qaramasdan qayta ishlang.',
                },
                framework: 'Timed set',
                estimatedMinutes: 40,
              },
            ],
          },
        ],
      },
      {
        id: 'sat-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build Reading and Writing and Math skills',
          uz: '2-bosqich · Reading and Writing va Math koʻnikmalari',
        },
        objective: {
          en: 'Work through every content domain with official questions, and use Desmos where it saves time.',
          uz: 'Har bir content domainni rasmiy savollar bilan ishlab chiqish va vaqtni tejaydigan joyda Desmos’dan foydalanish.',
        },
        modules: [
          {
            id: 'sat-rw-logic',
            title: {
              en: 'Information and Ideas · Craft and Structure',
              uz: 'Information and Ideas · Craft and Structure',
            },
            summary: {
              en: 'Short passages of 25–150 words, one question each: central ideas, evidence from text and graphics, inferences, words in context and text structure.',
              uz: '25–150 soʻzli qisqa matnlar, har biriga bitta savol: asosiy gʻoya, matn va grafikdan dalil, xulosa chiqarish, kontekstdagi soʻz va matn tuzilishi.',
            },
            baselineHours: 18,
            difficulty: 'intermediate',
            keyFramework: 'Claim and evidence',
            steps: [
              {
                id: 'sat-s4',
                title: {
                  en: 'Words in context',
                  uz: 'Kontekstdagi soʻzlar',
                },
                drill: {
                  en: 'Do 25 words-in-context questions. Before looking at the options, write your own word for the blank; log every unknown word with a sentence of your own.',
                  uz: '25 ta kontekstdagi soʻz savolini ishlang. Variantlarga qarashdan oldin boʻshliqqa oʻz soʻzingizni yozing; bilmagan har bir soʻzni oʻzingiz tuzgan jumla bilan yozib qoʻying.',
                },
                framework: 'Own word first',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s5',
                title: {
                  en: 'Evidence from text, tables and graphs',
                  uz: 'Matn, jadval va grafikdan dalil',
                },
                drill: {
                  en: 'Do 20 Information and Ideas questions with tables, bar graphs or line graphs. For each, underline the claim, then name the exact data point that supports it.',
                  uz: 'Jadval, ustunli yoki chiziqli grafikli 20 ta Information and Ideas savolini ishlang. Har birida daʼvoni belgilang, soʻng uni tasdiqlaydigan aniq maʼlumot nuqtasini nomlang.',
                },
                framework: 'Claim and data point',
                estimatedMinutes: 55,
              },
              {
                id: 'sat-s6',
                title: {
                  en: 'Inferences',
                  uz: 'Xulosa chiqarish',
                },
                drill: {
                  en: 'Do 15 inference questions. For each, write in your own words what the blank must say, then cross out options that go beyond the passage. Target 12 of 15.',
                  uz: '15 ta xulosa chiqarish savolini ishlang. Har birida boʻshliq nimani aytishi kerakligini oʻz soʻzlaringiz bilan yozing, soʻng matndan tashqariga chiqadigan variantlarni oʻchiring. Maqsad: 15 tadan 12 ta.',
                },
                framework: 'Stay inside the text',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s21',
                title: {
                  en: 'Text structure, purpose and paired texts',
                  uz: 'Matn tuzilishi, maqsadi va juft matnlar',
                },
                drill: {
                  en: 'Do 15 questions on structure, purpose and connections between two texts. Summarise each text’s view in one line and say how the second responds to the first.',
                  uz: 'Matn tuzilishi, maqsadi va ikki matn orasidagi bogʻliqlik boʻyicha 15 ta savol ishlang. Har bir matnning fikrini bir qatorda yozing va ikkinchisi birinchisiga qanday javob berishini ayting.',
                },
                framework: 'One-line summary',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'sat-algebra-desmos',
            title: {
              en: 'Math · Algebra with Desmos',
              uz: 'Math · Desmos bilan Algebra',
            },
            summary: {
              en: 'Linear equations, inequalities, functions and systems: 13–15 questions per test. Learn when graphing in Desmos beats solving by hand.',
              uz: 'Chiziqli tenglamalar, tengsizliklar, funksiyalar va sistemalar: har testda 13–15 savol. Desmos’da grafik chizish qachon qoʻlda yechishdan tezroq ekanini oʻrganish.',
            },
            baselineHours: 16,
            difficulty: 'intermediate',
            keyFramework: 'Solve, then check in Desmos',
            steps: [
              {
                id: 'sat-s7',
                title: {
                  en: 'Linear equations and systems',
                  uz: 'Chiziqli tenglamalar va sistemalar',
                },
                drill: {
                  en: 'Do 25 Algebra questions from the Student Question Bank. Solve each by hand, then check 10 of them by graphing in Desmos and note which method was faster.',
                  uz: 'Student Question Bank’dan 25 ta Algebra savolini ishlang. Har birini qoʻlda yeching, soʻng 10 tasini Desmos’da grafik orqali tekshiring va qaysi usul tezroq boʻlganini yozing.',
                },
                framework: 'Hand vs graph',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s8',
                title: {
                  en: 'Linear models in context',
                  uz: 'Kontekstdagi chiziqli modellar',
                },
                drill: {
                  en: 'Do 15 Algebra word problems (about 30% of Math questions are set in context). For each, write what the slope and the intercept mean in the situation.',
                  uz: '15 ta Algebra matnli masalasini ishlang (Math savollarining taxminan 30% kontekstli). Har birida qiyalik va boshlangʻich qiymat vaziyatda nimani bildirishini yozing.',
                },
                framework: 'Slope means',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s9',
                title: {
                  en: 'Student-produced responses',
                  uz: 'Student-produced response savollari',
                },
                drill: {
                  en: 'Do 15 student-produced response questions (about 25% of Math). Practise entering fractions, decimals and negative answers in the response field and log any entry errors.',
                  uz: '15 ta student-produced response savolini ishlang (Math’ning taxminan 25%). Javob maydoniga kasr, oʻnli va manfiy sonlarni kiritishni mashq qiling va kiritishdagi xatolarni yozing.',
                },
                framework: 'Answer entry',
                estimatedMinutes: 45,
              },
              {
                id: 'sat-s22',
                title: {
                  en: 'Your Desmos toolkit',
                  uz: 'Desmos boʻyicha shaxsiy usullar toʻplami',
                },
                drill: {
                  en: 'On official questions, practise five Desmos moves: find an intersection, find zeros, use a slider for an unknown constant, use a table for data, test answer choices. Time each.',
                  uz: 'Rasmiy savollarda Desmos’ning besh usulini mashq qiling: kesishish nuqtasini topish, nollarni topish, nomaʼlum konstanta uchun slider, maʼlumot uchun jadval, variantlarni sinash. Har birini vaqtga oling.',
                },
                framework: 'Desmos moves',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'sat-adv-math',
            title: {
              en: 'Math · Advanced Math',
              uz: 'Math · Advanced Math',
            },
            summary: {
              en: 'Quadratic, exponential, polynomial, rational and radical equations and functions, and equivalent expressions: 13–15 questions per test.',
              uz: 'Kvadrat, koʻrsatkichli, koʻphad, ratsional va ildizli tenglama hamda funksiyalar, teng kuchli ifodalar: har testda 13–15 savol.',
            },
            baselineHours: 16,
            difficulty: 'executive',
            keyFramework: 'Structure first',
            steps: [
              {
                id: 'sat-s10',
                title: {
                  en: 'Quadratics in three forms',
                  uz: 'Kvadrat funksiyaning uch shakli',
                },
                drill: {
                  en: 'Do 20 quadratic questions. For each, decide which form (standard, factored, vertex) shows what is asked, and check the vertex or zeros in Desmos.',
                  uz: '20 ta kvadrat funksiya savolini ishlang. Har birida qaysi shakl (standart, koʻpaytuvchilarga ajratilgan, uchli) soʻralganni koʻrsatishini aniqlang va uchini yoki nollarini Desmos’da tekshiring.',
                },
                framework: 'Pick the form',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s11',
                title: {
                  en: 'Exponential growth and decay',
                  uz: 'Eksponensial oʻsish va kamayish',
                },
                drill: {
                  en: 'Do 15 exponential questions. For each, write the initial value and the growth or decay factor, and convert between percent change and the factor.',
                  uz: '15 ta eksponensial savolni ishlang. Har birida boshlangʻich qiymat va oʻsish yoki kamayish koeffitsiyentini yozing, foiz oʻzgarish bilan koeffitsiyent orasida oʻtkazing.',
                },
                framework: 'Initial value and factor',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s12',
                title: {
                  en: 'Equivalent expressions and nonlinear equations',
                  uz: 'Teng kuchli ifodalar va nochiziqli tenglamalar',
                },
                drill: {
                  en: 'Do 20 questions on equivalent expressions, rational and radical equations, and systems with a nonlinear equation. Check each by graphing both sides in Desmos.',
                  uz: 'Teng kuchli ifodalar, ratsional va ildizli tenglamalar hamda nochiziqli tenglamali sistemalar boʻyicha 20 ta savol ishlang. Har birini ikki tomonni Desmos’da chizib tekshiring.',
                },
                framework: 'Graph both sides',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s23',
                title: {
                  en: 'Hard Advanced Math questions',
                  uz: 'Qiyin Advanced Math savollari',
                },
                drill: {
                  en: 'Filter the Student Question Bank for hard Advanced Math questions and do 12. For each miss, write the first step you should have taken.',
                  uz: 'Student Question Bank’ni qiyin Advanced Math savollari boʻyicha filtrlang va 12 tasini ishlang. Har bir xato uchun qilishingiz kerak boʻlgan birinchi qadamni yozing.',
                },
                framework: 'First step',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'sat-data-geometry',
            title: {
              en: 'Math · Problem-Solving and Data Analysis · Geometry and Trigonometry',
              uz: 'Math · Problem-Solving and Data Analysis · Geometry and Trigonometry',
            },
            summary: {
              en: 'Ratios, rates, percentages, statistics and probability, plus area, volume, angles, circles and right-triangle trigonometry: 5–7 questions each per test.',
              uz: 'Nisbatlar, tezliklar, foizlar, statistika va ehtimollik hamda yuza, hajm, burchaklar, aylana va toʻgʻri burchakli uchburchak trigonometriyasi: har testda 5–7 tadan savol.',
            },
            baselineHours: 12,
            difficulty: 'intermediate',
            keyFramework: 'Units, figure, check',
            steps: [
              {
                id: 'sat-s24',
                title: {
                  en: 'Ratios, rates, percentages and units',
                  uz: 'Nisbat, tezlik, foiz va birliklar',
                },
                drill: {
                  en: 'Do 20 Problem-Solving and Data Analysis questions on ratios, rates, percentages and unit conversion. Write the units at every step.',
                  uz: 'Nisbat, tezlik, foiz va birliklarni oʻtkazish boʻyicha 20 ta Problem-Solving and Data Analysis savolini ishlang. Har bir qadamda birliklarni yozing.',
                },
                framework: 'Units at every step',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s25',
                title: {
                  en: 'Statistics and probability',
                  uz: 'Statistika va ehtimollik',
                },
                drill: {
                  en: 'Do 15 questions on mean, median, spread, two-way tables, probability and conclusions from samples. For each, say what the data can and cannot support.',
                  uz: 'Oʻrta qiymat, mediana, tarqoqlik, ikki oʻlchovli jadvallar, ehtimollik va tanlanmadan xulosa boʻyicha 15 ta savol ishlang. Har birida maʼlumot nimani tasdiqlay olishi va nimani tasdiqlay olmasligini ayting.',
                },
                framework: 'What the data supports',
                estimatedMinutes: 50,
              },
              {
                id: 'sat-s26',
                title: {
                  en: 'Geometry and trigonometry',
                  uz: 'Geometriya va trigonometriya',
                },
                drill: {
                  en: 'Do 20 Geometry and Trigonometry questions (area, volume, angles, similar triangles, circles, sine, cosine, tangent). Draw or mark up the figure before solving.',
                  uz: '20 ta Geometry and Trigonometry savolini ishlang (yuza, hajm, burchaklar, oʻxshash uchburchaklar, aylana, sinus, kosinus, tangens). Yechishdan oldin shaklni chizing yoki belgilang.',
                },
                framework: 'Mark the figure',
                estimatedMinutes: 60,
              },
              {
                id: 'sat-s27',
                title: {
                  en: 'Formula and mistake sheet',
                  uz: 'Formulalar va xatolar varagʻi',
                },
                drill: {
                  en: 'Make a one-page sheet of the formulas you used in this module and the mistakes you made with them. Redo every missed question from the module without notes.',
                  uz: 'Ushbu modulda ishlatgan formulalaringiz va ular bilan qilgan xatolaringizdan bir sahifalik varaq tuzing. Moduldagi barcha xato savollarni qaydlarsiz qayta ishlang.',
                },
                framework: 'Redo misses',
                estimatedMinutes: 40,
              },
            ],
          },
        ],
      },
      {
        id: 'sat-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Bluebook practice tests',
          uz: '3-bosqich · Bluebook mashq testlari',
        },
        objective: {
          en: 'Take full adaptive practice tests under real timing, review every miss, and fix your pacing.',
          uz: 'Haqiqiy vaqt bilan toʻliq adaptiv mashq testlarini topshirish, har bir xatoni tahlil qilish va vaqt taqsimotini tuzatish.',
        },
        modules: [
          {
            id: 'sat-bluebook-mocks',
            title: {
              en: 'Full-length adaptive practice tests',
              uz: 'Toʻliq adaptiv mashq testlari',
            },
            summary: {
              en: 'Two more Bluebook practice tests, each reviewed with the answer rationales, Khan Academy and Tailored Practice.',
              uz: 'Yana ikkita Bluebook mashq testi; har biri javob izohlari, Khan Academy va Tailored Practice bilan tahlil qilinadi.',
            },
            baselineHours: 14,
            difficulty: 'executive',
            keyFramework: 'Test, review, retest',
            steps: [
              {
                id: 'sat-s13',
                title: {
                  en: 'Practice test 2: Reading and Writing',
                  uz: '2-mashq testi: Reading and Writing',
                },
                drill: {
                  en: 'Start a new Bluebook full-length practice test and complete Reading and Writing under timing (2 × 32 min). Note the time left at the end of each module.',
                  uz: 'Bluebook’da yangi toʻliq mashq testini boshlang va Reading and Writing boʻlimini vaqt bilan bajaring (2 × 32 daqiqa). Har bir modul oxirida qolgan vaqtni yozing.',
                },
                framework: 'Timed section',
                estimatedMinutes: 70,
              },
              {
                id: 'sat-s14',
                title: {
                  en: 'Practice test 2: Math',
                  uz: '2-mashq testi: Math',
                },
                drill: {
                  en: 'Complete the Math section (2 × 35 min). Flag every question that takes over 2 minutes, and set your own rule for skipping and coming back on test day.',
                  uz: 'Math boʻlimini bajaring (2 × 35 daqiqa). 2 daqiqadan koʻp vaqt olgan har bir savolni belgilang va imtihon kuni savolni oʻtkazib, keyin qaytish boʻyicha oʻz qoidangizni belgilang.',
                },
                framework: 'Timed section',
                estimatedMinutes: 75,
              },
              {
                id: 'sat-s15',
                title: {
                  en: 'Review with rationales and Tailored Practice',
                  uz: 'Izohlar va Tailored Practice bilan tahlil',
                },
                drill: {
                  en: 'Review every miss with the rationales in My Practice, watch the Khan Academy walk-through for that test, and do one Get Tailored Practice set.',
                  uz: 'My Practice’dagi izohlar yordamida har bir xatoni tahlil qiling, shu test uchun Khan Academy tushuntirishlarini koʻring va bitta Get Tailored Practice toʻplamini ishlang.',
                },
                framework: 'Review loop',
                estimatedMinutes: 80,
              },
              {
                id: 'sat-s28',
                title: {
                  en: 'Practice test 3: Reading and Writing',
                  uz: '3-mashq testi: Reading and Writing',
                },
                drill: {
                  en: 'Start another full-length practice test and do Reading and Writing under timing. If you can, continue straight into the Math step after a 10-minute break, as on test day.',
                  uz: 'Yana bitta toʻliq mashq testini boshlang va Reading and Writing boʻlimini vaqt bilan ishlang. Imkon boʻlsa, imtihon kunidagidek 10 daqiqalik tanaffusdan keyin darhol Math qadamiga oʻting.',
                },
                framework: 'Timed section',
                estimatedMinutes: 70,
              },
              {
                id: 'sat-s29',
                title: {
                  en: 'Practice test 3: Math and score comparison',
                  uz: '3-mashq testi: Math va natijalarni solishtirish',
                },
                drill: {
                  en: 'Complete the Math section, then compare total, section and content-domain results with your baseline. Keep the error log open for the last week of review.',
                  uz: 'Math boʻlimini bajaring, soʻng umumiy, boʻlim va content domain natijalarini boshlangʻich test bilan solishtiring. Oxirgi takrorlash haftasida xatolar daftaridan foydalaning.',
                },
                framework: 'Retest',
                estimatedMinutes: 90,
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
      en: 'TOEFL iBT (2026 test): aim for band 5, CEFR C1',
      uz: 'TOEFL iBT (2026 yilgi test): Band 5, CEFR C1 maqsadi',
    },
    subtitle: {
      en: 'The test updated on 21 Jan 2026: adaptive Reading and Listening, short Writing and Speaking tasks, scored 1–6 (band 5 ≈ 95+ on the old 0–120 scale).',
      uz: '2026-yil 21-yanvardan yangilangan test: adaptiv Reading va Listening, qisqa Writing va Speaking topshiriqlari, 1–6 shkala (Band 5 ≈ eski 0–120 da 95+).',
    },
    archetypeLabel: {
      en: 'University English',
      uz: 'Universitet ingliz tili',
    },
    recommendedWeeks: 11,
    baselineTotalHours: 110,
    examVersion: 'TOEFL iBT — updated test, 21 Jan 2026',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'ETS: Test content and structure of the TOEFL iBT test', url: 'https://www.in.ets.org/toefl/institutions/ibt/about/content-structure.html' },
      { label: 'ETS: Updated TOEFL iBT Test Overview (PDF)', url: 'https://www.eu.ets.org/pdfs/toefl/toefl-ibt-test-at-a-glance.pdf' },
      { label: 'ETS: TOEFL iBT 2026 Update Test Blueprint and Specifications (PDF)', url: 'https://www.in.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf' },
      { label: 'ETS: A banded score scale for the TOEFL iBT test (April 2026, PDF)', url: 'https://www.eu.ets.org/pdfs/toefl/score-scale-update-2026.pdf' },
      { label: 'ETS: TOEFL TestReady', url: 'https://www.eu.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html' },
    ],
    phases: [
      {
        id: 'toefl-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose, then build Reading and Listening',
          uz: '1-bosqich · Diagnostika, soʻng Reading va Listening',
        },
        objective: {
          en: 'Learn the 2026 task types, measure your band in each section, and make the adaptive first stage of Reading and Listening secure.',
          uz: '2026 yilgi topshiriq turlarini oʻrganish, har bir boʻlimdagi Bandni aniqlash va Reading hamda Listening’ning adaptiv birinchi bosqichini mustahkamlash.',
        },
        modules: [
          {
            id: 'toefl-diagnostic',
            title: {
              en: 'Baseline: the free TestReady practice test',
              uz: 'Boshlangʻich test: TestReady bepul mashq testi',
            },
            summary: {
              en: 'Try every new task type, sit the free full-length practice test, and set a band target for each section.',
              uz: 'Har bir yangi topshiriq turini sinab koʻrish, bepul toʻliq mashq testini topshirish va har bir boʻlim uchun Band maqsadini qoʻyish.',
            },
            baselineHours: 12,
            difficulty: 'foundational',
            keyFramework: 'Baseline and error log',
            steps: [
              {
                id: 'toefl-s16',
                title: {
                  en: 'Learn the 12 task types',
                  uz: '12 ta topshiriq turini oʻrganish',
                },
                drill: {
                  en: 'Read ETS’s Updated TOEFL iBT Test Overview and try its sample of each task type once. For each, write one line: what you do, how long you have, and how it is scored.',
                  uz: 'ETS’ning Updated TOEFL iBT Test Overview hujjatini oʻqing va undagi har bir topshiriq turi namunasini bir martadan ishlang. Har biri uchun bir qator yozing: nima qilinadi, qancha vaqt beriladi, qanday baholanadi.',
                },
                framework: 'Task map',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s17',
                title: {
                  en: 'Full practice test in TOEFL TestReady',
                  uz: 'TOEFL TestReady’da toʻliq mashq testi',
                },
                drill: {
                  en: 'Create a free TOEFL TestReady account and take the free full-length practice test in one sitting, in test order: Reading, Listening, Writing, Speaking. Save the 1–6 band for each section.',
                  uz: 'Bepul TOEFL TestReady akkauntini oching va bepul toʻliq mashq testini bir oʻtirishda, test tartibida ishlang: Reading, Listening, Writing, Speaking. Har bir boʻlim uchun 1–6 Bandni saqlab qoʻying.',
                },
                framework: 'Baseline test',
                estimatedMinutes: 110,
              },
              {
                id: 'toefl-s18',
                title: {
                  en: 'Turn the feedback into an error log',
                  uz: 'Fikr-mulohazani xatolar daftariga aylantirish',
                },
                drill: {
                  en: 'Go through the feedback for all four sections. Copy the Writing and Speaking tips into an error log, and log every Reading and Listening miss by task type.',
                  uz: 'Toʻrt boʻlim boʻyicha fikr-mulohazalarni koʻrib chiqing. Writing va Speaking maslahatlarini xatolar daftariga koʻchiring, Reading va Listening’dagi har bir xatoni topshiriq turi boʻyicha yozing.',
                },
                framework: 'Error log',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s19',
                title: {
                  en: 'Set section targets',
                  uz: 'Boʻlim maqsadlarini belgilash',
                },
                drill: {
                  en: 'Set a band per section. The overall band is the average of the four, rounded to the nearest half band, and 5–5.5 maps to CEFR C1. Pick the two sections with the most room to gain.',
                  uz: 'Har bir boʻlim uchun Band belgilang. Umumiy Band toʻrt boʻlim oʻrtachasi boʻlib, eng yaqin yarim Bandga yaxlitlanadi; 5–5.5 CEFR C1 ga mos. Eng koʻp oʻsish imkoni bor ikki boʻlimni tanlang.',
                },
                framework: 'Band targets',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'toefl-reading',
            title: {
              en: 'Reading · Complete the Words, Read in Daily Life, Academic Passage',
              uz: 'Reading · Complete the Words, Read in Daily Life, Academic Passage',
            },
            summary: {
              en: 'A two-stage adaptive section: your first-stage results set the level of the second stage. Train word forms, quick everyday texts and short academic passages.',
              uz: 'Ikki bosqichli adaptiv boʻlim: birinchi bosqich natijasi ikkinchi bosqich darajasini belgilaydi. Soʻz shakllari, kundalik qisqa matnlar va qisqa akademik matnlar mashq qilinadi.',
            },
            baselineHours: 20,
            difficulty: 'intermediate',
            keyFramework: 'Form and meaning',
            steps: [
              {
                id: 'toefl-s1',
                title: {
                  en: 'Complete the Words',
                  uz: 'Complete the Words',
                },
                drill: {
                  en: 'Do 8 Complete the Words paragraphs (10 words each with the second half missing). Log every miss as spelling, word form or wrong word, and review the endings you missed.',
                  uz: '8 ta Complete the Words xatboshisini ishlang (har birida ikkinchi yarmi tushirib qoldirilgan 10 ta soʻz). Har bir xatoni imlo, soʻz shakli yoki notoʻgʻri soʻz deb belgilang va xato qilgan qoʻshimchalarni takrorlang.',
                },
                framework: 'Word-form log',
                estimatedMinutes: 50,
              },
              {
                id: 'toefl-s2',
                title: {
                  en: 'Read in Daily Life',
                  uz: 'Read in Daily Life',
                },
                drill: {
                  en: 'Do 20 Read in Daily Life sets (emails, notices, menus, posts of about 15–150 words, 2–3 questions each). Before answering, state the purpose of each text in five words.',
                  uz: '20 ta Read in Daily Life toʻplamini ishlang (taxminan 15–150 soʻzli xat, eʼlon, menyu, postlar, har biriga 2–3 savol). Javob berishdan oldin har bir matnning maqsadini besh soʻzda ayting.',
                },
                framework: 'Purpose first',
                estimatedMinutes: 50,
              },
              {
                id: 'toefl-s3',
                title: {
                  en: 'Read an Academic Passage',
                  uz: 'Read an Academic Passage',
                },
                drill: {
                  en: 'Do 8 academic passages (about 200 words, 5 questions each). Sort every miss: fact, vocabulary in context, inference, relationship between ideas, or purpose.',
                  uz: '8 ta akademik matn ishlang (taxminan 200 soʻz, har biriga 5 savol). Har bir xatoni turlarga ajrating: fakt, kontekstdagi soʻz, xulosa, gʻoyalar orasidagi bogʻliqlik yoki maqsad.',
                },
                framework: 'Question-type sort',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s20',
                title: {
                  en: 'Timed Reading section',
                  uz: 'Vaqtli Reading boʻlimi',
                },
                drill: {
                  en: 'Do a timed Reading section in TOEFL TestReady (about 30 minutes). Compare accuracy on the first stage with your baseline, since it decides the level of the second stage.',
                  uz: 'TOEFL TestReady’da vaqtli Reading boʻlimini ishlang (taxminan 30 daqiqa). Birinchi bosqichdagi natijani boshlangʻich test bilan solishtiring, chunki u ikkinchi bosqich darajasini belgilaydi.',
                },
                framework: 'First-stage accuracy',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'toefl-listening',
            title: {
              en: 'Listening · responses, conversations, announcements, talks',
              uz: 'Listening · javob tanlash, suhbat, eʼlon, maʼruza',
            },
            summary: {
              en: 'Also two-stage adaptive. Each recording plays once, with North American, British, Australian and New Zealand accents.',
              uz: 'Bu boʻlim ham ikki bosqichli adaptiv. Har bir yozuv bir marta eshittiriladi; Shimoliy Amerika, Britaniya, Avstraliya va Yangi Zelandiya talaffuzlari bor.',
            },
            baselineHours: 18,
            difficulty: 'intermediate',
            keyFramework: 'Purpose, point, next action',
            steps: [
              {
                id: 'toefl-s4',
                title: {
                  en: 'Listen and Choose a Response',
                  uz: 'Listen and Choose a Response',
                },
                drill: {
                  en: 'Do 40 Listen and Choose a Response items. Decide whether the speaker asked, suggested, complained or invited, then pick the reply that fits that function.',
                  uz: '40 ta Listen and Choose a Response savolini ishlang. Soʻzlovchi soʻradimi, taklif qildimi, shikoyat qildimi yoki chaqirdimi — aniqlang, soʻng shu vazifaga mos javobni tanlang.',
                },
                framework: 'Speech function',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s5',
                title: {
                  en: 'Conversations and announcements',
                  uz: 'Suhbatlar va eʼlonlar',
                },
                drill: {
                  en: 'Do 10 conversations and 8 campus announcements (about 40–85 words). Before checking answers, write the speaker’s purpose and the next action in one line each.',
                  uz: '10 ta suhbat va 8 ta kampus eʼlonini (taxminan 40–85 soʻz) ishlang. Javoblarni tekshirishdan oldin soʻzlovchining maqsadi va keyingi harakatni bir qatordan yozing.',
                },
                framework: 'Purpose and next action',
                estimatedMinutes: 55,
              },
              {
                id: 'toefl-s6',
                title: {
                  en: 'Academic talks',
                  uz: 'Akademik maʼruzalar',
                },
                drill: {
                  en: 'Do 8 academic talks (about 100–250 words, 4 questions each). Take notes as main idea, two supporting points and an example, then find which question type you miss most.',
                  uz: '8 ta akademik maʼruza ishlang (taxminan 100–250 soʻz, har biriga 4 savol). Asosiy gʻoya, ikki tayanch fikr va misol shaklida qayd yozing, soʻng qaysi savol turida koʻp xato qilishingizni aniqlang.',
                },
                framework: 'Three-line notes',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s21',
                title: {
                  en: 'Timed Listening section',
                  uz: 'Vaqtli Listening boʻlimi',
                },
                drill: {
                  en: 'Do a timed Listening section in TOEFL TestReady without replaying any audio. Log misses by task type and compare with your baseline.',
                  uz: 'TOEFL TestReady’da vaqtli Listening boʻlimini audioni qayta tinglamasdan ishlang. Xatolarni topshiriq turi boʻyicha yozing va boshlangʻich test bilan solishtiring.',
                },
                framework: 'One play only',
                estimatedMinutes: 40,
              },
            ],
          },
        ],
      },
      {
        id: 'toefl-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build Writing and Speaking',
          uz: '2-bosqich · Writing va Speaking koʻnikmalari',
        },
        objective: {
          en: 'Produce accurate sentences, complete emails and discussion posts in strict time, and speak clearly in the repeat and interview tasks.',
          uz: 'Aniq jumlalar tuzish, qatʼiy vaqtda toʻliq email va muhokama postlarini yozish hamda takrorlash va intervyu topshiriqlarida aniq gapirish.',
        },
        modules: [
          {
            id: 'toefl-writing',
            title: {
              en: 'Writing · Build a Sentence, Write an Email, Academic Discussion',
              uz: 'Writing · Build a Sentence, Write an Email, Academic Discussion',
            },
            summary: {
              en: 'About 23 minutes: 10 sentence-building items, a 7-minute email and a 10-minute discussion post, each written response scored 0–5.',
              uz: 'Taxminan 23 daqiqa: 10 ta jumla tuzish, 7 daqiqalik email va 10 daqiqalik muhokama posti; har bir yozma javob 0–5 ball bilan baholanadi.',
            },
            baselineHours: 22,
            difficulty: 'intermediate',
            keyFramework: 'Clear, complete, supported',
            steps: [
              {
                id: 'toefl-s10',
                title: {
                  en: 'Build a Sentence',
                  uz: 'Build a Sentence',
                },
                drill: {
                  en: 'Do 30 Build a Sentence items: put the words in order to form a grammatical reply. After each set, write the pattern you missed (question order, auxiliaries, relative clauses).',
                  uz: '30 ta Build a Sentence savolini ishlang: soʻzlarni grammatik toʻgʻri javob boʻladigan tartibga keltiring. Har toʻplamdan keyin xato qilgan qolipni yozing (soʻroq tartibi, yordamchi feʼllar, nisbiy gaplar).',
                },
                framework: 'Pattern log',
                estimatedMinutes: 40,
              },
              {
                id: 'toefl-s11',
                title: {
                  en: 'Write an Email in 7 minutes',
                  uz: 'Write an Email: 7 daqiqada',
                },
                drill: {
                  en: 'Write 4 emails in 7 minutes each (recommend, invite, solve a problem), covering every point in the task. Check greeting, purpose, each point and a polite close; score with the 0–5 guide.',
                  uz: '4 ta emailni har biri 7 daqiqada yozing (tavsiya, taklif, muammoni hal qilish), topshiriqdagi har bir bandni qamrab oling. Salomlashish, maqsad, har bir band va xushmuomala yakunni tekshiring; 0–5 shkala bilan baholang.',
                },
                framework: 'Every point covered',
                estimatedMinutes: 55,
              },
              {
                id: 'toefl-s12',
                title: {
                  en: 'Academic Discussion in 10 minutes',
                  uz: 'Academic Discussion: 10 daqiqada',
                },
                drill: {
                  en: 'Write 4 discussion posts in 10 minutes each: your position, a reason with an example, and a response to a classmate’s point. Aim for at least 100 words; score with the 0–5 guide.',
                  uz: '4 ta muhokama postini har biri 10 daqiqada yozing: pozitsiyangiz, misolli sabab va kursdoshingiz fikriga munosabat. Kamida 100 soʻz yozing; 0–5 shkala bilan baholang.',
                },
                framework: 'Position, reason, response',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s22',
                title: {
                  en: 'Accuracy pass',
                  uz: 'Aniqlik boʻyicha tuzatish',
                },
                drill: {
                  en: 'Rewrite your two weakest responses, fixing grammar and word choice. Keep a list of your 10 most frequent errors and read it before every timed task.',
                  uz: 'Eng zaif ikki javobingizni grammatika va soʻz tanlovini tuzatib, qayta yozing. Eng koʻp takrorlanadigan 10 ta xatoingiz roʻyxatini tuzing va har bir vaqtli topshiriqdan oldin oʻqing.',
                },
                framework: 'Top-10 errors',
                estimatedMinutes: 40,
              },
              {
                id: 'toefl-s23',
                title: {
                  en: 'Timed Writing section',
                  uz: 'Vaqtli Writing boʻlimi',
                },
                drill: {
                  en: 'Do a complete Writing section in about 23 minutes (sentence items, email, discussion) and score both written responses with the official 0–5 scoring guides.',
                  uz: 'Toʻliq Writing boʻlimini taxminan 23 daqiqada bajaring (jumla savollari, email, muhokama) va ikkala yozma javobni rasmiy 0–5 baholash qoʻllanmasi bilan baholang.',
                },
                framework: 'Timed section',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'toefl-speaking',
            title: {
              en: 'Speaking · Listen and Repeat, Take an Interview',
              uz: 'Speaking · Listen and Repeat, Take an Interview',
            },
            summary: {
              en: 'About 8 minutes: repeat 7 sentences that grow longer (8–12 seconds each), then answer 4 interview questions in 45 seconds each.',
              uz: 'Taxminan 8 daqiqa: tobora uzayib boradigan 7 ta jumlani takrorlash (har biriga 8–12 soniya), soʻng 4 ta intervyu savoliga 45 soniyadan javob berish.',
            },
            baselineHours: 20,
            difficulty: 'intermediate',
            keyFramework: 'Repeat exactly, answer fully',
            steps: [
              {
                id: 'toefl-s7',
                title: {
                  en: 'Listen and Repeat accuracy',
                  uz: 'Listen and Repeat aniqligi',
                },
                drill: {
                  en: 'Repeat 35 recorded campus sentences of growing length. Record yourself, compare word for word, and note dropped endings, missing small words and wrong stress.',
                  uz: 'Tobora uzayib boradigan 35 ta kampus jumlasini takrorlang. Oʻzingizni yozib oling, soʻzma-soʻz solishtiring va tushib qolgan qoʻshimchalar, kichik soʻzlar va notoʻgʻri urgʻuni yozing.',
                },
                framework: 'Word-for-word check',
                estimatedMinutes: 45,
              },
              {
                id: 'toefl-s8',
                title: {
                  en: 'Chunk long sentences',
                  uz: 'Uzun jumlalarni boʻlaklarga ajratish',
                },
                drill: {
                  en: 'Shadow 20 long sentences: split each into meaning chunks, repeat chunk by chunk, then say the whole sentence in under 10 seconds. Re-record the 5 you missed most.',
                  uz: '20 ta uzun jumlani shadowing qiling: har birini maʼno boʻlaklariga ajrating, boʻlakma-boʻlak takrorlang, soʻng butun jumlani 10 soniyadan kamroqda ayting. Eng koʻp xato qilgan 5 tasini qayta yozing.',
                },
                framework: 'Meaning chunks',
                estimatedMinutes: 40,
              },
              {
                id: 'toefl-s9',
                title: {
                  en: '45-second interview answers',
                  uz: '45 soniyalik intervyu javoblari',
                },
                drill: {
                  en: 'Answer 12 interview questions in 45 seconds each, from personal experience to opinions on wider issues: answer, reason, example. Count how many answers used at least 40 seconds.',
                  uz: '12 ta intervyu savoliga 45 soniyadan javob bering — shaxsiy tajribadan kengroq masalalar boʻyicha fikrgacha: javob, sabab, misol. Nechta javob kamida 40 soniya davom etganini sanang.',
                },
                framework: 'Answer, reason, example',
                estimatedMinutes: 50,
              },
              {
                id: 'toefl-s24',
                title: {
                  en: 'Self-score a full Speaking section',
                  uz: 'Toʻliq Speaking boʻlimini oʻzingiz baholash',
                },
                drill: {
                  en: 'Record a full Speaking section (7 repeats and 4 interview answers) and score each response 0–5 with the official Speaking scoring guides. Choose one fix for each task type.',
                  uz: 'Toʻliq Speaking boʻlimini (7 ta takrorlash va 4 ta intervyu javobi) yozib oling va har bir javobni rasmiy Speaking baholash qoʻllanmasi bilan 0–5 ball qoʻying. Har bir topshiriq turi uchun bitta tuzatish tanlang.',
                },
                framework: 'Scoring guide check',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'toefl-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Timed full tests',
          uz: '3-bosqich · Vaqtli toʻliq testlar',
        },
        objective: {
          en: 'Take full tests in the official order, review by task type, and check your bands against the targets.',
          uz: 'Rasmiy tartibda toʻliq testlar ishlash, xatolarni topshiriq turi boʻyicha tahlil qilish va Bandlarni maqsad bilan solishtirish.',
        },
        modules: [
          {
            id: 'toefl-mocks',
            title: {
              en: 'Full mock tests',
              uz: 'Toʻliq sinov testlari',
            },
            summary: {
              en: 'Two full tests in order (Reading, Listening, Writing, Speaking) with a task-type review between them, then a test-day plan.',
              uz: 'Tartib bilan ikki toʻliq test (Reading, Listening, Writing, Speaking), ular orasida topshiriq turi boʻyicha tahlil, soʻng imtihon kuni rejasi.',
            },
            baselineHours: 18,
            difficulty: 'executive',
            keyFramework: 'Test, review, retest',
            steps: [
              {
                id: 'toefl-s13',
                title: {
                  en: 'Full mock test 1',
                  uz: '1-toʻliq sinov testi',
                },
                drill: {
                  en: 'Take a TOEFL Practice Online (TPO) mock in TestReady in one sitting, in test order, with no pauses. Record your band for each section and the overall band.',
                  uz: 'TestReady’dagi TOEFL Practice Online (TPO) sinov testini bir oʻtirishda, test tartibida va tanaffussiz ishlang. Har bir boʻlim va umumiy Bandni yozib qoʻying.',
                },
                framework: 'Timed mock',
                estimatedMinutes: 110,
              },
              {
                id: 'toefl-s14',
                title: {
                  en: 'Review by task type',
                  uz: 'Topshiriq turi boʻyicha tahlil',
                },
                drill: {
                  en: 'Sort every mock error by task type. Spend 30 minutes on the task type that lost the most points, using new items rather than ones you have already seen.',
                  uz: 'Sinovdagi har bir xatoni topshiriq turi boʻyicha ajrating. Eng koʻp ball yoʻqotilgan topshiriq turiga 30 daqiqa ajrating va oldin koʻrmagan yangi savollardan foydalaning.',
                },
                framework: 'Error sort',
                estimatedMinutes: 60,
              },
              {
                id: 'toefl-s15',
                title: {
                  en: 'Full mock test 2',
                  uz: '2-toʻliq sinov testi',
                },
                drill: {
                  en: 'Take a second full mock under the same conditions. Compare each section band with mock 1 and with your targets, and note any section still below target.',
                  uz: 'Ikkinchi toʻliq sinov testini xuddi shu sharoitda ishlang. Har bir boʻlim Bandini 1-sinov va maqsadlaringiz bilan solishtiring, hali maqsaddan past boʻlgan boʻlimlarni yozing.',
                },
                framework: 'Retest',
                estimatedMinutes: 110,
              },
              {
                id: 'toefl-s25',
                title: {
                  en: 'Test-day plan',
                  uz: 'Imtihon kuni rejasi',
                },
                drill: {
                  en: 'Choose a test centre or the at-home test. Write a timing plan per task (7-minute email, 10-minute discussion, 45-second interview answers) and a 20-minute warm-up for test day.',
                  uz: 'Test markazi yoki uydan topshirishni tanlang. Har bir topshiriq uchun vaqt rejasini (7 daqiqalik email, 10 daqiqalik muhokama, 45 soniyalik intervyu javoblari) va imtihon kuni uchun 20 daqiqalik tayyorgarlik mashqini yozing.',
                },
                framework: 'Timing plan',
                estimatedMinutes: 30,
              },
            ],
          },
        ],
      },
    ],
  },
];
