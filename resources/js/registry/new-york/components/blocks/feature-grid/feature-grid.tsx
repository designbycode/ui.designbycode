import React from 'react';
import {
    Zap,
    Shield,
    Sparkles,
    RefreshCw,
    BarChart2,
    Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface FeatureItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    color: string;
}

const features: FeatureItem[] = [
    {
        title: 'Lightning Performance',
        description:
            'Sub-millisecond query execution speeds via edge-cached memory nodes scattered globally.',
        icon: <Zap className="size-5" />,
        badge: 'New',
        color: 'from-chart-4 to-chart-5',
    },
    {
        title: 'Bank-Grade Cryptography',
        description:
            'Complete end-to-end data encryption in transit and at rest with isolated keys managed by KMS.',
        icon: <Shield className="size-5" />,
        color: 'from-chart-3 to-chart-1',
    },
    {
        title: 'Predictive Insights',
        description:
            'Leverage embedded local modeling agents that automatically predict anomalies before they impact you.',
        icon: <Sparkles className="size-5" />,
        badge: 'AI Powered',
        color: 'from-chart-1 to-chart-5',
    },
    {
        title: 'Real-time Synchrony',
        description:
            'Bidirectional sync mechanism ensuring your state is consistently distributed across devices instantly.',
        icon: <RefreshCw className="size-5" />,
        color: 'from-chart-2 to-chart-3',
    },
    {
        title: 'Deep Telemetry',
        description:
            'Granular log indexing and monitoring charts revealing queries, load distribution, and memory profiles.',
        icon: <BarChart2 className="size-5" />,
        color: 'from-chart-5 to-destructive',
    },
    {
        title: 'Infinite Scalability',
        description:
            'Modular microservice layer that expands dynamically when request throughput crosses user thresholds.',
        icon: <Layers className="size-5" />,
        badge: 'Core',
        color: 'from-chart-3 to-primary',
    },
];

export function FeatureGrid() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-6 border-b border-border/20 pb-8 md:flex-row md:items-end">
                <div className="max-w-lg space-y-3">
                    <Badge
                        variant="outline"
                        className="bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                    >
                        Platform Features
                    </Badge>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Engineered for Infinite Scale
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        A robust, developer-first suite of tools built on
                        cutting-edge systems, giving you the building blocks to
                        scale to millions of users.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <Card
                        key={idx}
                        className="group relative flex flex-col justify-between overflow-hidden border-border/40 bg-card/25 backdrop-blur-xs transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                    >
                        {/* Dynamic backdrop linear glow matching the category theme */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-primary/3 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <CardHeader className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div
                                    className={cn(
                                        'flex size-10 items-center justify-center rounded-xl bg-linear-to-tr text-white shadow-md',
                                        feature.color,
                                    )}
                                >
                                    {feature.icon}
                                </div>
                                {feature.badge && (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full border border-primary/10 px-2 py-0.5 text-[10px] font-bold"
                                    >
                                        {feature.badge}
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-base font-bold transition-colors group-hover:text-primary">
                                {feature.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <CardDescription className="text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-muted-foreground/90">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default FeatureGrid;
