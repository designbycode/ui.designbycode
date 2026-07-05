'use client';

import { Star, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { ParticlesBackdrop } from '@/registry/new-york/components/ui/animations/particles-backdrop';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';

export function HeroParticles() {
    return (
        <section className="relative flex min-h-[460px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            {/* Static Ambient Mesh Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--color-chart-2)_5%,transparent),transparent)]" />

            {/* Reusable Particles Backdrop */}
            <ParticlesBackdrop count={15} colorClassName="bg-chart-2/30" />

            <div className="relative z-10 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Developer Centric',
                        icon: Star,
                    }}
                    heading="Engineered for rapid UI design"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground"
                    description="Spend less time configuring webpack manifests and CSS utilities, and more time delivering visual assets that impress your clients."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonNeon className="flex items-center gap-2">
                        Get Started
                        <ArrowRight className="size-4" />
                    </ButtonNeon>
                    <ButtonDraw>View Storybook</ButtonDraw>
                </div>
            </div>
        </section>
    );
}

export default HeroParticles;
