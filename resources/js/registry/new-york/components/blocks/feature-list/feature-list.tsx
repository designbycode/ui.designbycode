'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureDoc {
    title: string;
    details: string;
}

const listItems: FeatureDoc[] = [
    { title: 'Dynamic CSS Variables Mapping', details: 'Inject HSL variable values directly to the DOM tree root.' },
    { title: 'Tailwind CSS V4 Containers Support', details: 'Apply container queries to size children items responsively.' },
    { title: 'Interactive WebGL Canvas Shaders', details: 'Render analog post-processed glitch visual assets.' },
];

export function FeatureList() {
    return (
        <Card className="w-full max-w-xl mx-auto border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Capabilities Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
                {listItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                        <div className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3.5" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.details}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default FeatureList;
