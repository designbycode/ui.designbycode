'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useHover } from '@/registry/new-york/hooks/use-hover';

export interface ButtonGradientProps extends React.ComponentPropsWithRef<
    typeof Button
> {}

export const ButtonGradient = React.forwardRef<
    HTMLButtonElement,
    ButtonGradientProps
>(({ className, children, ...props }, ref) => {
    const { isHovered, hoverRef } = useHover();

    const combinedRef = React.useCallback(
        (node: HTMLButtonElement | null) => {
            hoverRef(node);

            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                (
                    ref as React.MutableRefObject<HTMLButtonElement | null>
                ).current = node;
            }
        },
        [ref, hoverRef],
    );

    return (
        <Button
            ref={combinedRef}
            className={cn(
                'relative border border-transparent text-foreground select-none active:scale-95',
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
});

ButtonGradient.displayName = 'ButtonGradient';

export default ButtonGradient;
