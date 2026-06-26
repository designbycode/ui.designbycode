import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Shield, Globe, Heart, Award, Terminal } from 'lucide-react';

// Import all registry components
import { MusicPlayer } from '@/registry/new-york/components/blocks/music-player/music-player';
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
import { InputPhone } from '@/registry/new-york/components/ui/inputs/input-phone';
import { InputCurrency } from '@/registry/new-york/components/ui/inputs/input-currency';
import { InputNumber } from '@/registry/new-york/components/ui/inputs/input-number';
import { InputPassword } from '@/registry/new-york/components/ui/inputs/input-password';
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
} from '@/registry/new-york/components/ui/inputs/multi-select';
import { AnimatedTabs } from '@/registry/new-york/components/ui/tabs/animated-tabs';
import { InteractiveRating } from '@/registry/new-york/components/ui/rating/interactive-rating';
import { ProgressCircle } from '@/registry/new-york/components/ui/progress/progress-circle';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';
import { CardsStats } from '@/registry/new-york/components/blocks/cards-stats/cards-stats';
import PricingSection from '@/registry/new-york/components/blocks/pricing-section/pricing-section';
import FeatureGrid from '@/registry/new-york/components/blocks/feature-grid/feature-grid';

import { Heading } from '@/registry/new-york/components/ui/typography/heading';
import { Paragraph } from '@/registry/new-york/components/ui/typography/paragraph';
import { BadgeIndicator } from '@/registry/new-york/components/ui/typography/badge-indicator';
import { HeadingBlock } from '@/registry/new-york/components/ui/typography/heading-block';
import { InputNumberStepper } from '@/registry/new-york/components/ui/inputs/input-number-stepper';
import { ButtonSpecial } from '@/registry/new-york/components/ui/buttons/button-special';
import { HeroGradient } from '@/registry/new-york/components/blocks/hero-section/hero-gradient';
import { HeroSplit } from '@/registry/new-york/components/blocks/hero-section/hero-split';
import { HeroMinimalCentered } from '@/registry/new-york/components/blocks/hero-minimal-centered/hero-minimal-centered';
import { HeroPhoneMockup } from '@/registry/new-york/components/blocks/hero-phone-mockup/hero-phone-mockup';
import { HeroFeaturesGrid } from '@/registry/new-york/components/blocks/hero-features-grid/hero-features-grid';
import { HeroVideoDialog } from '@/registry/new-york/components/blocks/hero-video-dialog/hero-video-dialog';
import { HeroParticles } from '@/registry/new-york/components/blocks/hero-particles/hero-particles';
import { HeroConicGlow } from '@/registry/new-york/components/blocks/hero-conic-glow/hero-conic-glow';
import { HeroWaitlist } from '@/registry/new-york/components/blocks/hero-waitlist/hero-waitlist';
import { HeroTrustedBy } from '@/registry/new-york/components/blocks/hero-trusted-by/hero-trusted-by';
import { HeroTabsShowcase } from '@/registry/new-york/components/blocks/hero-tabs-showcase/hero-tabs-showcase';
import { HeroWaves } from '@/registry/new-york/components/blocks/hero-waves/hero-waves';
import { HeroFullscreenImage } from '@/registry/new-york/components/blocks/hero-fullscreen-image/hero-fullscreen-image';
import { HeroFullscreenVideo } from '@/registry/new-york/components/blocks/hero-fullscreen-video/hero-fullscreen-video';
import { PhoneMockup } from '@/registry/new-york/components/ui/mockups/phone-mockup';
import { CodeWindow } from '@/registry/new-york/components/ui/mockups/code-window';
import { BrowserMockup } from '@/registry/new-york/components/ui/mockups/browser-mockup';
import { ParticlesBackdrop } from '@/registry/new-york/components/ui/animations/particles-backdrop';
import { LogoCloud } from '@/registry/new-york/components/ui/misc/logo-cloud';
import { GlowingCard } from '@/registry/new-york/components/ui/cards/glowing-card';
import { HeroGlowingCards } from '@/registry/new-york/components/blocks/hero-glowing-cards/hero-glowing-cards';

