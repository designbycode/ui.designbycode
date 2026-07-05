import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ReviewItem} from './review-card';
import { ReviewCard } from './review-card';

interface ReviewGridProps extends React.HTMLAttributes<HTMLDivElement> {
    reviews: ReviewItem[];
    columns?: 1 | 2 | 3 | 4;
}

export function ReviewGrid({
    reviews,
    columns = 3,
    className,
    ...props
}: ReviewGridProps) {
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div
            className={cn(
                'mx-auto grid w-full max-w-7xl gap-6 px-4 py-8',
                columnClasses[columns],
                className,
            )}
            {...props}
        >
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showQuoteIcon />
            ))}
        </div>
    );
}
