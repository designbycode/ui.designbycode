import * as React from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonSliderDiagonalProps extends React.HTMLAttributes<HTMLDivElement> {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    defaultPosition?: number;
    aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
    maxSkew?: number; // percentage skew at center, default 8
}

export function ComparisonSliderDiagonal({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    defaultPosition = 50,
    aspectRatio = 'video',
    maxSkew = 8,
    className,
    ...props
}: ComparisonSliderDiagonalProps) {
    const [sliderPosition, setSliderPosition] = React.useState(defaultPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(position);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
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
            const x = e.clientX - rect.left;
            setSliderPosition(
                Math.max(0, Math.min(100, (x / rect.width) * 100)),
            );
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            setSliderPosition(
                Math.max(0, Math.min(100, (x / rect.width) * 100)),
            );
        }
    };

    // Calculate skewed clip-path coordinates. Taper skew to 0 at the bounds (0 and 100).
    const currentSkew = maxSkew * (1 - Math.abs(sliderPosition - 50) / 50);
    const topPoint = Math.max(0, Math.min(100, sliderPosition - currentSkew));
    const bottomPoint = Math.max(
        0,
        Math.min(100, sliderPosition + currentSkew),
    );

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
                    clipPath: `polygon(0 0, ${topPoint}% 0, ${bottomPoint}% 100%, 0 100%)`,
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

            {/* Diagonal SVG Divider Line */}
            <svg
                className="pointer-events-none absolute inset-0 z-20 size-full"
                style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' }}
            >
                <line
                    x1={`${topPoint}%`}
                    y1="0"
                    x2={`${bottomPoint}%`}
                    y2="100%"
                    className="stroke-background/90"
                    strokeWidth="2.5"
                />
            </svg>

            {/* Slider Handle (located at center of diagonal line) */}
            <div
                className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
            >
                <div
                    className={cn(
                        'flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-md transition-transform duration-200 select-none',
                        isDragging && 'scale-110 border-primary',
                    )}
                >
                    <ChevronsLeftRight className="size-4 text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
