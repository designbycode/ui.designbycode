'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ButtonNeonProps extends React.ComponentPropsWithRef<typeof Button> {}

export const ButtonNeon = React.forwardRef<HTMLButtonElement, ButtonNeonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    'relative select-none active:scale-95 border border-primary/30 bg-primary/5 text-primary shadow-[0_0_15px] shadow-primary/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px] hover:shadow-primary/20',
                    className,
                )}
                {...props}
            >
                {children}
            </Button>
        );
    },
);

ButtonNeon.displayName = 'ButtonNeon';

export default ButtonNeon;
