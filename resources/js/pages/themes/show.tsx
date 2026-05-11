import { Head } from '@inertiajs/react';
import { Clipboard, Download, Moon, Sun } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { wcagContrast } from 'culori';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MainLayout from '@/layouts/main-layout';
import MainWrapper from '@/layouts/main/main-wrapper';
import { useCSSVars } from '@/hooks/use-css-vars';
import { useClipboard } from '@/hooks/use-clipboard';
import { convertColor } from '@/lib/color-utils';
import type { Registry } from '@/types/registry';

interface ThemesShowProps {
    theme: Registry;
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
    const [, copy] = useClipboard();
    const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

    const displayValue = useMemo(() => {
        return convertColor(value, format) || value;
    }, [value, format]);

    const handleCopy = () => {
        copy(displayValue);
        toast.success(`Copied ${name} to clipboard`);
    };

    return (
        <Card className="overflow-hidden border-border/40">
            <div
                className="h-24 w-full border-b border-border/40"
                style={{ backgroundColor: value }}
            />
            <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        <Clipboard className="h-3 w-3" />
                    </Button>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono truncate">{displayValue}</span>
                    <div className="flex gap-1">
                        {(['hex', 'rgb', 'hsl'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                    format === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-transparent hover:border-border'
                                }`}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ContrastBadge({ foreground, background }: { foreground: string; background: string }) {
    const ratio = useMemo(() => {
        try {
            return wcagContrast(foreground, background);
        } catch (e) {
            return 0;
        }
    }, [foreground, background]);

    const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'Large' : 'Fail';
    const variant = ratio >= 4.5 ? 'default' : ratio >= 3 ? 'secondary' : 'destructive';

    return (
        <div className="flex items-center gap-2">
            <Badge variant={variant as any} className="text-[10px] px-1 py-0 h-4">
                {level}
            </Badge>
            <span className="text-xs font-mono">{ratio.toFixed(2)}:1</span>
        </div>
    );
}

function FontDisplay({ label, variable, value }: { label: string; variable: string; value: string | null }) {
    const [, copy] = useClipboard();

    if (!value) return null;

    const handleCopy = () => {
        copy(value);
        toast.success(`Copied ${label} font family to clipboard`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{label}</h3>
                    <span className="text-xs text-muted-foreground font-mono truncate max-w-[200px] md:max-w-none">({value})</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">{variable}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        <Clipboard className="h-3 w-3" />
                    </Button>
                </div>
            </div>
            <div className={`${variable} space-y-4 p-6 border border-border/40 rounded-lg bg-card`}>
                <p className="text-4xl font-normal leading-tight">The quick brown fox jumps over the lazy dog.</p>
                <p className="text-2xl font-semibold leading-tight">The quick brown fox jumps over the lazy dog.</p>
                <p className="text-base font-light leading-relaxed">
                    {label === 'Monospace' ? (
                        <code className="text-sm block overflow-x-auto whitespace-pre">
{`function resolveTheme(name: string) {
  const theme = themes.find(t => t.name === name);
  return theme ?? defaultTheme;
}`}
                        </code>
                    ) : (
                        "Design is not just what it looks like and feels like. Design is how it works. Typography is the craft of endowing human language with a durable visual form."
                    )}
                </p>
            </div>
        </div>
    );
}

function ThemesShow({ theme }: ThemesShowProps) {
    const { cssVars } = useCSSVars(theme);
    const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

    const coreColors = [
        'background', 'foreground', 'card', 'card-foreground',
        'popover', 'popover-foreground', 'primary', 'primary-foreground',
        'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
        'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
        'border', 'input', 'ring'
    ];

    const displayVars = useMemo(() => {
        return previewMode === 'dark'
            ? (theme.vars_dark || theme.vars_light || {})
            : (theme.vars_light || {});
    }, [previewMode, theme]);

    return (
        <MainWrapper className="py-8">
            <Head title={`Theme: ${theme.title}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <Heading
                    title={theme.title}
                    description={theme.description || `Style guide and documentation for the ${theme.title} theme.`}
                />
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Download className="mr-2 h-4 w-4" />
                        Print Guide
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="preview" className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <TabsList>
                        <TabsTrigger value="preview">Visual Guide</TabsTrigger>
                        <TabsTrigger value="export">Code & Export</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center bg-muted rounded-lg p-1 gap-1">
                        <Button
                            variant={previewMode === 'light' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 px-3"
                            onClick={() => setPreviewMode('light')}
                        >
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                        </Button>
                        <Button
                            variant={previewMode === 'dark' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 px-3"
                            onClick={() => setPreviewMode('dark')}
                        >
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                        </Button>
                    </div>
                </div>

                <TabsContent value="preview" className="space-y-12 outline-none">
                    <div className={previewMode === 'dark' ? 'dark' : ''}>
                        <div
                            style={cssVars}
                            className="bg-background text-foreground border border-border/40 rounded-xl p-8 transition-colors duration-300"
                        >
                            <section className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Colors</h2>
                                    <p className="text-muted-foreground">The foundational color palette of the theme.</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {coreColors.map((name) => (
                                        displayVars[name] && (
                                            <ColorSwatch key={name} name={name} value={displayVars[name]} />
                                        )
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/40">
                                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Accessibility: Contrast Ratios</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Text on Background</span>
                                            <ContrastBadge foreground={displayVars['foreground']} background={displayVars['background']} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Primary on Background</span>
                                            <ContrastBadge foreground={displayVars['primary']} background={displayVars['background']} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Primary Foreground on Primary</span>
                                            <ContrastBadge foreground={displayVars['primary-foreground']} background={displayVars['primary']} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator className="my-12 bg-border/40" />

                            <section className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
                                    <p className="text-muted-foreground">Font families and scale used in this theme.</p>
                                </div>

                                <div className="space-y-8">
                                    <FontDisplay
                                        label="Sans Serif"
                                        variable="font-sans"
                                        value={theme.font_family || displayVars['font-sans'] || 'Geist Sans'}
                                    />
                                    <FontDisplay
                                        label="Serif"
                                        variable="font-serif"
                                        value={theme.font_serif || displayVars['font-serif']}
                                    />
                                    <FontDisplay
                                        label="Monospace"
                                        variable="font-mono"
                                        value={theme.font_mono || displayVars['font-mono']}
                                    />
                                </div>
                            </section>

                            <Separator className="my-12 bg-border/40" />

                            <section className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Component Previews</h2>
                                    <p className="text-muted-foreground">How the theme looks applied to standard interface elements.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Interactive</h3>
                                        <div className="flex flex-wrap gap-3 p-6 border border-border/40 rounded-lg bg-card items-center">
                                            <Button size="sm">Primary</Button>
                                            <Button size="sm" variant="secondary">Secondary</Button>
                                            <Button size="sm" variant="outline">Outline</Button>
                                            <Button size="sm" variant="ghost">Ghost</Button>
                                            <Button size="sm" variant="destructive">Destructive</Button>
                                        </div>

                                        <div className="space-y-4 p-6 border border-border/40 rounded-lg bg-card">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs">Email address</Label>
                                                <Input id="email" placeholder="hello@example.com" className="h-9" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge>New</Badge>
                                                <Badge variant="secondary">In Progress</Badge>
                                                <Badge variant="outline">Draft</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Feedback & Containers</h3>
                                        <Alert className="bg-card">
                                            <AlertTitle className="text-sm font-semibold">Heads up!</AlertTitle>
                                            <AlertDescription className="text-xs text-muted-foreground">
                                                This is a preview of the theme applied to an alert component.
                                            </AlertDescription>
                                        </Alert>

                                        <Card className="border-border/40">
                                            <CardHeader className="p-4">
                                                <CardTitle className="text-sm font-bold">Card Component</CardTitle>
                                                <CardDescription className="text-xs">Visualizing elevation and spacing.</CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    Cards are used to group related information and provide a clear hierarchy.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-8 outline-none">
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl font-bold">Theme CSS Variables</h2>
                            <p className="text-sm text-muted-foreground">Copy these into your main CSS file.</p>
                        </div>
                        <div className="relative">
                            <pre className="p-6 bg-muted rounded-lg font-mono text-sm overflow-x-auto max-h-[400px] border border-border/40">
{`:root {
${Object.entries(theme.vars_light || {}).map(([k, v]) => `  --${k}: ${v};`).join('\n')}
}

.dark {
${Object.entries(theme.vars_dark || {}).map(([k, v]) => `  --${k}: ${v};`).join('\n')}
}`}
                            </pre>
                            <Button variant="secondary" size="sm" className="absolute top-4 right-4" onClick={() => {
                                const css = `:root {\n${Object.entries(theme.vars_light || {}).map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}\n\n.dark {\n${Object.entries(theme.vars_dark || {}).map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}`;
                                navigator.clipboard.writeText(css);
                                toast.success("CSS copied to clipboard");
                            }}>
                                <Clipboard className="h-4 w-4 mr-2" />
                                Copy CSS
                            </Button>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl font-bold">Theme JSON</h2>
                            <p className="text-sm text-muted-foreground">The registry representation of the theme.</p>
                        </div>
                        <div className="relative">
                            <pre className="p-6 bg-muted rounded-lg font-mono text-sm overflow-x-auto max-h-[400px] border border-border/40">
                                {JSON.stringify(theme, null, 2)}
                            </pre>
                            <Button variant="secondary" size="sm" className="absolute top-4 right-4" onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
                                toast.success("JSON copied to clipboard");
                            }}>
                                <Clipboard className="h-4 w-4 mr-2" />
                                Copy JSON
                            </Button>
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </MainWrapper>
    );
}

ThemesShow.layout = MainLayout;

export default ThemesShow;
