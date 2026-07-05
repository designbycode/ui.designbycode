'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MetaballCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of fluid blobs */
    blobCount?: number;
    /** Base blob radius range (min and max) */
    minRadius?: number;
    maxRadius?: number;
    /** Bouncing speed */
    speed?: number;
    /** Color of the metaballs, defaults to primary */
    color?: string;
    /** Enable mouse interaction (mouse acts as a large custom blob) */
    interactive?: boolean;
}

interface Blob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export const MetaballCanvas = React.forwardRef<
    HTMLDivElement,
    MetaballCanvasProps
>(
    (
        {
            className,
            blobCount = 10,
            minRadius = 30,
            maxRadius = 60,
            speed = 1.0,
            color,
            interactive = true,
            ...props
        },
        ref,
    ) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const canvasRef = React.useRef<HTMLCanvasElement>(null);
        const mouseRef = React.useRef<{ x: number; y: number } | null>(null);

        React.useImperativeHandle(
            ref,
            () => containerRef.current as HTMLDivElement,
        );

        React.useEffect(() => {
            const canvas = canvasRef.current;
            const container = containerRef.current;

            if (!canvas || !container) {
                return;
            }

            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return;
            }

            let animationId: number;
            let width = (canvas.width = container.offsetWidth);
            let height = (canvas.height = container.offsetHeight);

            const blobs: Blob[] = [];

            // Initialize blobs
            const initBlobs = () => {
                blobs.length = 0;

                for (let i = 0; i < blobCount; i++) {
                    const radius =
                        Math.random() * (maxRadius - minRadius) + minRadius;
                    blobs.push({
                        x: Math.random() * (width - radius * 2) + radius,
                        y: Math.random() * (height - radius * 2) + radius,
                        vx: (Math.random() - 0.5) * speed * 2,
                        vy: (Math.random() - 0.5) * speed * 2,
                        radius,
                    });
                }
            };

            initBlobs();

            // Resize listener
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    width = canvas.width = entry.contentRect.width;
                    height = canvas.height = entry.contentRect.height;
                    initBlobs();
                }
            });
            resizeObserver.observe(container);

            // Mouse coordinate updates
            const handleMouseMove = (e: MouseEvent) => {
                if (!interactive) {
return;
}

                const rect = canvas.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            };

            const handleMouseLeave = () => {
                mouseRef.current = null;
            };

            if (interactive) {
                container.addEventListener('mousemove', handleMouseMove);
                container.addEventListener('mouseleave', handleMouseLeave);
            }

            const resolveColor = (colorStr: string) => {
                if (!colorStr) {
return 'rgb(16, 185, 129)';
}

                if (!colorStr.includes('var(') && !colorStr.includes('--')) {
                    return colorStr;
                }

                try {
                    const temp = document.createElement('div');
                    temp.style.color = colorStr;
                    container.appendChild(temp);
                    const resolved = window.getComputedStyle(temp).color;
                    container.removeChild(temp);

                    return resolved || 'rgb(16, 185, 129)';
                } catch (e) {
                    return 'rgb(16, 185, 129)';
                }
            };

            // Draw loop
            const draw = () => {
                // Clear with transparent background
                ctx.clearRect(0, 0, width, height);

                const activeColor = resolveColor(
                    color ||
                        window.getComputedStyle(container).color ||
                        '#10b981',
                );

                // Draw standard blobs
                blobs.forEach((b) => {
                    b.x += b.vx;
                    b.y += b.vy;

                    // Bounce logic
                    if (b.x - b.radius < 0) {
                        b.x = b.radius;
                        b.vx *= -1;
                    } else if (b.x + b.radius > width) {
                        b.x = width - b.radius;
                        b.vx *= -1;
                    }

                    if (b.y - b.radius < 0) {
                        b.y = b.radius;
                        b.vy *= -1;
                    } else if (b.y + b.radius > height) {
                        b.y = height - b.radius;
                        b.vy *= -1;
                    }

                    // Render blob with soft radial edge that contrast filter will solidify
                    const grad = ctx.createRadialGradient(
                        b.x,
                        b.y,
                        b.radius * 0.1,
                        b.x,
                        b.y,
                        b.radius,
                    );
                    grad.addColorStop(0, activeColor);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                    ctx.fillStyle = grad;
                    ctx.fill();
                });

                // Draw mouse cursor blob
                if (mouseRef.current) {
                    const mouseRadius = (minRadius + maxRadius) * 0.6;
                    const grad = ctx.createRadialGradient(
                        mouseRef.current.x,
                        mouseRef.current.y,
                        mouseRadius * 0.1,
                        mouseRef.current.x,
                        mouseRef.current.y,
                        mouseRadius,
                    );
                    grad.addColorStop(0, activeColor);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.beginPath();
                    ctx.arc(
                        mouseRef.current.x,
                        mouseRef.current.y,
                        mouseRadius,
                        0,
                        Math.PI * 2,
                    );
                    ctx.fillStyle = grad;
                    ctx.fill();
                }

                animationId = requestAnimationFrame(draw);
            };

            draw();

            return () => {
                cancelAnimationFrame(animationId);
                resizeObserver.disconnect();

                if (interactive) {
                    container.removeEventListener('mousemove', handleMouseMove);
                    container.removeEventListener(
                        'mouseleave',
                        handleMouseLeave,
                    );
                }
            };
        }, [blobCount, minRadius, maxRadius, speed, color, interactive]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    'relative h-full w-full overflow-hidden bg-background select-none',
                    className,
                )}
                {...props}
            >
                {/* The CSS filter properties create the gooey metaball fusion effect */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 size-full"
                    style={{
                        pointerEvents: 'none',
                        filter: 'blur(14px) contrast(20) hue-rotate(0deg)',
                    }}
                />
            </div>
        );
    },
);

MetaballCanvas.displayName = 'MetaballCanvas';

export default MetaballCanvas;
