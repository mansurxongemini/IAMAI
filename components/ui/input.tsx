import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'w-full rounded-2xl bg-surface/85 border border-ink/10 px-4 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-ink focus:bg-surface';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, 'h-12', className)} {...props} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, 'py-3 resize-none', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('block text-xs font-medium text-ink mb-1.5', className)} {...props} />;
}
