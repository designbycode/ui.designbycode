import { Check, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface PricingTier {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
    ctaText: string;
    popular?: boolean;
    ctaVariant?: 'default' | 'outline' | 'secondary';
}

const tiers: PricingTier[] = [
    {
        name: 'Hobby',
        description: 'Perfect for side projects and initial prototypes.',
        monthlyPrice: 9,
        yearlyPrice: 7,
        features: [
            'Up to 3 active projects',
            'Basic telemetry & alerts',
            '10GB monthly bandwidth',
            'Community forum support',
            'API access limit (60 req/min)',
        ],
        ctaText: 'Start for Free',
        ctaVariant: 'outline',
    },
    {
        name: 'Professional',
        description: 'For growing apps requiring advanced scaling & support.',
        monthlyPrice: 29,
        yearlyPrice: 24,
        features: [
            'Unlimited active projects',
            'Real-time detailed metrics',
            '100GB monthly bandwidth',
            'Priority 24/7 support',
            'Unlimited API access',
            'Custom domain integration',
            'Team collaboration (up to 5)',
        ],
        ctaText: 'Upgrade to Pro',
        popular: true,
        ctaVariant: 'default',
    },
    {
        name: 'Enterprise',
        description: 'Custom solutions for high scale corporate products.',
        monthlyPrice: 99,
        yearlyPrice: 79,
        features: [
            'Dedicated database nodes',
            'Custom SLA contracts',
            'Multi-region replication',
            'Dedicated account manager',
            'SSO/SAML Authentication',
            'Custom logging integrations',
            'Infinite team seats',
        ],
        ctaText: 'Contact Sales',
        ctaVariant: 'outline',
    },
];

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="@container mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-8">
            <div className="max-w-xl space-y-3 text-center">
                <Badge
                    variant="outline"
                    className="bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Flexible Pricing
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Fair Pricing for Everyone
                </h2>
                <p className="text-sm text-muted-foreground">
                    Get started with our free tiers and upgrade seamlessly as
                    your production needs grow. Cancel or change plans anytime.
                </p>
            </div>

            {/* Toggle switch for Monthly vs Yearly billing */}
            <div className="flex items-center gap-3 rounded-full border border-border/40 bg-muted/30 p-2.5 select-none">
                <Label
                    htmlFor="billing-period"
                    className={cn(
                        'cursor-pointer text-xs font-semibold transition-colors',
                        !isYearly ? 'text-foreground' : 'text-muted-foreground',
                    )}
                >
                    Monthly
                </Label>
                <Switch
                    id="billing-period"
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-primary"
                />
                <Label
                    htmlFor="billing-period"
                    className={cn(
                        'flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-colors',
                        isYearly ? 'text-foreground' : 'text-muted-foreground',
                    )}
                >
                    Yearly
                    <Badge
                        variant="secondary"
                        className="border border-primary/20 bg-primary/5 px-1 py-0 text-[9px] font-bold text-primary hover:bg-primary/10"
                    >
                        Save 20%
                    </Badge>
                </Label>
            </div>

            {/* Pricing cards grid */}
            <div className="grid w-full grid-cols-1 items-stretch gap-6 @3xl:grid-cols-3">
                {tiers.map((tier) => {
                    const price = isYearly
                        ? tier.yearlyPrice
                        : tier.monthlyPrice;

                    return (
                        <Card
                            key={tier.name}
                            className={cn(
                                'relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1',
                                tier.popular
                                    ? 'border-primary bg-card/65 shadow-lg ring-1 ring-primary/30'
                                    : 'border-border/50 bg-card/25 backdrop-blur-xs hover:border-border/80',
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                                    <Badge className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow-md hover:bg-primary">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <div>
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold">
                                        {tier.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1 min-h-[32px] text-xs">
                                        {tier.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Plan Price */}
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-4xl font-extrabold tracking-tight">
                                            ${price}
                                        </span>
                                        <span className="text-xs font-medium text-muted-foreground">
                                            / user / month
                                        </span>
                                    </div>

                                    {/* Features Checklist */}
                                    <ul className="space-y-3 text-xs text-foreground/85">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2"
                                            >
                                                <div
                                                    className={cn(
                                                        'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full',
                                                        tier.popular
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-muted text-muted-foreground',
                                                    )}
                                                >
                                                    <Check className="size-2.5 stroke-[3]" />
                                                </div>
                                                <span className="leading-snug">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </div>

                            <CardFooter className="pt-4">
                                <Button
                                    variant={tier.ctaVariant}
                                    className={cn(
                                        'w-full transition-transform active:scale-95',
                                        tier.popular &&
                                            'shadow-md shadow-primary/20',
                                    )}
                                >
                                    {tier.ctaText}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default PricingSection;
