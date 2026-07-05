'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface BreakdownItem {
    label: string;
    value: string;
    percentage: number;
    color?: string; // Optional custom bar color
}

export interface MetricBreakdownCardProps extends React.ComponentProps<
    typeof Card
> {
    title: string;
    value: string;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    items: BreakdownItem[];
}

const MetricBreakdownCard = React.forwardRef<
    HTMLDivElement,
    MetricBreakdownCardProps
>(
    (
        {
            className,
            title,
            value,
            trend,
            trendType = 'positive',
            items = [],
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

        return (
            <Card
                ref={combinedRef}
                className={cn(
                    '@container relative overflow-hidden p-6 shadow-md transition-all hover:shadow-lg',
                    className,
                )}
                {...props}
            >
                {/* Responsive header layout using container queries */}
                <div className="flex flex-col gap-2 @sm:flex-row @sm:items-start @sm:justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {title}
                        </span>
                        <div className="font-mono text-2xl font-black tracking-tight text-foreground">
                            {value}
                        </div>
                    </div>

                    {trend && (
                        <span
                            className={cn(
                                'self-start rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide @sm:self-auto',
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

                {/* Sub-metrics section adapting layout dynamically based on container size */}
                <div className="mt-6 border-t border-border/50 pt-4">
                    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="space-y-2 rounded-lg border border-border/30 bg-muted/10 p-3"
                            >
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-muted-foreground">
                                        {item.label}
                                    </span>
                                    <span className="font-mono font-bold text-foreground">
                                        {item.value}
                                    </span>
                                </div>

                                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                                    <div
                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                        style={{
                                            width: isHovered
                                                ? `${item.percentage}%`
                                                : '0%',
                                            backgroundColor:
                                                item.color ||
                                                'var(--color-primary)',
                                            boxShadow:
                                                isHovered && !item.color
                                                    ? '0 0 4px var(--color-primary)'
                                                    : 'none',
                                        }}
                                    />
                                </div>

                                <div className="text-right font-mono text-[9px] text-muted-foreground">
                                    {item.percentage}% of total
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {children && <div className="mt-4 text-xs">{children}</div>}
            </Card>
        );
    },
);

MetricBreakdownCard.displayName = 'MetricBreakdownCard';

export { MetricBreakdownCard };
export default MetricBreakdownCard;
