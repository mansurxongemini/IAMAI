'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { getDictionary, type Dictionary } from '@core/i18n';
import { computeNodeCacheHash, toggleRoadmapStep } from '@core/scheduler';
import type {
  DailyTask,
  Locale,
  MentorRole,
  NodeChatMessage,
  Roadmap,
  UserProfile,
} from '@core/schemas';
import { DEFAULT_USER_PROFILE } from '@core/defaults';
import { loadCloud } from '@/lib/cloud';
import { apiPost } from '@/lib/api-client';
import { recordCompletion } from '@/features/today/activity';

const STORAGE_KEYS = {
  profile: 'iam_ai_profile_v1',
  roadmaps: 'iam_ai_roadmaps_v1',
  tasks: 'iam_ai_tasks_v1',
  threads: 'iam_ai_threads_v1',
  mentor: 'iam_ai_mentor_v1',
};

interface WorkspaceContextValue {
  user: User | null;
  authReady: boolean;
  /** True once the local cache has been read; render skeletons before this. */
  hydrated: boolean;
  isOnline: boolean;
  profile: UserProfile;
  locale: Locale;
  dict: Dictionary;
  roadmaps: Roadmap[];
  tasks: DailyTask[];
  nodeThreads: Record<string, NodeChatMessage[]>;
  mentorMessages: Record<MentorRole, NodeChatMessage[]>;
  dayBrief: string;
  setDayBrief: (brief: string) => void;
  setLocale: (next: Locale) => void;
  saveProfile: (
    updates: Pick<
      UserProfile,
      'displayName' | 'locale' | 'dailyHours' | 'busyWindows' | 'preferredStartTime' | 'preferredEndTime'
    >
  ) => Promise<void>;
  addRoadmap: (roadmap: Roadmap) => Promise<void>;
  toggleStep: (roadmapId: string, moduleId: string, stepId: string) => Promise<void>;
  archiveRoadmap: (roadmapId: string) => Promise<void>;
  addTasks: (newTasks: DailyTask[]) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  clearCompletedTasks: () => Promise<void>;
  askNodeTutor: (params: {
    roadmap: Roadmap;
    nodeId: string;
    nodeTitle: string;
    stepTitle?: string;
    framework?: string;
    question: string;
  }) => Promise<NodeChatMessage>;
  sendMentorMessage: (role: MentorRole, message: string) => Promise<NodeChatMessage>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota issues
  }
}

