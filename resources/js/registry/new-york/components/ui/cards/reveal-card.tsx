'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
    borderColor?: string;
    borderWidth?: number;
    spotlightRadius?: number;
}

const RevealCard = React.forwardRef<HTMLDivElement, RevealCardProps>(
    (
        {
            className,
            children,
            borderColor = 'color-mix(in srgb, var(--color-primary) 35%, transparent)',
            borderWidth = 1,
            spotlightRadius = 150,
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
            const card = resolvedRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            setCoords({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        return (
            <div
                ref={resolvedRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    'relative overflow-hidden rounded-xl bg-muted/40 p-[1px] transition-all',
                    className,
                )}
                {...props}
            >
                {/* Border spotlight overlay */}
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(${spotlightRadius}px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 80%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Card body */}
                <div className="relative flex h-full w-full flex-col rounded-[11px] bg-card/90 p-6 text-card-foreground backdrop-blur-xs">
                    {children}
                </div>
            </div>
        );
    },
);

RevealCard.displayName = 'RevealCard';

export { RevealCard };
export default RevealCard;
