import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InteractiveRatingProps {
    maxRating?: number;
    defaultRating?: number;
    onChange?: (rating: number) => void;
    className?: string;
}

export function InteractiveRating({
    maxRating = 5,
    defaultRating = 0,
    onChange,
    className,
}: InteractiveRatingProps) {
    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleSelect = (val: number) => {
        setRating(val);
        if (onChange) {
            onChange(val);
        }
    };

    return (
        <div className={cn('flex items-center gap-1 select-none', className)}>
            {[...Array(maxRating)].map((_, i) => {
                const starVal = i + 1;
                const isActive =
                    hoverRating !== null
                        ? starVal <= hoverRating
                        : starVal <= rating;
                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleSelect(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="cursor-pointer transition-transform duration-100 hover:scale-115 focus:outline-hidden active:scale-95"
                    >
                        <Star
                            className={cn(
                                'size-5 transition-colors duration-150',
                                isActive
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'text-muted-foreground/35 hover:text-muted-foreground/60',
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}

export default InteractiveRating;
