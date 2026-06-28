'use client';

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-12 @container">
            {/* Header */}
            <div className="max-w-2xl space-y-4 text-center">
                <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase animate-pulse"
                >
                    <Sparkles className="mr-1.5 size-3.5 inline-block text-primary" />
                    Scale-on-Demand Pricing
                </Badge>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                    Pay Only For What You Use
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    Choose a plan built to grow with you. Adjust the seat slider below to see how our volume discounts apply.
                </p>
            </div>

            {/* Slider Controls */}
            <Card className="w-full max-w-xl border bg-card/65 backdrop-blur-xs p-6 shadow-md">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-foreground">
                            Number of Seats
                        </Label>
                        <span className="font-mono text-lg font-bold text-primary">
                            {userCount[0]} {userCount[0] === 1 ? 'user' : 'users'}
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
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>1 Seat</span>
                        <span>50 Seats</span>
                        <span>100 Seats</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-4 border-t">
                        <span className={cn('text-sm font-medium', !isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <span className={cn('text-sm font-medium flex items-center gap-1.5', isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                            Yearly
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] py-0 px-1.5 border-0">
                                Save 20%
                            </Badge>
                        </span>
                    </div>
                </div>
            </Card>

            {/* Pricing Tiers Grid */}
            <div className="grid w-full grid-cols-1 gap-8 @3xl:grid-cols-3">
                {/* Standard / Hobby */}
                <Card className="relative flex flex-col justify-between overflow-hidden bg-card/45 backdrop-blur-xs border transition-all duration-300 hover:scale-[1.01]">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold">Startup</CardTitle>
                        <CardDescription className="text-xs">Ideal for small dev teams and initial projects.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-grow">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-extrabold font-mono tracking-tight">
                                ${getPrice(15)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">/month</span>
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
                <Card className="relative flex flex-col justify-between overflow-hidden bg-card/60 backdrop-blur-xs border-primary shadow-lg ring-1 ring-primary transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-mono text-[9px] font-bold text-primary-foreground uppercase tracking-widest">
                        Popular
                    </div>
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold text-foreground">Pro Team</CardTitle>
                        <CardDescription className="text-xs">For teams needing advanced scaling and metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-grow">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-extrabold font-mono tracking-tight text-primary">
                                ${getPrice(49)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">/month</span>
                        </div>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span className="font-semibold text-foreground">Custom seat scaling</span>
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
                        <Button className="w-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                            Upgrade to Pro
                        </Button>
                    </CardFooter>
                </Card>

                {/* Scale Tier */}
                <Card className="relative flex flex-col justify-between overflow-hidden bg-card/45 backdrop-blur-xs border transition-all duration-300 hover:scale-[1.01]">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl font-bold">Scale Plan</CardTitle>
                        <CardDescription className="text-xs">Tailored for corporate infrastructure and strict SLA.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-grow">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-extrabold font-mono tracking-tight">
                                ${getPrice(149)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">/month</span>
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
