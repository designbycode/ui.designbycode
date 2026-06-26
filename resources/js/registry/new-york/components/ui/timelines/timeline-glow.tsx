import * as React from 'react';
import { cn } from '@/lib/utils';
import { TimelineItem } from './timeline-vertical';
import { Card } from '@/components/ui/card';

interface TimelineGlowProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
    align?: 'left' | 'alternate';
}

export function TimelineGlow({
    items,
    align = 'left',
    className,
    ...props
}: TimelineGlowProps) {
    return (
        <div
            className={cn('relative w-full max-w-4xl px-4 py-8', className)}
            {...props}
        >
            {/* Glowing Gradient Track Line */}
            <div
                className={cn(
                    'pointer-events-none absolute top-0 bottom-0 w-0.5 bg-linear-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-80',
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
                            {/* Glowing Node Circle */}
                            <div
                                className={cn(
                                    'absolute top-1.5 z-10 flex size-8 items-center justify-center rounded-full border bg-background shadow-xs',
                                    align === 'alternate'
                                        ? 'left-1/2 -translate-x-1/2'
                                        : 'left-0',
                                    isCompleted &&
                                        'border-purple-500 bg-linear-to-tr from-indigo-500 to-purple-500 text-white',
                                    isCurrent &&
                                        'border-pink-500 ring-2 ring-pink-500/20',
                                    !isCompleted &&
                                        !isCurrent &&
                                        'border-muted-foreground/30 text-muted-foreground',
                                )}
                            >
                                {/* Backlight blur glow effect */}
                                {(isCompleted || isCurrent) && (
                                    <div
                                        className={cn(
                                            'absolute -inset-1 -z-10 animate-pulse rounded-full opacity-75 blur-xs',
                                            isCompleted &&
                                                'bg-linear-to-tr from-indigo-500 to-purple-500',
                                            isCurrent && 'bg-pink-500',
                                        )}
                                    />
                                )}

                                {item.icon ? (
                                    <div className="flex size-4 items-center justify-center [&_svg]:size-4">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <div
                                        className={cn(
                                            'size-2 rounded-full',
                                            isCompleted && 'bg-white',
                                            isCurrent &&
                                                'animate-ping bg-pink-500',
                                            !isCompleted &&
                                                !isCurrent &&
                                                'bg-muted-foreground/40',
                                        )}
                                    />
                                )}
                            </div>

                            {/* Glowing Card Wrapper */}
                            <div
                                className={cn(
                                    'w-[calc(100%-3rem)] md:w-[calc(50%-2rem)]',
                                    align === 'alternate'
                                        ? ''
                                        : 'w-[calc(100%-4rem)]',
                                )}
                            >
                                <Card className="group relative border-border bg-card p-5 shadow-xs transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg">
                                    {/* Ambient card corner glow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-all duration-500 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100" />

                                    <div
                                        className={cn(
                                            'flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between',
                                            align === 'alternate' &&
                                                isEven &&
                                                'md:flex-row-reverse',
                                        )}
                                    >
                                        <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-purple-500">
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
