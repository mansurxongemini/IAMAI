import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono uppercase tracking-[0.14em] transition-[background-color,border-color,transform,box-shadow] duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent hover:bg-accent/90',
        secondary: 'bg-surface/80 text-ink border border-ink/10 hover:bg-surface hover:border-ink/20',
        ghost: 'text-muted hover:text-ink hover:bg-surface/70',
        inverse: 'bg-white text-[#0A0A0A] hover:bg-[#E4E4E7]',
      },
      size: {
        sm: 'h-8 px-3.5 text-[10px] [&_svg]:size-3.5',
        md: 'h-10 px-5 text-[11px] [&_svg]:size-4',
        lg: 'h-12 px-6 text-[11.5px] [&_svg]:size-4',
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
