'use client';

import * as React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonSpecial } from '@/registry/new-york/components/ui/buttons/button-special';
import GlowConic from '@/registry/new-york/components/ui/glow/glow-conic';

export function HeroConicGlow() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            <div className="relative z-10 mb-12 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Visual Edge',
                        icon: Layers,
                    }}
                    heading="Stand out with conic border animations"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground"
                    description="Grab attention immediately with dynamic gradient lighting. Clean hardware-accelerated CSS animations make the border glow run perfectly smooth."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonSpecial specialVariant="pulse">
                        Get Started
                    </ButtonSpecial>
                    <ButtonSpecial
                        specialVariant="gradient-border"
                        className="flex items-center gap-1.5"
                    >
                        Documentation
                        <ArrowRight className="size-4" />
                    </ButtonSpecial>
                </div>
            </div>

            {/* Glowing Conic Border Dashboard Frame */}
            <div className="relative h-48 w-full max-w-2xl overflow-hidden rounded-xl border border-border/40 bg-muted">
                <GlowConic
                    style={
                        {
                            '--conic-color': 'var(--color-primary, #10b981)',
                        } as React.CSSProperties
                    }
                />
                {/* Internal card details */}
                <div className="absolute inset-px flex flex-col items-center justify-center rounded-[11px] bg-card p-6 text-center">
                    <h3 className="mb-2 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
                        Analytics Engine Online
                    </h3>
                    <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        12,842 requests / min
                    </p>
                    <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <span className="size-1.5 animate-pulse rounded-full bg-chart-2" />
                            API Status: 99.98%
                        </span>
                        <span>•</span>
                        <span>Ping: 12ms</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroConicGlow;
