'use client';

import * as React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ReviewItem } from './review-card';

interface ReviewHeroProps extends React.ComponentProps<typeof Card> {
    review: ReviewItem;
}

export function ReviewHero({ review, className, ...props }: ReviewHeroProps) {
    const renderStars = (rating: number) => {
        const floor = Math.floor(rating);
        return (
            <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            'size-5 fill-current',
                            i >= floor &&
                                'fill-transparent text-muted-foreground/40 opacity-25',
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <Card
            className={cn(
                'relative mx-auto flex max-w-4xl flex-col justify-between overflow-hidden bg-card/45 p-8 shadow-xl backdrop-blur-md select-none md:p-12',
                className,
            )}
            {...props}
        >
            {/* Ambient Radial Backlight Glow */}
            <div className="pointer-events-none absolute -top-36 -right-36 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-36 -left-36 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />

            {/* Giant quote mark backdrop */}
            <span className="pointer-events-none absolute top-4 left-6 font-serif text-[180px] leading-none font-bold text-primary/8 select-none">
                “
            </span>

            <div className="relative z-10 space-y-6 pt-8">
                {/* Rating stars */}
                <div className="flex items-center gap-4">
                    {renderStars(review.rating)}
                    {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-600">
                            <CheckCircle className="size-3 fill-current" />
                            Verified Customer Feedback
                        </span>
                    )}
                </div>

                {/* Big testimonial quotation comment */}
                <blockquote className="text-lg leading-relaxed font-medium text-foreground italic md:text-xl">
                    "{review.comment}"
                </blockquote>
            </div>

            {/* Author Profile and Details */}
            <div className="relative z-10 mt-8 flex flex-col justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    {review.avatar && review.avatar.startsWith('http') ? (
                        <img
                            src={review.avatar}
                            alt={review.author}
                            className="size-12 rounded-full border border-border object-cover"
                        />
                    ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-base font-extrabold text-primary uppercase">
                            {review.avatar || review.author.charAt(0)}
                        </div>
                    )}

                    <div className="min-w-0 space-y-1 text-left">
                        <h4 className="truncate text-sm font-bold text-foreground">
                            {review.author}
                        </h4>
                        {(review.role || review.company) && (
                            <p className="truncate text-xs text-muted-foreground">
                                {review.role}{' '}
                                {review.company && `at ${review.company}`}
                            </p>
                        )}
                    </div>
                </div>

                {review.date && (
                    <span className="shrink-0 text-xs font-semibold text-muted-foreground/80">
                        {review.date}
                    </span>
                )}
            </div>

            {/* Tags display */}
            {review.tags && review.tags.length > 0 && (
                <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md border border-border/30 bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </Card>
    );
}

export default ReviewHero;
