import { motion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import type { TimelineItem } from './timeline-vertical';

interface TimelineMotionProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
    align?: 'left' | 'alternate';
}

export function TimelineMotion({
    items,
    align = 'left',
    className,
    ...props
}: TimelineMotionProps) {
    return (
        <div
            className={cn('relative w-full max-w-4xl px-4 py-8', className)}
            {...props}
        >
            {/* Animated Draw-in Track Line */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={cn(
                    'pointer-events-none absolute top-0 bottom-0 w-0.5 origin-top bg-linear-to-b from-primary via-primary/50 to-border',
                    align === 'alternate'
                        ? 'left-1/2 -translate-x-1/2'
                        : 'left-8',
                )}
            />

            <div className="flex flex-col gap-10">
                {items.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const isCompleted = item.status === 'completed';
                    const isCurrent = item.status === 'current';

                    return (
                        <div
                            key={item.id}
                            className={cn(
                                'relative flex w-full',
                                align === 'alternate'
                                    ? isEven
                                        ? 'justify-start text-right'
                                        : 'justify-end text-left'
                                    : 'justify-end text-left',
                            )}
                        >
                            {/* Animated Node Circle */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, margin: '-15% 0px' }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1,
                                }}
                                className={cn(
                                    'absolute top-1.5 z-10 flex size-8 items-center justify-center rounded-full border bg-background shadow-xs',
                                    align === 'alternate'
                                        ? 'left-1/2 -translate-x-1/2'
                                        : 'left-0',
                                    isCompleted &&
                                        'border-primary bg-primary text-primary-foreground',
                                    isCurrent &&
                                        'border-primary ring-2 ring-primary/20',
                                    !isCompleted &&
                                        !isCurrent &&
                                        'border-muted-foreground/30 text-muted-foreground',
                                )}
                            >
                                {item.icon ? (
                                    <div className="flex size-4 items-center justify-center [&_svg]:size-4">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <div
                                        className={cn(
                                            'size-2 rounded-full',
                                            isCompleted &&
                                                'bg-primary-foreground',
                                            isCurrent &&
                                                'animate-pulse bg-primary',
                                            !isCompleted &&
                                                !isCurrent &&
                                                'bg-muted-foreground/40',
                                        )}
                                    />
                                )}
                            </motion.div>

                            {/* Animated Content Card */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x:
                                        align === 'alternate'
                                            ? isEven
                                                ? -30
                                                : 30
                                            : 30,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-15% 0px' }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className={cn(
                                    'w-[calc(100%-3rem)] md:w-[calc(50%-2rem)]',
                                    align === 'alternate'
                                        ? ''
                                        : 'w-[calc(100%-4rem)]',
                                )}
                            >
                                <div className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/20 hover:shadow-md">
                                    <div
                                        className={cn(
                                            'flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between',
                                            align === 'alternate' &&
                                                isEven &&
                                                'md:flex-row-reverse',
                                        )}
                                    >
                                        <h3 className="text-base font-semibold text-foreground">
                                            {item.title}
                                        </h3>
                                        {item.date && (
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {item.date}
                                            </span>
                                        )}
                                    </div>
                                    {item.description && (
                                        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
