import * as React from 'react';
import { cn } from '@/lib/utils';
import { ReviewItem, ReviewCard } from './review-card';

interface ReviewMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    reviews: ReviewItem[];
    columns?: 1 | 2 | 3 | 4;
}

export function ReviewMasonry({
    reviews,
    columns = 3,
    className,
    ...props
}: ReviewMasonryProps) {
    const columnClasses = {
        1: 'columns-1',
        2: 'columns-1 md:columns-2',
        3: 'columns-1 md:columns-2 lg:columns-3',
        4: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4',
    };

    return (
        <div
            className={cn(
                'mx-auto w-full max-w-7xl gap-6 px-4 py-8',
                columnClasses[columns],
                className,
            )}
            {...props}
        >
            {reviews.map((review) => (
                <div key={review.id} className="mb-6 break-inside-avoid">
                    <ReviewCard review={review} showQuoteIcon />
                </div>
            ))}
        </div>
    );
}