const EMPTY_MENTOR_THREADS: Record<MentorRole, NodeChatMessage[]> = {
  executive: [],
  rhetoric: [],
  legal: [],
  exam: [],
};

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [nodeThreads, setNodeThreads] = useState<Record<string, NodeChatMessage[]>>({});
  const [mentorMessages, setMentorMessages] =
    useState<Record<MentorRole, NodeChatMessage[]>>(EMPTY_MENTOR_THREADS);
  const [dayBrief, setDayBrief] = useState<string>('');
  const [hydrated, setHydrated] = useState(false);

  // Hydrate offline-first local cache on mount
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const storedProfile = safeReadJson<UserProfile | null>(STORAGE_KEYS.profile, null);
      if (storedProfile) setProfile(storedProfile);

      const storedRoadmaps = safeReadJson<Roadmap[] | null>(STORAGE_KEYS.roadmaps, null);
      const storedTasks = safeReadJson<DailyTask[] | null>(STORAGE_KEYS.tasks, null);
      const hasRoadmaps = Boolean(storedRoadmaps && storedRoadmaps.length > 0);
      if (storedRoadmaps && hasRoadmaps) setRoadmaps(storedRoadmaps);
      if (storedTasks) setTasks(storedTasks);

      const storedThreads = safeReadJson<Record<string, NodeChatMessage[]>>(
        STORAGE_KEYS.threads,
        {}
      );
      setNodeThreads(storedThreads);

      const storedMentor = safeReadJson<Record<MentorRole, NodeChatMessage[]>>(
        STORAGE_KEYS.mentor,
        EMPTY_MENTOR_THREADS
      );
      setMentorMessages({ ...EMPTY_MENTOR_THREADS, ...storedMentor });

      setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
      // New visitors start empty and go through goal onboarding (no demo data).
      setHydrated(true);
    });

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      active = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mirror state to localStorage for instant offline cold starts
  useEffect(() => {
    if (!hydrated) return;
    safeWriteJson(STORAGE_KEYS.profile, profile);
  }, [profile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    safeWriteJson(STORAGE_KEYS.roadmaps, roadmaps);
  }, [roadmaps, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    safeWriteJson(STORAGE_KEYS.tasks, tasks);
  }, [tasks, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    safeWriteJson(STORAGE_KEYS.threads, nodeThreads);
  }, [nodeThreads, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    safeWriteJson(STORAGE_KEYS.mentor, mentorMessages);
  }, [mentorMessages, hydrated]);

  // Firebase Auth listener + real-time Firestore subscriptions when authenticated
  useEffect(() => {
    let unsubAuth: (() => void) | undefined;
    let cancelled = false;
    const start = () =>
      void loadCloud().then((c) => {
        if (cancelled) return;
        unsubAuth = c.watchAuth((firebaseUser) => {
          setUser(firebaseUser);
          setAuthReady(true);
        });
      });
    // Sign-in is required for the app, so the auth SDK starts at once (still code-split).
    start();
    return () => {
      cancelled = true;
      unsubAuth?.();
    };
  }, []);

  useEffect(() => {
    if (!authReady || !user) return;

    const initialProfile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName || profile.displayName || 'Executive Member',
      email: user.email || 'member@iam-ai.workspace',
      photoURL: user.photoURL || undefined,
      locale: profile.locale,
      dailyHours: profile.dailyHours,
      busyWindows: profile.busyWindows,
      preferredStartTime: profile.preferredStartTime,
      preferredEndTime: profile.preferredEndTime,
      updatedAt: new Date().toISOString(),
    };

    let cancelled = false;
    const unsubs: Array<() => void> = [];
    void loadCloud().then((c) => {
      if (cancelled) return;
      void c.ensureUserProfileDoc(initialProfile).catch(() => {
        // Non-blocking on initial offline boot
      });

    unsubs.push(c.subscribeUserProfile(user.uid, (remoteProfile) => {
      if (remoteProfile) {
        setProfile(remoteProfile);
      }
    }));

    unsubs.push(c.subscribeRoadmaps(user.uid, (remoteRoadmaps) => {
      if (remoteRoadmaps.length > 0) {
        setRoadmaps(remoteRoadmaps);
      }
    }));

    unsubs.push(c.subscribeTasks(user.uid, (remoteTasks) => {
      if (remoteTasks.length > 0) {
        setTasks(remoteTasks);
      }
    }));
    });

    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, user]);

  const setLocale = useCallback(
    (next: Locale) => {
      setProfile((prev) => {
        const updated = { ...prev, locale: next, updatedAt: new Date().toISOString() };
        if (user) {
          void loadCloud().then((c) => c.updateUserProfileDoc(user.uid, updated)).catch(() => {});
        }
        return updated;
      });

      void import('@core/seed').then(({ createSeedRoadmaps, createSeedTasks }) => {
      const localizedSeeds = createSeedRoadmaps(user?.uid ?? 'local-executive', next);
      const seedRoadmapMap = new Map(localizedSeeds.map((r) => [r.id, r]));
      setRoadmaps((prev) =>
        prev.map((rm) => {
          const fresh = seedRoadmapMap.get(rm.id);
          if (!fresh) return rm;
          return {
            ...rm,
            locale: next,
            currentLevel: fresh.currentLevel,
            targetGoal: fresh.targetGoal,
            strategySummary: fresh.strategySummary,
            dailySlotRecommendation: fresh.dailySlotRecommendation,
            phases: rm.phases.map((phase, pIdx) => ({
              ...phase,
              modules: phase.modules.map((mod, mIdx) => ({
                ...mod,
                customFocus: fresh.phases[pIdx]?.modules[mIdx]?.customFocus ?? mod.customFocus,
              })),
            })),
          };
        })
      );

      const localizedSeedTasks = createSeedTasks(user?.uid ?? 'local-executive', next);
      const seedTaskMap = new Map(localizedSeedTasks.map((t) => [t.id, t]));
      setTasks((prev) =>
        prev.map((task) => {
          const fresh = seedTaskMap.get(task.id);
          if (!fresh) return task;
          return {
            ...fresh,
            completed: task.completed,
            updatedAt: task.updatedAt,
          };
        })
      );
      });
    },
    [user]
  );

  const saveProfile = useCallback(
    async (
      updates: Pick<
        UserProfile,
        'displayName' | 'locale' | 'dailyHours' | 'busyWindows' | 'preferredStartTime' | 'preferredEndTime'
      >
    ) => {
      const next: UserProfile = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      setProfile(next);
      if (user) {
        await (await loadCloud()).updateUserProfileDoc(user.uid, updates);
      }
    },
    [profile, user]
  );

  const addRoadmap = useCallback(
    async (roadmap: Roadmap) => {
      const owned: Roadmap = user ? { ...roadmap, ownerId: user.uid } : roadmap;
      setRoadmaps((prev) => [owned, ...prev.filter((r) => r.id !== owned.id)]);
      if (user) {
        await (await loadCloud()).createRoadmapDoc(user.uid, owned);
      }
    },
    [user]
  );

  const toggleStep = useCallback(
    async (roadmapId: string, moduleId: string, stepId: string) => {
      let updatedTarget: Roadmap | null = null;
      setRoadmaps((prev) =>
        prev.map((rm) => {
          if (rm.id !== roadmapId) return rm;
          const wasDone = rm.phases.some((ph) =>
            ph.modules.some((m) => m.id === moduleId && m.steps.some((st) => st.id === stepId && st.completed))
          );
          recordCompletion(`step:${roadmapId}:${stepId}`, !wasDone);
          const next = toggleRoadmapStep(rm, moduleId, stepId);
          updatedTarget = next;
          return next;
        })
      );
      if (user && updatedTarget) {
        const target = updatedTarget as Roadmap;
        await (await loadCloud()).updateRoadmapProgressDoc(user.uid, roadmapId, target.phases, target.status);
      }
    },
    [user]
  );

  const archiveRoadmap = useCallback(
    async (roadmapId: string) => {
      setRoadmaps((prev) =>
        prev.map((rm) =>
          rm.id === roadmapId
            ? { ...rm, status: 'archived', updatedAt: new Date().toISOString() }
            : rm
        )
      );
      if (user) {
        await (await loadCloud()).archiveRoadmapDoc(user.uid, roadmapId);
      }
    },
    [user]
  );

  const addTasks = useCallback(
    async (newTasks: DailyTask[]) => {
      const normalized = newTasks.map((t) => (user ? { ...t, ownerId: user.uid } : t));
      setTasks((prev) => {
        const merged = [...normalized, ...prev];
        return merged.sort((a, b) => a.startTime.localeCompare(b.startTime));
      });
      if (user) {
        await loadCloud().then((c) => Promise.all(normalized.map((t) => c.createTaskDoc(user.uid, t))));
      }
    },
    [user]
  );

  const toggleTask = useCallback(
    async (taskId: string) => {
      let nextCompleted = false;
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== taskId) return t;
          nextCompleted = !t.completed;
          recordCompletion(`task:${taskId}`, nextCompleted);
          return { ...t, completed: nextCompleted, updatedAt: new Date().toISOString() };
        })
      );
      if (user) {
        await (await loadCloud()).toggleTaskDoc(user.uid, taskId, nextCompleted);
      }
    },
    [user]
  );

  const clearCompletedTasks = useCallback(async () => {
    const completedIds = tasks.filter((t) => t.completed).map((t) => t.id);
    setTasks((prev) => prev.filter((t) => !t.completed));
    if (user && completedIds.length > 0) {
      await loadCloud().then((c) => Promise.all(completedIds.map((id) => c.deleteTaskDoc(user.uid, id))));
    }
  }, [tasks, user]);

  const askNodeTutor = useCallback(
    async (params: {
      roadmap: Roadmap;
      nodeId: string;
      nodeTitle: string;
      stepTitle?: string;
      framework?: string;
      question: string;
    }): Promise<NodeChatMessage> => {
      const threadKey = `${params.roadmap.id}:${params.nodeId}`;
      const existingThread = nodeThreads[threadKey] ?? [];
      const userMsg: NodeChatMessage = {
        id: `msg_u_${Date.now().toString(36)}`,
        role: 'user',
        content: params.question,
        createdAt: new Date().toISOString(),
      };

      const optimistic = [...existingThread, userMsg];
      setNodeThreads((prev) => ({ ...prev, [threadKey]: optimistic }));

      // Check Firestore canonical blueprintCache for first-turn canonical questions
      const nodeHash = computeNodeCacheHash(
        params.roadmap.blueprintId,
        params.nodeId,
        profile.locale,
        params.question
      );
      if (user && existingThread.length === 0) {
        const cachedAnswer = await (await loadCloud()).getBlueprintCacheDoc(nodeHash);
        if (cachedAnswer) {
          const cachedMsg: NodeChatMessage = {
            id: `msg_a_${Date.now().toString(36)}`,
            role: 'assistant',
            content: cachedAnswer,
            createdAt: new Date().toISOString(),
            cached: true,
          };
          const nextMsgs = [...optimistic, cachedMsg];
          setNodeThreads((prev) => ({ ...prev, [threadKey]: nextMsgs }));
          void loadCloud()
            .then((c) => c.saveNodeThreadDoc(user.uid, params.roadmap.id, params.nodeId, nextMsgs))
            .catch(() => {});
          return cachedMsg;
        }
      }

      const { ok: resOk, data } = await apiPost('/api/tutor/chat', {
          blueprintId: params.roadmap.blueprintId,
          nodeId: params.nodeId,
          nodeTitle: params.nodeTitle,
          stepTitle: params.stepTitle,
          framework: params.framework,
          currentLevel: params.roadmap.currentLevel,
          targetGoal: params.roadmap.targetGoal,
          locale: profile.locale,
          question: params.question,
          recentHistory: existingThread.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });
      if (!resOk) {
        throw new Error(data.error || 'Failed to get AI Tutor response.');
      }

      const assistantMsg: NodeChatMessage = {
        id: `msg_a_${Date.now().toString(36)}`,
        role: 'assistant',
        content: String(data.reply),
        createdAt: new Date().toISOString(),
      };

      const nextMsgs = [...optimistic, assistantMsg];
      setNodeThreads((prev) => ({ ...prev, [threadKey]: nextMsgs }));

      if (user) {
        void loadCloud()
          .then((c) => c.saveNodeThreadDoc(user.uid, params.roadmap.id, params.nodeId, nextMsgs))
          .catch(() => {});
        if (existingThread.length === 0) {
          void loadCloud().then((c) => c.writeBlueprintCacheDoc({
            nodeHash,
            blueprintId: params.roadmap.blueprintId,
            nodeId: params.nodeId,
            locale: profile.locale,
            answer: assistantMsg.content,
            uid: user.uid,
          })).catch(() => {});
        }
      }

      return assistantMsg;
    },
    [nodeThreads, profile.locale, user]
  );

  const sendMentorMessage = useCallback(
    async (role: MentorRole, message: string): Promise<NodeChatMessage> => {
      const existing = mentorMessages[role] ?? [];
      const userMsg: NodeChatMessage = {
        id: `mentor_u_${Date.now().toString(36)}`,
        role: 'user',
        content: message,
        createdAt: new Date().toISOString(),
      };
      const optimistic = [...existing, userMsg];
      setMentorMessages((prev) => ({ ...prev, [role]: optimistic }));

      const { ok: resOk, data } = await apiPost('/api/mentor/chat', {
          role,
          locale: profile.locale,
          message,
          history: existing.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        });
      if (!resOk) {
        throw new Error(data.error || 'Executive Mentor request failed.');
      }

      const replyMsg: NodeChatMessage = {
        id: `mentor_a_${Date.now().toString(36)}`,
        role: 'assistant',
        content: String(data.reply),
        createdAt: new Date().toISOString(),
      };

      setMentorMessages((prev) => ({
        ...prev,
        [role]: [...optimistic, replyMsg],
      }));
      return replyMsg;
    },
    [mentorMessages, profile.locale]
  );

  const signIn = useCallback(async () => {
    await (await loadCloud()).signInWithGoogle();
  }, []);

  const signOut = useCallback(async () => {
    await (await loadCloud()).signOutAccount();
  }, []);

  const dict = useMemo(() => getDictionary(profile.locale), [profile.locale]);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      user,
      authReady,
      hydrated,
      isOnline,
      profile,
      locale: profile.locale,
      dict,
      roadmaps,
      tasks,
      nodeThreads,
      mentorMessages,
      dayBrief,
      setDayBrief,
      setLocale,
      saveProfile,
      addRoadmap,
      toggleStep,
      archiveRoadmap,
      addTasks,
      toggleTask,
      clearCompletedTasks,
      askNodeTutor,
      sendMentorMessage,
      signIn,
      signOut,
    }),
    [
      user,
      authReady,
      hydrated,
      isOnline,
      profile,
      dict,
      roadmaps,
      tasks,
      nodeThreads,
      mentorMessages,
      dayBrief,
      setLocale,
      saveProfile,
      addRoadmap,
      toggleStep,
      archiveRoadmap,
      addTasks,
      toggleTask,
      clearCompletedTasks,
      askNodeTutor,
      sendMentorMessage,
      signIn,
      signOut,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within WorkspaceProvider.');
  }
  return ctx;
}
