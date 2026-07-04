'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <Card className="w-full max-w-md mx-auto border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="text-center pb-2">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                    <Mail className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">Subscribe to Newsletter</CardTitle>
                <CardDescription className="text-xs">
                    Get the latest registry updates and components direct to your inbox.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
                {submitted ? (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center space-y-2">
                        <CheckCircle className="size-5 text-primary mx-auto" />
                        <h4 className="text-xs font-bold text-foreground">Subscription Confirmed!</h4>
                        <p className="text-[10px] text-muted-foreground">Thank you for subscribing. We will keep you updated.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input 
                            type="email" 
                            required
                            placeholder="Enter your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-9 px-3 rounded-[var(--radius)] text-xs bg-muted/40 border border-border/60 text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                        />
                        <Button type="submit" size="sm" className="w-full h-9 text-xs font-bold">
                            Subscribe
                        </Button>
                        <p className="text-[9px] text-muted-foreground/80 text-center">
                            We value your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default NewsletterBox;
