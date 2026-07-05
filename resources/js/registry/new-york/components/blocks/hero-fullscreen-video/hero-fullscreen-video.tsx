'use client';

import * as React from 'react';
import { Video as VideoIcon, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';

export function HeroFullscreenVideo() {
    return (
        <section className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/30 px-6 py-20 text-center select-none md:px-12">
            {/* Fullscreen Looping Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            >
                <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-glow-37299-large.mp4"
                    type="video/mp4"
                />
            </video>
            {/* Theme-Adaptive Backdrop Mask to ensure text contrast */}
            <div className="absolute inset-0 z-10 bg-background/85 backdrop-blur-[2px]" />

            {/* Centered Content Container */}
            <div className="relative z-20 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Motion Experience',
                        icon: VideoIcon,
                    }}
                    heading="Engage visitors with ambient motion"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="Subtle background loops add a dynamic sense of depth to your SaaS landing pages. High-contrast typography and polished micro-animations keep readability perfect without distracting your users."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <ButtonPulse>Launch Demo</ButtonPulse>
                    <ButtonDraw className="flex items-center gap-1.5">
                        View Whitepaper
                        <ArrowRight className="size-4" />
                    </ButtonDraw>
                </div>
            </div>
        </section>
    );
}

export default HeroFullscreenVideo;
