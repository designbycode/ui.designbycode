import { useThemeStore } from '@/lib/theme/store';
import { tokenValueToCss } from '@/lib/theme/color';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';
import { useMemo, useState } from 'react';

const COLOR_TOKENS = [
    'background', 'foreground',
    'card', 'card-foreground',
    'popover', 'popover-foreground',
    'primary', 'primary-foreground',
    'secondary', 'secondary-foreground',
    'muted', 'muted-foreground',
    'accent', 'accent-foreground',
    'destructive', 'destructive-foreground',
    'border', 'input', 'ring',
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
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
            <div className="flex items-center justify-between border-b px-4 py-2" style={{ borderColor: 'var(--color-border)' }}>
                <span className="text-sm font-medium text-muted-foreground">Preview</span>
                <Button variant="outline" size="sm" onClick={toggleMode}>
                    {previewMode === 'light' ? (
                        <><Moon className="mr-1 size-3.5" /> Dark</>
                    ) : (
                        <><Sun className="mr-1 size-3.5" /> Light</>
                    )}
                </Button>
            </div>

            <div
                className="flex-1 overflow-y-auto"
                style={{ background: bgCss, color: fgCss } as React.CSSProperties}
            >
                <div className="min-h-full p-6" style={cssVars as React.CSSProperties}>
                    <p
                        className="text-2xl font-bold"
                        style={{ fontFamily: `"${fonts.serif}"` }}
                    >
                        Theme Preview
                    </p>
                    <p className="mt-1 mb-6 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                        Sample UI components using your current palette.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>

                    <Card className="mt-6 max-w-sm">
                        <CardHeader>
                            <CardTitle>Example Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                                This card demonstrates how your theme appears on standard
                                shadcn/ui components.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>

                    <Card className="mt-4 max-w-sm">
                        <CardHeader>
                            <CardTitle>Form Example</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="pv-email">Email</Label>
                                <Input id="pv-email" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="pv-pw">Password</Label>
                                <Input id="pv-pw" type="password" placeholder="••••••••" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </div>

                    <div
                        className="mt-6 rounded-lg border p-4 space-y-1"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <p className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                            SYSTEM — font-mono ({fonts.mono})
                        </p>
                        <p style={{ fontFamily: `"${fonts.serif}"` }}>
                            The quick brown fox jumps over the lazy dog — serif
                        </p>
                        <p style={{ fontFamily: `"${fonts.sans}"` }}>
                            The quick brown fox jumps over the lazy dog — sans
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
