'use client';

import * as React from 'react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { ButtonGradient } from '@/registry/new-york/components/ui/buttons/button-gradient';

export function HeroFullscreenImage() {
    return (
        <section className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/30 px-6 py-20 text-center select-none md:px-12">
            {/* Background Image at z-0 */}
            <img
                src="/hero-bg-premium.jpg"
                alt="Premium Fullscreen Background"
                className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            {/* Soft Gradient Overlay at z-10 to ensure text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

            {/* Typography & Actions Container at z-20 */}
            <div className="relative z-20 flex max-w-3xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Visual Experience',
                        icon: ImageIcon,
                    }}
                    heading="Stand out with fullscreen layouts"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl drop-shadow-sm"
                    description="Capture attention immediately with high-resolution imagery and elegant gradient overlays. Perfectly responsive, auto-scaling to match all modern desktop and mobile device displays."
                    descriptionClassName="text-muted-foreground/90 max-w-2xl drop-shadow-xs"
                    className="flex flex-col items-center"
                />

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <ButtonPulse>Explore Gallery</ButtonPulse>
                    <ButtonGradient className="flex items-center gap-1.5">
                        View Case Study
                        <ArrowRight className="size-4" />
                    </ButtonGradient>
                </div>
            </div>
        </section>
    );
}

export default HeroFullscreenImage;
