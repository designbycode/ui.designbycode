'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface WaveGridCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Spacing between grid points in pixels */
    gridSpacing?: number;
    /** Shape to render at grid nodes ('circle' | 'square' | 'cross') */
    shape?: 'circle' | 'square' | 'cross';
    /** Maximum scale factor when rippling */
    maxScale?: number;
    /** Animation speed multiplier */
    speed?: number;
    /** Grid color, defaults to muted border color or primary */
    color?: string;
    /** Enable hover interaction (ripple originates from mouse pointer) */
    interactive?: boolean;
}

export const WaveGridCanvas = React.forwardRef<
    HTMLDivElement,
    WaveGridCanvasProps
>(
    (
        {
            className,
            gridSpacing = 30,
            shape = 'circle',
            maxScale = 2.0,
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
            let time = 0;

            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    width = canvas.width = entry.contentRect.width;
                    height = canvas.height = entry.contentRect.height;
                }
            });
            resizeObserver.observe(container);

            const handleMouseMove = (e: MouseEvent) => {
                if (!interactive) return;
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

            const resolveColor = (colorStr: string, defaultVal: string) => {
                if (!colorStr) return defaultVal;
                let targetColor = colorStr;
                if (colorStr.startsWith('--')) {
                    targetColor = `var(${colorStr})`;
                }
                if (
                    !targetColor.includes('var(') &&
                    !targetColor.includes('--')
                ) {
                    return targetColor;
                }
                try {
                    const temp = document.createElement('div');
                    temp.style.color = targetColor;
                    container.appendChild(temp);
                    const resolved = window.getComputedStyle(temp).color;
                    container.removeChild(temp);
                    return resolved || defaultVal;
                } catch (e) {
                    return defaultVal;
                }
            };

            // Draw loop
            const draw = () => {
                ctx.clearRect(0, 0, width, height);

                const activeColor = resolveColor(
                    color || window.getComputedStyle(container).color,
                    'rgba(16, 185, 129, 0.4)',
                );

                time += speed * 0.05;

                const cols = Math.floor(width / gridSpacing) + 2;
                const rows = Math.floor(height / gridSpacing) + 2;

                const offsetX = (width % gridSpacing) / 2;
                const offsetY = (height % gridSpacing) / 2;

                for (let c = 0; c < cols; c++) {
                    for (let r = 0; r < rows; r++) {
                        const x = c * gridSpacing - gridSpacing / 2 + offsetX;
                        const y = r * gridSpacing - gridSpacing / 2 + offsetY;

                        let dist = 0;
                        let influence = 0;

                        if (mouseRef.current) {
                            const dx = mouseRef.current.x - x;
                            const dy = mouseRef.current.y - y;
                            dist = Math.sqrt(dx * dx + dy * dy);

                            // Proximity influence within 200px of mouse
                            if (dist < 220) {
                                influence = 1 - dist / 220;
                            }
                        } else {
                            // Subtle default pulsing wave in the center if no mouse
                            const dx = width * 0.5 - x;
                            const dy = height * 0.5 - y;
                            dist = Math.sqrt(dx * dx + dy * dy);
                            influence =
                                Math.sin(dist * 0.02 - time * 0.3) * 0.5 + 0.5;
                        }

                        // Calculate scale & opacity based on influence and sine ripples
                        const waveFactor =
                            Math.sin(dist * 0.04 - time) * 0.5 + 0.5;
                        const scale =
                            1.0 + (maxScale - 1.0) * influence * waveFactor;
                        const opacity = 0.15 + 0.65 * influence * waveFactor;

                        ctx.save();
                        ctx.translate(x, y);
                        ctx.globalAlpha = opacity;
                        ctx.fillStyle = activeColor;
                        ctx.strokeStyle = activeColor;

                        const baseSize = 2.5;
                        const size = baseSize * scale;

                        // Render geometric shape
                        if (shape === 'circle') {
                            ctx.beginPath();
                            ctx.arc(0, 0, size, 0, Math.PI * 2);
                            ctx.fill();
                        } else if (shape === 'square') {
                            ctx.fillRect(-size, -size, size * 2, size * 2);
                        } else if (shape === 'cross') {
                            ctx.lineWidth = 1.2;
                            ctx.beginPath();
                            // Horizontal
                            ctx.moveTo(-size, 0);
                            ctx.lineTo(size, 0);
                            // Vertical
                            ctx.moveTo(0, -size);
                            ctx.lineTo(0, size);
                            ctx.stroke();
                        }

                        ctx.restore();
                    }
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
        }, [gridSpacing, shape, maxScale, speed, color, interactive]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    'relative h-full w-full overflow-hidden bg-background select-none',
                    className,
                )}
                {...props}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 size-full"
                    style={{ pointerEvents: 'none' }}
                />
            </div>
        );
    },
);

WaveGridCanvas.displayName = 'WaveGridCanvas';

export default WaveGridCanvas;
