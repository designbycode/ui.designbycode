'use client';

import * as React from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { InputNumberStepper } from '@/registry/new-york/components/ui/inputs/input-number-stepper';
import { Input } from '@/components/ui/input';

export function HeroWaitlist() {
    const [email, setEmail] = React.useState('');
    const [seats, setSeats] = React.useState<number | undefined>(3);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubmitted(true);
        }
    };

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            {/* Mesh backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.06),rgba(255,255,255,0))]" />

            <div className="relative z-10 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Private Beta Access',
                        icon: Mail,
                    }}
                    heading="Secure your spot for early access"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="We are launching our developer tools suite next month. Request early access for your team to enjoy premium rates and onboarding resources."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                {!isSubmitted ? (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 w-full max-w-md space-y-4 rounded-xl border border-border/40 bg-card/60 p-6 text-left shadow-xl backdrop-blur-xs"
                    >
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground">
                                Work Email
                            </label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 w-full"
                                required
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-4 py-2 sm:flex-row sm:items-center">
                            <div className="space-y-0.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Number of seats requested
                                </label>
                                <p className="text-[10px] text-muted-foreground">
                                    Select how many developer licenses you need.
                                </p>
                            </div>
                            <InputNumberStepper
                                value={seats}
                                onValueChange={setSeats}
                                min={1}
                                max={20}
                                variant="split"
                            />
                        </div>

                        <ButtonNeon
                            type="submit"
                            className="mt-2 h-10 w-full font-bold"
                        >
                            Request Invite ({seats} licenses)
                        </ButtonNeon>
                    </form>
                ) : (
                    <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center shadow-xl">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckCircle2 className="size-6 animate-bounce" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-foreground">
                                You're on the list!
                            </h4>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                                We sent a confirmation code to{' '}
                                <span className="font-mono font-bold text-primary">
                                    {email}
                                </span>
                                . We've reserved {seats} seats for you.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setEmail('');
                            }}
                            className="cursor-pointer text-xs font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                        >
                            Submit another email
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default HeroWaitlist;
