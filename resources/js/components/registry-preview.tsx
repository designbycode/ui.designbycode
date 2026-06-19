import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Import all registry components
import { MusicPlayer } from '@/registry/new-york/components/music-player/music-player';
import GSAPMarquee from '@/registry/new-york/components/ui/animations/gsap-marquee';
import Marquee from '@/registry/new-york/components/ui/animations/marquee';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import { ButtonParticles } from '@/registry/new-york/components/ui/buttons/button-particles';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import { BackLight } from '@/registry/new-york/components/ui/glow/back-light';
import GlowConic from '@/registry/new-york/components/ui/glow/glow-conic';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';
import { GlowStack } from '@/registry/new-york/components/ui/glow/glow-stack';
import { InputSlug } from '@/registry/new-york/components/ui/inputs/input-slug';
import { MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectContent, MultiSelectItem } from '@/registry/new-york/components/ui/inputs/multi-select';
import { AnimatedTabs } from '@/registry/new-york/components/ui/tabs/animated-tabs';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';

// Import hooks for interactive demo
import useDarkMode from '@/registry/new-york/hooks/use-dark-mode';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export default function RegistryPreview({ name }: { name: string }) {
    // 1. Music Player
    if (name === 'music-player') {
        return (
            <div className="w-full max-w-4xl mx-auto rounded-xl border border-border/50 bg-card p-6 shadow-lg">
                <MusicPlayer />
            </div>
        );
    }

    // 2. GSAP Marquee
    if (name === 'gsap-marquee') {
        return (
            <div className="w-full py-8 border border-border/50 rounded-xl bg-card overflow-hidden">
                <GSAPMarquee duration={15}>
                    <span className="mx-8 text-3xl font-extrabold tracking-wider text-foreground/80 uppercase font-bebas-neue!">
                        DesignByCode • Interactive • GSAP Driven • Smooth Performance •
                    </span>
                </GSAPMarquee>
            </div>
        );
    }

    // 3. Marquee
    if (name === 'marquee') {
        return (
            <div className="w-full py-8 border border-border/50 rounded-xl bg-card overflow-hidden">
                <Marquee speed={0.6}>
                    <span className="mx-8 text-2xl font-bold tracking-tight text-foreground/70 uppercase">
                        React Marquee • Touch Enabled • Scroll Control • Custom Speed •
                    </span>
                </Marquee>
            </div>
        );
    }

    // 4. Text Animator
    if (name === 'text-animator') {
        return (
            <div className="w-full min-h-[150px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <div className="text-center">
                    <TextAnimator text="Antigravity UI Design" />
                </div>
            </div>
        );
    }

    // 5. Button Particles
    if (name === 'button-particles') {
        return (
            <div className="w-full min-h-[150px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <ButtonParticles variant="default" className="px-6 py-3 font-semibold text-lg transition-transform active:scale-95">
                    Click for Particles!
                </ButtonParticles>
            </div>
        );
    }

    // 6. Pixel Canvas
    if (name === 'pixel-canvas') {
        return (
            <div className="relative w-full h-[250px] border border-border/50 rounded-xl overflow-hidden bg-zinc-950 grid place-items-center">
                <PixelCanvas className="absolute inset-0 opacity-40" />
                <div className="relative z-10 text-center pointer-events-none">
                    <h3 className="text-2xl font-bold text-zinc-100 font-bebas-neue!">Interactive Background</h3>
                    <p className="text-sm text-zinc-400">Move your mouse to interact with the pixels</p>
                </div>
            </div>
        );
    }

    // 7. Back Light
    if (name === 'back-light') {
        return (
            <div className="w-full min-h-[250px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <BackLight opacity={0.8} blur={25} intensity={1.5} saturation={3}>
                    <div className="w-64 h-36 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-6 flex flex-col justify-end text-white shadow-xl">
                        <span className="font-bebas-neue! text-2xl tracking-wide">Vibrant Backlight</span>
                        <span className="text-xs opacity-75 font-sans">Glow matrix wrapper</span>
                    </div>
                </BackLight>
            </div>
        );
    }

    // 8. Glow Conic
    if (name === 'glow-conic') {
        return (
            <div className="w-full min-h-[250px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <div className="relative w-64 h-36 rounded-xl overflow-hidden bg-background">
                    <GlowConic style={{ '--conic-color': 'var(--color-primary, #6366f1)' } as React.CSSProperties} />
                    <div className="absolute inset-px rounded-[11px] bg-card/90 flex flex-col justify-center items-center text-center p-4">
                        <h3 className="font-semibold text-lg font-bebas-neue!">Conic Border</h3>
                        <p className="text-xs text-muted-foreground mt-1">Conic gradient animation</p>
                    </div>
                </div>
            </div>
        );
    }

    // 9. Glow Radial
    if (name === 'glow-radial') {
        return (
            <div className="w-full min-h-[250px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <div className="relative w-72 h-40 rounded-lg overflow-hidden border border-border bg-card">
                    <GlowRadial className="opacity-50" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                        <h3 className="font-semibold">Radial Mouse Glow</h3>
                        <p className="text-xs text-muted-foreground mt-1">Glow follows the cursor</p>
                    </div>
                </div>
            </div>
        );
    }

    // 10. Glow Stack
    if (name === 'glow-stack') {
        return (
            <div className="w-full min-h-[250px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <GlowStack className="grid grid-cols-2 gap-4 max-w-md w-full">
                    <Card className="p-6 text-center hover:bg-accent/10 transition-colors">
                        <h4 className="font-semibold text-sm">Stack Item 1</h4>
                        <p className="text-xs text-muted-foreground mt-1">Hover coordinates shared</p>
                    </Card>
                    <Card className="p-6 text-center hover:bg-accent/10 transition-colors">
                        <h4 className="font-semibold text-sm">Stack Item 2</h4>
                        <p className="text-xs text-muted-foreground mt-1">Glow spans containers</p>
                    </Card>
                </GlowStack>
            </div>
        );
    }

    // 11. Input Slug
    if (name === 'input-slug') {
        const [value, setValue] = useState('');
        return (
            <div className="w-full max-w-md mx-auto border border-border/50 rounded-xl bg-card p-6 space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Title to Slug Input</label>
                    <InputSlug 
                        value={value} 
                        onValueChange={setValue} 
                        placeholder="Type something to auto-slugify..."
                        className="w-full"
                    />
                </div>
                <div className="bg-muted/50 p-3 rounded text-xs font-mono break-all text-muted-foreground">
                    slug: <span className="text-primary font-bold">{value || 'None'}</span>
                </div>
            </div>
        );
    }

    // 12. Multi Select
    if (name === 'multi-select') {
        const [selected, setSelected] = useState<string[]>([]);
        const options = [
            { label: 'React', value: 'react' },
            { label: 'TypeScript', value: 'ts' },
            { label: 'Tailwind CSS', value: 'tailwind' },
            { label: 'Laravel', value: 'laravel' },
            { label: 'InertiaJS', value: 'inertia' },
        ];
        return (
            <div className="w-full max-w-sm mx-auto border border-border/50 rounded-xl bg-card p-6 space-y-4 min-h-[250px]">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Multi-Select Dropdown</label>
                    <MultiSelect value={selected} onValueChange={setSelected}>
                        <MultiSelectTrigger className="w-full">
                            <MultiSelectValue placeholder="Select technologies..." />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {options.map((opt) => (
                                <MultiSelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </div>
                <div className="text-xs text-muted-foreground">
                    Selected: <span className="font-mono text-primary">{selected.join(', ') || 'none'}</span>
                </div>
            </div>
        );
    }

    // 13. Animated Tabs
    if (name === 'animated-tabs') {
        const [active, setActive] = useState('home');
        const tabList = [
            { id: 'home', label: 'Home' },
            { id: 'profile', label: 'Profile' },
            { id: 'billing', label: 'Billing' },
            { id: 'settings', label: 'Settings' },
        ];
        return (
            <div className="w-full max-w-md mx-auto border border-border/50 rounded-xl bg-card p-6 flex flex-col items-center justify-center min-h-[150px]">
                <AnimatedTabs 
                    tabs={tabList} 
                    value={active} 
                    onChange={setActive}
                />
                <div className="mt-4 text-xs text-muted-foreground">
                    Active tab: <span className="font-mono text-primary font-bold">{active}</span>
                </div>
            </div>
        );
    }

    // 14. Waves Three
    if (name === 'waves-three') {
        return (
            <div className="relative w-full h-[250px] border border-border/50 rounded-xl overflow-hidden bg-black grid place-items-center">
                <WavesThree className="absolute inset-0 opacity-80" />
                <div className="relative z-10 text-center pointer-events-none text-white">
                    <h3 className="text-2xl font-bold font-bebas-neue! tracking-wide">WebGL Waves Background</h3>
                    <p className="text-sm text-zinc-400">Powered by Three.js</p>
                </div>
            </div>
        );
    }

    // 15. use-hover hook
    if (name === 'use-hover') {
        const { isHovered, hoverRef } = useHover();
        return (
            <div className="w-full min-h-[200px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <div 
                    ref={hoverRef}
                    className={`w-64 h-32 rounded-lg border-2 border-dashed flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                        isHovered ? 'bg-primary/10 border-primary text-primary' : 'bg-muted/20 border-muted-foreground/30 text-muted-foreground'
                    }`}
                >
                    <span className="font-medium">{isHovered ? 'HOVERED!' : 'Hover over me'}</span>
                    <span className="text-[10px] font-mono mt-1">ref-bound state hook</span>
                </div>
            </div>
        );
    }

    // 16. use-dark-mode hook
    if (name === 'use-dark-mode') {
        const isDark = useDarkMode();
        const toggle = () => {
            document.documentElement.classList.toggle('dark');
        };
        return (
            <div className="w-full min-h-[200px] grid place-items-center border border-border/50 rounded-xl bg-card p-6">
                <div className="text-center space-y-3">
                    <p className="text-sm">Current theme state: <span className="font-bold font-mono text-primary">{isDark ? 'Dark' : 'Light'}</span></p>
                    <Button onClick={toggle} variant="outline">
                        Toggle Theme Mode
                    </Button>
                </div>
            </div>
        );
    }

    // 17. use-headroom hook
    if (name === 'use-headroom') {
        const { pinned } = useHeadroom({
            enabled: true,
            offset: 10,
        });
        return (
            <div className="w-full border border-border/50 rounded-xl bg-card p-6 space-y-4">
                <div className="text-xs text-muted-foreground mb-2">
                    Scroll the page downwards and upwards to see useHeadroom trigger in navigation.
                </div>
                <div className="p-4 rounded border bg-muted/30 font-mono text-xs flex justify-between">
                    <span>Headroom State:</span>
                    <span className={pinned ? 'text-green-500 font-bold' : 'text-amber-500'}>
                        {pinned ? 'PINNED (Visible)' : 'UNPINNED (Hidden)'}
                    </span>
                </div>
            </div>
        );
    }

    // Library/Helper cards (default state)
    return (
        <div className="w-full min-h-[200px] flex flex-col justify-center items-center border border-border/50 rounded-xl bg-card p-6 text-center">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4 font-mono font-bold">
                {name.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-semibold capitalize">{name.replace(/-/g, ' ')}</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                This item is a utility helper registry library or hook which provides foundational functionality to UI components.
            </p>
        </div>
    );
}
