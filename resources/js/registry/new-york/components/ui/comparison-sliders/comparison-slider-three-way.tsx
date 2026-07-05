import { ChevronsLeftRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ComparisonSliderThreeWayProps extends React.HTMLAttributes<HTMLDivElement> {
    leftImage: string;
    centerImage: string;
    rightImage: string;
    leftLabel?: string;
    centerLabel?: string;
    rightLabel?: string;
    defaultLeftPosition?: number;
    defaultRightPosition?: number;
    minGap?: number; // minimum percentage gap between handles
    aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
}

export function ComparisonSliderThreeWay({
    leftImage,
    centerImage,
    rightImage,
    leftLabel = 'Original',
    centerLabel = 'Filtered',
    rightLabel = 'B&W',
    defaultLeftPosition = 33,
    defaultRightPosition = 66,
    minGap = 5,
    aspectRatio = 'video',
    className,
    ...props
}: ComparisonSliderThreeWayProps) {
    const [leftPos, setLeftPos] = React.useState(defaultLeftPosition);
    const [rightPos, setRightPos] = React.useState(defaultRightPosition);
    const [activeHandle, setActiveHandle] = React.useState<
        'left' | 'right' | null
    >(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current || !activeHandle) {
return;
}

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        if (activeHandle === 'left') {
            // Left handle cannot exceed right handle minus minimum gap
            const newLeft = Math.min(percentage, rightPos - minGap);
            setLeftPos(newLeft);
        } else {
            // Right handle cannot be less than left handle plus minimum gap
            const newRight = Math.max(percentage, leftPos + minGap);
            setRightPos(newRight);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!activeHandle) {
return;
}

        handleMove(e.touches[0].clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!activeHandle) {
return;
}

        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        setActiveHandle(null);
    };

    React.useEffect(() => {
        if (activeHandle) {
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
    }, [activeHandle, leftPos, rightPos]);

    const startDraggingLeft = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setActiveHandle('left');
    };

    const startDraggingRight = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setActiveHandle('right');
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
            {...props}
        >
            {/* Right Image (Base / Rightmost) */}
            <img
                src={rightImage}
                alt="Right state"
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            {/* Right Label (Bottom right) */}
            {rightLabel && (
                <div className="absolute right-4 bottom-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300">
                    {rightLabel}
                </div>
            )}

            {/* Center Image (Clipped overlay / Center section) */}
            <div
                className="pointer-events-none absolute inset-0 size-full"
                style={{
                    clipPath: `polygon(${leftPos}% 0, ${rightPos}% 0, ${rightPos}% 100%, ${leftPos}% 100%)`,
                }}
            >
                <img
                    src={centerImage}
                    alt="Center state"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>

            {/* Center Label (Bottom center) */}
            {centerLabel && (
                <div
                    className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300"
                    style={{
                        opacity: rightPos - leftPos < 20 ? 0 : 1,
                    }}
                >
                    {centerLabel}
                </div>
            )}

            {/* Left Image (Clipped overlay / Left section) */}
            <div
                className="pointer-events-none absolute inset-0 size-full"
                style={{
                    clipPath: `polygon(0 0, ${leftPos}% 0, ${leftPos}% 100%, 0 100%)`,
                }}
            >
                <img
                    src={leftImage}
                    alt="Left state"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>

            {/* Left Label (Bottom left) */}
            {leftLabel && (
                <div
                    className="absolute bottom-4 left-4 z-10 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-opacity duration-300"
                    style={{
                        opacity: leftPos < 15 ? 0 : 1,
                    }}
                >
                    {leftLabel}
                </div>
            )}

            {/* Left Divider Line & Handle */}
            <div
                className={cn(
                    'absolute top-0 bottom-0 z-20 w-0.5 cursor-ew-resize transition-colors',
                    activeHandle === 'left'
                        ? 'bg-primary'
                        : 'bg-background/80 hover:bg-background/95',
                )}
                style={{ left: `${leftPos}%` }}
                onMouseDown={startDraggingLeft}
                onTouchStart={startDraggingLeft}
            >
                <div
                    className={cn(
                        'absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-transform duration-200 select-none',
                        activeHandle === 'left' && 'scale-110 border-primary',
                    )}
                >
                    <ChevronsLeftRight className="size-3.5 text-muted-foreground" />
                </div>
            </div>

            {/* Right Divider Line & Handle */}
            <div
                className={cn(
                    'absolute top-0 bottom-0 z-20 w-0.5 cursor-ew-resize transition-colors',
                    activeHandle === 'right'
                        ? 'bg-primary'
                        : 'bg-background/80 hover:bg-background/95',
                )}
                style={{ left: `${rightPos}%` }}
                onMouseDown={startDraggingRight}
                onTouchStart={startDraggingRight}
            >
                <div
                    className={cn(
                        'absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-transform duration-200 select-none',
                        activeHandle === 'right' && 'scale-110 border-primary',
                    )}
                >
                    <ChevronsLeftRight className="size-3.5 text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
