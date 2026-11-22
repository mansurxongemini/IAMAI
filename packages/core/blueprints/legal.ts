import type { Blueprint } from '../schemas';

/*
  Legal curricula, checked against the exam owners' own pages on 2026-11-22:
  LSAC (LSAT), SRA (SQE), NCBE (UBE) and Global Legal English (TOLES).
  Facts the official pages did not confirm are deliberately left out.
*/
export const LEGAL_BLUEPRINTS: Blueprint[] = [
  /* ───────────────────────────── LSAT ───────────────────────────── */
  {
    id: 'lsat',
    category: 'legal',
    code: 'LSAT',
    title: {
      en: 'LSAT: Logical Reasoning, Reading Comprehension and Argumentative Writing',
      uz: 'LSAT: Logical Reasoning, Reading Comprehension va Argumentative Writing',
    },
    subtitle: {
      en: 'Current LSAT: two scored Logical Reasoning sections, one scored Reading Comprehension, one unscored section, plus the online writing sample.',
      uz: 'Amaldagi LSAT: ikkita baholanadigan Logical Reasoning, bitta Reading Comprehension, bitta baholanmaydigan boʻlim va onlayn yozma ish.',
    },
    archetypeLabel: {
      en: 'Law School Admission',
      uz: 'Huquq maktabi (law school) qabuli',
    },
    recommendedWeeks: 12,
    baselineTotalHours: 150,
    examVersion: 'LSAT format since August 2024 (no Logic Games); August 2027 layout change noted',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'LSAC: Specifications of the LSAT and LSAT Argumentative Writing', url: 'https://www.lsac.org/lsat/register-lsat/accommodations/specifications-lsat-and-lsat-argumentative-writing' },
      { label: 'LSAC: The LSAT will look a little different starting August 2027', url: 'https://www.lsac.org/lsat-will-look-little-different-starting-august-2027' },
      { label: 'LSAC: Logical Reasoning questions', url: 'https://www.lsac.org/lsat/prepare/types-lsat-questions/logical-reasoning' },
      { label: 'LSAC: Reading Comprehension questions', url: 'https://www.lsac.org/lsat/prepare/types-lsat-questions/reading-comprehension' },
      { label: 'LSAC: Practice tests for August 2024 and beyond on LawHub', url: 'https://www.lsac.org/blog/practice-tests-august-2024-and-beyond-now-available-lsacs-lawhub' },
      { label: 'LSAC: LSAT scoring', url: 'https://www.lsac.org/lsat/lsat-scoring' },
    ],
    phases: [
      {
        id: 'lsat-p1',
        order: 1,
        title: { en: 'Phase 1 · Diagnose and build the logic base', uz: '1-bosqich · Diagnostika va mantiqiy poydevor' },
        objective: {
          en: 'Know your test layout and baseline score, and read argument structure and conditional language without errors.',
          uz: 'Imtihon formati va boshlangʻich ballingizni bilish, argument tuzilmasi va shartli ifodalarni xatosiz oʻqish.',
        },
        modules: [
          {
            id: 'lsat-diagnostic',
            title: { en: 'Baseline PrepTest and Study Plan', uz: 'Boshlangʻich PrepTest va oʻquv reja' },
            summary: {
              en: 'Confirm which LSAT layout you will sit, take a timed official PrepTest and turn every miss into a tagged error log.',
              uz: 'Qaysi LSAT formatini topshirishingizni aniqlang, vaqtli rasmiy PrepTest yeching va har bir xatoni teglangan jurnalga yozing.',
            },
            baselineHours: 12,
            difficulty: 'foundational',
            keyFramework: 'Baseline Test + Error Log',
            steps: [
              {
                id: 'lsat-diag-format',
                title: { en: 'Confirm your test date and section layout', uz: 'Imtihon sanasi va boʻlimlar tartibini aniqlash' },
                drill: {
                  en: 'On lsac.org, note your test date. Before August 2027: four 35-minute sections (2 LR + 1 RC scored, 1 unscored). From August 2027: RC (52 min) first, then two 45-minute LR sections.',
                  uz: 'lsac.org da imtihon sanangizni yozing. 2027-yil avgustgacha: toʻrtta 35 daqiqalik boʻlim (2 ta LR va 1 ta RC baholanadi, 1 tasi baholanmaydi). Avgust 2027 dan: avval RC (52 daqiqa), keyin ikkita 45 daqiqalik LR.',
                },
                framework: 'Format Check',
                estimatedMinutes: 30,
              },
              {
                id: 'lsat-diag-baseline',
                title: { en: 'Take a free LawHub PrepTest under timed conditions', uz: 'LawHub platformasidagi bepul PrepTestni vaqt bilan yechish' },
                drill: {
                  en: 'Sit one of the four free August-2024-format PrepTests in LawHub with strict timing. Record the scaled score (120–180) and the number correct in each section.',
                  uz: 'LawHubʼdagi 2024-yil avgust formatidagi 4 ta bepul PrepTestdan birini qatʼiy vaqt bilan yeching. Shkala ballini (120–180) va har boʻlimdagi toʻgʻri javoblar sonini yozing.',
                },
                framework: 'Timed Baseline',
                estimatedMinutes: 120,
              },
              {
                id: 'lsat-diag-log',
                title: { en: 'Build a tagged error log from the baseline', uz: 'Diagnostika natijasidan teglangan xatolar jurnalini tuzish' },
                drill: {
                  en: 'Log every miss and every guess: the task (assumption, flaw, principle, inference…), time spent, and why the right answer is right. End with a count per task.',
                  uz: 'Har bir xato va taxminiy javobni yozing: vazifa turi (assumption, flaw, principle, inference…), sarflangan vaqt va toʻgʻri javob nega toʻgʻri ekani. Oxirida har tur boʻyicha sonini chiqaring.',
                },
                framework: 'Error Log',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-diag-plan',
                title: { en: 'Set a target score and a weekly plan', uz: 'Maqsadli ball va haftalik reja belgilash' },
                drill: {
                  en: 'Use the PrepTest’s score conversion to find how many more correct answers your target needs. Give the three weakest tasks in your log fixed weekly hours.',
                  uz: 'PrepTestning ball jadvali orqali maqsadingizga yana nechta toʻgʻri javob kerakligini aniqlang. Jurnaldagi eng zaif 3 ta vazifa turiga haftalik aniq soat ajrating.',
                },
                framework: 'Gap-to-Target Plan',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'lsat-conditional',
            title: { en: 'Argument Structure and Conditional Logic', uz: 'Argument tuzilmasi va shartli mantiq' },
            summary: {
              en: 'Find the conclusion and premises fast, and translate sufficient/necessary language without converse or inverse errors.',
              uz: 'Xulosa va asoslarni tez topish hamda yetarli/zaruriy shartlarni teskari xatolarsiz ifodalash.',
            },
            baselineHours: 22,
            difficulty: 'foundational',
            keyFramework: 'Conclusion Map + Contrapositive',
            steps: [
              {
                id: 'lsat-cond-structure',
                title: { en: 'Identify the main conclusion and the role of each statement', uz: 'Asosiy xulosa va har bir gapning vazifasini aniqlash' },
                drill: {
                  en: 'For 30 LR stimuli from LawHub, mark the conclusion and label each sentence premise, background or opposing view before reading the choices. Target 27/30.',
                  uz: 'LawHubʼdagi 30 ta LR matnida variantlarni oʻqishdan oldin xulosani belgilang va har bir gapni asos, fon yoki qarshi fikr deb belgilang. Maqsad: 27/30.',
                },
                framework: 'Conclusion–Premise Map',
                estimatedMinutes: 50,
              },
              {
                id: 'lsat-s1',
                title: { en: 'Translate sufficient and necessary indicators', uz: 'Yetarli va zaruriy shart koʻrsatkichlarini oʻgirish' },
                drill: {
                  en: 'Convert 40 statements using "if", "only if", "unless" and "requires" into arrow notation and write each contrapositive. Pass mark: no converse or inverse errors.',
                  uz: '"if", "only if", "unless" va "requires" bor 40 ta jumlani strelka sxemasiga oʻgiring va har birining kontrapozitivini yozing. Talab: birorta ham teskari shart xatosi boʻlmasin.',
                },
                framework: 'Unless-Negation Rule',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s2',
                title: { en: 'Chain conditionals across three or more premises', uz: '3 va undan ortiq asosli shartli zanjirlarni bogʻlash' },
                drill: {
                  en: 'Solve 25 must-be-true LR questions by linking the conditional chain on paper first. Mark any you got right by guessing and redo them next day.',
                  uz: '25 ta must-be-true LR savolini avval qogʻozda shartli zanjir tuzib yeching. Taxmin bilan toʻgʻri topganlaringizni belgilab, ertasi kuni qayta yeching.',
                },
                framework: 'Deductive Chain Linking',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s3',
                title: { en: 'Handle quantifiers: all, most, some, none', uz: 'Kvantorlar bilan ishlash: all, most, some, none' },
                drill: {
                  en: 'Work 20 items mixing quantifiers. Before choosing, write which inferences are valid (e.g., most A are B + most A are C → some B are C). Check every one against the key.',
                  uz: 'Kvantorlar aralash 20 ta savolni yeching. Tanlashdan oldin qaysi xulosalar toʻgʻri ekanini yozing (masalan, most A are B + most A are C → some B are C). Har birini kalit bilan tekshiring.',
                },
                framework: 'Quantifier Overlap',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
      {
        id: 'lsat-p2',
        order: 2,
        title: { en: 'Phase 2 · Build: LR tasks and Reading Comprehension', uz: '2-bosqich · Asos: LR vazifalari va Reading Comprehension' },
        objective: {
          en: 'Raise accuracy task by task, untimed first and then at section pace, in both Logical Reasoning and Reading Comprehension.',
          uz: 'Logical Reasoning va Reading Comprehensionʼda aniqlikni vazifa turi boʻyicha oshirish: avval vaqtsiz, keyin boʻlim tezligida.',
        },
        modules: [
          {
            id: 'lsat-flaws',
            title: { en: 'LR: Assumptions, Flaws, Strengthen and Weaken', uz: 'LR: yashirin taxminlar, mantiqiy xatolar, kuchaytirish va zaiflashtirish' },
            summary: {
              en: 'Name the gap in the argument before reading the choices. The same habit serves assumption, flaw, strengthen, weaken and principle questions.',
              uz: 'Variantlarni oʻqishdan oldin argumentdagi boʻshliqni nomlang. Bu odat assumption, flaw, strengthen, weaken va principle savollarida ishlaydi.',
            },
            baselineHours: 30,
            difficulty: 'intermediate',
            keyFramework: 'Negation Test + Named Flaws',
            steps: [
              {
                id: 'lsat-s4',
                title: { en: 'Separate necessary and sufficient assumptions', uz: 'Zaruriy va yetarli taxminlarni ajratish' },
                drill: {
                  en: 'Do 30 necessary-assumption questions, applying the negation test to your chosen answer each time, then 15 sufficient-assumption questions. Target 85% on each set.',
                  uz: '30 ta necessary assumption savolini har safar tanlangan javobga inkor sinovini qoʻllab yeching, keyin 15 ta sufficient assumption savoli. Har toʻplamda maqsad 85%.',
                },
                framework: 'Negation Test',
                estimatedMinutes: 70,
              },
              {
                id: 'lsat-s5',
                title: { en: 'Name recurring flaws before the choices', uz: 'Takrorlanuvchi mantiqiy xatolarni variantlardan oldin nomlash' },
                drill: {
                  en: 'For 35 flaw questions, write the flaw in your own words (correlation taken as cause, part-to-whole, unrepresentative sample…) before reading the answers. Score how often you matched.',
                  uz: '35 ta flaw savolida javoblarni oʻqishdan oldin xatoni oʻz soʻzingiz bilan yozing (korrelyatsiyani sabab deb olish, qismdan butunga, notoʻgʻri tanlanma…). Necha marta mos kelganini hisoblang.',
                },
                framework: 'Pre-Choice Flaw Naming',
                estimatedMinutes: 65,
              },
              {
                id: 'lsat-s6',
                title: { en: 'Strengthen, weaken and evaluate questions', uz: 'Strengthen, weaken va evaluate savollari' },
                drill: {
                  en: 'Do 30 mixed questions. For each, write the premise-to-conclusion gap in one line, then pick the answer that closes or widens that gap. Review every miss in the log.',
                  uz: '30 ta aralash savol yeching. Har birida asos va xulosa orasidagi boʻshliqni bir qatorda yozing, soʻng uni yopadigan yoki kengaytiradigan javobni tanlang. Har bir xatoni jurnalga kiriting.',
                },
                framework: 'Gap Targeting',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-flaws-principle',
                title: { en: 'Identify and apply principles', uz: 'Prinsiplarni aniqlash va qoʻllash' },
                drill: {
                  en: 'Do 20 principle questions. State the rule as an if–then before choosing, and check that every condition of the rule matches the facts. Target 16/20.',
                  uz: '20 ta principle savolini yeching. Tanlashdan oldin qoidani “agar–unda” shaklida yozing va qoidaning har bir sharti faktlarga mosligini tekshiring. Maqsad: 16/20.',
                },
                framework: 'If–Then Principle Check',
                estimatedMinutes: 50,
              },
              {
                id: 'lsat-flaws-explain',
                title: { en: 'Explanations and points of disagreement', uz: 'Izohlash va kelishmovchilik nuqtasi savollari' },
                drill: {
                  en: 'Do 25 explain-the-result and disagreement questions. For disagreement items, write each speaker’s claim; the answer must be a point both speakers address.',
                  uz: '25 ta izohlash va kelishmovchilik savolini yeching. Kelishmovchilik savollarida har bir soʻzlovchining fikrini yozing: javob ikkalasi ham fikr bildirgan nuqta boʻlishi shart.',
                },
                framework: 'Two-Speaker Check',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'lsat-rc-structure',
            title: { en: 'Reading Comprehension: Structure, Viewpoints and Comparative Reading', uz: 'Reading Comprehension: tuzilma, nuqtai nazarlar va qiyosiy matnlar' },
            summary: {
              en: 'Map each passage’s structure and the author’s attitude, then prove every answer from the text, for single passages and comparative pairs.',
              uz: 'Har bir matn tuzilmasi va muallif munosabatini xaritalash, soʻng har bir javobni matndan isbotlash: yakka matnlar va qiyosiy juftliklar uchun.',
            },
            baselineHours: 28,
            difficulty: 'intermediate',
            keyFramework: 'Passage Map + Line Proof',
            steps: [
              {
                id: 'lsat-s7',
                title: { en: 'Map passage structure and viewpoints', uz: 'Matn tuzilmasi va nuqtai nazarlarni xaritalash' },
                drill: {
                  en: 'For 8 passages (mix humanities, social science, science, law), write each paragraph’s purpose in six words or fewer and mark every viewpoint and tone word. Then answer and check.',
                  uz: '8 ta matnda (gumanitar, ijtimoiy, tabiiy fanlar, huquq) har bir xatboshi vazifasini 6 soʻzgacha yozing, har bir nuqtai nazar va ohang soʻzini belgilang. Soʻng savollarni yechib tekshiring.',
                },
                framework: 'Viewpoint Tagging',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s8',
                title: { en: 'Comparative reading sets', uz: 'Qiyosiy matnlar (comparative reading)' },
                drill: {
                  en: 'Do 4 comparative sets. Before the questions, label how the passages relate (generalization–instance, principle–application, point–counterpoint) and where they agree or differ.',
                  uz: '4 ta qiyosiy toʻplam yeching. Savollardan oldin matnlar qanday bogʻlanganini (umumlashma–misol, prinsip–qoʻllash, fikr–qarshi fikr) va qayerda mos yoki farqli ekanini yozing.',
                },
                framework: 'Agree–Differ Grid',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s9',
                title: { en: 'Prove inference answers from the text', uz: 'Inference javoblarini matndan isbotlash' },
                drill: {
                  en: 'Answer 30 inference and stated-information questions and note the line that proves each answer. An answer you cannot tie to a line counts as wrong.',
                  uz: '30 ta inference va matnda aytilgan maʼlumot savoliga javob bering va har birini isbotlovchi qatorni yozing. Qatorga bogʻlanmagan javob xato hisoblanadi.',
                },
                framework: 'Line Proof',
                estimatedMinutes: 55,
              },
              {
                id: 'lsat-rc-apply',
                title: { en: 'Application, analogy and new-information questions', uz: 'Qoʻllash, oʻxshatish va yangi maʼlumot savollari' },
                drill: {
                  en: 'Do 20 questions that apply the passage to a new case or ask how new information affects it. Write the passage claim being tested before choosing.',
                  uz: 'Matnni yangi holatga qoʻllash yoki yangi maʼlumot unga qanday taʼsir qilishi haqidagi 20 ta savolni yeching. Tanlashdan oldin tekshirilayotgan fikrni yozing.',
                },
                framework: 'Claim-First Check',
                estimatedMinutes: 50,
              },
              {
                id: 'lsat-rc-timing',
                title: { en: 'Pace one full RC section', uz: 'Bitta toʻliq RC boʻlimini vaqtga moslash' },
                drill: {
                  en: 'Do one 35-minute RC section from a LawHub PrepTest. Record minutes per passage and accuracy per passage; set a per-passage time limit for the next section.',
                  uz: 'LawHub PrepTestidan bitta 35 daqiqalik RC boʻlimini yeching. Har bir matnga ketgan vaqt va aniqlikni yozing; keyingi boʻlim uchun har matnga vaqt chegarasi belgilang.',
                },
                framework: 'Per-Passage Pacing',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'lsat-lr-hard',
            title: { en: 'Timed LR Sections and Pacing', uz: 'Vaqtli LR boʻlimlari va tezlik' },
            summary: {
              en: 'Move from untimed accuracy to full timed sections: skip, return and review without losing accuracy on the hardest questions.',
              uz: 'Vaqtsiz aniqlikdan toʻliq vaqtli boʻlimlarga oʻtish: eng qiyin savollarda aniqlikni yoʻqotmasdan oʻtkazib yuborish, qaytish va tahlil qilish.',
            },
            baselineHours: 20,
            difficulty: 'executive',
            keyFramework: 'Two-Pass Timing + Blind Review',
            steps: [
              {
                id: 'lsat-s10',
                title: { en: 'Parallel reasoning and parallel flaw', uz: 'Parallel reasoning va parallel flaw savollari' },
                drill: {
                  en: 'Do 20 parallel questions. Reduce each argument to a template (A→B, B→C, so A→C) and match conclusion strength first. Record time per question.',
                  uz: '20 ta parallel savolni yeching. Har bir argumentni shablonga keltiring (A→B, B→C, demak A→C) va avval xulosa kuchini solishtiring. Har savolga ketgan vaqtni yozing.',
                },
                framework: 'Template Matching',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s11',
                title: { en: 'Two-pass timing in a full LR section', uz: 'Toʻliq LR boʻlimida ikki bosqichli vaqt taktikasi' },
                drill: {
                  en: 'Do one timed LR section from LawHub. Skip any question past about 2 minutes and return after the first pass. Record skipped items and final accuracy.',
                  uz: 'LawHubʼdan bitta vaqtli LR boʻlimini yeching. Taxminan 2 daqiqadan oshgan savolni oʻtkazib, birinchi aylanishdan keyin qayting. Oʻtkazilgan savollar va yakuniy aniqlikni yozing.',
                },
                framework: 'Two-Pass Timing',
                estimatedMinutes: 50,
              },
              {
                id: 'lsat-s12',
                title: { en: 'Blind review after each timed section', uz: 'Har bir vaqtli boʻlimdan keyin Blind Review' },
                drill: {
                  en: 'Before checking the key, redo every flagged question untimed and write your reasoning. Compare timed and blind-review scores to separate timing gaps from logic gaps.',
                  uz: 'Kalitga qarashdan oldin belgilangan savollarni vaqtsiz qayta yeching va mulohazangizni yozing. Vaqtli va Blind Review natijalarini solishtirib, vaqt va mantiq kamchiliklarini ajrating.',
                },
                framework: 'Blind Review',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-lr-hardset',
                title: { en: 'Clear your hardest-question set', uz: 'Eng qiyin savollar toʻplamini yopish' },
                drill: {
                  en: 'Collect 20 questions you missed twice. Redo them untimed, then timed at about 84 seconds each (the LSAC average). Target 16/20.',
                  uz: 'Ikki marta xato qilgan 20 ta savolni yigʻing. Avval vaqtsiz, soʻng har biriga taxminan 84 soniya (LSAC oʻrtachasi) bilan qayta yeching. Maqsad: 16/20.',
                },
                framework: 'Repeat-Miss Set',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'lsat-p3',
        order: 3,
        title: { en: 'Phase 3 · Timed PrepTests and the writing sample', uz: '3-bosqich · Vaqtli PrepTestlar va yozma ish' },
        objective: {
          en: 'Sit full official PrepTests in the layout you will face, review each one fully and complete Argumentative Writing on time.',
          uz: 'Topshiradigan formatingizda toʻliq rasmiy PrepTestlar yechish, har birini toʻliq tahlil qilish va Argumentative Writingʼni oʻz vaqtida topshirish.',
        },
        modules: [
          {
            id: 'lsat-preptests',
            title: { en: 'Full PrepTests, Review and Argumentative Writing', uz: 'Toʻliq PrepTestlar, tahlil va Argumentative Writing' },
            summary: {
              en: 'Simulate test day in LawHub, review each test fully, track the score trend and complete the required (unscored) Argumentative Writing sample.',
              uz: 'LawHubʼda imtihon kunini simulyatsiya qilish, har bir testni tahlil qilish, ball dinamikasini kuzatish va majburiy (baholanmaydigan) Argumentative Writingʼni topshirish.',
            },
            baselineHours: 38,
            difficulty: 'executive',
            keyFramework: 'PrepTest + Blind Review + Log',
            steps: [
              {
                id: 'lsat-s13',
                title: { en: 'Full timed PrepTest in your test layout', uz: 'Oʻz formatingizda toʻliq vaqtli PrepTest' },
                drill: {
                  en: 'Sit a LawHub PrepTest with official timing and breaks. If you test from August 2027, use the new-format practice tests LSAC is adding to LawHub from February 2027.',
                  uz: 'LawHub PrepTestini rasmiy vaqt va tanaffuslar bilan yeching. Agar 2027-yil avgustdan keyin topshirsangiz, LSAC 2027-yil fevraldan LawHubʼga qoʻshadigan yangi formatdagi testlardan foydalaning.',
                },
                framework: 'Test-Day Simulation',
                estimatedMinutes: 120,
              },
              {
                id: 'lsat-s14',
                title: { en: 'Write the wrong-answer journal', uz: 'Notoʻgʻri javoblar jurnalini yozish' },
                drill: {
                  en: 'For each miss write two lines: why your choice was tempting and wrong, and the proof for the right answer. Add the pattern to your error log.',
                  uz: 'Har bir xato uchun 2 qator yozing: tanlovingiz nega jozibali, lekin notoʻgʻri boʻlgani va toʻgʻri javobning isboti. Qonuniyatni xatolar jurnaliga qoʻshing.',
                },
                framework: 'Temptation–Proof Audit',
                estimatedMinutes: 60,
              },
              {
                id: 'lsat-s15',
                title: { en: 'Timed Argumentative Writing practice essay', uz: 'Vaqtli Argumentative Writing mashq essesi' },
                drill: {
                  en: 'On a practice prompt (a debatable issue with 3–4 perspectives): 15 min prewriting, 35 min essay. Then rate it on LSAC’s list: reasoning, clarity, organization, language, mechanics.',
                  uz: 'Mashq mavzusida (3–4 nuqtai nazarli bahsli masala): 15 daqiqa reja, 35 daqiqa esse. Soʻng LSAC roʻyxati boʻyicha baholang: mulohaza, aniqlik, tuzilma, til, imlo.',
                },
                framework: '15 + 35 Minute Plan',
                estimatedMinutes: 75,
              },
              {
                id: 'lsat-pt-trend',
                title: { en: 'Second PrepTest and trend check', uz: 'Ikkinchi PrepTest va natija dinamikasi' },
                drill: {
                  en: 'Sit another full PrepTest and compare correct answers per section with the first. Pick the two tasks to fix this week from the log.',
                  uz: 'Yana bitta toʻliq PrepTest yeching va har boʻlimdagi toʻgʻri javoblarni birinchisi bilan solishtiring. Jurnaldan shu hafta tuzatiladigan 2 ta vazifa turini tanlang.',
                },
                framework: 'Score Trend',
                estimatedMinutes: 120,
              },
              {
                id: 'lsat-aw-schedule',
                title: { en: 'Schedule and complete the real writing sample', uz: 'Haqiqiy yozma ishni rejalash va topshirish' },
                drill: {
                  en: 'It opens in your LSAC account 8 days before your test and is remotely proctored on your own computer. Book a quiet slot; your score is not released without it.',
                  uz: 'U imtihondan 8 kun oldin LSAC akkauntingizda ochiladi va oʻz kompyuteringizda masofadan nazorat ostida topshiriladi. Tinch vaqtni band qiling: usiz ball eʼlon qilinmaydi.',
                },
                framework: 'Logistics Check',
                estimatedMinutes: 30,
              },
              {
                id: 'lsat-pt-final',
                title: { en: 'Final PrepTest and readiness decision', uz: 'Yakuniy PrepTest va tayyorlik qarori' },
                drill: {
                  en: 'Sit a final PrepTest 5–7 days before the test. If your last three scores average at or above target, keep the date; if not, decide whether to move it.',
                  uz: 'Imtihondan 5–7 kun oldin yakuniy PrepTest yeching. Oxirgi uchta natija oʻrtachasi maqsadga teng yoki yuqori boʻlsa, sanani saqlang; aks holda koʻchirish masalasini hal qiling.',
                },
                framework: 'Readiness Check',
                estimatedMinutes: 120,
              },
            ],
          },
        ],
      },
    ],
  },

  /* ───────────────────────────── SQE ───────────────────────────── */
  {
    id: 'sqe',
    category: 'legal',
    code: 'SQE1/2',
    title: {
      en: 'SQE1 and SQE2: Solicitors Qualifying Examination',
      uz: 'SQE1 va SQE2: solisitorlik malaka imtihoni',
    },
    subtitle: {
      en: 'FLK1 and FLK2 (170 single-best-answer questions each) and the 16 SQE2 oral and written skills assessments, per the SRA from 1 September 2026.',
      uz: 'FLK1 va FLK2 (har biri 170 ta single best answer savol) hamda SQE2ʼning 16 ta ogʻzaki va yozma topshirigʻi, SRA 2026-yil 1-sentabrdan.',
    },
    archetypeLabel: {
      en: 'England & Wales Solicitor',
      uz: 'Angliya va Uels solisitori',
    },
    recommendedWeeks: 26,
    baselineTotalHours: 400,
    examVersion: 'SQE1 and SQE2, SRA assessment specifications for assessments from 1 September 2026',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'SRA: SQE1 Assessment Specification (from 1 September 2026)', url: 'https://sqe.sra.org.uk/docs/default-source/pdfs/sqe1-assessment-specification-(from-1-september-2026).pdf?sfvrsn=9a3f672d_2' },
      { label: 'SRA: SQE1 FLK1 sample questions (original set, with SQE1 structure)', url: 'https://sqe.sra.org.uk/docs/default-source/pdfs/sqe1-flk1-original-sample-qs-updated-2-april-26.pdf?sfvrsn=87c505c7_2' },
      { label: 'SRA: SQE2 Assessment Specification (from 1 September 2026)', url: 'https://sqe.sra.org.uk/docs/default-source/pdfs/sqe2-assesment-specification-(from-1-september-2026).pdf' },
      { label: 'SRA: Assessments in SQE2 (from 1 September 2026)', url: 'https://sqe.sra.org.uk/docs/default-source/pdfs/assessments-in-sqe2-(from-1-september-2026).pdf?sfvrsn=2ba845bb_2' },
    ],
    phases: [
      {
        id: 'sqe-p1',
        order: 1,
        title: { en: 'Phase 1 · Diagnose and plan', uz: '1-bosqich · Diagnostika va rejalash' },
        objective: {
          en: 'Read the SRA specifications, measure your starting point on official sample questions and plan coverage of every FLK subject.',
          uz: 'SRA spetsifikatsiyalarini oʻqish, rasmiy namuna savollarda boshlangʻich darajani oʻlchash va har bir FLK fanini qamrab oluvchi reja tuzish.',
        },
        modules: [
          {
            id: 'sqe-diagnostic',
            title: { en: 'Specification, Baseline and Ethics Foundations', uz: 'Spetsifikatsiya, boshlangʻich test va etika asoslari' },
            summary: {
              en: 'Learn what SQE1 and SQE2 test, take timed baselines on the SRA sample questions and set up the ethics rules that run through every assessment.',
              uz: 'SQE1 va SQE2 nimani tekshirishini bilish, SRA namuna savollarida vaqtli boshlangʻich test va barcha imtihonlarda uchraydigan etika qoidalarini oʻrganish.',
            },
            baselineHours: 20,
            difficulty: 'foundational',
            keyFramework: 'Spec Map + Baseline',
            steps: [
              {
                id: 'sqe-diag-spec',
                title: { en: 'Map the SQE1 and SQE2 specifications', uz: 'SQE1 va SQE2 spetsifikatsiyalarini xaritalash' },
                drill: {
                  en: 'From the SRA specifications, list the subjects in FLK1 and FLK2, the five SQE2 practice areas and the law cut-off date for your window (four months before its first assessment).',
                  uz: 'SRA spetsifikatsiyalaridan FLK1 va FLK2 fanlarini, SQE2ʼning 5 ta amaliyot sohasini va oʻz sessiyangiz uchun qonun cut-off sanasini (birinchi imtihondan 4 oy oldin) yozib oling.',
                },
                framework: 'Spec Map',
                estimatedMinutes: 45,
              },
              {
                id: 'sqe-diag-flk1',
                title: { en: 'Timed FLK1 baseline on SRA sample questions', uz: 'SRA namuna savollarida vaqtli FLK1 testi' },
                drill: {
                  en: 'Answer 40 questions from the SRA’s original FLK1 sample set in 72 minutes (1.8 minutes each, closed book). Score them by subject.',
                  uz: 'SRAʼning FLK1 asl namuna toʻplamidan 40 ta savolga 72 daqiqada (har biriga 1,8 daqiqa, kitobsiz) javob bering. Natijani fanlar boʻyicha hisoblang.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-diag-flk2',
                title: { en: 'Timed FLK2 baseline on SRA sample questions', uz: 'SRA namuna savollarida vaqtli FLK2 testi' },
                drill: {
                  en: 'Answer 40 questions from the SRA’s original FLK2 sample set in 72 minutes, closed book. Score them by subject, including any Solicitors Accounts items.',
                  uz: 'SRAʼning FLK2 asl namuna toʻplamidan 40 ta savolga 72 daqiqada kitobsiz javob bering. Natijani fanlar boʻyicha, Solicitors Accounts savollari bilan birga hisoblang.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-diag-ethics',
                title: { en: 'Ethics foundations: SRA Principles and Code of Conduct', uz: 'Etika asoslari: SRA Principles va Code of Conduct' },
                drill: {
                  en: 'Summarise each SRA Principle in one line, and the Code of Conduct for Solicitors rules on conflicts, confidentiality and client identification on one page.',
                  uz: 'Har bir SRA Principleʼni bir qatorda, Code of Conduct for Solicitorsʼning manfaatlar toʻqnashuvi, maxfiylik va mijozni identifikatsiya qilish qoidalarini bir sahifada xulosa qiling.',
                },
                framework: 'Principles + Code Sheet',
                estimatedMinutes: 60,
              },
              {
                id: 'sqe-diag-plan',
                title: { en: 'Build a subject heat map and week plan', uz: 'Fanlar boʻyicha issiqlik xaritasi va haftalik reja' },
                drill: {
                  en: 'Rank all FLK subjects by baseline score. Give the weakest the most weeks, and fix the date you will move from SQE1 to SQE2 preparation.',
                  uz: 'Barcha FLK fanlarini boshlangʻich natija boʻyicha tartiblang. Eng zaiflariga koʻproq hafta ajrating va SQE1 dan SQE2 tayyorgarligiga oʻtish sanasini belgilang.',
                },
                framework: 'Heat Map Plan',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'sqe-p2',
        order: 2,
        title: { en: 'Phase 2 · Build: FLK1, FLK2 and SQE2 skills', uz: '2-bosqich · Asos: FLK1, FLK2 va SQE2 koʻnikmalari' },
        objective: {
          en: 'Apply the functioning legal knowledge of every subject to client problems, then use it in the six SQE2 legal skills assessments.',
          uz: 'Har bir fanning functioning legal knowledgeʼini mijoz muammolariga qoʻllash, soʻng uni SQE2ʼning 6 turdagi yuridik koʻnikma topshiriqlarida ishlatish.',
        },
        modules: [
          {
            id: 'sqe-flk1-core',
            title: { en: 'FLK1: Business, Dispute Resolution, Contract, Tort, Legal System, Legal Services', uz: 'FLK1: biznes, nizolarni hal qilish, shartnoma, delikt, huquq tizimi, yuridik xizmatlar' },
            summary: {
              en: 'Business Law and Practice, Dispute Resolution, Contract, Tort, the Legal System (incl. constitutional, administrative and EU law) and Legal Services, with ethics throughout.',
              uz: 'Business Law and Practice, Dispute Resolution, Contract, Tort, Legal System (konstitutsiyaviy, maʼmuriy va EU law bilan) va Legal Services; etika hamma joyda.',
            },
            baselineHours: 110,
            difficulty: 'intermediate',
            keyFramework: 'Rule Map + SBA Practice',
            steps: [
              {
                id: 'sqe-s1',
                title: { en: 'Business Law and Practice', uz: 'Business Law and Practice' },
                drill: {
                  en: 'Make one-page maps of company formation, directors’ duties, decision-making (board and shareholder resolutions), partnerships/LLPs, insolvency and business tax. Then do 40 SBA questions.',
                  uz: 'Kompaniya tashkil etish, direktor majburiyatlari, qaror qabul qilish (board va aksiyador qarorlari), partnership/LLP, bankrotlik va biznes soligʻi boʻyicha bir sahifali xaritalar tuzing. Soʻng 40 ta SBA savol.',
                },
                framework: 'Company Lifecycle Map',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-s2',
                title: { en: 'Dispute Resolution procedure timeline', uz: 'Dispute Resolution: protsessual vaqt jadvali' },
                drill: {
                  en: 'Draw one civil claim timeline: pre-action, issue and service, response, case management, summary judgment, Part 36 offers, trial, costs, enforcement. Then do 30 SBA questions.',
                  uz: 'Bitta fuqarolik daʼvosi jadvalini chizing: pre-action, daʼvo berish va topshirish, javob, case management, summary judgment, Part 36 takliflari, sud, xarajatlar, ijro. Soʻng 30 ta SBA savol.',
                },
                framework: 'Claim Timeline',
                estimatedMinutes: 100,
              },
              {
                id: 'sqe-flk1-contract-tort',
                title: { en: 'Contract and Tort rule maps', uz: 'Contract va Tort qoidalar xaritasi' },
                drill: {
                  en: 'Write rule maps for contract formation, terms, exclusion clauses, misrepresentation, breach and remedies, and for negligence and other torts in the FLK. Then do 40 SBA questions.',
                  uz: 'Shartnoma tuzilishi, shartlar, javobgarlikni cheklash bandlari, misrepresentation, buzish va himoya vositalari hamda negligence va FLKʼdagi boshqa deliktlar boʻyicha xaritalar yozing. Soʻng 40 ta SBA.',
                },
                framework: 'Element-by-Element Map',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-flk1-legal-system',
                title: { en: 'Legal System, constitutional, administrative and EU law', uz: 'Legal System, konstitutsiyaviy, maʼmuriy va EU law' },
                drill: {
                  en: 'Summarise sources of law, statutory interpretation, judicial review grounds and the law that differs in Wales, using the FLK1 outline. Then do 30 SBA questions.',
                  uz: 'FLK1 roʻyxati asosida huquq manbalari, qonunlarni talqin qilish, judicial review asoslari va Uelsda farq qiladigan qoidalarni xulosa qiling. Soʻng 30 ta SBA savol.',
                },
                framework: 'FLK Outline Checklist',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-flk1-legal-services',
                title: { en: 'Legal Services: regulation, money laundering, financial services', uz: 'Legal Services: tartibga solish, pul yuvish, moliyaviy xizmatlar' },
                drill: {
                  en: 'Make a one-page sheet on how legal services are regulated, money-laundering duties and financial services rules in the FLK1 outline. Then do 25 SBA questions.',
                  uz: 'FLK1 roʻyxatidagi yuridik xizmatlarni tartibga solish, pul yuvishga qarshi majburiyatlar va moliyaviy xizmatlar qoidalari boʻyicha bir sahifalik varaq tuzing. Soʻng 25 ta SBA.',
                },
                framework: 'Duty Checklist',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-s3',
                title: { en: 'Ethics inside FLK1 scenarios', uz: 'FLK1 vaziyatlarida etika' },
                drill: {
                  en: 'Work 25 ethics scenarios set in business and litigation matters (conflicts, confidentiality, undertakings, duty to the court). Name the Principle or Code rule for each answer.',
                  uz: 'Biznes va sud ishlaridagi 25 ta etika vaziyatini yeching (manfaatlar toʻqnashuvi, maxfiylik, undertakings, sud oldidagi burch). Har javob uchun tegishli Principle yoki Code qoidasini nomlang.',
                },
                framework: 'Principle-to-Rule Link',
                estimatedMinutes: 75,
              },
            ],
          },
          {
            id: 'sqe-flk2-core',
            title: { en: 'FLK2: Property, Wills, Accounts, Land, Trusts, Criminal Law and Practice', uz: 'FLK2: mulk, vasiyat, hisob, yer, trast, jinoyat huquqi va amaliyoti' },
            summary: {
              en: 'Property Practice, Wills and Administration of Estates, Solicitors Accounts, Land Law, Trusts, Criminal Liability and Criminal Practice; tax only in property, wills and business.',
              uz: 'Property Practice, Wills and Administration of Estates, Solicitors Accounts, Land Law, Trusts, Criminal Liability va Criminal Practice; soliq faqat mulk, vasiyat va biznes doirasida.',
            },
            baselineHours: 110,
            difficulty: 'intermediate',
            keyFramework: 'Transaction Map + SBA Practice',
            steps: [
              {
                id: 'sqe-s4',
                title: { en: 'Land Law and Property Practice', uz: 'Land Law va Property Practice' },
                drill: {
                  en: 'Map a freehold sale from instructions to post-completion, plus registered land, easements, covenants, mortgages and leases. Then do 40 SBA questions.',
                  uz: 'Freehold sotuvini topshiriqdan post-completionʼgacha, shuningdek registered land, easements, covenants, ipoteka va ijarani xaritalang. Soʻng 40 ta SBA savol.',
                },
                framework: 'Conveyancing Timeline',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-s5',
                title: { en: 'Wills, administration of estates and trusts', uz: 'Vasiyatnoma, meros boshqaruvi va trastlar' },
                drill: {
                  en: 'Chart will validity, intestacy, probate steps, inheritance tax on death, and trust creation and trustees’ duties. Then do 40 SBA questions, including 5 tax calculations.',
                  uz: 'Vasiyatnoma haqiqiyligi, intestacy, probate bosqichlari, oʻlimdagi meros soligʻi, trast tuzish va trastee majburiyatlarini jadvalga soling. Soʻng 40 ta SBA, shundan 5 tasi soliq hisobi.',
                },
                framework: 'Estate Flowchart',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-s6',
                title: { en: 'Solicitors Accounts in property and probate matters', uz: 'Property va probate ishlarida Solicitors Accounts' },
                drill: {
                  en: 'Post 20 client and business ledger entries for a sale, a purchase and an estate (receipts, transfers, bills, VAT). Check each against the SRA Accounts Rules.',
                  uz: 'Sotuv, xarid va meros ishi uchun 20 ta client va business ledger yozuvini kiriting (tushum, oʻtkazma, hisob, VAT). Har birini SRA Accounts Rules bilan tekshiring.',
                },
                framework: 'Double-Entry Ledger',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-flk2-crim-liability',
                title: { en: 'Criminal Liability', uz: 'Criminal Liability (jinoiy javobgarlik)' },
                drill: {
                  en: 'Build an elements table (actus reus, mens rea, defences) for each offence in the FLK2 outline, then do 30 SBA questions.',
                  uz: 'FLK2 roʻyxatidagi har bir jinoyat uchun elementlar jadvalini (actus reus, mens rea, himoya asoslari) tuzing, soʻng 30 ta SBA savol yeching.',
                },
                framework: 'Elements Table',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-flk2-crim-practice',
                title: { en: 'Criminal Law and Practice', uz: 'Criminal Law and Practice (jinoiy protsess)' },
                drill: {
                  en: 'Draw the case path from police station advice through bail, allocation between magistrates’ and Crown Court, trial and sentencing. Then do 30 SBA questions.',
                  uz: 'Ish yoʻlini politsiya boʻlimidagi maslahatdan bail, magistratesʼ yoki Crown Courtʼga taqsimlash, sud va jazo tayinlashgacha chizing. Soʻng 30 ta SBA savol.',
                },
                framework: 'Case Path Chart',
                estimatedMinutes: 90,
              },
            ],
          },
          {
            id: 'sqe-skills',
            title: { en: 'SQE2 Skills: Interview, Advocacy and the Four Written Tasks', uz: 'SQE2 koʻnikmalari: suhbat, advokatlik va 4 ta yozma topshiriq' },
            summary: {
              en: 'Practise each of the six SQE2 skills at its official timing. Skills and application of law (including ethics) are weighted equally across SQE2.',
              uz: 'SQE2ʼning 6 ta koʻnikmasini rasmiy vaqtda mashq qilish. SQE2 boʻyicha koʻnikmalar va qonunni qoʻllash (etika bilan) teng vaznga ega.',
            },
            baselineHours: 70,
            difficulty: 'intermediate',
            keyFramework: 'Official Timing + A–F Criteria',
            steps: [
              {
                id: 'sqe-s7',
                title: { en: 'Client interview and attendance note', uz: 'Mijoz bilan suhbat va attendance note' },
                drill: {
                  en: 'With a partner playing the client (Property or Wills matter): 10 min to read, 25 min interview, 25 min handwritten attendance note. Self-score on the five interview criteria.',
                  uz: 'Mijoz rolida sherik bilan (Property yoki Wills ishi): 10 daqiqa oʻqish, 25 daqiqa suhbat, 25 daqiqa qoʻlda attendance note. Suhbatning 5 ta mezoni boʻyicha oʻzingizni baholang.',
                },
                framework: 'Interview Criteria 1–5',
                estimatedMinutes: 70,
              },
              {
                id: 'sqe-s8',
                title: { en: 'Advocacy submission', uz: 'Sud oldida chiqish (advocacy)' },
                drill: {
                  en: 'Prepare a submission for 45 minutes, then deliver it in 15 minutes to a mock judge (Dispute Resolution or Criminal Litigation). Record it and score structure, persuasion and key facts.',
                  uz: '45 daqiqa tayyorlaning, keyin 15 daqiqada soxta sudya oldida chiqing (Dispute Resolution yoki Criminal Litigation). Yozib oling va tuzilma, ishontirish va asosiy faktlarni baholang.',
                },
                framework: 'Submission Structure',
                estimatedMinutes: 70,
              },
              {
                id: 'sqe-s9',
                title: { en: 'Case and matter analysis report', uz: 'Case and matter analysis hisoboti' },
                drill: {
                  en: 'In 60 minutes, write a report to a partner with legal analysis and client-focused advice on a case file, including options for negotiation where relevant.',
                  uz: '60 daqiqada ish materiallari asosida partnerga yuridik tahlil va mijozga yoʻnaltirilgan maslahatli hisobot yozing; kerak boʻlsa, muzokara variantlarini ham kiriting.',
                },
                framework: 'Facts–Law–Advice',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-skills-research',
                title: { en: 'Legal research note', uz: 'Yuridik tadqiqot xulosasi (legal research)' },
                drill: {
                  en: 'In 60 minutes, use a provided set of sources (some irrelevant) to write a note to a partner: your reasoning, the key sources relied on and the advice for the client.',
                  uz: '60 daqiqada berilgan manbalar toʻplamidan (baʼzilari keraksiz) foydalanib partnerga xulosa yozing: mulohazangiz, tayangan asosiy manbalar va mijozga maslahat.',
                },
                framework: 'Source Filter',
                estimatedMinutes: 75,
              },
              {
                id: 'sqe-skills-writing',
                title: { en: 'Legal writing: letter or email', uz: 'Legal writing: xat yoki email' },
                drill: {
                  en: 'In 30 minutes, write a letter or email for a named recipient (client, other side or partner) that applies the law correctly and fits that reader. Do two, with different recipients.',
                  uz: '30 daqiqada aniq qabul qiluvchi (mijoz, qarshi tomon yoki partner) uchun qonunni toʻgʻri qoʻllaydigan va oʻquvchiga mos xat yoki email yozing. Turli qabul qiluvchilarga 2 ta yozing.',
                },
                framework: 'Recipient-First Writing',
                estimatedMinutes: 70,
              },
              {
                id: 'sqe-skills-drafting',
                title: { en: 'Legal drafting', uz: 'Yuridik hujjat tuzish (legal drafting)' },
                drill: {
                  en: 'In 45 minutes, draft or amend a document or part of one (e.g., from a precedent). Check it is legally correct, complete and clearly structured.',
                  uz: '45 daqiqada hujjat yoki uning qismini tuzing yoki tahrirlang (masalan, precedent asosida). Yuridik jihatdan toʻgʻri, toʻliq va aniq tuzilganini tekshiring.',
                },
                framework: 'Precedent Mark-Up',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'sqe-p3',
        order: 3,
        title: { en: 'Phase 3 · Timed simulation', uz: '3-bosqich · Vaqtli simulyatsiya' },
        objective: {
          en: 'Work at SQE1 pace (about 1.8 minutes per question) and rehearse SQE2 oral and written days under official timing.',
          uz: 'SQE1 tezligida (har savolga taxminan 1,8 daqiqa) ishlash hamda SQE2 ogʻzaki va yozma kunlarini rasmiy vaqtda mashq qilish.',
        },
        modules: [
          {
            id: 'sqe-mocks',
            title: { en: 'SQE1 Timed Blocks and Targeted Review', uz: 'SQE1 vaqtli bloklar va maqsadli takrorlash' },
            summary: {
              en: 'Each FLK has 170 questions in two sessions of 85, with 2 hours 33 minutes per session. Build that pace in timed blocks and close the weakest subjects.',
              uz: 'Har bir FLK 170 ta savoldan iborat: 85 tadan ikki sessiya, har biri 2 soat 33 daqiqa. Shu tezlikni vaqtli bloklarda shakllantiring va eng zaif fanlarni yoping.',
            },
            baselineHours: 50,
            difficulty: 'executive',
            keyFramework: 'Timed Block + Review',
            steps: [
              {
                id: 'sqe-s10',
                title: { en: 'Timed FLK1 block on the remaining SRA samples', uz: 'Qolgan SRA namunalari asosida vaqtli FLK1 bloki' },
                drill: {
                  en: 'Do the 50 original FLK1 sample questions you did not use in the baseline in 90 minutes, closed book. Compare the score by subject with your baseline.',
                  uz: 'Boshlangʻich testda ishlatilmagan 50 ta FLK1 asl namuna savolini 90 daqiqada kitobsiz yeching. Fanlar boʻyicha natijani boshlangʻich test bilan solishtiring.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 100,
              },
              {
                id: 'sqe-mock-flk2',
                title: { en: 'Timed FLK2 block on the remaining SRA samples', uz: 'Qolgan SRA namunalari asosida vaqtli FLK2 bloki' },
                drill: {
                  en: 'Do the 50 unused original FLK2 sample questions in 90 minutes, closed book. Compare by subject with your baseline and list the three weakest subjects.',
                  uz: 'Ishlatilmagan 50 ta FLK2 asl namuna savolini 90 daqiqada kitobsiz yeching. Fanlar boʻyicha boshlangʻich test bilan solishtiring va eng zaif 3 ta fanni yozing.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 100,
              },
              {
                id: 'sqe-s11',
                title: { en: 'Patch the three weakest subjects', uz: 'Eng zaif 3 ta fanni tuzatish' },
                drill: {
                  en: 'For each of your three weakest subjects, write a one-page rules-and-exceptions sheet, then retest with 20 fresh SBA questions. Target a 10-point rise.',
                  uz: 'Eng zaif 3 ta fanning har biri uchun bir sahifalik qoidalar va istisnolar varagʻini yozing, soʻng 20 ta yangi SBA savol bilan qayta tekshiring. Maqsad: 10 foizga oshish.',
                },
                framework: 'Exception Sheet',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-mock-mixed',
                title: { en: 'Mixed 60-question block at exam pace', uz: 'Imtihon tezligida aralash 60 savollik blok' },
                drill: {
                  en: 'From a question bank, do 60 mixed questions from one FLK in 108 minutes with no breaks. Note where your pace dropped and which subjects cost the most time.',
                  uz: 'Savollar bankidan bitta FLK boʻyicha 60 ta aralash savolni 108 daqiqada tanaffussiz yeching. Tezlik qayerda pasayganini va qaysi fanlar koʻp vaqt olganini yozing.',
                },
                framework: 'Stamina Block',
                estimatedMinutes: 115,
              },
              {
                id: 'sqe-mock-logistics',
                title: { en: 'Check the cut-off date and exam-day rules', uz: 'Cut-off sana va imtihon kuni qoidalarini tekshirish' },
                drill: {
                  en: 'Confirm your assessment dates and the law cut-off date for your window on the SRA site, and list any law changes up to that date to revise.',
                  uz: 'SRA saytida imtihon sanalaringiz va sessiyangiz uchun qonun cut-off sanasini tasdiqlang, shu sanagacha boʻlgan qonun oʻzgarishlarini takrorlash uchun roʻyxatga oling.',
                },
                framework: 'Cut-Off Check',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'sqe-sqe2-sim',
            title: { en: 'SQE2 Oral and Written Rehearsal', uz: 'SQE2 ogʻzaki va yozma kunlar mashqi' },
            summary: {
              en: 'SQE2 has 4 oral assessments over two half days and 12 written ones over three half days. Rehearse them back to back and mark against the A–F criteria.',
              uz: 'SQE2ʼda ikki yarim kunda 4 ta ogʻzaki va uch yarim kunda 12 ta yozma topshiriq bor. Ularni ketma-ket mashq qiling va A–F mezonlari boʻyicha baholang.',
            },
            baselineHours: 40,
            difficulty: 'executive',
            keyFramework: 'Back-to-Back Stations',
            steps: [
              {
                id: 'sqe-s12',
                title: { en: 'Oral half-day rehearsal', uz: 'Ogʻzaki yarim kun mashqi' },
                drill: {
                  en: 'Back to back: one advocacy (45 + 15 min) and one interview with attendance note (10 + 25 + 25 min), in different practice areas. Have a partner mark each criterion A–F.',
                  uz: 'Ketma-ket: bitta advocacy (45 + 15 daqiqa) va attendance note bilan bitta suhbat (10 + 25 + 25 daqiqa), turli sohalarda. Sherik har bir mezonni A–F boʻyicha baholasin.',
                },
                framework: 'Oral Day Simulation',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-sim-written-a',
                title: { en: 'Written rehearsal: analysis and research', uz: 'Yozma mashq: tahlil va tadqiqot' },
                drill: {
                  en: 'Do a case and matter analysis (60 min) and a legal research task (60 min) back to back, in Dispute Resolution or Criminal Litigation. Mark both against the criteria.',
                  uz: 'Case and matter analysis (60 daqiqa) va legal research (60 daqiqa) topshiriqlarini Dispute Resolution yoki Criminal Litigation doirasida ketma-ket bajaring. Ikkalasini mezonlar boʻyicha baholang.',
                },
                framework: 'Written Day Simulation',
                estimatedMinutes: 120,
              },
              {
                id: 'sqe-sim-written-b',
                title: { en: 'Written rehearsal: writing and drafting', uz: 'Yozma mashq: xat va hujjat tuzish' },
                drill: {
                  en: 'Do a legal writing task (30 min) and a drafting task (45 min) back to back in Property Practice or Wills. Check that you spotted any unflagged ethics issue.',
                  uz: 'Legal writing (30 daqiqa) va drafting (45 daqiqa) topshiriqlarini Property Practice yoki Wills doirasida ketma-ket bajaring. Belgilanmagan etika masalasini topganingizni tekshiring.',
                },
                framework: 'Written Day Simulation',
                estimatedMinutes: 90,
              },
              {
                id: 'sqe-sim-business',
                title: { en: 'Business Law and Practice written set', uz: 'Business Law and Practice yozma toʻplami' },
                drill: {
                  en: 'One written day is all Business Law and Practice. Do a case and matter analysis (60 min) and a drafting task (45 min) in a company matter, and mark both.',
                  uz: 'Yozma kunlardan biri toʻliq Business Law and Practiceʼga bagʻishlangan. Kompaniya ishida case and matter analysis (60 daqiqa) va drafting (45 daqiqa) bajaring va baholang.',
                },
                framework: 'Practice-Area Set',
                estimatedMinutes: 115,
              },
              {
                id: 'sqe-sim-review',
                title: { en: 'Compare with SRA sample answers', uz: 'SRA namuna javoblari bilan solishtirish' },
                drill: {
                  en: 'Take two SRA SQE2 sample questions, answer them on time, then compare with the SRA’s indicative answers. List three gaps in law and three in skills to fix.',
                  uz: 'SRAʼning 2 ta SQE2 namuna savolini vaqtida yeching, soʻng SRAʼning indicative answers bilan solishtiring. Tuzatish uchun qonundagi 3 ta va koʻnikmadagi 3 ta kamchilikni yozing.',
                },
                framework: 'Indicative Answer Gap List',
                estimatedMinutes: 90,
              },
            ],
          },
        ],
      },
    ],
  },

  /* ───────────────────────────── UBE (current) ───────────────────────────── */
  {
    id: 'bar-ube',
    category: 'legal',
    code: 'UBE-BAR',
    title: {
      en: 'Uniform Bar Exam (current MBE, MEE, MPT format, through February 2028)',
      uz: 'Uniform Bar Exam (amaldagi MBE, MEE, MPT formati, 2028-yil fevralgacha)',
    },
    subtitle: {
      en: 'For jurisdictions still on the current UBE: 200-question MBE, six 30-minute MEE essays and two 90-minute MPTs. Not the NextGen bar exam.',
      uz: 'Hali amaldagi UBEʼni oʻtkazayotgan yurisdiksiyalar uchun: 200 savollik MBE, oltita 30 daqiqalik MEE essesi va ikkita 90 daqiqalik MPT. NextGen uchun emas.',
    },
    archetypeLabel: {
      en: 'US Bar Admission',
      uz: 'AQSh advokatura imtihoni',
    },
    recommendedWeeks: 20,
    baselineTotalHours: 320,
    examVersion: 'Current (legacy) UBE: MBE 50%, MEE 30%, MPT 20%; last administration February 2028',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'NCBE: Uniform Bar Examination (UBE)', url: 'https://www.ncbex.org/exams/ube' },
      { label: 'NCBE: Multistate Bar Examination (MBE)', url: 'https://www.ncbex.org/exams/mbe' },
      { label: 'NCBE: Preparing for the MBE (subjects, outline, sample questions)', url: 'https://www.ncbex.org/exams/mbe/preparing-mbe' },
      { label: 'NCBE: Multistate Essay Examination (MEE)', url: 'https://www.ncbex.org/exams/mee' },
      { label: 'NCBE: Preparing for the MEE (outline, released questions)', url: 'https://www.ncbex.org/exams/mee/preparing-mee' },
      { label: 'NCBE: Multistate Performance Test (MPT)', url: 'https://www.ncbex.org/exams/mpt' },
      { label: 'NCBE: Preparing for the MPT (skills, released MPTs, point sheets)', url: 'https://www.ncbex.org/exams/mpt/preparing-mpt' },
      { label: 'NCBE: Some subjects to be removed from the MEE in 2026', url: 'https://www.ncbex.org/news-resources/some-subjects-be-removed-mee-2026' },
    ],
    phases: [
      {
        id: 'bar-p1',
        order: 1,
        title: { en: 'Phase 1 · Confirm your exam and diagnose', uz: '1-bosqich · Imtihonni aniqlash va diagnostika' },
        objective: {
          en: 'Make sure you sit the current UBE, learn its scope from NCBE’s outlines and measure a baseline on each of MBE, MEE and MPT.',
          uz: 'Amaldagi UBEʼni topshirishingizga ishonch hosil qilish, NCBE roʻyxatlaridan uning qamrovini bilish va MBE, MEE, MPT boʻyicha boshlangʻich darajani oʻlchash.',
        },
        modules: [
          {
            id: 'bar-diagnostic',
            title: { en: 'Exam Check and Baseline', uz: 'Imtihonni tekshirish va boshlangʻich test' },
            summary: {
              en: 'Confirm UBE versus NextGen with your jurisdiction, list the tested subjects and take a short timed baseline on each component with NCBE’s free materials.',
              uz: 'Yurisdiksiyangizda UBE yoki NextGen ekanini aniqlang, imtihon fanlarini roʻyxatga oling va NCBEʼning bepul materiallarida har bir qism boʻyicha qisqa vaqtli test qiling.',
            },
            baselineHours: 20,
            difficulty: 'foundational',
            keyFramework: 'Jurisdiction Check + Baseline',
            steps: [
              {
                id: 'bar-diag-jurisdiction',
                title: { en: 'Confirm UBE or NextGen with your jurisdiction', uz: 'Yurisdiksiyangizda UBE yoki NextGen ekanini aniqlash' },
                drill: {
                  en: 'On your bar admission agency’s site, confirm whether your sitting is the current UBE or NextGen, the exam dates, the passing score and any local law component. Write them down.',
                  uz: 'Bar admission idorasi saytida sessiyangiz amaldagi UBE yoki NextGen ekanini, imtihon sanalarini, oʻtish ballini va mahalliy huquq qismini tasdiqlang. Ularni yozib qoʻying.',
                },
                framework: 'Jurisdiction Check',
                estimatedMinutes: 30,
              },
              {
                id: 'bar-diag-scope',
                title: { en: 'Map the tested subjects from NCBE’s outlines', uz: 'NCBE roʻyxatlaridan imtihon fanlarini xaritalash' },
                drill: {
                  en: 'From the MBE and MEE subject matter outlines, list the 7 MBE subjects and the MEE areas. Note that from July 2026 the MEE no longer tests Conflict of Laws, Family Law, Trusts and Estates or Secured Transactions.',
                  uz: 'MBE va MEE subject matter outlineʼlaridan 7 ta MBE fani va MEE sohalarini yozing. Eʼtibor bering: 2026-yil iyuldan MEE Conflict of Laws, Family Law, Trusts and Estates va Secured Transactionsʼni tekshirmaydi.',
                },
                framework: 'Outline Map',
                estimatedMinutes: 60,
              },
              {
                id: 'bar-diag-mbe',
                title: { en: 'MBE baseline on NCBE sample questions', uz: 'NCBE namuna savollarida MBE boshlangʻich testi' },
                drill: {
                  en: 'Answer NCBE’s free MBE sample questions at the real pace (100 questions per 3 hours, about 1.8 minutes each). Score by subject.',
                  uz: 'NCBEʼning bepul MBE namuna savollariga haqiqiy tezlikda javob bering (3 soatda 100 ta, har biriga taxminan 1,8 daqiqa). Natijani fanlar boʻyicha hisoblang.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 90,
              },
              {
                id: 'bar-diag-mee',
                title: { en: 'MEE baseline essay', uz: 'MEE boshlangʻich essesi' },
                drill: {
                  en: 'Write one released MEE question (2016–2020, with free analysis) in 30 minutes, on a subject still tested. Compare with NCBE’s analysis and count issues found vs missed.',
                  uz: 'Hali tekshiriladigan fan boʻyicha bitta eʼlon qilingan MEE savolini (2016–2020, bepul tahlil bilan) 30 daqiqada yozing. NCBE tahlili bilan solishtirib, topilgan va oʻtkazilgan masalalarni sanang.',
                },
                framework: 'Issue Count',
                estimatedMinutes: 60,
              },
              {
                id: 'bar-diag-mpt',
                title: { en: 'MPT baseline', uz: 'MPT boshlangʻich testi' },
                drill: {
                  en: 'Do one free released MPT (2016–2020) in 90 minutes, then grade it with NCBE’s point sheet. Note whether time ran out in reading or in writing.',
                  uz: 'Bitta bepul eʼlon qilingan MPTʼni (2016–2020) 90 daqiqada bajaring, soʻng NCBE point sheet bilan baholang. Vaqt oʻqishda yoki yozishda tugaganini yozing.',
                },
                framework: 'Point Sheet Grading',
                estimatedMinutes: 120,
              },
            ],
          },
        ],
      },
      {
        id: 'bar-p2',
        order: 2,
        title: { en: 'Phase 2 · Build: MBE, MEE and MPT', uz: '2-bosqich · Asos: MBE, MEE va MPT' },
        objective: {
          en: 'Learn the black-letter law of the seven MBE subjects plus Business Associations, write rule-based essays and handle MPT files and libraries.',
          uz: '7 ta MBE fani va Business Associationsʼning asosiy qoidalarini oʻrganish, qoidaga asoslangan esselar yozish va MPT File va Library bilan ishlash.',
        },
        modules: [
          {
            id: 'bar-mbe-core',
            title: { en: 'MBE: The Seven Subjects', uz: 'MBE: yettita fan' },
            summary: {
              en: '175 scored questions, 25 from each of seven subjects, plus 25 unscored. Outline each subject from NCBE’s outline and drill it at 1.8 minutes per question.',
              uz: '175 ta baholanadigan savol (7 ta fanning har biridan 25 tadan) va 25 ta baholanmaydigan savol. Har bir fanni NCBE outline asosida konspekt qiling va har savolga 1,8 daqiqa bilan mashq qiling.',
            },
            baselineHours: 120,
            difficulty: 'intermediate',
            keyFramework: 'Outline + Timed Sets',
            steps: [
              {
                id: 'bar-s1',
                title: { en: 'Contracts (common law and UCC Article 2)', uz: 'Contracts (common law va UCC Article 2)' },
                drill: {
                  en: 'Write a one-page attack outline (formation, defenses, terms, performance and breach, remedies; common law vs UCC Article 2). Then do 33 questions in 60 minutes and log misses.',
                  uz: 'Bir sahifalik reja yozing (tuzilish, himoya asoslari, shartlar, ijro va buzish, himoya vositalari; common law va UCC Article 2 farqi). Soʻng 60 daqiqada 33 ta savol va xatolarni jurnalga yozing.',
                },
                framework: 'Attack Outline',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-s2',
                title: { en: 'Torts', uz: 'Torts (deliktlar)' },
                drill: {
                  en: 'Outline intentional torts, negligence (duty, breach, causation, damages, defenses), strict and products liability and other torts in the outline. Then 33 questions in 60 minutes.',
                  uz: 'Qasddan deliktlar, negligence (burch, buzish, sababiyat, zarar, himoya), qatʼiy va mahsulot javobgarligi hamda outlineʼdagi boshqa deliktlarni konspekt qiling. Soʻng 60 daqiqada 33 ta savol.',
                },
                framework: 'Elements Checklist',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-s3',
                title: { en: 'Evidence', uz: 'Evidence (dalillar)' },
                drill: {
                  en: 'Draw a hearsay flowchart (definition, non-hearsay, exclusions, exceptions) and a relevance/character/impeachment sheet under the Federal Rules. Then 33 questions in 60 minutes.',
                  uz: 'Federal Rules boʻyicha hearsay sxemasi (taʼrif, hearsay emaslar, istisnolar) va relevance/character/impeachment varagʻini tuzing. Soʻng 60 daqiqada 33 ta savol.',
                },
                framework: 'Hearsay Flowchart',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-mbe-civpro',
                title: { en: 'Civil Procedure', uz: 'Civil Procedure (fuqarolik protsessi)' },
                drill: {
                  en: 'Outline jurisdiction and venue, the law applied in federal court, pleadings, joinder, discovery, pretrial motions, trial and appeal. Then 33 questions in 60 minutes.',
                  uz: 'Yurisdiksiya va venue, federal sudda qoʻllaniladigan huquq, pleadings, joinder, discovery, sudgacha arizalar, sud va apellyatsiyani konspekt qiling. Soʻng 60 daqiqada 33 ta savol.',
                },
                framework: 'Case Lifecycle Outline',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-mbe-conlaw-crim',
                title: { en: 'Constitutional Law and Criminal Law and Procedure', uz: 'Constitutional Law va Criminal Law and Procedure' },
                drill: {
                  en: 'Make a levels-of-scrutiny chart and a Fourth/Fifth/Sixth Amendment sheet, plus crime elements and defenses. Then 33 questions in 60 minutes, split across both subjects.',
                  uz: 'Scrutiny darajalari jadvali, Fourth/Fifth/Sixth Amendment varagʻi va jinoyat elementlari hamda himoya asoslarini tuzing. Soʻng ikki fan boʻyicha 60 daqiqada 33 ta savol.',
                },
                framework: 'Scrutiny + Amendment Charts',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-mbe-property',
                title: { en: 'Real Property', uz: 'Real Property (koʻchmas mulk)' },
                drill: {
                  en: 'Outline estates and future interests, co-tenancy, landlord–tenant, servitudes, conveyancing and recording, and mortgages. Then 33 questions in 60 minutes.',
                  uz: 'Estates va future interests, birgalikdagi egalik, ijara munosabatlari, servitutlar, mulkni oʻtkazish va roʻyxatga olish hamda ipotekani konspekt qiling. Soʻng 60 daqiqada 33 ta savol.',
                },
                framework: 'Property Interest Map',
                estimatedMinutes: 110,
              },
            ],
          },
          {
            id: 'bar-mee',
            title: { en: 'MEE: Rule-Based Essays', uz: 'MEE: qoidaga asoslangan esselar' },
            summary: {
              en: 'Six 30-minute essays, 30% of the UBE score. Areas: Business Associations, Civil Procedure, Constitutional Law, Contracts, Criminal Law, Evidence, Real Property, Torts.',
              uz: 'Oltita 30 daqiqalik esse, UBE ballining 30%. Sohalar: Business Associations, Civil Procedure, Constitutional Law, Contracts, Criminal Law, Evidence, Real Property, Torts.',
            },
            baselineHours: 70,
            difficulty: 'intermediate',
            keyFramework: 'IRAC per Issue',
            steps: [
              {
                id: 'bar-s4',
                title: { en: 'IRAC structure under 30 minutes', uz: '30 daqiqada IRAC tuzilmasi' },
                drill: {
                  en: 'Write two released MEE essays at 30 minutes each: one heading per call of the question, then issue, rule, application to the facts and a short conclusion.',
                  uz: 'Ikkita eʼlon qilingan MEE essesini har biri 30 daqiqada yozing: savolning har bir talabi uchun sarlavha, soʻng issue, rule, faktlarga qoʻllash va qisqa xulosa.',
                },
                framework: 'IRAC',
                estimatedMinutes: 75,
              },
              {
                id: 'bar-s5',
                title: { en: 'Issue spotting on six fact patterns', uz: 'Oltita fakt toʻplamida masalalarni topish' },
                drill: {
                  en: 'For six released MEE questions, spend 8 minutes each listing issues only. Check each list against NCBE’s analysis and track your hit rate.',
                  uz: 'Oltita eʼlon qilingan MEE savolining har biriga 8 daqiqa ajratib, faqat masalalar roʻyxatini tuzing. Har birini NCBE tahlili bilan solishtirib, topish foizini kuzating.',
                },
                framework: 'Issue List',
                estimatedMinutes: 70,
              },
              {
                id: 'bar-s6',
                title: { en: 'Business Associations essays', uz: 'Business Associations esselari' },
                drill: {
                  en: 'Business Associations is on the MEE but not the MBE. Write a rule sheet (agency, partnership, corporations, LLCs), then two timed essays graded against NCBE’s analyses.',
                  uz: 'Business Associations MEEʼda bor, lekin MBEʼda yoʻq. Qoidalar varagʻini yozing (agency, partnership, corporations, LLC), soʻng NCBE tahlili bilan baholanadigan 2 ta vaqtli esse.',
                },
                framework: 'Rule Sheet + Timed Essay',
                estimatedMinutes: 100,
              },
              {
                id: 'bar-mee-rules',
                title: { en: 'Memorise essay-ready rule statements', uz: 'Essega tayyor qoida taʼriflarini yodlash' },
                drill: {
                  en: 'Write 40 one-sentence rule statements across the MEE areas from memory, then check them against your outlines. Rewrite any that miss an element.',
                  uz: 'MEE sohalari boʻyicha 40 ta bir jumlalik qoida taʼrifini yoddan yozing, soʻng konspektlaringiz bilan tekshiring. Elementi tushib qolganlarini qayta yozing.',
                },
                framework: 'Rule Statement Bank',
                estimatedMinutes: 60,
              },
              {
                id: 'bar-mee-grade',
                title: { en: 'Self-grade against NCBE analyses', uz: 'NCBE tahlillari boʻyicha oʻzini baholash' },
                drill: {
                  en: 'Grade four of your essays against NCBE’s analyses: one point per issue spotted, rule stated and fact applied. Write the one habit to change next.',
                  uz: 'Toʻrtta essengizni NCBE tahlillari bilan baholang: topilgan har bir masala, aytilgan qoida va qoʻllangan fakt uchun bir ball. Keyingi safar oʻzgartiriladigan bitta odatni yozing.',
                },
                framework: 'Issue–Rule–Fact Score',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'bar-mpt',
            title: { en: 'MPT: Performance Tests', uz: 'MPT: amaliy topshiriqlar' },
            summary: {
              en: 'Two 90-minute tasks, 20% of the UBE score. Work only from the File and Library to write a memo, brief, letter or other lawyering document.',
              uz: 'Ikkita 90 daqiqalik topshiriq, UBE ballining 20%. Faqat File va Library asosida memo, brief, xat yoki boshqa yuridik hujjat yozish.',
            },
            baselineHours: 45,
            difficulty: 'intermediate',
            keyFramework: 'Task Memo → Library → File',
            steps: [
              {
                id: 'bar-s7',
                title: { en: 'Read the File and Library with a plan', uz: 'File va Libraryʼni reja bilan oʻqish' },
                drill: {
                  en: 'On two released MPTs, read the task memo first, extract rules from the Library into an outline, then pull the facts from the File. Stop planning at 45 minutes.',
                  uz: 'Ikkita eʼlon qilingan MPTʼda avval topshiriq memosini oʻqing, Libraryʼdagi qoidalarni rejaga chiqaring, soʻng Fileʼdan faktlarni oling. Rejalashtirishni 45-daqiqada toʻxtating.',
                },
                framework: 'Read-and-Outline Split',
                estimatedMinutes: 100,
              },
              {
                id: 'bar-s8',
                title: { en: 'Objective memo to a supervising attorney', uz: 'Rahbar advokatga obyektiv memo' },
                drill: {
                  en: 'Write a full objective memo MPT in 90 minutes, then grade it with the point sheet. Check that every rule cites the Library source.',
                  uz: 'Toʻliq obyektiv memo MPTʼni 90 daqiqada yozing, soʻng point sheet bilan baholang. Har bir qoida Library manbasiga havola qilinganini tekshiring.',
                },
                framework: 'Objective Memo',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-s9',
                title: { en: 'Persuasive brief or memo', uz: 'Ishontiruvchi brief yoki memo' },
                drill: {
                  en: 'Write a persuasive MPT in 90 minutes with argumentative point headings, and deal with the unhelpful authority. Grade it with the point sheet.',
                  uz: 'Ishontiruvchi MPTʼni 90 daqiqada argumentli sarlavhalar bilan yozing va noqulay manbaga ham javob bering. Point sheet bilan baholang.',
                },
                framework: 'Point Headings',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-mpt-formats',
                title: { en: 'Other task formats', uz: 'Boshqa topshiriq formatlari' },
                drill: {
                  en: 'Outline (do not write in full) three MPTs in other formats NCBE lists, such as a client letter, contract provision or discovery plan, in 30 minutes each. Compare with the point sheets.',
                  uz: 'NCBE sanagan boshqa formatlardagi 3 ta MPTʼni (masalan, mijozga xat, shartnoma bandi yoki discovery rejasi) har biri 30 daqiqada rejalang (toʻliq yozmang). Point sheet bilan solishtiring.',
                },
                framework: 'Format Templates',
                estimatedMinutes: 100,
              },
              {
                id: 'bar-mpt-ethics',
                title: { en: 'Facts sorting and ethics check', uz: 'Faktlarni saralash va etika tekshiruvi' },
                drill: {
                  en: 'On your four graded MPTs, list facts you used that were irrelevant and relevant facts you missed, and whether an ethics issue was present. Fix your checklist.',
                  uz: 'Baholangan 4 ta MPTʼingizda ishlatilgan keraksiz faktlarni, tushib qolgan muhim faktlarni va etika masalasi bor-yoʻqligini yozing. Nazorat roʻyxatingizni yangilang.',
                },
                framework: 'Fact Relevance Audit',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'bar-p3',
        order: 3,
        title: { en: 'Phase 3 · Timed simulation', uz: '3-bosqich · Vaqtli simulyatsiya' },
        objective: {
          en: 'Work at real exam pace on every component, close the weakest MBE subjects and arrive with the logistics settled.',
          uz: 'Har bir qismda haqiqiy imtihon tezligida ishlash, eng zaif MBE fanlarini yopish va imtihon kuni tashkiliy masalalarni hal qilib kelish.',
        },
        modules: [
          {
            id: 'bar-sim',
            title: { en: 'Timed Blocks and Final Review', uz: 'Vaqtli bloklar va yakuniy takrorlash' },
            summary: {
              en: 'The MBE is two 3-hour sessions of 100 questions; the MEE gives 30 minutes per essay; each MPT is 90 minutes. Rehearse each pace and fix what the blocks reveal.',
              uz: 'MBE 100 savollik ikkita 3 soatlik sessiya; MEEʼda har essega 30 daqiqa; har bir MPT 90 daqiqa. Har bir tezlikni mashq qiling va bloklarda chiqqan kamchiliklarni tuzating.',
            },
            baselineHours: 65,
            difficulty: 'executive',
            keyFramework: 'Timed Block + Review',
            steps: [
              {
                id: 'bar-s10',
                title: { en: 'Mixed MBE block at exam pace', uz: 'Imtihon tezligida aralash MBE bloki' },
                drill: {
                  en: 'Do 60 mixed-subject MBE questions in 108 minutes without a break. Score by subject and compare with your baseline.',
                  uz: '60 ta aralash MBE savolini 108 daqiqada tanaffussiz yeching. Fanlar boʻyicha hisoblang va boshlangʻich natija bilan solishtiring.',
                },
                framework: '1.8-Minute Pace',
                estimatedMinutes: 120,
              },
              {
                id: 'bar-s11',
                title: { en: 'Three MEE essays in 90 minutes', uz: '90 daqiqada uchta MEE essesi' },
                drill: {
                  en: 'Write three released MEE essays back to back in 90 minutes, in subjects you have not yet written on. Grade them against NCBE’s analyses.',
                  uz: 'Hali yozmagan fanlaringiz boʻyicha uchta eʼlon qilingan MEE essesini ketma-ket 90 daqiqada yozing. NCBE tahlillari bilan baholang.',
                },
                framework: '30-Minute Cap',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-s12',
                title: { en: 'Timed MPT with point-sheet grading', uz: 'Vaqtli MPT va point sheet bilan baholash' },
                drill: {
                  en: 'Do one unseen released MPT in exactly 90 minutes, then grade it with the point sheet. Target: no issue on the point sheet left untouched.',
                  uz: 'Bitta koʻrilmagan MPTʼni aniq 90 daqiqada bajaring, soʻng point sheet bilan baholang. Maqsad: point sheetʼdagi birorta masala eʼtiborsiz qolmasin.',
                },
                framework: '90-Minute MPT',
                estimatedMinutes: 120,
              },
              {
                id: 'bar-sim-mee2',
                title: { en: 'Second MEE set including the newest questions', uz: 'Eng yangi savollar bilan ikkinchi MEE toʻplami' },
                drill: {
                  en: 'Write three more essays in 90 minutes, including at least one from NCBE’s July 2026 MEE questions. Check rules from your outlines, since those have no free analysis.',
                  uz: 'Yana uchta esseni 90 daqiqada yozing, kamida bittasi NCBEʼning 2026-yil iyul MEE savollaridan boʻlsin. Ularning bepul tahlili yoʻq, shuning uchun qoidalarni konspektingizdan tekshiring.',
                },
                framework: '30-Minute Cap',
                estimatedMinutes: 110,
              },
              {
                id: 'bar-sim-weak',
                title: { en: 'Final review of the weakest MBE subjects', uz: 'Eng zaif MBE fanlarini yakuniy takrorlash' },
                drill: {
                  en: 'Take your three weakest MBE subjects by miss rate. Rewrite a one-page rule sheet for each and do 30 fresh questions; target 10 points above your baseline.',
                  uz: 'Xato foizi boʻyicha eng zaif 3 ta MBE fanini oling. Har biri uchun bir sahifalik qoidalar varagʻini qayta yozing va 30 ta yangi savol yeching; maqsad boshlangʻichdan 10 foiz yuqori.',
                },
                framework: 'Weak-Subject Sprint',
                estimatedMinutes: 100,
              },
              {
                id: 'bar-sim-logistics',
                title: { en: 'Settle exam-day logistics', uz: 'Imtihon kuni tashkiliy masalalarini hal qilish' },
                drill: {
                  en: 'From your jurisdiction’s instructions, confirm the two exam days, laptop software and registration, ID, permitted items and travel. Write a one-page checklist.',
                  uz: 'Yurisdiksiyangiz koʻrsatmalaridan ikki imtihon kunini, noutbuk dasturi va roʻyxatdan oʻtishni, hujjat, ruxsat etilgan narsalar va yoʻlni tasdiqlang. Bir sahifalik roʻyxat tuzing.',
                },
                framework: 'Exam-Day Checklist',
                estimatedMinutes: 30,
              },
            ],
          },
        ],
      },
    ],
  },

  /* ───────────────────────────── TOLES ───────────────────────────── */
  {
    id: 'toles',
    category: 'legal',
    code: 'TOLES-ADV',
    title: {
      en: 'TOLES Advanced: Legal English for Commercial Law',
      uz: 'TOLES Advanced: tijorat huquqi uchun yuridik ingliz tili',
    },
    subtitle: {
      en: 'Online proctored TOLES Advanced: 140 reading and writing questions in 120 minutes on legal vocabulary and grammar.',
      uz: 'Onlayn nazorat ostidagi TOLES Advanced: yuridik lugʻat va grammatika boʻyicha 120 daqiqada 140 ta reading va writing savoli.',
    },
    archetypeLabel: {
      en: 'International Commercial Law',
      uz: 'Xalqaro tijorat huquqi',
    },
    recommendedWeeks: 6,
    baselineTotalHours: 60,
    examVersion: 'TOLES Advanced (online, proctored): 12 sections, 140 questions, 120 minutes',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'TOLES official site (Global Legal English Ltd)', url: 'https://toleslegal.com/' },
      { label: 'About TOLES: levels and ownership', url: 'https://toleslegal.com/about/' },
      { label: 'TOLES Advanced exam', url: 'https://toleslegal.com/the-toles-advanced-exam-demo/' },
      { label: 'TOLES Higher exam', url: 'https://toleslegal.com/the-toles-higher-exam-demo/' },
      { label: 'TOLES Foundation exam', url: 'https://toleslegal.com/the-toles-foundation-exam-demo/' },
    ],
    phases: [
      {
        id: 'toles-p1',
        order: 1,
        title: { en: 'Phase 1 · Choose the level and diagnose', uz: '1-bosqich · Darajani tanlash va diagnostika' },
        objective: {
          en: 'Confirm Advanced is the right level, measure a baseline on the official example exam and start vocabulary by syllabus area.',
          uz: 'Advanced daraja sizga mosligini tasdiqlash, rasmiy namuna imtihonda boshlangʻich natijani oʻlchash va syllabus sohalari boʻyicha lugʻat ishini boshlash.',
        },
        modules: [
          {
            id: 'toles-diagnostic',
            title: { en: 'Level Choice and Baseline', uz: 'Daraja tanlash va boshlangʻich test' },
            summary: {
              en: 'Compare Foundation, Higher and Advanced on the official site, take the free Advanced example exam and sort your errors into vocabulary, grammar and reading.',
              uz: 'Rasmiy saytda Foundation, Higher va Advancedʼni solishtiring, bepul Advanced namuna imtihonini yeching va xatolarni lugʻat, grammatika va oʻqishga ajrating.',
            },
            baselineHours: 8,
            difficulty: 'foundational',
            keyFramework: 'Level Check + Error Sort',
            steps: [
              {
                id: 'toles-diag-level',
                title: { en: 'Choose the right TOLES level', uz: 'Mos TOLES darajasini tanlash' },
                drill: {
                  en: 'Compare the official levels: Foundation (90 min, 90 questions), Higher (90 min, 95 multiple-choice) and Advanced (120 min, 140 questions incl. 30 typed answers). Write why Advanced fits you.',
                  uz: 'Rasmiy darajalarni solishtiring: Foundation (90 daqiqa, 90 savol), Higher (90 daqiqa, 95 ta test) va Advanced (120 daqiqa, 140 savol, shundan 30 tasi yozma javob). Advanced nega mosligini yozing.',
                },
                framework: 'Level Check',
                estimatedMinutes: 30,
              },
              {
                id: 'toles-diag-baseline',
                title: { en: 'Take the free Advanced example exam', uz: 'Bepul Advanced namuna imtihonini yechish' },
                drill: {
                  en: 'Do the “See an Exam” Advanced example on toleslegal.com in one 120-minute sitting. Record your score per section and the questions you guessed.',
                  uz: 'toleslegal.com dagi “See an Exam” Advanced namunasini bir martada 120 daqiqada yeching. Har boʻlim boʻyicha natijani va taxmin bilan javob bergan savollarni yozing.',
                },
                framework: 'Timed Baseline',
                estimatedMinutes: 120,
              },
              {
                id: 'toles-diag-errors',
                title: { en: 'Sort errors by type and syllabus area', uz: 'Xatolarni tur va syllabus sohasi boʻyicha saralash' },
                drill: {
                  en: 'Tag every miss as vocabulary, grammar or reading, and by syllabus area (contracts, companies, disputes…). List the five weakest areas.',
                  uz: 'Har bir xatoni lugʻat, grammatika yoki oʻqish deb, hamda syllabus sohasi boʻyicha (shartnoma, kompaniya, nizolar…) belgilang. Eng zaif 5 ta sohani yozing.',
                },
                framework: 'Error Sort',
                estimatedMinutes: 45,
              },
              {
                id: 'toles-diag-plan',
                title: { en: 'Book a session and set up a vocabulary notebook', uz: 'Sessiyani band qilish va lugʻat daftarini tayyorlash' },
                drill: {
                  en: 'Pick an exam session on the official site. Start a notebook with one page per syllabus area; each entry has the term, a collocation and an example sentence.',
                  uz: 'Rasmiy saytdan imtihon sessiyasini tanlang. Har bir syllabus sohasiga bir sahifa ajratilgan daftar oching; har yozuvda atama, birikma va misol jumla boʻlsin.',
                },
                framework: 'Term–Collocation–Example',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'toles-collocations',
            title: { en: 'Legal Vocabulary by Syllabus Area', uz: 'Syllabus sohalari boʻyicha yuridik lugʻat' },
            summary: {
              en: 'Cover the Advanced syllabus areas: courts, banking and loans, contracts, business structures, insolvency, disputes and ADR, landlord and tenant, tort, employment, IP, common law.',
              uz: 'Advanced syllabus sohalari: sudlar, bank va kredit, shartnomalar, biznes tuzilmalari, bankrotlik, nizolar va ADR, ijara, delikt, mehnat, intellektual mulk, common law.',
            },
            baselineHours: 18,
            difficulty: 'intermediate',
            keyFramework: 'Collocation Notebook',
            steps: [
              {
                id: 'toles-s1',
                title: { en: 'Contract vocabulary and collocations', uz: 'Shartnoma lugʻati va birikmalari' },
                drill: {
                  en: 'Learn 60 contract terms with their verbs and prepositions (enter into, be in breach of, terminate, waive, indemnify against). Self-test by writing each in a new sentence.',
                  uz: '60 ta shartnoma atamasini feʼl va predloglari bilan oʻrganing (enter into, be in breach of, terminate, waive, indemnify against). Har birini yangi jumlada yozib oʻzingizni tekshiring.',
                },
                framework: 'Verb + Preposition Pairs',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s2',
                title: { en: 'Business structures and insolvency', uz: 'Biznes tuzilmalari va bankrotlik' },
                drill: {
                  en: 'Learn 50 terms on sole traders, partnerships, LLPs, companies and insolvency (wind up, go into administration, creditor). Self-test with a 20-gap text you write yourself.',
                  uz: 'Yakka tadbirkor, partnership, LLP, kompaniyalar va bankrotlik boʻyicha 50 ta atamani oʻrganing (wind up, go into administration, creditor). Oʻzingiz yozgan 20 boʻshliqli matn bilan tekshiring.',
                },
                framework: 'Gap-Text Self-Test',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s3',
                title: { en: 'Courts, disputes, ADR and how the common law works', uz: 'Sudlar, nizolar, ADR va common law qanday ishlashi' },
                drill: {
                  en: 'Learn 50 terms (claimant, bring a claim, settle out of court, mediation, precedent, appeal). Explain the path of a civil dispute aloud in 2 minutes using 15 of them.',
                  uz: '50 ta atamani oʻrganing (claimant, bring a claim, settle out of court, mediation, precedent, appeal). Ulardan 15 tasini ishlatib, fuqarolik nizosining yoʻlini 2 daqiqada ogʻzaki tushuntiring.',
                },
                framework: 'Explain-the-Process',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-col-property-tort-employment',
                title: { en: 'Landlord and tenant, tort and employment', uz: 'Ijara, delikt va mehnat huquqi' },
                drill: {
                  en: 'Learn 50 terms (lease, tenant, negligence, nuisance, liable for, unfair dismissal, employment contract). Self-test by matching each term to its definition.',
                  uz: '50 ta atamani oʻrganing (lease, tenant, negligence, nuisance, liable for, unfair dismissal, employment contract). Har atamani taʼrifiga moslab oʻzingizni tekshiring.',
                },
                framework: 'Term–Definition Match',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-col-banking-ip',
                title: { en: 'Banking, loans and intellectual property', uz: 'Bank, kredit va intellektual mulk' },
                drill: {
                  en: 'Learn 40 terms on accounts, loans and security, copyright, patents and trademarks. Then retest all five vocabulary sets with 50 mixed items; target 90%.',
                  uz: 'Hisob raqamlar, kredit va taʼminot, mualliflik huquqi, patent va tovar belgisi boʻyicha 40 ta atamani oʻrganing. Soʻng barcha 5 toʻplamni 50 ta aralash savol bilan tekshiring; maqsad 90%.',
                },
                framework: 'Mixed Retest',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'toles-p2',
        order: 2,
        title: { en: 'Phase 2 · Build: grammar and legal reading', uz: '2-bosqich · Asos: grammatika va yuridik matn oʻqish' },
        objective: {
          en: 'Fix the grammar points legal texts depend on and read contracts and case material accurately, with correct spelling for typed answers.',
          uz: 'Yuridik matnlar tayanadigan grammatikani mustahkamlash, shartnoma va sud materiallarini aniq oʻqish va yozma javoblarda imloni toʻgʻri yozish.',
        },
        modules: [
          {
            id: 'toles-grammar',
            title: { en: 'Grammar for Legal Texts', uz: 'Yuridik matnlar uchun grammatika' },
            summary: {
              en: 'Modal verbs, prepositions, word formation, conditionals and the passive as they appear in contracts and legal correspondence.',
              uz: 'Shartnoma va yuridik yozishmalarda uchraydigan modal feʼllar, predloglar, soʻz yasalishi, shart gaplar va majhul nisbat.',
            },
            baselineHours: 10,
            difficulty: 'intermediate',
            keyFramework: 'Rule + Contract Example',
            steps: [
              {
                id: 'toles-gr-modals',
                title: { en: 'Modal verbs in contract clauses', uz: 'Shartnoma bandlarida modal feʼllar' },
                drill: {
                  en: 'Write 20 clauses that use shall, will, may, must and may not correctly (obligation, discretion, prohibition). Check each against a grammar reference.',
                  uz: 'shall, will, may, must va may not toʻgʻri ishlatilgan 20 ta band yozing (majburiyat, ixtiyoriylik, taqiq). Har birini grammatika qoʻllanmasi bilan tekshiring.',
                },
                framework: 'Obligation–Discretion–Prohibition',
                estimatedMinutes: 45,
              },
              {
                id: 'toles-gr-prepositions',
                title: { en: 'Dependent prepositions', uz: 'Bogʻliq predloglar' },
                drill: {
                  en: 'Make a list of 40 legal verb/adjective + preposition pairs (comply with, liable for, entitled to, in accordance with) and test yourself with a 40-gap exercise.',
                  uz: '40 ta yuridik feʼl/sifat + predlog juftligini roʻyxatga oling (comply with, liable for, entitled to, in accordance with) va 40 boʻshliqli mashq bilan oʻzingizni tekshiring.',
                },
                framework: 'Preposition Pairs',
                estimatedMinutes: 45,
              },
              {
                id: 'toles-gr-wordform',
                title: { en: 'Word formation and spelling for typed answers', uz: 'Yozma javoblar uchun soʻz yasalishi va imlo' },
                drill: {
                  en: 'Build 30 word families (liable–liability, terminate–termination, negligent–negligence) and type them from dictation. Advanced has 30 free-text questions, so spelling counts.',
                  uz: '30 ta soʻz oilasini tuzing (liable–liability, terminate–termination, negligent–negligence) va diktant qilib yozing. Advancedʼda 30 ta erkin yozma savol bor, shuning uchun imlo muhim.',
                },
                framework: 'Word Families',
                estimatedMinutes: 45,
              },
              {
                id: 'toles-gr-conditionals',
                title: { en: 'Conditionals and the passive in legal drafting', uz: 'Yuridik matnda shart gaplar va majhul nisbat' },
                drill: {
                  en: 'Rewrite 15 clauses using provided that, unless, in the event that and subject to, and 10 sentences into the passive. Check meaning has not changed.',
                  uz: '15 ta bandni provided that, unless, in the event that va subject to bilan, 10 ta gapni majhul nisbatda qayta yozing. Maʼno oʻzgarmaganini tekshiring.',
                },
                framework: 'Condition Markers',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'toles-drafting',
            title: { en: 'Reading Contracts and Legal Texts', uz: 'Shartnoma va yuridik matnlarni oʻqish' },
            summary: {
              en: 'Read contracts, case summaries and legal letters closely, and use the vocabulary in context the way the exam’s reading and writing questions require.',
              uz: 'Shartnoma, sud qarorlari xulosalari va yuridik xatlarni diqqat bilan oʻqish hamda imtihonning reading va writing savollari talab qilganidek lugʻatni kontekstda ishlatish.',
            },
            baselineHours: 12,
            difficulty: 'intermediate',
            keyFramework: 'Clause Labelling',
            steps: [
              {
                id: 'toles-s4',
                title: { en: 'Label the clauses of a commercial contract', uz: 'Tijorat shartnomasi bandlarini belgilash' },
                drill: {
                  en: 'Take a publicly available commercial contract and label each clause (definitions, payment, warranties, indemnity, termination, governing law). Note 20 new terms.',
                  uz: 'Ochiq manbadagi tijorat shartnomasini oling va har bir bandni belgilang (definitions, payment, warranties, indemnity, termination, governing law). 20 ta yangi atamani yozing.',
                },
                framework: 'Clause Map',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s5',
                title: { en: 'Rewrite clauses in plain English and back', uz: 'Bandlarni oddiy ingliz tiliga va qaytadan yuridik tilga oʻgirish' },
                drill: {
                  en: 'Rewrite 10 clauses in plain English, then a day later turn your plain versions back into legal English. Compare with the originals and note differences.',
                  uz: '10 ta bandni oddiy ingliz tilida qayta yozing, bir kundan keyin ularni yana yuridik tilga oʻgiring. Asl matn bilan solishtirib, farqlarni yozing.',
                },
                framework: 'Plain-English Round Trip',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s6',
                title: { en: 'Gap-fill from real legal texts', uz: 'Haqiqiy yuridik matnlardan boʻshliq toʻldirish' },
                drill: {
                  en: 'Make three 15-gap texts from your notebook sentences, swap the order, and complete them a week later by typing the missing words. Target 40/45 spelled correctly.',
                  uz: 'Daftaringizdagi jumlalardan 15 boʻshliqli 3 ta matn tuzing va bir haftadan keyin tushib qolgan soʻzlarni yozib toʻldiring. Maqsad: 45 tadan 40 tasi toʻgʻri imlo bilan.',
                },
                framework: 'Typed Gap-Fill',
                estimatedMinutes: 45,
              },
              {
                id: 'toles-read-cases',
                title: { en: 'Read court case summaries', uz: 'Sud ishlari xulosalarini oʻqish' },
                drill: {
                  en: 'Read two official court judgment summaries (for example, UK Supreme Court press summaries). Write a five-line summary of each and list 15 procedural terms.',
                  uz: 'Ikkita rasmiy sud qarori xulosasini oʻqing (masalan, UK Supreme Court press summaries). Har biriga 5 qatorlik xulosa yozing va 15 ta protsessual atamani roʻyxatga oling.',
                },
                framework: 'Five-Line Summary',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'toles-p3',
        order: 3,
        title: { en: 'Phase 3 · Timed practice papers', uz: '3-bosqich · Vaqtli mashq imtihonlari' },
        objective: {
          en: 'Complete 140 questions in 120 minutes with accurate typed answers, and arrive ready for online proctoring.',
          uz: '120 daqiqada 140 ta savolni aniq yozma javoblar bilan yakunlash va onlayn nazoratga tayyor kelish.',
        },
        modules: [
          {
            id: 'toles-mocks',
            title: { en: 'Timed Papers and Review', uz: 'Vaqtli imtihonlar va tahlil' },
            summary: {
              en: 'Sit full timed papers, review every miss by type and settle the technical set-up for the online, camera-proctored exam.',
              uz: 'Toʻliq vaqtli imtihonlar yechish, har bir xatoni tur boʻyicha tahlil qilish va kamera orqali nazorat qilinadigan onlayn imtihon uchun texnik tayyorgarlikni hal qilish.',
            },
            baselineHours: 12,
            difficulty: 'executive',
            keyFramework: 'Timed Paper + Error Sort',
            steps: [
              {
                id: 'toles-s7',
                title: { en: 'Full timed practice paper', uz: 'Toʻliq vaqtli mashq imtihoni' },
                drill: {
                  en: 'Sit the Official Practice Online TOLES Paper (from the TOLES shop) in 120 minutes, or retake the free example if you have not seen it for two weeks. Record the score per section.',
                  uz: 'Official Practice Online TOLES Paperʼni (TOLES doʻkonidan) 120 daqiqada yeching yoki ikki haftadan beri koʻrmagan boʻlsangiz, bepul namunani qayta yeching. Har boʻlim natijasini yozing.',
                },
                framework: 'Timed Paper',
                estimatedMinutes: 120,
              },
              {
                id: 'toles-s8',
                title: { en: 'Error review and flashcards', uz: 'Xatolar tahlili va kartochkalar' },
                drill: {
                  en: 'Sort every miss as vocabulary, grammar or reading. Make 30 flashcards from them and add each missed term to its syllabus page with a new example.',
                  uz: 'Har bir xatoni lugʻat, grammatika yoki oʻqish deb saralang. Ulardan 30 ta kartochka tuzing va har bir xato atamani yangi misol bilan tegishli syllabus sahifasiga qoʻshing.',
                },
                framework: 'Error Sort',
                estimatedMinutes: 60,
              },
              {
                id: 'toles-s9',
                title: { en: 'Free-text accuracy drill', uz: 'Erkin yozma javoblar aniqligi mashqi' },
                drill: {
                  en: 'Do 30 typed-answer items (word formation, prepositions, missing terms) in 20 minutes. Any spelling mistake counts as wrong. Target 27/30.',
                  uz: '20 daqiqada 30 ta yozma javobli savolni (soʻz yasalishi, predloglar, tushib qolgan atamalar) bajaring. Har qanday imlo xatosi xato hisoblanadi. Maqsad: 27/30.',
                },
                framework: 'Spelling-Strict Drill',
                estimatedMinutes: 30,
              },
              {
                id: 'toles-mock-final',
                title: { en: 'Final timed run and proctoring check', uz: 'Yakuniy vaqtli mashq va nazorat tizimini tekshirish' },
                drill: {
                  en: 'Repeat a full paper in 120 minutes and compare with your first score. Then test your laptop camera, connection and quiet room as the proctored exam requires.',
                  uz: 'Toʻliq imtihonni yana 120 daqiqada yeching va birinchi natija bilan solishtiring. Soʻng nazorat ostidagi imtihon talab qilganidek noutbuk kamerasi, internet va tinch xonani tekshiring.',
                },
                framework: 'Readiness Check',
                estimatedMinutes: 120,
              },
            ],
          },
        ],
      },
    ],
  },
];
