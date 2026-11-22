import { Suspense } from 'react';
import { GoalCatalog } from '@/features/goals/GoalCatalog';

export const metadata = { title: 'Goals — IAM AI' };

export default function GoalsPage() {
  return (
    <Suspense>
      <GoalCatalog />
    </Suspense>
  );
}
