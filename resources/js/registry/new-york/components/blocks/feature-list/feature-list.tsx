'use client';

import { Check } from 'lucide-react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureDoc {
    title: string;
    details: string;
}

const listItems: FeatureDoc[] = [
    {
        title: 'Dynamic CSS Variables Mapping',
        details: 'Inject HSL variable values directly to the DOM tree root.',
    },
    {
        title: 'Tailwind CSS V4 Containers Support',
        details: 'Apply container queries to size children items responsively.',
    },
    {
        title: 'Interactive WebGL Canvas Shaders',
        details: 'Render analog post-processed glitch visual assets.',
    },
];

export function FeatureList() {
    return (
        <Card className="mx-auto w-full max-w-xl border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">
                    Capabilities Checklist
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
                {listItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-3.5" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-xs font-bold text-foreground">
                                {item.title}
                            </h4>
                            <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                                {item.details}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default FeatureList;
