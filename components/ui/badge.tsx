import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-none px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap', {
  variants: {
    tone: {
      neutral: 'bg-ink/[0.05] text-muted',
      ink: 'bg-accent text-on-accent',
      bronze: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
      warn: 'bg-warn/10 text-warn',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export function Badge({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
