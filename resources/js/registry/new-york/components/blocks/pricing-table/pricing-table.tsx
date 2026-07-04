'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureRow {
    feature: string;
    free: boolean;
    pro: boolean;
}

const rows: FeatureRow[] = [
    { feature: 'Core Component Files', free: true, pro: true },
    { feature: 'Registry CLI installer', free: true, pro: true },
    { feature: 'Advanced Glitch shaders', free: false, pro: true },
    { feature: 'Unlimited workspaces', free: false, pro: true },
    { feature: 'Priority Help SLA', free: false, pro: true },
];

export function PricingTable() {
    return (
        <Card className="w-full border-border/50 bg-card/30 backdrop-blur-xs overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Feature Comparison
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border/30 bg-muted/20">
                                <th className="p-3 font-bold text-muted-foreground">Feature</th>
                                <th className="p-3 font-bold text-center w-24">Free</th>
                                <th className="p-3 font-bold text-center w-24 text-primary">Pro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx} className="border-b border-border/20 last:border-0 hover:bg-muted/10">
                                    <td className="p-3 font-semibold text-foreground">{row.feature}</td>
                                    <td className="p-3 text-center">
                                        {row.free ? <Check className="size-4 text-emerald-500 mx-auto" /> : <X className="size-4 text-muted-foreground/30 mx-auto" />}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.pro ? <Check className="size-4 text-primary mx-auto" /> : <X className="size-4 text-muted-foreground/30 mx-auto" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}

export default PricingTable;
