'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface EventItem {
    time: string;
    title: string;
    details: string;
    color: string;
}

const events: EventItem[] = [
    {
        time: 'Just Now',
        title: 'Version 2.0.4 Released',
        details: 'Added 10 new blocks to the global registry seeder index.',
        color: 'bg-primary',
    },
    {
        time: '10m ago',
        title: 'Database Migration Complete',
        details: 'Successfully seeded 159 component manifest files.',
        color: 'bg-emerald-500',
    },
    {
        time: '2h ago',
        title: 'Theme Variables Injected',
        details: 'CSS global variables synced with theme-slate values.',
        color: 'bg-amber-500',
    },
];

export function ActivityFeed() {
    return (
        <Card className="mx-auto w-full max-w-md border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">
                    Activity Feed
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {events.map((event, idx) => (
                    <div
                        key={idx}
                        className="relative flex items-start gap-3 pl-4 before:absolute before:top-2 before:bottom-0 before:left-1 before:w-[1px] before:bg-border/30 last:before:hidden"
                    >
                        <div
                            className={`size-2.5 rounded-full ${event.color} relative -left-[17px] mt-1 shrink-0 ring-4 ring-background`}
                        />
                        <div className="min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                                <h4 className="truncate text-xs font-bold text-foreground">
                                    {event.title}
                                </h4>
                                <span className="shrink-0 text-[9px] text-muted-foreground">
                                    {event.time}
                                </span>
                            </div>
                            <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                                {event.details}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default ActivityFeed;
