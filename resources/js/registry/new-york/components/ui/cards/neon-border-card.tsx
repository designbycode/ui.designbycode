'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface NeonBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number;
    colorFrom?: string;
    colorTo?: string;
    borderWidth?: number;
    beamSize?: number;
}

const NeonBorderCard = React.forwardRef<HTMLDivElement, NeonBorderCardProps>(
    (
        {
            className,
            children,
            duration = 4,
            colorFrom = 'var(--color-primary)',
            colorTo = 'var(--color-chart-1)',
            borderWidth = 1,
            beamSize = 120,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'relative overflow-hidden rounded-xl bg-card p-[1px] shadow-lg transition-shadow duration-300 hover:shadow-primary/10',
                    className,
                )}
                {...props}
            >
                {/* Neon Border Beam layer */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                    style={
                        {
                            '--beam-duration': `${duration}s`,
                            '--color-from': colorFrom,
                            '--color-to': colorTo,
                            position: 'absolute',
                            width: '200%',
                            height: '200%',
                            top: '-50%',
                            left: '-50%',
                            background:
                                'conic-gradient(from 0deg at 50% 50%, transparent 60%, var(--color-from) 85%, var(--color-to) 95%, transparent 100%)',
                            animation:
                                'spin var(--beam-duration) linear infinite',
                        } as React.CSSProperties
                    }
                />

                {/* Card interior content */}
                <div className="relative flex h-full w-full flex-col rounded-[11px] bg-card/95 p-6 text-card-foreground backdrop-blur-xs">
                    {children}
                </div>
            </div>
        );
    },
);

NeonBorderCard.displayName = 'NeonBorderCard';

export { NeonBorderCard };
export default NeonBorderCard;
