'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonSpecialProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Special button styles
     * @default 'neon'
     */
    specialVariant?: 'gradient-border' | 'pulse' | 'neon' | 'draw';
}

const ButtonSpecial = React.forwardRef<HTMLButtonElement, ButtonSpecialProps>(
    ({ className, children, specialVariant = 'neon', ...props }, ref) => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <button
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    'relative inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-6 py-2 text-sm font-semibold tracking-wide outline-hidden transition-all select-none active:scale-95 disabled:pointer-events-none disabled:opacity-50',

                    // 1. Neon Glowing Variant
                    specialVariant === 'neon' && [
                        'border border-primary/30 bg-primary/5 text-primary shadow-[0_0_15px] shadow-primary/10',
                        'hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px] hover:shadow-primary/20',
                    ],

                    // 2. Breathing Pulse Variant
                    specialVariant === 'pulse' && [
                        'bg-primary text-primary-foreground shadow-lg shadow-primary/20',
                        'before:absolute before:inset-0 before:animate-ping before:rounded-md before:bg-primary before:opacity-10 before:duration-1000',
                        'hover:shadow-primary/30 hover:brightness-105',
                    ],

                    // 3. Border Draw Variant
                    specialVariant === 'draw' && [
                        'overflow-hidden border border-border bg-transparent text-foreground',
                        'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300',
                        'hover:bg-muted/30 hover:after:scale-x-100',
                    ],

                    // 4. Moving Gradient Border Variant
                    specialVariant === 'gradient-border' && [
                        'border border-transparent text-foreground',
                    ],

                    className,
                )}
                style={
                    specialVariant === 'gradient-border'
                        ? {
                              backgroundImage: isHovered
                                  ? 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, var(--color-chart-3), var(--color-chart-1), var(--color-chart-5))'
                                  : 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, var(--color-chart-1), var(--color-chart-5), var(--color-chart-3))',
                              backgroundOrigin: 'border-box',
                              backgroundClip: 'padding-box, border-box',
                          }
                        : undefined
                }
                {...props}
            >
                {children}
            </button>
        );
    },
);

ButtonSpecial.displayName = 'ButtonSpecial';

export { ButtonSpecial };
export type { ButtonSpecialProps };
