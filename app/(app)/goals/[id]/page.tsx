import { OnboardingWizard } from '@/features/onboarding/OnboardingWizard';
import { CATALOG } from '@core/catalog';

export function generateStaticParams() {
  return CATALOG.map((e) => ({ id: e.id }));
}

export default async function GoalOnboardingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OnboardingWizard goalId={id} />;
}
