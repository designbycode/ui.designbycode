'use client';

import { Plus, Minus } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputNumberStepperProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'min' | 'max' | 'step'
> {
    /** Controlled numeric value */
    value?: number;
    /** Default value for uncontrolled usage */
    defaultValue?: number;
    /** Callback when value changes */
    onValueChange?: (value: number | undefined) => void;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step interval */
    step?: number;
    /** Precision of decimal points */
    precision?: number;
    /**
     * Stepper control variations
     * @default 'split'
     */
    variant?: 'split' | 'right' | 'left' | 'inline';
}

const InputNumberStepper = React.forwardRef<
    HTMLInputElement,
    InputNumberStepperProps
>(
    (
        {
            value: controlledValue,
            defaultValue,
            onValueChange,
            min,
            max,
            step = 1,
            precision,
            variant = 'split',
            className,
            disabled,
            ...props
        },
        ref,
    ) => {
        const isControlled = controlledValue !== undefined;
        const [localValue, setLocalValue] = React.useState<string>(
            defaultValue !== undefined ? String(defaultValue) : '0',
        );

        const activeValueStr = isControlled
            ? controlledValue !== undefined
                ? String(controlledValue)
                : ''
            : localValue;
        const activeValue =
            activeValueStr !== '' ? parseFloat(activeValueStr) : undefined;

        const resolvedPrecision = React.useMemo(() => {
            if (precision !== undefined) {
return precision;
}

            const stepStr = String(step);

            if (stepStr.indexOf('.') === -1) {
return 0;
}

            return stepStr.length - stepStr.indexOf('.') - 1;
        }, [step, precision]);

        React.useEffect(() => {
            if (isControlled) {
                setLocalValue(
                    controlledValue !== undefined
                        ? String(controlledValue)
                        : '',
                );
            }
        }, [controlledValue, isControlled]);

        const clamp = React.useCallback(
            (val: number): number => {
                let clamped = val;

                if (min !== undefined && clamped < min) {
clamped = min;
}

                if (max !== undefined && clamped > max) {
clamped = max;
}

                return parseFloat(clamped.toFixed(resolvedPrecision));
            },
            [min, max, resolvedPrecision],
        );

        const updateValue = React.useCallback(
            (newVal: number | undefined) => {
                let finalVal = newVal;

                if (finalVal !== undefined) {
                    finalVal = clamp(finalVal);
                }

                if (!isControlled) {
                    setLocalValue(
                        finalVal !== undefined ? String(finalVal) : '',
                    );
                }

                onValueChange?.(finalVal);
            },
            [isControlled, clamp, onValueChange],
        );

        const handleIncrement = () => {
            if (disabled) {
return;
}

            const current = activeValue ?? min ?? 0;
            updateValue(current + step);
        };

        const handleDecrement = () => {
            if (disabled) {
return;
}

            const current = activeValue ?? min ?? 0;
            updateValue(current - step);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;

            if (raw === '' || raw === '-') {
                setLocalValue(raw);
                onValueChange?.(undefined);

                return;
            }

            const parsed = parseFloat(raw);

            if (!isNaN(parsed)) {
                setLocalValue(raw);
                onValueChange?.(parsed);
            }
        };

        const handleBlur = () => {
            if (activeValueStr === '' || activeValueStr === '-') {
                updateValue(undefined);
            } else {
                const parsed = parseFloat(activeValueStr);
                updateValue(isNaN(parsed) ? undefined : parsed);
            }
        };

        const buttonClass =
            'size-9 cursor-pointer hover:bg-muted/70 active:scale-95 transition-all text-muted-foreground hover:text-foreground shrink-0';

        // Layout Variants
        if (variant === 'split') {
            return (
                <div className={cn('flex items-center gap-1', className)}>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={buttonClass}
                        onClick={handleDecrement}
                        disabled={
                            disabled ||
                            (min !== undefined &&
                                activeValue !== undefined &&
                                activeValue <= min)
                        }
                    >
                        <Minus className="size-4" />
                    </Button>
                    <Input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        value={activeValueStr}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="h-9 w-16 text-center focus-visible:ring-1"
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={buttonClass}
                        onClick={handleIncrement}
                        disabled={
                            disabled ||
                            (max !== undefined &&
                                activeValue !== undefined &&
                                activeValue >= max)
                        }
                    >
                        <Plus className="size-4" />
                    </Button>
                </div>
            );
        }

        if (variant === 'left') {
            return (
                <div className={cn('flex items-center gap-1', className)}>
                    <div className="flex overflow-hidden rounded-md border bg-background">
                        <Button
                            type="button"
                            variant="ghost"
                            className={cn(buttonClass, 'rounded-none border-r')}
                            onClick={handleDecrement}
                            disabled={
                                disabled ||
                                (min !== undefined &&
                                    activeValue !== undefined &&
                                    activeValue <= min)
                            }
                        >
                            <Minus className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className={cn(buttonClass, 'rounded-none')}
                            onClick={handleIncrement}
                            disabled={
                                disabled ||
                                (max !== undefined &&
                                    activeValue !== undefined &&
                                    activeValue >= max)
                            }
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>
                    <Input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        value={activeValueStr}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="h-9 w-16 text-center"
                        {...props}
                    />
                </div>
            );
        }

        if (variant === 'right') {
            return (
                <div className={cn('flex items-center gap-1', className)}>
                    <Input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        value={activeValueStr}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="h-9 w-16 text-center"
                        {...props}
                    />
                    <div className="flex overflow-hidden rounded-md border bg-background">
                        <Button
                            type="button"
                            variant="ghost"
                            className={cn(buttonClass, 'rounded-none border-r')}
                            onClick={handleDecrement}
                            disabled={
                                disabled ||
                                (min !== undefined &&
                                    activeValue !== undefined &&
                                    activeValue <= min)
                            }
                        >
                            <Minus className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className={cn(buttonClass, 'rounded-none')}
                            onClick={handleIncrement}
                            disabled={
                                disabled ||
                                (max !== undefined &&
                                    activeValue !== undefined &&
                                    activeValue >= max)
                            }
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>
                </div>
            );
        }

        // Inline minimal variant: buttons overlaid inside input edges
        return (
            <div
                className={cn(
                    'relative flex max-w-[120px] items-center',
                    className,
                )}
            >
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 z-10 size-7 cursor-pointer rounded-sm text-muted-foreground hover:bg-muted"
                    onClick={handleDecrement}
                    disabled={
                        disabled ||
                        (min !== undefined &&
                            activeValue !== undefined &&
                            activeValue <= min)
                    }
                >
                    <Minus className="size-3.5" />
                </Button>
                <Input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    value={activeValueStr}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className="h-9 w-full px-8 text-center"
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 z-10 size-7 cursor-pointer rounded-sm text-muted-foreground hover:bg-muted"
                    onClick={handleIncrement}
                    disabled={
                        disabled ||
                        (max !== undefined &&
                            activeValue !== undefined &&
                            activeValue >= max)
                    }
                >
                    <Plus className="size-3.5" />
                </Button>
            </div>
        );
    },
);

InputNumberStepper.displayName = 'InputNumberStepper';

export { InputNumberStepper };
export type { InputNumberStepperProps };
