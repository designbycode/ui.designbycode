'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type GradientDirection =
    | 'right'
    | 'left'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

interface GradientButtonProps extends React.ComponentProps<typeof Button> {
    colors?: string[];
    direction?: GradientDirection;
}

const directionMap: Record<GradientDirection, string> = {
    right: 'to right',
    left: 'to left',
    top: 'to top',
    bottom: 'to bottom',
    'top-left': 'to top left',
    'top-right': 'to top right',
    'bottom-left': 'to bottom left',
    'bottom-right': 'to bottom right',
};

const GradientButton = ({
    className,
    colors,
    direction = 'right',
    ...props
}: GradientButtonProps) => {
    const gradientColors = colors ?? [
        'var(--color-primary)',
        'var(--color-secondary)',
    ];
    const gradient = `linear-gradient(${directionMap[direction]}, ${gradientColors.join(', ')})`;

    return (
        <Button
            className={cn(
                'border-0 text-primary-foreground transition-all duration-300 hover:scale-105 dark:text-foreground',
                className,
            )}
            style={{
                background: gradient,
            }}
            {...props}
        />
    );
};

export { GradientButton };
export default GradientButton;
