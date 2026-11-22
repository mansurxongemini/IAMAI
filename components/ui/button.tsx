import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold uppercase tracking-[0.1em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-px active:translate-y-0 active:scale-[0.97] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent hover:bg-accent/85',
        secondary: 'bg-surface/80 text-ink border border-ink/10 hover:bg-surface hover:border-ink/20',
        ghost: 'text-muted hover:text-ink hover:bg-surface/70',
        inverse: 'bg-[#f1f1f4] text-[#121213] hover:bg-white',
      },
      size: {
        sm: 'h-8 px-3.5 text-[10.5px] [&_svg]:size-3.5',
        md: 'h-10 px-5 text-[11.5px] [&_svg]:size-4',
        lg: 'h-12 px-6 text-[12px] [&_svg]:size-4',
        icon: 'h-10 w-10 [&_svg]:size-4',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = 'button', ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = 'Button';
