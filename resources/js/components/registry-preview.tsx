import { Sparkles, Shield, Globe, Heart, Award, Terminal } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import all registry components
import ActivityFeed from '@/registry/new-york/components/blocks/activity-feed/activity-feed';
import AnalyticsDashboard from '@/registry/new-york/components/blocks/analytics-dashboard/analytics-dashboard';
import BookingForm from '@/registry/new-york/components/blocks/booking-form/booking-form';
import ButtonsGallery from '@/registry/new-york/components/blocks/buttons-gallery/buttons-gallery';
import CallToActionBox from '@/registry/new-york/components/blocks/call-to-action-box/call-to-action-box';
import CanvasGallery from '@/registry/new-york/components/blocks/canvas-gallery/canvas-gallery';
import { CardsStats } from '@/registry/new-york/components/blocks/cards-stats/cards-stats';
import ContactForm from '@/registry/new-york/components/blocks/contact-form/contact-form';
import CookieBanner from '@/registry/new-york/components/blocks/cookie-banner/cookie-banner';
import FAQSection from '@/registry/new-york/components/blocks/faq-section/faq-section';
import FeatureGrid from '@/registry/new-york/components/blocks/feature-grid/feature-grid';
import FeatureList from '@/registry/new-york/components/blocks/feature-list/feature-list';
import { HeroConicGlow } from '@/registry/new-york/components/blocks/hero-conic-glow/hero-conic-glow';
import { HeroFeaturesGrid } from '@/registry/new-york/components/blocks/hero-features-grid/hero-features-grid';
import { HeroFullscreenImage } from '@/registry/new-york/components/blocks/hero-fullscreen-image/hero-fullscreen-image';
import { HeroFullscreenVideo } from '@/registry/new-york/components/blocks/hero-fullscreen-video/hero-fullscreen-video';
import { HeroGlowingCards } from '@/registry/new-york/components/blocks/hero-glowing-cards/hero-glowing-cards';
import { HeroHighEnergyImpact } from '@/registry/new-york/components/blocks/hero-high-energy/hero-high-energy';
import { HeroMinimalCentered } from '@/registry/new-york/components/blocks/hero-minimal-centered/hero-minimal-centered';
import { HeroGradient } from '@/registry/new-york/components/blocks/hero-section/hero-gradient';
import { MusicPlayer } from '@/registry/new-york/components/blocks/music-player/music-player';
import GSAPMarquee from '@/registry/new-york/components/ui/animations/gsap-marquee';
import Marquee from '@/registry/new-york/components/ui/animations/marquee';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import { ButtonParticles } from '@/registry/new-york/components/ui/buttons/button-particles';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import { ConstellationCanvas } from '@/registry/new-york/components/ui/canvas/constellation-canvas';
import { FlowFieldCanvas } from '@/registry/new-york/components/ui/canvas/flow-field-canvas';
import { MetaballCanvas } from '@/registry/new-york/components/ui/canvas/metaball-canvas';
import { AuroraCanvas } from '@/registry/new-york/components/ui/canvas/aurora-canvas';
import { WaveGridCanvas } from '@/registry/new-york/components/ui/canvas/wave-grid-canvas';
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
import { BlackHole } from '@/registry/new-york/components/ui/threejs/black-hole';
import { FeedbackStar } from '@/registry/new-york/components/ui/threejs/feedback-star';
import { CarouselBasic } from '@/registry/new-york/components/ui/carousels/carousel-basic';
import { CarouselFade } from '@/registry/new-york/components/ui/carousels/carousel-fade';
import { Carousel3d } from '@/registry/new-york/components/ui/carousels/carousel-3d';
import { CarouselThumbs } from '@/registry/new-york/components/ui/carousels/carousel-thumbs';
import { CarouselMotion } from '@/registry/new-york/components/ui/carousels/carousel-motion';
import { CarouselCards } from '@/registry/new-york/components/ui/carousels/carousel-cards';
import { CarouselCreative } from '@/registry/new-york/components/ui/carousels/carousel-creative';
import { CarouselAutoScroll } from '@/registry/new-york/components/ui/carousels/carousel-auto-scroll';
import { CarouselScale } from '@/registry/new-york/components/ui/carousels/carousel-scale';
import { CarouselVertical } from '@/registry/new-york/components/ui/carousels/carousel-vertical';
import { ComparisonSliderBasic } from '@/registry/new-york/components/ui/comparison-sliders/comparison-slider-basic';
import { ComparisonSliderVertical } from '@/registry/new-york/components/ui/comparison-sliders/comparison-slider-vertical';
import { ComparisonSliderHover } from '@/registry/new-york/components/ui/comparison-sliders/comparison-slider-hover';
import { ComparisonSliderDiagonal } from '@/registry/new-york/components/ui/comparison-sliders/comparison-slider-diagonal';
import { ComparisonSliderThreeWay } from '@/registry/new-york/components/ui/comparison-sliders/comparison-slider-three-way';
import { TimelineVertical } from '@/registry/new-york/components/ui/timelines/timeline-vertical';
import { TimelineHorizontal } from '@/registry/new-york/components/ui/timelines/timeline-horizontal';
import { TimelineMotion } from '@/registry/new-york/components/ui/timelines/timeline-motion';
import { TimelineGlow } from '@/registry/new-york/components/ui/timelines/timeline-glow';
import { TimelineCollapsible } from '@/registry/new-york/components/ui/timelines/timeline-collapsible';
import { BannerFloating } from '@/registry/new-york/components/ui/banners/banner-floating';
import { BannerSticky } from '@/registry/new-york/components/ui/banners/banner-sticky';
import { BannerSliding } from '@/registry/new-york/components/ui/banners/banner-sliding';
import { BannerExpandable } from '@/registry/new-york/components/ui/banners/banner-expandable';
import { BannerGlow } from '@/registry/new-york/components/ui/banners/banner-glow';
import { ReviewCard } from '@/registry/new-york/components/ui/reviews/review-card';
import { ReviewGrid } from '@/registry/new-york/components/ui/reviews/review-grid';
import { ReviewMarquee } from '@/registry/new-york/components/ui/reviews/review-marquee';
import { ReviewMasonry } from '@/registry/new-york/components/ui/reviews/review-masonry';
import { ReviewHero } from '@/registry/new-york/components/ui/reviews/review-hero';
import { ReviewCarousel } from '@/registry/new-york/components/ui/reviews/review-carousel';
import PricingSection from '@/registry/new-york/components/blocks/pricing-section/pricing-section';
import { PricingGlowing } from '@/registry/new-york/components/blocks/pricing-glowing/pricing-glowing';
import { PricingComparison } from '@/registry/new-york/components/blocks/pricing-comparison/pricing-comparison';
import { PricingResources } from '@/registry/new-york/components/blocks/pricing-resources/pricing-resources';
import { PricingModernCards } from '@/registry/new-york/components/blocks/pricing-modern-cards/pricing-modern-cards';

