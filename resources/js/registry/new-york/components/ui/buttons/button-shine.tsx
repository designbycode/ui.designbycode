import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ButtonShineProps extends React.ComponentProps<typeof Button> {
    shineColor?: string;
}

export function ButtonShine({
    children,
    shineColor = 'rgba(255, 255, 255, 0.3)',
    className,
    style,
    ...props
}: ButtonShineProps) {
    return (
        <Button
            className={cn(
                'group relative overflow-hidden select-none active:scale-95',
                className,
            )}
            style={style}
            {...props}
        >
            {/* Shimmer glossy shine gradient wrapper */}
            <span
                className="pointer-events-none absolute inset-0 block h-full w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"
                style={{
                    backgroundImage: `linear-gradient(to right, transparent, ${shineColor} 50%, transparent)`,
                    animationDuration: '1s',
                }}
            />
            <span className="relative z-10">{children}</span>
        </Button>
    );
}

export default ButtonShine;
