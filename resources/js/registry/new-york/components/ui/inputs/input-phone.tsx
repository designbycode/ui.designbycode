'use client';

import { Phone } from 'lucide-react';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputPhoneProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
> {
    /**
     * Raw numeric value (digits only)
     */
    value?: string;
    /**
     * Callback when the raw digit value changes
     */
    onValueChange?: (value: string) => void;
    /**
     * Custom phone format mask. Use '9' for digits.
     * @default '(999) 999-9999'
     */
    mask?: string;
    /**
     * Show/hide the phone icon prefix
     * @default true
     */
    showIcon?: boolean;
}

/**
 * Formats a raw string of digits using the provided mask.
 */
function formatPhone(digits: string, mask: string): string {
    let formatted = '';
    let digitIdx = 0;

    for (let i = 0; i < mask.length; i++) {
        const maskChar = mask[i];

        if (digitIdx >= digits.length) {
            break;
        }

        if (maskChar === '9') {
            formatted += digits[digitIdx];
            digitIdx++;
        } else {
            formatted += maskChar;
        }
    }

    return formatted;
}

const InputPhone = React.forwardRef<HTMLInputElement, InputPhoneProps>(
    (
        {
            value: controlledValue,
            onValueChange,
            mask = '(999) 999-9999',
            showIcon = true,
            className,
            placeholder = '(555) 000-0000',
            ...props
        },
        ref,
    ) => {
        const isControlled = controlledValue !== undefined;
        const [localValue, setLocalValue] = React.useState('');

        const rawValue = isControlled ? controlledValue : localValue;

        // Strip non-digits to get raw value
        const getRawDigits = (val: string) => val.replace(/\D/g, '');

        const maxDigits = React.useMemo(() => {
            return mask.split('').filter((c) => c === '9').length;
        }, [mask]);

        const formattedDisplayValue = React.useMemo(() => {
            return formatPhone(rawValue, mask);
        }, [rawValue, mask]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawDigits = getRawDigits(e.target.value).slice(0, maxDigits);

            if (!isControlled) {
                setLocalValue(rawDigits);
            }

            onValueChange?.(rawDigits);
        };

        // Handle pasting and character deletion
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Prevent entering non-numeric chars (allow control keys)
            const allowedKeys = [
                'Backspace',
                'Delete',
                'ArrowLeft',
                'ArrowRight',
                'Tab',
                'Enter',
                'v',
                'c',
                'a',
            ];
            const isControlKey =
                allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey;

            if (!isControlKey && !/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        };

        return (
            <div className="relative w-full">
                {showIcon && (
                    <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/70" />
                )}
                <Input
                    ref={ref}
                    type="text"
                    value={formattedDisplayValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(showIcon && 'pl-9', className)}
                    {...props}
                />
            </div>
        );
    },
);

InputPhone.displayName = 'InputPhone';

export { InputPhone, formatPhone };
export type { InputPhoneProps };