import { BadgeIndicator } from '@/registry/new-york/components/ui/typography/badge-indicator';
import { Heading } from '@/registry/new-york/components/ui/typography/heading';
import { HeadingBlock } from '@/registry/new-york/components/ui/typography/heading-block';
import { Paragraph } from '@/registry/new-york/components/ui/typography/paragraph';
import { InputNumberStepper } from '@/registry/new-york/components/ui/inputs/input-number-stepper';
import { ButtonNeon } from '@/registry/new-york/components/ui/buttons/button-neon';
import { ButtonPulse } from '@/registry/new-york/components/ui/buttons/button-pulse';
import { ButtonDraw } from '@/registry/new-york/components/ui/buttons/button-draw';
import { ButtonGradient } from '@/registry/new-york/components/ui/buttons/button-gradient';
import { ButtonRipple } from '@/registry/new-york/components/ui/buttons/button-ripple';
import { ButtonArrow } from '@/registry/new-york/components/ui/buttons/button-arrow';
import { ButtonGlowingAura } from '@/registry/new-york/components/ui/buttons/button-glowing-aura';
import { HeroSplit } from '@/registry/new-york/components/blocks/hero-section/hero-split';
import { HeroPhoneMockup } from '@/registry/new-york/components/blocks/hero-phone-mockup/hero-phone-mockup';
import { HeroVideoDialog } from '@/registry/new-york/components/blocks/hero-video-dialog/hero-video-dialog';
import { HeroParticles } from '@/registry/new-york/components/blocks/hero-particles/hero-particles';
import { HeroWaitlist } from '@/registry/new-york/components/blocks/hero-waitlist/hero-waitlist';
import { HeroTrustedBy } from '@/registry/new-york/components/blocks/hero-trusted-by/hero-trusted-by';
import { HeroTabsShowcase } from '@/registry/new-york/components/blocks/hero-tabs-showcase/hero-tabs-showcase';
import { HeroWaves } from '@/registry/new-york/components/blocks/hero-waves/hero-waves';
import { PhoneMockup } from '@/registry/new-york/components/ui/mockups/phone-mockup';
import { CodeWindow } from '@/registry/new-york/components/ui/mockups/code-window';
import { BrowserMockup } from '@/registry/new-york/components/ui/mockups/browser-mockup';
import { ParticlesBackdrop } from '@/registry/new-york/components/ui/animations/particles-backdrop';
import { LogoCloud } from '@/registry/new-york/components/ui/misc/logo-cloud';
import { GlowingCard } from '@/registry/new-york/components/ui/cards/glowing-card';
import { TiltCard } from '@/registry/new-york/components/ui/cards/tilt-card';
import { RevealCard } from '@/registry/new-york/components/ui/cards/reveal-card';
import { NeonBorderCard } from '@/registry/new-york/components/ui/cards/neon-border-card';
import { GlassGlareCard } from '@/registry/new-york/components/ui/cards/glass-glare-card';
import { ExpandableCard } from '@/registry/new-york/components/ui/cards/expandable-card';
import { ParallaxImageCard } from '@/registry/new-york/components/ui/cards/parallax-image-card';
import { MagneticCard } from '@/registry/new-york/components/ui/cards/magnetic-card';
import { MetricSparkCard } from '@/registry/new-york/components/ui/cards/metric-spark-card';
import { MetricProgressCard } from '@/registry/new-york/components/ui/cards/metric-progress-card';
import { MetricComparisonCard } from '@/registry/new-york/components/ui/cards/metric-comparison-card';
import { MetricBreakdownCard } from '@/registry/new-york/components/ui/cards/metric-breakdown-card';
import { MetricRadialCard } from '@/registry/new-york/components/ui/cards/metric-radial-card';
import { SplitPreviewCard } from '@/registry/new-york/components/ui/cards/split-preview-card';
import { GrainyNoiseCard } from '@/registry/new-york/components/ui/cards/grainy-noise-card';
import { ScratchCard } from '@/registry/new-york/components/ui/cards/scratch-card';
import { RainbowBorder } from '@/registry/new-york/components/ui/borders/rainbow-border';
import { GradientButton } from '@/registry/new-york/components/ui/buttons/rainbow-button';
import { RainbowBorderButton } from '@/registry/new-york/components/ui/buttons/rainbow-border-button';
import { RainbowBorderCard } from '@/registry/new-york/components/ui/cards/rainbow-border-card';
import { RainbowBorderInput } from '@/registry/new-york/components/ui/inputs/rainbow-border-input';
import Wrapper from '@/registry/new-york/components/ui/misc/wrapper';

import { AvatarDropzoneBadge } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-badge';
import { AvatarDropzoneCard } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-card';
import { AvatarDropzoneField } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-field';
import { AvatarDropzoneGhost } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-ghost';
import { AvatarDropzoneInline } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-inline';
import { AvatarDropzoneMinimal } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-minimal';
import { AvatarDropzoneOutlined } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-outlined';
import { AvatarDropzoneSortableRow } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-sortable-row';
import { AvatarDropzoneSortableStack } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-sortable-stack';
import { AvatarDropzoneSquare } from '@/registry/new-york/components/ui/dropzones/avatar-dropzone-square';
import { GalleryDropzoneCarousel } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-carousel';
import { GalleryDropzoneCompact } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-compact';
import { GalleryDropzoneDialog } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-dialog';
import { GalleryDropzoneList } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-list';
import { GalleryDropzoneMasonry } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-masonry';
import { GalleryDropzonePills } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-pills';
import { GalleryDropzoneSimple } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-simple';
import { GalleryDropzoneSortableCards } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-sortable-cards';
import { GalleryDropzoneSortableGrid } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-sortable-grid';
import { GalleryDropzoneSortableList } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-sortable-list';
import { GalleryDropzoneTable } from '@/registry/new-york/components/ui/dropzones/gallery-dropzone-table';

