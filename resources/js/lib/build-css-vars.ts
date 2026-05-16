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
        result[baseVar] = value;

        // Get the key without -- prefix
        const normalizedKey = baseVar.slice(2);

        // Directly set --color-* variable to bypass var() indirection
        if (colorMap[normalizedKey]) {
            // Check if value already has hsl() or oklch() wrapper
            if (/^(hsl|oklch|rgb|#)/i.test(value)) {
                result[`--color-${colorMap[normalizedKey]}`] = value;
            } else {
                // Assume it's a raw HSL value if it's not a standard color format
                result[`--color-${colorMap[normalizedKey]}`] = `hsl(${value})`;
            }
        }
    }

    return result as React.CSSProperties;
}

export { buildCSSVars };
