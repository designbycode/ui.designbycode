'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ParallaxImageCardProps extends React.ComponentProps<
    typeof Card
> {
    imageUrl: string;
    imageAlt?: string;
    parallaxStrength?: number;
    overlayGradient?: string;
}

const ParallaxImageCard = React.forwardRef<
    HTMLDivElement,
    ParallaxImageCardProps
>(
    (
        {
            className,
            children,
            imageUrl,
            imageAlt = 'Card image',
            parallaxStrength = 15,
            overlayGradient = 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)',
            ...props
        },
        ref,
    ) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLDivElement | null>;
        const [offset, setOffset] = React.useState({ x: 0, y: 0 });

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const card = resolvedRef.current;

            if (!card) {
return;
}

            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate offset between -1 and 1
            const xPercent = (mouseX / rect.width - 0.5) * 2;
            const yPercent = (mouseY / rect.height - 0.5) * 2;

            setOffset({
                x: xPercent * parallaxStrength,
                y: yPercent * parallaxStrength,
            });
        };

        const handleMouseLeave = () => {
            setOffset({ x: 0, y: 0 });
        };

        return (
            <Card
                ref={resolvedRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    'group relative flex aspect-[4/5] w-full flex-col justify-end gap-0 overflow-hidden p-0 shadow-md select-none',
                    className,
                )}
                {...props}
            >
                {/* Parallax Background Image Wrapper */}
                <div
                    className="absolute inset-0 -z-20 scale-110 transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Dark Gradient Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{ background: overlayGradient }}
                />

                {/* Content Overlay */}
                <div className="p-6 text-white transition-transform duration-300 ease-out group-hover:translate-y-[-4px]">
                    {children}
                </div>
            </Card>
        );
    },
);

ParallaxImageCard.displayName = 'ParallaxImageCard';

export { ParallaxImageCard };
export default ParallaxImageCard;
