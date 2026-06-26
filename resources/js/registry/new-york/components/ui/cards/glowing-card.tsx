'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface GlowingCardProps extends React.ComponentProps<typeof Card> {
    glowColor?: string;
}

const GlowingCard = React.forwardRef<HTMLDivElement, GlowingCardProps>(
    (
        {
            className,
            children,
            glowColor = 'color-mix(in srgb, var(--color-chart-2) 15%, transparent)',
            ...props
        },
        ref,
    ) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLDivElement | null>;
        const [coords, setCoords] = React.useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = React.useState(false);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!resolvedRef.current) return;
            const rect = resolvedRef.current.getBoundingClientRect();
            setCoords({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        return (
            <Card
                ref={resolvedRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    'relative overflow-hidden bg-card/60 p-6 backdrop-blur-xs transition-all',
                    className,
                )}
                {...props}
            >
                {/* Mouse-tracking Radial Spotlight */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />
                {children}
            </Card>
        );
    },
);

GlowingCard.displayName = 'GlowingCard';

export { GlowingCard };
export default GlowingCard;
