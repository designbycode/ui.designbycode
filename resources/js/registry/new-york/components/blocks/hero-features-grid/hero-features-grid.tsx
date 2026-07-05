'use client';

import * as React from 'react';
import { Layers, Activity, Terminal, Shield, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonGradient } from '@/registry/new-york/components/ui/buttons/button-gradient';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';

export function HeroFeaturesGrid() {
    const features = [
        {
            icon: Terminal,
            title: 'CLI Scaffolding',
            description:
                'Generate production-ready controllers, model seeders, and React components with one Artisan command.',
        },
        {
            icon: Shield,
            title: 'Fortified Security',
            description:
                'First-party support for two-factor authentication, email confirmation, and session security policies.',
        },
        {
            icon: Activity,
            title: 'Performance Track',
            description:
                'Under-the-hood optimization for lightning-fast loads, prefetching, and state synchronization.',
        },
    ];

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            <div className="relative z-10 mb-12 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Integrated Ecosystem',
                        icon: Layers,
                    }}
                    heading="Engineered for high performance applications"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="A complete toolkit designed by developers, for developers. Clean architectures and styling conventions that speed up feature delivery."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonGradient>Get Started</ButtonGradient>
                    <ButtonDraw className="flex items-center gap-1.5">
                        Read System Docs
                        <ArrowRight className="size-4" />
                    </ButtonDraw>
                </div>
            </div>

            {/* Bottom 3-Column Features Grid */}
            <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
                {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={i}
                            className="group flex flex-col items-start rounded-xl border border-border/40 bg-card/60 p-6 text-left backdrop-blur-xs transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg"
                        >
                            <div className="mb-4 flex size-9 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Icon className="size-4.5" />
                            </div>
                            <h4 className="mb-2 text-sm font-bold text-foreground">
                                {feature.title}
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default HeroFeaturesGrid;
