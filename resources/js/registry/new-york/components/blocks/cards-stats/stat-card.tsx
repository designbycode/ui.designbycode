import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string;
    description: string;
    trend?: {
        type: 'up' | 'down';
        value: string;
    };
    icon?: React.ReactNode;
    chartType?: 'area' | 'bar' | 'none';
    chartData?: { value: number }[];
    chartColor?: string;
}

export function StatCard({
    title,
    value,
    description,
    trend,
    icon,
    chartType = 'none',
    chartData = [],
    chartColor = 'var(--color-primary, #6366f1)',
    className,
    ...props
}: StatCardProps) {
    const isUp = trend?.type === 'up';
    const gradientId = React.useId().replace(/:/g, '');

    return (
        <Card
            className={cn(
                'group relative overflow-hidden bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-muted/40 hover:shadow-md',
                className,
            )}
            {...props}
        >
            {/* Hover Glow effect */}
            <div className="pointer-events-none absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                    {title}
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground transition-colors group-hover:text-primary">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold tracking-tight">
                            {value}
                        </span>
                        {trend && (
                            <span
                                className={cn(
                                    'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                                    isUp
                                        ? 'bg-chart-2/10 text-chart-2'
                                        : 'bg-destructive/10 text-destructive',
                                )}
                            >
                                {isUp ? (
                                    <ArrowUpRight className="size-3" />
                                ) : (
                                    <ArrowDownRight className="size-3" />
                                )}
                                {trend.value}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>

                {chartType !== 'none' && chartData.length > 0 && (
                    <div className="-mx-2 mt-4 h-12 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'area' ? (
                                <AreaChart
                                    data={chartData}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id={gradientId}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={chartColor}
                                                stopOpacity={0.4}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={chartColor}
                                                stopOpacity={0.0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={chartColor}
                                        strokeWidth={1.5}
                                        fill={`url(#${gradientId})`}
                                        dot={false}
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <Bar
                                        dataKey="value"
                                        fill={chartColor}
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
