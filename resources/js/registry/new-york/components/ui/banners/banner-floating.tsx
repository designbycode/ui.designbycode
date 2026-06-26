import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const MotionCard = motion(Card);

interface BannerFloatingProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
    onClose?: () => void;
    position?: 'bottom-right' | 'bottom-left' | 'top-center';
    icon?: React.ReactNode;
}

export function BannerFloating({
    title,
    description,
    actionLabel,
    onActionClick,
    onClose,
    position = 'bottom-right',
    icon,
    className,
    ...props
}: BannerFloatingProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...safeProps } =
        props as any;

    const handleDismiss = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const positionClasses = {
        'bottom-right': 'bottom-6 right-6 md:max-w-md',
        'bottom-left': 'bottom-6 left-6 md:max-w-md',
        'top-center':
            'top-6 left-1/2 -translate-x-1/2 md:max-w-xl w-[calc(100%-2rem)]',
    };

    const animations = {
        'bottom-right': {
            initial: { opacity: 0, y: 50, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.95 },
        },
        'bottom-left': {
            initial: { opacity: 0, y: 50, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.95 },
        },
        'top-center': {
            initial: { opacity: 0, y: -50, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -20, scale: 0.95 },
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionCard
                    initial={animations[position].initial}
                    animate={animations[position].animate}
                    exit={animations[position].exit}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={cn(
                        'fixed z-50 bg-card/95 p-5 shadow-lg backdrop-blur-md select-none',
                        positionClasses[position],
                        className,
                    )}
                    {...safeProps}
                >
                    <div className="flex items-start gap-4">
                        {icon && (
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-muted text-foreground">
                                {icon}
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-bold tracking-tight text-foreground">
                                {title}
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                            {actionLabel && (
                                <div className="pt-2">
                                    <button
                                        onClick={onActionClick}
                                        className="inline-flex h-7 cursor-pointer items-center justify-center rounded-md bg-primary px-3 text-[11px] font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/95 active:scale-95"
                                    >
                                        {actionLabel}
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </MotionCard>
            )}
        </AnimatePresence>
    );
}
