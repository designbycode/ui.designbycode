'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import type { AnimationType } from '@/registry/new-york/components/ui/animations/text-animator';

export interface TextCircleLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Text to display and animate inside the circle loader.
     * Default: "Generating..."
     */
    text?: string;
    /**
     * Pre-defined aesthetic variants
     * - `neon-ring`: Solid spinning ring with deep inset glow shadows mapping to primary and chart colors
     * - `gradient-dash`: Concentric dashed borders rotating in opposite directions for a techy HUD feel
     * - `liquid-blob`: A rotating organic blob that morphs shape fluidly using keyframed border-radius transitions
     */
    variant?: 'neon-ring' | 'gradient-dash' | 'liquid-blob';
    /**
     * Sizing of the loader
     * - `sm`: 140px
     * - `md`: 180px
     * - `lg`: 220px
     * Or pass a number (in pixels) for custom sizes.
     */
    size?: 'sm' | 'md' | 'lg' | number;
    /**
     * GSAP text animation type from TextAnimator component.
     * Default: "wave"
     */
    textAnimation?: AnimationType;
    /**
     * Duration of the text animation loop in seconds.
     * Default: 1.5
     */
    textDuration?: number;
    /**
     * Stagger delay between characters.
     * Default: 0.06
     */
    textStagger?: number;
    /**
     * Rotation / morphing speed of the ring in seconds.
     * Default: 2.5
     */
    ringDuration?: number;
}

export function TextCircleLoader({
    text = 'Generating',
    variant = 'neon-ring',
    size = 'md',
    textAnimation = 'wave',
    textDuration = 1.5,
    textStagger = 0.06,
    ringDuration = 2.5,
    className,
    style,
    ...props
}: TextCircleLoaderProps) {
    const sizePx =
        typeof size === 'number' ? size : { sm: 140, md: 180, lg: 220 }[size];

    return (
        <div
            className={cn(
                'relative flex items-center justify-center rounded-full border border-border/10 bg-transparent select-none',
                className,
            )}
            style={{
                width: sizePx,
                height: sizePx,
                ...style,
            }}
            {...props}
        >
            {/* Rotating / Animating Ring backdrops */}
            {variant === 'neon-ring' && (
                <div
                    className="absolute inset-0 z-0 animate-neon-ring-rotate rounded-full bg-transparent"
                    style={{
                        ['--animate-neon-ring-rotate-duration' as any]: `${ringDuration}s`,
                    }}
                />
            )}

            {variant === 'gradient-dash' && (
                <>
                    {/* Outer Dashed Ring */}
                    <div
                        className="absolute inset-0 z-0 animate-spin rounded-full border-2 border-dashed border-primary/50"
                        style={{
                            animationDuration: `${ringDuration}s`,
                        }}
                    />
                    {/* Inner Dotted Ring - Counter Rotating */}
                    <div
                        className="absolute inset-3 z-0 animate-spin rounded-full border border-dotted border-chart-2/60"
                        style={{
                            animationDuration: `${ringDuration * 1.5}s`,
                            animationDirection: 'reverse',
                        }}
                    />
                    {/* Secondary Accent Ring */}
                    <div className="absolute inset-6 z-0 animate-[pulse_2s_ease-in-out_infinite] rounded-full border border-primary/10" />
                </>
            )}

            {variant === 'liquid-blob' && (
                <div
                    className="absolute inset-0 z-0 animate-liquid-blob-rotate bg-transparent"
                    style={{
                        ['--animate-liquid-blob-rotate-duration' as any]: `${ringDuration * 1.6}s`,
                    }}
                />
            )}

            {/* Text Animator Component for letters */}
            <div className="relative z-10 font-medium tracking-wide text-foreground">
                <TextAnimator
                    text={text}
                    animation={textAnimation}
                    duration={textDuration}
                    stagger={textStagger}
                    repeat={-1}
                    yoyo={true}
                    fontSize={sizePx * 0.09}
                    className="font-semibold text-foreground/90 drop-shadow-sm select-none"
                />
            </div>
        </div>
    );
}

TextCircleLoader.displayName = 'TextCircleLoader';
