'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ParticlesBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    count?: number;
    colorClassName?: string;
}

export function ParticlesBackdrop({
    className,
    count = 15,
    colorClassName = 'bg-primary/40',
    ...props
}: ParticlesBackdropProps) {
    // Generate static positions for floating particles
    const particles = React.useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2, // 2px to 6px
            delay: `${Math.random() * 8}s`,
            duration: `${15 + Math.random() * 15}s`,
        }));
    }, [count]);

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 overflow-hidden select-none',
                className,
            )}
            {...props}
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes float-particle-core {
                    0% { transform: translateY(0) scale(1); opacity: 0.15; }
                    50% { transform: translateY(-60px) scale(1.2); opacity: 0.6; }
                    100% { transform: translateY(0) scale(1); opacity: 0.15; }
                }
                .floating-dot-core {
                    animation: float-particle-core var(--duration) ease-in-out infinite;
                    animation-delay: var(--delay);
                }
            `,
                }}
            />
            {particles.map((p) => (
                <span
                    key={p.id}
                    className={cn(
                        'floating-dot-core absolute rounded-full',
                        colorClassName,
                    )}
                    style={
                        {
                            top: p.top,
                            left: p.left,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            '--delay': p.delay,
                            '--duration': p.duration,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
}

export default ParticlesBackdrop;
