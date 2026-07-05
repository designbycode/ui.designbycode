'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CallToActionBox() {
    return (
        <Card className="relative w-full overflow-hidden border-border/50 bg-linear-to-br from-primary/10 via-card/30 to-muted/20 p-8 text-center backdrop-blur-xs">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
            <CardContent className="mx-auto max-w-lg space-y-4 p-0">
                <div className="mx-auto mb-2 flex size-8 animate-pulse items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Sparkles className="size-4" />
                </div>
                <h3 className="text-xl font-black tracking-tight text-foreground md:text-2xl">
                    Ready to build styled components?
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                    Install registry hooks and items instantly in your project.
                    No manual files copy-pasting required.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                    <Button size="sm" className="h-9 px-4 text-xs font-bold">
                        Get Started
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-9 border-border/60 px-4 text-xs font-bold"
                    >
                        View Documentation
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CallToActionBox;
