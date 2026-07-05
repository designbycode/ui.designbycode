'use client';

import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import * as React from 'react';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';

export function HeroSplit() {
    return (
        <section className="relative flex w-full flex-col gap-10 overflow-hidden rounded-2xl border border-border/30 bg-background/40 p-8 shadow-xl select-none lg:flex-row lg:items-center lg:p-12">
            {/* Left Content Column */}
            <div className="relative z-10 flex-1 space-y-6 text-left">
                <HeadingBlock
                    badge={{
                        text: 'Security & Integrity Verified',
                        icon: Shield,
                    }}
                    heading="Secure operations with zero downtime"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="Protect your workspace and client data with next-generation authorization mechanisms, end-to-end logging, and audit tracks."
                    descriptionClassName="text-muted-foreground"
                    size="sm"
                />

                <ul className="space-y-2.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4.5 shrink-0 text-chart-2" />
                        <span>Biometric & Passkey authentication methods</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4.5 shrink-0 text-chart-2" />
                        <span>Real-time anomalous action detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4.5 shrink-0 text-chart-2" />
                        <span>99.99% high-availability cluster setups</span>
                    </li>
                </ul>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                    <ButtonPulse>Setup Shield</ButtonPulse>
                    <ButtonDraw>Read Whitepaper</ButtonDraw>
                </div>
            </div>

            {/* Right Visual Interactive Column */}
            <div className="relative min-h-[300px] w-full flex-1 overflow-hidden rounded-xl border border-border/40 bg-card/70 shadow-2xl">
                <PixelCanvas className="absolute inset-0 opacity-40" />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                    <Sparkles className="mb-2 size-10 animate-pulse text-chart-2" />
                    <h3 className="font-bebas-neue! text-xl font-bold tracking-wider text-foreground">
                        Interactive Pixel Matrix
                    </h3>
                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                        Move your mouse across the grid to interact with the
                        responsive visual canvas.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HeroSplit;
