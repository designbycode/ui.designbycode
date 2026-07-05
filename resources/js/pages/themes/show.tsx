'use client';

import { usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import MainWrapper from '@/layouts/main/main-wrapper';
import { PackageManagerCode } from '@/layouts/main/theme/main-package-manager-code';
import MainThemeCard from '@/layouts/main/theme/main-theme-card';
import ThemeLayout from '@/layouts/theme-layout';

import ActivityFeed from '@/registry/new-york/components/blocks/activity-feed/activity-feed';
import BookingForm from '@/registry/new-york/components/blocks/booking-form/booking-form';
import CallToActionBox from '@/registry/new-york/components/blocks/call-to-action-box/call-to-action-box';
import CardsStats from '@/registry/new-york/components/blocks/cards-stats/cards-stats';
import ContactForm from '@/registry/new-york/components/blocks/contact-form/contact-form';
import CookieBanner from '@/registry/new-york/components/blocks/cookie-banner/cookie-banner';
import FAQSection from '@/registry/new-york/components/blocks/faq-section/faq-section';
import FeatureGrid from '@/registry/new-york/components/blocks/feature-grid/feature-grid';
import FeatureList from '@/registry/new-york/components/blocks/feature-list/feature-list';
import HeroSimpleSplit from '@/registry/new-york/components/blocks/hero-simple-split/hero-simple-split';
import NewsletterBox from '@/registry/new-york/components/blocks/newsletter-box/newsletter-box';
import PricingModernCards from '@/registry/new-york/components/blocks/pricing-modern-cards/pricing-modern-cards';
import PricingTable from '@/registry/new-york/components/blocks/pricing-table/pricing-table';
import StatsGrid from '@/registry/new-york/components/blocks/stats-grid/stats-grid';
import TestimonialsGrid from '@/registry/new-york/components/blocks/testimonials-grid/testimonials-grid';
import UserProfileCard from '@/registry/new-york/components/blocks/user-profile-card/user-profile-card';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import type { Registry } from '@/types';

interface ThemesShowProps {
    theme: Registry;
}

export function ThemeShow({ theme }: ThemesShowProps) {
    const { url } = usePage().props;
    const installerCode = `${url}/r/themes/${theme.name}.json`;

    const codes = {
        bun: `bunx --bun shadcn@latest add ${installerCode}`,
        npm: `npx shadcn@latest add ${installerCode}`,
        pnpm: `pnpm dlx shadcn@latest add ${installerCode}`,
        yarn: `yarn dlx shadcn@latest add ${installerCode}`,
    };

    return (
        <div className="relative min-h-screen bg-background pb-32 text-foreground">
            {/* The unaltered #hero block */}
            <div
                id={`hero`}
                className={`flex min-h-[600px] items-center bg-background text-foreground`}
            >
                <MainWrapper
                    className={`grid grid-cols-1 gap-6 md:grid-cols-3`}
                >
                    <div className={`col-span-2`}>
                        <HeadingBlock
                            badge={
                                theme.author
                                    ? {
                                          text: theme.author,
                                          icon: CheckCircle,
                                      }
                                    : undefined
                            }
                            heading={<>Theme {theme.title}</>}
                            headClassName={`capabilities font-black`}
                            description={theme.description ?? undefined}
                        />
                        <PackageManagerCode
                            codes={codes}
                            className={`max-w-4xl`}
                        />
                    </div>
                    <div>
                        <MainThemeCard theme={theme} />
                    </div>
                </MainWrapper>
            </div>

            {/* Vertical Stacked SaaS Website Sections */}
            <div className="mt-12 space-y-28">
                {/* Intro Section */}
                <MainWrapper>
                    <HeroSimpleSplit />
                </MainWrapper>

                {/* Highlights Stats Section */}
                <MainWrapper>
                    <StatsGrid />
                </MainWrapper>

                {/* Section 1: Features Grid */}
                <MainWrapper>
                    <div className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Platform Core Features
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Built to scale your operations without performance
                            bottlenecks or infrastructure constraints.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-card/20 p-2 backdrop-blur-xs">
                        <FeatureGrid />
                    </div>
                </MainWrapper>

                {/* Section 2: Analytics & Stats */}
                <MainWrapper>
                    <div className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Enterprise Analytics Metrics
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Observe real-time operations, active subscriptions,
                            and page metrics with this theme active.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-card/20 p-4 backdrop-blur-xs">
                        <CardsStats />
                    </div>
                </MainWrapper>

                {/* Checklist & Activity Split Grid */}
                <MainWrapper>
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
                        <div className="space-y-6">
                            <FeatureList />
                            <NewsletterBox />
                        </div>
                        <div>
                            <ActivityFeed />
                        </div>
                    </div>
                </MainWrapper>

                {/* Section 3: Subscription Pricing & Full Feature Comparison */}
                <MainWrapper className="space-y-12">
                    <div className="mx-auto max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Pricing Plans for Every Scale
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Select a pricing model that scales seamlessly with
                            your user volume.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-card/20 p-6 backdrop-blur-xs">
                        <PricingModernCards />
                    </div>
                    <div className="mx-auto max-w-3xl">
                        <PricingTable />
                    </div>
                </MainWrapper>

                {/* Section 4: Checkout & Profile Forms */}
                <MainWrapper className="space-y-12">
                    <div className="mx-auto max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Secure Reservation Checkout
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Preview custom form input parameters and border
                            radius curvatures.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="rounded-xl border border-border/40 bg-card/20 p-6 backdrop-blur-xs">
                                <BookingForm />
                            </div>
                        </div>
                        <div className="space-y-6 lg:col-span-5">
                            <UserProfileCard />
                            <ContactForm />
                        </div>
                    </div>
                </MainWrapper>

                {/* Section 5: Testimonials Grid */}
                <MainWrapper>
                    <div className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Customer Testimonials
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            See what lead engineers and product architects think
                            of our styled systems.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-card/20 p-6 backdrop-blur-xs">
                        <TestimonialsGrid />
                    </div>
                </MainWrapper>

                {/* Section 6: FAQ Accordion */}
                <MainWrapper>
                    <div className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
                        <h3 className="text-3xl font-black tracking-tight">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Got questions about installing and configuring
                            visual registry themes? We have answers.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-card/20 p-6 backdrop-blur-xs">
                        <FAQSection />
                    </div>
                </MainWrapper>

                {/* Conversion Banner Section */}
                <MainWrapper>
                    <CallToActionBox />
                </MainWrapper>
            </div>

            {/* Bottom Cookie Banner */}
            <div className="pointer-events-auto fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl px-4">
                <CookieBanner />
            </div>
        </div>
    );
}

ThemeShow.layout = ThemeLayout;
export default ThemeShow;
