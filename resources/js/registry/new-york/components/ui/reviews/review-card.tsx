import * as React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReviewItem {
    id: string | number;
    author: string;
    avatar?: string; // image URL or initial letter
    role?: string;
    company?: string;
    rating: number;
    comment: string;
    date?: string;
    verified?: boolean;
    tags?: string[];
}

interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
    review: ReviewItem;
    showQuoteIcon?: boolean;
}

export function ReviewCard({
    review,
    showQuoteIcon = false,
    className,
    ...props
}: ReviewCardProps) {
    const renderStars = (rating: number) => {
        const floor = Math.floor(rating);
        return (
            <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            'size-4 fill-current',
                            i >= floor &&
                                'fill-transparent text-muted-foreground/40 opacity-25',
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <div
            className={cn(
                'relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/65 p-6 shadow-xs backdrop-blur-md transition-all duration-300 select-none hover:border-primary/20 hover:shadow-md',
                className,
            )}
            {...props}
        >
            {/* Background Quote Mark */}
            {showQuoteIcon && (
                <span className="pointer-events-none absolute -top-3 -right-2 font-serif text-8xl font-bold text-primary/5 select-none">
                    “
                </span>
            )}

            <div className="space-y-4">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-4">
                    {renderStars(review.rating)}
                    {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle className="size-2.5 fill-current" />
                            Verified
                        </span>
                    )}
                </div>

                {/* Comment Text */}
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "{review.comment}"
                </p>
            </div>

            {/* Author Profile Footer */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/50 pt-4">
                <div className="flex items-center gap-3">
                    {review.avatar && review.avatar.startsWith('http') ? (
                        <img
                            src={review.avatar}
                            alt={review.author}
                            className="size-10 rounded-full border border-border object-cover"
                        />
                    ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-extrabold text-primary uppercase">
                            {review.avatar || review.author.charAt(0)}
                        </div>
                    )}

                    <div className="min-w-0 space-y-0.5 text-left">
                        <h4 className="truncate text-xs font-bold text-foreground">
                            {review.author}
                        </h4>
                        {(review.role || review.company) && (
                            <p className="truncate text-[10px] text-muted-foreground">
                                {review.role}{' '}
                                {review.company && `@ ${review.company}`}
                            </p>
                        )}
                    </div>
                </div>

                {review.date && (
                    <span className="shrink-0 text-[10px] font-medium text-muted-foreground/80">
                        {review.date}
                    </span>
                )}
            </div>

            {/* Pill tags */}
            {review.tags && review.tags.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1">
                    {review.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-border/20 bg-muted/60 px-2 py-0.5 text-[9px] font-medium text-muted-foreground/80"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
