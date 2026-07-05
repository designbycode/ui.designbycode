import { Lock, Unlock } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ComparisonSliderHoverProps extends React.HTMLAttributes<HTMLDivElement> {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    defaultPosition?: number;
    aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
    resetOnLeave?: boolean;
}

export function ComparisonSliderHover({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    defaultPosition = 50,
    aspectRatio = 'video',
    resetOnLeave = false,
    className,
    ...props
}: ComparisonSliderHoverProps) {
    const [sliderPosition, setSliderPosition] = React.useState(defaultPosition);
    const [isLocked, setIsLocked] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLocked || !containerRef.current) {
return;
}

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(position);
    };

    const handleMouseLeave = () => {
        if (isLocked || !resetOnLeave) {
return;
}

        setSliderPosition(defaultPosition);
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        // Toggle locking
        setIsLocked(!isLocked);
    };

    const aspectClasses = {
        video: 'aspect-video',
        square: 'aspect-square',
        wide: 'aspect-21/9',
        auto: 'h-full w-full',
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative cursor-crosshair overflow-hidden rounded-xl border border-border bg-muted shadow-lg select-none',
                aspectClasses[aspectRatio],
                className,
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleContainerClick}
            {...props}
        >
            {/* After Image (Base) */}
            <img
                src={afterImage}
                alt="After"
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            {/* After Label */}
            {afterLabel && (
                <div className="absolute right-4 bottom-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300">
                    {afterLabel}
                </div>
            )}

            {/* Before Image (Clipped overlay) */}
            <div
                className="pointer-events-none absolute inset-0 size-full"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>

            {/* Before Label */}
            {beforeLabel && (
                <div
                    className="absolute bottom-4 left-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300"
                    style={{
                        opacity: sliderPosition < 15 ? 0 : 1,
                    }}
                >
                    {beforeLabel}
                </div>
            )}

            {/* Locked/Unlocked Alert Tooltip */}
            <div className="absolute top-4 right-4 z-10 rounded-md border border-border bg-background/80 px-2 py-1 text-[10px] font-semibold text-foreground shadow-xs backdrop-blur-xs">
                {isLocked
                    ? 'Locked (Click to unlock)'
                    : 'Hover to move (Click to lock)'}
            </div>

            {/* Slider Line & Handle */}
            <div
                className={cn(
                    'pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 bg-background/80 transition-colors hover:bg-background/95',
                    isLocked && 'bg-primary',
                )}
                style={{ left: `${sliderPosition}%` }}
            >
                <div
                    className={cn(
                        'absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md transition-all duration-200',
                        isLocked
                            ? 'scale-110 border-primary text-primary'
                            : 'border-border text-muted-foreground',
                    )}
                >
                    {isLocked ? (
                        <Lock className="size-4" />
                    ) : (
                        <Unlock className="size-4 animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
}
