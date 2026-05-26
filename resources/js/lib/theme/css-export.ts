import { converter, formatHex, parse } from 'culori';

const toOklch = converter('oklch');

export function hexToTokenValue(hex: string): string {
    const parsed = parse(hex);
    if (!parsed) return '0 0 0';
    const o = toOklch(parsed);
    if (!o) return '0 0 0';
    const L = round(o.l ?? 0, 3);
    const C = round(o.c ?? 0, 3);
    const H = round(o.h ?? 0, 3);
    return `${L} ${C} ${H}`;
}

export function tokenValueToHex(value: string): string {
    const clean = value.split('/')[0].trim();
    const [l, c, h] = clean.split(/\s+/).map(Number);
    const hex = formatHex({ mode: 'oklch', l: l || 0, c: c || 0, h: h || 0 });
    return hex ?? '#000000';
}

export function tokenValueToCss(value: string): string {
    if (value.includes('/')) {
        return `oklch(${value})`;
    }
    return `oklch(${value})`;
}

function round(n: number, d: number) {
    const f = Math.pow(10, d);
    return Math.round(n * f) / f;
}

export function derivePaletteFromPrimary(
    hex: string,
    dark: boolean,
): Record<string, string> {
    const parsed = parse(hex);
    if (!parsed) return {};
    const o = toOklch(parsed);
    if (!o) return {};
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

export function generateIndexCss(state: {
    light: Record<string, string>;
    dark: Record<string, string>;
    radius: number;
    fonts: { sans: string; serif: string; mono: string };
    baseFontSize: number;
    scaleRatio: number;
    lineHeight: number;
    letterSpacing: number;
}): string {
    const toVar = (key: string) => `--${key}`;
    const toColor = (v: string) =>
        v.includes('/') || /^oklch/i.test(v) ? v : `oklch(${v})`;

    const renderBlock = (
        map: Record<string, string>,
        selector: string,
        extra?: string,
    ) => {
        const entries = Object.entries(map).filter(
            ([k]) => !k.startsWith('radius') && !k.startsWith('tracking'),
        );
        const lines = entries.map(
            ([k, v]) => `    ${toVar(k)}: ${toColor(v)};`,
        );
        if (extra) lines.push(extra);
        return `${selector} {\n${lines.join('\n')}\n}`;
    };

    const radiusVars = [
        `    --radius: ${state.radius}rem;`,
        `    --radius-sm: calc(${state.radius}rem * 0.5);`,
        `    --radius-md: calc(${state.radius}rem * 0.625);`,
        `    --radius-lg: calc(${state.radius}rem * 0.75);`,
        `    --radius-xl: calc(${state.radius}rem);`,
    ].join('\n');

    const fontVars = [
        `    --font-sans: '${state.fonts.sans}';`,
        `    --font-serif: '${state.fonts.serif}';`,
        `    --font-mono: '${state.fonts.mono}';`,
    ].join('\n');

    const scale = state.scaleRatio;
    const base = state.baseFontSize / 16;

    const typeScale = [
        `    --font-size-xs: ${round(base / scale, 4)}rem;`,
        `    --font-size-sm: ${round(base / Math.sqrt(scale), 4)}rem;`,
        `    --font-size-base: ${base}rem;`,
        `    --font-size-lg: ${round(base * scale, 4)}rem;`,
        `    --font-size-xl: ${round(base * Math.pow(scale, 2), 4)}rem;`,
        `    --font-size-2xl: ${round(base * Math.pow(scale, 3), 4)}rem;`,
        `    --font-size-3xl: ${round(base * Math.pow(scale, 4), 4)}rem;`,
        `    --font-size-4xl: ${round(base * Math.pow(scale, 5), 4)}rem;`,
        `    --font-size-5xl: ${round(base * Math.pow(scale, 6), 4)}rem;`,
        `    --font-size-6xl: ${round(base * Math.pow(scale, 7), 4)}rem;`,
        `    --font-size-7xl: ${round(base * Math.pow(scale, 8), 4)}rem;`,
        `    --font-size-8xl: ${round(base * Math.pow(scale, 9), 4)}rem;`,
        `    --font-size-9xl: ${round(base * Math.pow(scale, 10), 4)}rem;`,
    ].join('\n');

    const lineHeightVars = [
        `    --leading-none: 1;`,
        `    --leading-tight: 1.25;`,
        `    --leading-snug: 1.375;`,
        `    --leading-normal: ${state.lineHeight};`,
        `    --leading-relaxed: 1.625;`,
        `    --leading-loose: 2;`,
    ].join('\n');

    const trackingVars =
        state.letterSpacing !== 0
            ? `    --tracking-tight: ${round(state.letterSpacing - 0.025, 3)}em;\n    --tracking-normal: ${state.letterSpacing}em;\n    --tracking-wide: ${round(state.letterSpacing + 0.025, 3)}em;\n    --tracking-wider: ${round(state.letterSpacing + 0.05, 3)}em;\n    --tracking-widest: ${round(state.letterSpacing + 0.1, 3)}em;`
            : '';

    const lightBlock = renderBlock(state.light, ':root', [
        radiusVars,
        fontVars,
        typeScale,
        lineHeightVars,
        trackingVars,
    ]
        .filter(Boolean)
        .join('\n'));

    const darkBlock = renderBlock(state.dark, '.dark');

    const colorEntries = [
        ...Object.keys(state.light).filter(
            (k) => !k.startsWith('radius') && !k.startsWith('tracking'),
        ),
    ];
    const themeMap = colorEntries
        .map((k) => `        --color-${k}: ${toVar(k)};`)
        .join('\n');

    const tailwindTheme = `@theme inline {\n${themeMap}\n${radiusVars.replace(/^ {4}/gm, '        ')}\n${fontVars.replace(/^ {4}/gm, '        ')}\n    }`;

    return [
        lightBlock,
        '',
        darkBlock,
        '',
        tailwindTheme,
        '',
        '@layer base {\n    * {\n        @apply border-border;\n    }\n    body {\n        @apply bg-background text-foreground;\n        font-feature-settings: "rlig" 1, "calt" 1;\n    }\n}',
    ].join('\n');
}

export function generateTailwindSnippet(state: {
    fonts: { sans: string; serif: string; mono: string };
}): string {
    return `module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"${state.fonts.sans}"', ...defaultTheme.fontFamily.sans],
                serif: ['"${state.fonts.serif}"', ...defaultTheme.fontFamily.serif],
                mono: ['"${state.fonts.mono}"', ...defaultTheme.fontFamily.mono],
            },
        },
    },
};`;
}
