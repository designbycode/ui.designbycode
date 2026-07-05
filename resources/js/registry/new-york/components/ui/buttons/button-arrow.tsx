'use client';
import { ArrowRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonArrowProps extends React.ComponentPropsWithRef<
    typeof Button
> {}

export const ButtonArrow = React.forwardRef<
    HTMLButtonElement,
    ButtonArrowProps
>(({ className, children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            className={cn(
                'group relative overflow-hidden pr-10 transition-all duration-300 select-none active:scale-95',
                className,
            )}
            {...props}
        >
            <span>{children}</span>
            <span className="absolute right-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
                <ArrowRight className="size-4 shrink-0" />
            </span>
        </Button>
    );
});

ButtonArrow.displayName = 'ButtonArrow';

export default ButtonArrow;
