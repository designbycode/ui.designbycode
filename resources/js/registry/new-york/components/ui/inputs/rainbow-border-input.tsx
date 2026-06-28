'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { RainbowBorder } from '@/registry/new-york/components/ui/borders/rainbow-border';

export interface RainbowBorderInputProps extends React.ComponentProps<typeof Input> {
    borderWidth?: string;
    animationDuration?: string;
    colors?: string[];
    rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
    glow?: boolean;
    glowBlur?: string;
    glowOpacity?: number;
    wrapperClassName?: string;
}

export const RainbowBorderInput = React.forwardRef<HTMLInputElement, RainbowBorderInputProps>(
    (
        {
            className,
            borderWidth = '1.5px',
            animationDuration = '3s',
            colors,
            rounded = 'md',
            glow = true,
            glowBlur = '20px',
            glowOpacity = 30,
            wrapperClassName,
            ...props
        },
        ref,
    ) => {
        const roundedInputClass = 
            rounded === 'none' ? 'rounded-none' :
            rounded === 'xs' ? 'rounded-xs' :
            rounded === 'sm' ? 'rounded-sm' :
            rounded === 'md' ? 'rounded-md' :
            rounded === 'lg' ? 'rounded-lg' : 'rounded-full';

        return (
            <RainbowBorder
                borderWidth={borderWidth}
                animationDuration={animationDuration}
                colors={colors}
                rounded={rounded}
                glow={glow}
                glowBlur={glowBlur}
                glowOpacity={glowOpacity}
                className={cn('p-[1px] w-full', wrapperClassName)}
            >
                <Input
                    ref={ref}
                    className={cn(
                        'bg-background text-foreground border-0 shadow-xs focus-visible:ring-0 focus-visible:ring-offset-0 w-full',
                        roundedInputClass,
                        className,
                    )}
                    {...props}
                />
            </RainbowBorder>
        );
    },
);

RainbowBorderInput.displayName = 'RainbowBorderInput';

export default RainbowBorderInput;
