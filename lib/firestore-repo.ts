'use client';

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import type { DailyTask, NodeChatMessage, Roadmap, UserProfile } from '@core/schemas';
import { db, handleFirestoreError, OperationType } from './firebase';

function toIsoString(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return new Date().toISOString();
}

export async function ensureUserProfileDoc(profile: UserProfile): Promise<void> {
  const path = `users/${profile.uid}`;
  const ref = doc(db, 'users', profile.uid);
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: profile.uid,
        displayName: profile.displayName.slice(0, 120),
        email: profile.email.slice(0, 180),
        ...(profile.photoURL ? { photoURL: profile.photoURL.slice(0, 500) } : {}),
        locale: profile.locale,
        dailyHours: Math.min(12, Math.max(0.5, profile.dailyHours)),
        busyWindows: profile.busyWindows.slice(0, 10).map((w) => w.slice(0, 100)),
        preferredStartTime: profile.preferredStartTime.slice(0, 10),
        preferredEndTime: profile.preferredEndTime.slice(0, 10),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateUserProfileDoc(
  uid: string,
  updates: Pick<
    UserProfile,
    'displayName' | 'locale' | 'dailyHours' | 'busyWindows' | 'preferredStartTime' | 'preferredEndTime'
  >
): Promise<void> {
  const path = `users/${uid}`;
  const ref = doc(db, 'users', uid);
  try {
    await updateDoc(ref, {
      displayName: updates.displayName.slice(0, 120),
      locale: updates.locale,
      dailyHours: Math.min(12, Math.max(0.5, updates.dailyHours)),
      busyWindows: updates.busyWindows.slice(0, 10).map((w) => w.slice(0, 100)),
      preferredStartTime: updates.preferredStartTime.slice(0, 10),
      preferredEndTime: updates.preferredEndTime.slice(0, 10),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function subscribeUserProfile(
  uid: string,
  onData: (profile: UserProfile | null) => void
): Unsubscribe {
  const path = `users/${uid}`;
  const ref = doc(db, 'users', uid);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      const d = snap.data();
      onData({
        uid: String(d.uid),
        displayName: String(d.displayName ?? 'Executive Member'),
        email: String(d.email ?? ''),
        photoURL: typeof d.photoURL === 'string' ? d.photoURL : undefined,
        locale: d.locale === 'uz' ? 'uz' : 'en',
        dailyHours: typeof d.dailyHours === 'number' ? d.dailyHours : 2.5,
        busyWindows: Array.isArray(d.busyWindows) ? d.busyWindows.map(String) : [],
        preferredStartTime: String(d.preferredStartTime ?? '08:00'),
        preferredEndTime: String(d.preferredEndTime ?? '21:30'),
        updatedAt: toIsoString(d.updatedAt),
      });
    },
    (error) => reportListenerError(error, OperationType.GET, path)
  );
}

/**
 * Live listeners must never throw: a throw inside onSnapshot's error callback is an
 * uncaught error that takes the page down. Log it; the local cache keeps the UI working.
 */
function reportListenerError(error: unknown, op: OperationType, path: string): void {
  console.warn(`[firestore] ${op} ${path}:`, error instanceof Error ? error.message : error);
}

export function subscribeRoadmaps(
  uid: string,
  onData: (roadmaps: Roadmap[]) => void
): Unsubscribe {
  const path = `users/${uid}/roadmaps`;
  // Equality filter only (the rules require it); sorted on the client, so no composite index is needed.
  const q = query(collection(db, 'users', uid, 'roadmaps'), where('ownerId', '==', uid));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Roadmap[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          ...(d as Omit<Roadmap, 'createdAt' | 'updatedAt'>),
          id: docSnap.id,
          createdAt: toIsoString(d.createdAt),
          updatedAt: toIsoString(d.updatedAt),
        };
      });
      onData(list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    },
    (error) => reportListenerError(error, OperationType.LIST, path)
  );
}