import ButtonMagnetic from '@/registry/new-york/components/ui/buttons/button-magnetic';
import ButtonShine from '@/registry/new-york/components/ui/buttons/button-shine';
import AnalyticsDashboard from '@/registry/new-york/components/blocks/analytics-dashboard/analytics-dashboard';
import ButtonsGallery from '@/registry/new-york/components/blocks/buttons-gallery/buttons-gallery';
import InputsGallery from '@/registry/new-york/components/blocks/inputs-gallery/inputs-gallery';
import CanvasGallery from '@/registry/new-york/components/blocks/canvas-gallery/canvas-gallery';
import BookingForm from '@/registry/new-york/components/blocks/booking-form/booking-form';
import RentalListings from '@/registry/new-york/components/blocks/rental-listings/rental-listings';
import PropertyDetail from '@/registry/new-york/components/blocks/property-detail/property-detail';
import ReviewsSlider from '@/registry/new-york/components/blocks/reviews-slider/reviews-slider';
import HeroSection from '@/registry/new-york/components/blocks/hero-section/hero-section';

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
                <GlowStack radius={150} className="flex w-full justify-center">
                    <div className="relative h-40 w-72 overflow-hidden rounded-lg border border-border bg-card">
                        <GlowRadial className="opacity-50" />
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <h3 className="font-semibold">Radial Mouse Glow</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Glow follows the cursor
                            </p>
                        </div>
                    </div>
                </GlowStack>
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

    // 11b. Input Phone
    if (name === 'input-phone') {
        const [value, setValue] = useState('');
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Phone Number Input
                    </label>
                    <InputPhone
                        value={value}
                        onValueChange={setValue}
                        placeholder="(555) 000-0000"
                        className="w-full"
                    />
                </div>
                <div className="rounded bg-muted/50 p-3 font-mono text-xs break-all text-muted-foreground">
                    digits:{' '}
                    <span className="font-bold text-primary">
                        {value || 'None'}
                    </span>
                </div>
            </div>
        );
    }

    // 11c. Input Currency
    if (name === 'input-currency') {
        const [value, setValue] = useState<number | undefined>(1000);
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Currency Input (USD)
                    </label>
                    <InputCurrency
                        value={value}
                        onValueChange={setValue}
                        placeholder="0.00"
                        className="w-full"
                    />
                </div>
                <div className="rounded bg-muted/50 p-3 font-mono text-xs break-all text-muted-foreground">
                    number:{' '}
                    <span className="font-bold text-primary">
                        {value !== undefined ? value : 'None'}
                    </span>
                </div>
            </div>
        );
    }

    // 11d. Input Number
    if (name === 'input-number') {
        const [value, setValue] = useState<number | undefined>(10);
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Numeric Spinner (step: 0.5, max: 20)
                    </label>
                    <InputNumber
                        value={value}
                        onValueChange={setValue}
                        step={0.5}
                        max={20}
                        min={0}
                        suffix="px"
                        placeholder="0.0"
                        className="w-full"
                    />
                </div>
                <div className="rounded bg-muted/50 p-3 font-mono text-xs break-all text-muted-foreground">
                    number:{' '}
                    <span className="font-bold text-primary">
                        {value !== undefined ? value : 'None'}
                    </span>
                </div>
            </div>
        );
    }

    // 11e. Input Password
    if (name === 'input-password') {
        const [value, setValue] = useState('');
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                        Password Input
                    </label>
                    <InputPassword
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="••••••••"
                        className="w-full"
                    />
                </div>
                <div className="rounded bg-muted/50 p-3 font-mono text-xs break-all text-muted-foreground">
                    Value:{' '}
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

    // 13b. Interactive Rating
    if (name === 'interactive-rating') {
        const [rating, setRating] = useState(3);
        return (
            <div className="mx-auto flex min-h-[150px] w-full max-w-md flex-col items-center justify-center gap-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-1 text-center">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Interactive Rating
                    </span>
                    <InteractiveRating
                        defaultRating={rating}
                        onChange={setRating}
                        maxRating={5}
                    />
                </div>
                <div className="text-xs text-muted-foreground">
                    Rating value:{' '}
                    <span className="font-mono font-bold text-primary">
                        {rating} / 5
                    </span>
                </div>
            </div>
        );
    }

    // 13c. Progress Circle
    if (name === 'progress-circle') {
        const [value, setValue] = useState(65);
        return (
            <div className="mx-auto flex min-h-[200px] w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl border border-border/50 bg-card p-6">
                <div className="flex items-center gap-8">
                    <ProgressCircle
                        value={value}
                        size={100}
                        strokeWidth={8}
                        label="Loading"
                    />
                    <ProgressCircle
                        value={value}
                        size={80}
                        strokeWidth={6}
                        label="Speed"
                        className="text-chart-2"
                    />
                    <ProgressCircle
                        value={value}
                        size={60}
                        strokeWidth={4}
                        showValue={false}
                        className="text-destructive"
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress Value</span>
                        <span className="font-mono font-bold text-primary">
                            {value}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value, 10))}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                    />
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

    // Heading
    if (name === 'heading') {
        return (
            <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Heading level={4}>Heading 4</Heading>
                <Heading level={5}>Heading 5</Heading>
                <Heading level={6}>Heading 6</Heading>
            </div>
        );
    }

    // Paragraph
    if (name === 'paragraph') {
        return (
            <div className="mx-auto w-full max-w-lg space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div>
                    <span className="text-xs font-semibold text-muted-foreground">
                        Lead Variant
                    </span>
                    <Paragraph variant="lead">
                        This is a lead paragraph with larger, lighter styled
                        text.
                    </Paragraph>
                </div>
                <div>
                    <span className="text-xs font-semibold text-muted-foreground">
                        Default Variant
                    </span>
                    <Paragraph variant="default">
                        This is the default paragraph style used for body copy
                        throughout the application. It has standard leading and
                        text color.
                    </Paragraph>
                </div>
                <div>
                    <span className="text-xs font-semibold text-muted-foreground">
                        Large Variant
                    </span>
                    <Paragraph variant="large">
                        This is a large paragraph variant with semi-bold text
                        weight.
                    </Paragraph>
                </div>
                <div>
                    <span className="text-xs font-semibold text-muted-foreground">
                        Small Variant
                    </span>
                    <Paragraph variant="small">
                        This is a small paragraph variant for compact text.
                    </Paragraph>
                </div>
                <div>
                    <span className="text-xs font-semibold text-muted-foreground">
                        Muted Variant
                    </span>
                    <Paragraph variant="muted">
                        This is a muted paragraph style, perfect for helper
                        text, subtitles, or captions.
                    </Paragraph>
                </div>
            </div>
        );
    }

    // Badge Indicator
    if (name === 'badge-indicator') {
        return (
            <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-border/50 bg-card p-6">
                <BadgeIndicator>Simple Badge</BadgeIndicator>
                <BadgeIndicator icon={Sparkles}>With Icon</BadgeIndicator>
                <BadgeIndicator
                    icon={Shield}
                    className="border-red-500/20 bg-red-500/5 text-red-500"
                >
                    Alert Shield
                </BadgeIndicator>
            </div>
        );
    }

    // Heading Block
    if (name === 'heading-block') {
        return (
            <div className="mx-auto w-full max-w-2xl space-y-8 rounded-xl border border-border/50 bg-card p-6">
                <HeadingBlock
                    badge={{ text: 'Feature Release', icon: Sparkles }}
                    heading="Transform your workflow today"
                    description="Our premium components let you build state of the art React UIs in half the time. Try dragging and editing parameters directly."
                />
                <hr className="border-border/30" />
                <HeadingBlock
                    size="sm"
                    badge={{ text: 'Core Typography', icon: Shield }}
                    heading="Compact heading block variation"
                    description="This is a smaller variant of the heading block, perfect for cards or sidebar headers."
                />
            </div>
        );
    }

    // Input Number Stepper
    if (name === 'input-number-stepper') {
        const [value1, setValue1] = useState<number | undefined>(5);
        const [value2, setValue2] = useState<number | undefined>(10);
        const [value3, setValue3] = useState<number | undefined>(1.5);
        const [value4, setValue4] = useState<number | undefined>(20);
        return (
            <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-border/50 bg-card p-6">
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Split Layout (Default)
                    </span>
                    <InputNumberStepper
                        value={value1}
                        onValueChange={setValue1}
                        min={0}
                        max={10}
                    />
                </div>
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Left Controls Layout
                    </span>
                    <InputNumberStepper
                        value={value2}
                        onValueChange={setValue2}
                        variant="left"
                        min={0}
                        max={100}
                        step={5}
                    />
                </div>
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Right Controls Layout (Decimal step: 0.1)
                    </span>
                    <InputNumberStepper
                        value={value3}
                        onValueChange={setValue3}
                        variant="right"
                        min={0}
                        max={5}
                        step={0.1}
                    />
                </div>
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Inline Overlay Layout
                    </span>
                    <InputNumberStepper
                        value={value4}
                        onValueChange={setValue4}
                        variant="inline"
                        min={10}
                        max={50}
                    />
                </div>
            </div>
        );
    }

    // Button Special
    if (name === 'button-special') {
        return (
            <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/50 bg-card p-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Neon Glow
                    </span>
                    <ButtonSpecial specialVariant="neon">
                        Neon Button
                    </ButtonSpecial>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Breathing Pulse
                    </span>
                    <ButtonSpecial specialVariant="pulse">
                        Pulse Button
                    </ButtonSpecial>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Border Draw
                    </span>
                    <ButtonSpecial specialVariant="draw">
                        Draw Button
                    </ButtonSpecial>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Gradient Border
                    </span>
                    <ButtonSpecial specialVariant="gradient-border">
                        Gradient Border
                    </ButtonSpecial>
                </div>
            </div>
        );
    }

    // Hero Gradient
    if (name === 'hero-gradient') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroGradient />
            </div>
        );
    }

    // Hero Split
    if (name === 'hero-split') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroSplit />
            </div>
        );
    }

    // Hero Minimal Centered
    if (name === 'hero-minimal-centered') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroMinimalCentered />
            </div>
        );
    }

    // Hero Fullscreen Image
    if (name === 'hero-fullscreen-image') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroFullscreenImage />
            </div>
        );
    }

    // Hero Fullscreen Video
    if (name === 'hero-fullscreen-video') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroFullscreenVideo />
            </div>
        );
    }

    // Hero Phone Mockup
    if (name === 'hero-phone-mockup') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroPhoneMockup />
            </div>
        );
    }

    // Hero Features Grid
    if (name === 'hero-features-grid') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroFeaturesGrid />
            </div>
        );
    }

    // Hero Video Dialog
    if (name === 'hero-video-dialog') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroVideoDialog />
            </div>
        );
    }

    // Hero Particles
    if (name === 'hero-particles') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroParticles />
            </div>
        );
    }

    // Hero Conic Glow
    if (name === 'hero-conic-glow') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroConicGlow />
            </div>
        );
    }

    // Hero Waitlist
    if (name === 'hero-waitlist') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroWaitlist />
            </div>
        );
    }

    // Hero Trusted By
    if (name === 'hero-trusted-by') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroTrustedBy />
            </div>
        );
    }

    // Hero Tabs Showcase
    if (name === 'hero-tabs-showcase') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroTabsShowcase />
            </div>
        );
    }

    // Hero Waves
    if (name === 'hero-waves') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroWaves />
            </div>
        );
    }

    // Phone Mockup
    if (name === 'phone-mockup') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <PhoneMockup screenClassName="justify-center items-center text-center">
                    <p className="text-sm font-bold text-foreground">
                        Phone Mockup
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Render anything inside.
                    </p>
                </PhoneMockup>
            </div>
        );
    }

    // Code Window
    if (name === 'code-window') {
        return (
            <div className="mx-auto w-full max-w-md p-4">
                <CodeWindow
                    title="sample.js"
                    lang="javascript"
                    code={`const server = http.createServer((req, res) => {\n  res.writeHead(200);\n  res.end('Hello world!');\n});`}
                />
            </div>
        );
    }

    // Browser Mockup
    if (name === 'browser-mockup') {
        return (
            <div className="mx-auto w-full max-w-xl p-4">
                <BrowserMockup
                    title="my-cool-site.com"
                    className="aspect-video"
                >
                    <div className="flex h-full flex-col items-center justify-center bg-zinc-900 p-6 text-center">
                        <span className="text-sm font-bold text-white">
                            Interactive Browser Preview
                        </span>
                        <span className="mt-1 text-xs text-zinc-400">
                            This resides inside the viewport.
                        </span>
                    </div>
                </BrowserMockup>
            </div>
        );
    }

    // Particles Backdrop
    if (name === 'particles-backdrop') {
        return (
            <div className="relative h-[250px] w-full overflow-hidden rounded-xl border border-border/50 bg-zinc-950">
                <ParticlesBackdrop count={20} colorClassName="bg-primary/30" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="text-sm font-semibold text-white/95">
                        Floating Particles backdrop
                    </span>
                </div>
            </div>
        );
    }

    // Logo Cloud
    if (name === 'logo-cloud') {
        const brands = [
            { icon: Globe, name: 'Stripe' },
            { icon: Heart, name: 'Vercel' },
            { icon: Award, name: 'Github' },
            { icon: Terminal, name: 'Supabase' },
        ];
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <LogoCloud title="PARTNERS" items={brands} />
            </div>
        );
    }

    // Glowing Card
    if (name === 'glowing-card') {
        return (
            <div className="grid min-h-[250px] w-full place-items-center rounded-xl border border-border/50 bg-zinc-950 p-6">
                <GlowingCard
                    className="max-w-xs text-left"
                    glowColor="rgba(16,185,129,0.15)"
                >
                    <h4 className="text-sm font-bold text-white">
                        Glow Spotlight
                    </h4>
                    <p className="mt-2 text-xs text-zinc-400">
                        Hover your mouse over this card to activate the radial
                        tracking spotlight.
                    </p>
                </GlowingCard>
            </div>
        );
    }

    // Hero Glowing Cards
    if (name === 'hero-glowing-cards') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <HeroGlowingCards />
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
