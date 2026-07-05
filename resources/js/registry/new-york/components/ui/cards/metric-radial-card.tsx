'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface RadialMetricItem {
    label: string;
    value: string;
    percentage: number; // 0 to 100
    color: string; // CSS color string or variable
}

export interface MetricRadialCardProps extends React.ComponentProps<
    typeof Card
> {
    title: string;
    value: string;
    items: RadialMetricItem[]; // Exactly 3 items recommended
}

const MetricRadialCard = React.forwardRef<
    HTMLDivElement,
    MetricRadialCardProps
>(({ className, title, value, items = [], children, ...props }, ref) => {
    const { isHovered, hoverRef } = useHover();

    const combinedRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            hoverRef(node);

            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                    node;
            }
        },
        [ref, hoverRef],
    );

    // Nested rings configuration
    const svgSize = 120;
    const center = svgSize / 2;

    // Setup ring geometries with varying radii
    const ringConfigs = [
        { radius: 44, strokeWidth: 8 },
        { radius: 32, strokeWidth: 8 },
        { radius: 20, strokeWidth: 8 },
    ];

    return (
        <Card
            ref={combinedRef}
            className={cn(
                '@container relative overflow-hidden p-6 shadow-md transition-all hover:shadow-lg',
                className,
            )}
            {...props}
        >
            <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {title}
                </span>
                <div className="font-mono text-2xl font-black tracking-tight text-foreground">
                    {value}
                </div>
            </div>

            {/* Responsive container layout splitting into side-by-side at container-width >= 380px */}
            <div className="mt-6 flex flex-col items-center gap-6 @sm:flex-row @sm:items-center @sm:justify-between">
                {/* SVG Nested Rings */}
                <div className="relative flex size-32 shrink-0 items-center justify-center select-none">
                    <svg
                        width={svgSize}
                        height={svgSize}
                        className="-rotate-90"
                    >
                        {items.slice(0, 3).map((item, idx) => {
                            const config = ringConfigs[idx] || ringConfigs[0];
                            const circumference = 2 * Math.PI * config.radius;
                            const fillOffset =
                                circumference -
                                (Math.min(Math.max(item.percentage, 0), 100) /
                                    100) *
                                    circumference;

                            return (
                                <g key={idx}>
                                    {/* Background Track */}
                                    <circle
                                        cx={center}
                                        cy={center}
                                        r={config.radius}
                                        fill="transparent"
                                        stroke="var(--color-muted)"
                                        strokeWidth={config.strokeWidth}
                                        className="opacity-20"
                                    />
                                    {/* Active Progress Ring */}
                                    <circle
                                        cx={center}
                                        cy={center}
                                        r={config.radius}
                                        fill="transparent"
                                        stroke={item.color}
                                        strokeWidth={config.strokeWidth}
                                        strokeDasharray={circumference}
                                        strokeDashoffset={
                                            isHovered
                                                ? fillOffset - 4
                                                : fillOffset
                                        }
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                        style={{
                                            filter: isHovered
                                                ? `drop-shadow(0 0 2.5px ${item.color})`
                                                : 'none',
                                        }}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Breakdown labels grid */}
                <div className="w-full space-y-3.5">
                    {items.slice(0, 3).map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between gap-3 text-xs"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className="size-2 shrink-0 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="truncate font-semibold text-muted-foreground">
                                    {item.label}
                                </span>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5 font-mono">
                                <span className="font-bold text-foreground">
                                    {item.value}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    ({Math.round(item.percentage)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {children && <div className="mt-4 text-xs">{children}</div>}
        </Card>
    );
});

MetricRadialCard.displayName = 'MetricRadialCard';

export { MetricRadialCard };
export default MetricRadialCard;