export async function createRoadmapDoc(uid: string, roadmap: Roadmap): Promise<void> {
  const path = `users/${uid}/roadmaps/${roadmap.id}`;
  const ref = doc(db, 'users', uid, 'roadmaps', roadmap.id);
  try {
    await setDoc(ref, {
      id: roadmap.id,
      ownerId: uid,
      blueprintId: roadmap.blueprintId.slice(0, 64),
      category: roadmap.category,
      title: {
        en: roadmap.title.en.slice(0, 160),
        uz: roadmap.title.uz.slice(0, 160),
      },
      locale: roadmap.locale,
      currentLevel: roadmap.currentLevel.slice(0, 200),
      targetGoal: roadmap.targetGoal.slice(0, 200),
      deadlineDate: roadmap.deadlineDate.slice(0, 20),
      deadlineDays: roadmap.deadlineDays,
      dailyHours: roadmap.dailyHours,
      totalAllocatedHours: roadmap.totalAllocatedHours,
      strategySummary: roadmap.strategySummary.slice(0, 600),
      dailySlotRecommendation: roadmap.dailySlotRecommendation.slice(0, 300),
      status: roadmap.status,
      phases: roadmap.phases.slice(0, 8),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateRoadmapProgressDoc(
  uid: string,
  roadmapId: string,
  phases: Roadmap['phases'],
  status: Roadmap['status']
): Promise<void> {
  const path = `users/${uid}/roadmaps/${roadmapId}`;
  const ref = doc(db, 'users', uid, 'roadmaps', roadmapId);
  try {
    await updateDoc(ref, {
      phases,
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function archiveRoadmapDoc(uid: string, roadmapId: string): Promise<void> {
  const path = `users/${uid}/roadmaps/${roadmapId}`;
  const ref = doc(db, 'users', uid, 'roadmaps', roadmapId);
  try {
    await updateDoc(ref, {
      status: 'archived',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function subscribeTasks(
  uid: string,
  onData: (tasks: DailyTask[]) => void
): Unsubscribe {
  const path = `users/${uid}/tasks`;
  const q = query(collection(db, 'users', uid, 'tasks'), where('ownerId', '==', uid));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: DailyTask[] = snapshot.docs
        .map((docSnap) => {
          const d = docSnap.data();
          return {
            ...(d as Omit<DailyTask, 'createdAt' | 'updatedAt'>),
            id: docSnap.id,
            createdAt: toIsoString(d.createdAt),
            updatedAt: toIsoString(d.updatedAt),
          };
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      onData(list);
    },
    (error) => reportListenerError(error, OperationType.LIST, path)
  );
}

export async function createTaskDoc(uid: string, task: DailyTask): Promise<void> {
  const path = `users/${uid}/tasks/${task.id}`;
  const ref = doc(db, 'users', uid, 'tasks', task.id);
  try {
    await setDoc(ref, {
      id: task.id,
      ownerId: uid,
      title: task.title.slice(0, 200),
      startTime: task.startTime.slice(0, 20),
      endTime: task.endTime.slice(0, 20),
      durationMinutes: Math.min(480, Math.max(5, Math.round(task.durationMinutes))),
      priority: task.priority,
      category: task.category.slice(0, 60),
      executionSteps: task.executionSteps.slice(0, 6).map((s) => s.slice(0, 300)),
      simplificationNote: task.simplificationNote.slice(0, 300),
      completed: Boolean(task.completed),
      scheduledDate: task.scheduledDate.slice(0, 20),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function toggleTaskDoc(
  uid: string,
  taskId: string,
  completed: boolean
): Promise<void> {
  const path = `users/${uid}/tasks/${taskId}`;
  const ref = doc(db, 'users', uid, 'tasks', taskId);
  try {
    await updateDoc(ref, {
      completed,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteTaskDoc(uid: string, taskId: string): Promise<void> {
  const path = `users/${uid}/tasks/${taskId}`;
  const ref = doc(db, 'users', uid, 'tasks', taskId);
  try {
    await deleteDoc(ref);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveNodeThreadDoc(
  uid: string,
  roadmapId: string,
  nodeId: string,
  messages: NodeChatMessage[]
): Promise<void> {
  const threadId = `${roadmapId}_${nodeId}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
  const path = `users/${uid}/nodeThreads/${threadId}`;
  const ref = doc(db, 'users', uid, 'nodeThreads', threadId);
  try {
    const existing = await getDoc(ref);
    const boundedMessages = messages.slice(-24);
    if (existing.exists()) {
      await updateDoc(ref, {
        messages: boundedMessages,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        id: threadId,
        ownerId: uid,
        roadmapId,
        nodeId,
        messages: boundedMessages,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getBlueprintCacheDoc(nodeHash: string): Promise<string | null> {
  const path = `blueprintCache/${nodeHash}`;
  const ref = doc(db, 'blueprintCache', nodeHash);
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data();
    return typeof data.answer === 'string' ? data.answer : null;
  } catch {
    // Graceful cache miss when offline or unauthenticated
    return null;
  }
}

export async function writeBlueprintCacheDoc(params: {
  nodeHash: string;
  blueprintId: string;
  nodeId: string;
  locale: 'en' | 'uz';
  answer: string;
  uid: string;
}): Promise<void> {
  const path = `blueprintCache/${params.nodeHash}`;
  const ref = doc(db, 'blueprintCache', params.nodeHash);
  try {
    const existing = await getDoc(ref);
    if (existing.exists()) return;
    await setDoc(ref, {
      nodeHash: params.nodeHash,
      blueprintId: params.blueprintId.slice(0, 64),
      nodeId: params.nodeId.slice(0, 64),
      locale: params.locale,
      answer: params.answer.slice(0, 3000),
      createdBy: params.uid,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Non-fatal cache write skip (immutable cache rules or offline mode)
  }
}
