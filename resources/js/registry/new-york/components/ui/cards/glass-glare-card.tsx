'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface GlassGlareCardProps extends React.ComponentProps<typeof Card> {
    glareColor?: string;
    opacity?: number;
}

const GlassGlareCard = React.forwardRef<HTMLDivElement, GlassGlareCardProps>(
    (
        {
            className,
            children,
            glareColor = 'rgba(255, 255, 255, 0.15)',
            opacity = 0.2,
            ...props
        },
        ref,
    ) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const { isHovered, hoverRef } = useHover();
        const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });

        const combinedRef = React.useCallback(
            (node: HTMLDivElement | null) => {
                hoverRef(node);
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (
                        ref as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
                }
                (
                    localRef as React.MutableRefObject<HTMLDivElement | null>
                ).current = node;
            },
            [ref, hoverRef],
        );

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const card = localRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setGlarePos({ x, y });
        };

        return (
            <Card
                ref={combinedRef}
                onMouseMove={handleMouseMove}
                className={cn(
                    'relative overflow-hidden bg-card/40 p-6 shadow-2xl backdrop-blur-md transition-all duration-300',
                    className,
                )}
                {...props}
            >
                {/* Dynamic Glare Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, transparent 50%)`,
                        opacity: isHovered ? opacity : 0,
                    }}
                />

                {/* Linear Shine overlay */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(${135 + (glarePos.x - 50) / 2}deg, transparent 40%, rgba(255, 255, 255, 0.08) 50%, transparent 60%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                <div className="relative z-10 text-foreground">{children}</div>
            </Card>
        );
    },
);

GlassGlareCard.displayName = 'GlassGlareCard';

export { GlassGlareCard };
export default GlassGlareCard;
