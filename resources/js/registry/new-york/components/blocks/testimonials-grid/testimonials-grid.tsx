'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Testimonial {
    name: string;
    role: string;
    avatarText: string;
    content: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: 'Alex Rivera',
        role: 'Founder at DevFlow',
        avatarText: 'AR',
        content: 'This styling registry has completely transformed how our team develops dashboards. The ease of switching theme variables saved us weeks of design time.',
        rating: 5,
    },
    {
        name: 'Sarah Chen',
        role: 'Lead Frontend Architect',
        avatarText: 'SC',
        content: 'The component curation is incredible. Everything is built natively with shadcn guidelines and is highly responsive using tailwind container queries.',
        rating: 5,
    },
    {
        name: 'Marcus Brody',
        role: 'Product Designer at Peak',
        avatarText: 'MB',
        content: 'I love how clean the markup is. No redundant nesting, pure Tailwind CSS variables, and instant installation commands that work out of the box.',
        rating: 5,
    },
];

export function TestimonialsGrid() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((item, idx) => (
                    <Card key={idx} className="border-border/50 bg-card/30 backdrop-blur-xs relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                        <Quote className="absolute right-4 top-4 size-10 opacity-[0.03] text-foreground pointer-events-none" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Star key={i} className="size-3.5 fill-current" />
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs select-none">
                                    {item.avatarText}
                                </div>
                                <div className="min-w-0">
                                    <CardTitle className="text-xs font-bold text-foreground truncate">{item.name}</CardTitle>
                                    <CardDescription className="text-[9px] truncate">{item.role}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                "{item.content}"
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsGrid;
