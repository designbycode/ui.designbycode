import React, { useState } from 'react';
import { Play, Pause, Layers, Sliders, Monitor } from 'lucide-react';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function CanvasGallery() {
    const [opacity, setOpacity] = useState([50]);
    const [playWaves, setPlayWaves] = useState(true);
    const [interactivePixel, setInteractivePixel] = useState(true);

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
                    Interactive Canvas Gallery
                </h2>
                <p className="text-xs text-muted-foreground">
                    Compare interactive canvas backgrounds and WebGL visuals
                    with live configuration toggles.
                </p>
            </div>

            {/* Split layout */}
            <div className="grid w-full items-stretch gap-6 md:grid-cols-2">
                {/* 1. WebGL Waves (Three.js) */}
                <Card className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border border-border/40 bg-zinc-950 text-white">
                    {/* Live Waves background */}
                    {playWaves && (
                        <WavesThree
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{ opacity: opacity[0] / 100 }}
                        />
                    )}

                    {/* Glass Control Box */}
                    <div className="relative z-10 flex h-full flex-col justify-between bg-zinc-950/60 p-6 backdrop-blur-xs">
                        <div>
                            <div className="flex items-center justify-between">
                                <Badge
                                    variant="secondary"
                                    className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400"
                                >
                                    WebGL / ThreeJS
                                </Badge>
                                <div
                                    className="cursor-pointer text-zinc-500 transition-colors hover:text-white"
                                    onClick={() => setPlayWaves(!playWaves)}
                                >
                                    {playWaves ? (
                                        <Pause className="size-4" />
                                    ) : (
                                        <Play className="size-4" />
                                    )}
                                </div>
                            </div>
                            <h3 className="mt-4 font-bebas-neue! text-lg font-bold tracking-wide">
                                WebGL Waves Background
                            </h3>
                            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                                A high-performance mathematical point grid
                                oscillating in three-dimensional space. Great
                                for homepage banners and premium section
                                layouts.
                            </p>
                        </div>

                        {/* Control Panel */}
                        <div className="space-y-4 border-t border-zinc-800/50 pt-6">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                                    <span>Wave Opacity</span>
                                    <span>{opacity[0]}%</span>
                                </div>
                                <Slider
                                    value={opacity}
                                    onValueChange={setOpacity}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 2. Interactive Pixel Canvas */}
                <Card className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border border-border/40 bg-zinc-950 text-white">
                    {/* Live Pixel canvas */}
                    <PixelCanvas
                        className={`absolute inset-0 transition-opacity duration-300 ${interactivePixel ? 'opacity-40' : 'pointer-events-none opacity-0'}`}
                    />

                    {/* Glass Control Box */}
                    <div className="relative z-10 flex h-full flex-col justify-between bg-zinc-950/60 p-6 backdrop-blur-xs">
                        <div>
                            <div className="flex items-center justify-between">
                                <Badge
                                    variant="secondary"
                                    className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-400"
                                >
                                    HTML5 Canvas
                                </Badge>
                                <Switch
                                    id="pixel-state"
                                    checked={interactivePixel}
                                    onCheckedChange={setInteractivePixel}
                                    className="data-[state=checked]:bg-purple-500"
                                />
                            </div>
                            <h3 className="mt-4 font-bebas-neue! text-lg font-bold tracking-wide">
                                Interactive Pixel Grid
                            </h3>
                            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                                An HTML5 canvas grid where individual pixels
                                light up, float, and react dynamically to mouse
                                coordinates. Move your mouse across this card to
                                interact.
                            </p>
                        </div>

                        {/* Status readout */}
                        <div className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-900/50 p-3 font-mono text-[10px] text-zinc-400">
                            <span className="flex items-center gap-1.5">
                                <span
                                    className={`size-1.5 rounded-full ${interactivePixel ? 'animate-pulse bg-purple-500' : 'bg-zinc-600'}`}
                                />
                                Status:{' '}
                                {interactivePixel
                                    ? 'Active (Cursor tracking)'
                                    : 'Disabled'}
                            </span>
                            <span>Grid: 16px</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default CanvasGallery;
