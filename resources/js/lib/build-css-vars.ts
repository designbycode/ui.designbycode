const cleanFontName = (name: string) => {
    return name
        .split(',')[0]
        .replace(/['"]/g, '')
        .replace(/\s+Variable$/i, '')
        .trim();
};

function buildCSSVars(vars: Record<string, string>): React.CSSProperties {
    const result: Record<string, string> = {};

    // Map base variable names to Tailwind v4 --color-* variable names
    const colorMap: Record<string, string> = {
        background: 'background',
        foreground: 'foreground',
        card: 'card',
        'card-foreground': 'card-foreground',
        popover: 'popover',
        'popover-foreground': 'popover-foreground',
        primary: 'primary',
        'primary-foreground': 'primary-foreground',
        secondary: 'secondary',
        'secondary-foreground': 'secondary-foreground',
        muted: 'muted',
        'muted-foreground': 'muted-foreground',
        accent: 'accent',
        'accent-foreground': 'accent-foreground',
        destructive: 'destructive',
        'destructive-foreground': 'destructive-foreground',
        border: 'border',
        input: 'input',
        ring: 'ring',
        'chart-1': 'chart-1',
        'chart-2': 'chart-2',
        'chart-3': 'chart-3',
        'chart-4': 'chart-4',
        'chart-5': 'chart-5',
        sidebar: 'sidebar',
        'sidebar-foreground': 'sidebar-foreground',
        'sidebar-primary': 'sidebar-primary',
        'sidebar-primary-foreground': 'sidebar-primary-foreground',
        'sidebar-accent': 'sidebar-accent',
        'sidebar-accent-foreground': 'sidebar-accent-foreground',
        'sidebar-border': 'sidebar-border',
        'sidebar-ring': 'sidebar-ring',
    };

    for (const [key, value] of Object.entries(vars)) {
        // Normalize key to --* format
        const baseVar = key.startsWith('--') ? key : `--${key}`;

        // Get the key without -- prefix
        const normalizedKey = baseVar.slice(2);

        let finalValue = value;

        if (normalizedKey.startsWith('font-') && value.includes('Variable')) {
            const clean = cleanFontName(value);

            if (
                clean &&
                !value.includes(`'${clean}'`) &&
                !value.includes(`"${clean}"`) &&
                !value.includes(clean)
            ) {
                finalValue = `'${clean}', ${value}`;
            }
        }

        result[baseVar] = finalValue;

        // Directly set --color-* variable to bypass var() indirection
        if (colorMap[normalizedKey]) {
            // Check if value already has a color function wrapper
            if (/^(hsl|oklch|rgb|#)/i.test(value)) {
                result[`--color-${colorMap[normalizedKey]}`] = value;
            } else if (/%/.test(value)) {
                // Has percentage signs → raw HSL value (e.g. "240 10% 3.9%")
                result[`--color-${colorMap[normalizedKey]}`] = `hsl(${value})`;
            } else {
                // Decimal values → raw oklch value (e.g. "0.145 0 0")
                result[`--color-${colorMap[normalizedKey]}`] =
                    `oklch(${value})`;
            }
        }
    }

    return result as React.CSSProperties;
}

export { buildCSSVars };
