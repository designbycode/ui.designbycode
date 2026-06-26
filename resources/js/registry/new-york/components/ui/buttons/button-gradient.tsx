'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ButtonGradientProps extends React.ComponentPropsWithRef<typeof Button> {}

export const ButtonGradient = React.forwardRef<HTMLButtonElement, ButtonGradientProps>(
    ({ className, children, ...props }, ref) => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <Button
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    'relative select-none active:scale-95 border border-transparent text-foreground',
                    className,
                )}
                style={{
                    backgroundImage: isHovered
                        ? 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, var(--color-chart-3), var(--color-chart-1), var(--color-chart-5))'
                        : 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, var(--color-chart-1), var(--color-chart-5), var(--color-chart-3))',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                }}
                {...props}
            >
                {children}
            </Button>
        );
    },
);

ButtonGradient.displayName = 'ButtonGradient';

export default ButtonGradient;
