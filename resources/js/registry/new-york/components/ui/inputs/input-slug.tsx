'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

interface InputSlugProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
> {
    /**
     * The controlled display value (already-slugified string)
     */
    value?: string;
    /**
     * Callback when the slug value changes (debounced, fully cleaned)
     */
    onValueChange?: (value: string) => void;
    /**
     * Callback fires on every keystroke with the intermediate display value
     */
    onSlugChange?: (slug: string) => void;
    /**
     * Custom slug generation function
     */
    slugify?: (value: string) => string;
}

/**
 * Partial slugify — applied on every keystroke so the input feels live.
 * Allows a trailing dash while the user is still typing.
 */
function partialSlugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[\s_]+/g, '-') // spaces / underscores → dash
        .replace(/[^\w-]/g, '') // strip everything that isn't a word char or dash
        .replace(/-{2,}/g, '-') // collapse consecutive dashes
        .replace(/^-+/, ''); // strip leading dashes
}

/**
 * Final slugify — strips the trailing dash once the debounce fires.
 */
function defaultSlugify(value: string): string {
    return partialSlugify(value).replace(/-+$/, '');
}

const InputSlug = React.forwardRef<HTMLInputElement, InputSlugProps>(
    (
        {
            value: controlledValue,
            onValueChange,
            onSlugChange,
            slugify = defaultSlugify,
            ...props
        },
        ref,
    ) => {
        // Always drive the input from internal state so we can strip the trailing
        // dash on debounce regardless of whether the component is controlled.
        const [displayValue, setDisplayValue] = React.useState(
            controlledValue !== undefined ? controlledValue : '',
        );

        const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );
        // Keep the latest partial value so the debounce closure always reads it.
        const latestPartialRef = React.useRef('');
        const isControlled = controlledValue !== undefined;

        // Sync external controlled value changes (e.g. form reset, programmatic update).
        // Skip if the incoming value matches what we already show — prevents the parent
        // echoing onValueChange back and overwriting our debounced cleanup.
        const prevControlledRef = React.useRef(controlledValue);
        React.useEffect(() => {
            if (isControlled && controlledValue !== prevControlledRef.current) {
                prevControlledRef.current = controlledValue;
                setDisplayValue(controlledValue ?? '');
            }
        }, [controlledValue, isControlled]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;

            // Partial transform: live, allows trailing dash mid-typing
            const partial = partialSlugify(raw);
            latestPartialRef.current = partial;

            // Always update display immediately so typing feels instant
            setDisplayValue(partial);

            // Fire onSlugChange on every keystroke with the intermediate value
            onSlugChange?.(partial);

            // Debounce the final cleanup (strip trailing dash)
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                const final = slugify(latestPartialRef.current);

                // Strip trailing dash in the input itself
                setDisplayValue(final);
                prevControlledRef.current = final;

                onValueChange?.(final);
            }, 1000);
        };

        // Clean up on unmount
        React.useEffect(() => {
            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        }, []);

        return (
            <Input
                ref={ref}
                type="text"
                value={displayValue}
                onChange={handleChange}
                {...props}
            />
        );
    },
);

InputSlug.displayName = 'InputSlug';

export { InputSlug, defaultSlugify, partialSlugify };
export type { InputSlugProps };
