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
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
} from '@/registry/new-york/components/ui/inputs/multi-select';
import { AnimatedTabs } from '@/registry/new-york/components/ui/tabs/animated-tabs';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';
import { CardsStats } from '@/registry/new-york/components/cards-stats/cards-stats';
import PricingSection from '@/registry/new-york/components/pricing-section/pricing-section';
import FeatureGrid from '@/registry/new-york/components/feature-grid/feature-grid';

import ButtonMagnetic from '@/registry/new-york/components/ui/buttons/button-magnetic';
import ButtonShine from '@/registry/new-york/components/ui/buttons/button-shine';
import AnalyticsDashboard from '@/registry/new-york/components/analytics-dashboard/analytics-dashboard';
import ButtonsGallery from '@/registry/new-york/components/buttons-gallery/buttons-gallery';
import InputsGallery from '@/registry/new-york/components/inputs-gallery/inputs-gallery';
import CanvasGallery from '@/registry/new-york/components/canvas-gallery/canvas-gallery';
import BookingForm from '@/registry/new-york/components/booking-form/booking-form';
import RentalListings from '@/registry/new-york/components/rental-listings/rental-listings';
import PropertyDetail from '@/registry/new-york/components/property-detail/property-detail';
import ReviewsSlider from '@/registry/new-york/components/reviews-slider/reviews-slider';
import HeroSection from '@/registry/new-york/components/hero-section/hero-section';

// Import hooks for interactive demo
import useDarkMode from '@/registry/new-york/hooks/use-dark-mode';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { useHover } from '@/registry/new-york/hooks/use-hover';

