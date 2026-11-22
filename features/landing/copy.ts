import type { Locale } from '@core/schemas';

/*
  Voice: a calm study coach. Short declaratives, numbers over adjectives.
  Facts (all from the product): 10 curricula, 150 steps, three phases each, English and Uzbek,
  4 setup questions, Google sign-in, free to start within daily limits. The AI adjusts modules of a
  fixed expert curriculum (a delta) and never writes it from scratch. The plan slip is a labelled sample.
*/

/** Six curricula on the rail: catalog id, short display name, plate. */
export const RAIL = [
  { id: 'ielts-academic', name: { en: 'IELTS Academic', uz: 'IELTS Academic' }, plate: 'rings' },
  { id: 'sat-digital', name: { en: 'Digital SAT', uz: 'Digital SAT' }, plate: 'grid' },
  { id: 'toefl-ibt', name: { en: 'TOEFL iBT', uz: 'TOEFL iBT' }, plate: 'waves' },
  { id: 'lsat', name: { en: 'LSAT', uz: 'LSAT' }, plate: 'stems' },
  { id: 'sqe', name: { en: 'SQE 1 & 2', uz: 'SQE 1 va 2' }, plate: 'blocks' },
  { id: 'tedx-oratory', name: { en: 'TEDx talk', uz: 'TEDx nutqi' }, plate: 'arcs' },
] as const;

