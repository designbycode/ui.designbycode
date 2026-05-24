import { Head, useForm } from '@inertiajs/react';
import { Loader2, Sparkles, FileJson, Edit3, Save, Star } from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';

import AiThemeGenerator from '@/components/themes/ai-theme-generator';
import ThemeEditorVariables from '@/components/themes/theme-editor-variables';
import ThemeInfo from '@/components/themes/theme-info';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCSSVars } from '@/hooks/use-css-vars';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainThemeCard from '@/layouts/main/theme/main-theme-card';
import MainLayout from '@/layouts/main-layout';
import { store } from '@/routes/themes';
import { ButtonParticles } from '@/registry/new-york/components/ui/buttons/button-particles';
import CardsPreview from '@/components/preview/cards-preview';

interface ThemeCreateProps {
    baseTheme?: any;
    availableTags?: string[];
}

const DEFAULT_VARS_LIGHT = {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    card: 'oklch(1 0 0)',
    'card-foreground': 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    'popover-foreground': 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    'primary-foreground': 'oklch(0.985 0 0)',
    secondary: 'oklch(0.97 0 0)',
    'secondary-foreground': 'oklch(0.205 0 0)',
    muted: 'oklch(0.97 0 0)',
    'muted-foreground': 'oklch(0.556 0 0)',
    accent: 'oklch(0.97 0 0)',
    'accent-foreground': 'oklch(0.205 0 0)',
    destructive: 'oklch(0.577 0.245 27.325)',
    'destructive-foreground': 'oklch(0.577 0.245 27.325)',
    border: 'oklch(0.922 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.87 0 0)',
    'chart-1': 'oklch(0.646 0.222 41.116)',
    'chart-2': 'oklch(0.6 0.118 184.704)',
    'chart-3': 'oklch(0.398 0.07 227.392)',
    'chart-4': 'oklch(0.828 0.189 84.429)',
    'chart-5': 'oklch(0.769 0.188 70.08)',
    radius: '0.5rem',
    sidebar: 'oklch(0.985 0 0)',
    'sidebar-foreground': 'oklch(0.145 0 0)',
    'sidebar-primary': 'oklch(0.205 0 0)',
    'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    'sidebar-accent': 'oklch(0.97 0 0)',
    'sidebar-accent-foreground': 'oklch(0.205 0 0)',
    'sidebar-border': 'oklch(0.922 0 0)',
    'sidebar-ring': 'oklch(0.87 0 0)',
};

const DEFAULT_VARS_DARK = {
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    card: 'oklch(0.145 0 0)',
    'card-foreground': 'oklch(0.985 0 0)',
    popover: 'oklch(0.145 0 0)',
    'popover-foreground': 'oklch(0.985 0 0)',
    primary: 'oklch(0.985 0 0)',
    'primary-foreground': 'oklch(0.205 0 0)',
    secondary: 'oklch(0.269 0 0)',
    'secondary-foreground': 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    'muted-foreground': 'oklch(0.708 0 0)',
    accent: 'oklch(0.269 0 0)',
    'accent-foreground': 'oklch(0.985 0 0)',
    destructive: 'oklch(0.396 0.141 25.723)',
    'destructive-foreground': 'oklch(0.637 0.237 25.331)',
    border: 'oklch(0.269 0 0)',
    input: 'oklch(0.269 0 0)',
    ring: 'oklch(0.439 0 0)',
    'chart-1': 'oklch(0.488 0.243 264.376)',
    'chart-2': 'oklch(0.696 0.17 162.48)',
    'chart-3': 'oklch(0.769 0.188 70.08)',
    'chart-4': 'oklch(0.627 0.265 303.9)',
    'chart-5': 'oklch(0.645 0.246 16.439)',
    sidebar: 'oklch(0.205 0 0)',
    'sidebar-foreground': 'oklch(0.985 0 0)',
    'sidebar-primary': 'oklch(0.985 0 0)',
    'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    'sidebar-accent': 'oklch(0.269 0 0)',
    'sidebar-accent-foreground': 'oklch(0.985 0 0)',
    'sidebar-border': 'oklch(0.269 0 0)',
    'sidebar-ring': 'oklch(0.439 0 0)',
};

