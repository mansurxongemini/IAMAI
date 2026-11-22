import { z } from 'zod';

export const LocaleSchema = z.enum(['en', 'uz']);
export type Locale = z.infer<typeof LocaleSchema>;

export const BlueprintCategorySchema = z.enum(['rhetoric', 'academic', 'legal']);
export type BlueprintCategory = z.infer<typeof BlueprintCategorySchema>;

export const BilingualTextSchema = z.object({
  en: z.string().min(1),
  uz: z.string().min(1),
});
export type BilingualText = z.infer<typeof BilingualTextSchema>;

export const DifficultyTierSchema = z.enum(['foundational', 'intermediate', 'executive']);
export type DifficultyTier = z.infer<typeof DifficultyTierSchema>;

export const PriorityLevelSchema = z.enum(['skip', 'low', 'normal', 'high']);
export type PriorityLevel = z.infer<typeof PriorityLevelSchema>;

export const BlueprintStepSchema = z.object({
  id: z.string().min(1),
  title: BilingualTextSchema,
  drill: BilingualTextSchema,
  framework: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
});
export type BlueprintStep = z.infer<typeof BlueprintStepSchema>;

export const BlueprintModuleSchema = z.object({
  id: z.string().min(1),
  title: BilingualTextSchema,
  summary: BilingualTextSchema,
  baselineHours: z.number().positive(),
  difficulty: DifficultyTierSchema,
  keyFramework: z.string().min(1),
  steps: z.array(BlueprintStepSchema).min(1),
});
export type BlueprintModule = z.infer<typeof BlueprintModuleSchema>;

export const BlueprintPhaseSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().positive(),
  title: BilingualTextSchema,
  objective: BilingualTextSchema,
  modules: z.array(BlueprintModuleSchema).min(1),
});
export type BlueprintPhase = z.infer<typeof BlueprintPhaseSchema>;

export const BlueprintSchema = z.object({
  id: z.string().min(1),
  category: BlueprintCategorySchema,
  code: z.string().min(1),
  title: BilingualTextSchema,
  subtitle: BilingualTextSchema,
  archetypeLabel: BilingualTextSchema,
  recommendedWeeks: z.number().int().positive(),
  baselineTotalHours: z.number().positive(),
  /** The exam or format version this curriculum is written for, e.g. "TOEFL iBT (format of 21 Jan 2026)". */
  examVersion: z.string().min(3).max(120),
  /** Date (YYYY-MM-DD) the content was last checked against the sources below. */
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Official or primary sources the curriculum is built on (exam bodies, regulators, the format owner). */
  sources: z.array(z.object({ label: z.string().min(2).max(160), url: z.string().url() })).min(2).max(12),
  phases: z.array(BlueprintPhaseSchema).min(1).max(8),
});
export type Blueprint = z.infer<typeof BlueprintSchema>;

export const ModuleAdjustmentSchema = z.object({
  moduleId: z.string().min(1),
  priority: PriorityLevelSchema,
  allocatedHours: z.number().min(0),
  customFocus: z.string().min(1).max(400),
});
export type ModuleAdjustment = z.infer<typeof ModuleAdjustmentSchema>;

export const GeminiDeltaPatchSchema = z.object({
  strategySummary: z.string().min(1).max(600),
  moduleAdjustments: z.array(ModuleAdjustmentSchema).min(1),
  dailySlotRecommendation: z.string().min(1).max(300),
});
export type GeminiDeltaPatch = z.infer<typeof GeminiDeltaPatchSchema>;

export const AdaptRoadmapInputSchema = z.object({
  blueprintId: z.string().min(1),
  locale: LocaleSchema,
  currentLevel: z.string().trim().min(2).max(200),
  targetGoal: z.string().trim().min(2).max(200),
  deadlineDays: z.number().int().min(7).max(365),
  dailyHours: z.number().min(0.5).max(12),
  busyWindows: z.array(z.string().trim().min(1).max(100)).max(10).default([]),
  weakAreas: z.string().trim().max(300).optional(),
  /** The learner's local calendar date (YYYY-MM-DD); the server clock is UTC and would start plans a day early east of UTC. */
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
export type AdaptRoadmapInput = z.infer<typeof AdaptRoadmapInputSchema>;

export const RoadmapStepSchema = z.object({
  id: z.string().min(1),
  title: BilingualTextSchema,
  drill: BilingualTextSchema,
  framework: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
  completed: z.boolean(),
});
export type RoadmapStep = z.infer<typeof RoadmapStepSchema>;

export const RoadmapNodeSchema = z.object({
  id: z.string().min(1),
  title: BilingualTextSchema,
  summary: BilingualTextSchema,
  difficulty: DifficultyTierSchema,
  keyFramework: z.string().min(1),
  priority: PriorityLevelSchema,
  allocatedHours: z.number().min(0),
  customFocus: z.string().max(400).optional(),
  startDate: z.string(),
  endDate: z.string(),
  weekRange: z.string(),
  steps: z.array(RoadmapStepSchema),
});
export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;

export const RoadmapPhaseSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().positive(),
  title: BilingualTextSchema,
  objective: BilingualTextSchema,
  startDate: z.string(),
  endDate: z.string(),
  modules: z.array(RoadmapNodeSchema),
});
export type RoadmapPhase = z.infer<typeof RoadmapPhaseSchema>;

