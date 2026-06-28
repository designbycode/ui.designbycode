'use client';

import React, { useState } from 'react';
import { Cpu, HardDrive, Check, Sparkles } from 'lucide-react';
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

export function PricingResources() {
    const [isYearly, setIsYearly] = useState(false);
    const [cpu, setCpu] = useState([2]); // 1 to 16 cores
    const [ram, setRam] = useState([4]); // 2 to 64 GB
    const [storage, setStorage] = useState([50]); // 10 to 1000 GB

    const calculateMonthlyPrice = () => {
        const cpuCost = cpu[0] * 8; // $8 per core
        const ramCost = ram[0] * 2.5; // $2.50 per GB RAM
        const storageCost = storage[0] * 0.15; // $0.15 per GB storage
        const total = cpuCost + ramCost + storageCost;
        const discountMultiplier = isYearly ? 0.8 : 1; // 20% discount
        return Math.round(total * discountMultiplier);
    };

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-12 @container">
            {/* Header */}
            <div className="max-w-2xl space-y-4 text-center">
                <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    <Sparkles className="mr-1.5 size-3.5 inline-block text-primary animate-pulse" />
                    Custom Calculator
                </Badge>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Configure Your Resources
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    Design a custom server container suited for your deployment. Move the sliders to scale CPU, RAM, and Storage.
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-8 @4xl:grid-cols-12 items-stretch">
                {/* Sliders Card */}
                <Card className="col-span-1 @4xl:col-span-7 border bg-card/65 backdrop-blur-xs p-6 shadow-md space-y-8 flex flex-col justify-between">
                    {/* CPU Sliders */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Cpu className="size-4 text-primary" />
                                vCPU Cores
                            </Label>
                            <span className="font-mono text-base font-bold text-foreground">
                                {cpu[0]} {cpu[0] === 1 ? 'Core' : 'Cores'}
                            </span>
                        </div>
                        <Slider
                            value={cpu}
                            onValueChange={setCpu}
                            min={1}
                            max={16}
                            step={1}
                            className="py-1"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                            <span>1 Core</span>
                            <span>8 Cores</span>
                            <span>16 Cores</span>
                        </div>
                    </div>

                    {/* RAM Sliders */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Cpu className="size-4 text-primary animate-pulse" />
                                Memory (RAM)
                            </Label>
                            <span className="font-mono text-base font-bold text-foreground">
                                {ram[0]} GB
                            </span>
                        </div>
                        <Slider
                            value={ram}
                            onValueChange={setRam}
                            min={2}
                            max={64}
                            step={2}
                            className="py-1"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                            <span>2 GB</span>
                            <span>32 GB</span>
                            <span>64 GB</span>
                        </div>
                    </div>

                    {/* Storage Slider */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <HardDrive className="size-4 text-primary" />
                                SSD Storage
                            </Label>
                            <span className="font-mono text-base font-bold text-foreground">
                                {storage[0]} GB
                            </span>
                        </div>
                        <Slider
                            value={storage}
                            onValueChange={setStorage}
                            min={10}
                            max={1000}
                            step={10}
                            className="py-1"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                            <span>10 GB</span>
                            <span>500 GB</span>
                            <span>1TB (1000 GB)</span>
                        </div>
                    </div>
                </Card>

                {/* Estimate & Checkout Card */}
                <Card className="col-span-1 @4xl:col-span-5 border border-primary bg-card/90 shadow-xl p-6 flex flex-col justify-between min-h-[380px]">
                    <div className="space-y-6">
                        <CardHeader className="p-0">
                            <CardTitle className="text-xl font-bold">Estimated Cost</CardTitle>
                            <CardDescription className="text-xs">Based on your selected vCPU, RAM, and Storage layout.</CardDescription>
                        </CardHeader>

                        {/* Price Display */}
                        <div className="py-4 border-y space-y-2">
                            <div className="flex items-baseline justify-center">
                                <span className="text-5xl font-black font-mono tracking-tight text-primary animate-pulse">
                                    ${calculateMonthlyPrice()}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">/month</span>
                            </div>

                            {/* Billing Switch */}
                            <div className="flex items-center justify-center gap-3 pt-3">
                                <span className={cn('text-xs font-semibold', !isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                                    Monthly
                                </span>
                                <Switch
                                    checked={isYearly}
                                    onCheckedChange={setIsYearly}
                                    className="scale-90"
                                />
                                <span className={cn('text-xs font-semibold flex items-center gap-1', isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                                    Yearly
                                    <Badge variant="secondary" className="bg-primary/15 text-primary text-[9px] py-0 px-1 border-0">
                                        -20%
                                    </Badge>
                                </span>
                            </div>
                        </div>

                        {/* Features checklist */}
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Dedicated host container nodes</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>99.99% network uptime SLA</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Automated daily snap backups</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 shrink-0 text-primary" />
                                <span>Unlimited incoming/outgoing bandwidth</span>
                            </li>
                        </ul>
                    </div>

                    <CardFooter className="p-0 pt-6">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                            Deploy Server Now
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default PricingResources;
