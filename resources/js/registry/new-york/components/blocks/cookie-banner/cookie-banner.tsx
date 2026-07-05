'use client';

import { ShieldAlert } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CookieBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
return null;
}

    return (
        <Card className="w-full rounded-[var(--radius)] border-border/50 bg-card/40 p-4 shadow-lg backdrop-blur-xs">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-0 sm:flex-row">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldAlert className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground">
                            We value your privacy
                        </h4>
                        <p className="mt-0.5 max-w-xl text-[10px] leading-normal text-muted-foreground">
                            We use cookies to analyze user traffic, personalize
                            experience, and optimize performance. By clicking
                            "Accept All", you consent to our use of cookies.
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 gap-2">
                    <Button
                        size="sm"
                        onClick={() => setVisible(false)}
                        className="h-8 px-3 text-[10px] font-bold"
                    >
                        Accept All
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setVisible(false)}
                        className="h-8 border-border/60 px-3 text-[10px] font-bold"
                    >
                        Decline
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CookieBanner;
