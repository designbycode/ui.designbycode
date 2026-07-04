'use client';

import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <Card className="w-full border-border/50 bg-card/40 backdrop-blur-xs p-4 shadow-lg rounded-[var(--radius)]">
            <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldAlert className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground">We value your privacy</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal max-w-xl">
                            We use cookies to analyze user traffic, personalize experience, and optimize performance. By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button size="sm" onClick={() => setVisible(false)} className="h-8 text-[10px] font-bold px-3">
                        Accept All
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setVisible(false)} className="h-8 text-[10px] font-bold px-3 border-border/60">
                        Decline
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CookieBanner;
