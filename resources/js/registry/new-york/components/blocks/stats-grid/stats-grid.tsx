'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
    value: string;
    label: string;
    description: string;
}

const stats: StatItem[] = [
    { value: '99.99%', label: 'System Uptime', description: 'Guaranteed by SLA' },
    { value: '150M+', label: 'Monthly Queries', description: 'Processed globally' },
    { value: '10k+', label: 'Active Devs', description: 'Building workspaces' },
    { value: '24/7', label: 'Support SLA', description: 'Always online' },
];

export function StatsGrid() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="border-border/50 bg-card/30 backdrop-blur-xs text-center p-4">
                        <CardContent className="p-0">
                            <div className="text-2xl md:text-3xl font-black tracking-tight text-primary font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold text-foreground mt-1">
                                {stat.label}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
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
