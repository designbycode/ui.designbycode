'use client';

import { Check, Sparkles } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function PricingGlowing() {
    const [isYearly, setIsYearly] = useState(false);
    const [userCount, setUserCount] = useState([10]); // Slider state for number of team seats

    const getPrice = (basePrice: number) => {
        const multiplier = isYearly ? 0.8 : 1; // 20% discount
        const seats = userCount[0];
        const seatPrice = Math.max(0, (seats - 5) * 4); // Extra $4 per seat above 5 seats

        return Math.round((basePrice + seatPrice) * multiplier);
    };

    return (
        <div className="@container mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-12">
            {/* Header */}
            <div className="max-w-2xl space-y-4 text-center">
                <Badge
                    variant="outline"
                    className="animate-pulse border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    <Sparkles className="mr-1.5 inline-block size-3.5 text-primary" />
                    Scale-on-Demand Pricing
                </Badge>
                <h2 className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                    Pay Only For What You Use
                </h2>
                <p className="mx-auto max-w-lg text-sm text-muted-foreground">
                    Choose a plan built to grow with you. Adjust the seat slider
                    below to see how our volume discounts apply.
                </p>
            </div>

            {/* Slider Controls */}
            <Card className="w-full max-w-xl border bg-card/65 p-6 shadow-md backdrop-blur-xs">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-foreground">
                            Number of Seats
                        </Label>
                        <span className="font-mono text-lg font-bold text-primary">
                            {userCount[0]}{' '}
                            {userCount[0] === 1 ? 'user' : 'users'}
                        </span>
                    </div>
                    <Slider
                        value={userCount}
                        onValueChange={setUserCount}
                        min={1}
                        max={100}
                        step={1}
                        className="py-2"
                    />
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                        <span>1 Seat</span>
                        <span>50 Seats</span>
                        <span>100 Seats</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 border-t pt-4">
                        <span
                            className={cn(
                                'text-sm font-medium',
                                !isYearly
                                    ? 'text-foreground'
                                    : 'text-muted-foreground',
                            )}
                        >
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <span
                            className={cn(
                                'flex items-center gap-1.5 text-sm font-medium',
                                isYearly
                                    ? 'text-foreground'
                                    : 'text-muted-foreground',
                            )}
                        >
                            Yearly
                            <Badge
                                variant="secondary"
                                className="border-0 bg-primary/10 px-1.5 py-0 text-[10px] text-primary"
                            >
                                Save 20%
                            </Badge>
                        </span>
                    </div>
                </div>
            </Card>

            {/* Pricing Tiers Grid */}
            <div className="grid w-full grid-cols-1 gap-8 @3xl:grid-cols-3">
                {/* Standard / Hobby */}
                <Card className="relative flex flex-col justify-between overflow-hidden border bg-card/45 backdrop-blur-xs transition-all duration-300 hover:scale-[1.01]">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold">
                            Startup
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Ideal for small dev teams and initial projects.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="flex items-baseline">
                            <span className="font-mono text-4xl font-extrabold tracking-tight">
                                ${getPrice(15)}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground">
                                /month
                            </span>
                        </div>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Includes first 5 users</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>15 active repositories</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>25GB SSD Storage</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Weekly security scans</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Tier (Glowing/Popular) */}
                <Card className="relative flex flex-col justify-between overflow-hidden border-primary bg-card/60 shadow-lg ring-1 ring-primary backdrop-blur-xs transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-primary-foreground uppercase">
                        Popular
                    </div>
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold text-foreground">
                            Pro Team
                        </CardTitle>
                        <CardDescription className="text-xs">
                            For teams needing advanced scaling and metrics.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="flex items-baseline">
                            <span className="font-mono text-4xl font-extrabold tracking-tight text-primary">
                                ${getPrice(49)}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground">
                                /month
                            </span>
                        </div>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span className="font-semibold text-foreground">
                                    Custom seat scaling
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Unlimited repositories</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>200GB SSD Storage</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Realtime container metrics</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Daily automated backups</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
                            Upgrade to Pro
                        </Button>
                    </CardFooter>
                </Card>

                {/* Scale Tier */}
                <Card className="relative flex flex-col justify-between overflow-hidden border bg-card/45 backdrop-blur-xs transition-all duration-300 hover:scale-[1.01]">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold">
                            Scale Plan
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Tailored for corporate infrastructure and strict
                            SLA.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="flex items-baseline">
                            <span className="font-mono text-4xl font-extrabold tracking-tight">
                                ${getPrice(149)}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground">
                                /month
                            </span>
                        </div>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Dedicated isolated nodes</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>1TB SSD Storage</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>SAML SSO Integration</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>24/7 dedicated support SLA</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">
                            Contact Sales
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default PricingGlowing;
