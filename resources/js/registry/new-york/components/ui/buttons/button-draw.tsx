'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonDrawProps extends React.ComponentPropsWithRef<
    typeof Button
> {}

export const ButtonDraw = React.forwardRef<HTMLButtonElement, ButtonDrawProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    'relative overflow-hidden border border-border bg-transparent text-foreground select-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:bg-muted/30 hover:after:scale-x-100 active:scale-95',
                    className,
                )}
                {...props}
            >
                {children}
            </Button>
        );
    },
);

ButtonDraw.displayName = 'ButtonDraw';

export default ButtonDraw;
