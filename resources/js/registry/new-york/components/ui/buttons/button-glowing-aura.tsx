'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonGlowingAuraProps extends React.ComponentPropsWithRef<
    typeof Button
> {
    auraColor?: string;
}

export const ButtonGlowingAura = React.forwardRef<
    HTMLButtonElement,
    ButtonGlowingAuraProps
>(
    (
        { className, children, auraColor = 'var(--color-primary)', ...props },
        ref,
    ) => {
        return (
            <div className="group relative inline-block">
                {/* Glowing backlight aura */}
                <div
                    className="absolute -inset-1 -z-10 rounded-lg opacity-40 blur-md transition duration-500 group-hover:opacity-75 group-hover:blur-lg"
                    style={{
                        background: `radial-gradient(circle, ${auraColor} 0%, transparent 70%)`,
                    }}
                />
                <Button
                    ref={ref}
                    className={cn(
                        'relative border border-primary/20 shadow-lg select-none active:scale-95',
                        className,
                    )}
                    {...props}
                >
                    {children}
                </Button>
            </div>
        );
    },
);

ButtonGlowingAura.displayName = 'ButtonGlowingAura';

export default ButtonGlowingAura;
