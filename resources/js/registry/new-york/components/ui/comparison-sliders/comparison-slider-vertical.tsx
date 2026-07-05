import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ComparisonSliderVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    defaultPosition?: number;
    aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
}

export function ComparisonSliderVertical({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    defaultPosition = 50,
    aspectRatio = 'video',
    className,
    ...props
}: ComparisonSliderVerticalProps) {
    const [sliderPosition, setSliderPosition] = React.useState(defaultPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMove = (clientY: number) => {
        if (!containerRef.current) {
return;
}

        const rect = containerRef.current.getBoundingClientRect();
        const y = clientY - rect.top;
        const position = Math.max(0, Math.min(100, (y / rect.height) * 100));
        setSliderPosition(position);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) {
return;
}

        handleMove(e.touches[0].clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) {
return;
}

        handleMove(e.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top;
            setSliderPosition(
                Math.max(0, Math.min(100, (y / rect.height) * 100)),
            );
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const y = e.touches[0].clientY - rect.top;
            setSliderPosition(
                Math.max(0, Math.min(100, (y / rect.height) * 100)),
            );
        }
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
                'relative overflow-hidden rounded-xl border border-border bg-muted shadow-lg select-none',
                aspectClasses[aspectRatio],
                className,
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            {...props}
        >
            {/* After Image (Base / Bottom) */}
            <img
                src={afterImage}
                alt="After"
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            {/* After Label (Bottom right) */}
            {afterLabel && (
                <div className="absolute right-4 bottom-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300">
                    {afterLabel}
                </div>
            )}

            {/* Before Image (Clipped overlay / Top) */}
            <div
                className="pointer-events-none absolute inset-0 size-full"
                style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`,
                }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>

            {/* Before Label (Top left) */}
            {beforeLabel && (
                <div
                    className="absolute top-4 left-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300"
                    style={{
                        opacity: sliderPosition < 15 ? 0 : 1,
                    }}
                >
                    {beforeLabel}
                </div>
            )}

            {/* Slider Line & Handle (Horizontal Line sliding up/down) */}
            <div
                className="absolute right-0 left-0 z-20 h-0.5 cursor-ns-resize bg-background/85 transition-colors hover:bg-background/95"
                style={{ top: `${sliderPosition}%` }}
            >
                <div
                    className={cn(
                        'absolute left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-transform duration-200 select-none',
                        isDragging && 'scale-110 border-primary',
                    )}
                >
                    <ChevronsUpDown className="size-4 text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