export default function RegistryPreview({ name }: { name: string }) {
    // 1. Music Player
    if (name === 'music-player') {
        return (
            <div className="mx-auto w-full max-w-4xl rounded-xl border border-border/50 bg-card p-6 shadow-lg">
                <MusicPlayer />
            </div>
        );
    }

    // 2. GSAP Marquee
    if (name === 'gsap-marquee') {
        return (
            <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card py-8">
                <GSAPMarquee duration={15}>
                    <span className="mx-8 font-bebas-neue! text-3xl font-extrabold tracking-wider text-foreground/80 uppercase">
                        DesignByCode • Interactive • GSAP Driven • Smooth
                        Performance •
                    </span>
                </GSAPMarquee>
            </div>
        );
    }

    // 3. Marquee
    if (name === 'marquee') {
        return (
            <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card py-8">
                <Marquee speed={0.6}>
                    <span className="mx-8 text-2xl font-bold tracking-tight text-foreground/70 uppercase">
                        React Marquee • Touch Enabled • Scroll Control • Custom
                        Speed •
                    </span>
                </Marquee>
            </div>
        );
    }

    // 4. Text Animator
    if (name === 'text-animator') {
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <div className="text-center">
                    <TextAnimator text="Antigravity UI Design" />
                </div>
            </div>
        );
    }

    // 5. Button Particles
    if (name === 'button-particles') {
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonParticles
                    variant="default"
                    className="px-6 py-3 text-lg font-semibold transition-transform active:scale-95"
                >
                    Click for Particles!
                </ButtonParticles>
            </div>
        );
    }

    // 6. Pixel Canvas
    if (name === 'pixel-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-zinc-950">
                <PixelCanvas className="absolute inset-0 opacity-40" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="font-bebas-neue! text-2xl font-bold text-zinc-100">
                        Interactive Background
                    </h3>
                    <p className="text-sm text-zinc-400">
                        Move your mouse to interact with the pixels
                    </p>
                </div>
            </div>
        );
    }

    // 7. Back Light
    if (name === 'back-light') {
        return (
            <div className="grid min-h-[250px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <BackLight
                    opacity={0.8}
                    blur={25}
                    intensity={1.5}
                    saturation={3}
                >
                    <div className="flex h-36 w-64 flex-col justify-end rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-6 text-white shadow-xl">
                        <span className="font-bebas-neue! text-2xl tracking-wide">
                            Vibrant Backlight
                        </span>
                        <span className="font-sans text-xs opacity-75">
                            Glow matrix wrapper
                        </span>
                    </div>
                </BackLight>
            </div>
        );
    }

    // 8. Glow Conic
    if (name === 'glow-conic') {
        return (
            <div className="grid min-h-[250px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <div className="relative h-36 w-64 overflow-hidden rounded-xl bg-background">
                    <GlowConic
                        style={
                            {
                                '--conic-color':
                                    'var(--color-primary, #6366f1)',
                            } as React.CSSProperties
                        }
                    />
                    <div className="absolute inset-px flex flex-col items-center justify-center rounded-[11px] bg-card/90 p-4 text-center">
                        <h3 className="font-bebas-neue! text-lg font-semibold">
                            Conic Border
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Conic gradient animation
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // 9. Glow Radial
    if (name === 'glow-radial') {
        return (
            <div className="grid min-h-[250px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <div className="relative h-40 w-72 overflow-hidden rounded-lg border border-border bg-card">
                    <GlowRadial className="opacity-50" />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <h3 className="font-semibold">Radial Mouse Glow</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Glow follows the cursor
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // 10. Glow Stack
    if (name === 'glow-stack') {
        return (
            <div className="grid min-h-[250px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <GlowStack className="grid w-full max-w-md grid-cols-2 gap-4">
                    <Card className="p-6 text-center transition-colors hover:bg-accent/10">
                        <h4 className="text-sm font-semibold">Stack Item 1</h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Hover coordinates shared
                        </p>
                    </Card>
                    <Card className="p-6 text-center transition-colors hover:bg-accent/10">
                        <h4 className="text-sm font-semibold">Stack Item 2</h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Glow spans containers
                        </p>
                    </Card>
                </GlowStack>
            </div>
        );
    }

    // 11. Input Slug
    if (name === 'input-slug') {
        const [value, setValue] = useState('');
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Title to Slug Input
                    </label>
                    <InputSlug
                        value={value}
                        onValueChange={setValue}
                        placeholder="Type something to auto-slugify..."
                        className="w-full"
                    />
                </div>
                <div className="rounded bg-muted/50 p-3 font-mono text-xs break-all text-muted-foreground">
                    slug:{' '}
                    <span className="font-bold text-primary">
                        {value || 'None'}
                    </span>
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
            <div className="mx-auto min-h-[250px] w-full max-w-sm space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Multi-Select Dropdown
                    </label>
                    <MultiSelect value={selected} onValueChange={setSelected}>
                        <MultiSelectTrigger className="w-full">
                            <MultiSelectValue placeholder="Select technologies..." />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {options.map((opt) => (
                                <MultiSelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </div>
                <div className="text-xs text-muted-foreground">
                    Selected:{' '}
                    <span className="font-mono text-primary">
                        {selected.join(', ') || 'none'}
                    </span>
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
            <div className="mx-auto flex min-h-[150px] w-full max-w-md flex-col items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <AnimatedTabs
                    tabs={tabList}
                    value={active}
                    onChange={setActive}
                />
                <div className="mt-4 text-xs text-muted-foreground">
                    Active tab:{' '}
                    <span className="font-mono font-bold text-primary">
                        {active}
                    </span>
                </div>
            </div>
        );
    }

    // 14. Waves Three
    if (name === 'waves-three') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-black">
                <WavesThree className="absolute inset-0 opacity-80" />
                <div className="pointer-events-none relative z-10 text-center text-white">
                    <h3 className="font-bebas-neue! text-2xl font-bold tracking-wide">
                        WebGL Waves Background
                    </h3>
                    <p className="text-sm text-zinc-400">Powered by Three.js</p>
                </div>
            </div>
        );
    }

    // 15. use-hover hook
    if (name === 'use-hover') {
        const { isHovered, hoverRef } = useHover();
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <div
                    ref={hoverRef}
                    className={`flex h-32 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
                        isHovered
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-muted-foreground/30 bg-muted/20 text-muted-foreground'
                    }`}
                >
                    <span className="font-medium">
                        {isHovered ? 'HOVERED!' : 'Hover over me'}
                    </span>
                    <span className="mt-1 font-mono text-[10px]">
                        ref-bound state hook
                    </span>
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
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-3 text-center">
                    <p className="text-sm">
                        Current theme state:{' '}
                        <span className="font-mono font-bold text-primary">
                            {isDark ? 'Dark' : 'Light'}
                        </span>
                    </p>
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
            <div className="w-full space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="mb-2 text-xs text-muted-foreground">
                    Scroll the page downwards and upwards to see useHeadroom
                    trigger in navigation.
                </div>
                <div className="flex justify-between rounded border bg-muted/30 p-4 font-mono text-xs">
                    <span>Headroom State:</span>
                    <span
                        className={
                            pinned
                                ? 'font-bold text-green-500'
                                : 'text-amber-500'
                        }
                    >
                        {pinned ? 'PINNED (Visible)' : 'UNPINNED (Hidden)'}
                    </span>
                </div>
            </div>
        );
    }

    // 18. Cards Stats
    if (name === 'cards-stats') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <CardsStats />
            </div>
        );
    }

    // 19. Pricing Section
    if (name === 'pricing-section') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PricingSection />
            </div>
        );
    }

    // 20. Feature Grid
    if (name === 'feature-grid') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <FeatureGrid />
            </div>
        );
    }

    // 22. Button Magnetic
    if (name === 'button-magnetic') {
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonMagnetic className="px-6 py-3 text-sm font-semibold">
                    Hover Me (Magnetic!)
                </ButtonMagnetic>
            </div>
        );
    }

    // 23. Button Shine
    if (name === 'button-shine') {
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonShine className="px-6 py-3 text-sm font-semibold">
                    Hover for Shine Shimmer
                </ButtonShine>
            </div>
        );
    }

    // 24. Analytics Dashboard
    if (name === 'analytics-dashboard') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <AnalyticsDashboard />
            </div>
        );
    }

    // 25. Buttons Gallery
    if (name === 'buttons-gallery') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <ButtonsGallery />
            </div>
        );
    }

    // 26. Inputs Gallery
    if (name === 'inputs-gallery') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <InputsGallery />
            </div>
        );
    }

    // 27. Canvas Gallery
    if (name === 'canvas-gallery') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <CanvasGallery />
            </div>
        );
    }

    // 28. Booking Form
    if (name === 'booking-form') {
        return (
            <div className="mx-auto w-full max-w-5xl py-6">
                <BookingForm />
            </div>
        );
    }

    // 29. Rental Listings
    if (name === 'rental-listings') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <RentalListings />
            </div>
        );
    }

    // 30. Property Detail
    if (name === 'property-detail') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PropertyDetail />
            </div>
        );
    }

    // 31. Reviews Slider
    if (name === 'reviews-slider') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <ReviewsSlider />
            </div>
        );
    }

    // 32. Hero Section
    if (name === 'hero-section') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroSection />
            </div>
        );
    }

    // Library/Helper cards (default state)
    return (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border border-border/50 bg-card p-6 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted font-mono font-bold text-muted-foreground">
                {name.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-semibold capitalize">
                {name.replace(/-/g, ' ')}
            </h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                This item is a utility helper registry library or hook which
                provides foundational functionality to UI components.
            </p>
        </div>
    );
}
