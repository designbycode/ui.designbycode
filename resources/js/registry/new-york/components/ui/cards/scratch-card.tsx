'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface ScratchCardProps extends React.ComponentProps<typeof Card> {
    width?: number;
    height?: number;
    overlayColor?: string;
    brushRadius?: number;
    percentToReveal?: number;
    onComplete?: () => void;
}

const ScratchCard = React.forwardRef<HTMLDivElement, ScratchCardProps>(
    (
        {
            className,
            overlayColor = '#3f3f46', // Zinc-700
            brushRadius = 20,
            percentToReveal = 50,
            onComplete,
            children,
            ...props
        },
        ref,
    ) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLDivElement | null>;
        const canvasRef = React.useRef<HTMLCanvasElement>(null);
        const [isScratching, setIsScratching] = React.useState(false);
        const [isFinished, setIsFinished] = React.useState(false);

        React.useEffect(() => {
            const canvas = canvasRef.current;
            const container = resolvedRef.current;
            if (!canvas || !container) return;

            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Fill canvas with overlay color
            ctx.fillStyle = overlayColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw a subtle texture or text on top of scratch card
            ctx.fillStyle = '#71717a'; // Zinc-500
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                'SCRATCH TO REVEAL',
                canvas.width / 2,
                canvas.height / 2,
            );
        }, [overlayColor, resolvedRef]);

        const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return { x: 0, y: 0 };
            const rect = canvas.getBoundingClientRect();

            // Handle touch events vs mouse events
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };
        };

        const scratch = (e: React.MouseEvent | React.TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas || !isScratching || isFinished) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const { x, y } = getMousePos(e);

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
            ctx.fill();

            checkRevealPercentage();
        };

        const checkRevealPercentage = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imgData.data;
            let transparentPixels = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) {
                    transparentPixels++;
                }
            }

            const percentage = (transparentPixels / (pixels.length / 4)) * 100;
            if (percentage >= percentToReveal && !isFinished) {
                setIsFinished(true);
                // Clear the whole canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (onComplete) onComplete();
            }
        };

        return (
            <Card
                ref={resolvedRef}
                className={cn(
                    'relative overflow-hidden p-6 shadow-md select-none',
                    className,
                )}
                {...props}
            >
                {/* Hidden contents below the scratch layer */}
                <div className="relative z-0 h-full w-full">{children}</div>

                {/* Scratch Canvas layer */}
                {!isFinished && (
                    <canvas
                        ref={canvasRef}
                        onMouseDown={() => setIsScratching(true)}
                        onMouseUp={() => setIsScratching(false)}
                        onMouseLeave={() => setIsScratching(false)}
                        onMouseMove={scratch}
                        onTouchStart={() => setIsScratching(true)}
                        onTouchEnd={() => setIsScratching(false)}
                        onTouchMove={scratch}
                        className="absolute inset-0 z-20 cursor-crosshair touch-none"
                    />
                )}
            </Card>
        );
    },
);

ScratchCard.displayName = 'ScratchCard';

export { ScratchCard };
export default ScratchCard;
