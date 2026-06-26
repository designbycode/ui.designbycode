'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface SplitPreviewItem {
    id: string;
    label: string;
    details: string;
    previewColor: string; // e.g. 'var(--color-chart-1)' or 'var(--color-primary)'
    icon?: React.ReactNode;
}

export interface SplitPreviewCardProps extends React.ComponentProps<
    typeof Card
> {
    items: SplitPreviewItem[];
    defaultActiveId?: string;
}

const SplitPreviewCard = React.forwardRef<
    HTMLDivElement,
    SplitPreviewCardProps
>(({ className, items, defaultActiveId, ...props }, ref) => {
    const [activeId, setActiveId] = React.useState(
        defaultActiveId || items[0]?.id,
    );
    const activeItem = items.find((item) => item.id === activeId) || items[0];

    return (
        <Card
            ref={ref}
            className={cn(
                'grid grid-cols-1 gap-0 overflow-hidden p-0 shadow-md md:grid-cols-12',
                className,
            )}
            {...props}
        >
            {/* Left side: Dynamic morphing preview block */}
            <div
                className="relative flex flex-col justify-between p-6 text-white transition-colors duration-500 md:col-span-5"
                style={{
                    backgroundColor: activeItem
                        ? `color-mix(in srgb, ${activeItem.previewColor} 12%, rgba(0,0,0,0.85))`
                        : 'black',
                    borderRight: '1px solid var(--color-border)',
                }}
            >
                {/* Glowing backlight overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-40 blur-2xl transition-all duration-700"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${activeItem?.previewColor || 'var(--color-primary)'}, transparent 70%)`,
                    }}
                />

                <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider uppercase opacity-60">
                        STATUS PREVIEW
                    </span>
                    <div
                        className="size-3.5 animate-pulse rounded-full"
                        style={{ backgroundColor: activeItem?.previewColor }}
                    />
                </div>

                <div className="relative z-10 my-8 flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem?.id}
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                            transition={{ duration: 0.25 }}
                            className="flex size-16 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-xs"
                            style={{
                                boxShadow: `0 8px 32px 0 color-mix(in srgb, ${activeItem?.previewColor} 30%, transparent)`,
                            }}
                        >
                            {activeItem?.icon || (
                                <div className="size-6 rounded bg-white/30" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative z-10 space-y-1">
                    <AnimatePresence mode="wait">
                        <motion.h4
                            key={activeItem?.id}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-base font-black tracking-tight uppercase"
                        >
                            {activeItem?.label}
                        </motion.h4>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeItem?.id}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="line-clamp-2 text-xs opacity-75"
                        >
                            {activeItem?.details}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right side: Interactive navigation items */}
            <div className="flex flex-col justify-center bg-card p-4 md:col-span-7">
                <div className="space-y-1">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onMouseEnter={() => setActiveId(item.id)}
                            className={cn(
                                'relative flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors select-none',
                                activeId === item.id
                                    ? 'bg-muted text-foreground'
                                    : 'text-muted-foreground hover:bg-muted/40',
                            )}
                        >
                            <div className="space-y-0.5">
                                <span className="text-sm font-bold text-foreground">
                                    {item.label}
                                </span>
                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                    {item.details}
                                </p>
                            </div>
                            {activeId === item.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute right-3 size-2 rounded-full"
                                    style={{
                                        backgroundColor: item.previewColor,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
});

SplitPreviewCard.displayName = 'SplitPreviewCard';

export { SplitPreviewCard };
export default SplitPreviewCard;
