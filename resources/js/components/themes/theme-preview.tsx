import { Sun, Moon } from 'lucide-react';
import { useMemo, useState } from 'react';
import CardsPreview from '@/components/preview/cards-preview';
import { Button } from '@/components/ui/button';
import { tokenValueToCss } from '@/lib/theme/color';
import { useThemeStore } from '@/lib/theme/store';

const COLOR_TOKENS = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
    'chart-1',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
];

function buildVars(
    colors: Record<string, string>,
    radius: number,
    fonts: { sans: string; serif: string; mono: string },
): Record<string, string> {
    const vars: Record<string, string> = {};

    for (const token of COLOR_TOKENS) {
        const val = colors[token];

        if (val) {
            const css = tokenValueToCss(val);
            vars[`--${token}`] = css;
            vars[`--color-${token}`] = css;
        }
    }

    vars['--radius'] = `${radius}rem`;
    vars['--radius-sm'] = `calc(${radius}rem - 4px)`;
    vars['--radius-md'] = `calc(${radius}rem - 2px)`;
    vars['--radius-lg'] = `${radius}rem`;

    vars['--font-sans'] = `"${fonts.sans}"`;
    vars['--font-serif'] = `"${fonts.serif}"`;
    vars['--font-mono'] = `"${fonts.mono}"`;

    return vars;
}

export function ThemePreview() {
    const { light, dark, radius, fonts } = useThemeStore();
    const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
    const colors = previewMode === 'light' ? light : dark;

    const cssVars = useMemo(
        () => buildVars(colors, radius, fonts),
        [colors, radius, fonts],
    );

    const bgCss = tokenValueToCss(colors.background);
    const fgCss = tokenValueToCss(colors.foreground);

    const toggleMode = () => {
        setPreviewMode((p) => (p === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="flex h-full flex-col">
            <div
                className="flex items-center justify-between border-b px-4 py-2"
                style={{ borderColor: 'var(--color-border)' }}
            >
                <span className="text-sm font-medium text-muted-foreground">
                    Preview
                </span>
                <Button variant="outline" size="sm" onClick={toggleMode}>
                    {previewMode === 'light' ? (
                        <>
                            <Moon className="mr-1 size-3.5" /> Dark
                        </>
                    ) : (
                        <>
                            <Sun className="mr-1 size-3.5" /> Light
                        </>
                    )}
                </Button>
            </div>

            <div
                className="flex-1 overflow-y-auto"
                style={
                    {
                        background: bgCss,
                        color: fgCss,
                        ...cssVars,
                    } as React.CSSProperties
                }
            >
                <div className="min-h-full p-6">
                    <CardsPreview />
                </div>
            </div>
        </div>
    );
}
