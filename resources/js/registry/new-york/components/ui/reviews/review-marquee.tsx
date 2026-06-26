import * as React from 'react';
import { cn } from '@/lib/utils';
import { ReviewItem, ReviewCard } from './review-card';

interface ReviewMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    reviews: ReviewItem[];
    speed?: 'slow' | 'medium' | 'fast';
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
}

export function ReviewMarquee({
    reviews,
    speed = 'medium',
    direction = 'left',
    pauseOnHover = true,
    className,
    ...props
}: ReviewMarqueeProps) {
    const speedClasses = {
        slow: '[animation-duration:55s]',
        medium: '[animation-duration:35s]',
        fast: '[animation-duration:20s]',
    };

    const directionClasses = {
        left: 'animate-marquee flex-row',
        right: 'animate-marquee flex-row [animation-direction:reverse]',
    };

    // Duplicate reviews to fill the scrolling track cleanly
    const doubledReviews = [...reviews, ...reviews];

    return (
        <div
            className={cn(
                'mask-image-horizontal relative flex w-full overflow-x-hidden py-8 select-none',
                className,
            )}
            {...props}
        >
            {/* Masking visual fades on edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

            <div
                className={cn(
                    'flex w-max shrink-0 gap-6',
                    directionClasses[direction],
                    speedClasses[speed],
                    pauseOnHover && 'hover:[animation-play-state:paused]',
                )}
            >
                {doubledReviews.map((review, index) => (
                    <ReviewCard
                        key={`${review.id}-${index}`}
                        review={review}
                        className="w-[300px] shrink-0 md:w-[360px]"
                    />
                ))}
            </div>
        </div>
    );
}
