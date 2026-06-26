'use client';

import * as React from 'react';
import { Play, Pause, Monitor, Sparkles } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { BrowserMockup } from '@/registry/new-york/components/ui/mockups/browser-mockup';

export function HeroVideoDialog() {
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            <div className="relative z-10 mb-10 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Product Walkthrough',
                        icon: Monitor,
                    }}
                    heading="Watch our 2-minute developer intro"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="See how our design system compiles components down to raw TypeScript, automatically formatting style grids and configuring theme states."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-4 flex justify-center">
                    <ButtonNeon
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2"
                    >
                        {isPlaying ? (
                            <Pause className="size-4" />
                        ) : (
                            <Play className="size-4" />
                        )}
                        {isPlaying ? 'Pause Demo' : 'Play Walkthrough'}
                    </ButtonNeon>
                </div>
            </div>

            {/* Video Dashboard Mock Window */}
            <BrowserMockup
                title="preview-player.mp4"
                className="aspect-video max-w-3xl"
                viewportClassName="flex flex-col justify-between"
            >
                {/* Main area */}
                <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-900/80">
                    {/* Background grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {isPlaying ? (
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <span className="flex size-12 animate-ping items-center justify-center rounded-full bg-chart-2/10 text-chart-2 duration-1000" />
                            <div className="absolute inset-0 flex size-12 items-center justify-center rounded-full bg-chart-2/20 text-chart-2">
                                <Sparkles className="size-5 animate-pulse" />
                            </div>
                            <span className="animate-pulse pt-8 font-mono text-xs tracking-wider text-chart-2/90">
                                SIMULATING VIDEO STREAM...
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group/btn relative z-10 flex size-16 cursor-pointer items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-950/80 text-zinc-100 shadow-2xl transition-all hover:scale-110 hover:border-chart-2 hover:text-chart-2 active:scale-95"
                        >
                            <Play className="ml-1 size-6 transition-transform group-hover/btn:scale-105" />
                        </button>
                    )}
                </div>

                {/* Simulated playbar controls */}
                <div className="flex h-10 shrink-0 items-center justify-between border-t border-zinc-800 bg-zinc-900/60 px-4 font-mono text-[10px] text-zinc-400">
                    <span>{isPlaying ? '0:24' : '0:00'} / 2:00</span>
                    <div className="mx-4 h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
                        <div
                            className="h-full bg-chart-2 transition-all duration-300"
                            style={{ width: isPlaying ? '20%' : '0%' }}
                        />
                    </div>
                    <span>1080p HD</span>
                </div>
            </BrowserMockup>
        </section>
    );
}

export default HeroVideoDialog;
