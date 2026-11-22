import type { Blueprint } from '../schemas';

export const RHETORIC_BLUEPRINTS: Blueprint[] = [
  {
    id: 'tedx-oratory',
    category: 'rhetoric',
    code: 'TEDX-01',
    title: {
      en: 'TEDx Talk Preparation',
      uz: 'TEDx nutqiga tayyorgarlik',
    },
    subtitle: {
      en: 'One clear idea, a script written for the ear, and enough rehearsal to deliver it naturally in under 18 minutes.',
      uz: 'Bitta aniq gʻoya, quloq uchun yozilgan matn va uni 18 daqiqadan kam vaqtda tabiiy yetkazish uchun yetarli mashq.',
    },
    archetypeLabel: {
      en: 'TEDx speaker',
      uz: 'TEDx maʼruzachisi',
    },
    recommendedWeeks: 7,
    baselineTotalHours: 48,
    examVersion: 'TEDx talk — TEDx Rules, Content Guidelines and organizer speaker guidance (ted.com, 2026)',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'TED — TEDx Rules', url: 'https://www.ted.com/tedx/before-you-start/tedx-rules' },
      { label: 'TED — TEDx Content Guidelines', url: 'https://www.ted.com/tedx/organizer-guide/tedx-content-guidelines' },
      {
        label: 'TEDx Organizer Guide — Outline + script',
        url: 'https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/outline-script',
      },
      {
        label: 'TEDx Organizer Guide — Rehearsals',
        url: 'https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/rehearsals',
      },
      {
        label: 'TEDx Organizer Guide — Create + prepare slides',
        url: 'https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program/prepare-your-speaker/create-prepare-slides',
      },
    ],
    phases: [
      {
        id: 'tedx-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose: the idea and the rules',
          uz: '1-bosqich · Tashxis: gʻoya va qoidalar',
        },
        objective: {
          en: 'Record a baseline, choose one idea, check it against the TEDx rules, and turn it into a spoken script.',
          uz: 'Boshlangʻich yozuv qiling, bitta gʻoyani tanlang, uni TEDx qoidalari bilan tekshiring va ogʻzaki matnga aylantiring.',
        },
        modules: [
          {
            id: 'tedx-throughline',
            title: {
              en: 'One idea and its throughline',
              uz: 'Bitta gʻoya va uning asosiy chizigʻi',
            },
            summary: {
              en: 'Find the single idea your talk is about, state it in one sentence, and make sure every point and claim serves it.',
              uz: 'Nutqingiz qaysi yagona gʻoya haqida ekanini toping, uni bir gapda ifodalang va har bir fikr hamda daʼvo unga xizmat qilishini taʼminlang.',
            },
            baselineHours: 8,
            difficulty: 'foundational',
            keyFramework: 'One idea, one sentence',
            steps: [
              {
                id: 'tedx-s1',
                title: {
                  en: 'Record a 3-minute baseline talk',
                  uz: '3 daqiqalik boshlangʻich nutqni yozib olish',
                },
                drill: {
                  en: 'Explain your idea for 3 minutes on video with no notes. Transcribe it, count filler words and mark where you lost the thread. Keep it as the baseline for later comparison.',
                  uz: 'Gʻoyangizni 3 daqiqa davomida yozuvsiz, videoga olib tushuntiring. Matnga oʻgiring, toʻldiruvchi soʻzlarni sanang va fikr uzilgan joylarni belgilang. Keyingi taqqoslash uchun saqlab qoʻying.',
                },
                framework: 'Baseline recording',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-s2',
                title: {
                  en: 'Write the throughline in one sentence',
                  uz: 'Asosiy chiziqni bir gapda yozish',
                },
                drill: {
                  en: 'Draft 5 one-sentence versions of your idea. Keep the one a friend can repeat back after hearing it once. If your notes hold two big ideas, pick the stronger and park the other.',
                  uz: 'Gʻoyangizning bir gaplik 5 ta variantini yozing. Doʻstingiz bir marta eshitib qayta aytib bera oladiganini tanlang. Qaydlaringizda ikkita katta gʻoya boʻlsa, kuchlirogʻini qoldiring.',
                },
                framework: 'One-idea test',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-s3',
                title: {
                  en: 'Check the idea against the TEDx rules',
                  uz: 'Gʻoyani TEDx qoidalari bilan tekshirish',
                },
                drill: {
                  en: 'Read the TEDx Rules and Content Guidelines. Confirm: no promoting your products, books or employer; no party politics; science claims backed by peer-reviewed work. Write a one-paragraph note for your organizer.',
                  uz: 'TEDx qoidalari va kontent talablarini oʻqing. Tekshiring: oʻz mahsulotingiz, kitobingiz yoki ish beruvchingiz reklamasi yoʻq; partiyaviy siyosat yoʻq; ilmiy daʼvolar taqriz qilingan tadqiqotlarga tayanadi. Tashkilotchi uchun bir xatboshilik izoh yozing.',
                },
                framework: 'TEDx content check',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-oratory-audience-map',
                title: {
                  en: 'Define who the talk is for and what should change',
                  uz: 'Nutq kim uchunligi va nima oʻzgarishi kerakligini aniqlash',
                },
                drill: {
                  en: 'Write 3 lines: who is in the room, what they believe now, and what you want them to think or do afterwards. Cut any planned point that does not move them from line 2 to line 3.',
                  uz: '3 qator yozing: zalda kimlar oʻtiradi, ular hozir nimaga ishonadi va nutqdan keyin nima deb oʻylashi yoki nima qilishini xohlaysiz. Ularni 2-qatordan 3-qatorga olib oʻtmaydigan har bir fikrni olib tashlang.',
                },
                framework: 'Audience before and after',
                estimatedMinutes: 30,
              },
              {
                id: 'tedx-oratory-evidence-log',
                title: {
                  en: 'Build an evidence log for every claim',
                  uz: 'Har bir daʼvo uchun dalillar jadvalini tuzish',
                },
                drill: {
                  en: 'List every factual claim you plan to make with its source, marked as personal experience, published research or data. Replace or drop any claim you cannot source.',
                  uz: 'Aytmoqchi boʻlgan har bir faktni manbasi bilan roʻyxatga oling va shaxsiy tajriba, nashr etilgan tadqiqot yoki statistika deb belgilang. Manbasi topilmagan daʼvoni almashtiring yoki olib tashlang.',
                },
                framework: 'Claim–source table',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'tedx-narrative',
            title: {
              en: 'Outline and spoken script',
              uz: 'Reja va ogʻzaki matn',
            },
            summary: {
              en: 'Turn the idea into an outline with a clear beginning, middle and end, then a script written the way you talk and cut to your time slot.',
              uz: 'Gʻoyani aniq boshlanish, oʻrta va yakunga ega rejaga, soʻng oʻzingiz gapirgandek yozilgan va vaqtingizga moslab qisqartirilgan matnga aylantiring.',
            },
            baselineHours: 10,
            difficulty: 'foundational',
            keyFramework: 'Outline, script, transcript edit',
            steps: [
              {
                id: 'tedx-s4',
                title: {
                  en: 'Outline the talk on one page',
                  uz: 'Nutq rejasini bir sahifada tuzish',
                },
                drill: {
                  en: 'Write an outline with an opening, 2–3 supporting points and a close. Under each point add one example or piece of evidence and one sentence on why it matters to this audience.',
                  uz: 'Kirish, 2–3 ta asosiy fikr va yakundan iborat reja yozing. Har bir fikr ostiga bitta misol yoki dalil va bu auditoriya uchun nega muhimligi haqida bir gap qoʻshing.',
                },
                framework: 'Three-part outline',
                estimatedMinutes: 50,
              },
              {
                id: 'tedx-s5',
                title: {
                  en: 'Write the first full script',
                  uz: 'Birinchi toʻliq matnni yozish',
                },
                drill: {
                  en: 'Write the whole talk as you would say it: short sentences, everyday words, no jargon or slide-speak. Read it aloud with a timer and note the length against the slot your organizer gave you.',
                  uz: 'Butun nutqni xuddi gapirgandek yozing: qisqa gaplar, oddiy soʻzlar, jargon yoʻq. Uni taymer bilan ovoz chiqarib oʻqing va uzunligini tashkilotchi bergan vaqt bilan solishtiring.',
                },
                framework: 'Write for the ear',
                estimatedMinutes: 90,
              },
              {
                id: 'tedx-s6',
                title: {
                  en: 'Cut the script to fit the time slot',
                  uz: 'Matnni ajratilgan vaqtga moslab qisqartirish',
                },
                drill: {
                  en: 'Time a read-through at a natural pace. If it runs over your slot (TEDx talks stay under 18 minutes), cut whole sections rather than words until about 10% of the slot is spare.',
                  uz: 'Matnni tabiiy surʼatda oʻqib vaqtini oʻlchang. Ajratilgan vaqtdan oshsa (TEDx nutqlari 18 daqiqadan kam boʻladi), vaqtning taxminan 10% i boʻsh qolguncha alohida soʻzlarni emas, butun qismlarni qisqartiring.',
                },
                framework: 'Cut sections, not words',
                estimatedMinutes: 60,
              },
              {
                id: 'tedx-oratory-story-check',
                title: {
                  en: 'Test each story against the idea',
                  uz: 'Har bir hikoyani gʻoyaga mosligini tekshirish',
                },
                drill: {
                  en: 'For every anecdote, write which point it supports. TED advises using personal stories sparingly: cut any story that only entertains and keep each remaining one under 90 seconds.',
                  uz: 'Har bir hikoya qaysi fikrni qoʻllab-quvvatlashini yozing. TED shaxsiy hikoyalarni kam ishlatishni maslahat beradi: faqat koʻngil ochadigan hikoyani olib tashlang, qolganlarini 90 soniyadan qisqa qiling.',
                },
                framework: 'Every story earns its place',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-oratory-second-draft',
                title: {
                  en: 'Record, transcribe and write draft 2',
                  uz: 'Yozib olish, matnga oʻgirish va 2-variantni yozish',
                },
                drill: {
                  en: 'Talk through the outline on audio without the script, transcribe it, and merge your best spoken phrasing into draft 2. Remove overstatement, fake emotion and empty inspiration lines.',
                  uz: 'Rejaga qarab, matnsiz gapirib audioga yozing, uni matnga oʻgiring va eng yaxshi ogʻzaki iboralarni 2-variantga qoʻshing. Mubolagʻa, soxta hissiyot va quruq ilhom jumlalarini olib tashlang.',
                },
                framework: 'Record–transcribe–edit',
                estimatedMinutes: 75,
              },
            ],
          },
        ],
      },
      {
        id: 'tedx-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build: voice, stage and slides',
          uz: '2-bosqich · Qurish: ovoz, sahna va slaydlar',
        },
        objective: {
          en: 'Make the script sound spoken, look calm on video, and be supported rather than carried by slides.',
          uz: 'Matn jonli nutqdek eshitilsin, videoda xotirjam koʻrinsin va slaydlar nutqni koʻtarib emas, qoʻllab tursin.',
        },
        modules: [
          {
            id: 'tedx-voice',
            title: {
              en: 'Voice, pace and pauses',
              uz: 'Ovoz, surʼat va pauzalar',
            },
            summary: {
              en: 'Use your own recordings to find a clear pace, natural emphasis, and pauses where the audience needs time to think.',
              uz: 'Oʻz yozuvlaringiz orqali aniq surʼat, tabiiy urgʻu va tinglovchiga oʻylash uchun vaqt beradigan pauzalarni toping.',
            },
            baselineHours: 7,
            difficulty: 'intermediate',
            keyFramework: 'Listen back, fix one thing',
            steps: [
              {
                id: 'tedx-s7',
                title: {
                  en: 'Measure your speaking rate',
                  uz: 'Nutq surʼatingizni oʻlchash',
                },
                drill: {
                  en: 'Record a 2-minute section, count the words and work out your words per minute. Compare story parts with explanation parts and mark where you rush.',
                  uz: '2 daqiqalik qismni yozib oling, soʻzlarni sanang va daqiqasiga necha soʻz aytishingizni hisoblang. Hikoya va tushuntirish qismlarini solishtiring, shoshilgan joylarni belgilang.',
                },
                framework: 'Words-per-minute check',
                estimatedMinutes: 30,
              },
              {
                id: 'tedx-s8',
                title: {
                  en: 'Mark pauses in the script',
                  uz: 'Matnda pauzalarni belgilash',
                },
                drill: {
                  en: 'Mark a pause before and after your key sentence and after every question you ask the audience. Re-record the section and check on playback that each pause is really there.',
                  uz: 'Asosiy gapingizdan oldin va keyin hamda tinglovchiga beriladigan har bir savoldan soʻng pauza belgilang. Qismni qayta yozing va har bir pauza haqiqatan borligini tinglab tekshiring.',
                },
                framework: 'Pause marks',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-s9',
                title: {
                  en: 'Cut fillers and rising endings',
                  uz: 'Toʻldiruvchi soʻzlar va savolsimon ohangni kamaytirish',
                },
                drill: {
                  en: 'Listen to a full run on audio only. Tally fillers (um, so, like) and statements that rise like questions. Re-record and aim to halve the tally.',
                  uz: 'Toʻliq yugurishni faqat audio holda tinglang. Toʻldiruvchi soʻzlarni (hm, xullas, ana) va savolga oʻxshab koʻtarilib tugaydigan darak gaplarni sanang. Qayta yozib, sonini ikki baravar kamaytiring.',
                },
                framework: 'Audio-only review',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-oratory-emphasis',
                title: {
                  en: 'Choose the words to stress',
                  uz: 'Urgʻu beriladigan soʻzlarni tanlash',
                },
                drill: {
                  en: 'In each paragraph, underline the one word that carries the meaning. Say the paragraph three ways and keep the version a listener finds clearest.',
                  uz: 'Har bir xatboshida maʼnoni tashiydigan bitta soʻzning tagiga chizing. Xatboshini uch xil aytib koʻring va tinglovchiga eng tushunarli boʻlgan variantni qoldiring.',
                },
                framework: 'One stressed word per line',
                estimatedMinutes: 35,
              },
            ],
          },
          {
            id: 'tedx-stage',
            title: {
              en: 'Stage presence on camera',
              uz: 'Sahnada va kamera oldida oʻzini tutish',
            },
            summary: {
              en: 'TEDx talks are filmed. Rehearse standing still, set your feet before key lines, and use gestures that read well on video.',
              uz: 'TEDx nutqlari videoga olinadi. Bir joyda turib mashq qiling, muhim gaplardan oldin oyoqlaringizni mustahkam qoʻying va videoda yaxshi koʻrinadigan imo-ishoralardan foydalaning.',
            },
            baselineHours: 6,
            difficulty: 'intermediate',
            keyFramework: 'Stand, breathe, speak',
            steps: [
              {
                id: 'tedx-s10',
                title: {
                  en: 'Rehearse standing still',
                  uz: 'Bir joyda turib mashq qilish',
                },
                drill: {
                  en: 'Run the talk standing on a marked spot. TED notes that pacing can ruin the video: move only on transitions, then pause, breathe and plant your feet before you speak again.',
                  uz: 'Nutqni belgilangan nuqtada turib ijro eting. TED u yoq-bu yoqqa yurish videoni buzishini taʼkidlaydi: faqat oʻtishlarda yuring, keyin toʻxtab, nafas olib, oyoqlaringizni qoʻyib gapiring.',
                },
                framework: 'Planted feet',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-s11',
                title: {
                  en: 'Review a muted video',
                  uz: 'Ovozsiz videoni tahlil qilish',
                },
                drill: {
                  en: 'Watch a full run with the sound off. List every repeated fidget or gesture that does not match the words, and pick two to remove in the next run.',
                  uz: 'Toʻliq yugurishni ovozsiz tomosha qiling. Takrorlanuvchi beixtiyor harakatlar va soʻzga mos kelmaydigan imo-ishoralarni yozing, keyingi yugurishda ulardan ikkitasini yoʻqoting.',
                },
                framework: 'Muted video review',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-s12',
                title: {
                  en: 'Practise eye contact by section',
                  uz: 'Qismlab koʻz bilan aloqa qilishni mashq qilish',
                },
                drill: {
                  en: 'Place three marks around the room. Deliver one complete thought to each mark before moving your eyes, and check on video that you are not reading from notes or a screen.',
                  uz: 'Xonaning uch joyiga belgi qoʻying. Nigohingizni koʻchirishdan oldin har bir belgiga bitta toʻliq fikrni ayting va videoda qaydlar yoki ekrandan oʻqimayotganingizni tekshiring.',
                },
                framework: 'One thought, one person',
                estimatedMinutes: 35,
              },
              {
                id: 'tedx-oratory-wardrobe',
                title: {
                  en: 'Plan clothes and microphone for filming',
                  uz: 'Suratga olish uchun kiyim va mikrofonni rejalashtirish',
                },
                drill: {
                  en: 'Pick an outfit without stripes, busy patterns, very bright colours or dangling jewellery, as TED advises. Rehearse once in it with a clip-on or headset mic and check the fit.',
                  uz: 'TED maslahatiga koʻra, chiziqli, mayda naqshli, juda yorqin rangli kiyim va osilib turuvchi taqinchoqlarsiz kiyim tanlang. Unda taqiladigan yoki boshga kiyiladigan mikrofon bilan bir marta mashq qiling.',
                },
                framework: 'Camera-ready check',
                estimatedMinutes: 25,
              },
            ],
          },
          {
            id: 'tedx-slides',
            title: {
              en: 'Slides that support the talk',
              uz: 'Nutqni qoʻllab-quvvatlaydigan slaydlar',
            },
            summary: {
              en: 'Decide whether you need slides at all. If you do: one idea per slide, one or two lines of large text, and only images you have the right to use.',
              uz: 'Avvalo slayd kerakmi, hal qiling. Kerak boʻlsa: har bir slaydda bitta gʻoya, bir-ikki qator yirik matn va faqat foydalanish huquqingiz bor tasvirlar.',
            },
            baselineHours: 6,
            difficulty: 'intermediate',
            keyFramework: 'One slide, one point',
            steps: [
              {
                id: 'tedx-s13',
                title: {
                  en: 'Decide whether you need slides',
                  uz: 'Slayd kerak-kerakmasligini hal qilish',
                },
                drill: {
                  en: 'Mark the moments where an image or number would help more than words. If there are fewer than three, try the talk with no slides; TED notes that many strong talks have none.',
                  uz: 'Tasvir yoki raqam soʻzdan koʻra koʻproq yordam beradigan lahzalarni belgilang. Ular uchtadan kam boʻlsa, nutqni slaydsiz sinab koʻring: TED koʻplab kuchli nutqlar slaydsiz boʻlganini taʼkidlaydi.',
                },
                framework: 'Slides only where they help',
                estimatedMinutes: 30,
              },
              {
                id: 'tedx-s14',
                title: {
                  en: "Build the deck to TED's slide guidance",
                  uz: 'Slaydlarni TED koʻrsatmalariga muvofiq tayyorlash',
                },
                drill: {
                  en: 'Give each slide one idea in one or two lines of simple sans-serif text, readable from the back row. Build at 16:9 (1920×1080) and check it still works at 4:3.',
                  uz: 'Har bir slaydga bitta gʻoyani bir-ikki qator oddiy sans-serif matnda, oxirgi qatordan oʻqiladigan qilib joylang. 16:9 (1920×1080) formatda tayyorlang va 4:3 da ham ishlashini tekshiring.',
                },
                framework: 'One slide, one point',
                estimatedMinutes: 90,
              },
              {
                id: 'tedx-s15',
                title: {
                  en: 'Clear the rights for every image',
                  uz: 'Har bir tasvirga huquqni rasmiylashtirish',
                },
                drill: {
                  en: 'For each image or chart, record who owns it and your right to use it. Credit Creative Commons images on the slide and replace anything you cannot clear.',
                  uz: 'Har bir tasvir yoki diagramma uchun muallifi kimligini va undan foydalanish huquqingizni yozib qoʻying. Creative Commons tasvirlarining manbasini slaydda koʻrsating, huquqi aniq boʻlmaganini almashtiring.',
                },
                framework: 'Image rights log',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-oratory-slide-sync',
                title: {
                  en: 'Rehearse slide changes',
                  uz: 'Slayd almashtirishni mashq qilish',
                },
                drill: {
                  en: 'Run the talk with the clicker three times, or mark slide cues in the script for an offstage operator. Note every place where you wait for the screen or turn to talk to it.',
                  uz: 'Nutqni pult bilan uch marta ijro eting yoki sahna ortidagi operator uchun matnda slayd belgilarini qoʻying. Ekranni kutgan yoki unga qarab gapirgan har bir joyni yozib boring.',
                },
                framework: 'Clicker run',
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
          en: 'Phase 3 · Rehearse: full runs and dress rehearsal',
          uz: '3-bosqich · Mashq: toʻliq yugurishlar va bosh repetitsiya',
        },
        objective: {
          en: 'Rehearse until the talk sounds natural rather than recited, with timed runs, live listeners, a short break and a dress rehearsal.',
          uz: 'Nutq yod olingandek emas, tabiiy eshitilguncha vaqtli yugurishlar, jonli tinglovchilar, qisqa tanaffus va bosh repetitsiya bilan mashq qiling.',
        },
        modules: [
          {
            id: 'tedx-dress-rehearsal',
            title: {
              en: 'Timed runs and dress rehearsal',
              uz: 'Vaqtli yugurishlar va bosh repetitsiya',
            },
            summary: {
              en: 'TED treats rehearsal as non-negotiable: run the full talk on a schedule, test it on live listeners, and finish with a dress rehearsal.',
              uz: 'TED repetitsiyani shart deb hisoblaydi: toʻliq nutqni jadval asosida ijro eting, jonli tinglovchilarda sinang va bosh repetitsiya bilan yakunlang.',
            },
            baselineHours: 11,
            difficulty: 'executive',
            keyFramework: 'Rehearse until it sounds unrehearsed',
            steps: [
              {
                id: 'tedx-s16',
                title: {
                  en: 'Do three timed full runs',
                  uz: 'Uchta vaqtli toʻliq yugurish',
                },
                drill: {
                  en: 'Do three full runs on video in one session with a visible countdown. All three must finish inside your slot; log the time of each and every place you stumbled.',
                  uz: 'Bir mashgʻulotda koʻrinib turgan taymer bilan uchta toʻliq yugurishni videoga oling. Uchalasi ham ajratilgan vaqt ichida tugashi kerak; har birining vaqtini va qoqilgan joylarni yozing.',
                },
                framework: 'Timed full runs',
                estimatedMinutes: 75,
              },
              {
                id: 'tedx-s17',
                title: {
                  en: 'Rehearse in front of a small audience',
                  uz: 'Kichik auditoriya oldida mashq qilish',
                },
                drill: {
                  en: 'Give the talk to 2–5 people. Afterwards ask each to state your idea in one sentence; if most cannot, revise the section where they got lost.',
                  uz: 'Nutqni 2–5 kishiga soʻzlab bering. Soʻng har biridan gʻoyangizni bir gapda aytishini soʻrang; koʻpchilik ayta olmasa, ular adashgan qismni qayta ishlang.',
                },
                framework: 'Can they repeat the idea?',
                estimatedMinutes: 60,
              },
              {
                id: 'tedx-s18',
                title: {
                  en: 'Practise recovering from a blank',
                  uz: 'Esdan chiqqanda tiklanishni mashq qilish',
                },
                drill: {
                  en: 'During a run, have a partner stop you at three random points. Each time, restart by pausing, restating the last point in one sentence and moving on to the next section.',
                  uz: 'Yugurish paytida sherigingiz sizni uch tasodifiy joyda toʻxtatsin. Har safar pauza qiling, oxirgi fikrni bir gapda takrorlang va keyingi qismga oʻting.',
                },
                framework: 'Pause, restate, continue',
                estimatedMinutes: 40,
              },
              {
                id: 'tedx-oratory-compare-baseline',
                title: {
                  en: 'Compare a full run with your baseline',
                  uz: 'Toʻliq yugurishni boshlangʻich yozuv bilan solishtirish',
                },
                drill: {
                  en: 'Record a full run and compare it with your first baseline: filler count, pace and how clearly the idea is stated. Write the three biggest changes and one thing still to fix.',
                  uz: 'Toʻliq yugurishni yozib oling va birinchi boshlangʻich yozuv bilan solishtiring: toʻldiruvchi soʻzlar soni, surʼat va gʻoya qanchalik aniq aytilgani. Uchta eng katta oʻzgarishni va hali tuzatilishi kerak boʻlgan bitta narsani yozing.',
                },
                framework: 'Before/after review',
                estimatedMinutes: 45,
              },
              {
                id: 'tedx-oratory-dress-rehearsal',
                title: {
                  en: 'Hold a dress rehearsal',
                  uz: 'Bosh repetitsiya oʻtkazish',
                },
                drill: {
                  en: 'Run the talk as close to the event as possible: outfit, mic, slides on the house computer, a host introduction and a time cue. Do at least two runs and log any technical issue for the organizer.',
                  uz: 'Nutqni tadbirga imkon qadar yaqin sharoitda ijro eting: kiyim, mikrofon, tadbir kompyuteridagi slaydlar, boshlovchining tanishtiruvi va vaqt signali. Kamida ikki marta oʻtkazing va texnik muammolarni tashkilotchiga yozib bering.',
                },
                framework: 'Dress rehearsal',
                estimatedMinutes: 90,
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
      en: 'Trial Advocacy',
      uz: 'Sud jarayonida advokatlik mahorati',
    },
    subtitle: {
      en: 'Case theory, direct and cross-examination under the Federal Rules of Evidence, objections, openings and closings.',
      uz: 'Ish nazariyasi, Federal dalillar qoidalari asosida toʻgʻridan-toʻgʻri va qarshi soʻroq, eʼtirozlar, ochilish va yakuniy nutqlar.',
    },
    archetypeLabel: {
      en: 'Trial advocate',
      uz: 'Sud advokati',
    },
    recommendedWeeks: 9,
    baselineTotalHours: 64,
    examVersion: 'Trial advocacy — US-style adversarial jury trial (Federal Rules of Evidence)',
    lastVerified: '2026-11-22',
    sources: [
      { label: 'Federal Rules of Evidence, Rule 611 (mode of examination, leading questions)', url: 'https://www.law.cornell.edu/rules/fre/rule_611' },
      { label: 'Federal Rules of Evidence, Rule 613 (prior statements of witnesses)', url: 'https://www.law.cornell.edu/rules/fre/rule_613' },
      { label: 'Federal Rules of Evidence, Rule 103 (rulings on evidence, objections)', url: 'https://www.law.cornell.edu/rules/fre/rule_103' },
      { label: 'Federal Rules of Evidence, Rule 801 (definition of hearsay)', url: 'https://www.law.cornell.edu/rules/fre/rule_801' },
      { label: 'Federal Rules of Evidence, Rule 901 (authenticating evidence)', url: 'https://www.law.cornell.edu/rules/fre/rule_901' },
      {
        label: 'Ninth Circuit Model Criminal Jury Instruction 1.4 — What Is Not Evidence',
        url: 'https://cdn.ca9.uscourts.gov/datastore/jury-instructions/criminal/1-4-what-is-not-evidence.pdf',
      },
      { label: 'Minnesota Rules of Professional Conduct, Rule 3.4(e) (ABA Model Rule text)', url: 'https://www.revisor.mn.gov/court_rules/pr/subtype/cond/id/3.4' },
      { label: 'University of Houston Law Center — Trial structure', url: 'https://law.uh.edu/blakely/trial-advocacy-Non-litigators/TrialStructure.pdf' },
    ],
    phases: [
      {
        id: 'adv-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose: case theory and evidence rules',
          uz: '1-bosqich · Tashxis: ish nazariyasi va dalillar qoidalari',
        },
        objective: {
          en: 'Test your starting level on a practice case file, build a case theory, and learn the evidence rules you will use in court.',
          uz: 'Mashq uchun ish materiallarida boshlangʻich darajangizni sinang, ish nazariyasini tuzing va sudda ishlatadigan dalillar qoidalarini oʻrganing.',
        },
        modules: [
          {
            id: 'adv-case-theory',
            title: {
              en: 'Case file analysis and case theory',
              uz: 'Ish materiallarini tahlil qilish va ish nazariyasi',
            },
            summary: {
              en: 'Work from a practice case file, such as a public mock-trial case, to a short case theory and theme that every witness and exhibit must support.',
              uz: 'Mashq uchun ish materiallaridan (masalan, ochiq oʻquv sud ishi) har bir guvoh va ashyoviy dalil qoʻllab-quvvatlashi kerak boʻlgan qisqa ish nazariyasi va mavzu chiqaring.',
            },
            baselineHours: 9,
            difficulty: 'foundational',
            keyFramework: 'Case theory and theme',
            steps: [
              {
                id: 'adv-s1',
                title: {
                  en: 'Record a baseline opening statement',
                  uz: 'Boshlangʻich ochilish nutqini yozib olish',
                },
                drill: {
                  en: 'Read the case file once, then give a 3-minute opening on video. Transcribe it and mark every sentence that argues or gives your opinion instead of describing what the evidence will show.',
                  uz: 'Ish materiallarini bir marta oʻqing va 3 daqiqalik ochilish nutqini videoga yozing. Matnga oʻgiring va dalillar nimani koʻrsatishini aytish oʻrniga bahslashgan yoki fikr bildirgan har bir gapni belgilang.',
                },
                framework: 'Baseline recording',
                estimatedMinutes: 60,
              },
              {
                id: 'adv-s2',
                title: {
                  en: 'Build an elements-and-facts chart',
                  uz: 'Elementlar va faktlar jadvalini tuzish',
                },
                drill: {
                  en: 'List the legal elements your side must prove or attack. Under each, list helpful and harmful facts with the witness or document they come from. Flag any element with no admissible proof.',
                  uz: 'Tomoningiz isbotlashi yoki rad etishi kerak boʻlgan huquqiy elementlarni yozing. Har biri ostiga foydali va zararli faktlarni manbasi (guvoh yoki hujjat) bilan yozing. Maqbul dalili yoʻq elementni belgilang.',
                },
                framework: 'Elements–facts chart',
                estimatedMinutes: 90,
              },
              {
                id: 'adv-s3',
                title: {
                  en: 'Write the case theory in one paragraph',
                  uz: 'Ish nazariyasini bir xatboshida yozish',
                },
                drill: {
                  en: 'In 100 words or fewer, explain what happened and why your side should win, accounting for your worst facts. Every fact on your chart must fit the theory or be explained by it.',
                  uz: '100 soʻzdan oshirmay nima boʻlganini va nega tomoningiz yutishi kerakligini, eng noqulay faktlarni ham hisobga olib tushuntiring. Jadvaldagi har bir fakt nazariyaga mos kelishi yoki u bilan izohlanishi kerak.',
                },
                framework: 'Case theory paragraph',
                estimatedMinutes: 60,
              },
              {
                id: 'legal-advocacy-theme',
                title: {
                  en: 'Pick and test a theme',
                  uz: 'Mavzuni tanlash va sinash',
                },
                drill: {
                  en: 'Write 3 candidate themes of under 10 words. Keep the one that fits your case theory and can be said in the opening, during cross and in the closing without sounding forced.',
                  uz: '10 soʻzdan qisqa 3 ta mavzu variantini yozing. Ish nazariyangizga mos keladigan va ochilish nutqida, qarshi soʻroqda hamda yakuniy nutqda sunʼiy eshitilmaydiganini qoldiring.',
                },
                framework: 'Theme test',
                estimatedMinutes: 40,
              },
              {
                id: 'legal-advocacy-witness-plan',
                title: {
                  en: 'Plan your witness order',
                  uz: 'Guvohlar tartibini rejalashtirish',
                },
                drill: {
                  en: 'Decide which witnesses you will call and in what order, with one line on what each proves. Note what the other side will try to get from each witness on cross.',
                  uz: 'Qaysi guvohlarni qanday tartibda chaqirishingizni hal qiling va har biri nimani isbotlashini bir qatorda yozing. Qarama-qarshi tomon qarshi soʻroqda har bir guvohdan nimani olishga urinishini qayd eting.',
                },
                framework: 'Witness plan',
                estimatedMinutes: 45,
              },
            ],
          },
          {
            id: 'adv-bench-qa',
            title: {
              en: 'Evidence rules and objections',
              uz: 'Dalillar qoidalari va eʼtirozlar',
            },
            summary: {
              en: 'Learn the evidence rules used most at trial, object with a specific ground, argue objections briefly to the judge, and lay foundations for exhibits.',
              uz: 'Sudda eng koʻp ishlatiladigan dalillar qoidalarini oʻrganing, aniq asos bilan eʼtiroz bildiring, sudyaga qisqa dalil keltiring va ashyoviy dalillar uchun asos yarating.',
            },
            baselineHours: 9,
            difficulty: 'foundational',
            keyFramework: 'Object, state the ground, sit down',
            steps: [
              {
                id: 'adv-s10',
                title: {
                  en: 'Put the core rules on one page',
                  uz: 'Asosiy qoidalarni bir sahifaga jamlash',
                },
                drill: {
                  en: 'Summarise FRE 611 (leading, scope of cross), 602 (personal knowledge), 403, 801 (hearsay), 613 (prior statements) and 901 (authentication) in your own words, with one courtroom example each.',
                  uz: 'FRE 611 (yoʻnaltiruvchi savollar, qarshi soʻroq doirasi), 602 (shaxsan bilish), 403, 801 (eshitilgan gap), 613 (avvalgi bayonotlar) va 901 (haqiqiylikni tasdiqlash) qoidalarini oʻz soʻzlaringiz bilan, bittadan misol bilan yozing.',
                },
                framework: 'One-page rule sheet',
                estimatedMinutes: 75,
              },
              {
                id: 'adv-s11',
                title: {
                  en: 'Spot objections in a transcript',
                  uz: 'Stenogrammada eʼtirozli savollarni topish',
                },
                drill: {
                  en: "Take a 5-page practice transcript. Mark every objectionable question, write the one-line objection with its ground (e.g. 'Objection, leading'), and check each call against the rule text.",
                  uz: '5 sahifalik mashq stenogrammasini oling. Har bir eʼtiroz bildirish mumkin boʻlgan savolni belgilang, asosi bilan bir qatorlik eʼtirozni yozing (masalan, «Eʼtiroz, yoʻnaltiruvchi savol») va qoida matni bilan tekshiring.',
                },
                framework: 'Objection and ground',
                estimatedMinutes: 60,
              },
              {
                id: 'adv-s12',
                title: {
                  en: 'Argue an objection in 30 seconds',
                  uz: 'Eʼtirozni 30 soniyada asoslash',
                },
                drill: {
                  en: 'For 5 contested objections, prepare a response for each side: the rule, why it applies to this question, and the ruling you ask for. Deliver each in 30 seconds to a partner acting as judge.',
                  uz: '5 ta bahsli eʼtiroz uchun har ikki tomonning javobini tayyorlang: qoida, u nega aynan shu savolga tegishli va qanday qaror soʻraysiz. Har birini sudya rolidagi sherigingizga 30 soniyada ayting.',
                },
                framework: 'Rule, fact, ruling',
                estimatedMinutes: 50,
              },
              {
                id: 'legal-advocacy-preserve-record',
                title: {
                  en: 'Practise preserving the record',
                  uz: 'Bayonnomada xatoni qayd ettirishni mashq qilish',
                },
                drill: {
                  en: 'Using FRE 103, script what you must say to preserve an error: a timely objection or motion to strike with the specific ground, or an offer of proof when evidence is excluded. Role-play each twice.',
                  uz: 'FRE 103 asosida xatoni qayd ettirish uchun nima deyishingizni yozing: aniq asosli oʻz vaqtidagi eʼtiroz yoki oʻchirish haqida iltimos, dalil rad etilganda esa uning mazmunini taqdim etish. Har birini ikki marta rolda ijro eting.',
                },
                framework: 'Preserve the record',
                estimatedMinutes: 40,
              },
              {
                id: 'legal-advocacy-exhibit-foundation',
                title: {
                  en: 'Lay the foundation for an exhibit',
                  uz: 'Ashyoviy dalil uchun asos yaratish',
                },
                drill: {
                  en: 'Script the questions to mark, show, identify and offer a document through a witness with knowledge (FRE 901(b)(1)). Run it aloud until you can do it without notes in under 2 minutes.',
                  uz: 'Hujjatni belgilash, guvohga koʻrsatish, u orqali tanitish va dalil sifatida taqdim etish savollarini yozing (FRE 901(b)(1)). Qaydlarsiz 2 daqiqadan kam vaqtda bajara olguningizcha ovoz chiqarib mashq qiling.',
                },
                framework: 'Mark, identify, offer',
                estimatedMinutes: 45,
              },
            ],
          },
        ],
      },
      {
        id: 'adv-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build: examinations and opening',
          uz: '2-bosqich · Qurish: soʻroqlar va ochilish nutqi',
        },
        objective: {
          en: 'Write and rehearse direct examinations, controlled cross-examinations and an opening that previews the evidence without arguing.',
          uz: 'Toʻgʻridan-toʻgʻri soʻroqni, nazorat ostidagi qarshi soʻroqni va dalillarni bahslashmasdan tanishtiruvchi ochilish nutqini yozing va mashq qiling.',
        },
        modules: [
          {
            id: 'adv-direct-exam',
            title: {
              en: 'Direct examination',
              uz: 'Toʻgʻridan-toʻgʻri soʻroq',
            },
            summary: {
              en: 'Let your witness tell the story with open, non-leading questions (FRE 611(c)), organised under topic headlines the jury can follow.',
              uz: 'Guvohingiz voqeani ochiq, yoʻnaltirmaydigan savollar (FRE 611(c)) orqali, hakamlar hayʼati kuzata oladigan mavzu sarlavhalari boʻyicha aytib bersin.',
            },
            baselineHours: 10,
            difficulty: 'intermediate',
            keyFramework: 'Open questions, topic headlines',
            steps: [
              {
                id: 'adv-s4',
                title: {
                  en: 'Write a direct examination outline',
                  uz: 'Toʻgʻridan-toʻgʻri soʻroq rejasini yozish',
                },
                drill: {
                  en: 'For one witness, write topic headlines and under each 3–6 open questions (who, what, where, when, how, describe, explain). Mark every fact the answers must cover.',
                  uz: 'Bitta guvoh uchun mavzu sarlavhalarini va har biri ostiga 3–6 ta ochiq savol yozing (kim, nima, qayerda, qachon, qanday, tasvirlab bering, tushuntiring). Javoblar qamrashi kerak boʻlgan har bir faktni belgilang.',
                },
                framework: 'Headline outline',
                estimatedMinutes: 75,
              },
              {
                id: 'adv-s5',
                title: {
                  en: 'Remove leading questions',
                  uz: 'Yoʻnaltiruvchi savollarni olib tashlash',
                },
                drill: {
                  en: "Rewrite every question in your outline that suggests its answer. Then do a run where a partner objects 'leading' each time you slip; repeat until a run draws no valid objection.",
                  uz: 'Rejangizdagi javobni ichiga olgan har bir savolni qayta yozing. Soʻng sherigingiz har xatoda «yoʻnaltiruvchi savol» deb eʼtiroz bildiradigan yugurish qiling; asosli eʼtirozsiz yugurishgacha takrorlang.',
                },
                framework: 'Leading-question audit',
                estimatedMinutes: 45,
              },
              {
                id: 'adv-s6',
                title: {
                  en: 'Introduce the witness and their knowledge',
                  uz: 'Guvohni va uning xabardorligini tanishtirish',
                },
                drill: {
                  en: 'Write 4–6 opening questions that show who the witness is and how they personally know the facts (FRE 602). Keep this part under 2 minutes when spoken.',
                  uz: 'Guvoh kimligini va faktlarni shaxsan qanday bilishini koʻrsatadigan 4–6 ta boshlangʻich savol yozing (FRE 602). Bu qism ogʻzaki 2 daqiqadan oshmasin.',
                },
                framework: 'Personal knowledge first',
                estimatedMinutes: 40,
              },
              {
                id: 'legal-advocacy-refresh-memory',
                title: {
                  en: "Practise refreshing a witness's memory",
                  uz: 'Guvoh xotirasini tiklashni mashq qilish',
                },
                drill: {
                  en: 'Role-play a witness who forgets a detail: show them their earlier statement, let them read it silently, take it back and ask again. Remember the other side may inspect the document (FRE 612).',
                  uz: 'Tafsilotni unutgan guvohni rolda ijro eting: unga avvalgi bayonotini koʻrsating, ichida oʻqisin, qaytib oling va savolni qayta bering. Qarama-qarshi tomon hujjatni koʻrishi mumkinligini unutmang (FRE 612).',
                },
                framework: 'Refresh, then re-ask',
                estimatedMinutes: 35,
              },
              {
                id: 'legal-advocacy-redirect',
                title: {
                  en: 'Plan a short redirect',
                  uz: 'Qisqa qayta soʻroqni rejalashtirish',
                },
                drill: {
                  en: 'After a partner cross-examines your witness, plan a redirect of no more than 3 questions that repairs the single most damaging point. Skip redirect if nothing needs repair.',
                  uz: 'Sherigingiz guvohingizni qarshi soʻroq qilgach, eng zararli bitta nuqtani tuzatadigan, 3 savoldan oshmaydigan qayta soʻroqni rejalashtiring. Tuzatadigan narsa boʻlmasa, qayta soʻroq qilmang.',
                },
                framework: 'One-point redirect',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'adv-cross-control',
            title: {
              en: 'Cross-examination and impeachment',
              uz: 'Qarshi soʻroq va guvoh ishonchliligini shubha ostiga olish',
            },
            summary: {
              en: 'Control adverse witnesses with short leading questions, stay within the scope of direct (FRE 611(b)), and impeach with prior inconsistent statements (FRE 613).',
              uz: 'Qarshi tomon guvohlarini qisqa yoʻnaltiruvchi savollar bilan nazorat qiling, toʻgʻridan-toʻgʻri soʻroq doirasida qoling (FRE 611(b)) va avvalgi zid bayonotlar bilan ishonchlilikni shubha ostiga oling (FRE 613).',
            },
            baselineHours: 11,
            difficulty: 'intermediate',
            keyFramework: 'One fact per leading question',
            steps: [
              {
                id: 'adv-s7',
                title: {
                  en: 'Write a cross in chapters',
                  uz: 'Qarshi soʻroqni boblarga boʻlib yozish',
                },
                drill: {
                  en: 'Split your cross into 3–5 chapters, each proving one point you will use in closing. Write every question as a short leading statement with one fact and note the source page for each.',
                  uz: 'Qarshi soʻroqni 3–5 bobga boʻling, har biri yakuniy nutqda ishlatadigan bitta nuqtani isbotlasin. Har bir savolni bitta faktli qisqa yoʻnaltiruvchi gap sifatida yozing va manba sahifasini koʻrsating.',
                },
                framework: 'Chapters, one fact each',
                estimatedMinutes: 90,
              },
              {
                id: 'adv-s8',
                title: {
                  en: 'Check your cross stays in scope',
                  uz: 'Qarshi soʻroq doiradan chiqmasligini tekshirish',
                },
                drill: {
                  en: 'Compare your cross with the direct you heard. Cross is limited to the subject of direct and credibility (FRE 611(b)); move any out-of-scope chapter to your own case or drop it.',
                  uz: 'Qarshi soʻroqni eshitgan toʻgʻridan-toʻgʻri soʻroq bilan solishtiring. U toʻgʻridan-toʻgʻri soʻroq mavzusi va ishonchlilik bilan cheklanadi (FRE 611(b)); doiradan tashqaridagi bobni oʻz ishingizga oʻtkazing yoki olib tashlang.',
                },
                framework: 'Scope check',
                estimatedMinutes: 30,
              },
              {
                id: 'adv-s9',
                title: {
                  en: 'Impeach with a prior inconsistent statement',
                  uz: 'Avvalgi zid bayonot bilan ishonchlilikni shubha ostiga olish',
                },
                drill: {
                  en: "Rehearse three steps: commit the witness to today's answer, credit the earlier statement (when, where, to whom), then confront with the exact words. Run it 5 times until it takes under 90 seconds.",
                  uz: 'Uch qadamni mashq qiling: guvohni bugungi javobiga bogʻlang, avvalgi bayonotni tasdiqlang (qachon, qayerda, kimga), soʻng aynan oʻsha soʻzlarni oʻqib bering. 90 soniyadan kam vaqt olguncha 5 marta takrorlang.',
                },
                framework: 'Commit, credit, confront',
                estimatedMinutes: 60,
              },
              {
                id: 'legal-advocacy-runaway-witness',
                title: {
                  en: 'Control a witness who will not answer',
                  uz: 'Javobdan qochayotgan guvohni nazorat qilish',
                },
                drill: {
                  en: 'Have a partner give long or evasive answers. Practise repeating the exact question, then asking the judge for direction, without arguing with the witness. Count the times you lost control on video.',
                  uz: 'Sherigingiz uzun yoki chalgʻituvchi javoblar bersin. Guvoh bilan bahslashmasdan, aynan oʻsha savolni takrorlashni, keyin sudyadan koʻrsatma soʻrashni mashq qiling. Videoda nazoratni necha marta yoʻqotganingizni sanang.',
                },
                framework: 'Repeat the question',
                estimatedMinutes: 45,
              },
              {
                id: 'legal-advocacy-stop-early',
                title: {
                  en: 'Cut the one question too many',
                  uz: 'Ortiqcha savolni olib tashlash',
                },
                drill: {
                  en: 'Review a recorded cross and mark the point where you already had what you needed for closing. Rewrite it to stop there, and remove every question that asks the witness to explain why.',
                  uz: 'Yozib olingan qarshi soʻroqni koʻrib, yakuniy nutq uchun keraklisini olgan nuqtani belgilang. Shu yerda toʻxtaydigan qilib qayta yozing va guvohdan «nega» deb izoh soʻraydigan har bir savolni olib tashlang.',
                },
                framework: 'Stop when you have it',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'legal-advocacy-opening',
            title: {
              en: 'Opening statement',
              uz: 'Ochilish nutqi',
            },
            summary: {
              en: "Preview the evidence and your case theory without arguing. Lawyers' statements are not evidence, so promise only what admissible evidence will show.",
              uz: 'Dalillarni va ish nazariyangizni bahslashmasdan tanishtiring. Advokat soʻzlari dalil emas, shuning uchun faqat maqbul dalillar koʻrsatadigan narsani vaʼda qiling.',
            },
            baselineHours: 8,
            difficulty: 'intermediate',
            keyFramework: 'Tell the story the evidence will show',
            steps: [
              {
                id: 'legal-advocacy-opening-draft',
                title: {
                  en: 'Draft a 6-minute opening',
                  uz: '6 daqiqalik ochilish nutqini yozish',
                },
                drill: {
                  en: 'Write an opening that starts with your theme, tells the story in order, names the witness who will prove each part and ends with the verdict you will ask for. Keep it to 6 minutes read aloud.',
                  uz: 'Mavzu bilan boshlanib, voqeani tartib bilan aytadigan, har bir qismni qaysi guvoh isbotlashini koʻrsatadigan va soʻraladigan hukm bilan tugaydigan nutq yozing. Ovoz chiqarib oʻqilganda 6 daqiqadan oshmasin.',
                },
                framework: 'Theme, story, request',
                estimatedMinutes: 90,
              },
              {
                id: 'legal-advocacy-opening-promises',
                title: {
                  en: 'Audit every promise against the proof',
                  uz: 'Har bir vaʼdani dalil bilan tekshirish',
                },
                drill: {
                  en: 'Highlight each factual claim in your opening and link it to a witness or exhibit. Delete anything you cannot prove: a lawyer may not allude to matters admissible evidence will not support.',
                  uz: 'Nutqdagi har bir faktik daʼvoni belgilang va uni guvoh yoki ashyoviy dalilga bogʻlang. Isbotlay olmaydiganingizni oʻchiring: advokat maqbul dalillar bilan tasdiqlanmaydigan narsaga ishora qila olmaydi.',
                },
                framework: 'Promise–proof check',
                estimatedMinutes: 45,
              },
              {
                id: 'legal-advocacy-opening-argument',
                title: {
                  en: 'Take the argument out of the opening',
                  uz: 'Ochilish nutqidan bahsni olib tashlash',
                },
                drill: {
                  en: "Mark sentences that comment on credibility or state your personal opinion ('I believe', 'clearly lying'). Rewrite each as a fact the evidence will show, or move it to your closing.",
                  uz: 'Ishonchlilik haqida fikr bildirgan yoki shaxsiy qarashingizni aytgan gaplarni belgilang («menimcha», «aniq yolgʻon gapiryapti»). Har birini dalil koʻrsatadigan fakt sifatida qayta yozing yoki yakuniy nutqqa oʻtkazing.',
                },
                framework: 'Facts, not opinions',
                estimatedMinutes: 40,
              },
              {
                id: 'legal-advocacy-opening-delivery',
                title: {
                  en: 'Deliver the opening without a script',
                  uz: 'Ochilish nutqini matnsiz aytish',
                },
                drill: {
                  en: 'Give the opening on video three times using only a 5-cue outline. Compare it with your baseline for arguing sentences, unsupported promises and filler words.',
                  uz: 'Ochilish nutqini faqat 5 ta tayanch soʻzli reja bilan uch marta videoga yozing. Uni boshlangʻich yozuv bilan bahsli gaplar, asossiz vaʼdalar va toʻldiruvchi soʻzlar boʻyicha solishtiring.',
                },
                framework: 'Five-cue delivery',
                estimatedMinutes: 60,
              },
            ],
          },
        ],
      },
      {
        id: 'adv-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Simulate: closing and mock trial',
          uz: '3-bosqich · Simulyatsiya: yakuniy nutq va oʻquv sud',
        },
        objective: {
          en: 'Argue from the evidence actually admitted, then try the full case against an opponent before a judge and review the recording.',
          uz: 'Haqiqatda qabul qilingan dalillarga tayanib bahslashing, soʻng butun ishni sudya oldida raqibga qarshi olib boring va yozuvni tahlil qiling.',
        },
        modules: [
          {
            id: 'adv-closing',
            title: {
              en: 'Closing argument',
              uz: 'Yakuniy nutq',
            },
            summary: {
              en: "Argue from the evidence admitted: tie facts to each element and the jury instructions, answer the other side's best points, and ask for a verdict.",
              uz: 'Qabul qilingan dalillardan kelib chiqib bahslashing: faktlarni har bir element va hakamlar hayʼatiga koʻrsatmalar bilan bogʻlang, raqibning eng kuchli dalillariga javob bering va hukm soʻrang.',
            },
            baselineHours: 8,
            difficulty: 'executive',
            keyFramework: 'Evidence, elements, verdict',
            steps: [
              {
                id: 'adv-s13',
                title: {
                  en: 'Build the closing from the record',
                  uz: 'Yakuniy nutqni sud yozuvlari asosida qurish',
                },
                drill: {
                  en: 'List the testimony and exhibits actually admitted in your practice trial. Outline a closing that walks through each element with the evidence that proves it, citing who said what.',
                  uz: 'Mashq sudida haqiqatda qabul qilingan koʻrsatuvlar va ashyoviy dalillarni yozing. Har bir elementni uni isbotlovchi dalil bilan, kim nima deganini koʻrsatib, ketma-ket oʻtadigan yakuniy nutq rejasini tuzing.',
                },
                framework: 'Element-by-element closing',
                estimatedMinutes: 75,
              },
              {
                id: 'adv-s14',
                title: {
                  en: "Answer the other side's best points",
                  uz: 'Raqibning eng kuchli dalillariga javob berish',
                },
                drill: {
                  en: 'Write the three strongest arguments the other side will make and a 30-second answer to each drawn from the evidence. Place them after your own case, not at the start.',
                  uz: 'Raqib keltiradigan eng kuchli uchta dalilni va har biriga dalillarga asoslangan 30 soniyalik javobni yozing. Ularni boshida emas, oʻz ishingizni bayon qilgandan keyin joylang.',
                },
                framework: 'Meet the best counterargument',
                estimatedMinutes: 50,
              },
              {
                id: 'adv-s15',
                title: {
                  en: 'Use the jury instructions',
                  uz: 'Hakamlar hayʼatiga koʻrsatmalardan foydalanish',
                },
                drill: {
                  en: 'Take the model instructions on burden of proof and witness credibility and quote or paraphrase them where they help. Check you never misstate the law or give a personal opinion on guilt or credibility.',
                  uz: 'Isbot yuki va guvoh ishonchliligi haqidagi namunaviy koʻrsatmalarni oling va foydali joyda iqtibos keltiring yoki mazmunini ayting. Qonunni notoʻgʻri talqin qilmaganingizni va aybdorlik yoki ishonchlilik haqida shaxsiy fikr bildirmaganingizni tekshiring.',
                },
                framework: 'Instruction-anchored argument',
                estimatedMinutes: 45,
              },
              {
                id: 'adv-s16',
                title: {
                  en: 'Prepare a short rebuttal',
                  uz: 'Qisqa raddiya tayyorlash',
                },
                drill: {
                  en: "If your side carries the burden and speaks last, plan a 2-minute rebuttal that answers only what the other side argued. Practise it live straight after a partner's closing you have not seen.",
                  uz: 'Agar isbot yuki sizda boʻlsa va oxirgi soʻz sizga berilsa, faqat raqib aytganlariga javob beradigan 2 daqiqalik raddiya rejalashtiring. Uni sherigingizning oldindan koʻrmagan yakuniy nutqidan soʻng darhol mashq qiling.',
                },
                framework: 'Rebuttal answers, nothing new',
                estimatedMinutes: 40,
              },
              {
                id: 'adv-s17',
                title: {
                  en: 'Deliver and time the closing',
                  uz: 'Yakuniy nutqni vaqtini oʻlchab aytish',
                },
                drill: {
                  en: 'Deliver a 10-minute closing on video from an outline. Check the timing, that every factual claim matches the record, and that your opening theme returns in the final minute.',
                  uz: 'Reja asosida 10 daqiqalik yakuniy nutqni videoga yozing. Vaqtni, har bir faktik daʼvo sud yozuvlariga mosligini va ochilish nutqidagi mavzu oxirgi daqiqada qaytishini tekshiring.',
                },
                framework: 'Timed closing',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'legal-advocacy-mock-trial',
            title: {
              en: 'Full mock trial',
              uz: 'Toʻliq oʻquv sud jarayoni',
            },
            summary: {
              en: 'Try the practice case end to end against an opponent and a judge, then review the recording against your rule sheet and case theory.',
              uz: 'Mashq ishini boshidan oxirigacha raqib va sudya ishtirokida olib boring, soʻng yozuvni qoidalar varagʻingiz va ish nazariyangiz bilan solishtirib tahlil qiling.',
            },
            baselineHours: 9,
            difficulty: 'executive',
            keyFramework: 'Full trial run and review',
            steps: [
              {
                id: 'adv-s18',
                title: {
                  en: 'Assemble a trial notebook',
                  uz: 'Sud papkasini tayyorlash',
                },
                drill: {
                  en: 'Put together one binder or file: case theory, witness outlines, exhibit list with foundations, rule sheet and closing outline. A partner should be able to find any item in under 30 seconds.',
                  uz: 'Bitta papka yoki fayl yigʻing: ish nazariyasi, guvohlar rejalari, asoslari bilan ashyoviy dalillar roʻyxati, qoidalar varagʻi va yakuniy nutq rejasi. Sherigingiz istalgan qismni 30 soniyada topa olishi kerak.',
                },
                framework: 'Trial notebook',
                estimatedMinutes: 60,
              },
              {
                id: 'legal-advocacy-mock-run',
                title: {
                  en: 'Run a full mock trial',
                  uz: 'Toʻliq oʻquv sudini oʻtkazish',
                },
                drill: {
                  en: 'With classmates or a mock-trial club, run an opening, one direct, one cross, live objections and a closing before someone acting as judge. Record the whole trial.',
                  uz: 'Kursdoshlar yoki oʻquv sud klubi bilan sudya rolidagi kishi oldida ochilish nutqi, bitta toʻgʻridan-toʻgʻri soʻroq, bitta qarshi soʻroq, jonli eʼtirozlar va yakuniy nutqni oʻtkazing. Butun jarayonni yozib oling.',
                },
                framework: 'Full trial run',
                estimatedMinutes: 120,
              },
              {
                id: 'legal-advocacy-objection-review',
                title: {
                  en: 'Review your objection calls',
                  uz: 'Eʼtirozlaringizni tahlil qilish',
                },
                drill: {
                  en: 'From the recording, list every objection made or missed. Check each ground against the rule text and note whether it was timely and specific, as FRE 103 requires.',
                  uz: 'Yozuvdan bildirilgan yoki oʻtkazib yuborilgan har bir eʼtirozni roʻyxatga oling. Har bir asosni qoida matni bilan tekshiring va FRE 103 talab qilganidek oʻz vaqtida va aniq boʻlganini qayd eting.',
                },
                framework: 'Objection log',
                estimatedMinutes: 45,
              },
              {
                id: 'legal-advocacy-final-review',
                title: {
                  en: 'Compare with your baseline',
                  uz: 'Boshlangʻich yozuv bilan solishtirish',
                },
                drill: {
                  en: 'Compare your mock-trial opening with your first baseline: arguing sentences, unsupported promises and fillers. Write the 3 skills to keep drilling, with one example of each from the recording.',
                  uz: 'Oʻquv suddagi ochilish nutqini birinchi boshlangʻich yozuv bilan solishtiring: bahsli gaplar, asossiz vaʼdalar va toʻldiruvchi soʻzlar. Mashq qilishda davom etadigan 3 ta koʻnikmani yozuvdan bittadan misol bilan yozing.',
                },
                framework: 'Before/after review',
                estimatedMinutes: 45,
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
      en: 'Policy Debate and Parliamentary Speaking',
      uz: 'Siyosiy munozara va parlament nutqi',
    },
    subtitle: {
      en: 'World Schools debate under the WSDC rules, plus formal floor speeches under legislative rules of debate.',
      uz: 'WSDC qoidalari boʻyicha World Schools munozarasi va qonun chiqaruvchi organ qoidalari asosidagi rasmiy nutqlar.',
    },
    archetypeLabel: {
      en: 'Debater and policy speaker',
      uz: 'Munozarachi va siyosat maʼruzachisi',
    },
    recommendedWeeks: 8,
    baselineTotalHours: 50,
    examVersion: 'World Schools debate format (WSDC Rules, Aug 2026) + legislative floor debate (US Senate rules)',
    lastVerified: '2026-11-22',
    sources: [
      {
        label: 'WSDC Tournament Committee & Debate Rules (updated August 2026)',
        url: 'https://www.wsdcdebating.org/_files/ugd/669183_8ee4b95d4bf4409a893cc22e5f1f35b9.pdf',
      },
      { label: 'WSDC — General resources (rules, adjudicators guide, motion bank)', url: 'https://www.wsdcdebating.org/services-4' },
      {
        label: 'Senate Manual (S. Doc. 113-18) — Standing Rules of the Senate, Rule XIX (debate)',
        url: 'https://www.govinfo.gov/content/pkg/CDOC-113sdoc18/html/CDOC-113sdoc18.htm',
      },
      { label: "Robert's Rules of Order — official FAQ (motions, amendments, closing debate)", url: 'https://robertsrules.com/frequently-asked-questions/' },
    ],
    phases: [
      {
        id: 'sen-p1',
        order: 1,
        title: {
          en: 'Phase 1 · Diagnose: motions and cases',
          uz: '1-bosqich · Tashxis: mavzular va ish chizigʻi',
        },
        objective: {
          en: 'Record a baseline speech, then learn to read a motion, define it fairly and build a team case the WSDC rules accept.',
          uz: 'Boshlangʻich nutqni yozib oling, soʻng munozara mavzusini oʻqish, uni adolatli taʼriflash va WSDC qoidalariga mos jamoa ish chizigʻini qurishni oʻrganing.',
        },
        modules: [
          {
            id: 'sen-framing',
            title: {
              en: 'Reading and defining the motion',
              uz: 'Munozara mavzusini oʻqish va taʼriflash',
            },
            summary: {
              en: 'Work out what a motion asks, give it a reasonable definition, and avoid squirrelling, place-setting and time-setting, which the WSDC rules forbid.',
              uz: 'Mavzu nimani soʻrayotganini aniqlang, unga oqilona taʼrif bering va WSDC qoidalari taqiqlagan taʼrifni buzish, joy yoki vaqt bilan cheklashdan saqlaning.',
            },
            baselineHours: 7,
            difficulty: 'foundational',
            keyFramework: 'Reasonable definition',
            steps: [
              {
                id: 'sen-s1',
                title: {
                  en: 'Record a baseline 8-minute speech',
                  uz: '8 daqiqalik boshlangʻich nutqni yozib olish',
                },
                drill: {
                  en: 'Pick a motion from the WSDC motion bank, prepare for 30 minutes and give a full 8-minute first proposition speech on video. Note your time, your structure and how often you read from notes.',
                  uz: 'WSDC mavzular bankidan mavzu tanlang, 30 daqiqa tayyorlaning va taklif tomonining birinchi nutqini toʻliq 8 daqiqa videoga yozing. Vaqt, tuzilma va qaydlardan necha marta oʻqiganingizni yozing.',
                },
                framework: 'Baseline speech',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s2',
                title: {
                  en: 'Define five motions',
                  uz: 'Beshta mavzuga taʼrif berish',
                },
                drill: {
                  en: 'For 5 motions, write a one-paragraph definition and what each side must prove. Test each against the WSDC rules: would an ordinary intelligent person accept it, and does it leave room for debate?',
                  uz: '5 ta mavzu uchun bir xatboshilik taʼrif va har bir tomon nimani isbotlashi kerakligini yozing. Har birini WSDC qoidalari bilan sinang: oddiy aqlli odam uni qabul qiladimi va bahs uchun joy qoladimi?',
                },
                framework: 'Reasonable definition test',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s3',
                title: {
                  en: 'Spot and answer unfair definitions',
                  uz: 'Adolatsiz taʼriflarni aniqlash va javob berish',
                },
                drill: {
                  en: 'For one general motion, write a squirrelled, a place-set and a time-set definition. In two sentences each, explain why the rules forbid it and how first opposition should challenge it.',
                  uz: 'Bitta umumiy mavzu uchun buzilgan, joy bilan cheklangan va vaqt bilan cheklangan taʼrif yozing. Har biri uchun ikki gapda qoidalar nega taqiqlashini va muxolifatning birinchi maʼruzachisi qanday eʼtiroz bildirishini tushuntiring.',
                },
                framework: 'Definition challenge',
                estimatedMinutes: 40,
              },
              {
                id: 'senatorial-rhetoric-burden',
                title: {
                  en: 'Map the burden of proof for each side',
                  uz: 'Har bir tomonning isbot yukini aniqlash',
                },
                drill: {
                  en: 'For 3 motions, write what proposition must prove (true as a general rule, not in every case) and what opposition must show. Note how the burden changes when a motion is worded as an absolute.',
                  uz: '3 ta mavzu uchun taklif tomoni nimani isbotlashi (har bir holatda emas, umumiy qoida sifatida) va muxolifat nimani koʻrsatishi kerakligini yozing. Mavzu mutlaq shaklda berilganda yuk qanday oʻzgarishini qayd eting.',
                },
                framework: 'Burden map',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'senatorial-rhetoric-case',
            title: {
              en: 'Building a team case',
              uz: 'Jamoaviy ish chizigʻini qurish',
            },
            summary: {
              en: 'Turn a motion into 2–3 arguments with clear mechanisms and examples, split across three speakers as the WSDC speaker roles expect.',
              uz: 'Mavzuni aniq mexanizm va misollarga ega 2–3 ta dalilga aylantiring va ularni WSDC maʼruzachi rollariga muvofiq uch maʼruzachiga taqsimlang.',
            },
            baselineHours: 9,
            difficulty: 'foundational',
            keyFramework: 'Claim, mechanism, impact',
            steps: [
              {
                id: 'senatorial-rhetoric-argument',
                title: {
                  en: 'Write three arguments with mechanisms',
                  uz: 'Mexanizmli uchta dalil yozish',
                },
                drill: {
                  en: 'For one motion, write 3 arguments as claim, why it is true (mechanism) and why it matters (impact), each under 150 words with one real, checkable example.',
                  uz: 'Bitta mavzu uchun 3 ta dalilni daʼvo, nega toʻgʻri (mexanizm) va nega muhim (taʼsir) shaklida yozing; har biri 150 soʻzdan kam boʻlsin va bitta tekshirsa boʻladigan real misolga ega boʻlsin.',
                },
                framework: 'Claim, mechanism, impact',
                estimatedMinutes: 75,
              },
              {
                id: 'senatorial-rhetoric-split',
                title: {
                  en: 'Plan the case split between speakers',
                  uz: 'Dalillarni maʼruzachilar oʻrtasida taqsimlash',
                },
                drill: {
                  en: "Assign arguments to the first and second speakers and write the first speaker's case outline and split announcement. The third speaker mainly rebuts and may only carry a small, pre-announced part.",
                  uz: 'Dalillarni birinchi va ikkinchi maʼruzachilarga taqsimlang hamda birinchi maʼruzachining reja va taqsimot eʼlonini yozing. Uchinchi maʼruzachi asosan raddiya beradi, faqat oldindan eʼlon qilingan kichik qismni olishi mumkin.',
                },
                framework: 'Speaker roles',
                estimatedMinutes: 45,
              },
              {
                id: 'senatorial-rhetoric-opposition',
                title: {
                  en: 'Prepare the other side too',
                  uz: 'Qarama-qarshi tomonga ham tayyorlanish',
                },
                drill: {
                  en: 'Write the 2 strongest arguments for the side you disagree with. Decide whether opposition will only attack or also run its own case; if it runs one, outline it.',
                  uz: 'Siz qoʻshilmaydigan tomon uchun eng kuchli 2 ta dalilni yozing. Muxolifat faqat hujum qiladimi yoki oʻz ish chizigʻini ham taqdim etadimi, hal qiling; taqdim etsa, rejasini tuzing.',
                },
                framework: 'Strongest version of the other side',
                estimatedMinutes: 50,
              },
              {
                id: 'senatorial-rhetoric-prep-hour',
                title: {
                  en: 'Run a one-hour impromptu preparation',
                  uz: 'Bir soatlik tezkor tayyorgarlik oʻtkazish',
                },
                drill: {
                  en: 'Draw an unseen motion and prepare as a team for 60 minutes with no phone or computer, only a dictionary and an almanac, as the WSDC impromptu rules require. Finish with outlines for all three speakers.',
                  uz: 'Notanish mavzuni tanlang va WSDC tezkor munozara qoidalariga koʻra jamoa bilan 60 daqiqa telefon va kompyutersiz, faqat lugʻat va maʼlumotnoma bilan tayyorlaning. Uchala maʼruzachi uchun reja bilan yakunlang.',
                },
                framework: '60-minute impromptu prep',
                estimatedMinutes: 75,
              },
            ],
          },
        ],
      },
      {
        id: 'sen-p2',
        order: 2,
        title: {
          en: 'Phase 2 · Build: clash, rebuttal and style',
          uz: '2-bosqich · Qurish: toʻqnashuv, raddiya va uslub',
        },
        objective: {
          en: 'Practise points of information, rebuttal and reply speeches, and deliver from notes the way WSDC judges mark style.',
          uz: 'Maʼlumot nuqtalari (POI), raddiya va javob nutqlarini mashq qiling hamda WSDC hakamlari uslubni baholaganidek qaydlarga qarab gapiring.',
        },
        modules: [
          {
            id: 'sen-hostile-qa',
            title: {
              en: 'Points of information',
              uz: 'Maʼlumot nuqtalari (POI)',
            },
            summary: {
              en: 'Offer short points between the first and seventh minute, accept about two in your own speech, and answer them without losing your structure.',
              uz: 'Birinchi va yettinchi daqiqalar oraligʻida qisqa POI taklif qiling, oʻz nutqingizda taxminan ikkitasini qabul qiling va tuzilmani yoʻqotmasdan javob bering.',
            },
            baselineHours: 6,
            difficulty: 'intermediate',
            keyFramework: 'Under 15 seconds',
            steps: [
              {
                id: 'sen-s7',
                title: {
                  en: 'Write ten points of information',
                  uz: 'Oʻnta maʼlumot nuqtasi yozish',
                },
                drill: {
                  en: 'Watch a recorded debate and write 10 points of information against one speech, each under 15 seconds when spoken. Mark the 3 that would hurt the speaker most.',
                  uz: 'Yozib olingan munozarani koʻring va bitta nutqqa qarshi har biri ogʻzaki 15 soniyadan qisqa 10 ta POI yozing. Maʼruzachiga eng koʻp zarar yetkazadigan 3 tasini belgilang.',
                },
                framework: 'Short and sharp',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s8',
                title: {
                  en: 'Take points of information mid-speech',
                  uz: 'Nutq davomida POI qabul qilish',
                },
                drill: {
                  en: 'Give a 5-minute speech while a partner offers a point every minute. Accept two, answer each in under 20 seconds and return to your structure; check on video that you kept your place.',
                  uz: 'Sherigingiz har daqiqada POI taklif qilayotganda 5 daqiqalik nutq soʻzlang. Ikkitasini qabul qiling, har biriga 20 soniyadan kam javob bering va rejangizga qayting; videoda yoʻldan adashmaganingizni tekshiring.',
                },
                framework: 'Accept two, answer, return',
                estimatedMinutes: 40,
              },
              {
                id: 'sen-s9',
                title: {
                  en: 'Respect protected time',
                  uz: 'Himoyalangan vaqtga rioya qilish',
                },
                drill: {
                  en: "In a timed debate, act as timekeeper and offerer. Offer only between minutes 1 and 7, never within 20 seconds of your team's last offer. Log every offer and whether it was in time.",
                  uz: 'Vaqtli munozarada vaqt hisobchisi va POI taklif qiluvchi boʻling. Faqat 1- va 7-daqiqalar oraligʻida, jamoangizning oxirgi taklifidan 20 soniya oʻtgach taklif qiling. Har bir taklifni va vaqtida boʻlganini qayd eting.',
                },
                framework: 'Protected time',
                estimatedMinutes: 30,
              },
              {
                id: 'senatorial-rhetoric-poi-response',
                title: {
                  en: 'Turn hard points into your own argument',
                  uz: 'Qiyin POIni oʻz dalilingizga aylantirish',
                },
                drill: {
                  en: "For 5 hard points of information, write a one-sentence answer that links back to one of your team's arguments. Practise saying each answer within 10 seconds.",
                  uz: '5 ta qiyin POI uchun jamoangiz dalillaridan biriga qaytaradigan bir gaplik javob yozing. Har bir javobni 10 soniya ichida aytishni mashq qiling.',
                },
                framework: 'Answer, then link back',
                estimatedMinutes: 30,
              },
            ],
          },
          {
            id: 'sen-rebuttal',
            title: {
              en: 'Rebuttal and reply speeches',
              uz: 'Raddiya va javob nutqlari',
            },
            summary: {
              en: 'Respond to what was said, more so as the debate goes on, and use the 4-minute reply to compare the two cases without adding new arguments.',
              uz: 'Aytilgan gaplarga munozara davom etgani sari koʻproq javob bering va 4 daqiqalik javob nutqida yangi dalil qoʻshmasdan ikki tomonni solishtiring.',
            },
            baselineHours: 9,
            difficulty: 'intermediate',
            keyFramework: 'Weigh, do not list',
            steps: [
              {
                id: 'sen-s10',
                title: {
                  en: 'Take a flow of a full debate',
                  uz: 'Toʻliq munozarani jadvalga yozib borish',
                },
                drill: {
                  en: "Watch a full WSDC-format debate and note every argument and every response on a flow sheet, by speaker. Afterwards, check that you captured each team's main arguments.",
                  uz: 'WSDC formatidagi toʻliq munozarani koʻring va har bir dalil hamda javobni maʼruzachilar boʻyicha jadvalga yozing. Soʻng har bir jamoaning asosiy dalillarini qayd etganingizni tekshiring.',
                },
                framework: 'Flow sheet',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s11',
                title: {
                  en: 'Write and deliver a third-speaker rebuttal',
                  uz: 'Uchinchi maʼruzachi raddiyasini yozish va aytish',
                },
                drill: {
                  en: "From your flow, write a third-speaker outline grouping the other side's material into 2–3 clashes, saying for each why your side wins it. Deliver it in 8 minutes on video.",
                  uz: 'Jadvalingiz asosida raqib fikrlarini 2–3 ta toʻqnashuvga guruhlaydigan va har birida tomoningiz nega yutishini koʻrsatadigan uchinchi maʼruzachi rejasini yozing. Uni 8 daqiqada videoga ayting.',
                },
                framework: 'Group into clashes',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s12',
                title: {
                  en: 'Give a 4-minute reply speech',
                  uz: '4 daqiqalik javob nutqini soʻzlash',
                },
                drill: {
                  en: 'Give a reply that sums up the debate from your side through its main clashes and ends with why you won. Check it adds no new argument; only new examples of existing arguments are allowed.',
                  uz: 'Munozarani asosiy toʻqnashuvlar orqali oʻz tomoningizdan xulosalaydigan va nega yutganingiz bilan tugaydigan javob nutqini soʻzlang. Yangi dalil qoʻshilmaganini tekshiring; faqat mavjud dalilga yangi misol mumkin.',
                },
                framework: 'Reply: compare, no new case',
                estimatedMinutes: 45,
              },
              {
                id: 'senatorial-rhetoric-weighing',
                title: {
                  en: 'Weigh competing impacts',
                  uz: 'Raqobatdosh taʼsirlarni solishtirish',
                },
                drill: {
                  en: 'For 3 clashes, write a 3-sentence comparison: which impact is larger, more likely or affects more people, and why that decides the debate.',
                  uz: '3 ta toʻqnashuv uchun 3 gaplik solishtirma yozing: qaysi taʼsir kattaroq, ehtimoli yuqoriroq yoki koʻproq odamga tegadi va nega aynan bu munozarani hal qiladi.',
                },
                framework: 'Comparative weighing',
                estimatedMinutes: 40,
              },
            ],
          },
          {
            id: 'sen-gravitas',
            title: {
              en: 'Style: speaking from notes',
              uz: 'Uslub: qaydlarga tayanib gapirish',
            },
            summary: {
              en: 'Style is 40% of the WSDC mark. Speak from brief notes rather than reading, stay clear under time pressure, and keep rhetoric fair to your opponents.',
              uz: 'Uslub WSDC bahosining 40% ini tashkil qiladi. Oʻqib bermasdan qisqa qaydlarga tayanib gapiring, vaqt bosimida ham aniq boʻling va raqiblarga nisbatan adolatli ritorikadan foydalaning.',
            },
            baselineHours: 6,
            difficulty: 'intermediate',
            keyFramework: 'Notes, not a script',
            steps: [
              {
                id: 'sen-s13',
                title: {
                  en: 'Cut your notes down to cue cards',
                  uz: 'Qaydlarni tayanch kartochkalarga qisqartirish',
                },
                drill: {
                  en: 'Reduce one speech to two cards of keywords. Deliver it twice and count how often you look down; the WSDC rules say speakers should refer to notes only from time to time.',
                  uz: 'Bitta nutqni ikkita kalit soʻzli kartochkaga qisqartiring. Uni ikki marta ayting va necha marta pastga qaraganingizni sanang; WSDC qoidalariga koʻra maʼruzachi qaydlarga faqat vaqti-vaqti bilan qarashi kerak.',
                },
                framework: 'Keyword cards',
                estimatedMinutes: 40,
              },
              {
                id: 'sen-s14',
                title: {
                  en: 'Signpost every argument',
                  uz: 'Har bir dalilni aniq eʼlon qilish',
                },
                drill: {
                  en: 'Re-give your baseline speech. Announce your structure in the first minute and signpost each argument; check that a listener can name your points after hearing them once.',
                  uz: 'Boshlangʻich nutqingizni qayta soʻzlang. Birinchi daqiqada tuzilmani eʼlon qiling va har bir dalilni belgilab oʻting; tinglovchi bir marta eshitib fikrlaringizni sanab bera olishini tekshiring.',
                },
                framework: 'Signpost every point',
                estimatedMinutes: 45,
              },
              {
                id: 'sen-s15',
                title: {
                  en: 'Remove uncharitable rhetoric',
                  uz: 'Raqibni kamsituvchi ritorikani olib tashlash',
                },
                drill: {
                  en: 'Mark every line in a recorded speech that mocks the other side or claims they gave no reasons. Rewrite each to engage their actual argument; the rules lower style marks for such lines.',
                  uz: 'Yozib olingan nutqda raqibni masxara qiladigan yoki u hech qanday asos keltirmadi deydigan har bir gapni belgilang. Har birini haqiqiy dalilga javob beradigan qilib qayta yozing; qoidalar bunday gaplar uchun uslub bahosini pasaytiradi.',
                },
                framework: 'Charitable rebuttal',
                estimatedMinutes: 30,
              },
              {
                id: 'senatorial-rhetoric-time-signals',
                title: {
                  en: 'Finish on time with signals',
                  uz: 'Vaqt signallari bilan oʻz vaqtida tugatish',
                },
                drill: {
                  en: 'Give three 8-minute speeches with time signals. Each must end between 7:30 and 8:00 with your conclusion delivered in full, not cut off.',
                  uz: 'Vaqt signallari bilan uchta 8 daqiqalik nutq soʻzlang. Har biri 7:30 va 8:00 oraligʻida, xulosa toʻliq aytilib, uzilib qolmasdan tugashi kerak.',
                },
                framework: 'Time signals',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
      {
        id: 'sen-p3',
        order: 3,
        title: {
          en: 'Phase 3 · Simulate: floor speech and full debates',
          uz: '3-bosqich · Simulyatsiya: rasmiy nutq va toʻliq munozaralar',
        },
        objective: {
          en: 'Apply the skills to a formal legislative floor speech under rules of debate, then run full timed debates and mark them like a judge.',
          uz: 'Koʻnikmalarni munozara qoidalari asosidagi rasmiy parlament nutqida qoʻllang, soʻng toʻliq vaqtli munozaralar oʻtkazib, ularni hakam kabi baholang.',
        },
        modules: [
          {
            id: 'senatorial-rhetoric-floor',
            title: {
              en: 'Legislative floor speech',
              uz: 'Qonun chiqaruvchi organdagi nutq',
            },
            summary: {
              en: "Speak on a bill under formal rules of debate: seek recognition, address the chair, stay on the question, and criticise policies rather than colleagues' motives.",
              uz: 'Qonun loyihasi boʻyicha rasmiy qoidalar asosida soʻzlang: soʻz soʻrang, raislik qiluvchiga murojaat qiling, masaladan chetga chiqmang va hamkasblarning niyatini emas, siyosatni tanqid qiling.',
            },
            baselineHours: 7,
            difficulty: 'executive',
            keyFramework: 'Address the chair, argue the question',
            steps: [
              {
                id: 'senatorial-rhetoric-procedure',
                title: {
                  en: 'Make a rules-of-debate sheet',
                  uz: 'Munozara qoidalari varagʻini tuzish',
                },
                drill: {
                  en: 'Read Senate Rule XIX and the rules of debate of one legislature you care about. On one page, write how to get the floor, whom to address, how often you may speak and what language is out of order.',
                  uz: 'Senat qoidalarining XIX moddasini va oʻzingizni qiziqtirgan bitta parlamentning munozara qoidalarini oʻqing. Bir sahifada soʻzni qanday olish, kimga murojaat qilish, necha marta gapirish mumkinligi va qanday iboralar taqiqlanganini yozing.',
                },
                framework: 'Rules-of-debate sheet',
                estimatedMinutes: 50,
              },
              {
                id: 'senatorial-rhetoric-bill-speech',
                title: {
                  en: 'Write a 5-minute speech on a bill',
                  uz: 'Qonun loyihasi boʻyicha 5 daqiqalik nutq yozish',
                },
                drill: {
                  en: 'Choose a real or model bill. Write a 5-minute speech: what the bill does, the problem, the evidence, the cost, and one amendment you would support. Cite a source for every number.',
                  uz: 'Haqiqiy yoki namunaviy qonun loyihasini tanlang. 5 daqiqalik nutq yozing: loyiha nima qiladi, muammo, dalillar, xarajat va siz qoʻllab-quvvatlaydigan bitta tuzatish. Har bir raqam uchun manba keltiring.',
                },
                framework: 'Problem, policy, cost',
                estimatedMinutes: 90,
              },
              {
                id: 'senatorial-rhetoric-motive-audit',
                title: {
                  en: 'Criticise the policy, not the person',
                  uz: 'Shaxsni emas, siyosatni tanqid qilish',
                },
                drill: {
                  en: 'Mark every sentence about the other side as people rather than their proposal. Senate Rule XIX bars imputing unworthy motives to a colleague; rewrite each line to address the policy instead.',
                  uz: 'Raqiblarning taklifi haqida emas, ularning shaxsi haqidagi har bir gapni belgilang. Senat qoidalarining XIX moddasi hamkasbga nomaqbul niyat yuklashni taqiqlaydi; har bir gapni siyosatga qaratib qayta yozing.',
                },
                framework: 'Policy, not person',
                estimatedMinutes: 30,
              },
              {
                id: 'senatorial-rhetoric-amendment',
                title: {
                  en: 'Move and debate an amendment',
                  uz: 'Tuzatish kiritish va uni muhokama qilish',
                },
                drill: {
                  en: 'In a mock session of at least 5 people with a chair, move an amendment, speak for it for 2 minutes after being recognised, answer one opponent, and see the body vote on it.',
                  uz: 'Kamida 5 kishilik, raisi bor mashq yigʻilishida tuzatish kiriting, soʻz berilgach 2 daqiqa uni yoqlab gapiring, bitta raqibga javob bering va yigʻilish u boʻyicha ovoz berishini kuzating.',
                },
                framework: 'Moving an amendment',
                estimatedMinutes: 60,
              },
            ],
          },
          {
            id: 'sen-simulation',
            title: {
              en: 'Full debate simulation',
              uz: 'Toʻliq munozara simulyatsiyasi',
            },
            summary: {
              en: 'Run full three-on-three debates with one-hour preparation, timed speeches, points of information and replies, then mark them against the WSDC criteria.',
              uz: 'Bir soatlik tayyorgarlik, vaqtli nutqlar, POI va javob nutqlari bilan uchga-uch toʻliq munozaralar oʻtkazing, soʻng ularni WSDC mezonlari boʻyicha baholang.',
            },
            baselineHours: 8,
            difficulty: 'executive',
            keyFramework: 'Content 40 · Style 40 · Strategy 20',
            steps: [
              {
                id: 'sen-s16',
                title: {
                  en: 'Run a full impromptu debate',
                  uz: 'Toʻliq tezkor munozara oʻtkazish',
                },
                drill: {
                  en: 'Hold a full debate: 1 hour of preparation, six 8-minute speeches and two 4-minute replies, opposition reply first. Record it and keep a log of points of information.',
                  uz: 'Toʻliq munozara oʻtkazing: 1 soat tayyorgarlik, oltita 8 daqiqalik nutq va ikkita 4 daqiqalik javob nutqi, avval muxolifat javobi. Uni yozib oling va POI jurnalini yuriting.',
                },
                framework: 'Full WSDC round',
                estimatedMinutes: 120,
              },
              {
                id: 'sen-s17',
                title: {
                  en: 'Mark the debate like a judge',
                  uz: 'Munozarani hakam kabi baholash',
                },
                drill: {
                  en: "From the recording, score each speech out of 100 (40 content, 40 style, 20 strategy) and each reply out of 50, within the WSDC marking bands. Give one reason per score and compare with a partner's marks.",
                  uz: 'Yozuv asosida har bir nutqni 100 ball (40 mazmun, 40 uslub, 20 strategiya), har bir javob nutqini 50 ball boʻyicha WSDC oraliqlarida baholang. Har bir ball uchun bitta sabab yozing va sherigingiz baholari bilan solishtiring.',
                },
                framework: 'WSDC marking',
                estimatedMinutes: 60,
              },
              {
                id: 'sen-s18',
                title: {
                  en: 'Debate the same motion from the other side',
                  uz: 'Oʻsha mavzuni qarama-qarshi tomondan munozara qilish',
                },
                drill: {
                  en: 'Run a second full debate on the same motion from the opposite side. Afterwards, note which of your earlier arguments you could now answer and which still stand.',
                  uz: 'Oʻsha mavzu boʻyicha qarama-qarshi tomondan ikkinchi toʻliq munozara oʻtkazing. Soʻng avvalgi dalillaringizdan qaysilariga endi javob bera olganingizni va qaysilari hali kuchda ekanini yozing.',
                },
                framework: 'Switch sides',
                estimatedMinutes: 120,
              },
              {
                id: 'senatorial-rhetoric-final-review',
                title: {
                  en: 'Compare with your baseline speech',
                  uz: 'Boshlangʻich nutq bilan solishtirish',
                },
                drill: {
                  en: 'Re-give your first baseline speech in 8 minutes on video and compare structure, timing, reliance on notes and quality of rebuttal. Write your 3 biggest gains and 2 priorities to keep practising.',
                  uz: 'Birinchi boshlangʻich nutqingizni 8 daqiqada qayta videoga yozing va tuzilma, vaqt, qaydlarga tayanish hamda raddiya sifatini solishtiring. 3 ta eng katta yutuq va mashqni davom ettirish uchun 2 ta ustuvor yoʻnalishni yozing.',
                },
                framework: 'Before/after review',
                estimatedMinutes: 50,
              },
            ],
          },
        ],
      },
    ],
  },
];
