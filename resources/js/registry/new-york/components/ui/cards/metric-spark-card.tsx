'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface MetricSparkCardProps extends React.ComponentProps<
    typeof Card
> {
    title: string;
    value: string;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    dataPoints?: number[];
}

const MetricSparkCard = React.forwardRef<HTMLDivElement, MetricSparkCardProps>(
    (
        {
            className,
            title,
            value,
            trend,
            trendType = 'positive',
            dataPoints = [10, 22, 18, 35, 30, 45, 40, 55],
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
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
            },
            [ref, hoverRef]
        );

        // SVG Sparkline path generation
        const svgWidth = 140;
        const svgHeight = 40;
        const maxVal = Math.max(...dataPoints);
        const minVal = Math.min(...dataPoints);
        const range = maxVal - minVal || 1;

        const points = dataPoints
            .map((val, idx) => {
                const x = (idx / (dataPoints.length - 1)) * svgWidth;
                const y =
                    svgHeight - 4 - ((val - minVal) / range) * (svgHeight - 8);
                return `${x},${y}`;
            })
            .join(' ');

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
                        <div className="font-mono text-2xl font-black tracking-tight">
                            {value}
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

                <div className="mt-6 flex items-center justify-between gap-4">
                    {/* Glowing Sparkline visualization */}
                    <div className="relative">
                        <svg
                            width={svgWidth}
                            height={svgHeight}
                            className="overflow-visible"
                        >
                            <polyline
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={points}
                                className="transition-all duration-500 ease-out"
                                style={{
                                    strokeDasharray: isHovered ? '0' : '300',
                                    strokeDashoffset: isHovered ? '0' : '10',
                                    filter: isHovered
                                        ? 'drop-shadow(0 0 4px var(--color-primary))'
                                        : 'none',
                                }}
                            />
                        </svg>
                    </div>

                    {children && <div className="text-xs">{children}</div>}
                </div>
            </Card>
        );
    },
);

MetricSparkCard.displayName = 'MetricSparkCard';

export { MetricSparkCard };
export default MetricSparkCard;
