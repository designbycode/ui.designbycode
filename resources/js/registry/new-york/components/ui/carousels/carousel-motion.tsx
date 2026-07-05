'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselMotionProps {
    items: React.ReactNode[];
    className?: string;
}

export function CarouselMotion({ items, className }: CarouselMotionProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);
    const [position, setPosition] = React.useState(0);

    React.useEffect(() => {
        if (!containerRef.current) {
return;
}

        const updateWidth = () => {
            setWidth(
                containerRef.current!.scrollWidth -
                    containerRef.current!.offsetWidth,
            );
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [items]);

    const handlePrev = () => {
        setPosition((prev) => Math.min(0, prev + 300));
    };

    const handleNext = () => {
        setPosition((prev) => Math.max(-width, prev - 300));
    };

    return (
        <div className={cn('relative w-full space-y-4', className)}>
            <motion.div
                ref={containerRef}
                className="cursor-grab overflow-hidden rounded-xl border border-border/40 bg-card/15 p-4.5 active:cursor-grabbing"
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    dragElastic={0.15}
                    animate={{ x: position }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    onDragEnd={(_, info) => {
                        const targetX = Math.max(
                            -width,
                            Math.min(0, position + info.offset.x),
                        );
                        setPosition(targetX);
                    }}
                    className="flex w-max gap-4"
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-[260px] shrink-0 select-none sm:w-[300px]"
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-end gap-2 px-2 select-none">
                <Button
                    onClick={handlePrev}
                    variant="outline"
                    size="icon"
                    disabled={position >= 0}
                    className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted disabled:opacity-40"
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <Button
                    onClick={handleNext}
                    variant="outline"
                    size="icon"
                    disabled={position <= -width}
                    className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted disabled:opacity-40"
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}

export default CarouselMotion;
