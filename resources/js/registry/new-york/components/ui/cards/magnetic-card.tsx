'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface MagneticCardProps extends React.ComponentProps<typeof Card> {
    strength?: number;
}

const MagneticCard = React.forwardRef<HTMLDivElement, MagneticCardProps>(
    ({ className, children, strength = 15, ...props }, ref) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLDivElement | null>;
        const [style, setStyle] = React.useState<React.CSSProperties>({});

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const card = resolvedRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            // Normalized translation coordinates
            const x = (mouseX / (rect.width / 2)) * strength;
            const y = (mouseY / (rect.height / 2)) * strength;

            setStyle({
                transform: `translate3d(${x}px, ${y}px, 0)`,
                transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            });
        };

        return (
            <Card
                ref={resolvedRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
                className={cn(
                    'relative overflow-hidden p-6 shadow-md transition-shadow select-none hover:shadow-lg',
                    className,
                )}
                {...props}
            >
                {children}
            </Card>
        );
    },
);

MagneticCard.displayName = 'MagneticCard';

export { MagneticCard };
export default MagneticCard;