export default function ThemeCreate({
    baseTheme,
    availableTags,
}: ThemeCreateProps) {
    const [activeTab, setActiveTab] = useState('manual');
    const [editorMode, setEditorMode] = useState<'light' | 'dark'>('light');

    const { data, setData, post, processing, errors } = useForm({
        url: '',
        theme_data: null as any,
    });

    const [manualTheme, setManualTheme] = useState<Record<string, any>>({
        title: baseTheme?.title || 'My New Theme',
        name: baseTheme?.name ? `${baseTheme.name}-fork` : 'my-new-theme',
        description:
            baseTheme?.description || 'A custom theme created manually.',
        tags: baseTheme ? [...(baseTheme.tags || []), 'forked'] : [],
        vars_light: baseTheme?.vars_light || DEFAULT_VARS_LIGHT,
        vars_dark: baseTheme?.vars_dark || DEFAULT_VARS_DARK,
        font_family: baseTheme?.font_family || 'Inter',
    });

    const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    const handleManualSubmit = () => {
        setData('theme_data', {
            ...manualTheme,
            cssVars: {
                light: manualTheme.vars_light,
                dark: manualTheme.vars_dark,
            },
        });
        post(store().url);
    };

    const handleAiGenerated = (aiData: any) => {
        setManualTheme({
            ...aiData,
            title: aiData.title,
            name: aiData.name,
            description: aiData.description,
            tags: aiData.tags,
            vars_light: aiData.vars_light,
            vars_dark: aiData.vars_dark,
            font_family: aiData.font_family || 'Inter',
        });
        setActiveTab('manual');
    };

    const handleVariableChange = (
        mode: 'light' | 'dark',
        key: string,
        value: string,
    ) => {
        setManualTheme((prev) => ({
            ...prev,
            vars_light:
                mode === 'light'
                    ? { ...prev.vars_light, [key]: value }
                    : prev.vars_light,
            vars_dark:
                mode === 'dark'
                    ? { ...prev.vars_dark, [key]: value }
                    : prev.vars_dark,
        }));
    };

    const handleEditorTabChange = (mode: 'light' | 'dark') => {
        setEditorMode(mode);
    };

    // Mock Registry object for preview
    const previewTheme = {
        ...manualTheme,
        cssVars: {
            light:
                editorMode === 'dark'
                    ? manualTheme.vars_dark
                    : manualTheme.vars_light,
            dark:
                editorMode === 'light'
                    ? manualTheme.vars_light
                    : manualTheme.vars_dark,
            theme:
                editorMode === 'light'
                    ? manualTheme.vars_light
                    : manualTheme.vars_dark,
        },
    } as any;

    const { cssVars } = useCSSVars(previewTheme);

    return (
        <MainWrapper className="py-8">
            <Head title="Create Theme" />

            <div>
                <Heading
                    title="Create New Theme"
                    description="Import, generate with AI, or manually craft your perfect shadcn/ui theme."
                />

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger
                            value="manual"
                            className="flex items-center gap-2"
                        >
                            <Edit3 className="size-4" />
                            Manual
                        </TabsTrigger>
                        <TabsTrigger
                            value="import"
                            className="flex items-center gap-2"
                        >
                            <FileJson className="size-4" />
                            Import URL
                        </TabsTrigger>
                        <TabsTrigger
                            value="ai"
                            className="flex items-center gap-2"
                        >
                            <Sparkles className="size-4" />
                            AI
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-1">
                                <ThemeInfo
                                    theme={{
                                        title: manualTheme.title,
                                        name: manualTheme.name,
                                        description: manualTheme.description,
                                        tags: manualTheme.tags,
                                    }}
                                    availableTags={availableTags ?? []}
                                    onChange={(updates) =>
                                        setManualTheme((p) => ({
                                            ...p,
                                            ...updates,
                                        }))
                                    }
                                />

                                <ThemeEditorVariables
                                    vars_light={manualTheme.vars_light}
                                    vars_dark={manualTheme.vars_dark}
                                    onChange={handleVariableChange}
                                    onTabChange={handleEditorTabChange}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        size="lg"
                                        onClick={handleManualSubmit}
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="mr-2 h-4 w-4" />
                                        )}
                                        Save Theme
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div
                                    style={cssVars}
                                    className="sticky top-8 col-span-2 flex flex-col gap-4 rounded-lg bg-muted p-4"
                                >
                                    <h3 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                        Preview
                                    </h3>
                                    <MainThemeCard theme={previewTheme} />

                                    <Card>
                                        <CardHeader
                                            className={`flex flex-row items-center justify-between`}
                                        >
                                            <CardTitle>Preview</CardTitle>
                                            <ButtonParticles
                                                colors={[
                                                    'var(--primary)',
                                                    'var(--secondary)',
                                                ]}
                                                size="sm"
                                            >
                                                <Star className="size-4" />
                                                <span>Start Us</span>
                                            </ButtonParticles>
                                        </CardHeader>
                                        <CardContent>
                                            <p
                                                className={`test-sm text-balance text-card-foreground`}
                                            >
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit.
                                                Rem, reprehenderit!
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <div className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                                        <p>
                                            Your theme will be saved to your
                                            account. You can further refine it
                                            or publish it for others to use.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <CardsPreview style={cssVars} />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="import">
                        <Card className="mx-auto max-w-2xl">
                            <form onSubmit={handleImportSubmit}>
                                <CardHeader>
                                    <CardTitle>Import from URL</CardTitle>
                                    <CardDescription>
                                        Enter a valid shadcn registry JSON URL
                                        (e.g. from tweakcn.com).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label
                                            className={`inline-flex`}
                                            htmlFor="url"
                                        >
                                            Registry URL
                                        </Label>
                                        <Input
                                            id="url"
                                            type="url"
                                            placeholder="https://tweakcn.com/r/themes/neo-brutalism.json"
                                            value={data.url}
                                            onChange={(e) =>
                                                setData('url', e.target.value)
                                            }
                                            required
                                            autoFocus
                                        />
                                        {errors.url && (
                                            <p className="text-sm font-medium text-destructive">
                                                {errors.url}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className={`pt-4`}>
                                    <Button type="submit" disabled={processing}>
                                        {processing && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Import Theme
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="ai">
                        <div className="mx-auto max-w-2xl">
                            <AiThemeGenerator onGenerated={handleAiGenerated} />
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-12 rounded-lg bg-muted p-4">
                    <h3 className="mb-2 text-sm font-semibold">Tips:</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                            Manual mode gives you full control over every single
                            color variable.
                        </li>
                        <li>
                            Importing from URL is the fastest way to bring in
                            existing themes.
                        </li>
                        <li>
                            Use AI to quickly explore different color palettes
                            and moods.
                        </li>
                    </ul>
                </div>
            </div>
        </MainWrapper>
    );
}

ThemeCreate.layout = MainLayout;
