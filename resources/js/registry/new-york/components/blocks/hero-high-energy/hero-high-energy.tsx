'use client';

import React, { useState } from 'react';
import { Sparkles, Zap, Sliders, Layers, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import Wrapper from '@/registry/new-york/components/ui/misc/wrapper';

const HIGHLIGHT_IMAGES = [
    {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        tag: 'STREET CYBERNETICS',
        desc: 'RAW PORTRAIT OVERLAYS // CHROMATIC ABERRATION ACTIVE',
    },
    {
        url: 'https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?auto=format&fit=crop&w=800&q=80',
        tag: 'BRUTAL ARCHITECTURE',
        desc: 'MONOLITH STRUCTURES // SOLID SHADOW EXTRUSIONS',
    },
    {
        url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
        tag: 'KINETIC NEON LINES',
        desc: 'HIGH-FREQUENCY LASERS // FLUID CONICAL GLOW',
    },
];

export function HeroHighEnergyImpact() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rgbOffset, setRgbOffset] = useState(4);
    const [noiseFilter, setNoiseFilter] = useState(true);
    const [aspectStretch, setAspectStretch] = useState(false);

    return (
        <section className="relative w-full overflow-hidden rounded-2xl border border-border/30 bg-background py-16 select-none lg:py-24">
            {/* Dynamic Grid Background Accent */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-15" />

            {/* Decorative Neon Header Ribbons */}
            <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-chart-4 via-chart-1 to-chart-3 opacity-60" />

            <Wrapper className="relative z-10">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    {/* Left Block: Ultra-dense Typography and Interactive Controller */}
                    <div className="space-y-8 text-left lg:col-span-7">
                        <div className="inline-flex items-center gap-2 rounded border border-chart-4/30 bg-chart-4/10 px-3 py-1 font-mono text-xs tracking-widest text-chart-4 uppercase">
                            <Sparkles className="h-3 w-3 animate-pulse" />
                            <span>
                                HIGH IMPACT V2 // HIGH RESOLUTION SPECTRUM
                            </span>
                        </div>

                        {/* Massive Bebas Neue Title */}
                        <div className="space-y-1">
                            <h1
                                className="text-6xl leading-[0.85] font-black tracking-tighter text-foreground uppercase sm:text-8xl lg:text-9xl"
                                style={{
                                    fontFamily:
                                        "var(--font-bebas-neue, 'Bebas Neue', sans-serif)",
                                }}
                            >
                                BREAK <br />
                                <span className="bg-gradient-to-r from-chart-4 via-chart-1 to-chart-3 bg-clip-text text-transparent">
                                    THE STANDARD
                                </span>{' '}
                                <br />
                                ENGINE.
                            </h1>
                        </div>

                        <p className="max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
                            We engineer hyper-optimized digital products. No
                            templates, no generic gradients, and absolutely no
                            compromises. Control your screen spectrum layout
                            directly below.
                        </p>

                        {/* Live Visual Controls Panel */}
                        <div className="space-y-4 border border-l-4 border-border/40 border-chart-4 bg-card/90 p-5 shadow-xl">
                            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-chart-4 uppercase">
                                <Sliders className="h-4 w-4" />
                                <span>SPECTRUM CONTROL HUB</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-3">
                                {/* Control 1 */}
                                <div className="space-y-1">
                                    <span className="block text-[10px] text-muted-foreground/75">
                                        RGB SKEW
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="12"
                                            value={rgbOffset}
                                            onChange={(e) =>
                                                setRgbOffset(
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-chart-4"
                                        />
                                        <span className="w-6 text-right text-[10px] font-bold text-chart-4">
                                            {rgbOffset}px
                                        </span>
                                    </div>
                                </div>

                                {/* Control 2 */}
                                <div className="space-y-1">
                                    <span className="block text-[10px] text-muted-foreground/75">
                                        STATIC NOISE
                                    </span>
                                    <button
                                        onClick={() =>
                                            setNoiseFilter(!noiseFilter)
                                        }
                                        className={`w-full cursor-pointer rounded border py-1.5 text-[10px] font-bold transition-all ${
                                            noiseFilter
                                                ? 'border-chart-4 bg-chart-4/10 text-chart-4'
                                                : 'border-border bg-transparent text-muted-foreground/60'
                                        }`}
                                    >
                                        {noiseFilter ? 'ACTIVE' : 'BYPASS'}
                                    </button>
                                </div>

                                {/* Control 3 */}
                                <div className="space-y-1">
                                    <span className="block text-[10px] text-muted-foreground/75">
                                        STRETCH ASPECT
                                    </span>
                                    <button
                                        onClick={() =>
                                            setAspectStretch(!aspectStretch)
                                        }
                                        className={`w-full cursor-pointer rounded border py-1.5 text-[10px] font-bold transition-all ${
                                            aspectStretch
                                                ? 'border-chart-4 bg-chart-4/10 text-chart-4'
                                                : 'border-border bg-transparent text-muted-foreground/60'
                                        }`}
                                    >
                                        {aspectStretch ? 'STRETCH' : 'NORMAL'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Direct Multi-Choice Custom Interactive Slider buttons */}
                        <div className="space-y-3 pt-2">
                            <span className="block font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                [ SELECT RAW VISUAL CHANNELS ]
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {HIGHLIGHT_IMAGES.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`cursor-pointer border px-4 py-2 font-mono text-xs tracking-tight uppercase transition-all ${
                                            activeIndex === i
                                                ? 'border-foreground bg-foreground text-background shadow-[4px_4px_0_0_var(--color-chart-4)]'
                                                : 'border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground'
                                        }`}
                                    >
                                        0{i + 1} // {img.tag.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Powerful Action buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="cursor-pointer bg-chart-4 px-8 py-3.5 font-mono text-sm font-black text-primary-foreground uppercase shadow-[4px_4px_0px_0px_var(--color-foreground)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                                LAUNCH SPECTRUM ENGINE
                            </button>
                            <button className="cursor-pointer border-2 border-border bg-transparent px-6 py-3.5 font-mono text-sm text-foreground transition-all hover:border-border/80 hover:bg-muted/30">
                                GET THE COMPILER
                            </button>
                        </div>
                    </div>

                    {/* Right Block: Dynamic Distorted Halftone Style Interactive Image Box */}
                    <div className="relative lg:col-span-5">
                        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-4">
                            {/* Halftone / scan dots overlay */}
                            {noiseFilter && (
                                <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:8px_8px] opacity-40" />
                            )}

                            {/* Distorted Image container using state controls */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/40 bg-background">
                                {/* Simulated RGB Skew offset shadow layers */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen grayscale"
                                    style={{
                                        backgroundImage: `url('${HIGHLIGHT_IMAGES[activeIndex].url}')`,
                                        transform: `translate(${-rgbOffset}px, ${rgbOffset / 2}px) ${
                                            aspectStretch
                                                ? 'scaleY(1.15)'
                                                : 'scale(1)'
                                        }`,
                                        transition:
                                            'transform 0.15s ease-out, background-image 0.3s ease',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 bg-cover bg-center text-chart-3 opacity-60 mix-blend-screen"
                                    style={{
                                        backgroundImage: `url('${HIGHLIGHT_IMAGES[activeIndex].url}')`,
                                        transform: `translate(${rgbOffset}px, ${-rgbOffset / 2}px) ${
                                            aspectStretch
                                                ? 'scaleY(1.15)'
                                                : 'scale(1)'
                                        }`,
                                        filter: 'hue-rotate(180deg)',
                                        transition:
                                            'transform 0.15s ease-out, background-image 0.3s ease',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-70"
                                    style={{
                                        backgroundImage: `url('${HIGHLIGHT_IMAGES[activeIndex].url}')`,
                                        transform: aspectStretch
                                            ? 'scaleY(1.15)'
                                            : 'scale(1)',
                                        transition:
                                            'transform 0.15s ease-out, background-image 0.3s ease',
                                    }}
                                />

                                {/* Left tags inside image box */}
                                <div className="absolute top-3 left-3 z-30 border border-border/40 bg-card/90 px-2 py-1 font-mono text-[9px] tracking-widest text-chart-4 uppercase">
                                    {HIGHLIGHT_IMAGES[activeIndex].tag}
                                </div>

                                {/* Floating Aspect indicator */}
                                <div className="absolute right-3 bottom-3 z-30 flex items-center gap-1.5 rounded border border-border/40 bg-card/90 px-3 py-1.5 font-mono text-[9px] text-muted-foreground">
                                    <Layers className="h-3.5 w-3.5 text-chart-4" />
                                    <span>MATRIX v.902 // ACC ACTIVE</span>
                                </div>
                            </div>

                            {/* Image Description and Stats under the preview */}
                            <div className="mt-4 space-y-2 border-t border-border/40 pt-4 text-left font-mono">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                        TAG
                                    </span>
                                    <span className="font-bold text-foreground uppercase">
                                        {HIGHLIGHT_IMAGES[activeIndex].tag}
                                    </span>
                                </div>

                                <p className="rounded border border-border/20 bg-muted/30 p-2 text-[10px] leading-relaxed text-muted-foreground">
                                    {HIGHLIGHT_IMAGES[activeIndex].desc}
                                </p>

                                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>RESOLVED URL</span>
                                    <span className="max-w-[180px] truncate text-muted-foreground/80">
                                        {HIGHLIGHT_IMAGES[
                                            activeIndex
                                        ].url.substring(0, 40)}
                                        ...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
}

export default HeroHighEnergyImpact;
