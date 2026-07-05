'use client';

import * as React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';

export function HeroWaves() {
    return (
        <section className="relative flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center shadow-2xl select-none">
            {/* Interactive 3D Waves background */}
            <div className="absolute inset-0 opacity-70">
                <WavesThree className="absolute inset-0 size-full" />
            </div>

            {/* Backdrop gradient mask */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

            <div className="relative z-10 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'WebGL Accelerated',
                        icon: Sparkles,
                    }}
                    heading="Stunning WebGL 3D backdrops"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground"
                    description="Deliver visually immersive client portals with interactive 3D particle animations. Completely optimized for hardware rendering without dropping frames."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonNeon className="flex items-center gap-2">
                        Get Started
                        <ArrowRight className="size-4" />
                    </ButtonNeon>
                    <ButtonDraw>API Documentation</ButtonDraw>
                </div>
            </div>
        </section>
    );
}

export default HeroWaves;
