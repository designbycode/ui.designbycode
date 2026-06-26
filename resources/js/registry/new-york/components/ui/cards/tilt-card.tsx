'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface TiltCardProps extends React.ComponentProps<typeof Card> {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    glareOpacity?: number;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
    (
        {
            className,
            children,
            maxTilt = 15,
            perspective = 1000,
            scale = 1.02,
            glareOpacity = 0.15,
            ...props
        },
        ref,
    ) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLDivElement | null>;
        const [style, setStyle] = React.useState<React.CSSProperties>({});
        const [glareStyle, setGlareStyle] = React.useState<React.CSSProperties>(
            { opacity: 0 },
        );

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const card = resolvedRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            const mouseX = e.clientX - rect.left - width / 2;
            const mouseY = e.clientY - rect.top - height / 2;

            const rotateX = ((-mouseY / (height / 2)) * maxTilt).toFixed(2);
            const rotateY = ((mouseX / (width / 2)) * maxTilt).toFixed(2);

            setStyle({
                transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
                transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
            });

            // Calculate position for glare
            const glareX = ((e.clientX - rect.left) / width) * 100;
            const glareY = ((e.clientY - rect.top) / height) * 100;

            setGlareStyle({
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}), transparent 60%)`,
                opacity: 1,
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            });
            setGlareStyle({
                opacity: 0,
                transition: 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            });
        };

        return (
            <Card
                ref={resolvedRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
                className={cn(
                    'relative overflow-hidden bg-card/60 p-6 backdrop-blur-xs select-none',
                    className,
                )}
                {...props}
            >
                {/* Glare effect layer */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 transition-opacity"
                    style={glareStyle}
                />
                {children}
            </Card>
        );
    },
);

TiltCard.displayName = 'TiltCard';

export { TiltCard };
export default TiltCard;
