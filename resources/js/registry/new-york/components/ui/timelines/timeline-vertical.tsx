import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface TimelineItem {
    id: string | number;
    title: string;
    description?: React.ReactNode;
    date?: string;
    icon?: React.ReactNode;
    status?: 'completed' | 'current' | 'upcoming';
    tags?: string[];
    subtasks?: { title: string; completed: boolean }[];
    statusLabel?: string;
}

interface TimelineVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
    align?: 'left' | 'alternate';
}

export function TimelineVertical({
    items,
    align = 'left',
    className,
    ...props
}: TimelineVerticalProps) {
    return (
        <div
            className={cn('relative w-full max-w-4xl px-4 py-8', className)}
            {...props}
        >
            {/* Center/Left Track Line */}
            <div
                className={cn(
                    'pointer-events-none absolute top-0 bottom-0 w-0.5 bg-border',
                    align === 'alternate'
                        ? 'left-1/2 -translate-x-1/2'
                        : 'left-8',
                )}
            />

            <div className="flex flex-col gap-8">
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
                            {/* Node Point */}
                            <div
                                className={cn(
                                    'absolute top-1.5 z-10 flex size-8 items-center justify-center rounded-full border bg-background shadow-xs transition-colors',
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
                            </div>

                            {/* Content Card Wrapper */}
                            <div
                                className={cn(
                                    'w-[calc(100%-3rem)] md:w-[calc(50%-2rem)]',
                                    align === 'alternate'
                                        ? ''
                                        : 'w-[calc(100%-4rem)]',
                                )}
                            >
                                <Card className="border-border bg-card p-5 shadow-xs transition-all hover:shadow-md">
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
                                </Card>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
