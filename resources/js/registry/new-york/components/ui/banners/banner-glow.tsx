import * as React from 'react';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerGlowProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    actionLabel?: string;
    onActionClick?: () => void;
    onClose?: () => void;
}

export function BannerGlow({
    message,
    actionLabel,
    onActionClick,
    onClose,
    className,
    ...props
}: BannerGlowProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'relative flex w-full items-center justify-between gap-4 overflow-hidden border-b border-border/80 bg-card px-4 py-3 shadow-sm select-none',
                className,
            )}
            {...props}
        >
            {/* Animated background glow tracks */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-violet-500/8 via-pink-500/8 to-indigo-500/8" />

            {/* Bottom glowing line edge */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1.5px] animate-pulse bg-linear-to-r from-violet-500 via-pink-500 to-indigo-500" />

            <div className="relative z-10 flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
                <span className="inline-flex items-center gap-1.5 text-center font-semibold text-foreground">
                    <Sparkles className="size-3.5 shrink-0 animate-pulse text-pink-500" />
                    {message}
                </span>
                {actionLabel && (
                    <button
                        onClick={onActionClick}
                        className="inline-flex h-6 cursor-pointer items-center justify-center rounded-md border border-pink-500/20 bg-linear-to-r from-violet-600 to-pink-600 px-3 text-[10px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>

            <button
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }}
                className="relative z-10 shrink-0 cursor-pointer rounded-lg p-1 text-muted-foreground/70 transition-all hover:bg-muted hover:text-foreground"
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
