import { converter, formatHex, parse } from 'culori';

const toOklch = converter('oklch');

// Convert hex (#rrggbb) -> "L C H" string used as token value.
export function hexToTokenValue(hex: string): string {
    const parsed = parse(hex);

    if (!parsed) {
        return '0 0 0';
    }

    const o = toOklch(parsed);

    if (!o) {
        return '0 0 0';
    }

    const L = round(o.l ?? 0, 3);
    const C = round(o.c ?? 0, 3);
    const H = round(o.h ?? 0, 3);

    return `${L} ${C} ${H}`;
}

// Convert "L C H" or "L C H / A%" -> hex (ignores alpha for picker display).
export function tokenValueToHex(value: string): string {
    const clean = value.split('/')[0].trim();
    const [l, c, h] = clean.split(/\s+/).map(Number);
    const hex = formatHex({ mode: 'oklch', l: l || 0, c: c || 0, h: h || 0 });

    return hex ?? '#000000';
}

export function tokenValueToCss(value: string): string {
    if (value.includes('/')) {
        // pass through alpha syntax
        return `oklch(${value})`;
    }

    return `oklch(${value})`;
}

function round(n: number, d: number) {
    const f = Math.pow(10, d);

    return Math.round(n * f) / f;
}

// Derive a coherent palette from a single primary hex.
export function derivePaletteFromPrimary(
    hex: string,
    dark: boolean,
): Record<string, string> {
    const parsed = parse(hex);

    if (!parsed) {
        return {};
    }

    const o = toOklch(parsed);

    if (!o) {
        return {};
    }

    const h = o.h ?? 250;
    const c = o.c ?? 0.05;

    if (dark) {
        return {
            background: `0.16 0.02 ${h}`,
            foreground: `0.97 0.005 ${h}`,
            card: `0.21 0.025 ${h}`,
            'card-foreground': `0.97 0.005 ${h}`,
            popover: `0.21 0.025 ${h}`,
            'popover-foreground': `0.97 0.005 ${h}`,
            primary: `${o.l} ${c} ${h}`,
            'primary-foreground': `0.16 0.02 ${h}`,
            secondary: `0.28 0.03 ${h}`,
            'secondary-foreground': `0.97 0.005 ${h}`,
            muted: `0.28 0.03 ${h}`,
            'muted-foreground': `0.7 0.02 ${h}`,
            accent: `0.32 0.04 ${h}`,
            'accent-foreground': `0.97 0.005 ${h}`,
            border: `1 0 0 / 12%`,
            input: `1 0 0 / 16%`,
            ring: `${o.l} ${c} ${h}`,
        };
    }

    return {
        background: `1 0 0`,
        foreground: `0.16 0.02 ${h}`,
        card: `1 0 0`,
        'card-foreground': `0.16 0.02 ${h}`,
        popover: `1 0 0`,
        'popover-foreground': `0.16 0.02 ${h}`,
        primary: `${o.l} ${c} ${h}`,
        'primary-foreground': `0.98 0.005 ${h}`,
        secondary: `0.96 0.01 ${h}`,
        'secondary-foreground': `0.2 0.03 ${h}`,
        muted: `0.96 0.01 ${h}`,
        'muted-foreground': `0.55 0.04 ${h}`,
        accent: `0.94 0.02 ${h}`,
        'accent-foreground': `0.2 0.03 ${h}`,
        border: `0.92 0.01 ${h}`,
        input: `0.92 0.01 ${h}`,
        ring: `${o.l} ${c} ${h}`,
    };
}
