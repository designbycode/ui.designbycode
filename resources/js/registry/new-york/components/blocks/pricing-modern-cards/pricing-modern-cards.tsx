'use client';

import React, { useState } from 'react';
import { Check, Shield, Zap, Target, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface TierData {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    icon: React.ReactNode;
    features: { text: string; included: boolean }[];
    popular?: boolean;
    cta: string;
}

const tiers: TierData[] = [
    {
        name: 'Basic Dev',
        description: 'For students, hobbyists, and side projects.',
        monthlyPrice: 0,
        yearlyPrice: 0,
        icon: <Target className="size-5 text-muted-foreground" />,
        features: [
            { text: '1 active workspace node', included: true },
            { text: 'Basic error monitoring', included: true },
            { text: '1GB bandwidth limits', included: true },
            { text: 'Custom domains integration', included: false },
            { text: 'Priority Slack support', included: false },
        ],
        cta: 'Launch Free Node',
    },
    {
        name: 'Scale Up',
        description: 'Perfect for fast growing web applications.',
        monthlyPrice: 19,
        yearlyPrice: 15,
        icon: <Zap className="size-5 text-primary" />,
        features: [
            { text: '10 active workspace nodes', included: true },
            { text: 'Real-time telemetry reports', included: true },
            { text: '50GB bandwidth limits', included: true },
            { text: 'Custom domains integration', included: true },
            { text: 'Priority Slack support', included: false },
        ],
        popular: true,
        cta: 'Upgrade to Scale',
    },
    {
        name: 'Max Ops',
        description: 'High performance cluster infrastructure.',
        monthlyPrice: 89,
        yearlyPrice: 71,
        icon: <Shield className="size-5 text-primary" />,
        features: [
            { text: 'Unlimited active nodes', included: true },
            { text: 'Advanced security auditing', included: true },
            { text: 'Unlimited bandwidth limits', included: true },
            { text: 'Custom domains integration', included: true },
            { text: 'Priority Slack support (24/7)', included: true },
        ],
        cta: 'Contact Max Ops',
    },
];

export function PricingModernCards() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-12 @container">
            {/* Header */}
            <div className="max-w-2xl space-y-4 text-center">
                <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Predictable Plans
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                    Simple pricing. No hidden fees.
                </h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Choose the perfect subscription package for your workload. Cancel anytime.
                </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
                <span className={cn('text-sm font-semibold', !isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                    Monthly
                </span>
                <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                />
                <span className={cn('text-sm font-semibold flex items-center gap-1.5', isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                    Yearly
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] py-0 px-1.5 border-0">
                        2 months free
                    </Badge>
                </span>
            </div>

            {/* Grid */}
            <div className="grid w-full grid-cols-1 gap-6 @3xl:grid-cols-3 items-stretch">
                {tiers.map((tier, idx) => (
                    <Card
                        key={idx}
                        className={cn(
                            'relative flex flex-col justify-between overflow-hidden bg-card/45 backdrop-blur-xs border transition-all duration-300 hover:scale-[1.01]',
                            tier.popular ? 'border-primary ring-1 ring-primary/45 bg-card/60 shadow-lg' : 'shadow-sm'
                        )}
                    >
                        {tier.popular && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[8px] font-bold text-primary uppercase tracking-wider animate-pulse">
                                <Star className="size-2.5 fill-current text-primary" />
                                Recommended
                            </div>
                        )}

                        <CardHeader className="space-y-3 pb-6">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-muted/50 border shrink-0">
                                    {tier.icon}
                                </div>
                                <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                            </div>
                            <CardDescription className="text-xs min-h-[32px] leading-relaxed">
                                {tier.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6 flex-grow pb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-extrabold font-mono tracking-tight text-foreground">
                                    ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">/month</span>
                            </div>

                            <ul className="space-y-3 text-xs border-t pt-6">
                                {tier.features.map((feat, fIdx) => (
                                    <li
                                        key={fIdx}
                                        className={cn(
                                            'flex items-center gap-2',
                                            feat.included ? 'text-foreground' : 'text-muted-foreground/60 line-through'
                                        )}
                                    >
                                        <Check
                                            className={cn(
                                                'size-4 shrink-0',
                                                feat.included ? 'text-primary' : 'text-muted-foreground/30'
                                            )}
                                        />
                                        <span>{feat.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="pt-0">
                            <Button
                                className="w-full text-xs h-9"
                                variant={tier.popular ? 'default' : 'outline'}
                            >
                                {tier.cta}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default PricingModernCards;
