'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AuroraCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of colored auroral bands to render */
    bandCount?: number;
    /** Shifting speed of the waves */
    speed?: number;
    /** Vertical wave amplitude */
    amplitude?: number;
    /** Color bands palette array */
    colors?: string[];
    /** Canvas global composite blend operation (e.g. 'screen', 'lighter', 'source-over') */
    blendMode?: GlobalCompositeOperation;
    /** Enable gentle mouse interaction to attract the aurora bands */
    interactive?: boolean;
}

export const AuroraCanvas = React.forwardRef<HTMLDivElement, AuroraCanvasProps>(
    (
        {
            className,
            bandCount = 4,
            speed = 0.6,
            amplitude = 50,
            colors = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'],
            blendMode = 'screen',
            interactive = true,
            ...props
        },
        ref
    ) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const canvasRef = React.useRef<HTMLCanvasElement>(null);
        const mouseRef = React.useRef<{ x: number; y: number } | null>(null);

        React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

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
                if (!targetColor.includes('var(') && !targetColor.includes('--')) {
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
                // Clear canvas with black/transparent depending on theme
                ctx.clearRect(0, 0, width, height);

                ctx.save();
                ctx.globalCompositeOperation = blendMode;

                time += speed * 0.003;

                // Render each auroral wave band
                for (let i = 0; i < bandCount; i++) {
                    const colorIndex = i % colors.length;
                    const baseColor = colors[colorIndex];
                    const activeBaseColor = resolveColor(baseColor, '#10b981');
                    const offset = i * (Math.PI / bandCount);

                    // Dynamic wave points
                    const y1 = height * 0.5 + Math.sin(time + offset) * amplitude;
                    const y2 = height * 0.5 + Math.cos(time + offset * 1.5) * amplitude;
                    
                    // Mouse influence
                    let mouseInfluenceX = 0;
                    let mouseInfluenceY = 0;
                    if (mouseRef.current) {
                        mouseInfluenceX = (mouseRef.current.x - width * 0.5) * 0.05;
                        mouseInfluenceY = (mouseRef.current.y - height * 0.5) * 0.15;
                    }

                    const cp1x = width * 0.25 + mouseInfluenceX;
                    const cp1y = height * 0.5 + Math.sin(time * 1.2 + offset * 2) * (amplitude * 2) + mouseInfluenceY;
                    const cp2x = width * 0.75 - mouseInfluenceX;
                    const cp2y = height * 0.5 + Math.cos(time * 0.8 + offset * 2.5) * (amplitude * 2.5) + mouseInfluenceY;

                    // Setup linear gradient for glowing transparency along the path
                    const grad = ctx.createLinearGradient(0, 0, width, 0);
                    grad.addColorStop(0, 'rgba(0,0,0,0)');
                    grad.addColorStop(0.3, activeBaseColor);
                    grad.addColorStop(0.7, activeBaseColor);
                    grad.addColorStop(1, 'rgba(0,0,0,0)');

                    // Wave path
                    ctx.beginPath();
                    ctx.moveTo(0, y1);
                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width, y2);

                    // Thick strokes with high opacity blur mimic auroral bands
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 90 + Math.sin(time + i) * 30; // Shifting wave thickness
                    ctx.lineCap = 'round';
                    ctx.shadowColor = activeBaseColor;
                    ctx.shadowBlur = 45;
                    ctx.globalAlpha = 0.22 - (i * 0.03); // Overlay layers nicely
                    ctx.stroke();
                }

                ctx.restore();
                animationId = requestAnimationFrame(draw);
            };

            draw();

            return () => {
                cancelAnimationFrame(animationId);
                resizeObserver.disconnect();
                if (interactive) {
                    container.removeEventListener('mousemove', handleMouseMove);
                    container.removeEventListener('mouseleave', handleMouseLeave);
                }
            };
        }, [bandCount, speed, amplitude, colors, blendMode, interactive]);

        return (
            <div
                ref={containerRef}
                className={cn('relative w-full h-full overflow-hidden select-none bg-background/55', className)}
                {...props}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 size-full"
                    style={{ pointerEvents: 'none' }}
                />
            </div>
        );
    }
);

AuroraCanvas.displayName = 'AuroraCanvas';

export default AuroraCanvas;
