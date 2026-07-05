'use client';

import { Mail, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

export function NewsletterBox() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">
                    Subscribe to Newsletter
                </CardTitle>
                <CardDescription className="text-xs">
                    Get the latest registry updates and components direct to
                    your inbox.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
                {submitted ? (
                    <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/10 p-4 text-center">
                        <CheckCircle className="mx-auto size-5 text-primary" />
                        <h4 className="text-xs font-bold text-foreground">
                            Subscription Confirmed!
                        </h4>
                        <p className="text-[10px] text-muted-foreground">
                            Thank you for subscribing. We will keep you updated.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-9 w-full rounded-[var(--radius)] border border-border/60 bg-muted/40 px-3 text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-hidden"
                        />
                        <Button
                            type="submit"
                            size="sm"
                            className="h-9 w-full text-xs font-bold"
                        >
                            Subscribe
                        </Button>
                        <p className="text-center text-[9px] text-muted-foreground/80">
                            We value your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default NewsletterBox;
