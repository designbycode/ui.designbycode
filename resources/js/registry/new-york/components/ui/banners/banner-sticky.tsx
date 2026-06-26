import * as React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerStickyProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    actionLabel?: string;
    onActionClick?: () => void;
    onClose?: () => void;
    sticky?: boolean;
}

export function BannerSticky({
    message,
    actionLabel,
    onActionClick,
    onClose,
    sticky = true,
    className,
    ...props
}: BannerStickyProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'flex w-full items-center justify-between gap-4 border-b border-border/80 bg-linear-to-r from-primary/10 via-primary/5 to-background px-4 py-3 select-none',
                sticky && 'sticky top-0 z-45',
                className,
            )}
            {...props}
        >
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
                <span className="text-center font-semibold text-foreground">
                    {message}
                </span>
                {actionLabel && (
                    <button
                        onClick={onActionClick}
                        className="group inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-primary transition-all hover:text-primary/95 hover:underline"
                    >
                        {actionLabel}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                )}
            </div>

            <button
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }}
                className="shrink-0 cursor-pointer rounded-lg p-1 text-muted-foreground/70 transition-all hover:bg-muted hover:text-foreground"
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
