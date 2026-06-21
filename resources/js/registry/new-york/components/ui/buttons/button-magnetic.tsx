import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonMagneticProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    range?: number; // Distance from center where magnetism activates
    actionStrength?: number; // How strongly the button pulls toward the mouse (0.1 to 1.0)
    children: React.ReactNode;
}

export function ButtonMagnetic({
    range = 60,
    actionStrength = 0.35,
    children,
    className,
    style,
    ...props
}: ButtonMagneticProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = trigger.getBoundingClientRect();

            // Calculate absolute center of the trigger area (which is completely static)
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Distance from mouse to center
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.hypot(deltaX, deltaY);

            // Determine active range based on dimensions or specified range
            const activeRange = Math.max(
                range,
                Math.max(rect.width, rect.height) / 1.5,
            );

            if (distance < activeRange) {
                setIsHovered(true);
                // Pull toward mouse
                setPosition({
                    x: deltaX * actionStrength,
                    y: deltaY * actionStrength,
                });
            } else {
                setIsHovered(false);
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove, {
            passive: true,
        });
        trigger.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            trigger.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [range, actionStrength]);

    return (
        <div ref={triggerRef} className="inline-block">
            <button
                className={cn(
                    'inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm select-none active:scale-95',
                    className,
                )}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    // Use a smooth, fast bezier transition when tracking to eliminate jumps, and a springy transition on snap-back
                    transition: isHovered
                        ? 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                        : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    willChange: 'transform',
                    ...style,
                }}
                {...props}
            >
                <span className="pointer-events-none relative z-10 transition-transform duration-200 group-hover:scale-105">
                    {children}
                </span>
            </button>
        </div>
    );
}

export default ButtonMagnetic;
