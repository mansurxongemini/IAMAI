'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Page body inside the workspace (padding and reading width). The shell itself — sidebar,
 * sign-in gate, search — is components/workspace/WorkspaceShell.tsx, mounted once by app/(app)/layout.tsx.
 */
export function AppShell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-10 pt-6 pb-24', wide ? 'max-w-[1240px]' : 'max-w-[1040px]')}>{children}</div>;
}
