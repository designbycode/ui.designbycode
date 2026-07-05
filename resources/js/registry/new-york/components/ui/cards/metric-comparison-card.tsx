'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface MetricComparisonCardProps extends React.ComponentProps<
    typeof Card
> {
    title: string;
    currentValue: string;
    currentLabel?: string;
    comparisonValue: string;
    comparisonLabel?: string;
    ratio: number; // 0 to 1 (e.g. currentValue / comparisonValue)
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
}

const MetricComparisonCard = React.forwardRef<
    HTMLDivElement,
    MetricComparisonCardProps
>(
    (
        {
            className,
            title,
            currentValue,
            currentLabel = 'Current Period',
            comparisonValue,
            comparisonLabel = 'Previous Period',
            ratio,
            trend,
            trendType = 'positive',
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

        const currentPercentage = Math.min(Math.max(ratio * 100, 0), 100);

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
                        <div className="flex items-baseline gap-2">
                            <span className="font-mono text-2xl font-black tracking-tight text-foreground">
                                {currentValue}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                vs {comparisonValue}
                            </span>
                        </div>
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

                {/* Comparative Horizontal Progress Bars */}
                <div className="mt-6 space-y-3">
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                            <span>{currentLabel}</span>
                            <span className="font-mono text-foreground">
                                {currentPercentage.toFixed(0)}%
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/40">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                                style={{
                                    width: isHovered
                                        ? `${currentPercentage}%`
                                        : '0%',
                                    boxShadow: isHovered
                                        ? '0 0 6px var(--color-primary)'
                                        : 'none',
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                            <span>{comparisonLabel}</span>
                            <span className="font-mono text-foreground">
                                100%
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/40">
                            <div
                                className="h-full rounded-full bg-foreground/30 transition-all duration-500 ease-out"
                                style={{
                                    width: isHovered ? '100%' : '0%',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {children && <div className="mt-4 text-xs">{children}</div>}
            </Card>
        );
    },
);

MetricComparisonCard.displayName = 'MetricComparisonCard';

export { MetricComparisonCard };
export default MetricComparisonCard;
