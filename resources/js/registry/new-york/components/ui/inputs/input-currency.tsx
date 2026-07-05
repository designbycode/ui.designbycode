'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputCurrencyProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
> {
    /**
     * The numeric value (as float or integer)
     */
    value?: number | string;
    /**
     * Callback when the numeric value changes
     * @param value The parsed number or raw string representation
     * @param formattedValue The formatted display value
     */
    onValueChange?: (value: number | undefined, formattedValue: string) => void;
    /**
     * ISO 4217 Currency Code
     * @default 'USD'
     */
    currency?: string;
    /**
     * Locale for formatting
     * @default 'en-US'
     */
    locale?: string;
    /**
     * Allow decimal digits
     * @default true
     */
    allowDecimals?: boolean;
    /**
     * Maximum decimal places allowed
     * @default 2
     */
    decimalsLimit?: boolean | number;
    /**
     * Allow negative values
     * @default false
     */
    allowNegativeValue?: boolean;
}

/**
 * Get currency symbol based on locale and currency code
 */
function getCurrencySymbol(locale: string, currency: string): string {
    try {
        return (0)
            .toLocaleString(locale, {
                style: 'currency',
                currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
            .replace(/\d/g, '')
            .trim();
    } catch {
        return '$';
    }
}

/**
 * Format string as currency while typing
 */
function formatCurrencyString(
    value: string,
    locale: string,
    allowDecimals: boolean,
    decimalsLimit: number,
    allowNegative: boolean,
): string {
    if (!value) {
return '';
}

    // Check if it's negative
    const isNegative = allowNegative && value.startsWith('-');

    // Clean string: keep digits, dot, and handle empty state
    let clean = value.replace(/[^\d.]/g, '');

    // Make sure we only have one decimal point
    const dotIdx = clean.indexOf('.');

    if (dotIdx !== -1) {
        clean =
            clean.substring(0, dotIdx + 1) +
            clean.substring(dotIdx + 1).replace(/\./g, '');
    }

    const parts = clean.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1];

    if (integerPart) {
        const number = parseInt(integerPart, 10);

        if (!isNaN(number)) {
            integerPart = new Intl.NumberFormat(locale, {
                useGrouping: true,
            }).format(number);
        }
    }

    if (allowDecimals && decimalPart !== undefined) {
        decimalPart = decimalPart.slice(0, decimalsLimit);

        return `${isNegative ? '-' : ''}${integerPart}.${decimalPart}`;
    }

    return `${isNegative ? '-' : ''}${integerPart}`;
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
    (
        {
            value: controlledValue,
            onValueChange,
            currency = 'USD',
            locale = 'en-US',
            allowDecimals = true,
            decimalsLimit = 2,
            allowNegativeValue = false,
            className,
            placeholder = '0.00',
            onBlur,
            onFocus,
            ...props
        },
        ref,
    ) => {
        const isControlled = controlledValue !== undefined;
        const [localValue, setLocalValue] = React.useState('');
        const localInputRef = React.useRef<HTMLInputElement>(null);

        const resolvedRef = (ref ||
            localInputRef) as React.RefObject<HTMLInputElement | null>;

        const decimalLimitVal =
            typeof decimalsLimit === 'number' ? decimalsLimit : 2;

        const symbol = React.useMemo(() => {
            return getCurrencySymbol(locale, currency);
        }, [locale, currency]);

        // Synchronize external changes
        React.useEffect(() => {
            if (isControlled) {
                if (
                    controlledValue === undefined ||
                    controlledValue === null ||
                    controlledValue === ''
                ) {
                    setLocalValue('');
                } else {
                    const strVal = String(controlledValue);
                    const formatted = formatCurrencyString(
                        strVal,
                        locale,
                        allowDecimals,
                        decimalLimitVal,
                        allowNegativeValue,
                    );
                    setLocalValue(formatted);
                }
            }
        }, [
            controlledValue,
            isControlled,
            locale,
            allowDecimals,
            decimalLimitVal,
            allowNegativeValue,
        ]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawInput = e.target.value;
            const inputEl = resolvedRef.current;

            // Save cursor position
            let cursorPosition = inputEl?.selectionStart ?? 0;
            const lengthBefore = rawInput.length;

            const formatted = formatCurrencyString(
                rawInput,
                locale,
                allowDecimals,
                decimalLimitVal,
                allowNegativeValue,
            );

            // Calculate new cursor position to prevent jumping
            const lengthAfter = formatted.length;
            cursorPosition = cursorPosition + (lengthAfter - lengthBefore);

            setLocalValue(formatted);

            // Emit raw numeric value
            const numericString = formatted.replace(/[^\d.-]/g, '');
            const numericValue = numericString
                ? parseFloat(numericString)
                : undefined;

            onValueChange?.(numericValue, formatted);

            // Restore cursor position on next tick
            setTimeout(() => {
                if (inputEl) {
                    inputEl.setSelectionRange(cursorPosition, cursorPosition);
                }
            }, 0);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            let finalValue = localValue;

            // Format to fixed decimal places on blur if decimals are allowed and value is present
            if (allowDecimals && localValue) {
                const numericString = localValue.replace(/[^\d.-]/g, '');
                const number = parseFloat(numericString);

                if (!isNaN(number)) {
                    finalValue = new Intl.NumberFormat(locale, {
                        useGrouping: true,
                        minimumFractionDigits: decimalLimitVal,
                        maximumFractionDigits: decimalLimitVal,
                    }).format(number);

                    if (
                        allowNegativeValue &&
                        numericString.startsWith('-') &&
                        !finalValue.startsWith('-')
                    ) {
                        finalValue = '-' + finalValue;
                    }
                }
            }

            setLocalValue(finalValue);

            const numericString = finalValue.replace(/[^\d.-]/g, '');
            const numericValue = numericString
                ? parseFloat(numericString)
                : undefined;
            onValueChange?.(numericValue, finalValue);

            onBlur?.(e);
        };

        return (
            <div className="relative w-full">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground/70 select-none">
                    {symbol}
                </span>
                <Input
                    ref={resolvedRef}
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={cn('pl-7', className)}
                    {...props}
                />
            </div>
        );
    },
);

InputCurrency.displayName = 'InputCurrency';

export { InputCurrency, getCurrencySymbol, formatCurrencyString };
export type { InputCurrencyProps };
