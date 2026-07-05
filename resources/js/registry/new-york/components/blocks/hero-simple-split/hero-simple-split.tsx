'use client';

import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function HeroSimpleSplit() {
    return (
        <div className="w-full py-8">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                {/* Left text options */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary uppercase">
                        <Sparkles className="size-3" />
                        Next-Gen Registry Blocks
                    </div>
                    <h2 className="text-2xl leading-tight font-black tracking-tight text-foreground md:text-3xl">
                        Modular Building Blocks for Developer Interfaces
                    </h2>
                    <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
                        Drop high-quality visual widgets, charts, and form
                        layouts into your code structure seamlessly using custom
                        shadcn directives.
                    </p>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold"
                        >
                            <Terminal className="size-3.5" />
                            Explore Components
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-9 border-border/60 px-4 text-xs font-bold"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right mockup card */}
                <Card className="relative overflow-hidden border-border/50 bg-card/40 p-6 backdrop-blur-xs">
                    <div className="flex size-full flex-col gap-3">
                        <div className="flex items-center gap-1.5 border-b border-border/30 pb-3">
                            <div className="size-2.5 rounded-full bg-red-500/80" />
                            <div className="size-2.5 rounded-full bg-yellow-500/80" />
                            <div className="size-2.5 rounded-full bg-emerald-500/80" />
                            <span className="ml-2 font-mono text-[9px] text-muted-foreground">
                                sandbox-editor.tsx
                            </span>
                        </div>
                        <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                            <p>
                                <span className="text-primary">import</span>{' '}
                                &#123; Button &#125;{' '}
                                <span className="text-primary">from</span>{' '}
                                <span className="text-emerald-500">
                                    "@/components/ui/button"
                                </span>
                                ;
                            </p>
                            <p className="opacity-70">
                                <span className="text-primary">
                                    export default function
                                </span>{' '}
                                <span className="text-blue-500">Page</span>()
                                &#123;
                            </p>
                            <p className="pl-4 opacity-70">
                                <span className="text-primary">return</span> (
                            </p>
                            <p className="pl-8 text-primary">
                                &lt;Button&gt;
                                <span className="text-foreground">
                                    Click Me
                                </span>
                                &lt;/Button&gt;
                            </p>
                            <p className="pl-4 opacity-70">);</p>
                            <p className="opacity-70">&#125;</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default HeroSimpleSplit;
