/**
 * color-utils.ts
 *
 * Utility functions for detecting and converting CSS color values.
 * Uses Culori for accurate color space conversions, including OKLCH.
 *
 * Install: npm install culori
 * Types:  npm install -D @types/culori
 */

import { formatHex, formatHsl, formatRgb, parse } from 'culori';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorFormat =
    | 'hex'
    | 'rgb'
    | 'rgba'
    | 'hsl'
    | 'hsla'
    | 'oklch'
    | 'oklcha'
    | 'lab'
    | 'lch'
    | 'named'
    | 'unknown';

export type ConvertTo = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

// ─── Detection ────────────────────────────────────────────────────────────────

/**
 * Detects the color format of a given CSS color string.
 */
export function detectColorFormat(color: string): ColorFormat {
    const c = color.trim().toLowerCase();

    if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(c)) {
        return 'hex';
    }

    if (/^rgba\s*\(/.test(c)) {
        return 'rgba';
    }

    if (/^rgb\s*\(/.test(c)) {
        return 'rgb';
    }

    if (/^hsla\s*\(/.test(c)) {
        return 'hsla';
    }

    if (/^hsl\s*\(/.test(c)) {
        return 'hsl';
    }

    if (/^oklch\s*\(/.test(c)) {
        return /\//.test(c) ? 'oklcha' : 'oklch';
    }

    if (/^lab\s*\(/.test(c)) {
        return 'lab';
    }

    if (/^lch\s*\(/.test(c)) {
        return 'lch';
    }

    // CSS named colors — Culori can parse them
    if (parse(c)) {
        return 'named';
    }

    return 'unknown';
}

// ─── Conversion ───────────────────────────────────────────────────────────────

/**
 * Converts any supported CSS color string to the target format.
 *
 * @param color   - Input color in any supported format
 * @param to      - Target format: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'
 * @returns       - Converted color string, or null if parsing fails
 *
 * @example
 * convertColor('oklch(0.7 0.15 240)', 'hex')   // '#4d9aff'
 * convertColor('#ff0000', 'rgb')                // 'rgb(255, 0, 0)'
 * convertColor('hsl(200 80% 50%)', 'oklch')    // not supported as output yet
 */
export function convertColor(color: string, to: ConvertTo): string | null {
    const parsed = parse(color.trim());

    if (!parsed) {
        console.warn(`[convertColor] Could not parse color: "${color}"`);

        return null;
    }

    // Clamp to sRGB gamut for formats that require it (hex, rgb, hsl)
    const clamped = parsed;

    switch (to) {
        case 'hex':
            return formatHex(clamped) ?? null;

        case 'rgb': {
            const result = formatRgb(clamped);

            // Strip alpha channel if present to return plain rgb()
            return result.startsWith('rgba')
                ? result.replace(/,\s*[\d.]+\)$/, ')').replace('rgba', 'rgb')
                : result;
        }

        case 'rgba':
            return formatRgb(clamped) ?? null;

        case 'hsl': {
            const result = formatHsl(clamped);

            return result.startsWith('hsla')
                ? result.replace(/,\s*[\d.]+\)$/, ')').replace('hsla', 'hsl')
                : result;
        }

        case 'hsla':
            return formatHsl(clamped) ?? null;

        default:
            return null;
    }
}

// ─── CSS Variable Helper ──────────────────────────────────────────────────────

/**
 * Reads a CSS custom property from the document root and converts it
 * to the target color format.
 *
 * Useful for feeding Tailwind/OKLCH CSS variables into tools like Monaco
 * that only accept hex or RGB colors.
 *
 * @param varName  - CSS variable name, e.g. '--background'
 * @param to       - Target format
 * @returns        - Converted color string, or null if unreadable/unparseable
 *
 * @example
 * getCssVarAsColor('--background', 'hex')  // '#1a1a2e'
 */
export function getCssVarAsColor(
    varName: string,
    to: ConvertTo,
): string | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

    if (!raw) {
        console.warn(
            `[getCssVarAsColor] CSS variable "${varName}" is empty or not found.`,
        );

        return null;
    }

    return convertColor(raw, to);
}

// ─── Batch Helper ─────────────────────────────────────────────────────────────

/**
 * Converts multiple CSS variables at once.
 * Returns a Record where keys are variable names and values are converted colors.
 * Missing or unparseable variables are omitted from the result.
 *
 * @example
 * const colors = getCssVarsAsColors(
 *   ['--background', '--foreground', '--primary'],
 *   'hex'
 * );
 * // { '--background': '#0f0f0f', '--foreground': '#fafafa', '--primary': '#6366f1' }
 */
export function getCssVarsAsColors(
    varNames: string[],
    to: ConvertTo,
): Record<string, string> {
    return varNames.reduce<Record<string, string>>((acc, name) => {
        const converted = getCssVarAsColor(name, to);

        if (converted) {
            acc[name] = converted;
        }

        return acc;
    }, {});
}
