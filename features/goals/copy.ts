import type { BlueprintCategory, Locale } from '@core/schemas';

export const GOALS_COPY = {
  en: {
    title: 'Choose your goal',
    subtitle: 'Pick one. Your plan is ready in under a minute.',
    all: 'All',
    categories: { academic: 'Exams', legal: 'Law', rhetoric: 'Public speaking' } as Record<BlueprintCategory, string>,
    categoryLead: {
      academic: 'IELTS · SAT · TOEFL',
      legal: 'LSAT · SQE · Bar · TOLES',
      rhetoric: 'TEDx · Courtroom · Debate',
    } as Record<BlueprintCategory, string>,
    weeks: 'weeks',
    hours: 'h',
    steps: 'steps',
    start: 'Start',
  },
  uz: {
    title: 'Maqsadingizni tanlang',
    subtitle: 'Bittasini tanlang — rejangiz bir daqiqada tayyor.',
    all: 'Barchasi',
    categories: { academic: 'Imtihonlar', legal: 'Huquq', rhetoric: 'Notiqlik' } as Record<BlueprintCategory, string>,
    categoryLead: {
      academic: 'IELTS · SAT · TOEFL',
      legal: 'LSAT · SQE · Bar · TOLES',
      rhetoric: 'TEDx · Sud · Munozara',
    } as Record<BlueprintCategory, string>,
    weeks: 'hafta',
    hours: 'soat',
    steps: 'qadam',
    start: 'Boshlash',
  },
} as const;

export const ONBOARDING_COPY = {
  en: {
    stepOf: (i: number, n: number) => `Step ${i} of ${n}`,
    back: 'Back',
    next: 'Continue',
    skip: 'Skip',
    levelQ: 'Where are you now?',
    levelHint: 'Your current score or level.',
    targetQ: 'Where do you want to be?',
    targetHint: 'Your target score or outcome.',
    timeQ: 'How much time do you have?',
    focusQ: 'Anything to focus on?',
    focusHint: 'Optional — weak areas, e.g. “Writing Task 2, time pressure”.',
    focusPlaceholder: 'Weak areas…',
    deadline: 'Deadline',
    daily: 'Per day',
    custom: 'Or type your own',
    generate: 'Build my plan',
    generating: 'Building your plan…',
    generatingSub: 'Adapting the expert curriculum to you',
    notFound: 'Goal not found',
  },
  uz: {
    stepOf: (i: number, n: number) => `${n} tadan ${i}-qadam`,
    back: 'Orqaga',
    next: 'Davom etish',
    skip: 'Oʻtkazib yuborish',
    levelQ: 'Hozir qaysi darajadasiz?',
    levelHint: 'Hozirgi ballingiz yoki darajangiz.',
    targetQ: 'Qaysi natijaga erishmoqchisiz?',
    targetHint: 'Maqsadli ball yoki natija.',
    timeQ: 'Qancha vaqtingiz bor?',
    focusQ: 'Nimaga koʻproq eʼtibor beraylik?',
    focusHint: 'Ixtiyoriy — zaif tomonlar, masalan “Writing Task 2, vaqt yetishmasligi”.',
    focusPlaceholder: 'Zaif tomonlar…',
    deadline: 'Muddat',
    daily: 'Kuniga',
    custom: 'Yoki oʻzingiz yozing',
    generate: 'Rejamni tuzish',
    generating: 'Rejangiz tuzilmoqda…',
    generatingSub: 'Ekspert dasturi sizga moslashtirilmoqda',
    notFound: 'Maqsad topilmadi',
  },
} as const;

type Pair = { en: string; uz: string };
const p = (en: string, uz = en): Pair => ({ en, uz });

/** One-tap answers per goal so most users never type. */
export const LEVEL_PRESETS: Record<string, { current: Pair[]; target: Pair[] }> = {
  'ielts-academic': {
    current: [p('Band 5.0'), p('Band 5.5'), p('Band 6.0'), p('Band 6.5')],
    target: [p('Band 6.5'), p('Band 7.0'), p('Band 7.5'), p('Band 8.0')],
  },
  'sat-digital': { current: [p('1050'), p('1200'), p('1300'), p('1400')], target: [p('1350'), p('1450'), p('1500'), p('1550')] },
  'toefl-ibt': { current: [p('70'), p('80'), p('90'), p('100')], target: [p('90'), p('100'), p('105'), p('110')] },
  lsat: { current: [p('145'), p('150'), p('155'), p('160')], target: [p('160'), p('165'), p('170'), p('175')] },
};

const LEGAL_DEFAULT = {
  current: [p('Just starting', 'Endi boshlayapman'), p('Studying', 'Oʻqiyapman'), p('Retaking', 'Qayta topshiraman')],
  target: [p('Pass', 'Topshirish'), p('Pass with confidence', 'Ishonchli topshirish'), p('Top score', 'Yuqori ball')],
};
const RHETORIC_DEFAULT = {
  current: [p('Beginner', 'Boshlovchi'), p('Some experience', 'Biroz tajriba bor'), p('Confident', 'Ishonchli')],
  target: [p('First real talk', 'Birinchi jiddiy nutq'), p('Stage-ready', 'Sahnaga tayyor'), p('Expert level', 'Ekspert daraja')],
};

export function presetsFor(id: string, category: BlueprintCategory) {
  return LEVEL_PRESETS[id] ?? (category === 'rhetoric' ? RHETORIC_DEFAULT : LEGAL_DEFAULT);
}

export const goalsCopy = (l: Locale) => GOALS_COPY[l];
export const onboardingCopy = (l: Locale) => ONBOARDING_COPY[l];
