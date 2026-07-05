'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ButtonPulseProps extends React.ComponentPropsWithRef<
    typeof Button
> {}

export const ButtonPulse = React.forwardRef<
    HTMLButtonElement,
    ButtonPulseProps
>(({ className, children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            className={cn(
                'relative bg-primary text-primary-foreground shadow-lg shadow-primary/20 select-none before:absolute before:inset-0 before:animate-ping before:rounded-md before:bg-primary before:opacity-10 before:duration-1000 hover:shadow-primary/30 hover:brightness-105 active:scale-95',
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    );
});

ButtonPulse.displayName = 'ButtonPulse';

export default ButtonPulse;
