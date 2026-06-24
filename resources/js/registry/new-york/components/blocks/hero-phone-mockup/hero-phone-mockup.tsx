'use client';

import * as React from 'react';
import { Smartphone, Zap, Sparkles } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonSpecial } from '@/registry/new-york/components/ui/buttons/button-special';
import { PhoneMockup } from '@/registry/new-york/components/ui/mockups/phone-mockup';

export function HeroPhoneMockup() {
    return (
        <section className="relative flex w-full flex-col gap-8 overflow-hidden rounded-2xl border border-border/30 bg-background/50 p-8 select-none lg:flex-row lg:items-center lg:p-12">
            <div className="flex-1 space-y-6 text-left">
                <HeadingBlock
                    badge={{
                        text: 'Mobile Experience Ready',
                        icon: Smartphone,
                    }}
                    heading="Stunning interfaces on every screen size"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="Responsive layouts that scale flawlessly from extra wide displays down to mobile touchscreens. Native gestures, touch states, and hardware acceleration built in."
                    descriptionClassName="text-muted-foreground"
                    size="sm"
                />

                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <ButtonSpecial
                        specialVariant="neon"
                        className="flex items-center gap-2"
                    >
                        <Zap className="size-4" />
                        Download App
                    </ButtonSpecial>
                    <ButtonSpecial specialVariant="draw">
                        View Demo
                    </ButtonSpecial>
                </div>
            </div>

            {/* Right mock smartphone */}
            <div className="flex flex-1 items-center justify-center py-6">
                <PhoneMockup screenClassName="justify-between">
                    <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                            <span className="size-1.5 animate-pulse rounded-full bg-chart-2" />
                            <span>LTE</span>
                        </div>
                    </div>

                    {/* App Dashboard UI Simulator */}
                    <div className="flex flex-1 flex-col justify-center space-y-3">
                        <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-chart-2/20 text-chart-2">
                            <Sparkles className="size-5" />
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm font-bold text-zinc-100">
                                Antigravity Hub
                            </h4>
                            <p className="mt-0.5 text-[10px] text-zinc-400">
                                Control panel active
                            </p>
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="bg-zinc-850/80 flex items-center justify-between rounded-lg border border-zinc-800 p-2.5 text-[10px] text-zinc-300">
                                <span>Server Load</span>
                                <span className="font-mono font-bold text-chart-2">
                                    24%
                                </span>
                            </div>
                            <div className="bg-zinc-850/80 flex items-center justify-between rounded-lg border border-zinc-800 p-2.5 text-[10px] text-zinc-300">
                                <span>Active Users</span>
                                <span className="font-mono font-bold text-chart-2">
                                    1,842
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive mini button */}
                    <button className="w-full cursor-pointer rounded-lg bg-chart-2 py-2 text-xs font-bold text-primary-foreground transition-colors select-none hover:bg-chart-2/80 active:scale-95">
                        Quick Connect
                    </button>
                </PhoneMockup>
            </div>
        </section>
    );
}

export default HeroPhoneMockup;
