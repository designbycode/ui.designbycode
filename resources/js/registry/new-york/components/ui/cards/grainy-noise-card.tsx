'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface GrainyNoiseCardProps extends React.ComponentProps<
    typeof Card
> {
    noiseOpacity?: number;
    glowColor?: string;
}

const GrainyNoiseCard = React.forwardRef<HTMLDivElement, GrainyNoiseCardProps>(
    (
        {
            className,
            children,
            noiseOpacity = 0.04,
            glowColor = 'var(--color-primary)',
            ...props
        },
        ref,
    ) => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <Card
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    'relative overflow-hidden bg-card/75 p-6 shadow-xl backdrop-blur-md transition-all duration-500',
                    isHovered ? 'scale-[1.01] border-border/80 shadow-2xl' : '',
                    className,
                )}
                {...props}
            >
                {/* SVG Grain/Noise Filter Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay transition-opacity duration-300"
                    style={{
                        opacity: noiseOpacity,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Glowing Soft Backdrop Accent */}
                <div
                    className="pointer-events-none absolute -top-20 -right-20 -z-20 size-48 rounded-full opacity-20 blur-3xl transition-all duration-700"
                    style={{
                        background: glowColor,
                        transform: isHovered
                            ? 'scale(1.3) translate3d(-10px, 10px, 0)'
                            : 'scale(1) translate3d(0, 0, 0)',
                    }}
                />

                <div className="relative text-card-foreground">{children}</div>
            </Card>
        );
    },
);

GrainyNoiseCard.displayName = 'GrainyNoiseCard';

export { GrainyNoiseCard };
export default GrainyNoiseCard;
