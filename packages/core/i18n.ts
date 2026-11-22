import type { Locale } from './schemas';

export interface Dictionary {
  brand: string;
  nav: {
    dashboard: string;
    rhetoric: string;
    certifications: string;
    assistant: string;
    settings: string;
    signIn: string;
    signOut: string;
  };
  dashboard: {
    greeting: string;
    subtitle: string;
    activeRoadmaps: string;
    todaySchedule: string;
    quickCaptureTitle: string;
    quickCapturePlaceholder: string;
    quickCaptureAction: string;
    metrics: {
      activePlans: string;
      completionRate: string;
      scheduledHours: string;
      tasksCompleted: string;
    };
    openWorkspace: string;
    openAssistant: string;
    newRoadmap: string;
    noRoadmaps: string;
    noTasks: string;
    daysLeft: string;
    completed: string;
    syncCloud: string;
    localWorkspace: string;
  };
  rhetoric: {
    title: string;
    subtitle: string;
    selectArchetype: string;
    configureTitle: string;
    currentLevelLabel: string;
    currentLevelPlaceholder: string;
    targetGoalLabel: string;
    targetGoalPlaceholder: string;
    deadlineLabel: string;
    dailyHoursLabel: string;
    focusLabel: string;
    focusPlaceholder: string;
    generateAction: string;
    generating: string;
    phasesCount: string;
    hoursEstimate: string;
  };
  certifications: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterAcademic: string;
    filterLegal: string;
    academicLabel: string;
    legalLabel: string;
    currentScoreLabel: string;
    currentScorePlaceholder: string;
    targetScoreLabel: string;
    targetScorePlaceholder: string;
    deadlineLabel: string;
    dailyHoursLabel: string;
    weakAreasLabel: string;
    weakAreasPlaceholder: string;
    generateAction: string;
    generating: string;
    selectedBlueprint: string;
  };
  roadmap: {
    backToDashboard: string;
    strategyBrief: string;
    dailySlot: string;
    overallProgress: string;
    stepsCompleted: string;
    allocatedHours: string;
    deadline: string;
    askTutor: string;
    tutorTitle: string;
    tutorSubtitle: string;
    tutorPlaceholder: string;
    tutorSend: string;
    tutorEmpty: string;
    tutorPrompt1: string;
    tutorPrompt2: string;
    skippedLabel: string;
    highPriority: string;
    normalPriority: string;
    lowPriority: string;
    notFound: string;
    deleteRoadmap: string;
    cachedNote: string;
    daysLeft: string;
    onTrack: string;
    behind: string;
    ahead: string;
    current: string;
    continueNext: string;
    phaseDone: string;
    confirmArchive: string;
    phases: string;
    minutesShort: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    tabPlanner: string;
    tabMentor: string;
    inputLabel: string;
    inputPlaceholder: string;
    sequenceAction: string;
    sequencing: string;
    dayBrief: string;
    executionSteps: string;
    simplification: string;
    clearCompleted: string;
    mentorRoleLabel: string;
    roles: {
      executive: string;
      rhetoric: string;
      legal: string;
      exam: string;
    };
    mentorPlaceholder: string;
    mentorSend: string;
    mentorEmpty: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageTitle: string;
    languageDesc: string;
    availabilityTitle: string;
    dailyHoursLabel: string;
    startTimeLabel: string;
    endTimeLabel: string;
    busyWindowsLabel: string;
    busyWindowsPlaceholder: string;
    saveProfile: string;
    savedConfirmation: string;
    accountTitle: string;
    signedInAs: string;
    guestMode: string;
    connectGoogle: string;
    disconnect: string;
    offlineCacheTitle: string;
    offlineCacheDesc: string;
  };
  login: {
    headline: string;
    subline: string;
    googleButton: string;
    continuePreview: string;
    pillar1: string;
    pillar2: string;
    pillar3: string;
  };
  common: {
    days: string;
    hours: string;
    minutes: string;
    retry: string;
    close: string;
    offlineBadge: string;
  };
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  en: {
    brand: 'IAM AI',
    nav: {
      dashboard: 'Overview',
      rhetoric: 'Rhetoric',
      certifications: 'Certifications',
      assistant: 'Assistant',
      settings: 'Settings',
      signIn: 'Sign in',
      signOut: 'Sign out',
    },
    dashboard: {
      greeting: 'Executive Workspace',
      subtitle: 'Structured roadmaps, calibrated drills, and daily time-blocked execution.',
      activeRoadmaps: 'Active Roadmaps',
      todaySchedule: 'Today’s Sequence',
      quickCaptureTitle: 'Sequence today’s obligations',
      quickCapturePlaceholder: 'Draft investor brief, 45m IELTS Writing Task 2 drill, review contract redlines...',
      quickCaptureAction: 'Build Schedule',
      metrics: {
        activePlans: 'Active Roadmaps',
        completionRate: 'Milestone Progress',
        scheduledHours: 'Planned Hours',
        tasksCompleted: 'Today Completed',
      },
      openWorkspace: 'Open Roadmap',
      openAssistant: 'Full Assistant',
      newRoadmap: 'New Plan',
      noRoadmaps: 'No active roadmaps yet. Select a rhetoric track or certification blueprint to begin.',
      noTasks: 'No time-blocked tasks for today. Enter obligations to generate an execution sequence.',
      daysLeft: 'days left',
      completed: 'completed',
      syncCloud: 'Cloud synced',
      localWorkspace: 'Local cache active',
    },
    rhetoric: {
      title: 'Rhetoric & Oratory Studio',
      subtitle: 'Structured mastery modeled after TEDx speakers, trial advocates, and legislative statesmen.',
      selectArchetype: 'Select Oratory Archetype',
      configureTitle: 'Calibrate Blueprint',
      currentLevelLabel: 'Current Speaking Baseline',
      currentLevelPlaceholder: 'e.g., Clear in team meetings, rush pacing under formal Q&A',
      targetGoalLabel: 'Target Performance Outcome',
      targetGoalPlaceholder: 'e.g., Deliver 12-minute keynote with composed Q&A control',
      deadlineLabel: 'Target Horizon (Days)',
      dailyHoursLabel: 'Daily Practice Budget (Hours)',
      focusLabel: 'Specific Weaknesses or Event Context',
      focusPlaceholder: 'e.g., Cross-examination control, vocal pauses, opening hook',
      generateAction: 'Generate Adapted Roadmap',
      generating: 'Patching blueprint...',
      phasesCount: 'phases',
      hoursEstimate: 'h baseline',
    },
    certifications: {
      title: 'Certification & Legal Exam Tutor',
      subtitle: 'Blueprint-first study systems for global academic exams and international legal qualifications.',
      filterAll: 'All Tracks',
      filterAcademic: 'Academic',
      filterLegal: 'Legal & Law',
      academicLabel: 'Academic',
      legalLabel: 'Legal',
      currentScoreLabel: 'Current Score / Baseline',
      currentScorePlaceholder: 'e.g., Band 6.0 (Writing 5.5, Speaking 6.0)',
      targetScoreLabel: 'Target Score / Qualification',
      targetScorePlaceholder: 'e.g., Band 7.5+ Overall',
      deadlineLabel: 'Exam Countdown (Days)',
      dailyHoursLabel: 'Daily Study Hours',
      weakAreasLabel: 'Weak Sections & Constraints',
      weakAreasPlaceholder: 'e.g., Writing cohesion, timed passage pacing, evenings only',
      generateAction: 'Adapt Certification Plan',
      generating: 'Adapting syllabus...',
      selectedBlueprint: 'Selected Blueprint',
    },
    roadmap: {
      backToDashboard: 'Overview',
      strategyBrief: 'Adaptation Strategy',
      dailySlot: 'Recommended Daily Block',
      overallProgress: 'Overall Progress',
      stepsCompleted: 'Steps Completed',
      allocatedHours: 'Budgeted Hours',
      deadline: 'Target Date',
      askTutor: 'Ask AI Tutor',
      tutorTitle: 'Node-Level AI Tutor',
      tutorSubtitle: 'Scoped strictly to this module and your target outcome.',
      tutorPlaceholder: 'Ask a tactical question about this step...',
      tutorSend: 'Ask',
      tutorEmpty: 'Ask a focused execution question on this module’s framework, drills, or common traps.',
      tutorPrompt1: 'Give me a concrete 10-minute drill for this step.',
      tutorPrompt2: 'What is the #1 mistake candidates make here?',
      skippedLabel: 'Compressed / Skipped',
      highPriority: 'High Priority',
      normalPriority: 'Core Track',
      lowPriority: 'Light Review',
      notFound: 'Roadmap not found in your workspace.',
      deleteRoadmap: 'Archive Plan',
      cachedNote: 'Canonical answer served from cache',
      daysLeft: 'days left',
      onTrack: 'On track',
      behind: 'Behind by {n} steps',
      ahead: 'Ahead by {n} steps',
      current: 'Current',
      continueNext: 'Continue',
      phaseDone: 'Complete',
      confirmArchive: 'Confirm archive',
      phases: 'Phases',
      minutesShort: 'min',
    },
    assistant: {
      title: 'Personal Execution Assistant',
      subtitle: 'Transform raw obligations into time-blocked sequences or consult your multi-turn Executive Mentor.',
      tabPlanner: 'Task Sequencer',
      tabMentor: 'Executive Mentor Chat',
      inputLabel: 'Daily or Weekly Obligations',
      inputPlaceholder:
        'List your tasks, meetings, and study goals (e.g., Finish legal compliance memo by 17:00, prepare 5-minute board briefing, 90m LSAT LR timed section, gym at 18:30)...',
      sequenceAction: 'Sequence & Simplify',
      sequencing: 'Sequencing day...',
      dayBrief: 'Execution Brief',
      executionSteps: 'How to Execute',
      simplification: 'Simplification Lever',
      clearCompleted: 'Clear Completed',
      mentorRoleLabel: 'Mentor Discipline',
      roles: {
        executive: 'Executive Strategy',
        rhetoric: 'Rhetoric & Oratory',
        legal: 'Legal & Bar Counsel',
        exam: 'Certification Strategist',
      },
      mentorPlaceholder: 'Ask for a speech critique, legal framework, or strategic breakdown...',
      mentorSend: 'Send',
      mentorEmpty: 'Select a mentor discipline above and start a focused multi-turn session.',
    },
    settings: {
      title: 'Workspace Preferences',
      subtitle: 'Language register, daily capacity, and cloud synchronization.',
      languageTitle: 'Interface & Mentor Language',
      languageDesc: 'Controls all navigation labels, blueprint curricula, and AI mentor responses.',
      availabilityTitle: 'Daily Execution Profile',
      dailyHoursLabel: 'Default Study / Practice Hours per Day',
      startTimeLabel: 'Day Start',
      endTimeLabel: 'Day End',
      busyWindowsLabel: 'Recurring Busy Windows (comma-separated)',
      busyWindowsPlaceholder: 'Mon-Fri 09:00-14:00, Tue/Thu 16:00-17:30',
      saveProfile: 'Save Preferences',
      savedConfirmation: 'Preferences saved.',
      accountTitle: 'Account & Cloud Sync',
      signedInAs: 'Signed in as',
      guestMode: 'Local offline-first workspace (sign in with Google to sync across web & mobile)',
      connectGoogle: 'Sign in with Google',
      disconnect: 'Sign out',
      offlineCacheTitle: 'Offline Persistence',
      offlineCacheDesc: 'Roadmaps, blueprints, and completed steps remain available offline and sync automatically.',
    },
    login: {
      headline: 'Strategic clarity for speech, law, and mastery.',
      subline: 'Sign in with Google to synchronize roadmaps, daily schedules, and mentor sessions across devices.',
      googleButton: 'Continue with Google',
      continuePreview: 'Enter Local Workspace',
      pillar1: 'Executive Rhetoric',
      pillar2: 'Academic & Legal Exams',
      pillar3: 'Time-Blocked Execution',
    },
    common: {
      days: 'days',
      hours: 'h',
      minutes: 'min',
      retry: 'Retry',
      close: 'Close',
      offlineBadge: 'Offline · cached view',
    },
  },
  uz: {
    brand: 'IAM AI',
    nav: {
      dashboard: 'Bosh sahifa',
      rhetoric: 'Notiqlik',
      certifications: 'Sertifikatlar',
      assistant: 'Yordamchi',
      settings: 'Sozlamalar',
      signIn: 'Kirish',
      signOut: 'Chiqish',
    },
    dashboard: {
      greeting: 'Strategik ish maydoni',
      subtitle: 'Aniq muddatli yoʻl xaritalari, amaliy mashqlar va kunlik vaqtli reja.',
      activeRoadmaps: 'Faol yoʻl xaritalari',
      todaySchedule: 'Bugungi ijro ketma-ketligi',
      quickCaptureTitle: 'Bugungi vazifalarni tartibga solish',
      quickCapturePlaceholder: 'Huquqiy xulosa yozish, 45 daqiqa IELTS Writing Task 2, rahbariyat taqdimoti...',
      quickCaptureAction: 'Reja tuzish',
      metrics: {
        activePlans: 'Faol rejalar',
        completionRate: 'Umumiy bajarilish',
        scheduledHours: 'Rejalashtirilgan soat',
        tasksCompleted: 'Bugun bajarildi',
      },
      openWorkspace: 'Xaritani ochish',
      openAssistant: 'Toʻliq yordamchi',
      newRoadmap: 'Yangi reja',
      noRoadmaps: 'Hozircha faol yoʻl xaritasi yoʻq. Boshlash uchun notiqlik yoki sertifikat yoʻnalishini tanlang.',
      noTasks: 'Bugun uchun vaqtga taqsimlangan vazifalar yoʻq. Vazifalarni kiritib reja yarating.',
      daysLeft: 'kun qoldi',
      completed: 'bajarildi',
      syncCloud: 'Bulut bilan sinxron',
      localWorkspace: 'Lokal kesh faol',
    },
    rhetoric: {
      title: 'Notiqlik va sahna mahorati studiyasi',
      subtitle: 'TEDx maʼruzachilari, sud advokatlari va parlament arboblari uslubidagi tizimli tayyorgarlik.',
      selectArchetype: 'Notiqlik yoʻnalishini tanlang',
      configureTitle: 'Dasturni moslashtirish',
      currentLevelLabel: 'Hozirgi nutq darajangiz',
      currentLevelPlaceholder: 'Masalan: Ishchi uchrashuvlarda erkinman, rasmiy savol-javobda shoshilaman',
      targetGoalLabel: 'Kutilayotgan natija',
      targetGoalPlaceholder: 'Masalan: 12 daqiqalik asosiy maʼruza va bosiq savol-javob nazorati',
      deadlineLabel: 'Maqsad muddati (kun)',
      dailyHoursLabel: 'Kunlik mashq vaqti (soat)',
      focusLabel: 'Zaif nuqtalar yoki tadbir konteksti',
      focusPlaceholder: 'Masalan: Qarshi soʻroq nazorati, strategik pauzalar, kuchli ochilish',
      generateAction: 'Shaxsiy yoʻl xaritasini yaratish',
      generating: 'Dastur moslashtirilmoqda...',
      phasesCount: 'bosqich',
      hoursEstimate: 'soat baza',
    },
    certifications: {
      title: 'Sertifikat va yuridik imtihon mentori',
      subtitle: 'Xalqaro akademik testlar va yurisprudensiya imtihonlari uchun aniq muddatli tizim.',
      filterAll: 'Barcha yoʻnalishlar',
      filterAcademic: 'Akademik',
      filterLegal: 'Huquq va advokatura',
      academicLabel: 'Akademik',
      legalLabel: 'Huquqiy',
      currentScoreLabel: 'Hozirgi ball / daraja',
      currentScorePlaceholder: 'Masalan: Band 6.0 (Writing 5.5, Speaking 6.0)',
      targetScoreLabel: 'Maqsad ball / malaka',
      targetScorePlaceholder: 'Masalan: Band 7.5+ umumiy',
      deadlineLabel: 'Imtihongacha qolgan kun',
      dailyHoursLabel: 'Kunlik tayyorgarlik soati',
      weakAreasLabel: 'Zaif boʻlimlar va band vaqtlar',
      weakAreasPlaceholder: 'Masalan: Writing bogʻliqligi, vaqt nazorati, faqat kechki soatlar',
      generateAction: 'Sertifikat rejasini moslashtirish',
      generating: 'Oʻquv reja sozlanmoqda...',
      selectedBlueprint: 'Tanlangan dastur',
    },
    roadmap: {
      backToDashboard: 'Bosh sahifa',
      strategyBrief: 'Moslashtirish strategiyasi',
      dailySlot: 'Tavsiya etilgan kunlik oyna',
      overallProgress: 'Umumiy taraqqiyot',
      stepsCompleted: 'Bajarilgan qadamlar',
      allocatedHours: 'Ajratilgan soat',
      deadline: 'Yakuniy sana',
      askTutor: 'AI Mentordan soʻrash',
      tutorTitle: 'Bosqichli AI Mentor',
      tutorSubtitle: 'Faqat joriy modul va sizning maqsadingiz doirasida ishlaydi.',
      tutorPlaceholder: 'Ushbu qadam boʻyicha amaliy savol bering...',
      tutorSend: 'Yuborish',
      tutorEmpty: 'Ushbu modul metodikasi, mashqlari yoki tipik xatolar boʻyicha aniq savol bering.',
      tutorPrompt1: 'Ushbu qadam uchun 10 daqiqalik aniq mashq bering.',
      tutorPrompt2: 'Nomzodlar bu yerda qaysi xatoni eng koʻp qiladi?',
      skippedLabel: 'Qisqartirilgan / oʻtkazilgan',
      highPriority: 'Yuqori ustuvorlik',
      normalPriority: 'Asosiy yoʻnalish',
      lowPriority: 'Qisqa takrorlash',
      notFound: 'Yoʻl xaritasi topilmadi.',
      deleteRoadmap: 'Rejani arxivlash',
      cachedNote: 'Kanonik javob keshdan tez yuklandi',
      daysLeft: 'kun qoldi',
      onTrack: 'Reja boʻyicha',
      behind: '{n} qadam ortda',
      ahead: '{n} qadam oldinda',
      current: 'Joriy',
      continueNext: 'Davom etish',
      phaseDone: 'Yakunlandi',
      confirmArchive: 'Arxivlashni tasdiqlang',
      phases: 'Bosqichlar',
      minutesShort: 'daq',
    },
    assistant: {
      title: 'Shaxsiy ijro yordamchisi',
      subtitle: 'Kunlik vazifalarni vaqt bloklariga ajrating yoki koʻp bosqichli Strategik Mentor bilan suhbatlashing.',
      tabPlanner: 'Vazifa tartiblovchi',
      tabMentor: 'Strategik Mentor suhbati',
      inputLabel: 'Kunlik yoki haftalik majburiyatlar',
      inputPlaceholder:
        'Vazifa, uchrashuv va oʻquv rejalaringizni yozing (masalan: 17:00 gacha shartnoma tahlili, 5 daqiqalik nutq tayyorlash, 90 daqiqa LSAT mantiqiy boʻlimi)...',
      sequenceAction: 'Tartiblash va soddalashtirish',
      sequencing: 'Kun tartibi tuzilmoqda...',
      dayBrief: 'Ijro xulosasi',
      executionSteps: 'Bajarish bosqichlari',
      simplification: 'Soddalashtirish usuli',
      clearCompleted: 'Bajarilganlarni tozalash',
      mentorRoleLabel: 'Mentor ixtisosligi',
      roles: {
        executive: 'Ijro strategiyasi',
        rhetoric: 'Notiqlik va debat',
        legal: 'Huquqiy tahlil va Bar',
        exam: 'Sertifikat strategiyasi',
      },
      mentorPlaceholder: 'Nutq tahlili, huquqiy tuzilma yoki kunlik strategiya soʻrang...',
      mentorSend: 'Yuborish',
      mentorEmpty: 'Yuqoridan mentor yoʻnalishini tanlab, koʻp bosqichli maslahat sessiyasini boshlang.',
    },
    settings: {
      title: 'Tizim sozlamalari',
      subtitle: 'Til uslubi, kunlik vaqt byudjeti va bulut sinxronizatsiyasi.',
      languageTitle: 'Interfeys va mentor tili',
      languageDesc: 'Barcha menyular, dastur bosqichlari va AI mentor javoblarini boshqaradi.',
      availabilityTitle: 'Kunlik ish profili',
      dailyHoursLabel: 'Kunlik standart oʻqish / mashq soati',
      startTimeLabel: 'Kun boshlanishi',
      endTimeLabel: 'Kun yakuni',
      busyWindowsLabel: 'Band vaqt oraligʻi (vergul bilan ajrating)',
      busyWindowsPlaceholder: 'Du-Ju 09:00-14:00, Se/Pa 16:00-17:30',
      saveProfile: 'Sozlamalarni saqlash',
      savedConfirmation: 'Sozlamalar saqlandi.',
      accountTitle: 'Hisob va bulut sinxronizatsiyasi',
      signedInAs: 'Kirilgan hisob',
      guestMode: 'Lokal oflayn-birinchi rejim (barcha qurilmalarda sinxronlash uchun Google bilan kiring)',
      connectGoogle: 'Google orqali kirish',
      disconnect: 'Hisobdan chiqish',
      offlineCacheTitle: 'Oflayn barqarorlik',
      offlineCacheDesc: 'Yoʻl xaritalari, dasturlar va bajarilgan qadamlar internetsiz ham saqlanadi va qayta ulanishda sinxronlanadi.',
    },
    login: {
      headline: 'Nutq, huquq va yuksak mahorat uchun strategik aniqlik.',
      subline: 'Yoʻl xaritalari, kunlik reja va mentor suhbatlarini sinxronlash uchun Google hisobingiz bilan kiring.',
      googleButton: 'Google orqali davom etish',
      continuePreview: 'Lokal ish maydoniga kirish',
      pillar1: 'Ijro notiqligi',
      pillar2: 'Akademik va huquqiy imtihonlar',
      pillar3: 'Vaqtli ijro tizimi',
    },
    common: {
      days: 'kun',
      hours: 'soat',
      minutes: 'daq',
      retry: 'Qayta urinish',
      close: 'Yopish',
      offlineBadge: 'Oflayn · keshlangan holat',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}
