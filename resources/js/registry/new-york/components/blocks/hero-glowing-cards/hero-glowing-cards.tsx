'use client';

import * as React from 'react';
import { Target, Zap, Layout, Shield } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { GlowingCard } from '@/registry/new-york/components/ui/cards/glowing-card';

export function HeroGlowingCards() {
    const cards = [
        {
            icon: Zap,
            title: 'Dynamic Spotlights',
            description:
                'Hover to trace coordinates with smooth radial gradients.',
            color: 'color-mix(in srgb, var(--color-chart-2) 12%, transparent)', // Emerald/teal green glow
        },
        {
            icon: Layout,
            title: 'Grid Assembly',
            description:
                'Compose clean grids using predefined component rules.',
            color: 'color-mix(in srgb, var(--color-chart-3) 12%, transparent)', // Indigo blue glow
        },
        {
            icon: Shield,
            title: 'Isolated Execution',
            description: 'Keep layouts fast, modular, and easy to scale.',
            color: 'color-mix(in srgb, var(--color-chart-1) 12%, transparent)', // Pink glow
        },
    ];

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            {/* Background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.06),rgba(0,0,0,0))]" />

            <div className="relative z-10 mb-12 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Spotlight Technology',
                        icon: Target,
                    }}
                    heading="Build premium glowing features"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="Move your cursor across the cards below. Each card dynamically tracks mouse hover coordinates to render a clean spotlight glow under the text."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-4 flex justify-center">
                    <ButtonPulse>
                        Launch Sandbox
                    </ButtonPulse>
                </div>
            </div>

            {/* Glowing Cards Grid */}
            <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <GlowingCard
                            key={i}
                            glowColor={card.color}
                            className="items-start text-left"
                        >
                            <div className="mb-4 flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                                <Icon className="size-4.5" />
                            </div>
                            <h4 className="mb-2 text-sm font-bold text-foreground">
                                {card.title}
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                {card.description}
                            </p>
                        </GlowingCard>
                    );
                })}
            </div>
        </section>
    );
}

export default HeroGlowingCards;
