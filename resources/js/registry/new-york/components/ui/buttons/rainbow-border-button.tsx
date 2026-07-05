'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RainbowBorder } from '@/registry/new-york/components/ui/borders/rainbow-border';

export interface RainbowBorderButtonProps extends React.ComponentProps<
    typeof Button
> {
    borderWidth?: string;
    animationDuration?: string;
    colors?: string[];
    rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
    glow?: boolean;
    glowBlur?: string;
    glowOpacity?: number;
}

export const RainbowBorderButton = React.forwardRef<
    HTMLButtonElement,
    RainbowBorderButtonProps
>(
    (
        {
            className,
            borderWidth = '2px',
            animationDuration = '3s',
            colors,
            rounded = 'md',
            glow = true,
            glowBlur = '30px',
            glowOpacity = 50,
            children,
            ...props
        },
        ref,
    ) => {
        const roundedButtonClass =
            rounded === 'none'
                ? 'rounded-none'
                : rounded === 'xs'
                  ? 'rounded-xs'
                  : rounded === 'sm'
                    ? 'rounded-sm'
                    : rounded === 'md'
                      ? 'rounded-md'
                      : rounded === 'lg'
                        ? 'rounded-lg'
                        : 'rounded-full';

        return (
            <RainbowBorder
                borderWidth={borderWidth}
                animationDuration={animationDuration}
                colors={colors}
                rounded={rounded}
                glow={glow}
                glowBlur={glowBlur}
                glowOpacity={glowOpacity}
                className="p-[1px]"
            >
                <Button
                    ref={ref}
                    className={cn(
                        'h-9 border-0 bg-background px-4 text-xs font-semibold text-foreground transition-all select-none hover:bg-background/95 active:scale-95',
                        roundedButtonClass,
                        className,
                    )}
                    {...props}
                >
                    {children}
                </Button>
            </RainbowBorder>
        );
    },
);

RainbowBorderButton.displayName = 'RainbowBorderButton';

export default RainbowBorderButton;
