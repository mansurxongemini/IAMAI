import { getBlueprintById } from './blueprints';
import { applyDeltaPatchAndSchedule, buildSeedDeltaPatch, formatIsoDate } from './scheduler';
import type { DailyTask, Locale, Roadmap } from './schemas';

export { DEFAULT_USER_PROFILE } from './defaults';

export function createSeedRoadmaps(ownerId = 'local-executive', locale: Locale = 'en'): Roadmap[] {
  const today = new Date();
  const roadmaps: Roadmap[] = [];

  const ieltsBp = getBlueprintById('ielts-academic');
  if (ieltsBp) {
    const input = {
      blueprintId: 'ielts-academic',
      locale,
      currentLevel:
        locale === 'uz'
          ? 'Band 6.5 (Writing 6.0, Speaking 6.5)'
          : 'Band 6.5 (Writing 6.0, Speaking 6.5)',
      targetGoal: locale === 'uz' ? 'Band 8.0 umumiy natija' : 'Band 8.0 Overall',
      deadlineDays: 56,
      dailyHours: 2.5,
      busyWindows: ['Mon-Fri 09:00-14:00'],
      weakAreas:
        locale === 'uz'
          ? 'Writing Task 2 bogʻliqligi va Speaking Part 3 chuqurligi'
          : 'Writing Task 2 cohesion & Speaking Part 3 depth',
    };
    const patch = buildSeedDeltaPatch(ieltsBp, input);
    const roadmap = applyDeltaPatchAndSchedule({
      roadmapId: 'seed-ielts-academic',
      ownerId,
      blueprint: ieltsBp,
      input,
      deltaPatch: patch,
      startDate: today,
    });
    if (roadmap.phases[0]?.modules[0]?.steps[0]) {
      roadmap.phases[0].modules[0].steps[0].completed = true;
    }
    if (roadmap.phases[0]?.modules[0]?.steps[1]) {
      roadmap.phases[0].modules[0].steps[1].completed = true;
    }
    roadmaps.push(roadmap);
  }

  const advocacyBp = getBlueprintById('legal-advocacy');
  if (advocacyBp) {
    const input = {
      blueprintId: 'legal-advocacy',
      locale,
      currentLevel:
        locale === 'uz'
          ? 'Tijorat yuristi · Davriy arbitraj ishtiroki'
          : 'Commercial Counsel · Occasional Arbitrations',
      targetGoal:
        locale === 'uz'
          ? 'Yetakchi sud advokati · Qarshi soʻroq nazorati'
          : 'Lead Oral Advocate · Cross-Examination Control',
      deadlineDays: 42,
      dailyHours: 1.5,
      busyWindows: ['Mon-Fri 09:00-17:00'],
      weakAreas:
        locale === 'uz'
          ? 'Chalgʻituvchi guvohlarni boshqarish va sudya savollari'
          : 'Controlling evasive witnesses & judicial hypotheticals',
    };
    const patch = buildSeedDeltaPatch(advocacyBp, input);
    const roadmap = applyDeltaPatchAndSchedule({
      roadmapId: 'seed-legal-advocacy',
      ownerId,
      blueprint: advocacyBp,
      input,
      deltaPatch: patch,
      startDate: today,
    });
    if (roadmap.phases[0]?.modules[0]?.steps[0]) {
      roadmap.phases[0].modules[0].steps[0].completed = true;
    }
    roadmaps.push(roadmap);
  }

  return roadmaps;
}

