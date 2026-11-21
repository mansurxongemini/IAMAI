import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getDictionary } from '../../../../packages/core/i18n';
import { computeRoadmapProgress } from '../../../../packages/core/scheduler';
import type { DailyTask, Locale, Roadmap } from '../../../../packages/core/schemas';
import { createSeedRoadmaps, createSeedTasks } from '../../../../packages/core/seed';
import {
  loadCachedRoadmaps,
  loadCachedTasks,
  saveCachedTask,
} from '../../lib/offline-store';

export default function MobileExecutiveHome() {
  const [locale, setLocale] = useState<Locale>('en');
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(() => createSeedRoadmaps());
  const [tasks, setTasks] = useState<DailyTask[]>(() => createSeedTasks());
  const dict = getDictionary(locale);

  useEffect(() => {
    void (async () => {
      const cachedRms = await loadCachedRoadmaps();
      const cachedTasks = await loadCachedTasks();
      if (cachedRms.length > 0) setRoadmaps(cachedRms);
      if (cachedTasks.length > 0) setTasks(cachedTasks);
    })();
  }, []);

  async function handleToggleTask(taskId: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const next = { ...t, completed: !t.completed, updatedAt: new Date().toISOString() };
        void saveCachedTask(next, true);
        return next;
      })
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#F4F1EC] px-5 pt-14 pb-28">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-xs text-[#6E573E]">{dict.dashboard.localWorkspace}</Text>
          <Text className="text-3xl text-[#1C1C1A] font-semibold mt-0.5">
            {dict.dashboard.greeting}
          </Text>
        </View>

        <Pressable
          onPress={() => setLocale(locale === 'en' ? 'uz' : 'en')}
          className="rounded-full bg-[#1C1C1A] px-3.5 py-1.5"
        >
          <Text className="text-xs font-medium text-white">{locale.toUpperCase()}</Text>
        </Pressable>
      </View>

      <Text className="text-sm font-medium text-[#6A6760] mb-3">
        {dict.dashboard.activeRoadmaps}
      </Text>

      {roadmaps.map((rm) => {
        const progress = computeRoadmapProgress(rm);
        return (
          <View
            key={rm.id}
            className="rounded-3xl bg-white/80 border border-[#1C1C1A]/10 p-5 mb-3"
          >
            <Text className="text-xs text-[#6E573E]">
              {rm.deadlineDate} · {rm.totalAllocatedHours} {dict.common.hours}
            </Text>
            <Text className="text-xl text-[#1C1C1A] font-medium mt-1">{rm.title[locale]}</Text>
            <Text className="text-xs text-[#6A6760] mt-1">{rm.targetGoal}</Text>
            <View className="h-1.5 rounded-full bg-[#1C1C1A]/10 mt-3 overflow-hidden">
              <View
                className="h-full bg-[#1C1C1A] rounded-full"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </View>
          </View>
        );
      })}

      <Text className="text-sm font-medium text-[#6A6760] mt-5 mb-3">
        {dict.dashboard.todaySchedule}
      </Text>

      {tasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() => void handleToggleTask(task.id)}
          className="rounded-3xl bg-white/80 border border-[#1C1C1A]/10 p-4 mb-2.5 flex-row items-start gap-3"
        >
          <View
            className={`w-5 h-5 rounded-full border mt-0.5 ${
              task.completed ? 'bg-[#1C1C1A] border-[#1C1C1A]' : 'border-[#1C1C1A]/30'
            }`}
          />
          <View className="flex-1">
            <Text className="text-xs text-[#6E573E]">
              {task.startTime}–{task.endTime} · {task.category}
            </Text>
            <Text
              className={`text-sm font-medium mt-0.5 ${
                task.completed ? 'line-through text-[#6A6760]' : 'text-[#1C1C1A]'
              }`}
            >
              {task.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
