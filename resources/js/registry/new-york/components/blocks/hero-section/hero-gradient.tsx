'use client';

import * as React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { ButtonGradient } from '@/registry/new-york/components/ui/buttons/button-gradient';

export function HeroGradient() {
    return (
        <section className="relative flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center shadow-2xl select-none md:px-12 lg:px-20">
            {/* Mesh Gradient Backgrounds */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,color-mix(in_srgb,var(--color-chart-3)_12%,transparent),transparent)]" />
            <div className="absolute top-1/2 left-1/2 h-[250px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-chart-2/8 via-chart-3/8 to-chart-1/8 opacity-70 blur-[100px]" />

            <div className="relative z-10 flex max-w-3xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Introducing Antigravity UI',
                        icon: Sparkles,
                    }}
                    heading="Build premium interfaces in a fraction of the time"
                    headingLevel={1}
                    headClassName="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
                    description="Leverage pre-configured typography, unique animated buttons, and responsive layouts to compile responsive designs that wow your users."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <ButtonNeon
                        className="flex items-center gap-2"
                    >
                        Get Started
                        <ArrowRight className="size-4" />
                    </ButtonNeon>
                    <ButtonGradient
                        className="flex items-center gap-2"
                    >
                        <Zap className="size-4 text-primary" />
                        Explore Components
                    </ButtonGradient>
                </div>
            </div>
        </section>
    );
}

export default HeroGradient;
