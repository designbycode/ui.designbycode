'use client';

import React, { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

interface ComparisonFeature {
    name: string;
    description?: string;
    hobby: React.ReactNode;
    pro: React.ReactNode;
    enterprise: React.ReactNode;
}

interface FeatureSection {
    category: string;
    features: ComparisonFeature[];
}

const comparisonData: FeatureSection[] = [
    {
        category: 'Workspace & Projects',
        features: [
            { name: 'Active Projects', hobby: 'Up to 3', pro: 'Unlimited', enterprise: 'Unlimited (Isolated Node)' },
            { name: 'Monthly bandwidth', hobby: '10GB', pro: '100GB', enterprise: 'Unlimited' },
            { name: 'SSD Storage', hobby: '5GB', pro: '50GB', enterprise: 'Custom Capacity' },
            { name: 'Team Collaboration Seats', hobby: '1 seat', pro: 'Up to 5 seats', enterprise: 'Infinite' },
        ],
    },
    {
        category: 'Metrics & Observability',
        features: [
            { name: 'Telemetry resolution', hobby: '5 mins', pro: 'Realtime (1s)', enterprise: 'Realtime (sub-second)' },
            { name: 'Log Retention', hobby: '7 days', pro: '30 days', enterprise: '365 days' },
            { name: 'Custom Alert Triggers', hobby: <Minus className="size-4 text-muted-foreground" />, pro: <Check className="size-4 text-primary" />, enterprise: <Check className="size-4 text-primary" /> },
            { name: 'Grafana & Datadog exports', hobby: <X className="size-4 text-destructive" />, pro: <Check className="size-4 text-primary" />, enterprise: <Check className="size-4 text-primary" /> },
        ],
    },
    {
        category: 'Security & SLA',
        features: [
            { name: 'Weekly vulnerability scans', hobby: <Check className="size-4 text-primary" />, pro: <Check className="size-4 text-primary" />, enterprise: <Check className="size-4 text-primary" /> },
            { name: 'SAML / SSO Authentications', hobby: <X className="size-4 text-destructive" />, pro: <Minus className="size-4 text-muted-foreground" />, enterprise: <Check className="size-4 text-primary" /> },
            { name: 'Support Channels', hobby: 'Community Forum', pro: 'Priority Email', enterprise: 'Dedicated Slack + 99.9% SLA' },
        ],
    },
];

export function PricingComparison() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-12 @container">
            {/* Header */}
            <div className="max-w-2xl space-y-4 text-center">
                <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Feature Comparison
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Compare Plans & Features
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Deep dive into all features to choose the exact plan that suits your production and compliance requirements.
                </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-4">
                <span className={cn('text-sm font-medium', !isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                    Monthly Billing
                </span>
                <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                />
                <span className={cn('text-sm font-medium flex items-center gap-1.5', isYearly ? 'text-foreground' : 'text-muted-foreground')}>
                    Yearly Billing
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] py-0 px-1.5 border-0">
                        Save 20%
                    </Badge>
                </span>
            </div>

            {/* Comparison Table */}
            <div className="w-full overflow-x-auto rounded-xl border bg-card/50 shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[30%] min-w-[200px] font-bold text-foreground">Features</TableHead>
                            <TableHead className="w-[23%] text-center">
                                <div className="space-y-1 py-2">
                                    <h4 className="font-bold text-foreground text-sm">Hobby</h4>
                                    <div className="font-mono text-base font-extrabold text-foreground">
                                        ${isYearly ? 7 : 9}
                                        <span className="text-[10px] text-muted-foreground font-normal">/mo</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-2 w-full max-w-[120px] text-xs h-7">
                                        Get Started
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead className="w-[24%] text-center bg-primary/5">
                                <div className="space-y-1 py-2">
                                    <div className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider">
                                        Popular
                                    </div>
                                    <h4 className="font-bold text-foreground text-sm">Professional</h4>
                                    <div className="font-mono text-base font-extrabold text-primary">
                                        ${isYearly ? 24 : 29}
                                        <span className="text-[10px] text-muted-foreground font-normal">/mo</span>
                                    </div>
                                    <Button size="sm" className="mt-2 w-full max-w-[120px] text-xs h-7 bg-primary text-primary-foreground hover:bg-primary/90">
                                        Choose Pro
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead className="w-[23%] text-center">
                                <div className="space-y-1 py-2">
                                    <h4 className="font-bold text-foreground text-sm">Enterprise</h4>
                                    <div className="font-mono text-base font-extrabold text-foreground">
                                        ${isYearly ? 79 : 99}
                                        <span className="text-[10px] text-muted-foreground font-normal">/mo</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-2 w-full max-w-[120px] text-xs h-7">
                                        Contact Sales
                                    </Button>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {comparisonData.map((section, sIdx) => (
                            <React.Fragment key={sIdx}>
                                {/* Category Header */}
                                <TableRow className="bg-muted/30 hover:bg-muted/30 font-semibold text-xs tracking-wider uppercase text-muted-foreground">
                                    <TableCell colSpan={4} className="py-2.5 pl-4 align-middle">
                                        {section.category}
                                    </TableCell>
                                </TableRow>

                                {/* Features rows */}
                                {section.features.map((feature, fIdx) => (
                                    <TableRow key={fIdx} className="hover:bg-muted/10 transition-colors">
                                        <TableCell className="font-medium text-foreground py-3 pl-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span>{feature.name}</span>
                                                {feature.description && (
                                                    <span className="text-[10px] text-muted-foreground font-normal leading-normal">
                                                        {feature.description}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-medium text-xs py-3">
                                            <div className="flex items-center justify-center">
                                                {feature.hobby}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-xs py-3 bg-primary/5">
                                            <div className="flex items-center justify-center">
                                                {feature.pro}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-medium text-xs py-3">
                                            <div className="flex items-center justify-center">
                                                {feature.enterprise}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default PricingComparison;
