'use client';

import { Check, X } from 'lucide-react';
import React from 'react';
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
        <Card className="w-full overflow-hidden border-border/50 bg-card/30 backdrop-blur-xs">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
                    Feature Comparison
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                        <thead>
                            <tr className="border-b border-border/30 bg-muted/20">
                                <th className="p-3 font-bold text-muted-foreground">
                                    Feature
                                </th>
                                <th className="w-24 p-3 text-center font-bold">
                                    Free
                                </th>
                                <th className="w-24 p-3 text-center font-bold text-primary">
                                    Pro
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-border/20 last:border-0 hover:bg-muted/10"
                                >
                                    <td className="p-3 font-semibold text-foreground">
                                        {row.feature}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.free ? (
                                            <Check className="mx-auto size-4 text-chart-2" />
                                        ) : (
                                            <X className="mx-auto size-4 text-muted-foreground/30" />
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.pro ? (
                                            <Check className="mx-auto size-4 text-primary" />
                                        ) : (
                                            <X className="mx-auto size-4 text-muted-foreground/30" />
                                        )}
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
