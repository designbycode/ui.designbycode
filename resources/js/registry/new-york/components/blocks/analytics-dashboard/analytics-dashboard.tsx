'use client';
import React, { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip as ChartTooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from 'recharts';
import {
    Users,
    MousePointerClick,
    RefreshCw,
    Calendar,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Activity,
    Globe,
    Search as SearchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock trend history
const trendData = [
    { name: 'Jan', visits: 4000, pageviews: 2400 },
    { name: 'Feb', visits: 3000, pageviews: 1398 },
    { name: 'Mar', visits: 2000, pageviews: 9800 },
    { name: 'Apr', visits: 2780, pageviews: 3908 },
    { name: 'May', visits: 1890, pageviews: 4800 },
    { name: 'Jun', visits: 2390, pageviews: 3800 },
    { name: 'Jul', visits: 3490, pageviews: 4300 },
    { name: 'Aug', visits: 4200, pageviews: 5400 },
    { name: 'Sep', visits: 3900, pageviews: 4900 },
    { name: 'Oct', visits: 4500, pageviews: 5900 },
    { name: 'Nov', visits: 4800, pageviews: 6500 },
    { name: 'Dec', visits: 5400, pageviews: 7200 },
];

// Mock traffic sources
const sourceData = [
    {
        name: 'Organic Search',
        value: 4300,
        color: 'var(--color-chart-3)',
    },
    { name: 'Direct', value: 2900, color: 'var(--color-chart-2)' },
    { name: 'Social', value: 2100, color: 'var(--color-chart-1)' },
    {
        name: 'Referrals',
        value: 1400,
        color: 'var(--color-chart-4)',
    },
];

// Mock conversions list
const initialConversions = [
    {
        id: '1',
        user: 'Alex Morgan',
        email: 'alex@example.com',
        amount: '$120.00',
        status: 'Success',
        time: '2 mins ago',
    },
    {
        id: '2',
        user: 'Sarah Chen',
        email: 'sarah.c@example.com',
        amount: '$350.00',
        status: 'Success',
        time: '10 mins ago',
    },
    {
        id: '3',
        user: 'Michael Scott',
        email: 'm.scott@example.com',
        amount: '$49.00',
        status: 'Success',
        time: '22 mins ago',
    },
    {
        id: '4',
        user: 'Emma Watson',
        email: 'emma@example.com',
        amount: '$899.00',
        status: 'Success',
        time: '45 mins ago',
    },
];

export function AnalyticsDashboard() {
    const [isMounted, setIsMounted] = useState(false);
    const [conversions, setConversions] = useState(initialConversions);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            // Add a mock random new conversion to top
            const names = [
                'John Doe',
                'Linda Carter',
                'Devon Lane',
                'Bessie Cooper',
            ];
            const emails = [
                'john@example.com',
                'linda@example.com',
                'devon@example.com',
                'bessie@example.com',
            ];
            const amounts = ['$59.00', '$199.00', '$29.00', '$450.00'];

            const randomIndex = Math.floor(Math.random() * names.length);

            const newConv = {
                id: Date.now().toString(),
                user: names[randomIndex],
                email: emails[randomIndex],
                amount: amounts[randomIndex],
                status: 'Success',
                time: 'Just now',
            };

            setConversions((prev) => [newConv, ...prev.slice(0, 3)]);
            setIsRefreshing(false);
        }, 800);
    };

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
            {/* Header Control row */}
            <div className="flex flex-col justify-between gap-4 border-b border-border/20 pb-6 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Analytics Overview
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Real-time engagement telemetry dashboard
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex h-8.5 items-center gap-1.5 text-xs"
                    >
                        <Calendar className="size-3.5" />
                        Last 12 Months
                    </Button>
                    <Button
                        size="sm"
                        variant="default"
                        className="flex h-8.5 items-center gap-1.5 text-xs"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw
                            className={cn(
                                'size-3.5',
                                isRefreshing && 'animate-spin',
                            )}
                        />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid w-full gap-4 sm:grid-cols-3">
                <Card className="flex flex-row items-center gap-4 border border-border/40 bg-card/30 p-4.5 backdrop-blur-xs">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-3/10 text-chart-3">
                        <Users className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Total Visitors
                        </span>
                        <div className="mt-0.5 flex items-baseline gap-2">
                            <span className="font-mono text-xl font-bold">
                                148,290
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-chart-2">
                                <TrendingUp className="size-3" /> +12.4%
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-row items-center gap-4 border border-border/40 bg-card/30 p-4.5 backdrop-blur-xs">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2">
                        <MousePointerClick className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Conversion Rate
                        </span>
                        <div className="mt-0.5 flex items-baseline gap-2">
                            <span className="font-mono text-xl font-bold">
                                3.48%
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-chart-2">
                                <TrendingUp className="size-3" /> +4.2%
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-row items-center gap-4 border border-border/40 bg-card/30 p-4.5 backdrop-blur-xs">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                        <Activity className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Bounce Rate
                        </span>
                        <div className="mt-0.5 flex items-baseline gap-2">
                            <span className="font-mono text-xl font-bold">
                                42.15%
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-destructive">
                                <TrendingDown className="size-3" /> -1.8%
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Performance Main Chart Card */}
            <Card className="border border-border/40 bg-card/30 backdrop-blur-xs">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                        <Globe className="size-4 text-muted-foreground" />
                        Engagement History
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Comparison trends between raw visitors traffic and
                        engaged pageviews.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-64 pt-2">
                    {isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={trendData}
                                margin={{
                                    top: 0,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorVisits"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-primary, #6366f1)"
                                            stopOpacity={0.25}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-primary, #6366f1)"
                                            stopOpacity={0.0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorViews"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-chart-2)"
                                            stopOpacity={0.2}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-chart-2)"
                                            stopOpacity={0.0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="var(--color-border, #e2e8f0)"
                                />
                                <XAxis
                                    dataKey="name"
                                    stroke="var(--color-muted-foreground, #64748b)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="var(--color-muted-foreground, #64748b)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    contentStyle={{
                                        background:
                                            'var(--color-popover, #ffffff)',
                                        borderColor:
                                            'var(--color-border, #e2e8f0)',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pageviews"
                                    stroke="var(--color-chart-2)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                    name="Pageviews"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="var(--color-primary, #6366f1)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    name="Unique Visitors"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-muted/20 font-mono text-xs text-muted-foreground">
                            Loading chart telemetry...
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Split Bottom Section */}
            <div className="grid w-full items-stretch gap-6 md:grid-cols-2">
                {/* Real-time Transactions Feed */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/30 backdrop-blur-xs">
                    <div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <SearchIcon className="size-4 text-muted-foreground" />
                                Real-time conversions
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Live view of active user acquisitions and signup
                                events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {conversions.map((conv) => (
                                <div
                                    key={conv.id}
                                    className="flex items-center justify-between border-b border-border/20 py-1 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                            {conv.user
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </div>
                                        <div className="flex min-w-0 flex-col gap-0.5">
                                            <span className="truncate text-xs font-semibold">
                                                {conv.user}
                                            </span>
                                            <span className="truncate text-[10px] text-muted-foreground">
                                                {conv.email}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono text-xs font-bold text-primary">
                                            {conv.amount}
                                        </span>
                                        <span className="block font-mono text-[9px] text-muted-foreground">
                                            {conv.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </div>
                </Card>

                {/* Traffic Channels breakdown */}
                <Card className="border border-border/40 bg-card/30 backdrop-blur-xs">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Activity className="size-4 text-muted-foreground" />
                            Acquisition Channels
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Distribution of incoming visitor sessions grouped by
                            source.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-56">
                        {isMounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={sourceData}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="var(--color-border, #e2e8f0)"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="var(--color-muted-foreground, #64748b)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="var(--color-muted-foreground, #64748b)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[4, 4, 0, 0]}
                                        fill="var(--color-primary, #6366f1)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-muted/20 font-mono text-xs text-muted-foreground">
                                Loading acquisition channels...
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