import ButtonMagnetic from '@/registry/new-york/components/ui/buttons/button-magnetic';
import ButtonShine from '@/registry/new-york/components/ui/buttons/button-shine';
import InputsGallery from '@/registry/new-york/components/blocks/inputs-gallery/inputs-gallery';
import RentalListings from '@/registry/new-york/components/blocks/rental-listings/rental-listings';
import PropertyDetail from '@/registry/new-york/components/blocks/property-detail/property-detail';
import ReviewsSlider from '@/registry/new-york/components/blocks/reviews-slider/reviews-slider';
import HeroSection from '@/registry/new-york/components/blocks/hero-section/hero-section';
import TestimonialsGrid from '@/registry/new-york/components/blocks/testimonials-grid/testimonials-grid';
import NewsletterBox from '@/registry/new-york/components/blocks/newsletter-box/newsletter-box';
import StatsGrid from '@/registry/new-york/components/blocks/stats-grid/stats-grid';
import PricingTable from '@/registry/new-york/components/blocks/pricing-table/pricing-table';
import UserProfileCard from '@/registry/new-york/components/blocks/user-profile-card/user-profile-card';
import HeroSimpleSplit from '@/registry/new-york/components/blocks/hero-simple-split/hero-simple-split';

// Import hooks for interactive demo
import useDarkMode from '@/registry/new-york/hooks/use-dark-mode';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { useHover } from '@/registry/new-york/hooks/use-hover';


