import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronDown,
    Check,
    Circle,
    CheckCircle2,
    PlayCircle,
    HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimelineItem } from './timeline-vertical';
import { Card } from '@/components/ui/card';

interface TimelineCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
    allowMultiple?: boolean;
    defaultExpandedIds?: (string | number)[];
}

export function TimelineCollapsible({
    items,
    allowMultiple = false,
    defaultExpandedIds = [],
    className,
    ...props
}: TimelineCollapsibleProps) {
    const [expandedIds, setExpandedIds] = React.useState<
        Record<string | number, boolean>
    >(() => {
        const initial: Record<string | number, boolean> = {};
        defaultExpandedIds.forEach((id) => {
            initial[id] = true;
        });
        return initial;
    });

    const toggleExpand = (id: string | number) => {
        setExpandedIds((prev) => {
            if (allowMultiple) {
                return { ...prev, [id]: !prev[id] };
            } else {
                const isCurrentlyExpanded = prev[id];
                const next: Record<string | number, boolean> = {};
                if (!isCurrentlyExpanded) {
                    next[id] = true;
                }
                return next;
            }
        });
    };

    return (
        <div
            className={cn('relative w-full max-w-4xl px-4 py-8', className)}
            {...props}
        >
            {/* Elegant Gradient Track Line */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-8 w-[2px] bg-linear-to-b from-primary/80 via-primary/30 to-border/30" />

            <div className="flex flex-col gap-6">
                {items.map((item) => {
                    const isExpanded = !!expandedIds[item.id];
                    const isCompleted = item.status === 'completed';
                    const isCurrent = item.status === 'current';

                    // Status details styling
                    const getStatusStyles = () => {
                        if (isCompleted) {
                            return {
                                ring: 'border-primary bg-primary text-primary-foreground',
                                labelBg:
                                    'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                                labelText: item.statusLabel || 'Completed',
                                icon: <CheckCircle2 className="size-4" />,
                            };
                        }
                        if (isCurrent) {
                            return {
                                ring: 'border-primary ring-4 ring-primary/20',
                                labelBg:
                                    'bg-primary/10 text-primary border-primary/20',
                                labelText: item.statusLabel || 'In Progress',
                                icon: (
                                    <PlayCircle className="size-4 animate-pulse" />
                                ),
                            };
                        }
                        return {
                            ring: 'border-muted-foreground/30 text-muted-foreground bg-muted/40',
                            labelBg:
                                'bg-muted text-muted-foreground border-border',
                            labelText: item.statusLabel || 'Planned',
                            icon: <HelpCircle className="size-4" />,
                        };
                    };

                    const statusInfo = getStatusStyles();

                    return (
                        <div
                            key={item.id}
                            className="group/row relative flex w-full justify-end text-left"
                        >
                            {/* Interactive Node Icon */}
                            <button
                                onClick={() => toggleExpand(item.id)}
                                className={cn(
                                    'absolute top-4 left-0 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border shadow-xs transition-all duration-300 hover:scale-105 active:scale-95',
                                    statusInfo.ring,
                                )}
                            >
                                {isCurrent && (
                                    <span className="absolute inset-0 animate-ping rounded-full border border-primary opacity-75" />
                                )}
                                {item.icon ? (
                                    <div className="flex size-4 items-center justify-center [&_svg]:size-4">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <div className="size-2 rounded-full bg-current" />
                                )}
                            </button>

                            {/* Expandable Premium Glassmorphic Content Card */}
                            <div className="w-[calc(100%-4.5rem)]">
                                <Card
                                    className={cn(
                                        'group cursor-pointer bg-card/60 p-5 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md',
                                        isExpanded &&
                                            'translate-y-0 border-primary/30 bg-card/90 shadow-md',
                                    )}
                                    onClick={() => toggleExpand(item.id)}
                                >
                                    {/* Header Layout */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex flex-1 flex-col gap-2">
                                            {/* Top badges bar */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase',
                                                        statusInfo.labelBg,
                                                    )}
                                                >
                                                    {statusInfo.icon}
                                                    {statusInfo.labelText}
                                                </span>
                                                {item.date && (
                                                    <span className="text-[11px] font-medium text-muted-foreground/80">
                                                        • {item.date}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Milestone Title */}
                                            <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Dropdown Chevron */}
                                        <div className="flex size-7 items-center justify-center rounded-lg border border-transparent bg-muted/40 text-muted-foreground transition-all group-hover:border-border/60 group-hover:bg-muted/80">
                                            <ChevronDown
                                                className={cn(
                                                    'size-4 transition-transform duration-200',
                                                    isExpanded &&
                                                        'rotate-180 text-primary',
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Expandable Content Area */}
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                    marginTop: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                    marginTop: 16,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    marginTop: 0,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                    ease: 'easeInOut',
                                                }}
                                                className="overflow-hidden border-t border-border/50 pt-4"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                } // Stop click toggle inside content
                                            >
                                                {/* Description Text */}
                                                {item.description && (
                                                    <div className="text-sm leading-relaxed text-muted-foreground">
                                                        {item.description}
                                                    </div>
                                                )}

                                                {/* Sub-steps / Checklist (if provided) */}
                                                {item.subtasks &&
                                                    item.subtasks.length >
                                                        0 && (
                                                        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/30 p-4">
                                                            <h4 className="text-[11px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                                                                Task
                                                                Deliverables
                                                            </h4>
                                                            <div className="mt-2 flex flex-col gap-2">
                                                                {item.subtasks.map(
                                                                    (
                                                                        task,
                                                                        i,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="flex items-center gap-2.5 text-xs text-muted-foreground"
                                                                        >
                                                                            {task.completed ? (
                                                                                <Check className="size-4 shrink-0 rounded-sm border border-emerald-500/20 bg-emerald-500/10 p-0.5 text-emerald-500" />
                                                                            ) : (
                                                                                <Circle className="size-4 shrink-0 text-muted-foreground/40" />
                                                                            )}
                                                                            <span
                                                                                className={cn(
                                                                                    task.completed &&
                                                                                        'text-muted-foreground/60 line-through',
                                                                                )}
                                                                            >
                                                                                {
                                                                                    task.title
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {/* Tag list pills */}
                                                {item.tags &&
                                                    item.tags.length > 0 && (
                                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                                            {item.tags.map(
                                                                (tag) => (
                                                                    <span
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="rounded-md border border-border/40 bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                                                                    >
                                                                        #{tag}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
