'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputNumberProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'min' | 'max' | 'step'
> {
    /**
     * Controlled numeric value
     */
    value?: number;
    /**
     * Default value for uncontrolled usage
     */
    defaultValue?: number;
    /**
     * Callback when number changes
     */
    onValueChange?: (value: number | undefined) => void;
    /**
     * Minimum allowed value
     */
    min?: number;
    /**
     * Maximum allowed value
     */
    max?: number;
    /**
     * Step interval for increment/decrement
     * @default 1
     */
    step?: number;
    /**
     * Decimal places precision. If omitted, is computed automatically from step.
     */
    precision?: number;
    /**
     * Unit suffix (e.g. 'px', 'rem', '%', 'kg')
     */
    suffix?: string;
    /**
     * Disable up/down stepper buttons
     * @default false
     */
    hideStepper?: boolean;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (
        {
            value: controlledValue,
            defaultValue,
            onValueChange,
            min,
            max,
            step = 1,
            precision,
            suffix,
            hideStepper = false,
            className,
            disabled,
            ...props
        },
        ref,
    ) => {
        const isControlled = controlledValue !== undefined;
        const [localValue, setLocalValue] = React.useState<string>(
            defaultValue !== undefined ? String(defaultValue) : '',
        );

        const activeValueStr = isControlled
            ? controlledValue !== undefined
                ? String(controlledValue)
                : ''
            : localValue;
        const activeValue =
            activeValueStr !== '' ? parseFloat(activeValueStr) : undefined;

        // Auto-detect precision from step if not provided
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

        // Sync controlled values
        React.useEffect(() => {
            if (isControlled) {
                setLocalValue(
                    controlledValue !== undefined
                        ? String(controlledValue)
                        : '',
                );
            }
        }, [controlledValue, isControlled]);

        // Clamp value inside min/max bounds
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

        const handleIncrement = React.useCallback(() => {
            if (disabled) {
return;
}

            const current = activeValue ?? min ?? 0;
            updateValue(current + step);
        }, [activeValue, min, step, updateValue, disabled]);

        const handleDecrement = React.useCallback(() => {
            if (disabled) {
return;
}

            const current = activeValue ?? min ?? 0;
            updateValue(current - step);
        }, [activeValue, min, step, updateValue, disabled]);

        // Long-press continuous step handler
        const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );
        const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(
            null,
        );

        const clearTimers = React.useCallback(() => {
            if (timerRef.current) {
clearTimeout(timerRef.current);
}

            if (intervalRef.current) {
clearInterval(intervalRef.current);
}
        }, []);

        const startStepper = (action: () => void) => {
            if (disabled) {
return;
}

            action();
            clearTimers();
            timerRef.current = setTimeout(() => {
                intervalRef.current = setInterval(action, 60);
            }, 400);
        };

        React.useEffect(() => {
            return () => clearTimers();
        }, [clearTimers]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleIncrement();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleDecrement();
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;

            // Allow typing numbers, decimals, minus sign
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
            // Normalize value on blur
            if (activeValueStr === '' || activeValueStr === '-') {
                updateValue(undefined);
            } else {
                const parsed = parseFloat(activeValueStr);

                if (!isNaN(parsed)) {
                    updateValue(parsed);
                } else {
                    updateValue(undefined);
                }
            }
        };

        return (
            <div className="relative flex w-full items-center">
                <Input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    value={activeValueStr}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={cn(
                        'pr-8',
                        suffix && 'pr-14',
                        hideStepper && 'pr-3',
                        className,
                    )}
                    {...props}
                />

                {suffix && (
                    <span
                        className={cn(
                            'pointer-events-none absolute text-xs text-muted-foreground transition-opacity select-none',
                            hideStepper ? 'right-3' : 'right-8',
                            disabled && 'opacity-50',
                        )}
                    >
                        {suffix}
                    </span>
                )}

                {!hideStepper && !disabled && (
                    <div className="absolute top-0.5 right-0.5 bottom-0.5 flex w-6 flex-col border-l border-border/40 bg-background/50">
                        <button
                            type="button"
                            className="flex flex-1 cursor-pointer items-center justify-center rounded-tr-md border-b border-border/20 text-muted-foreground/70 transition-colors select-none hover:bg-muted/50 hover:text-foreground active:bg-muted"
                            onMouseDown={() => startStepper(handleIncrement)}
                            onMouseUp={clearTimers}
                            onMouseLeave={clearTimers}
                            title="Increment"
                        >
                            <ChevronUp className="size-3" />
                        </button>
                        <button
                            type="button"
                            className="flex flex-1 cursor-pointer items-center justify-center rounded-br-md text-muted-foreground/70 transition-colors select-none hover:bg-muted/50 hover:text-foreground active:bg-muted"
                            onMouseDown={() => startStepper(handleDecrement)}
                            onMouseUp={clearTimers}
                            onMouseLeave={clearTimers}
                            title="Decrement"
                        >
                            <ChevronDown className="size-3" />
                        </button>
                    </div>
                )}
            </div>
        );
    },
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
export type { InputNumberProps };
