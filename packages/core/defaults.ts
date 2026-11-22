import type { UserProfile } from './schemas';

export const DEFAULT_USER_PROFILE: UserProfile = {
  uid: 'local-executive',
  displayName: 'Executive Member',
  email: 'member@iam-ai.workspace',
  locale: 'en',
  dailyHours: 2.5,
  busyWindows: ['Mon-Fri 09:00-14:00'],
  preferredStartTime: '08:00',
  preferredEndTime: '21:30',
  updatedAt: new Date().toISOString(),
};
