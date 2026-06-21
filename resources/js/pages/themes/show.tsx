import { Head, Link } from '@inertiajs/react';
import { wcagContrast } from 'culori';
import { Clipboard, Heart, GitFork } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import Heading from '@/components/heading';
import ColorSwatch2 from '@/components/themes/color-swatch-2';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { useCSSVars } from '@/hooks/use-css-vars';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainEditorBlock from '@/layouts/main/theme/main-editor-block';

/* eslint-disable @typescript-eslint/no-unused-vars */
import MainLayout from '@/layouts/main-layout';
import ThemeLayout from '@/layouts/theme-layout';
import { create } from '@/routes/themes';
import type { Registry } from '@/types/registry';

interface ThemesShowProps {
    theme: Registry;
}

function ContrastBadge({
    foreground,
    background,
}: {
    foreground: string;
    background: string;
}) {
    const ratio = useMemo(() => {
        try {
            return wcagContrast(foreground, background);
        } catch (e) {
            console.log(e);

            return 0;
        }
    }, [foreground, background]);

    const level =
        ratio >= 7
            ? 'AAA'
            : ratio >= 4.5
              ? 'AA'
              : ratio >= 3
                ? 'Large'
                : 'Fail';
    const variant =
        ratio >= 4.5 ? 'default' : ratio >= 3 ? 'secondary' : 'destructive';

    return (
        <div className="flex items-center gap-2">
            <Badge
                variant={variant as any}
                className="h-4 px-1 py-0 text-[10px]"
            >
                {level}
            </Badge>
            <span className="font-mono text-xs">{ratio.toFixed(2)}:1</span>
        </div>
    );
}

function FontDisplay({
    label,
    variable,
    value,
}: {
    label: string;
    variable: string;
    value: string | null;
}) {
    const [, copy] = useClipboard();

    if (!value) {
        return null;
    }

    const handleCopy = async () => {
        await copy(value);
        toast.success(`Copied ${label} font family to clipboard`);
    };

    return (
        <div className="my-16 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{label}</h3>
                    <span className="max-w-50 truncate font-mono text-xs text-muted-foreground md:max-w-none">
                        ({value})
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                        {variable}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCopy}
                    >
                        <Clipboard className="h-3 w-3" />
                    </Button>
                </div>
            </div>
            <div
                className={`${variable} space-y-4 rounded-lg border border-border/40 bg-card p-6`}
            >
                <p className="text-4xl leading-tight font-normal">
                    The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-2xl leading-tight font-semibold">
                    The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-base leading-relaxed font-light">
                    {label === 'Monospace' ? (
                        <code className="block overflow-x-auto text-sm whitespace-pre">
                            {`function resolveTheme(name: string) {
  const theme = themes.find(t => t.name === name);
  return theme ?? defaultTheme;
}`}
                        </code>
                    ) : (
                        'Design is not just what it looks like and feels like. Design is how it works. Typography is the craft of endowing human language with a durable visual form.'
                    )}
                </p>
            </div>
        </div>
    );
}

