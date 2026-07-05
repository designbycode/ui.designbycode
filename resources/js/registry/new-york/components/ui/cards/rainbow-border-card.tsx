'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { RainbowBorder } from '@/registry/new-york/components/ui/borders/rainbow-border';

export interface RainbowBorderCardProps extends React.ComponentProps<
    typeof Card
> {
    borderWidth?: string;
    animationDuration?: string;
    colors?: string[];
    rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
    glow?: boolean;
    glowBlur?: string;
    glowOpacity?: number;
}

export const RainbowBorderCard = React.forwardRef<
    HTMLDivElement,
    RainbowBorderCardProps
>(
    (
        {
            className,
            borderWidth = '2px',
            animationDuration = '4s',
            colors,
            rounded = 'lg',
            glow = true,
            glowBlur = '40px',
            glowOpacity = 40,
            children,
            ...props
        },
        ref,
    ) => {
        const roundedCardClass =
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
                className="w-full p-[1px]"
            >
                <Card
                    ref={ref}
                    className={cn(
                        'w-full border-0 bg-card text-card-foreground shadow-sm',
                        roundedCardClass,
                        className,
                    )}
                    {...props}
                >
                    {children}
                </Card>
            </RainbowBorder>
        );
    },
);

RainbowBorderCard.displayName = 'RainbowBorderCard';

export default RainbowBorderCard;
