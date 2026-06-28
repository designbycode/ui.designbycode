'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FlowFieldCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of particles flowing in the field */
    particleCount?: number;
    /** Speed multiplier for the particle movement */
    speed?: number;
    /** Scale of the vector field grid (lower is smoother waves, higher is more chaotic) */
    fieldScale?: number;
    /** Line width of the particle trails */
    lineWidth?: number;
    /** Particle trail fade speed (0.01 - 0.1 for longer trails, 1 for no trails) */
    fadeRate?: number;
    /** Color of the flow lines, defaults to primary or text color */
    color?: string;
    /** Enable mouse interaction to deflect the vector field */
    interactive?: boolean;
}

interface FlowParticle {
    x: number;
    y: number;
    px: number;
    py: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
}

export const FlowFieldCanvas = React.forwardRef<HTMLDivElement, FlowFieldCanvasProps>(
    (
        {
            className,
            particleCount = 200,
            speed = 1.2,
            fieldScale = 0.004,
            lineWidth = 1.2,
            fadeRate = 0.06,
            color,
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

            const ctx = canvas.getContext('2d', { willReadFrequently: false });
            if (!ctx) {
                return;
            }

            let animationId: number;
            let width = (canvas.width = container.offsetWidth);
            let height = (canvas.height = container.offsetHeight);
            let time = 0;

            const particles: FlowParticle[] = [];

            const createParticle = (): FlowParticle => {
                const rx = Math.random() * width;
                const ry = Math.random() * height;
                return {
                    x: rx,
                    y: ry,
                    px: rx,
                    py: ry,
                    vx: 0,
                    vy: 0,
                    life: 0,
                    maxLife: Math.random() * 200 + 100,
                };
            };

            const initParticles = () => {
                particles.length = 0;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(createParticle());
                }
                ctx.clearRect(0, 0, width, height);
            };

            initParticles();

            // Resize listener
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    width = canvas.width = entry.contentRect.width;
                    height = canvas.height = entry.contentRect.height;
                    initParticles();
                }
            });
            resizeObserver.observe(container);

            // Mouse coordinates
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
                // Apply trail fade effect
                ctx.fillStyle = `rgba(0, 0, 0, ${fadeRate})`;
                
                // If trail fade is not 1, we fill with translucent black/card background to fade trails
                // We fetch the theme background color to make trail fade work on light/dark modes
                const bgStyle = window.getComputedStyle(container).backgroundColor;
                const isDark = bgStyle.includes('rgba(0, 0, 0') || bgStyle.includes('rgb(0, 0, 0') || bgStyle.includes('rgb(9, 9, 11');
                
                ctx.fillStyle = isDark 
                    ? `rgba(9, 9, 11, ${fadeRate})` 
                    : `rgba(255, 255, 255, ${fadeRate})`;
                
                ctx.fillRect(0, 0, width, height);

                const activeColor = resolveColor(
                    color || window.getComputedStyle(container).color,
                    'rgba(16, 185, 129, 0.8)'
                );

                time += 0.003;

                particles.forEach((p, idx) => {
                    p.life++;

                    // Respawn dead particles or boundary checks
                    if (p.life > p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                        Object.assign(p, createParticle());
                    }

                    // Vector field generation using nested trigonometric math functions (Perlin surrogate)
                    let angle =
                        Math.sin(p.x * fieldScale + time) * Math.PI * 2 +
                        Math.cos(p.y * fieldScale - time) * Math.PI * 2;

                    // Mouse attraction influence
                    if (mouseRef.current) {
                        const dx = mouseRef.current.x - p.x;
                        const dy = mouseRef.current.y - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            const mouseAngle = Math.atan2(dy, dx);
                            // Blend angle towards mouse direction
                            const blendStrength = (1 - dist / 150) * 0.45;
                            angle = angle * (1 - blendStrength) + mouseAngle * blendStrength;
                        }
                    }

                    // Compute velocity from angle
                    p.vx = Math.cos(angle) * speed;
                    p.vy = Math.sin(angle) * speed;

                    p.px = p.x;
                    p.py = p.y;

                    p.x += p.vx;
                    p.y += p.vy;

                    // Draw line segments
                    ctx.beginPath();
                    ctx.moveTo(p.px, p.py);
                    ctx.lineTo(p.x, p.y);
                    ctx.strokeStyle = activeColor;
                    ctx.lineWidth = lineWidth;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                });

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
        }, [particleCount, speed, fieldScale, lineWidth, fadeRate, color, interactive]);

        return (
            <div
                ref={containerRef}
                className={cn('relative w-full h-full overflow-hidden select-none', className)}
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

FlowFieldCanvas.displayName = 'FlowFieldCanvas';

export default FlowFieldCanvas;
