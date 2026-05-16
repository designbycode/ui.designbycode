import { Head, useForm } from '@inertiajs/react';
import { Loader2, Sparkles, FileJson, Edit3, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import Heading from '@/components/heading';
import AiThemeGenerator from '@/components/themes/ai-theme-generator';
import ThemeEditorVariables from '@/components/themes/theme-editor-variables';
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
import MainWrapper from '@/layouts/main/main-wrapper';
import MainThemeCard from '@/layouts/main/theme/main-theme-card';
import MainLayout from '@/layouts/main-layout';
import { store } from '@/routes/themes';

interface ThemeCreateProps {
    baseTheme?: any;
}

const DEFAULT_VARS_LIGHT = {
    background: '0 0% 100%',
    foreground: '240 10% 3.9%',
    card: '0 0% 100%',
    'card-foreground': '240 10% 3.9%',
    popover: '0 0% 100%',
    'popover-foreground': '240 10% 3.9%',
    primary: '240 5.9% 10%',
    'primary-foreground': '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    'secondary-foreground': '240 5.9% 10%',
    muted: '240 4.8% 95.9%',
    'muted-foreground': '240 3.8% 46.1%',
    accent: '240 4.8% 95.9%',
    'accent-foreground': '240 5.9% 10%',
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '0 0% 98%',
    border: '240 5.9% 90%',
    input: '240 5.9% 90%',
    ring: '240 5.9% 10%',
    radius: '0.5rem',
};

const DEFAULT_VARS_DARK = {
    background: '240 10% 3.9%',
    foreground: '0 0% 98%',
    card: '240 10% 3.9%',
    'card-foreground': '0 0% 98%',
    popover: '240 10% 3.9%',
    'popover-foreground': '0 0% 98%',
    primary: '0 0% 98%',
    'primary-foreground': '240 5.9% 10%',
    secondary: '240 3.7% 15.9%',
    'secondary-foreground': '0 0% 98%',
    muted: '240 3.7% 15.9%',
    'muted-foreground': '240 5% 64.9%',
    accent: '240 3.7% 15.9%',
    'accent-foreground': '0 0% 98%',
    destructive: '0 62.8% 30.6%',
    'destructive-foreground': '0 0% 98%',
    border: '240 3.7% 15.9%',
    input: '240 3.7% 15.9%',
    ring: '240 4.9% 83.9%',
};

export default function ThemeCreate({ baseTheme }: ThemeCreateProps) {
    const [activeTab, setActiveTab] = useState(baseTheme ? 'manual' : 'import');

    const { data, setData, post, processing, errors } = useForm({
        url: '',
        theme_data: null as any,
    });

    const [manualTheme, setManualTheme] = useState({
        title: baseTheme?.title || 'My New Theme',
        name: baseTheme?.name ? `${baseTheme.name}-fork` : 'my-new-theme',
        description:
            baseTheme?.description || 'A custom theme created manually.',
        tags: baseTheme?.tags || ['custom'],
        vars_light: baseTheme?.vars_light || DEFAULT_VARS_LIGHT,
        vars_dark: baseTheme?.vars_dark || DEFAULT_VARS_DARK,
        font_family: baseTheme?.font_family || 'Inter',
    });

    const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('theme_data', {
            ...manualTheme,
            cssVars: {
                light: manualTheme.vars_light,
                dark: manualTheme.vars_dark,
            },
        });
    };

    // We need to watch data.theme_data to post it when it changes via handleManualSubmit
    useEffect(() => {
        if (data.theme_data) {
            post(store().url);
        }
    }, [data.theme_data, post]);

    const handleAiGenerated = (aiData: any) => {
        setManualTheme({
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

    // Mock Registry object for preview
    const previewTheme = {
        ...manualTheme,
        cssVars: {
            light: manualTheme.vars_light,
            dark: manualTheme.vars_dark,
            theme: {},
        },
    } as any;

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
                            <div className="space-y-6 lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Theme Information</CardTitle>
                                        <CardDescription>
                                            Basic details about your theme.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    value={manualTheme.title}
                                                    onChange={(e) =>
                                                        setManualTheme((p) => ({
                                                            ...p,
                                                            title: e.target
                                                                .value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Slug (kebab-case)
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={manualTheme.name}
                                                    onChange={(e) =>
                                                        setManualTheme((p) => ({
                                                            ...p,
                                                            name: e.target
                                                                .value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                value={manualTheme.description}
                                                onChange={(e) =>
                                                    setManualTheme((p) => ({
                                                        ...p,
                                                        description:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <ThemeEditorVariables
                                    vars_light={manualTheme.vars_light}
                                    vars_dark={manualTheme.vars_dark}
                                    onChange={handleVariableChange}
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
                                <div className="sticky top-8">
                                    <h3 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                        Preview
                                    </h3>
                                    <MainThemeCard theme={previewTheme} />

                                    <div className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                                        <p>
                                            Your theme will be saved to your
                                            account. You can further refine it
                                            or publish it for others to use.
                                        </p>
                                    </div>
                                </div>
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