function InputSlugPreview() {
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

function InputPhonePreview() {
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

function InputCurrencyPreview() {
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

function InputNumberPreview() {
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

function InputPasswordPreview() {
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

function MultiSelectPreview() {
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

function AnimatedTabsPreview() {
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

function InteractiveRatingPreview() {
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

function ProgressCirclePreview() {
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

function InputNumberStepperPreview() {
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
                    Compact Layout
                </span>
                <InputNumberStepper
                    value={value2}
                    onValueChange={setValue2}
                    variant="inline"
                    min={0}
                    max={20}
                />
            </div>
            <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground">
                    Decimals Support (step: 0.1)
                </span>
                <InputNumberStepper
                    value={value3}
                    onValueChange={setValue3}
                    step={0.1}
                    min={0}
                    max={5}
                />
            </div>
            <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground">
                    Disabled State
                </span>
                <InputNumberStepper
                    value={value4}
                    onValueChange={setValue4}
                    disabled
                />
            </div>
        </div>
    );
}

function UseHoverPreview() {
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
                    {isHovered ? 'Hovering!' : 'Hover me'}
                </span>
            </div>
        </div>
    );
}

function UseDarkModePreview() {
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

function UseHeadroomPreview() {
    const { pinned } = useHeadroom({
        enabled: true,
        offset: 10,
    });

    return (
        <div className="w-full space-y-4 rounded-xl border border-border/50 bg-card p-6">
            <div className="mb-2 text-xs text-muted-foreground">
                Scroll the page downwards and upwards to see useHeadroom header pin state.
            </div>
            <div
                className={`sticky top-0 z-50 flex h-12 w-full items-center justify-between rounded-lg border px-4 transition-all duration-300 ${
                    pinned
                        ? 'translate-y-0 border-border bg-card/90 shadow-md backdrop-blur-md'
                        : '-translate-y-16 border-transparent bg-transparent'
                }`}
            >
                <span className="font-bold text-xs">Pinned Header Demo</span>
                <span className="font-mono text-[10px] text-primary">
                    {pinned ? 'PINNED' : 'UNPINNED'}
                </span>
            </div>
        </div>
    );
}

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
                    className="transition-transform active:scale-95"
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

    // Constellation Canvas
    if (name === 'constellation-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-card">
                <ConstellationCanvas className="absolute inset-0 opacity-40 text-primary" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                        Constellation Canvas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Move your mouse to connect floating star nodes
                    </p>
                </div>
            </div>
        );
    }

    // Flow Field Canvas
    if (name === 'flow-field-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-card">
                <FlowFieldCanvas className="absolute inset-0 opacity-30 text-primary" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                        Flow Field Canvas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Generative particle paths flowing along a vector field
                    </p>
                </div>
            </div>
        );
    }

    // Metaball Canvas
    if (name === 'metaball-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-card">
                <MetaballCanvas className="absolute inset-0 opacity-50" color="var(--color-primary)" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                        Metaball Canvas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Organic liquid blobs that morph and merge on contact
                    </p>
                </div>
            </div>
        );
    }

    // Aurora Canvas
    if (name === 'aurora-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-card">
                <AuroraCanvas className="absolute inset-0 opacity-45" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                        Aurora Canvas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Slowly shifting glowing waves of northern lights
                    </p>
                </div>
            </div>
        );
    }

    // Wave Grid Canvas
    if (name === 'wave-grid-canvas') {
        return (
            <div className="relative grid h-[250px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-card">
                <WaveGridCanvas className="absolute inset-0 opacity-60 text-primary" />
                <div className="pointer-events-none relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                        Wave Grid Canvas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Rippling array of geometric shapes tracking the cursor
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
        return <InputSlugPreview />;
    }

    // 11b. Input Phone
    if (name === 'input-phone') {
        return <InputPhonePreview />;
    }

    // 11c. Input Currency
    if (name === 'input-currency') {
        return <InputCurrencyPreview />;
    }

    // 11d. Input Number
    if (name === 'input-number') {
        return <InputNumberPreview />;
    }

    // 11e. Input Password
    if (name === 'input-password') {
        return <InputPasswordPreview />;
    }

    // 12. Multi Select
    if (name === 'multi-select') {
        return <MultiSelectPreview />;
    }

    // 13. Animated Tabs
    if (name === 'animated-tabs') {
        return <AnimatedTabsPreview />;
    }

    // 13b. Interactive Rating
    if (name === 'interactive-rating') {
        return <InteractiveRatingPreview />;
    }

    // 13c. Progress Circle
    if (name === 'progress-circle') {
        return <ProgressCirclePreview />;
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

    // Black Hole
    if (name === 'black-hole') {
        return (
            <div className="relative grid h-[400px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-black">
                <BlackHole className="absolute inset-0 opacity-95" />
                <div className="pointer-events-none relative z-10 text-center text-white select-none">
                    <h3 className="font-bebas-neue! text-2xl font-bold tracking-wide">
                        WebGL Black Hole
                    </h3>
                    <p className="text-sm text-zinc-400">Interactive 3D simulation powered by Three.js</p>
                </div>
            </div>
        );
    }

    // Feedback Star
    if (name === 'feedback-star') {
        return (
            <div className="relative grid h-[400px] w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-black">
                <FeedbackStar className="absolute inset-0" />
                <div className="pointer-events-none relative z-10 text-center text-white select-none">
                    <h3 className="font-bebas-neue! text-2xl font-bold tracking-wide">
                        WebGL Feedback Noise Star
                    </h3>
                    <p className="text-sm text-zinc-400">Dynamic reaction-diffusion noise shader simulation</p>
                </div>
            </div>
        );
    }

    // Helper for rendering mock carousel cards
    const getMockCarouselCards = () => [
        <div
            key="1"
            className="flex h-44 flex-col justify-end rounded-xl bg-linear-to-tr from-pink-500 to-rose-500 p-6 text-white select-none"
        >
            <h4 className="text-base font-bold">Creative Design</h4>
            <p className="text-[10px] opacity-80">Smooth slide transitions</p>
        </div>,
        <div
            key="2"
            className="flex h-44 flex-col justify-end rounded-xl bg-linear-to-tr from-amber-500 to-orange-500 p-6 text-white select-none"
        >
            <h4 className="text-base font-bold">Custom Speed</h4>
            <p className="text-[10px] opacity-80">Autoplay with mouse pause</p>
        </div>,
        <div
            key="3"
            className="flex h-44 flex-col justify-end rounded-xl bg-linear-to-tr from-emerald-500 to-teal-500 p-6 text-white select-none"
        >
            <h4 className="text-base font-bold">Responsive layout</h4>
            <p className="text-[10px] opacity-80">Breakpoints support</p>
        </div>,
        <div
            key="4"
            className="flex h-44 flex-col justify-end rounded-xl bg-linear-to-tr from-blue-500 to-indigo-500 p-6 text-white select-none"
        >
            <h4 className="text-base font-bold">Touch gesture</h4>
            <p className="text-[10px] opacity-80">Drag and swipe physics</p>
        </div>,
        <div
            key="5"
            className="flex h-44 flex-col justify-end rounded-xl bg-linear-to-tr from-purple-500 to-violet-500 p-6 text-white select-none"
        >
            <h4 className="text-base font-bold">Premium details</h4>
            <p className="text-[10px] opacity-80">Interactive controls</p>
        </div>,
    ];

    if (name === 'carousel-basic') {
        return (
            <div className="w-full max-w-2xl py-4">
                <CarouselBasic
                    items={getMockCarouselCards()}
                    slidesPerView={2}
                />
            </div>
        );
    }

    if (name === 'carousel-fade') {
        return (
            <div className="w-full max-w-md py-4">
                <CarouselFade items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-3d') {
        return (
            <div className="w-full py-4">
                <Carousel3d items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-thumbs') {
        const thumbs = [
            <div
                key="t1"
                className="h-10 w-full bg-linear-to-tr from-pink-500 to-rose-500"
            />,
            <div
                key="t2"
                className="h-10 w-full bg-linear-to-tr from-amber-500 to-orange-500"
            />,
            <div
                key="t3"
                className="h-10 w-full bg-linear-to-tr from-emerald-500 to-teal-500"
            />,
            <div
                key="t4"
                className="h-10 w-full bg-linear-to-tr from-blue-500 to-indigo-500"
            />,
            <div
                key="t5"
                className="h-10 w-full bg-linear-to-tr from-purple-500 to-violet-500"
            />,
        ];

        return (
            <div className="w-full max-w-md py-4">
                <CarouselThumbs
                    items={getMockCarouselCards()}
                    thumbnails={thumbs}
                />
            </div>
        );
    }

    if (name === 'carousel-motion') {
        return (
            <div className="w-full max-w-2xl py-4">
                <CarouselMotion items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-cards') {
        return (
            <div className="flex w-full justify-center py-4">
                <CarouselCards items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-creative') {
        return (
            <div className="w-full max-w-md py-4">
                <CarouselCreative items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-auto-scroll') {
        const mockLogos = [
            <div
                key="l1"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                Next.js
            </div>,
            <div
                key="l2"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                Laravel
            </div>,
            <div
                key="l3"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                React
            </div>,
            <div
                key="l4"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                Tailwind
            </div>,
            <div
                key="l5"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                Vite
            </div>,
            <div
                key="l6"
                className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-6 text-xs font-bold select-none"
            >
                Inertia
            </div>,
        ];

        return (
            <div className="w-full py-4">
                <CarouselAutoScroll
                    items={mockLogos}
                    speed={2500}
                    spaceBetween={16}
                />
            </div>
        );
    }

    if (name === 'carousel-scale') {
        return (
            <div className="w-full py-4">
                <CarouselScale items={getMockCarouselCards()} />
            </div>
        );
    }

    if (name === 'carousel-vertical') {
        return (
            <div className="w-full max-w-md py-4">
                <CarouselVertical
                    items={getMockCarouselCards()}
                    height="200px"
                />
            </div>
        );
    }

    if (name === 'comparison-slider-basic') {
        return (
            <div className="w-full max-w-2xl py-4">
                <ComparisonSliderBasic
                    beforeImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
                    afterImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80&sat=100&contrast=120"
                    beforeLabel="Original (Raw)"
                    afterLabel="Vivid (Graded)"
                    aspectRatio="video"
                />
            </div>
        );
    }

    if (name === 'comparison-slider-vertical') {
        return (
            <div className="w-full max-w-md py-4">
                <ComparisonSliderVertical
                    beforeImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    afterImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&sat=-100"
                    beforeLabel="Landscape (Color)"
                    afterLabel="Landscape (B&W)"
                    aspectRatio="square"
                />
            </div>
        );
    }

    if (name === 'comparison-slider-hover') {
        return (
            <div className="w-full max-w-2xl py-4">
                <ComparisonSliderHover
                    beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    afterImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80&sat=-100"
                    beforeLabel="Portrait (Color)"
                    afterLabel="Portrait (B&W)"
                    aspectRatio="video"
                    resetOnLeave={false}
                />
            </div>
        );
    }

    if (name === 'comparison-slider-diagonal') {
        return (
            <div className="w-full max-w-2xl py-4">
                <ComparisonSliderDiagonal
                    beforeImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
                    afterImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80&sat=100&contrast=120"
                    beforeLabel="Original"
                    afterLabel="Vivid"
                    aspectRatio="video"
                    maxSkew={10}
                />
            </div>
        );
    }

    if (name === 'comparison-slider-three-way') {
        return (
            <div className="w-full max-w-2xl py-4">
                <ComparisonSliderThreeWay
                    leftImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80&sat=-100"
                    centerImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
                    rightImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80&sat=100&contrast=120"
                    leftLabel="Monochrome"
                    centerLabel="Original (Raw)"
                    rightLabel="Vivid (Graded)"
                    aspectRatio="video"
                />
            </div>
        );
    }

    const getMockTimelineItems = () => [
        {
            id: 1,
            title: 'Project Initialization',
            date: 'Jan 2026',
            description:
                'Established codebase structure, repository setup, database schema design, and configured initial project dependencies.',
            icon: <Terminal className="size-4" />,
            status: 'completed' as const,
            statusLabel: 'Completed',
            tags: ['setup', 'laravel', 'database'],
            subtasks: [
                {
                    title: 'Initialize Laravel framework codebase',
                    completed: true,
                },
                {
                    title: 'Configure database schema migrations',
                    completed: true,
                },
                { title: 'Install NPM package dependencies', completed: true },
            ],
        },
        {
            id: 2,
            title: 'Alpha Milestone',
            date: 'Mar 2026',
            description:
                'Developed core application features, established API routes, and connected Inertia React client frontend controllers.',
            icon: <Award className="size-4" />,
            status: 'completed' as const,
            statusLabel: 'Completed',
            tags: ['api', 'controllers', 'inertia'],
            subtasks: [
                {
                    title: 'Create backend service classes and models',
                    completed: true,
                },
                { title: 'Build React pages and layouts', completed: true },
                { title: 'Register Inertia page controllers', completed: true },
            ],
        },
        {
            id: 3,
            title: 'Security & QA Audit',
            date: 'May 2026',
            description:
                'Conducted comprehensive penetration testing, configured rate-limiting middleware, and resolved active diagnostics.',
            icon: <Shield className="size-4" />,
            status: 'current' as const,
            statusLabel: 'Active Audit',
            tags: ['security', 'testing', 'audit'],
            subtasks: [
                {
                    title: 'Perform manual codebase security audit',
                    completed: true,
                },
                {
                    title: 'Configure rate limiting middleware',
                    completed: false,
                },
                {
                    title: 'Resolve open static analysis warnings',
                    completed: false,
                },
            ],
        },
        {
            id: 4,
            title: 'Public Release',
            date: 'Jun 2026',
            description:
                'Deployed production-ready build to cloud environments and opened registration access to public beta waitlist.',
            icon: <Sparkles className="size-4" />,
            status: 'upcoming' as const,
            statusLabel: 'Planned',
            tags: ['deployment', 'beta', 'waitlist'],
            subtasks: [
                {
                    title: 'Compile production assets & bundle sizes',
                    completed: false,
                },
                {
                    title: 'Deploy to cloud cluster endpoints',
                    completed: false,
                },
                { title: 'Announce waitlist wait times', completed: false },
            ],
        },
    ];

    if (name === 'timeline-vertical') {
        return (
            <div className="flex w-full flex-col items-center gap-6 py-4">
                <TimelineVertical
                    items={getMockTimelineItems()}
                    align="left"
                    className="rounded-xl border bg-card"
                />
                <TimelineVertical
                    items={getMockTimelineItems()}
                    align="alternate"
                    className="rounded-xl border bg-card"
                />
            </div>
        );
    }

    if (name === 'timeline-horizontal') {
        return (
            <div className="w-full max-w-4xl rounded-xl border bg-card py-4">
                <TimelineHorizontal items={getMockTimelineItems()} />
            </div>
        );
    }

    if (name === 'timeline-motion') {
        return (
            <div className="flex w-full flex-col items-center gap-6 py-4">
                <TimelineMotion
                    items={getMockTimelineItems()}
                    align="alternate"
                    className="rounded-xl border bg-card"
                />
            </div>
        );
    }

    if (name === 'timeline-glow') {
        return (
            <div className="flex w-full flex-col items-center gap-6 py-4">
                <TimelineGlow
                    items={getMockTimelineItems()}
                    align="alternate"
                    className="rounded-xl border bg-card"
                />
            </div>
        );
    }

    if (name === 'timeline-collapsible') {
        return (
            <div className="flex w-full flex-col items-center gap-6 py-4">
                <TimelineCollapsible
                    items={getMockTimelineItems()}
                    defaultExpandedIds={[3]}
                    className="rounded-xl border bg-card"
                />
            </div>
        );
    }

    if (name === 'banner-floating') {
        return (
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-muted/10 p-6">
                <span className="text-xs text-muted-foreground">
                    Floating Banner Demo (Positioned relative to this container)
                </span>
                <BannerFloating
                    title="Interactive Workspace"
                    description="We've upgraded your development workspace with brand new premium components. Tap to explore."
                    actionLabel="Get Started"
                    onActionClick={() => alert('Action triggered!')}
                    position="bottom-right"
                    className="!absolute !right-4 !bottom-4"
                    icon={<Sparkles className="size-4.5 text-pink-500" />}
                />
            </div>
        );
    }

    if (name === 'banner-sticky') {
        return (
            <div className="flex w-full flex-col gap-4 overflow-hidden rounded-xl border bg-muted/10 py-4">
                <BannerSticky
                    message="⚡ System maintenance scheduled for Sunday, June 28 at 02:00 UTC."
                    actionLabel="View Details"
                    onActionClick={() =>
                        alert('Opening maintenance details...')
                    }
                    sticky={false}
                />
            </div>
        );
    }

    if (name === 'banner-sliding') {
        const mockSlidingMessages = [
            {
                id: 1,
                text: '🎉 Special Promo: Use code LAUNCH20 to get 20% off!',
                actionLabel: 'Apply code',
                onActionClick: () => alert('Applied code LAUNCH20!'),
            },
            {
                id: 2,
                text: '📦 Free standard shipping on all domestic orders over $50.',
                actionLabel: 'Shop now',
                onActionClick: () => alert('Redirecting to shop...'),
            },
            {
                id: 3,
                text: '🔒 Code audit completed successfully. View our security report.',
                actionLabel: 'Read report',
                onActionClick: () => alert('Loading security report...'),
            },
        ];

        return (
            <div className="w-full overflow-hidden rounded-xl border bg-muted/10 py-4">
                <BannerSliding messages={mockSlidingMessages} />
            </div>
        );
    }

    if (name === 'banner-expandable') {
        const mockDetailedContent = (
            <div className="space-y-3">
                <p className="font-semibold text-foreground">
                    What's new in version 2.4.0:
                </p>
                <ul className="list-disc space-y-1.5 pl-4">
                    <li>
                        Added 5 new comparison slider UI components for
                        before/after media showcasing.
                    </li>
                    <li>
                        Added 5 new timeline step and progress flow components
                        with spring scroll transitions.
                    </li>
                    <li>
                        Optimized asset loading bundles to reduce Initial Server
                        Response Time by 18%.
                    </li>
                </ul>
            </div>
        );

        return (
            <div className="w-full overflow-hidden rounded-xl border bg-muted/10 py-4">
                <BannerExpandable
                    title="🚀 Workspace Update: Version 2.4.0 is now live!"
                    description={mockDetailedContent}
                    badgeLabel="Update"
                />
            </div>
        );
    }

    if (name === 'banner-glow') {
        return (
            <div className="w-full overflow-hidden rounded-xl border bg-muted/10 py-4">
                <BannerGlow
                    message="✨ Introducing our new design system built for maximum efficiency and speed."
                    actionLabel="Explore System"
                    onActionClick={() =>
                        alert('Redirecting to design system...')
                    }
                />
            </div>
        );
    }

    const getMockReviews = () => [
        {
            id: 1,
            author: 'Sarah Jenkins',
            role: 'Product Lead',
            company: 'Acme Corp',
            rating: 5,
            comment:
                'This UI kit completely accelerated our development process. The attention to detail, clean typography, and smooth micro-animations are exceptional. Our team built a fully functional prototype in days rather than weeks.',
            date: 'June 2026',
            verified: true,
            tags: ['efficiency', 'design-system'],
        },
        {
            id: 2,
            author: 'Michael Chen',
            role: 'Senior Frontend Engineer',
            company: 'Stripe',
            rating: 4.8,
            comment:
                'The codebase is incredibly clean and follows React and Tailwind v4 best practices. Reusable components are lightweight and simple to extend. It integrates seamlessly with our Laravel Inertia setup.',
            date: 'May 2026',
            verified: true,
            tags: ['react', 'tailwind'],
        },
        {
            id: 3,
            author: 'Emily Watson',
            role: 'Creative Director',
            company: 'DesignCo',
            rating: 5,
            comment:
                'I am absolutely blown away by the design aesthetics. The animations feel premium, and the color palettes are incredibly balanced. It sets a new benchmark for UI kits.',
            date: 'May 2026',
            verified: true,
            tags: ['ux', 'premium'],
        },
        {
            id: 4,
            author: 'David Ross',
            role: 'Founder',
            company: 'SaaSify',
            rating: 5,
            comment:
                'As a non-designer founder, this kit helped me launch a stunning product that looks like it was designed by a world-class agency. Customer feedback on the UI has been amazing.',
            date: 'April 2026',
            verified: true,
            tags: ['startup', 'conversion'],
        },
        {
            id: 5,
            author: 'Sophia Martinez',
            role: 'UI Engineer',
            company: 'Vercel',
            rating: 4.9,
            comment:
                'The performance is outstanding. Components code-split efficiently and load instantaneously. Using semantic color tokens makes theme toggling work flawlessly.',
            date: 'April 2026',
            verified: true,
            tags: ['performance', 'theming'],
        },
    ];

    if (name === 'review-card') {
        return (
            <div className="w-full max-w-md py-4">
                <ReviewCard review={getMockReviews()[0]} showQuoteIcon />
            </div>
        );
    }

    if (name === 'review-grid') {
        return (
            <div className="w-full rounded-xl border bg-card py-4">
                <ReviewGrid reviews={getMockReviews()} columns={3} />
            </div>
        );
    }

    if (name === 'review-marquee') {
        return (
            <div className="w-full overflow-hidden rounded-xl border bg-card py-4">
                <ReviewMarquee
                    reviews={getMockReviews()}
                    speed="medium"
                    direction="left"
                />
            </div>
        );
    }

    if (name === 'review-masonry') {
        return (
            <div className="w-full rounded-xl border bg-card py-4">
                <ReviewMasonry reviews={getMockReviews()} columns={3} />
            </div>
        );
    }

    if (name === 'review-hero') {
        return (
            <div className="w-full rounded-xl border bg-card p-6 py-4">
                <ReviewHero review={getMockReviews()[0]} />
            </div>
        );
    }

    if (name === 'review-carousel') {
        return (
            <div className="w-full overflow-hidden rounded-xl border bg-card py-4">
                <ReviewCarousel reviews={getMockReviews()} slidesPerView={1} />
            </div>
        );
    }

    // 15. use-hover hook
    if (name === 'use-hover') {
        return <UseHoverPreview />;
    }

    // 16. use-dark-mode hook
    if (name === 'use-dark-mode') {
        return <UseDarkModePreview />;
    }

    // 17. use-headroom hook
    if (name === 'use-headroom') {
        return <UseHeadroomPreview />;
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

    if (name === 'pricing-glowing') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PricingGlowing />
            </div>
        );
    }

    if (name === 'pricing-comparison') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PricingComparison />
            </div>
        );
    }

    if (name === 'pricing-resources') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PricingResources />
            </div>
        );
    }

    if (name === 'pricing-modern-cards') {
        return (
            <div className="mx-auto w-full max-w-5xl">
                <PricingModernCards />
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
                <ButtonMagnetic>
                    Hover Me (Magnetic!)
                </ButtonMagnetic>
            </div>
        );
    }

    // 23. Button Shine
    if (name === 'button-shine') {
        return (
            <div className="grid min-h-[150px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonShine>
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
        return <InputNumberStepperPreview />;
    }

    // Button Neon
    if (name === 'button-neon') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonNeon>Neon Glow</ButtonNeon>
            </div>
        );
    }

    // Button Pulse
    if (name === 'button-pulse') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonPulse>Pulse Animation</ButtonPulse>
            </div>
        );
    }

    // Button Draw
    if (name === 'button-draw') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonDraw>Draw Border</ButtonDraw>
            </div>
        );
    }

    // Button Gradient
    if (name === 'button-gradient') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonGradient>Gradient Border</ButtonGradient>
            </div>
        );
    }

    // Button Ripple
    if (name === 'button-ripple') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonRipple>Click Me (Ripple!)</ButtonRipple>
            </div>
        );
    }

    // Button Arrow
    if (name === 'button-arrow') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonArrow>Explore More</ButtonArrow>
            </div>
        );
    }

    // Button Glowing Aura
    if (name === 'button-glowing-aura') {
        return (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-border/50 bg-card p-6">
                <ButtonGlowingAura auraColor="var(--color-chart-2)">Glowing Backlight</ButtonGlowingAura>
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

    // Tilt Card
    if (name === 'tilt-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <TiltCard className="max-w-xs text-left" maxTilt={20}>
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-foreground">
                                3D Tilt Interaction
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                                A physical-feeling card that rotates based on
                                cursor movements.
                            </p>
                        </div>
                    </div>
                </TiltCard>
            </div>
        );
    }

    // Reveal Card
    if (name === 'reveal-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <RevealCard className="max-w-xs text-left">
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Shield className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-foreground">
                                Reveal Border
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                                The border shines with a dynamic spotlight glow
                                tracking your mouse.
                            </p>
                        </div>
                    </div>
                </RevealCard>
            </div>
        );
    }

    // Neon Border Card
    if (name === 'neon-border-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <NeonBorderCard className="max-w-xs text-left">
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Terminal className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-foreground">
                                Neon Border
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                                A continuous rotating laser light beam
                                accentuates the card edge.
                            </p>
                        </div>
                    </div>
                </NeonBorderCard>
            </div>
        );
    }

    // Glass Glare Card
    if (name === 'glass-glare-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-neutral-950 p-6">
                <GlassGlareCard className="max-w-xs border-white/10 bg-white/[0.02] text-left">
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-white">
                            <Globe className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">
                                Glass Glare
                            </h4>
                            <p className="mt-1 text-xs text-zinc-400">
                                Frosted credit card glass styling with
                                reflections on hover.
                            </p>
                        </div>
                    </div>
                </GlassGlareCard>
            </div>
        );
    }

    // Expandable Card
    if (name === 'expandable-card') {
        return (
            <div className="grid min-h-[350px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <ExpandableCard
                    title="Expandable Layout"
                    description="Click to toggle details"
                    expandedContent={
                        <div className="space-y-2">
                            <p>
                                This details block slides open with an organic
                                layout transition.
                            </p>
                            <Button size="sm" className="w-full">
                                Interactive Action
                            </Button>
                        </div>
                    }
                    className="w-full max-w-sm"
                >
                    <p className="text-xs text-muted-foreground">
                        This space is always visible. The expansion is animated.
                    </p>
                </ExpandableCard>
            </div>
        );
    }

    // Parallax Image Card
    if (name === 'parallax-image-card') {
        return (
            <div className="grid min-h-[400px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <div className="w-full max-w-xs">
                    <ParallaxImageCard
                        imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                        imageAlt="Portrait"
                        parallaxStrength={20}
                    >
                        <h4 className="text-lg font-black tracking-tight uppercase">
                            Depth Effect
                        </h4>
                        <p className="text-xs opacity-80">
                            Move your cursor over the image to experience visual
                            depth.
                        </p>
                    </ParallaxImageCard>
                </div>
            </div>
        );
    }

    // Magnetic Card
    if (name === 'magnetic-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MagneticCard className="max-w-xs text-left" strength={20}>
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Heart className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-foreground">
                                Magnetic Card
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                                The card boundaries translation shifts towards
                                the mouse cursor.
                            </p>
                        </div>
                    </div>
                </MagneticCard>
            </div>
        );
    }

    // Metric Spark Card
    if (name === 'metric-spark-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MetricSparkCard
                    title="REVENUE GROWTH"
                    value="$84,293.00"
                    trend="+18.4%"
                    trendType="positive"
                    dataPoints={[20, 24, 22, 28, 26, 32, 38, 48]}
                    className="w-full max-w-sm"
                />
            </div>
        );
    }

    // Metric Progress Card
    if (name === 'metric-progress-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MetricProgressCard
                    title="QUARTERLY SALES TARGET"
                    value="$143,850.00"
                    progress={78.5}
                    targetLabel="Q2 Target"
                    targetValue="$180,000.00"
                    trend="+12.3% vs Target"
                    trendType="positive"
                    className="w-full max-w-sm"
                />
            </div>
        );
    }

    // Metric Comparison Card
    if (name === 'metric-comparison-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MetricComparisonCard
                    title="MONTHLY ACTIVE CONVERSIONS"
                    currentValue="4,829"
                    currentLabel="Current Month"
                    comparisonValue="3,412"
                    comparisonLabel="Previous Month"
                    ratio={4829 / 6000}
                    trend="+41.5%"
                    trendType="positive"
                    className="w-full max-w-sm"
                />
            </div>
        );
    }

    // Metric Breakdown Card
    if (name === 'metric-breakdown-card') {
        const breakdownItems = [
            { label: 'Organic Search', value: '45,829', percentage: 54, color: 'var(--color-primary)' },
            { label: 'Direct Traffic', value: '25,102', percentage: 30, color: 'var(--color-chart-1)' },
            { label: 'Referral Links', value: '13,382', percentage: 16, color: 'var(--color-chart-2)' },
        ];

        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MetricBreakdownCard
                    title="TRAFFIC ACQUISITION"
                    value="84,313 Visits"
                    trend="+24.1% MoM"
                    trendType="positive"
                    items={breakdownItems}
                    className="w-full max-w-lg"
                />
            </div>
        );
    }

    // Metric Radial Card
    if (name === 'metric-radial-card') {
        const radialItems = [
            { label: 'Completed Tasks', value: '84 / 100', percentage: 84, color: 'var(--color-primary)' },
            { label: 'Core Operations', value: '62 / 100', percentage: 62, color: 'var(--color-chart-1)' },
            { label: 'System Health', value: '95 / 100', percentage: 95, color: 'var(--color-chart-2)' },
        ];

        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <MetricRadialCard
                    title="DAILY WORKLOAD INTEGRITY"
                    value="Active Status"
                    items={radialItems}
                    className="w-full max-w-sm"
                />
            </div>
        );
    }

    // Split Preview Card
    if (name === 'split-preview-card') {
        const items = [
            {
                id: '1',
                label: 'Primary Spark',
                details: 'Full dynamic power core active',
                previewColor: 'var(--color-primary)',
                icon: <Sparkles className="size-6" />,
            },
            {
                id: '2',
                label: 'Shield Protection',
                details: 'Firewall integrity is stable',
                previewColor: 'var(--color-chart-1)',
                icon: <Shield className="size-6" />,
            },
            {
                id: '3',
                label: 'Global Server',
                details: 'Connecting node latency is 8ms',
                previewColor: 'var(--color-chart-2)',
                icon: <Globe className="size-6" />,
            },
        ];

        return (
            <div className="w-full max-w-xl py-4">
                <SplitPreviewCard items={items} />
            </div>
        );
    }

    // Grainy Noise Card
    if (name === 'grainy-noise-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-neutral-950 p-6">
                <GrainyNoiseCard
                    className="max-w-xs border-zinc-800 bg-zinc-900/60 text-left"
                    glowColor="rgba(99,102,241,0.25)"
                >
                    <div className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                            <Award className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-zinc-100">
                                Grainy Glass
                            </h4>
                            <p className="mt-1 text-xs text-zinc-400">
                                Frosted grain noise filter texture with a
                                glowing violet backlight.
                            </p>
                        </div>
                    </div>
                </GrainyNoiseCard>
            </div>
        );
    }

    // Scratch Card
    if (name === 'scratch-card') {
        return (
            <div className="grid min-h-[300px] w-full place-items-center rounded-xl border border-border/50 bg-background p-6">
                <ScratchCard className="flex h-36 w-64 flex-col items-center justify-center text-center">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-primary">
                            CONGRATULATIONS!
                        </span>
                        <h4 className="text-sm font-bold">
                            You Won $100 Gift Card
                        </h4>
                        <span className="text-[10px] text-muted-foreground">
                            Code: REVEAL100
                        </span>
                    </div>
                </ScratchCard>
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

    // Hero High Energy
    if (name === 'hero-high-energy') {
        return (
            <div className="w-full">
                <HeroHighEnergyImpact />
            </div>
        );
    }

    // Wrapper
    if (name === 'wrapper') {
        return (
            <div className="w-full py-4">
                <Wrapper className="border border-dashed border-primary/40 bg-muted/20 p-6 text-center rounded-xl">
                    <span className="font-mono text-xs text-muted-foreground">
                        [Wrapper Container Boundary (max-w-7xl, centered, padded)]
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-foreground">
                        Container Wrapper
                    </h4>
                    <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                        This layout component enforces unified gutters and maximum width limits across screen breakpoints.
                    </p>
                </Wrapper>
            </div>
        );
    }

    // Dropzone previews
    if (name === 'avatar-dropzone-badge') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <AvatarDropzoneBadge />
            </div>
        );
    }

    if (name === 'avatar-dropzone-card') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <AvatarDropzoneCard />
            </div>
        );
    }

    if (name === 'avatar-dropzone-field') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <AvatarDropzoneField />
            </div>
        );
    }

    if (name === 'avatar-dropzone-ghost') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <AvatarDropzoneGhost />
            </div>
        );
    }

    if (name === 'avatar-dropzone-inline') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <AvatarDropzoneInline />
            </div>
        );
    }

    if (name === 'avatar-dropzone-minimal') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <AvatarDropzoneMinimal />
            </div>
        );
    }

    if (name === 'avatar-dropzone-outlined') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <AvatarDropzoneOutlined />
            </div>
        );
    }

    if (name === 'avatar-dropzone-sortable-row') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <AvatarDropzoneSortableRow />
            </div>
        );
    }

    if (name === 'avatar-dropzone-sortable-stack') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <AvatarDropzoneSortableStack />
            </div>
        );
    }

    if (name === 'avatar-dropzone-square') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <AvatarDropzoneSquare />
            </div>
        );
    }

    if (name === 'gallery-dropzone-carousel') {
        return (
            <div className="mx-auto w-full max-w-xl py-4">
                <GalleryDropzoneCarousel />
            </div>
        );
    }

    if (name === 'gallery-dropzone-compact') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzoneCompact />
            </div>
        );
    }

    if (name === 'gallery-dropzone-dialog') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzoneDialog />
            </div>
        );
    }

    if (name === 'gallery-dropzone-list') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzoneList />
            </div>
        );
    }

    if (name === 'gallery-dropzone-masonry') {
        return (
            <div className="mx-auto w-full max-w-2xl py-4">
                <GalleryDropzoneMasonry />
            </div>
        );
    }

    if (name === 'gallery-dropzone-pills') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzonePills />
            </div>
        );
    }

    if (name === 'gallery-dropzone-simple') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzoneSimple />
            </div>
        );
    }

    if (name === 'gallery-dropzone-sortable-cards') {
        return (
            <div className="mx-auto w-full max-w-xl py-4">
                <GalleryDropzoneSortableCards />
            </div>
        );
    }

    if (name === 'gallery-dropzone-sortable-grid') {
        return (
            <div className="mx-auto w-full max-w-xl py-4">
                <GalleryDropzoneSortableGrid />
            </div>
        );
    }

    if (name === 'gallery-dropzone-sortable-list') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <GalleryDropzoneSortableList />
            </div>
        );
    }

    if (name === 'gallery-dropzone-table') {
        return (
            <div className="mx-auto w-full max-w-2xl py-4">
                <GalleryDropzoneTable />
            </div>
        );
    }

    if (name === 'faq-section') {
        return (
            <div className="mx-auto w-full py-4">
                <FAQSection />
            </div>
        );
    }

    if (name === 'testimonials-grid') {
        return (
            <div className="mx-auto w-full py-4">
                <TestimonialsGrid />
            </div>
        );
    }

    if (name === 'newsletter-box') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <NewsletterBox />
            </div>
        );
    }

    if (name === 'stats-grid') {
        return (
            <div className="mx-auto w-full py-4">
                <StatsGrid />
            </div>
        );
    }

    if (name === 'feature-list') {
        return (
            <div className="mx-auto w-full max-w-xl py-4">
                <FeatureList />
            </div>
        );
    }

    if (name === 'call-to-action-box') {
        return (
            <div className="mx-auto w-full py-4">
                <CallToActionBox />
            </div>
        );
    }

    if (name === 'pricing-table') {
        return (
            <div className="mx-auto w-full max-w-3xl py-4">
                <PricingTable />
            </div>
        );
    }

    if (name === 'user-profile-card') {
        return (
            <div className="mx-auto w-full max-w-sm py-4">
                <UserProfileCard />
            </div>
        );
    }

    if (name === 'activity-feed') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <ActivityFeed />
            </div>
        );
    }

    if (name === 'contact-form') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <ContactForm />
            </div>
        );
    }

    if (name === 'cookie-banner') {
        return (
            <div className="mx-auto w-full max-w-4xl py-4">
                <CookieBanner />
            </div>
        );
    }

    if (name === 'hero-simple-split') {
        return (
            <div className="mx-auto w-full py-4">
                <HeroSimpleSplit />
            </div>
        );
    }

    if (name === 'rainbow-border') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <RainbowBorder rounded="lg" glow={true} className="p-[2px]">
                    <div className="bg-background text-foreground px-6 py-3 rounded-[7px] text-sm font-semibold shadow-sm">
                        Rainbow Border Content
                    </div>
                </RainbowBorder>
            </div>
        );
    }

    if (name === 'rainbow-button') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <GradientButton className="h-10 px-6 rounded-md">
                    Rainbow Button
                </GradientButton>
            </div>
        );
    }

    if (name === 'rainbow-border-button') {
        return (
            <div className="grid min-h-[200px] w-full place-items-center rounded-xl border border-border/50 bg-card p-6">
                <RainbowBorderButton rounded="lg" glow={true}>
                    Rainbow Border Button
                </RainbowBorderButton>
            </div>
        );
    }

    if (name === 'rainbow-border-card') {
        return (
            <div className="mx-auto w-full max-w-md py-4">
                <RainbowBorderCard rounded="lg" glow={true}>
                    <CardHeader>
                        <CardTitle className="text-lg">Rainbow Card</CardTitle>
                        <CardDescription>A standard Card component wrapped in a customizable scrolling glow border.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs">
                        This card container is fully styled to match the dark/light mode configurations while showcasing a colorful border glow.
                    </CardContent>
                </RainbowBorderCard>
            </div>
        );
    }

    if (name === 'rainbow-border-input') {
        return (
            <div className="mx-auto w-full max-w-sm py-4">
                <RainbowBorderInput
                    rounded="md"
                    glow={true}
                    placeholder="Enter email address..."
                    type="email"
                />
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
