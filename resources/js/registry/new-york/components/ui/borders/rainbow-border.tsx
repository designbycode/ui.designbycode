'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const colorMap: Record<string, string> = {
    slate: '#64748b',
    gray: '#6b7280',
    zinc: '#71717a',
    stone: '#78716c',
    red: '#ef4444',
    orange: '#f97316',
    amber: '#f59e0b',
    yellow: '#eab308',
    lime: '#84cc16',
    green: '#22c55e',
    emerald: '#10b981',
    teal: '#14b8a6',
    cyan: '#06b6d4',
    sky: '#0ea5e9',
    blue: '#3b82f6',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    purple: '#a855f7',
    fuchsia: '#d946ef',
    pink: '#ec4899',
    rose: '#f43f5e',
};

export const roundedMap: Record<string, string> = {
    none: 'rounded-none',
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
};

export interface RainbowBorderProps {
    borderWidth?: string;
    animationDuration?: string;
    colors?: string[];
    rounded?: keyof typeof roundedMap;
    glow?: boolean;
    glowBlur?: string;
    glowOpacity?: number;
    className?: string;
    children: React.ReactNode;
}

function RainbowBorder({
    borderWidth = '2px',
    animationDuration = '3s',
    colors,
    rounded = 'md',
    glow = true,
    glowBlur = `30px`,
    glowOpacity = 50,
    className,
    children,
}: RainbowBorderProps) {
    const defaultColors = [
        'var(--rainbow-1)',
        'var(--rainbow-2)',
        'var(--rainbow-3)',
        'var(--rainbow-4)',
        'var(--rainbow-5)',
        'var(--rainbow-6)',
        'var(--rainbow-7)',
    ];

    const gradientColors = React.useMemo(() => {
        const userColors = colors && colors.length > 0 ? colors : defaultColors;
        const resolvedColors = userColors.map((color) => {
            const lowerColor = color.toLowerCase();

            if (color.startsWith('#')) {
                return color;
            }

            return colorMap[lowerColor] || color;
        });

        return resolvedColors.join(', ');
    }, [colors]);

    const roundedClass = roundedMap[rounded] || 'rounded-md';

    return (
        <div className={cn(`group relative isolate inline-flex`, className)}>
            {/* Inject keyframes and variables if not globally defined */}
            <style>{`
                @keyframes rainbow-scroll {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                :root {
                    --rainbow-1: #ef4444;
                    --rainbow-2: #f97316;
                    --rainbow-3: #f59e0b;
                    --rainbow-4: #10b981;
                    --rainbow-5: #3b82f6;
                    --rainbow-6: #6366f1;
                    --rainbow-7: #a855f7;
                }
            `}</style>
            
            <div
                aria-hidden="true"
                className={cn(
                    `pointer-events-none absolute inset-0 z-10 bg-repeat-x transition-opacity duration-300`,
                    roundedClass,
                )}
                style={{
                    background: `linear-gradient(90deg, ${gradientColors})`,
                    backgroundSize: '200% 100%',
                    animation: `rainbow-scroll ${animationDuration} linear infinite`,
                    opacity: glow ? glowOpacity / 100 : 0,
                    filter: `blur(${glowBlur})`,
                }}
            />
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute blur-lg inset-0 z-20 bg-repeat-x',
                    roundedClass,
                )}
                style={{
                    background: `repeating-linear-gradient(90deg, ${gradientColors})`,
                    backgroundSize: '200% 100%',
                    animation: `rainbow-scroll ${animationDuration} linear infinite`,
                    padding: borderWidth,
                    WebkitMask:
                        'repeating-linear-gradient(#fff 0 0) content-box, repeating-linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            {children}
            <div
                className="absolute inset-x-5 -bottom-1 block h-1 rounded-full blur-sm"
                style={{
                    background: `repeating-linear-gradient(90deg, ${gradientColors})`,
                    backgroundSize: '200% 100%',
                    animation: `rainbow-scroll ${animationDuration} linear infinite`,
                }}
            />
        </div>
    );
}

RainbowBorder.displayName = 'RainbowBorder';

export { RainbowBorder };
export default RainbowBorder;
