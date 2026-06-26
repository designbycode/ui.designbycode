import * as React from 'react';
import { cn } from '@/lib/utils';
import { TimelineItem } from './timeline-vertical';

interface TimelineHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
}

export function TimelineHorizontal({
    items,
    className,
    ...props
}: TimelineHorizontalProps) {
    return (
        <div
            className={cn(
                'relative w-full scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent overflow-x-auto pb-4',
                className,
            )}
            {...props}
        >
            <div className="flex min-w-[640px] justify-between gap-4 px-6 py-6">
                {items.map((item, index) => {
                    const isCompleted = item.status === 'completed';
                    const isCurrent = item.status === 'current';
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            key={item.id}
                            className="relative flex flex-1 flex-col items-center"
                        >
                            {/* Connecting Line (drawn from the current node to the next one) */}
                            {!isLast && (
                                <div
                                    className={cn(
                                        'absolute top-5 right-[-50%] left-1/2 z-0 h-0.5 bg-border',
                                        isCompleted && 'bg-primary',
                                    )}
                                />
                            )}

                            {/* Node Icon/Dot */}
                            <div
                                className={cn(
                                    'relative z-10 flex size-10 items-center justify-center rounded-full border bg-background shadow-xs transition-all',
                                    isCompleted &&
                                        'border-primary bg-primary text-primary-foreground',
                                    isCurrent &&
                                        'border-primary ring-4 ring-primary/10',
                                    !isCompleted &&
                                        !isCurrent &&
                                        'border-muted-foreground/30 text-muted-foreground',
                                )}
                            >
                                {item.icon ? (
                                    <div className="flex size-4.5 items-center justify-center [&_svg]:size-4.5">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <span className="text-xs font-semibold">
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="mt-4 flex flex-col items-center px-2 text-center">
                                <h3 className="text-sm font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                {item.date && (
                                    <span className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                                        {item.date}
                                    </span>
                                )}
                                {item.description && (
                                    <p className="mt-1 max-w-[160px] text-xs leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