export function createSeedTasks(ownerId = 'local-executive', locale: Locale = 'en'): DailyTask[] {
  const todayIso = formatIsoDate(new Date());
  const nowIso = new Date().toISOString();

  if (locale === 'uz') {
    return [
      {
        id: 'seed-task-1',
        ownerId,
        title: 'Qarshi soʻroq: bir faktli yopiq savollar mashqi',
        startTime: '08:00',
        endTime: '08:45',
        durationMinutes: 45,
        priority: 'critical',
        category: 'Notiqlik',
        executionSteps: [
          'Faol ishingizdan bitta bahsli faktik xronologiyani tanlang.',
          '"Nega" va "qanday" soʻzlarisiz 10 ta qisqa yopiq savol tuzing.',
          'Har bir tasdiqdan soʻng 2 soniyalik sukut bilan ovoz chiqarib mashq qiling.',
        ],
        simplificationNote: 'Har bir savolni 12 soʻzdan oshmaydigan yagona aniq faktga bogʻlang.',
        completed: true,
        scheduledDate: todayIso,
        createdAt: nowIso,
        updatedAt: nowIso,
      },
      {
        id: 'seed-task-2',
        ownerId,
        title: 'Rahbariyat xulosasi va shartnoma xatarlari tahriri',
        startTime: '14:30',
        endTime: '16:00',
        durationMinutes: 90,
        priority: 'high',
        category: 'Ijro',
        executionSteps: [
          'Avval tovon, javobgarlik chegarasi va bekor qilish bandlarini tekshiring.',
          'Eng muhim 3 ta tijorat xatarini 5 qatorlik qisqa sarlavhada jamlang.',
          'Ikki muqobil muzokara taklifi bilan toza tahrirni yuboring.',
        ],
        simplificationNote: 'Standart bandlardan oldin eng yuqori javobgarlik xatarlarini yoping.',
        completed: false,
        scheduledDate: todayIso,
        createdAt: nowIso,
        updatedAt: nowIso,
      },
      {
        id: 'seed-task-3',
        ownerId,
        title: 'IELTS Task 2 · C1 bogʻliqlik va qarshi-argument',
        startTime: '19:30',
        endTime: '20:30',
        durationMinutes: 60,
        priority: 'high',
        category: 'Sertifikat',
        executionSteps: [
          'Tezis va 2 ta sabab–mexanizm–oqibat dalili uchun 5 daqiqa reja tuzing.',
          '35 daqiqa ichida 290 soʻzlik vaqtli insho yozing.',
          'Mexanik bogʻlovchilarni tabiiy maʼnoviy oʻtishlarga almashtiring.',
        ],
        simplificationNote: 'Misollar yozishdan oldin har bir xatboshining tayanch jumlasini mustahkamlang.',
        completed: false,
        scheduledDate: todayIso,
        createdAt: nowIso,
        updatedAt: nowIso,
      },
    ];
  }

  return [
    {
      id: 'seed-task-1',
      ownerId,
      title: 'Cross-Examination Leading Chapter Drill',
      startTime: '08:00',
      endTime: '08:45',
      durationMinutes: 45,
      priority: 'critical',
      category: 'Rhetoric',
      executionSteps: [
        'Select one contested factual timeline from your active brief.',
        'Draft 10 closed single-fact questions eliminating every "why" or "how".',
        'Deliver aloud with 2-second pauses between admissions.',
      ],
      simplificationNote: 'Restrict each question to one verifiable fact under 12 words.',
      completed: true,
      scheduledDate: todayIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: 'seed-task-2',
      ownerId,
      title: 'Executive Memo & Contract Risk Redline',
      startTime: '14:30',
      endTime: '16:00',
      durationMinutes: 90,
      priority: 'high',
      category: 'Execution',
      executionSteps: [
        'Audit indemnity, liability cap, and termination clauses first.',
        'Summarize top 3 commercial exposures in a 5-line BLUF header.',
        'Send clean redline with two fallback negotiation positions.',
      ],
      simplificationNote: 'Resolve high-exposure liability clauses before polishing boilerplate.',
      completed: false,
      scheduledDate: todayIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: 'seed-task-3',
      ownerId,
      title: 'IELTS Task 2 · C1 Cohesion & Counter-Argument',
      startTime: '19:30',
      endTime: '20:30',
      durationMinutes: 60,
      priority: 'high',
      category: 'Certification',
      executionSteps: [
        'Spend 5 minutes outlining thesis and 2 cause-mechanism-consequence body claims.',
        'Write a 290-word timed essay inside 35 minutes.',
        'Redline mechanical linkers and replace with referential cohesion.',
      ],
      simplificationNote: 'Lock paragraph topic sentences before drafting any supporting examples.',
      completed: false,
      scheduledDate: todayIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];
}
