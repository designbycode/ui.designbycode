'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
    value: string;
    label: string;
    description: string;
}

const stats: StatItem[] = [
    {
        value: '99.99%',
        label: 'System Uptime',
        description: 'Guaranteed by SLA',
    },
    {
        value: '150M+',
        label: 'Monthly Queries',
        description: 'Processed globally',
    },
    { value: '10k+', label: 'Active Devs', description: 'Building workspaces' },
    { value: '24/7', label: 'Support SLA', description: 'Always online' },
];

export function StatsGrid() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="border-border/50 bg-card/30 p-4 text-center backdrop-blur-xs"
                    >
                        <CardContent className="p-0">
                            <div className="font-mono text-2xl font-black tracking-tight text-primary md:text-3xl">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-xs font-bold text-foreground">
                                {stat.label}
                            </div>
                            <div className="mt-0.5 text-[10px] text-muted-foreground">
                                {stat.description}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default StatsGrid;
