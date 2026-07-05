'use client';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const MotionCard = motion(Card);

export interface ExpandableCardProps extends React.ComponentProps<typeof Card> {
    title: string;
    description?: string;
    expandedContent?: React.ReactNode;
    defaultExpanded?: boolean;
}

const ExpandableCard = React.forwardRef<HTMLDivElement, ExpandableCardProps>(
    (
        {
            className,
            title,
            description,
            expandedContent,
            defaultExpanded = false,
            children,
            ...props
        },
        ref,
    ) => {
        const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

        const {
            onDrag,
            onDragStart,
            onDragEnd,
            onAnimationStart,
            ...safeProps
        } = props as any;

        return (
            <MotionCard
                layout
                ref={ref}
                className={cn(
                    'relative overflow-hidden p-6 shadow-md transition-shadow hover:shadow-lg',
                    className,
                )}
                {...safeProps}
            >
                {/* Header section always visible */}
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex cursor-pointer items-start justify-between gap-4 select-none"
                >
                    <div className="space-y-1">
                        <motion.h3
                            layout="position"
                            className="text-lg font-bold tracking-tight"
                        >
                            {title}
                        </motion.h3>
                        {description && (
                            <motion.p
                                layout="position"
                                className="text-sm text-muted-foreground"
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>
                    <motion.div
                        layout
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.div>
                </div>

                {/* Default layout children */}
                {children && (
                    <motion.div layout="position" className="mt-4">
                        {children}
                    </motion.div>
                )}

                {/* Expanded content section */}
                <AnimatePresence initial={false}>
                    {isExpanded && expandedContent && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 border-t border-border/40 pt-4 text-sm text-muted-foreground">
                                {expandedContent}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </MotionCard>
        );
    },
);

ExpandableCard.displayName = 'ExpandableCard';

export { ExpandableCard };
export default ExpandableCard;
