import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonShineProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
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
        <button
            className={cn(
                'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform select-none active:scale-95',
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
        </button>
    );
}

export default ButtonShine;
