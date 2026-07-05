'use client';

import { LayoutGroup, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SlidingRadioOption {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
    /**
     * Custom class names specifically for the active glider background and text when this option is selected.
     * Use this to create custom per-option gradient effects or custom glow shadows.
     */
    gliderClassName?: string;
}

export interface SlidingRadioGroupProps {
    options: SlidingRadioOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    /**
     * Pre-defined aesthetic styles
     * - `glass`: Translucent blurred background with subtle borders and glossy glider
     * - `neon`: Dark-mode optimized card layout with a glowing accent-colored glider
     * - `bouncy`: Minimalist, pill-shaped design with a high-elasticity glider transition
     */
    variant?: 'glass' | 'neon' | 'bouncy';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
}

export function SlidingRadioGroup({
    options,
    value,
    defaultValue,
    onChange,
    name,
    variant = 'glass',
    size = 'md',
    className,
    labelClassName,
    disabled = false,
}: SlidingRadioGroupProps) {
    const uniqueId = React.useId();
    const [localValue, setLocalValue] = React.useState(defaultValue || '');

    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : localValue;

    const handleSelect = (val: string) => {
        if (disabled) {
return;
}

        if (!isControlled) {
            setLocalValue(val);
        }

        onChange?.(val);
    };

    // Ensure we have a valid selection; default to first if none is selected
    React.useEffect(() => {
        if (!selectedValue && options.length > 0) {
            const firstEnabled = options.find((opt) => !opt.disabled);

            if (firstEnabled) {
                handleSelect(firstEnabled.value);
            }
        }
    }, [selectedValue, options]);

    // Active option details
    const activeOption = options.find((opt) => opt.value === selectedValue);

    // Variant style maps
    const wrapperVariants = {
        glass: 'bg-muted/10 border border-border/40 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.05)] rounded-xl p-1',
        neon: 'bg-card border border-border/60 shadow-xs rounded-lg p-1',
        bouncy: 'bg-muted/80 border border-border/30 rounded-full p-1',
    };

    const labelVariants = {
        glass: 'text-muted-foreground hover:text-foreground font-semibold',
        neon: 'text-muted-foreground hover:text-foreground font-medium',
        bouncy: 'text-muted-foreground hover:text-foreground font-medium',
    };

    const activeLabelVariants = {
        glass: 'text-foreground',
        neon: 'text-primary',
        bouncy: 'text-foreground font-semibold',
    };

    const gliderDefaultVariants = {
        glass: 'bg-linear-to-br from-primary/30 to-primary/10 border border-primary/20 shadow-xs rounded-lg',
        neon: 'bg-primary/10 border border-primary text-primary shadow-[0_0_12px_rgba(var(--color-primary),0.15)] rounded-md',
        bouncy: 'bg-background shadow-md border border-border/10 rounded-full',
    };

    const sizeClasses = {
        sm: {
            wrapper: 'h-8 gap-0.5',
            label: 'text-xs px-3 py-1 min-w-[70px]',
        },
        md: {
            wrapper: 'h-10 gap-1',
            label: 'text-sm px-4 py-1.5 min-w-[90px]',
        },
        lg: {
            wrapper: 'h-12 gap-1.5',
            label: 'text-base px-6 py-2 min-w-[110px]',
        },
    };

    // Transition styles for the glider
    const gliderTransitions = {
        glass: { type: 'spring', stiffness: 350, damping: 28 },
        neon: { type: 'spring', stiffness: 400, damping: 30 },
        bouncy: { type: 'spring', stiffness: 480, damping: 22 }, // High elasticity / bounce
    };

    const radioGroupName = name || `sliding-radio-${uniqueId}`;

    return (
        <LayoutGroup id={uniqueId}>
            <div
                role="radiogroup"
                aria-disabled={disabled}
                className={cn(
                    'relative inline-flex w-fit items-center select-none',
                    wrapperVariants[variant],
                    sizeClasses[size].wrapper,
                    disabled && 'cursor-not-allowed opacity-60',
                    className,
                )}
            >
                {options.map((option) => {
                    const isSelected = selectedValue === option.value;
                    const isDisabled = disabled || option.disabled;

                    return (
                        <label
                            key={option.value}
                            className={cn(
                                'relative flex h-full cursor-pointer items-center justify-center transition-colors duration-200 ease-in-out focus-within:outline-none',
                                sizeClasses[size].label,
                                isSelected
                                    ? activeLabelVariants[variant]
                                    : labelVariants[variant],
                                isDisabled &&
                                    'pointer-events-none cursor-not-allowed opacity-40',
                                labelClassName,
                            )}
                        >
                            <input
                                type="radio"
                                name={radioGroupName}
                                value={option.value}
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() => handleSelect(option.value)}
                                className="sr-only"
                            />

                            {/* Sliding gliders */}
                            {isSelected && (
                                <motion.div
                                    layoutId="active-glider"
                                    className={cn(
                                        'absolute inset-0 z-0',
                                        option.gliderClassName ||
                                            gliderDefaultVariants[variant],
                                    )}
                                    transition={gliderTransitions[variant]}
                                />
                            )}

                            {/* Label text */}
                            <span className="relative z-10">
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </LayoutGroup>
    );
}

SlidingRadioGroup.displayName = 'SlidingRadioGroup';