export const LANDING_COPY = {
  en: {
    nav: { method: 'Method', rail: 'Curricula', slip: 'Your plan', phases: 'Phases', faq: 'FAQ' },
    skip: 'Skip to content',
    signIn: 'Sign in',
    start: 'Choose your goal',
    continue: 'Open today',
    lang: 'Oʻzbek tiliga oʻtish',
    hero: {
      kicker: 'Study, planned.',
      brand: 'IAM AI',
      sub: 'IELTS, SAT, LSAT, the Bar or public speaking. An expert curriculum, dated day by day around your deadline.',
      meta: ['10 curricula', '150 steps', 'English · Uzbek', 'Free to start'],
      scroll: 'Scroll',
    },
    manifesto: {
      eyebrow: '01 · Method',
      line: 'Experts write it. Code dates it. AI only tunes it.',
    },
    rail: {
      eyebrow: '02 · Curricula',
      h2: 'Six of ten curricula',
      hint: 'Scroll to walk the row',
      track: { academic: 'Exam', legal: 'Law', rhetoric: 'Speaking' },
      weeks: (n: number) => `${n} wks`,
      hours: (n: number) => `${n} h`,
    },
    slip: {
      eyebrow: '03 · Your plan',
      h2: 'A plan that prints itself',
      lede: 'Four answers in, one dated plan out. The AI changes only what your level calls for; the rest stays as the experts wrote it.',
      cues: ['Goal chosen', 'Level read', 'Delta applied', 'Days dated'],
      status: [
        'Reading goal · IELTS Academic',
        'Level 6.0 → target 7.5 · weak area: Writing',
        'Delta · +3 Writing modules · −1 Listening',
        'Plan ready · today’s list torn off',
      ],
      head: 'IAM AI · Sample plan',
      name: 'IELTS 7.5',
      rows: ['Plan no.', 'AI delta', 'Dates'],
      lot: 'IA-0412',
      pending: 'pending',
      delta: '+3 Writing / −1 Listening',
      dates: '06 Jan → 18 Mar · 72 d',
      stub: 'Today · 3 steps · 85 min',
    },
    phases: {
      eyebrow: '04 · Phases',
      h2: 'Every plan runs in three phases',
      chapters: [
        { l: 'Phase 1', t: 'Calibrate', d: 'A diagnostic, the format rules and the high-yield drills, set at your level.' },
        { l: 'Phase 2', t: 'Build', d: 'Timed sections and targeted drills on the areas you marked weak.' },
        { l: 'Phase 3', t: 'Simulate', d: 'Full mocks under exam timing, then an error log that closes the gaps.' },
      ],
    },
    table: {
      eyebrow: '05 · All curricula',
      h2: 'Ten curricula, free to start',
      lede: 'Plans, progress and the tutor are free within fair daily limits. Hours are the expert baseline before the AI adjusts them.',
      cols: ['Code', 'Curriculum', 'Track', 'Weeks', 'Hours'],
    },
    faq: {
      eyebrow: '06 · FAQ',
      h2: 'Questions people ask first',
      items: [
        { q: 'Is IAM AI free?', a: 'Yes, to start. Building a plan, ticking steps and the tutor work on the free plan, within fair daily limits.' },
        { q: 'Why do I need to sign in with Google?', a: 'Your plans, progress and tutor notes are saved to your account, so they follow you to every device. We use only your Google name, email and photo.' },
        { q: 'Does the AI write my whole plan?', a: 'No. Subject experts wrote every curriculum. The AI reads your level, deadline and weak areas and adjusts which modules get more, less or no time.' },
        { q: 'Which exams and goals are covered?', a: 'IELTS Academic, Digital SAT, TOEFL iBT, LSAT, SQE, the Bar (UBE), TOLES, and three speaking tracks: TEDx talks, trial advocacy and policy debate.' },
        { q: 'Can I use it in Uzbek?', a: 'Yes. The whole interface, the curricula and the tutor’s answers work in Uzbek and English. Switch at any time.' },
      ],
    },
    close: { h2: 'Start with one goal today.', all: 'All goals' },
    credits: 'Photographs used in the app',
  },
  uz: {
    nav: { method: 'Uslub', rail: 'Dasturlar', slip: 'Rejangiz', phases: 'Bosqichlar', faq: 'Savollar' },
    skip: 'Asosiy qismga oʻtish',
    signIn: 'Kirish',
    start: 'Maqsadingizni tanlang',
    continue: 'Bugunni ochish',
    lang: 'Switch to English',
    hero: {
      kicker: 'Rejali oʻqish.',
      brand: 'IAM AI',
      sub: 'IELTS, SAT, LSAT, advokatura yoki notiqlik. Ekspert dasturi muddatingizga qarab kunma-kun sanalanadi.',
      meta: ['10 ta dastur', '150 qadam', 'Oʻzbek · Ingliz', 'Boshlash bepul'],
      scroll: 'Pastga',
    },
    manifesto: {
      eyebrow: '01 · Uslub',
      line: 'Mutaxassis yozadi. Kod sanalaydi. AI faqat moslaydi.',
    },
    rail: {
      eyebrow: '02 · Dasturlar',
      h2: 'Oʻnta dasturdan oltitasi',
      hint: 'Qatorni koʻrish uchun pastga suring',
      track: { academic: 'Imtihon', legal: 'Huquq', rhetoric: 'Notiqlik' },
      weeks: (n: number) => `${n} hafta`,
      hours: (n: number) => `${n} soat`,
    },
    slip: {
      eyebrow: '03 · Rejangiz',
      h2: 'Oʻzi chop etiladigan reja',
      lede: 'Toʻrt javob — bitta sanali reja. AI faqat darajangiz talab qilgan joyni oʻzgartiradi, qolgani mutaxassislar yozgandek qoladi.',
      cues: ['Maqsad tanlandi', 'Daraja oʻqildi', 'Tuzatma qoʻllandi', 'Kunlar sanalandi'],
      status: [
        'Maqsad oʻqilmoqda · IELTS Academic',
        'Daraja 6.0 → maqsad 7.5 · zaif joy: Writing',
        'Tuzatma · +3 Writing moduli · −1 Listening',
        'Reja tayyor · bugungi roʻyxat ajratildi',
      ],
      head: 'IAM AI · Namuna reja',
      name: 'IELTS 7.5',
      rows: ['Reja raqami', 'AI tuzatmasi', 'Sanalar'],
      lot: 'IA-0412',
      pending: 'kutilmoqda',
      delta: '+3 Writing / −1 Listening',
      dates: '06 yan → 18 mar · 72 kun',
      stub: 'Bugun · 3 qadam · 85 daq',
    },
    phases: {
      eyebrow: '04 · Bosqichlar',
      h2: 'Har bir reja uch bosqichda',
      chapters: [
        { l: '1-bosqich', t: 'Oʻlchash', d: 'Diagnostika, format qoidalari va eng foydali mashqlar — darajangizga mos.' },
        { l: '2-bosqich', t: 'Qurish', d: 'Vaqtli boʻlimlar va zaif deb belgilagan joylaringizga aniq mashqlar.' },
        { l: '3-bosqich', t: 'Sinov', d: 'Imtihon vaqtida toʻliq sinovlar, keyin boʻshliqlarni yopuvchi xatolar jurnali.' },
      ],
    },
    table: {
      eyebrow: '05 · Barcha dasturlar',
      h2: 'Oʻnta dastur, boshlash bepul',
      lede: 'Reja, natijalar va ustoz kunlik adolatli limitlar bilan bepul. Soatlar — AI moslashidan oldingi ekspert bazasi.',
      cols: ['Kod', 'Dastur', 'Yoʻnalish', 'Hafta', 'Soat'],
    },
    faq: {
      eyebrow: '06 · Savollar',
      h2: 'Odamlar birinchi soʻraydigan savollar',
      items: [
        { q: 'IAM AI bepulmi?', a: 'Ha, boshlash bepul. Reja tuzish, qadamlarni belgilash va ustoz bepul tarifda kunlik adolatli limitlar bilan ishlaydi.' },
        { q: 'Nega Google orqali kirish kerak?', a: 'Rejalaringiz, natijalaringiz va ustoz izohlari akkauntingizda saqlanadi va har bir qurilmada siz bilan boʻladi. Faqat Google ismingiz, emailingiz va rasmingiz ishlatiladi.' },
        { q: 'Butun rejani AI yozadimi?', a: 'Yoʻq. Har bir dasturni mutaxassislar yozgan. AI darajangiz, muddatingiz va zaif tomonlaringizni oʻqib, qaysi modulga koʻproq, kamroq yoki umuman vaqt ajratmaslikni belgilaydi.' },
        { q: 'Qaysi imtihon va maqsadlar bor?', a: 'IELTS Academic, Digital SAT, TOEFL iBT, LSAT, SQE, advokatura (UBE), TOLES va uchta notiqlik yoʻnalishi: TEDx, sud notiqligi va siyosiy munozara.' },
        { q: 'Oʻzbek tilida ishlatsa boʻladimi?', a: 'Ha. Butun interfeys, dasturlar va ustoz javoblari oʻzbek va ingliz tillarida ishlaydi. Istalgan payt almashtirish mumkin.' },
      ],
    },
    close: { h2: 'Bugun bitta maqsaddan boshlang.', all: 'Barcha maqsadlar' },
    credits: 'Ilovadagi fotosuratlar',
  },
} as const;

export const landingCopy = (l: Locale) => LANDING_COPY[l];