export const RoadmapSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  blueprintId: z.string().min(1),
  category: BlueprintCategorySchema,
  title: BilingualTextSchema,
  locale: LocaleSchema,
  currentLevel: z.string().min(1).max(200),
  targetGoal: z.string().min(1).max(200),
  deadlineDate: z.string(),
  deadlineDays: z.number().int().min(1),
  dailyHours: z.number().positive(),
  totalAllocatedHours: z.number().min(0),
  strategySummary: z.string().max(600),
  dailySlotRecommendation: z.string().max(300),
  status: z.enum(['active', 'completed', 'archived']),
  phases: z.array(RoadmapPhaseSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Roadmap = z.infer<typeof RoadmapSchema>;

export const DailyTaskSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  title: z.string().min(1).max(200),
  startTime: z.string().min(1).max(20),
  endTime: z.string().min(1).max(20),
  durationMinutes: z.number().int().min(5).max(480),
  priority: z.enum(['critical', 'high', 'standard']),
  category: z.string().min(1).max(60),
  executionSteps: z.array(z.string().min(1).max(300)).min(1).max(6),
  simplificationNote: z.string().min(1).max(300),
  completed: z.boolean(),
  scheduledDate: z.string().min(1).max(20),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type DailyTask = z.infer<typeof DailyTaskSchema>;

export const DecomposeTasksInputSchema = z.object({
  rawInput: z.string().trim().min(4).max(2000),
  locale: LocaleSchema,
  date: z.string().min(1).max(20),
  availableStart: z.string().default('08:30'),
  availableEnd: z.string().default('21:00'),
  busyWindows: z.array(z.string().max(100)).max(10).default([]),
});
export type DecomposeTasksInput = z.infer<typeof DecomposeTasksInputSchema>;

export const DecomposedTaskItemSchema = z.object({
  title: z.string().min(1).max(160),
  startTime: z.string().min(1).max(20),
  endTime: z.string().min(1).max(20),
  durationMinutes: z.number().int().min(5).max(480),
  priority: z.enum(['critical', 'high', 'standard']),
  category: z.string().min(1).max(60),
  executionSteps: z.array(z.string().min(1).max(280)).min(2).max(5),
  simplificationNote: z.string().min(1).max(280),
});

export const DecomposedTasksResponseSchema = z.object({
  dayBrief: z.string().min(1).max(400),
  tasks: z.array(DecomposedTaskItemSchema).min(1).max(8),
});
export type DecomposedTasksResponse = z.infer<typeof DecomposedTasksResponseSchema>;

export const NodeChatMessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
  createdAt: z.string(),
  cached: z.boolean().optional(),
});
export type NodeChatMessage = z.infer<typeof NodeChatMessageSchema>;

export const TutorNodeChatInputSchema = z.object({
  blueprintId: z.string().min(1),
  nodeId: z.string().min(1),
  nodeTitle: z.string().min(1).max(200),
  stepTitle: z.string().max(200).optional(),
  framework: z.string().max(160).optional(),
  currentLevel: z.string().max(200),
  targetGoal: z.string().max(200),
  locale: LocaleSchema,
  question: z.string().trim().min(2).max(1000),
  recentHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(2000),
      })
    )
    .max(4)
    .default([]),
});
export type TutorNodeChatInput = z.infer<typeof TutorNodeChatInputSchema>;

export const MentorRoleSchema = z.enum(['executive', 'rhetoric', 'legal', 'exam']);
export type MentorRole = z.infer<typeof MentorRoleSchema>;

export const MentorChatInputSchema = z.object({
  role: MentorRoleSchema,
  locale: LocaleSchema,
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(3000),
      })
    )
    .max(12)
    .default([]),
});
export type MentorChatInput = z.infer<typeof MentorChatInputSchema>;

export const UserProfileSchema = z.object({
  uid: z.string().min(1),
  displayName: z.string().min(1).max(120),
  email: z.string().email().max(180),
  photoURL: z.string().max(500).optional(),
  locale: LocaleSchema,
  dailyHours: z.number().min(0.5).max(12),
  busyWindows: z.array(z.string().max(100)).max(10),
  preferredStartTime: z.string().max(10),
  preferredEndTime: z.string().max(10),
  updatedAt: z.string(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;
