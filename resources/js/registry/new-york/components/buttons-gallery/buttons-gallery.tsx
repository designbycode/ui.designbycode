import React from 'react';
import { Play, Sparkles, Move, Sun, Compass } from 'lucide-react';
import { ButtonParticles } from '@/registry/new-york/components/ui/buttons/button-particles';
import { ButtonMagnetic } from '@/registry/new-york/components/ui/buttons/button-magnetic';
import { ButtonShine } from '@/registry/new-york/components/ui/buttons/button-shine';
import GlowConic from '@/registry/new-york/components/ui/glow/glow-conic';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ButtonsGallery() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6">
            <div className="space-y-2">
                <Badge
                    variant="outline"
                    className="bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Component Showcase
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight">
                    Interactive Buttons Gallery
                </h2>
                <p className="text-xs text-muted-foreground">
                    Explore and compare different interactive button styles,
                    micro-animations, and glow effects.
                </p>
            </div>

            <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* 1. Magnetic Button */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Move className="size-4 text-sky-500" />
                            Magnetic Button
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Pulls towards the cursor within active range.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-28 items-center justify-center">
                        <ButtonMagnetic className="h-9 bg-sky-600 px-4.5 text-xs text-white shadow-sky-500/10 hover:bg-sky-500">
                            Magnetic Pull
                        </ButtonMagnetic>
                    </CardContent>
                </Card>

                {/* 2. Shine / Shimmer Button */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Sun className="size-4 text-amber-500" />
                            Shine Button
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Sleek glossy swipe reflecting across surface on
                            hover.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-28 items-center justify-center">
                        <ButtonShine
                            className="h-9 bg-amber-600 px-4.5 text-xs text-white shadow-amber-500/10 hover:bg-amber-500"
                            shineColor="rgba(255,255,255,0.4)"
                        >
                            Glossy Shimmer
                        </ButtonShine>
                    </CardContent>
                </Card>

                {/* 3. Particle Exploding Button */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Sparkles className="size-4 text-purple-500" />
                            Particles Button
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Spawns exploding physics particles on click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-28 items-center justify-center">
                        <ButtonParticles className="h-9 bg-purple-600 px-4.5 text-xs text-white shadow-purple-500/10 hover:bg-purple-500">
                            Explode Particles!
                        </ButtonParticles>
                    </CardContent>
                </Card>

                {/* 4. Conic Glowing Border Button */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Compass className="size-4 text-emerald-500" />
                            Glow Border Button
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Button wrapped in a rotating conic glow mask.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-28 items-center justify-center">
                        <div className="relative h-9 w-36 overflow-hidden rounded-lg bg-zinc-950">
                            <GlowConic
                                style={
                                    {
                                        '--conic-color':
                                            'var(--color-emerald-500, #10b981)',
                                    } as React.CSSProperties
                                }
                            />
                            <button className="absolute inset-px flex cursor-pointer items-center justify-center gap-1.5 rounded-[7px] bg-zinc-900 text-[11px] font-semibold text-emerald-400 transition-colors select-none hover:text-white">
                                <Play className="size-3 fill-emerald-400/20" />
                                Run System
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Magnetic Icon Button */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Move className="size-4 text-pink-500" />
                            Magnetic Icon Variant
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Attracts cursor with subtle rotation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-28 items-center justify-center">
                        <ButtonMagnetic className="flex size-10 items-center justify-center rounded-full bg-pink-600 p-0 text-white shadow-pink-500/10 hover:bg-pink-500">
                            <Compass className="size-4" />
                        </ButtonMagnetic>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ButtonsGallery;
