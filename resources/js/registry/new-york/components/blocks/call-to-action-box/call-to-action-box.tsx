'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CallToActionBox() {
    return (
        <Card className="w-full border-border/50 bg-linear-to-br from-primary/10 via-card/30 to-muted/20 backdrop-blur-xs relative overflow-hidden p-8 text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <CardContent className="p-0 space-y-4 max-w-lg mx-auto">
                <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <Sparkles className="size-4" />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                    Ready to build styled components?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Install registry hooks and items instantly in your project. No manual files copy-pasting required.
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                    <Button size="sm" className="h-9 px-4 text-xs font-bold">
                        Get Started
                    </Button>
                    <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-bold border-border/60">
                        View Documentation
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CallToActionBox;
