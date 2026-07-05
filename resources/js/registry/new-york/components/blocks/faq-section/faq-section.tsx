'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'How do I install registry themes in my application?',
        answer: 'You can install themes directly using the shadcn CLI commands shown on the theme details page. Choose your package manager (npm, pnpm, yarn, bun) and copy-paste the installer route command into your terminal.',
    },
    {
        question: 'Can I customize the colors and fonts after installing?',
        answer: 'Yes! Themes generate standard Tailwind CSS variables inside your global CSS file. You can adjust the HSL codes or change the font-family properties manually at any time to match your brand requirements.',
    },
    {
        question: 'Are there any external dependencies required?',
        answer: 'Most components and blocks are built natively using standard Radix UI primitives and Tailwind CSS. If a block requires a library (like recharts for graphs), it will be automatically handled or declared in the dependency manifest.',
    },
];

export function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <div className="mx-auto w-full max-w-3xl space-y-4">
            {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                    <Card
                        key={idx}
                        className={cn(
                            'overflow-hidden border-border/50 bg-card/30 backdrop-blur-xs transition-all duration-300',
                            isOpen && 'border-primary/20 bg-muted/10',
                        )}
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-xs font-bold transition-colors select-none hover:text-primary"
                        >
                            <span className="flex items-center gap-2">
                                <HelpCircle
                                    className={cn(
                                        'size-4 shrink-0 transition-colors',
                                        isOpen
                                            ? 'text-primary'
                                            : 'text-muted-foreground',
                                    )}
                                />
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={cn(
                                    'size-4 shrink-0 text-muted-foreground transition-transform duration-350',
                                    isOpen && 'rotate-180 text-primary',
                                )}
                            />
                        </button>
                        <div
                            className={cn(
                                'grid transition-all duration-350 ease-in-out',
                                isOpen
                                    ? 'grid-rows-[1fr] opacity-100'
                                    : 'grid-rows-[0fr] opacity-0',
                            )}
                        >
                            <div className="overflow-hidden">
                                <CardContent className="p-4 pt-0 text-xs leading-relaxed text-muted-foreground">
                                    {faq.answer}
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

export default FAQSection;
