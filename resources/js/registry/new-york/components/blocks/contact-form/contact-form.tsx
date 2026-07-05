'use client';

import { Send, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Card className="mx-auto w-full max-w-md border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">
                    Send a Message
                </CardTitle>
                <CardDescription className="text-xs">
                    We will get back to you within 24 hours.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                {submitted ? (
                    <div className="space-y-2 rounded-lg border border-chart-2/20 bg-chart-2/10 p-6 text-center">
                        <CheckCircle2 className="mx-auto size-6 text-chart-2" />
                        <h4 className="text-xs font-bold text-foreground">
                            Message Sent!
                        </h4>
                        <p className="text-[10px] text-muted-foreground">
                            Thank you. Your message has been received.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="space-y-3.5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="h-8 w-full rounded-[var(--radius)] border border-border/60 bg-muted/40 px-2 text-xs text-foreground"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="h-8 w-full rounded-[var(--radius)] border border-border/60 bg-muted/40 px-2 text-xs text-foreground"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-muted-foreground uppercase">
                                Message
                            </label>
                            <textarea
                                rows={3}
                                required
                                className="w-full rounded-[var(--radius)] border border-border/60 bg-muted/40 p-2 text-xs text-foreground"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            className="h-8 w-full gap-1.5 text-xs font-bold"
                        >
                            <Send className="size-3" />
                            Send Message
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default ContactForm;
