import { getCompactBlueprintOutline } from './blueprints';
import type {
  AdaptRoadmapInput,
  Blueprint,
  DecomposeTasksInput,
  Locale,
  MentorRole,
  TutorNodeChatInput,
} from './schemas';

export function buildDeltaPatchPrompt(blueprint: Blueprint, input: AdaptRoadmapInput) {
  const compactOutline = getCompactBlueprintOutline(blueprint);
  const langRule =
    input.locale === 'uz'
      ? 'Respond in natural, executive-grade Uzbek (Latin script). Never use robotic word-for-word translations.'
      : 'Respond in crisp, executive-grade English.';

  return {
    systemInstruction: [
      'You are IAM AI, a principal curriculum strategist and executive mentor.',
      'You NEVER regenerate a syllabus from scratch. You ONLY return a compact JSON delta patch adapting the provided expert blueprint outline to the user profile.',
      'Be realistic with the user hour budget (deadlineDays * dailyHours). Skip or compress foundational modules if the user already has that baseline; intensify weak areas.',
      'Keep strategySummary under 240 characters, each customFocus under 180 characters, and dailySlotRecommendation concrete.',
      'Return one entry per moduleId of the outline, using the exact ids. priority must be exactly one of the English words skip, low, normal, high — never translated, never "medium" or "critical".',
      'Never skip the first (diagnostic) module: a self-reported level is a guess, and the baseline test is what the rest of the plan is measured against. Shorten it with priority low instead.',
      'allocatedHours are relative weights for the plan; keep each within 0.5x–2x of the module baselineHours unless you skip it. If the budget is far below baselineTotalHours, say so plainly in strategySummary.',
      'busyWindows are times the user cannot study: the dailySlotRecommendation must avoid them and use valid 24-hour times.',
      langRule,
    ].join(' '),
    contents: JSON.stringify({
      userProfile: {
        currentLevel: input.currentLevel,
        targetGoal: input.targetGoal,
        deadlineDays: input.deadlineDays,
        dailyHours: input.dailyHours,
        totalHourBudget: Number((input.deadlineDays * input.dailyHours).toFixed(1)),
        busyWindows: input.busyWindows,
        weakAreas: input.weakAreas ?? '',
        locale: input.locale,
      },
      blueprintOutline: compactOutline,
    }),
  };
}

export function buildNodeTutorPrompt(input: TutorNodeChatInput) {
  const langRule =
    input.locale === 'uz'
      ? 'Answer in refined, authoritative Uzbek (Latin script).'
      : 'Answer in crisp, authoritative English.';

  return {
    systemInstruction: [
      'You are IAM AI, an elite executive mentor (TEDx rhetoric coach, trial advocacy partner, and international exam strategist).',
      'Answer strictly within the scope of the active roadmap module and step.',
      'Be concise, surgical, and immediately actionable (120-200 words max). Use bolding sparingly for the core rule, include one concrete example or script, and zero fluff.',
      langRule,
    ].join(' '),
    contextHeader: [
      `Blueprint: ${input.blueprintId}`,
      `Module: ${input.nodeTitle}`,
      input.stepTitle ? `Active Step: ${input.stepTitle}` : '',
      input.framework ? `Framework: ${input.framework}` : '',
      `User Level: ${input.currentLevel} -> Goal: ${input.targetGoal}`,
    ]
      .filter(Boolean)
      .join(' | '),
  };
}

export function buildTaskDecomposePrompt(input: DecomposeTasksInput) {
  const langRule =
    input.locale === 'uz'
      ? 'Write all task titles, executionSteps, simplificationNote, and dayBrief in natural, executive Uzbek (Latin script).'
      : 'Write all fields in crisp, executive English.';

  return {
    systemInstruction: [
      'You are IAM AI, a Personal Execution Assistant for high-performing professionals.',
      'Convert raw, unstructured daily or weekly obligations into a realistic, non-overlapping time-blocked execution sequence.',
      'Respect busyWindows strictly. Break complex tasks into 2-4 clear, concrete executionSteps and provide one practical simplificationNote that eliminates friction.',
      'Use 24-hour HH:MM timestamps. Return 2 to 6 focused blocks.',
      'priority must be exactly one of the English words critical, high, standard — never translated.',
      langRule,
    ].join(' '),
    contents: JSON.stringify({
      date: input.date,
      availableWindow: `${input.availableStart}-${input.availableEnd}`,
      busyWindows: input.busyWindows,
      rawObligations: input.rawInput,
    }),
  };
}

export function buildExecutiveMentorSystemInstruction(role: MentorRole, locale: Locale): string {
  const rolePersonas: Record<MentorRole, string> = {
    executive:
      'You are IAM AI Executive Strategist: a calm chief-of-staff mentor helping leaders prioritize high-leverage work, structure decisions, and eliminate operational clutter.',
    rhetoric:
      'You are IAM AI Rhetoric & Oratory Coach: modeled after elite TEDx directors, senior trial advocates, and parliamentary statesmen. Critique structure, cadence, ethos, and cross-examination precision.',
    legal:
      'You are IAM AI Legal Exam & Advocacy Mentor: specialized in LSAT logic, SQE1/SQE2 solicitor skills, UBE Bar IRAC analysis, and TOLES commercial drafting.',
    exam:
      'You are IAM AI International Certification Strategist: specialized in IELTS Band 8+, Digital SAT 1500+, and TOEFL iBT 110+ diagnostics and high-yield drills.',
  };

  const langRule =
    locale === 'uz'
      ? 'Communicate in refined, natural, executive-grade Uzbek (Latin script). Keep answers structured, concise, and practical.'
      : 'Communicate in crisp, architectural, executive-grade English. Keep answers structured, concise, and practical.';

  return `${rolePersonas[role]} Never use filler enthusiasm or generic praise. Give direct frameworks, concrete examples, and clear next actions. ${langRule}`;
}