function ThemesShow({ theme }: ThemesShowProps) {
    const { cssVars } = useCSSVars(theme);

    const { appearance } = useAppearance();

    const displayVars = useMemo(() => {
        return appearance === 'dark'
            ? theme.vars_dark || theme.vars_light || {}
            : theme.vars_light || {};
    }, [appearance, theme]);

    const groupedColors = useMemo(() => {
        const groups = [
            {
                title: 'Primary Colors',
                keys: [
                    'primary',
                    'primary-foreground',
                    'foreground',
                    'background',
                ],
            },
            {
                title: 'Secondary & Accent Colors',
                keys: [
                    'secondary',
                    'secondary-foreground',
                    'accent',
                    'accent-foreground',
                ],
            },
            {
                title: 'UI Component Colors',
                keys: [
                    'card',
                    'card-foreground',
                    'popover',
                    'popover-foreground',
                    'muted',
                    'muted-foreground',
                ],
            },
            {
                title: 'Utility & Form Colors',
                keys: ['border', 'input', 'ring'],
            },
            {
                title: 'Status & Feedback Colors',
                keys: ['destructive', 'destructive-foreground'],
            },
            {
                title: 'Chart & Visualization Colors',
                match: (name: string) => name.startsWith('chart-'),
            },
            {
                title: 'Sidebar & Navigation Colors',
                match: (name: string) => name.startsWith('sidebar'),
            },
        ];

        const allKeys = Object.keys(displayVars).filter(
            (key) =>
                !key.startsWith('font-') &&
                key !== 'radius' &&
                !key.includes('shadow'),
        );
        const usedKeys = new Set<string>();

        const result = groups.map((group) => {
            const groupKeys = group.keys
                ? group.keys.filter((k) => allKeys.includes(k))
                : allKeys.filter((k) => group.match?.(k));

            groupKeys.forEach((k) => usedKeys.add(k));

            return { title: group.title, keys: groupKeys };
        });

        const customKeys = allKeys.filter((k) => !usedKeys.has(k));

        if (customKeys.length > 0) {
            result.push({ title: 'Custom Colors', keys: customKeys });
        }

        return result.filter((g) => g.keys.length > 0);
    }, [displayVars]);

    return (
        <div style={cssVars} className={`bg-background`}>
            <MainWrapper className="py-0">
                <Head title={`Theme: ${theme.title}`}>
                    <meta
                        name="description"
                        content={
                            theme.description ||
                            `Style guide and documentation for the ${theme.title} theme.`
                        }
                    />
                </Head>

                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Heading
                                title={theme.title}
                                description={
                                    theme.description ||
                                    `Style guide and documentation for the ${theme.title} theme.`
                                }
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {theme.author && (
                                <Badge variant="outline" className="text-sm">
                                    by {theme.author}
                                </Badge>
                            )}
                            {(theme.tags as any[])?.map((tag) => (
                                <Badge
                                    key={
                                        typeof tag === 'string' ? tag : tag.name
                                    }
                                    variant="secondary"
                                    className="text-[10px] capitalize"
                                >
                                    {typeof tag === 'string' ? tag : tag.name}
                                </Badge>
                            ))}
                            {theme.style && (
                                <Badge
                                    variant="secondary"
                                    className="text-[10px]"
                                >
                                    Style: {theme.style}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={create({ query: { fork: theme.name } }).url}
                        >
                            <Button variant="outline" className="gap-2">
                                <GitFork className="size-4" />
                                Fork Theme
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="icon"

                            // onClick={() => window.print()}
                        >
                            <Heart className={`size-4`} />
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="preview" className="space-y-8">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="preview">
                                Visual Guide
                            </TabsTrigger>
                            <TabsTrigger value="export">
                                Code & Export
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent
                        value="preview"
                        className="space-y-12 outline-none"
                    >
                        <div className={appearance === 'dark' ? 'dark' : ''}>
                            <div className="-mx-6 rounded-xl bg-black/5 p-6 transition-colors duration-300 dark:bg-white/5">
                                <section className="space-y-12">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            Colors
                                        </h2>
                                        <p className="text-muted-foreground">
                                            The foundational color palette of
                                            the theme.
                                        </p>
                                    </div>

                                    {groupedColors.map((group) => (
                                        <div
                                            key={group.title}
                                            className="space-y-4"
                                        >
                                            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                                {group.title}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                                {group.keys.map((name) => (
                                                    <ColorSwatch2
                                                        key={name}
                                                        name={name}
                                                        value={
                                                            displayVars[name]
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-8 rounded-lg border border-border/40 bg-muted/30 p-4">
                                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                            Accessibility: Contrast Ratios
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                    Text on Background
                                                </span>
                                                <ContrastBadge
                                                    foreground={
                                                        displayVars[
                                                            'foreground'
                                                        ]
                                                    }
                                                    background={
                                                        displayVars[
                                                            'background'
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                    Primary on Background
                                                </span>
                                                <ContrastBadge
                                                    foreground={
                                                        displayVars['primary']
                                                    }
                                                    background={
                                                        displayVars[
                                                            'background'
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                    Primary Foreground on
                                                    Primary
                                                </span>
                                                <ContrastBadge
                                                    foreground={
                                                        displayVars[
                                                            'primary-foreground'
                                                        ]
                                                    }
                                                    background={
                                                        displayVars['primary']
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="my-12 bg-border/40" />

                                <section className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            Typography
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Font families and scale used in this
                                            theme.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <FontDisplay
                                            label="Sans Serif"
                                            variable="font-sans"
                                            value={
                                                theme.font_family ||
                                                displayVars['font-sans'] ||
                                                'Geist Sans'
                                            }
                                        />
                                        <FontDisplay
                                            label="Serif"
                                            variable="font-serif"
                                            value={
                                                theme.font_serif ||
                                                displayVars['font-serif']
                                            }
                                        />
                                        <FontDisplay
                                            label="Monospace"
                                            variable="font-mono"
                                            value={
                                                theme.font_mono ||
                                                displayVars['font-mono']
                                            }
                                        />
                                    </div>
                                </section>

                                <Separator className="my-12 bg-border/40" />

                                <section className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            Component Previews
                                        </h2>
                                        <p className="text-muted-foreground">
                                            How the theme looks applied to
                                            standard interface elements.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                Interactive
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border/40 bg-card p-6">
                                                <Button size="sm">
                                                    Primary
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    Secondary
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Outline
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                >
                                                    Ghost
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                >
                                                    Destructive
                                                </Button>
                                            </div>

                                            <div className="space-y-4 rounded-lg border border-border/40 bg-card p-6">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="email"
                                                        className="text-xs"
                                                    >
                                                        Email address
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        placeholder="hello@example.com"
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge>New</Badge>
                                                    <Badge variant="secondary">
                                                        In Progress
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        Draft
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                Feedback & Containers
                                            </h3>
                                            <Alert className="bg-card">
                                                <AlertTitle className="text-sm font-semibold">
                                                    Heads up!
                                                </AlertTitle>
                                                <AlertDescription className="text-xs text-muted-foreground">
                                                    This is a preview of the
                                                    theme applied to an alert
                                                    component.
                                                </AlertDescription>
                                            </Alert>

                                            <Card className="border-border/40">
                                                <CardHeader className="p-4">
                                                    <CardTitle className="text-sm font-bold">
                                                        Card Component
                                                    </CardTitle>
                                                    <CardDescription className="text-xs">
                                                        Visualizing elevation
                                                        and spacing.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0">
                                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                                        Cards are used to group
                                                        related information and
                                                        provide a clear
                                                        hierarchy.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="export"
                        className="space-y-8 outline-none"
                    >
                        <section className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Theme CSS Variables
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Copy these into your main CSS file.
                                </p>
                            </div>
                            <div className="relative">
                                <MainEditorBlock
                                    language={`css`}
                                    options={{
                                        minimap: {
                                            enabled: true,
                                        },
                                    }}
                                    showFullScreenToggle={true}
                                    height="780px"
                                    value={`@custom-variant dark (&:is(.dark *));

@theme {
    --font-sans: '${
        theme.font_family || 'Instrument Sans'
    }', ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

    --radius-lg: var(--radius);
    --radius-md: calc(var(--radius) - 2px);
    --radius-sm: calc(var(--radius) - 4px);

${Object.keys(theme.vars_light || {})
    .filter((k) => k !== 'radius')
    .sort()
    .map((k) => '    --color-' + k + ': var(--' + k + ');')
    .join('\n')}
}

:root {
${Object.entries(theme.vars_light || {})
    .map(([k, v]) => '    --' + k + ': ' + v + ';')
    .join('\n')}
}

.dark {
${Object.entries(theme.vars_dark || {})
    .map(([k, v]) => '    --' + k + ': ' + v + ';')
    .join('\n')}
}

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground selection:bg-primary/75 selection:text-primary-foreground;
    }
}`}
                                />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Theme JSON
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    The registry representation of the theme.
                                </p>
                            </div>
                            <div className="relative">
                                <MainEditorBlock
                                    language={`json`}
                                    options={{
                                        minimap: {
                                            enabled: true,
                                        },
                                    }}
                                    showFullScreenToggle={true}
                                    height="780px"
                                    value={JSON.stringify(theme, null, 2)}
                                />
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </MainWrapper>
        </div>
    );
}

ThemesShow.layout = ThemeLayout;

export default ThemesShow;
