import * as SQLite from 'expo-sqlite';
import type { DailyTask, Roadmap } from '../../../packages/core/schemas';

export interface QueuedMutation {
  id: string;
  collection: 'roadmaps' | 'tasks';
  docId: string;
  payloadJson: string;
  createdAt: number;
}

const DB_NAME = 'iam_ai_offline.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getOfflineDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME).then(async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS roadmaps (
          id TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          scheduled_date TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS sync_queue (
          id TEXT PRIMARY KEY NOT NULL,
          collection TEXT NOT NULL,
          doc_id TEXT NOT NULL,
          payload TEXT NOT NULL,
          created_at INTEGER NOT NULL
        );
      `);
      return db;
    });
  }
  return dbPromise;
}

export async function loadCachedRoadmaps(): Promise<Roadmap[]> {
  const db = await getOfflineDb();
  const rows = await db.getAllAsync<{ payload: string }>(
    'SELECT payload FROM roadmaps ORDER BY updated_at DESC'
  );
  return rows.map((row) => JSON.parse(row.payload) as Roadmap);
}

export async function saveCachedRoadmap(roadmap: Roadmap, queueSync = true): Promise<void> {
  const db = await getOfflineDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO roadmaps (id, payload, updated_at) VALUES (?, ?, ?)',
    [roadmap.id, JSON.stringify(roadmap), roadmap.updatedAt]
  );
  if (queueSync) {
    await db.runAsync(
      'INSERT OR REPLACE INTO sync_queue (id, collection, doc_id, payload, created_at) VALUES (?, ?, ?, ?, ?)',
      [`rm_${roadmap.id}`, 'roadmaps', roadmap.id, JSON.stringify(roadmap), Date.now()]
    );
  }
}

export async function loadCachedTasks(): Promise<DailyTask[]> {
  const db = await getOfflineDb();
  const rows = await db.getAllAsync<{ payload: string }>(
    'SELECT payload FROM tasks ORDER BY scheduled_date DESC'
  );
  return rows.map((row) => JSON.parse(row.payload) as DailyTask);
}

export async function saveCachedTask(task: DailyTask, queueSync = true): Promise<void> {
  const db = await getOfflineDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO tasks (id, payload, scheduled_date) VALUES (?, ?, ?)',
    [task.id, JSON.stringify(task), task.scheduledDate]
  );
  if (queueSync) {
    await db.runAsync(
      'INSERT OR REPLACE INTO sync_queue (id, collection, doc_id, payload, created_at) VALUES (?, ?, ?, ?, ?)',
      [`task_${task.id}`, 'tasks', task.id, JSON.stringify(task), Date.now()]
    );
  }
}

export async function flushOfflineSyncQueue(
  pushFn: (mutation: QueuedMutation) => Promise<void>
): Promise<number> {
  const db = await getOfflineDb();
  const pending = await db.getAllAsync<{
    id: string;
    collection: 'roadmaps' | 'tasks';
    doc_id: string;
    payload: string;
    created_at: number;
  }>('SELECT * FROM sync_queue ORDER BY created_at ASC');

  let synced = 0;
  for (const row of pending) {
    await pushFn({
      id: row.id,
      collection: row.collection,
      docId: row.doc_id,
      payloadJson: row.payload,
      createdAt: row.created_at,
    });
    await db.runAsync('DELETE FROM sync_queue WHERE id = ?', [row.id]);
    synced += 1;
  }
  return synced;
}
