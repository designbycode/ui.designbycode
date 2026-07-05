'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ConstellationCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of particles in the constellation */
    particleCount?: number;
    /** Maximum distance between connected particles */
    maxDistance?: number;
    /** Movement speed multiplier */
    speed?: number;
    /** Color of the particles, defaults to CSS variable or currentColor */
    particleColor?: string;
    /** Color of the connecting lines */
    linkColor?: string;
    /** Enable mouse interaction */
    interactive?: boolean;
    /** Size of the particles */
    particleSize?: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export const ConstellationCanvas = React.forwardRef<
    HTMLDivElement,
    ConstellationCanvasProps
>(
    (
        {
            className,
            particleCount = 60,
            maxDistance = 100,
            speed = 0.5,
            particleColor,
            linkColor,
            interactive = true,
            particleSize = 2,
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

            const particles: Particle[] = [];

            // Initialize particles
            const initParticles = () => {
                particles.length = 0;
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * speed,
                        vy: (Math.random() - 0.5) * speed,
                        radius: Math.random() * particleSize + 1,
                    });
                }
            };

            initParticles();

            // Resize observer
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    width = canvas.width = entry.contentRect.width;
                    height = canvas.height = entry.contentRect.height;
                    initParticles();
                }
            });
            resizeObserver.observe(container);

            // Mouse events
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
                // If it is a raw HSL variable (like "240 5.9% 90%"), wrap it in var() if it is a variable name,
                // or if it contains spaces and no HSL wrapper, try wrapping it.
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

                // Fetch colors inside loop to support reactive color scheme swaps
                const activeParticleColor = resolveColor(
                    particleColor || getComputedStyle(container).color,
                    'rgba(16, 185, 129, 0.8)',
                );
                const activeLinkColor = resolveColor(
                    linkColor || `var(--border)`,
                    'rgba(226, 232, 240, 0.4)',
                );

                // Update and draw particles
                particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Boundary collision
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = activeParticleColor;
                    ctx.fill();
                });

                // Connect particles
                for (let i = 0; i < particles.length; i++) {
                    const pi = particles[i];

                    // Connect to mouse if active
                    if (mouseRef.current) {
                        const dx = mouseRef.current.x - pi.x;
                        const dy = mouseRef.current.y - pi.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < maxDistance * 1.5) {
                            ctx.beginPath();
                            ctx.moveTo(pi.x, pi.y);
                            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                            const alpha =
                                (1 - dist / (maxDistance * 1.5)) * 0.45;
                            ctx.strokeStyle = activeLinkColor.includes('rgba')
                                ? activeLinkColor.replace(
                                      /[\d.]+\)$/,
                                      `${alpha})`,
                                  )
                                : `rgba(16, 185, 129, ${alpha})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }

                    for (let j = i + 1; j < particles.length; j++) {
                        const pj = particles[j];
                        const dx = pi.x - pj.x;
                        const dy = pi.y - pj.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < maxDistance) {
                            ctx.beginPath();
                            ctx.moveTo(pi.x, pi.y);
                            ctx.lineTo(pj.x, pj.y);
                            const alpha = (1 - dist / maxDistance) * 0.25;
                            ctx.strokeStyle = activeLinkColor.includes('rgba')
                                ? activeLinkColor.replace(
                                      /[\d.]+\)$/,
                                      `${alpha})`,
                                  )
                                : `rgba(16, 185, 129, ${alpha})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
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
        }, [
            particleCount,
            maxDistance,
            speed,
            particleColor,
            linkColor,
            interactive,
            particleSize,
        ]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    'relative h-full w-full overflow-hidden select-none',
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

ConstellationCanvas.displayName = 'ConstellationCanvas';

export default ConstellationCanvas;
