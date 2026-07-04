'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Card className="w-full max-w-md mx-auto border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Send a Message</CardTitle>
                <CardDescription className="text-xs">
                    We will get back to you within 24 hours.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                {submitted ? (
                    <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                        <CheckCircle2 className="size-6 text-emerald-500 mx-auto" />
                        <h4 className="text-xs font-bold text-foreground">Message Sent!</h4>
                        <p className="text-[10px] text-muted-foreground">Thank you. Your message has been received.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="space-y-3.5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase">Name</label>
                                <input type="text" required className="w-full h-8 px-2 rounded-[var(--radius)] text-xs bg-muted/40 border border-border/60 text-foreground" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase">Email</label>
                                <input type="email" required className="w-full h-8 px-2 rounded-[var(--radius)] text-xs bg-muted/40 border border-border/60 text-foreground" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-muted-foreground uppercase">Message</label>
                            <textarea rows={3} required className="w-full p-2 rounded-[var(--radius)] text-xs bg-muted/40 border border-border/60 text-foreground" />
                        </div>
                        <Button type="submit" size="sm" className="w-full h-8 text-xs font-bold gap-1.5">
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
