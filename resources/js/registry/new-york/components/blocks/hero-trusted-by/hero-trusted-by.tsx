'use client';

import { Award, Globe, Heart, Sparkles, Terminal } from 'lucide-react';
import * as React from 'react';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { LogoCloud } from '@/registry/new-york/components/ui/misc/logo-cloud';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';

export function HeroTrustedBy() {
    const brands = [
        { icon: Globe, name: 'Stripe' },
        { icon: Heart, name: 'Vercel' },
        { icon: Award, name: 'Github' },
        { icon: Terminal, name: 'Supabase' },
    ];

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            <div className="relative z-10 mb-12 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Enterprise Grade',
                        icon: Award,
                    }}
                    heading="Trusted by leading software teams worldwide"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="From early stage startups to global enterprises, our codebase helps teams ship structured design languages, fast APIs, and responsive React SPAs."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <ButtonNeon>Book a Demo</ButtonNeon>
                    <ButtonDraw>Contact Sales</ButtonDraw>
                </div>
            </div>

            {/* Logo Cloud Social Proof Strip */}
            <LogoCloud title="POWERING TEAMS AT" items={brands} />
        </section>
    );
}

export default HeroTrustedBy;
