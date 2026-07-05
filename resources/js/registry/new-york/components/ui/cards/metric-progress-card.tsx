'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface MetricProgressCardProps extends React.ComponentProps<
    typeof Card
> {
    title: string;
    value: string;
    progress: number; // 0 to 100
    targetLabel?: string;
    targetValue?: string;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    accentColor?: string; // CSS color string or custom variable
}

const MetricProgressCard = React.forwardRef<
    HTMLDivElement,
    MetricProgressCardProps
>(
    (
        {
            className,
            title,
            value,
            progress,
            targetLabel = 'Target',
            targetValue,
            trend,
            trendType = 'positive',
            accentColor = 'var(--color-primary)',
            children,
            ...props
        },
        ref,
    ) => {
        const { isHovered, hoverRef } = useHover();

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
            },
            [ref, hoverRef],
        );

        // Circular SVG configuration
        const radius = 24;
        const circumference = 2 * Math.PI * radius;
        const fillOffset =
            circumference -
            (Math.min(Math.max(progress, 0), 100) / 100) * circumference;

        return (
            <Card
                ref={combinedRef}
                className={cn(
                    'relative overflow-hidden p-6 shadow-md transition-all hover:shadow-lg',
                    className,
                )}
                {...props}
            >
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {title}
                        </span>
                        <div className="font-mono text-2xl font-black tracking-tight text-foreground">
                            {value}
                        </div>
                    </div>

                    <div className="relative flex size-14 items-center justify-center select-none">
                        <svg className="size-full -rotate-90">
                            {/* Track Circle */}
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                fill="transparent"
                                stroke="var(--color-muted)"
                                strokeWidth="4.5"
                                className="opacity-40"
                            />
                            {/* Animated Active Circle */}
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                fill="transparent"
                                stroke={accentColor}
                                strokeWidth="4.5"
                                strokeDasharray={circumference}
                                strokeDashoffset={
                                    isHovered ? fillOffset - 5 : fillOffset
                                }
                                strokeLinecap="round"
                                className="transition-all duration-700 ease-out"
                                style={{
                                    filter: isHovered
                                        ? `drop-shadow(0 0 3px ${accentColor})`
                                        : 'none',
                                }}
                            />
                        </svg>
                        <span className="absolute font-mono text-[10px] font-extrabold text-foreground">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                            {targetLabel}
                        </span>
                        {targetValue && (
                            <div className="font-mono text-xs font-bold text-foreground">
                                {targetValue}
                            </div>
                        )}
                    </div>

                    {trend && (
                        <span
                            className={cn(
                                'rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide',
                                trendType === 'positive' &&
                                    'border border-primary/20 bg-primary/10 text-primary',
                                trendType === 'negative' &&
                                    'border border-destructive/20 bg-destructive/10 text-destructive',
                                trendType === 'neutral' &&
                                    'bg-muted text-muted-foreground',
                            )}
                        >
                            {trend}
                        </span>
                    )}
                </div>

                {children && <div className="mt-4 text-xs">{children}</div>}
            </Card>
        );
    },
);

MetricProgressCard.displayName = 'MetricProgressCard';

export { MetricProgressCard };
export default MetricProgressCard;
