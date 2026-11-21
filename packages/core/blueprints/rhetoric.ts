import type { Blueprint } from '../schemas';

export const RHETORIC_BLUEPRINTS: Blueprint[] = [
  {
    id: 'tedx-oratory',
    category: 'rhetoric',
    code: 'TEDX-01',
    title: {
      en: 'TEDx Keynote Mastery',
      uz: 'TEDx sahna va asosiy maʼruza mahorati',
    },
    subtitle: {
      en: 'Idea-throughline architecture, narrative tension, and calm stage command.',
      uz: 'Asosiy gʻoya oʻqi, dramatik hikoya qurilishi va sahnada bosiq hukmronlik.',
    },
    archetypeLabel: {
      en: 'TEDx Speaker',
      uz: 'TEDx maʼruzachisi',
    },
    recommendedWeeks: 6,
    baselineTotalHours: 42,
    phases: [
      {
        id: 'tedx-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Idea Architecture & Throughline',
          uz: '1-bosqich · Gʻoya arxitekturasi va bosh oʻq',
        },
        objective: {
          en: 'Distill a single transferable thesis that survives a 15-word test.',
          uz: '15 soʻzlik sinovdan oʻtadigan yagona va taʼsirchan tezisni shakllantirish.',
        },
        modules: [
          {
            id: 'tedx-throughline',
            title: {
              en: 'The 15-Word Throughline & Opening Hook',
              uz: '15 soʻzlik bosh gʻoya va ilk 30 soniyalik ilgak',
            },
            summary: {
              en: 'Replace throat-clearing introductions with immediate curiosity gaps.',
              uz: 'Kirish soʻzlaridagi choʻzilish oʻrniga ilk soniyadanoq qiziqish uygʻotish.',
            },
            baselineHours: 7,
            difficulty: 'foundational',
            keyFramework: 'Curiosity Gap + One-Sentence Throughline',
            steps: [
              {
                id: 'tedx-s1',
                title: {
                  en: 'Compress core thesis to 15 words',
                  uz: 'Asosiy tezisni 15 soʻzga qisqartirish',
                },
                drill: {
                  en: 'Write 5 competing one-sentence claims and test each aloud for breath cadence.',
                  uz: '5 ta muqobil bir gaplik tezis yozing va har birini ovoz chiqarib nafas ritmida sinang.',
                },
                framework: 'TED Throughline Filter',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s2',
                title: {
                  en: 'Design a zero-preamble 30-second hook',
                  uz: 'Muqaddimasiz 30 soniyalik ochilish ilgagini tuzish',
                },
                drill: {
                  en: 'Open directly inside a concrete scene, paradox, or counter-intuitive statistic.',
                  uz: 'Nutqni salomlashuvsiz, bevosita hayotiy epizod, paradoks yoki kutilmagan fakt bilan boshlang.',
                },
                framework: 'In Medias Res Opening',
                estimatedMinutes: 60,
              },
              {
                id: 'tedx-s3',
                title: {
                  en: 'Map the 3-beat cognitive arc',
                  uz: '3 qismli fikriy yoy xaritasini chizish',
                },
                drill: {
                  en: 'Sequence Status Quo → Tension / Discovery → New Worldview on one index card.',
                  uz: 'Mavjud holat → Ziddiyat va kashfiyot → Yangi dunyoqarash ketma-ketligini bitta varaqda tuzing.',
                },
                framework: 'Sparkline Contrast Arc',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'tedx-narrative',
            title: {
              en: 'Narrative Tension & Concrete Imagery',
              uz: 'Hikoya tarangligi va jonli tasvirlar',
            },
            summary: {
              en: 'Anchor abstract frameworks in sensory human episodes.',
              uz: 'Mavhum tushunchalarni aniq insoniy va hissiy epizodlarga bogʻlash.',
            },
            baselineHours: 7,
            difficulty: 'intermediate',
            keyFramework: 'Rule of Three + Sensory Anchoring',
            steps: [
              {
                id: 'tedx-s4',
                title: {
                  en: 'Strip jargon into visual metaphors',
                  uz: 'Murakkab atamalarni vizual metaforalarga almashtirish',
                },
                drill: {
                  en: 'Replace every technical term with a physical analogy understandable in 4 seconds.',
                  uz: 'Har bir murakkab atamani 4 soniyada tasavvur qilinadigan aniq oʻxshatishga aylantiring.',
                },
                framework: 'Concrete-Before-Abstract Ladder',
                estimatedMinutes: 50,
              },
              {
                id: 'tedx-s5',
                title: {
                  en: 'Craft a pivotal turning-point story',
                  uz: 'Burilish nuqtasiga ega hikoya yaratish',
                },
                drill: {
                  en: 'Draft a 90-second story with exact time, place, stakes, and one line of dialogue.',
                  uz: 'Aniq vaqt, makon, tavakkal va bir qator jonli dialogga ega 90 soniyalik hikoya yozing.',
                },
                framework: 'Micro-Scene Storytelling',
                estimatedMinutes: 65,
              },
              {
                id: 'tedx-s6',
                title: {
                  en: 'Build a memorable closing echo',
                  uz: 'Xotirada qoluvchi yakuniy aks-sado yaratish',
                },
                drill: {
                  en: 'Callback the opening image in the final 20 seconds with a transformed meaning.',
                  uz: 'Soʻnggi 20 soniyada ochilishdagi tasvirga yangi maʼno bilan qayting.',
                },
                framework: 'Circular Callback Close',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'tedx-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Vocal Architecture & Physical Presence',
          uz: '2-bosqich · Ovoz arxitekturasi va sahna holati',
        },
        objective: {
          en: 'Command pacing, strategic silence, and grounded stage movement.',
          uz: 'Nutq tempi, strategik pauza va sahnadagi bosiq harakatni egallash.',
        },
        modules: [
          {
            id: 'tedx-voice',
            title: {
              en: 'Vocal Cadence, Pitch Drop & Strategic Silence',
              uz: 'Ovoz ritmi, intonatsiya tushishi va strategik sukut',
            },
            summary: {
              en: 'Use downward inflection and 2-second pauses to signal authority.',
              uz: 'Pastga tushuvchi ohang va 2 soniyalik sukut orqali nufuz va ishonch uygʻotish.',
            },
            baselineHours: 7,
            difficulty: 'intermediate',
            keyFramework: 'Cadence Modulation + 2-Second Authority Pause',
            steps: [
              {
                id: 'tedx-s7',
                title: {
                  en: 'Eliminate upward terminal inflection',
                  uz: 'Gap oxiridagi noaniq koʻtariluvchi ohangni yoʻqotish',
                },
                drill: {
                  en: 'Record 2 minutes of your keynote and mark every declarative sentence ending.',
                  uz: '2 daqiqalik nutqingizni yozib oling va har bir darak gap yakunidagi ohang tushishini tekshiring.',
                },
                framework: 'Authoritative Downward Cadence',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s8',
                title: {
                  en: 'Mark deliberate 2-second silence beats',
                  uz: 'Ataylab qilinadigan 2 soniyalik sukut nuqtalarini belgilash',
                },
                drill: {
                  en: 'Insert hard pauses right before and after your core thesis statement.',
                  uz: 'Asosiy tezisdan oldin va keyin toʻliq 2 soniyalik sukut qoʻshib mashq qiling.',
                },
                framework: 'Contrast Pause Protocol',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s9',
                title: {
                  en: 'Master tempo shifts between story and insight',
                  uz: 'Hikoya va xulosa orasidagi temp almashinuvini oʻzlashtirish',
                },
                drill: {
                  en: 'Deliver narrative at 150 WPM, then drop to 110 WPM for key principles.',
                  uz: 'Hikoyani jonli tempda (150 soʻz/daq), xulosani esa vazmin tempda (110 soʻz/daq) ayting.',
                },
                framework: 'Dynamic Pace Architecture',
                estimatedMinutes: 50,
              },
            ],
          },
          {
            id: 'tedx-stage',
            title: {
              en: 'Spatial Anchoring & Intentional Gestures',
              uz: 'Makonni egallash va maqsadli imo-ishoralar',
            },
            summary: {
              en: 'Stop pacing nervously; assign distinct stage zones to distinct ideas.',
              uz: 'Asabiy yurishni toʻxtatib, sahna zonalarini aniq gʻoyalarga bogʻlash.',
            },
            baselineHours: 7,
            difficulty: 'intermediate',
            keyFramework: 'Three-Zone Stage Anchoring',
            steps: [
              {
                id: 'tedx-s10',
                title: {
                  en: 'Plant feet before delivering key claims',
                  uz: 'Muhim fikr aytishdan oldin qadamni barqaror toʻxtatish',
                },
                drill: {
                  en: 'Walk cleanly between 3 zones during transitions, then stay rooted while speaking.',
                  uz: 'Fikr almashganda 3 ta zona orasida yuring, gapirayotganda esa qadamni qatʼiy toʻxtating.',
                },
                framework: 'Move-Plant-Speak Discipline',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s11',
                title: {
                  en: 'Use open-palm framing gestures',
                  uz: 'Ochiq kaft bilan maʼnoni ramkalash ishoralari',
                },
                drill: {
                  en: 'Film a 3-minute muted video to audit hand clarity and eliminate fidgeting.',
                  uz: '3 daqiqalik ovozsiz video yozib, qoʻl harakatlarining aniqligini tekshiring.',
                },
                framework: 'Silent Video Audit',
                estimatedMinutes: 50,
              },
              {
                id: 'tedx-s12',
                title: {
                  en: 'Hold 3-second eye contact locks',
                  uz: '3 soniyalik nigoh aloqasini ushlash',
                },
                drill: {
                  en: 'Deliver one complete thought to one listener before shifting gaze across quadrants.',
                  uz: 'Bir toʻliq fikrni bitta tinglovchiga qarab ayting, soʻng nigohni keyingi sektorga oʻtkazing.',
                },
                framework: 'Thought-Per-Person Eye Lock',
                estimatedMinutes: 40,
              },
            ],
          },
        ],
      },
      {
        id: 'tedx-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Pressure Rehearsal & Live Delivery',
          uz: '3-bosqich · Bosim ostida mashq va jonli ijro',
        },
        objective: {
          en: 'Internalize structure without rote memorization so delivery stays natural under lights.',
          uz: 'Matnni yodlab qotib qolmasdan, tuzilmani ichki his qilib erkin va tabiiy soʻzlash.',
        },
        modules: [
          {
            id: 'tedx-slides',
            title: {
              en: 'Minimalist Visual Deck & Zero-Teleprompter Recall',
              uz: 'Minimalist slaydlar va matnsiz erkin eslab qolish',
            },
            summary: {
              en: 'Design high-contrast visual slides that reinforce without competing for attention.',
              uz: 'Diqqatni chalgʻitmaydigan, faqat fikrni kuchaytiradigan vizual slaydlar tuzish.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'Memory Palace Beat Sheet',
            steps: [
              {
                id: 'tedx-s13',
                title: {
                  en: 'Convert full script into a 7-cue beat sheet',
                  uz: 'Toʻliq matnni 7 ta tayanch nuqtalik xaritaga aylantirish',
                },
                drill: {
                  en: 'Practice delivering the entire talk using only 7 trigger phrases.',
                  uz: 'Butun maʼruzani faqat 7 ta kalit iboraga tayanib erkin soʻzlab bering.',
                },
                framework: 'Beat-Sheet Internalization',
                estimatedMinutes: 60,
              },
              {
                id: 'tedx-s14',
                title: {
                  en: 'Audit slide text to max 6 words per frame',
                  uz: 'Har bir slayddagi matnni 6 soʻzgacha qisqartirish',
                },
                drill: {
                  en: 'Replace bullet lists with one evocative photograph, chart, or single metric.',
                  uz: 'Roʻyxatlar oʻrniga bitta kuchli tasvir, grafik yoki yagona raqam qoldiring.',
                },
                framework: 'Billboard Legibility Standard',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s15',
                title: {
                  en: 'Rehearse recovery from sudden memory blanks',
                  uz: 'Kutilmagan pauza va unutishdan nafis chiqish mashqi',
                },
                drill: {
                  en: 'Pause calmly, summarize the last beat, and bridge into the next cue without apologizing.',
                  uz: 'Uzr soʻramasdan, bosiq sukut saqlab oldingi fikrni jamlang va keyingi nuqtaga oʻting.',
                },
                framework: 'Zero-Apology Bridge Technique',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'tedx-dress-rehearsal',
            title: {
              en: 'Full Timed Dress Rehearsal & Critique Loop',
              uz: 'Vaqtga qoʻyilgan toʻliq repetitsiya va tahlil sikli',
            },
            summary: {
              en: 'Execute three back-to-back full runs under live timer pressure.',
              uz: 'Jonli taymer bosimi ostida ketma-ket uchta toʻliq sahna sinovini oʻtkazish.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'Three-Take Executive Calibration',
            steps: [
              {
                id: 'tedx-s16',
                title: {
                  en: 'Run timed 12-minute keynote with countdown visible',
                  uz: 'Koʻrinib turgan taymer bilan 12 daqiqalik toʻliq nutq sinovi',
                },
                drill: {
                  en: 'Hit the closing line within ±15 seconds of target duration without rushing.',
                  uz: 'Shoshilmasdan, yakuniy jumlani belgilangan vaqtdan ±15 soniya ichida tugating.',
                },
                framework: 'Precision Pacing Clock',
                estimatedMinutes: 60,
              },
              {
                id: 'tedx-s17',
                title: {
                  en: 'Conduct audio-only and video-only self-audit',
                  uz: 'Alohida audio va alohida video tahlil oʻtkazish',
                },
                drill: {
                  en: 'Score vocal warmth on audio-only playback, then posture authority on muted video.',
                  uz: 'Ovoz iliqligini faqat audioda, qomat va ishonchni esa ovozsiz videoda baholang.',
                },
                framework: 'Split-Channel Diagnostic',
                estimatedMinutes: 50,
              },
              {
                id: 'tedx-s18',
                title: {
                  en: 'Simulate live audience Q&A and stage exit',
                  uz: 'Jonli auditoriya savol-javobi va sahnadan chiqish sinovi',
                },
                drill: {
                  en: 'Answer 5 tough follow-ups in under 45 seconds each using Answer-Proof-Echo.',
                  uz: '5 ta murakkab savolga Javob–Dalil–Xulosa qolipida 45 soniyadan qisqa javob bering.',
                },
                framework: 'Answer-Proof-Echo Q&A',
                estimatedMinutes: 55,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'legal-advocacy',
    category: 'rhetoric',
    code: 'ADV-02',
    title: {
      en: 'Trial Advocacy & Persuasive Argumentation',
      uz: 'Sud nutqi va ishontiruvchi huquqiy argumentatsiya',
    },
    subtitle: {
      en: 'Case theory discipline, cross-examination control, and courtroom ethos.',
      uz: 'Ish nazariyasi intizomi, qarshi soʻroq nazorati va sud zalidagi nufuz.',
    },
    archetypeLabel: {
      en: 'Trial Advocate',
      uz: 'Sud advokati',
    },
    recommendedWeeks: 8,
    baselineTotalHours: 52,
    phases: [
      {
        id: 'adv-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Case Theory & Opening Persuasion',
          uz: '1-bosqich · Ish nazariyasi va ochilish nutqi',
        },
        objective: {
          en: 'Unify law, facts, and moral equities into one coherent courtroom narrative.',
          uz: 'Qonun, faktlar va adolat mantiqini yagona izchil sud hikoyasiga birlashtirish.',
        },
        modules: [
          {
            id: 'adv-case-theory',
            title: {
              en: 'Case Theory & Theme Architecture',
              uz: 'Ish nazariyasi va bosh huquqiy mavzu arxitekturasi',
            },
            summary: {
              en: 'Anchor every witness question and exhibit to one unmistakable legal theme.',
              uz: 'Har bir guvoh savoli va dalilni bitta aniq huquqiy mavzuga bogʻlash.',
            },
            baselineHours: 9,
            difficulty: 'foundational',
            keyFramework: 'Fact-Law-Equity Triangle',
            steps: [
              {
                id: 'adv-s1',
                title: {
                  en: 'Distill case theory into a 3-sentence pillar',
                  uz: 'Ish nazariyasini 3 jumlalik tayanch ustunga jamlash',
                },
                drill: {
                  en: 'Draft Legal Rule + Controlling Fact + Human Consequence in under 60 words.',
                  uz: 'Huquqiy norma + Hal qiluvchi fakt + Insoniy oqibat formulasini 60 soʻz ichida yozing.',
                },
                framework: 'Three-Pillar Case Theory',
                estimatedMinutes: 60,
              },
              {
                id: 'adv-s2',
                title: {
                  en: 'Pre-empt bad facts with calm inoculation',
                  uz: 'Noqulay faktlarni xotirjam oldindan zararsizlantirish',
                },
                drill: {
                  en: 'Identify your 2 weakest facts and draft neutral, non-defensive disclosures.',
                  uz: 'Eng zaif 2 ta faktni aniqlab, ularni mudofaaga oʻtmasdan xotirjam ochish matnini tuzing.',
                },
                framework: 'Forensic Inoculation',
                estimatedMinutes: 55,
              },
              {
                id: 'adv-s3',
                title: {
                  en: 'Deliver a 4-minute chronological opening',
                  uz: '4 daqiqalik xronologik ochilish bayonotini ijro etish',
                },
                drill: {
                  en: 'Present pure persuasive storytelling without crossing into impermissible argument.',
                  uz: 'Protsessual chegarani buzmasdan, faktlarning oʻzi bilan ishontiruvchi hikoya quring.',
                },
                framework: 'Show-Dont-Argue Opening',
                estimatedMinutes: 65,
              },
            ],
          },
          {
            id: 'adv-direct-exam',
            title: {
              en: 'Direct Examination & Witness Credibility',
              uz: 'Toʻgʻridan-toʻgʻri soʻroq va guvoh ishonchliligi',
            },
            summary: {
              en: 'Keep the spotlight on the witness with clean, open, chronological chapters.',
              uz: 'Qisqa ochiq savollar va aniq boblar orqali diqqat markazida guvohni saqlash.',
            },
            baselineHours: 8,
            difficulty: 'intermediate',
            keyFramework: 'Looping & Headline Transitions',
            steps: [
              {
                id: 'adv-s4',
                title: {
                  en: 'Build signposted examination chapters',
                  uz: 'Aniq sarlavhali soʻroq boblarini tuzish',
                },
                drill: {
                  en: 'Script transitions like "Let us turn to the evening of May 4th" to orient the bench.',
                  uz: 'Sudyani yoʻnaltirish uchun "Endi 4-may oqshomiga oʻtamiz" kabi aniq oʻtishlar yozing.',
                },
                framework: 'Chapter Signposting',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s5',
                title: {
                  en: 'Practice forensic looping of key phrases',
                  uz: 'Muhim guvoh iboralarini mantiqiy takrorlash mashqi',
                },
                drill: {
                  en: 'Incorporate a witness’s vivid answer directly into your next open question.',
                  uz: 'Guvohning eng taʼsirli iborasini keyingi savol boshiga tabiiy joylashtiring.',
                },
                framework: 'Echo Looping Method',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s6',
                title: {
                  en: 'Lay clean evidentiary foundations rapidly',
                  uz: 'Dalillarni ishga qoʻshish asoslarini tez va aniq qurish',
                },
                drill: {
                  en: 'Drill the 4-step exhibit authentication sequence until effortless under pressure.',
                  uz: 'Hujjatli dalilni tasdiqlashning 4 bosqichli tartibini avtomatizmgacha mashq qiling.',
                },
                framework: 'Four-Step Exhibit Foundation',
                estimatedMinutes: 55,
              },
            ],
          },
        ],
      },
      {
        id: 'adv-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Cross-Examination Control & Impeachment',
          uz: '2-bosqich · Qarshi soʻroq nazorati va raddiya',
        },
        objective: {
          en: 'Maintain total witness control through closed leading chapters and clean impeachment.',
          uz: 'Yopiq yoʻnaltiruvchi savollar va aniq raddiya orqali guvoh ustidan toʻliq nazorat oʻrnatish.',
        },
        modules: [
          {
            id: 'adv-cross-control',
            title: {
              en: 'Cross-Examination Control & One-Fact Questions',
              uz: 'Qarshi soʻroq nazorati va bir faktli savollar',
            },
            summary: {
              en: 'Never argue with a hostile witness; construct airtight leading ladders.',
              uz: 'Qarshi guvoh bilan tortishmasdan, bir faktli yopiq savollar zanjirini qurish.',
            },
            baselineHours: 10,
            difficulty: 'executive',
            keyFramework: 'Pozner & Dodd Chapter Method',
            steps: [
              {
                id: 'adv-s7',
                title: {
                  en: 'Convert open questions into single-fact leads',
                  uz: 'Ochiq savollarni bir faktli yopiq savollarga oʻgirish',
                },
                drill: {
                  en: 'Rewrite a 12-question cross so every question holds strictly one verifiable fact.',
                  uz: '12 ta savoldan iborat qarshi soʻroqni har birida faqat bitta aniq fakt qoladigan qilib qayta yozing.',
                },
                framework: 'One-Fact Leading Rule',
                estimatedMinutes: 60,
              },
              {
                id: 'adv-s8',
                title: {
                  en: 'Interrupt evasive speeches with calm discipline',
                  uz: 'Chalgʻituvchi uzun javoblarni bosiq toʻxtatish',
                },
                drill: {
                  en: 'Practice 3 polite redirect scripts: "Thank you, my question was solely whether..."',
                  uz: '3 xil odobli qaytarish formulasini mashq qiling: "Rahmat, savolim faqat ... haqida edi".',
                },
                framework: 'Polite Re-Anchor Protocol',
                estimatedMinutes: 55,
              },
              {
                id: 'adv-s9',
                title: {
                  en: 'Execute Commit-Credit-Confront impeachment',
                  uz: 'Tasdiqlatish–Ishonch–Yuzlashtirish raddiya usuli',
                },
                drill: {
                  en: 'Impeach a contradictory prior statement in under 45 seconds without over-explaining.',
                  uz: 'Oldingi koʻrsatma bilan ziddiyatni ortiqcha izohsiz 45 soniyada ochib bering.',
                },
                framework: 'Commit-Credit-Confront',
                estimatedMinutes: 65,
              },
            ],
          },
          {
            id: 'adv-bench-qa',
            title: {
              en: 'Appellate Bench Q&A & Hot-Bench Pivoting',
              uz: 'Apellyatsiya sudyalari savollari va tezkor burilish',
            },
            summary: {
              en: 'Answer judicial hypotheticals directly in the first sentence, then pivot back.',
              uz: 'Sudya gipotetik savollariga birinchi gapdayoq aniq javob berib, asosiy tezisga qaytish.',
            },
            baselineHours: 9,
            difficulty: 'executive',
            keyFramework: 'Direct Answer → Principle → Distinction',
            steps: [
              {
                id: 'adv-s10',
                title: {
                  en: 'Open with "Yes/No, Your Honor, because..."',
                  uz: '"Ha/Yoʻq, muhtaram sudya, chunki..." qolipini oʻzlashtirish',
                },
                drill: {
                  en: 'Eliminate hedging fillers when interrupted mid-sentence by a simulated bench.',
                  uz: 'Gap oʻrtasida toʻxtatilganda ikkilanishsiz toʻgʻridan-toʻgʻri javob berishni mashq qiling.',
                },
                framework: 'First-Sentence Directness',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s11',
                title: {
                  en: 'Handle slippery-slope hypotheticals cleanly',
                  uz: 'Chegaraviy gipotetik misollarni aniq ajratib berish',
                },
                drill: {
                  en: 'Concede the extreme case cleanly while drawing a principled statutory line.',
                  uz: 'Ekstremal holatni tan olib, joriy ish bilan aniq huquqiy chegara chizigʻini koʻrsating.',
                },
                framework: 'Principled Limiting Rule',
                estimatedMinutes: 60,
              },
              {
                id: 'adv-s12',
                title: {
                  en: 'Pivot smoothly back to your strongest issue',
                  uz: 'Eng kuchli huquqiy dalilga ravon qaytish',
                },
                drill: {
                  en: 'Close every judicial answer with a 1-sentence bridge back to your roadmap.',
                  uz: 'Har bir javob yakunida asosiy pozitsiyangizga qaytaruvchi bir gaplik koʻprik qoʻshing.',
                },
                framework: 'Judicial Bridge Return',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'adv-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Closing Summation & Rebuttal Mastery',
          uz: '3-bosqich · Yakuniy nutq va raddiya mahorati',
        },
        objective: {
          en: 'Synthesize admissions, burdens of proof, and moral clarity into an unforgettable close.',
          uz: 'Tan olingan faktlar, isbotlash yukini va mantiqiy yakunni unutilmas xulosaga jamlash.',
        },
        modules: [
          {
            id: 'adv-closing',
            title: {
              en: 'Structured Closing Argument & Proof Matrix',
              uz: 'Tuzilgan yakuniy nutq va dalillar matritsasi',
            },
            summary: {
              en: 'Walk decision-makers step by step through each legal element with zero fluff.',
              uz: 'Qaror qabul qiluvchilarni har bir huquqiy unsur boʻylab aniq dalillar bilan olib oʻtish.',
            },
            baselineHours: 8,
            difficulty: 'executive',
            keyFramework: 'Element-by-Element Proof Ladder',
            steps: [
              {
                id: 'adv-s13',
                title: {
                  en: 'Anchor closing in the opponent’s own admissions',
                  uz: 'Yakuniy nutqni raqibning oʻz eʼtiroflariga tayantirish',
                },
                drill: {
                  en: 'Quote 3 exact admissions verbatim before arguing contested inferences.',
                  uz: 'Bahsli xulosalardan oldin raqib tan olgan 3 ta aniq faktni aynan keltiring.',
                },
                framework: 'Undisputed Anchor Method',
                estimatedMinutes: 55,
              },
              {
                id: 'adv-s14',
                title: {
                  en: 'Frame the burden of proof visually',
                  uz: 'Isbotlash yukini aniq va tushunarli tasvirlash',
                },
                drill: {
                  en: 'Explain the legal standard in plain human terms without diluting precision.',
                  uz: 'Huquqiy standartni aniqlikni yoʻqotmasdan sodda va taʼsirchan tilda bayon qiling.',
                },
                framework: 'Plain-Law Translation',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s15',
                title: {
                  en: 'Deliver a calm, high-gravitas final ask',
                  uz: 'Vazmin va yuksak salobatli yakuniy talabni aytish',
                },
                drill: {
                  en: 'End with a 20-second quiet cadence—no shouting, pure certainty.',
                  uz: 'Baqir-chaqirsiz, 20 soniyalik sokin va qatʼiy ishonch bilan nutqni yakunlang.',
                },
                framework: 'Quiet Authority Finish',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'adv-rebuttal',
            title: {
              en: 'Surgical Rebuttal & Mock Trial Simulation',
              uz: 'Aniq nishonli raddiya va sinov sud jarayoni',
            },
            summary: {
              en: 'Dismantle the opponent’s 2 strongest points instead of chasing minor tangents.',
              uz: 'Mayda tafsilotlarga chalgʻimasdan raqibning eng kuchli 2 ta dalilini parchalash.',
            },
            baselineHours: 8,
            difficulty: 'executive',
            keyFramework: 'Two-Strike Surgical Rebuttal',
            steps: [
              {
                id: 'adv-s16',
                title: {
                  en: 'Isolate the opponent’s load-bearing assumption',
                  uz: 'Raqib pozitsiyasining asosiy tayanch taxminini ajratish',
                  },
                drill: {
                  en: 'Listen to a 5-minute opposing speech and identify the single premise that breaks their case.',
                  uz: '5 daqiqalik qarshi nutqni tinglab, butun pozitsiyani ushlab turgan yagona taxminni toping.',
                },
                framework: 'Load-Bearing Premise Audit',
                estimatedMinutes: 55,
              },
              {
                id: 'adv-s17',
                title: {
                  en: 'Deliver a 90-second surgical rebuttal',
                  uz: '90 soniyalik aniq raddiya chiqishi',
                },
                drill: {
                  en: 'State their claim fairly, expose the factual gap, and restate your requested relief.',
                  uz: 'Raqib fikrini xolis aytib, faktik boʻshliqni koʻrsating va oʻz talabingizni mustahkamlang.',
                },
                framework: 'Steelman-Expose-Close',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s18',
                title: {
                  en: 'Complete full timed advocacy run',
                  uz: 'Toʻliq vaqtli advokatlik sinovini yakunlash',
                },
                drill: {
                  en: 'Execute Opening + Cross + Closing back-to-back with recorded review.',
                  uz: 'Ochilish + Qarshi soʻroq + Yakuniy nutqni ketma-ket ijro etib, yozuvni tahlil qiling.',
                },
                framework: 'Full Courtroom Simulation',
                estimatedMinutes: 75,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'senatorial-rhetoric',
    category: 'rhetoric',
    code: 'SEN-03',
    title: {
      en: 'Senatorial & Policy Debating',
      uz: 'Senatorlik notiqligi va siyosiy-strategik debat',
    },
    subtitle: {
      en: 'Institutional ethos, legislative framing, coalition persuasion, and hostile Q&A.',
      uz: 'Institutsional salobat, qonunchilik ramkalashi, koalitsiya ishontirishi va keskin savollar.',
    },
    archetypeLabel: {
      en: 'Senator & Statesman',
      uz: 'Senator va davlat arbobi',
    },
    recommendedWeeks: 6,
    baselineTotalHours: 40,
    phases: [
      {
        id: 'sen-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Statesman Framing & Classical Structure',
          uz: '1-bosqich · Davlat arbobi ramkalashi va klassik tuzilma',
        },
        objective: {
          en: 'Elevate policy proposals from partisan talking points into enduring institutional arguments.',
          uz: 'Siyosiy takliflarni tor bahslardan yuqori — uzoq muddatli institutsional argument darajasiga koʻtarish.',
        },
        modules: [
          {
            id: 'sen-framing',
            title: {
              en: 'Values-First Policy Framing & Anaphora',
              uz: 'Qadriyatga asoslangan ramkalash va anafora ritmi',
            },
            summary: {
              en: 'Lead with shared civic principles before detailing technical policy mechanics.',
              uz: 'Texnik tafsilotlardan oldin umumiy fuqarolik va strategik tamoyillarni qoʻyish.',
            },
            baselineHours: 7,
            difficulty: 'foundational',
            keyFramework: 'Ethos-Logos-Pathos Balance + Tricolon',
            steps: [
              {
                id: 'sen-s1',
                title: {
                  en: 'Anchor policy in shared institutional values',
                  uz: 'Taklifni umumiy institutsional qadriyatlarga bogʻlash',
                },
                drill: {
                  en: 'Rewrite a technical memo into a 2-minute floor statement anchored in public trust.',
                  uz: 'Texnik hisobotni jamiyat ishonchiga tayangan 2 daqiqalik minbar nutqiga aylantiring.',
                },
                framework: 'Shared Principle Entry',
                estimatedMinutes: 50,
              },
              {
                id: 'sen-s2',
                title: {
                  en: 'Apply classical tricolon and antithesis',
                  uz: 'Klassik uchlik ritmi va antitezadan foydalanish',
                },
                drill: {
                  en: 'Draft 3 paired contrast lines ("Not by X, but by Y") for your centerpiece speech.',
                  uz: 'Asosiy nutqingiz uchun 3 ta kuchli qarama-qarshilik juftligini ("X bilan emas, Y bilan") yozing.',
                },
                framework: 'Antithesis & Tricolon Craft',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s3',
                title: {
                  en: 'Structure the 5-part Ciceronian floor speech',
                  uz: '5 qismli Sitseron uslubidagi nutq tuzilmasi',
                },
                drill: {
                  en: 'Outline Exordium, Narratio, Confirmatio, Refutatio, and Peroratio on one page.',
                  uz: 'Kirish, Bayon, Dalillash, Raddiya va Yakun qismlarini bir sahifada loyihalang.',
                },
                framework: 'Classical Five-Part Dispositio',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'sen-coalition',
            title: {
              en: 'Coalition Persuasion & Steelman Concession',
              uz: 'Koalitsiya ishontirishi va oqilona yon berish sanʼati',
            },
            summary: {
              en: 'Win undecided stakeholders by articulating their concerns more clearly than they do.',
              uz: 'Ikkilanayotgan tomonlar xavotirini ulardan ham aniqroq ifodalab ishonch qozonish.',
            },
            baselineHours: 6,
            difficulty: 'intermediate',
            keyFramework: 'Strategic Steelmanning',
            steps: [
              {
                id: 'sen-s4',
                title: {
                  en: 'Map 3 stakeholder incentives and objections',
                  uz: '3 ta manfaatdor tomonning motivlari va eʼtirozlarini xaritalash',
                },
                drill: {
                  en: 'Write the strongest 2-sentence objection for each skeptical bloc.',
                  uz: 'Har bir shubhalanuvchi guruh nomidan eng kuchli 2 jumlalik eʼtirozni yozing.',
                },
                framework: 'Stakeholder Incentive Grid',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s5',
                title: {
                  en: 'Deliver principled concessions without weakening thesis',
                  uz: 'Asosiy tezisni susaytirmasdan oqilona tan olish',
                },
                drill: {
                  en: 'Use "My colleague raises a vital point on cost—and that is precisely why..."',
                  uz: '"Hamkasbim xarajat boʻyicha muhim masala koʻtardi — aynan shu sababli..." uslubini mashq qiling.',
                },
                framework: 'Concede-and-Elevate',
                estimatedMinutes: 50,
              },
              {
                id: 'sen-s6',
                title: {
                  en: 'Translate data into constituent impact',
                  uz: 'Statistikani fuqarolar hayotidagi taʼsirga oʻgirish',
                },
                drill: {
                  en: 'Pair every macro percentage with one real household or institutional outcome.',
                  uz: 'Har bir makro koʻrsatkichni bitta aniq oila yoki muassasa misoli bilan juftlang.',
                },
                framework: 'Macro-to-Micro Bridge',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'sen-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Floor Debate & Hostile Media Control',
          uz: '2-bosqich · Minbar debati va keskin savollarni boshqarish',
        },
        objective: {
          en: 'Hold composure under rapid-fire questioning, false dichotomies, and interruptions.',
          uz: 'Tezkor savollar, sunʼiy dilemmalar va gap boʻlishlar ostida xotirjamlikni saqlash.',
        },
        modules: [
          {
            id: 'sen-hostile-qa',
            title: {
              en: 'Hostile Q&A Pivoting & False Dichotomy Refusal',
              uz: 'Keskin savollarda burilish va yolgʻon dilemmani rad etish',
            },
            summary: {
              en: 'Reject loaded premises calmly and steer the conversation back to substance.',
              uz: 'Tuzoq savollardagi notoʻgʻri taxminni bosiq rad etib, suhbatni mohiyatga qaytarish.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'Premise-Check → Bridge → Substance',
            steps: [
              {
                id: 'sen-s7',
                title: {
                  en: 'Dismantle false-choice traps in one sentence',
                  uz: 'Yolgʻon tanlov tuzoqlarini bitta gapda ochish',
                },
                drill: {
                  en: 'Respond to 6 loaded questions by rejecting the premise without sounding evasive.',
                  uz: '6 ta tuzoq savolga qochmasdan, ammo notoʻgʻri shartni rad etgan holda javob bering.',
                },
                framework: 'Third-Way Reframing',
                estimatedMinutes: 50,
              },
              {
                id: 'sen-s8',
                title: {
                  en: 'Control pace when interrupted aggressively',
                  uz: 'Keskin gap boʻlinganda nutq tempini saqlash',
                },
                drill: {
                  en: 'Lower volume slightly instead of raising pitch; finish the sentence cleanly.',
                  uz: 'Ovozni balandlatish oʻrniga biroz pasaytirib, boshlangan fikrni vazmin tugating.',
                },
                framework: 'Lower-Volume Authority',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s9',
                title: {
                  en: 'Deliver 30-second quotable soundbites',
                  uz: '30 soniyalik aniq va iqtibosga loyiq bayonotlar',
                },
                drill: {
                  en: 'Condense complex policy answers into one crisp, self-contained headline sentence.',
                  uz: 'Murakkab javobni mustaqil iqtibos boʻla oladigan bitta aniq jumlaga jamlang.',
                },
                framework: 'Headline-First Broadcast Rule',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'sen-rebuttal',
            title: {
              en: 'Live Floor Rebuttal & Real-Time Note Flow',
              uz: 'Jonli raddiya va tezkor eslatma oqimi',
            },
            summary: {
              en: 'Track opposing arguments in real time and respond with disciplined signposting.',
              uz: 'Raqib dalillarini real vaqtda qayd etib, aniq raqamlangan tartibda javob qaytarish.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'Three-Column Flow Sheet',
            steps: [
              {
                id: 'sen-s10',
                title: {
                  en: 'Use the 3-column live debate flow sheet',
                  uz: '3 ustunli jonli debat oqim varagʻidan foydalanish',
                },
                drill: {
                  en: 'Flow a recorded parliamentary debate: Claim | Evidence Gap | Counter-Frame.',
                  uz: 'Yozib olingan parlament debatini: Daʼvo | Dalil boʻshligʻi | Qarshi ramka ustunlarida yozing.',
                },
                framework: 'Parliamentary Flow Mapping',
                estimatedMinutes: 55,
              },
              {
                id: 'sen-s11',
                title: {
                  en: 'Signpost "Two points in response..." cleanly',
                  uz: '"Javob sifatida ikki asosiy nuqta..." tartibida soʻzlash',
                },
                drill: {
                  en: 'Never exceed 3 rebuttal points; rank them from most decisive to supporting.',
                  uz: '3 tadan ortiq raddiya nuqtasiga oʻtmang; eng hal qiluvchisini birinchi qoʻying.',
                },
                framework: 'Decisive-First Ranking',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s12',
                title: {
                  en: 'Close rebuttals with future-oriented vision',
                  uz: 'Raddiyani kelajakka qaratilgan strategik qarash bilan yakunlash',
                },
                drill: {
                  en: 'End every defensive exchange by contrasting stagnation vs. decisive leadership.',
                  uz: 'Har bir raddiya yakunida muammoni emas, yechim va yetakchilik istiqbolini koʻrsating.',
                },
                framework: 'Horizon Close',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'sen-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Executive Gravitas & Chamber Simulation',
          uz: '3-bosqich · Yuksak salobat va palata simulyatsiyasi',
        },
        objective: {
          en: 'Deliver composed, authoritative addresses under formal chamber rules and live scrutiny.',
          uz: 'Rasmiy reglament va qatʼiy kuzatuv ostida bosiq hamda taʼsirchan maʼruza ijro etish.',
        },
        modules: [
          {
            id: 'sen-gravitas',
            title: {
              en: 'Gravitas, Breathing & Podium Discipline',
              uz: 'Salobat, nafas nazorati va minbar intizomi',
            },
            summary: {
              en: 'Project unhurried calm through diaphragmatic breath and measured gestures.',
              uz: 'Diafragma nafasi va oʻlchovli harakatlar orqali shoshilmas xotirjamlik namoyon etish.',
            },
            baselineHours: 6,
            difficulty: 'executive',
            keyFramework: 'Podium Stillness Protocol',
            steps: [
              {
                id: 'sen-s13',
                title: {
                  en: 'Anchor hands on lectern edges without gripping',
                  uz: 'Minbar chetiga qoʻlni qismasdan yengil tayanish',
                },
                drill: {
                  en: 'Record a 4-minute podium address focusing on shoulder stillness and deliberate gestures.',
                  uz: 'Yelka barqarorligi va oʻlchovli imo-ishoralarga eʼtibor qaratib 4 daqiqalik minbar nutqi yozing.',
                },
                framework: 'Lectern Poise Standard',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s14',
                title: {
                  en: 'Execute paperless glance-and-deliver reading',
                  uz: 'Qogʻozga qaramay, tez nigoh bilan ravon soʻzlash',
                },
                drill: {
                  en: 'Read key passages by glancing silently at phrases, then speaking strictly to the room.',
                  uz: 'Iborani sukutda koʻzdan kechiring, soʻng boshni koʻtarib faqat auditoriyaga qarab gapiring.',
                },
                framework: 'Silent-Glance Delivery',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s15',
                title: {
                  en: 'Modulate vocal warmth in formal closing',
                  uz: 'Rasmiy yakunda ovoz harorati va salobatini uygʻunlashtirish',
                },
                drill: {
                  en: 'Deliver the final paragraph 15% slower with deliberate pauses after each triad.',
                  uz: 'Soʻnggi xatboshini 15% sekinroq, har bir uchlikdan keyin pauza bilan ijro eting.',
                },
                framework: 'Statesman Peroration',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'sen-simulation',
            title: {
              en: 'Full Policy Address & Panel Cross-Fire',
              uz: 'Toʻliq strategik nutq va ekspertlar savol-javobi',
            },
            summary: {
              en: 'Stress-test your complete speech and impromptu rebuttal in one formal session.',
              uz: 'Toʻliq maʼruza va tayyorgarliksiz raddiyani bitta rasmiy sessiyada sinovdan oʻtkazish.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'End-to-End Chamber Stress Test',
            steps: [
              {
                id: 'sen-s16',
                title: {
                  en: 'Deliver 7-minute formal policy address',
                  uz: '7 daqiqalik rasmiy strategik maʼruza taqdimoti',
                },
                drill: {
                  en: 'Maintain exact time discipline and balanced ethos/logos/pathos cadence.',
                  uz: 'Aniq reglament va etos–logos–patos muvozanatini toʻliq saqlab soʻzlang.',
                },
                framework: 'Timed Chamber Address',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s17',
                title: {
                  en: 'Handle 8 rapid-fire skeptical panel questions',
                  uz: '8 ta tezkor tanqidiy savolga javob berish',
                },
                drill: {
                  en: 'Answer each in 30–45 seconds with zero defensiveness and crisp evidence.',
                  uz: 'Har biriga himoyalanish ohangisiz, aniq dalil bilan 30–45 soniyada javob bering.',
                },
                framework: 'Rapid Panel Discipline',
                estimatedMinutes: 50,
              },
              {
                id: 'sen-s18',
                title: {
                  en: 'Review rubric and lock executive speech playbook',
                  uz: 'Baholash mezonini tahlil qilib shaxsiy notiqlik qoʻllanmasini mustahkamlash',
                },
                drill: {
                  en: 'Document your top 3 bridge phrases, opening structures, and vocal cues.',
                  uz: 'Eng samarali 3 ta koʻprik ibora, ochilish qolipi va ovoz belgilarini qayd eting.',
                },
                framework: 'Personal Oratory Playbook',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
    ],
  },
];
