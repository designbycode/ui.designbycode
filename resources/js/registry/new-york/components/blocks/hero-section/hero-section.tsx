import { ArrowRight, Sparkles, Shield, Trophy, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ButtonMagnetic } from '@/registry/new-york/components/ui/buttons/button-magnetic';
import { ButtonShine } from '@/registry/new-york/components/ui/buttons/button-shine';
import { ProgressCircle } from '@/registry/new-york/components/ui/progress/progress-circle';
import { InteractiveRating } from '@/registry/new-york/components/ui/rating/interactive-rating';

export function HeroSection() {
    const [userRating, setUserRating] = useState(5);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleRatingChange = (newRating: number) => {
        setUserRating(newRating);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 2000);
    };

    return (
        <section className="relative flex w-full flex-col items-center gap-12 overflow-hidden rounded-2xl border border-border/30 bg-background/50 p-6 shadow-xl select-none md:p-12 lg:flex-row lg:p-16">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 -bottom-40 size-96 rounded-full bg-chart-2/10 blur-3xl" />

            {/* Left Content Column */}
            <div className="relative z-10 flex-1 space-y-6 text-left">
                <Badge
                    variant="outline"
                    className="flex w-fit animate-pulse items-center gap-1.5 border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-bold tracking-wider text-primary uppercase"
                >
                    <Sparkles className="size-3.5" />
                    Premium Experience
                </Badge>

                <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                    Luxury Stays &{' '}
                    <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                        Creative Spaces
                    </span>
                </h1>

                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Discover and reserve hand-crafted spaces tailored for
                    inspiration, collaboration, and relaxation. Immerse yourself
                    in environments designed with state-of-the-art aesthetics
                    and premium comforts.
                </p>

                {/* Star rating interaction widget */}
                <div className="flex max-w-md flex-col gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-foreground">
                            Rate your interest:
                        </span>
                        <div className="flex items-center gap-2">
                            <InteractiveRating
                                defaultRating={5}
                                onChange={handleRatingChange}
                            />
                            <span className="font-mono text-xs font-bold text-muted-foreground">
                                ({userRating}.0)
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center sm:border-l sm:border-border/40 sm:pl-4">
                        <span className="text-[10px] leading-normal text-muted-foreground">
                            {submitSuccess ? (
                                <span className="animate-bounce font-bold text-chart-2">
                                    Review recorded!
                                </span>
                            ) : (
                                'Interact to send a preview rating to our dashboard.'
                            )}
                        </span>
                    </div>
                </div>

                {/* Call-to-action buttons using magnetic and shine effects */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <ButtonShine className="flex items-center gap-1.5 rounded-xl px-6 py-5 text-sm font-semibold shadow-md">
                        Book Your Stay
                        <ArrowRight className="size-4" />
                    </ButtonShine>

                    <ButtonMagnetic className="rounded-xl border border-border/40 bg-secondary px-6 py-5 text-sm font-semibold text-secondary-foreground hover:bg-muted/80">
                        Explore Gallery
                    </ButtonMagnetic>
                </div>
            </div>

            {/* Right Interactive Mockup/Dashboard Column */}
            <div className="relative z-10 w-full max-w-md flex-1">
                <Card className="relative overflow-hidden border border-border/40 bg-card/25 p-6 shadow-2xl backdrop-blur-md">
                    <div className="absolute top-3 right-3 opacity-30">
                        <Sparkles className="size-6 text-primary" />
                    </div>

                    <h3 className="mb-4 flex items-center gap-2 border-b border-border/20 pb-3 text-sm font-bold tracking-tight">
                        <Trophy className="size-4.5 text-primary" />
                        Guesthouse Status Core
                    </h3>

                    {/* Score Circle Progress Layout */}
                    <div className="mb-6 grid grid-cols-2 place-items-center gap-6">
                        <ProgressCircle
                            value={98}
                            size={100}
                            strokeWidth={10}
                            label="Cleanliness"
                        />
                        <ProgressCircle
                            value={94}
                            size={100}
                            strokeWidth={10}
                            label="Guest Rating"
                        />
                    </div>

                    {/* Stats List Items */}
                    <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-t border-border/10 pt-3 text-xs">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <Users className="size-4 text-chart-3" />
                                Host communication
                            </span>
                            <span className="font-mono font-bold">
                                100% (Flawless)
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-border/10 pt-3 text-xs">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <Shield className="size-4 text-chart-2" />
                                Security score
                            </span>
                            <span className="font-mono font-bold">
                                99.8% (Verified)
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Sub-card floating decorative info badge */}
                <div className="pointer-events-none absolute -bottom-6 -left-6 flex hidden max-w-[180px] animate-bounce items-center gap-3 rounded-xl border border-primary/20 bg-primary p-3 text-primary-foreground shadow-lg select-none sm:flex">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 font-mono text-xs font-black">
                        9.9
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] leading-none font-bold tracking-wider uppercase">
                            Superb Score
                        </span>
                        <span className="mt-0.5 text-[8px] opacity-80">
                            Guest Favorite Choice
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
