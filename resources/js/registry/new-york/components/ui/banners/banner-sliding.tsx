import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlidingMessage {
    id: string | number;
    text: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

interface BannerSlidingProps extends React.HTMLAttributes<HTMLDivElement> {
    messages: SlidingMessage[];
    interval?: number; // ms, default 4000
    transitionType?: 'slide-horizontal' | 'fade';
}

export function BannerSliding({
    messages,
    interval = 4500,
    transitionType = 'slide-horizontal',
    className,
    ...props
}: BannerSlidingProps) {
    const [index, setIndex] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (isHovered || messages.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, interval);
        return () => clearInterval(timer);
    }, [isHovered, messages.length, interval]);

    if (messages.length === 0) return null;

    const currentMessage = messages[index];

    // Slide horizontal variables
    const slideVariants = {
        initial: {
            opacity: 0,
            x: transitionType === 'slide-horizontal' ? 30 : 0,
        },
        animate: { opacity: 1, x: 0 },
        exit: {
            opacity: 0,
            x: transitionType === 'slide-horizontal' ? -30 : 0,
        },
    };

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % messages.length);
    };

    return (
        <div
            className={cn(
                'group relative flex w-full items-center justify-between gap-4 border-b border-border bg-muted px-8 py-2.5 text-xs font-semibold text-foreground select-none',
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Nav Prev Button */}
            {messages.length > 1 && (
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-2 z-10 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent p-1 text-muted-foreground/60 opacity-0 transition-all group-hover:opacity-100 hover:border-border hover:bg-background hover:text-foreground"
                >
                    <ChevronLeft className="size-3.5" />
                </button>
            )}

            {/* Sliding Content */}
            <div className="flex min-h-6 flex-1 items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 text-center"
                    >
                        <span>{currentMessage.text}</span>
                        {currentMessage.actionLabel && (
                            <button
                                onClick={currentMessage.onActionClick}
                                className="inline-flex cursor-pointer items-center gap-0.5 font-bold text-primary underline hover:text-primary/95"
                            >
                                {currentMessage.actionLabel}
                            </button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav Next Button */}
            {messages.length > 1 && (
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-2 z-10 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent p-1 text-muted-foreground/60 opacity-0 transition-all group-hover:opacity-100 hover:border-border hover:bg-background hover:text-foreground"
                >
                    <ChevronRight className="size-3.5" />
                </button>
            )}
        </div>
    );
}
