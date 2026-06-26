import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Wrapper from '@/registry/new-york/components/ui/misc/wrapper';

interface BannerExpandableProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: React.ReactNode;
    badgeLabel?: string;
    onClose?: () => void;
}

export function BannerExpandable({
    title,
    description,
    badgeLabel,
    onClose,
    className,
    ...props
}: BannerExpandableProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'relative w-full border-b border-border bg-card/65 backdrop-blur-md transition-all duration-350 select-none',
                isExpanded && 'border-border/80 bg-card shadow-md',
                className,
            )}
            {...props}
        >
            <Wrapper className="flex flex-col justify-between gap-3 py-3.5 text-xs md:flex-row md:items-center">
                {/* Header Section */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    {badgeLabel && (
                        <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-primary uppercase">
                            {badgeLabel}
                        </span>
                    )}
                    <span className="cursor-default truncate font-bold text-foreground select-text">
                        {title}
                    </span>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-1 inline-flex shrink-0 cursor-pointer items-center gap-1 border-0 bg-transparent font-semibold text-primary transition-all hover:text-primary/95 hover:underline"
                    >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <ChevronDown
                            className={cn(
                                'size-3.5 transition-transform duration-200',
                                isExpanded && 'rotate-180 text-primary',
                            )}
                        />
                    </button>
                </div>

                {/* Dismiss Button */}
                <div className="flex items-center justify-end gap-2">
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
            </Wrapper>

            {/* Expand Panel */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-border/50 bg-muted/20"
                    >
                        <Wrapper className="py-5 text-xs leading-relaxed text-muted-foreground">
                            {description}
                        </Wrapper>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
