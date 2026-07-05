'use client';

import * as React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';

export function HeroMinimalCentered() {
    return (
        <section className="relative flex min-h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            {/* Subtle glow effect */}
            <div className="pointer-events-none absolute top-0 left-1/2 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

            <div className="relative z-10 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Next Generation SaaS',
                        icon: Sparkles,
                    }}
                    heading="Ship your project at lightspeed"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground"
                    description="The modern way to build Web apps. Clean folder structures, preconfigured layouts, responsive sidebars, and customizable theme settings."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonPulse>Start Deploying</ButtonPulse>
                    <ButtonDraw className="flex items-center gap-1.5">
                        Learn More
                        <ArrowRight className="size-4" />
                    </ButtonDraw>
                </div>
            </div>
        </section>
    );
}

export default HeroMinimalCentered;
