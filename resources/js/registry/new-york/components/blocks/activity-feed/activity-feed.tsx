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
    { time: 'Just Now', title: 'Version 2.0.4 Released', details: 'Added 10 new blocks to the global registry seeder index.', color: 'bg-primary' },
    { time: '10m ago', title: 'Database Migration Complete', details: 'Successfully seeded 159 component manifest files.', color: 'bg-emerald-500' },
    { time: '2h ago', title: 'Theme Variables Injected', details: 'CSS global variables synced with theme-slate values.', color: 'bg-amber-500' },
];

export function ActivityFeed() {
    return (
        <Card className="w-full max-w-md mx-auto border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {events.map((event, idx) => (
                    <div key={idx} className="flex gap-3 items-start relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-0 before:w-[1px] before:bg-border/30 last:before:hidden">
                        <div className={`size-2.5 rounded-full ${event.color} shrink-0 mt-1 relative -left-[17px] ring-4 ring-background`} />
                        <div className="min-w-0">
                            <div className="flex justify-between items-baseline gap-2">
                                <h4 className="text-xs font-bold text-foreground truncate">{event.title}</h4>
                                <span className="text-[9px] text-muted-foreground shrink-0">{event.time}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{event.details}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default ActivityFeed;
