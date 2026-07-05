import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Package,
    Settings,
    FileCode,
    Smartphone,
    Tablet,
    Monitor,
    Maximize2,
    Minimize2,
    GripVertical,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import Heading from '@/components/heading';
import RegistryPreview from '@/components/registry-preview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainWrapper from '@/layouts/main/main-wrapper';
import { MainCodeBlock } from '@/layouts/main/theme/main-code-block';
import MainRegistryInstaller from '@/layouts/main/theme/main-registry-installer';
import MainLayout from '@/layouts/main-layout';
import { index as componentsIndex, show } from '@/routes/components';
import { REGISTRY_TYPE_LABELS } from '@/types/registry';

interface ComponentFile {
    path: string;
    type: string;
    content: string;
}

interface ComponentDetail {
    name: string;
    title: string;
    type: string;
    description: string | null;
    categories: string[];
    author: string | null;
    dependencies: string[];
    registryDependencies: string[];
    files: ComponentFile[];
}

interface SidebarItem {
    name: string;
    title: string;
    type: string;
    categories: string[];
}

export default function ComponentShow({
    component,
    sidebarItems,
}: {
    component: ComponentDetail;
    sidebarItems: SidebarItem[];
}) {
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);
    const [selectedInterfaceIndex, setSelectedInterfaceIndex] = useState(0);

    const [previewWidth, setPreviewWidth] = useState<string | number>('100%');
    const [previewMode, setPreviewMode] = useState<
        'mobile' | 'tablet' | 'desktop' | 'custom'
    >('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const previewRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!previewRef.current || !containerRef.current) {
            return;
        }

        const rect = previewRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const parentWidth = containerRef.current.offsetWidth;
        const maxW = parentWidth - 24;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const distanceFromCenter = Math.abs(moveEvent.clientX - centerX);
            const newWidth = Math.max(
                320,
                Math.min(maxW, distanceFromCenter * 2),
            );
            setPreviewWidth(newWidth);
            setPreviewMode('custom');
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Group sidebar items by category for nice organization
    const groupedSidebarItems = useMemo(() => {
        const groups: Record<string, SidebarItem[]> = {};

        sidebarItems.forEach((item) => {
            const cat =
                item.categories && item.categories.length > 0
                    ? item.categories[0]
                    : 'other';
            if (!groups[cat]) {
                groups[cat] = [];
            }
            groups[cat].push(item);
        });

        // Custom order for the categories
        const order = [
            'buttons',
            'inputs',
            'rating',
            'progress',
            'tabs',
            'glow',
            'animations',
            'canvas',
            'hero-sections',
            'stats',
            'media',
            'pricing',
            'forms',
            'properties',
            'reviews',
            'galleries',
            'hooks',
            'lib',
        ];

        const sortedGroups: Record<string, SidebarItem[]> = {};

        order.forEach((cat) => {
            if (groups[cat] && groups[cat].length > 0) {
                sortedGroups[cat] = groups[cat];
            }
        });

        Object.keys(groups).forEach((cat) => {
            if (!sortedGroups[cat]) {
                sortedGroups[cat] = groups[cat];
            }
        });

        return sortedGroups;
    }, [sidebarItems]);

    // Parse TypeScript interfaces or type aliases ending with Props, Options or Config
    const propsInterfaces = useMemo(() => {
        const list: {
            name: string;
            properties: {
                name: string;
                type: string;
                isOptional: boolean;
                description: string;
            }[];
        }[] = [];

        component.files.forEach((file) => {
            if (!file.content) {
                return;
            }

            // Match interface name and body (simple search for braces)
            const interfaceRegex =
                /(?:export\s+)?(?:interface|type)\s+(\w+Props|\w+Options|\w+Config)\s*(?:extends\s+[^{]+)?\s*\{([\s\S]*?)\}/g;

            let match;

            while ((match = interfaceRegex.exec(file.content)) !== null) {
                const interfaceName = match[1];
                const interfaceBody = match[2];

                // Matches standard property definitions: propName(?:): type
                // Handles preceding JSDoc comment /** ... */
                const propRegex =
                    /(?:\/\*\*([\s\S]*?)\*\/)?\s*(\w+)(\?)?\s*:\s*([^;/\n]+)/g;
                const properties: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                    description: string;
                }[] = [];

                let propMatch;

                while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
                    const comment = propMatch[1]
                        ? propMatch[1]
                              .replace(/\*+/g, '')
                              .replace(/\n/g, ' ')
                              .replace(/\s+/g, ' ')
                              .trim()
                        : '';
                    const name = propMatch[2];
                    const isOptional = !!propMatch[3];
                    const type = propMatch[4].trim();

                    if (name === 'toString' || name === 'valueOf') {
                        continue;
                    }

                    properties.push({
                        name,
                        type,
                        isOptional,
                        description: comment || 'No description available.',
                    });
                }

                if (properties.length > 0) {
                    list.push({
                        name: interfaceName,
                        properties,
                    });
                }
            }
        });

        return list;
    }, [component.files]);

    const usageSnippet = useMemo(() => {
        const mainFile =
            component.files.find((f) => f.path.includes(component.name)) ||
            component.files[0];
        if (!mainFile || !mainFile.content) {
            return '';
        }

        // Get import path
        let importPath = mainFile.path;
        const prefix = 'resources/js/registry/new-york/';
        if (importPath.startsWith(prefix)) {
            importPath = importPath.substring(prefix.length);
        }

        if (importPath.startsWith('components/')) {
            importPath = importPath.replace('components/', '@/components/');
        } else if (importPath.startsWith('hooks/')) {
            importPath = importPath.replace('hooks/', '@/hooks/');
        } else if (importPath.startsWith('lib/')) {
            importPath = importPath.replace('lib/', '@/lib/');
        } else if (importPath.startsWith('types/')) {
            importPath = importPath.replace('types/', '@/types/');
        } else {
            importPath = '@/' + importPath;
        }

        importPath = importPath.replace(/\.(tsx|ts|jsx|js)$/, '');

        // Extract exported symbols (functions, consts, classes)
        const exportRegex =
            /export\s+(?:default\s+)?(?:const|function|class)\s+([a-zA-Z0-9_]+)/g;
        const exports: string[] = [];
        let match;
        while ((match = exportRegex.exec(mainFile.content)) !== null) {
            const name = match[1];
            if (
                name &&
                !name.endsWith('Props') &&
                !name.endsWith('Options') &&
                !name.endsWith('Config') &&
                !name.endsWith('Variants') &&
                name !== 'default' &&
                !name.startsWith('_')
            ) {
                exports.push(name);
            }
        }

        if (exports.length === 0) {
            const defaultExportRegex = /export\s+default\s+([a-zA-Z0-9_]+)/;
            const defMatch = defaultExportRegex.exec(mainFile.content);
            if (defMatch && defMatch[1]) {
                exports.push(defMatch[1]);
            }
        }

        if (exports.length === 0) {
            const camelCaseName = component.name
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
            exports.push(camelCaseName);
        }

        const primarySymbol = exports[0];
        const isHook = primarySymbol.startsWith('use');

        if (isHook) {
            return `import { ${primarySymbol} } from '${importPath}';\n\nexport default function Demo() {\n    const [ref, value] = ${primarySymbol}();\n\n    return (\n        <div ref={ref}>\n            {value ? 'Active' : 'Inactive'}\n        </div>\n    );\n}`;
        }

        const needsChildren = [
            'Button',
            'Card',
            'Badge',
            'Alert',
            'Heading',
            'Paragraph',
        ].some((p) => primarySymbol.includes(p));
        if (needsChildren) {
            return `import { ${primarySymbol} } from '${importPath}';\n\nexport default function Demo() {\n    return (\n        <${primarySymbol}>\n            Get Started\n        </${primarySymbol}>\n    );\n}`;
        }

        return `import { ${primarySymbol} } from '${importPath}';\n\nexport default function Demo() {\n    return (\n        <${primarySymbol} />\n    );\n}`;
    }, [component]);

    const activeFileIdx =
        selectedFileIndex >= component.files.length ? 0 : selectedFileIndex;
    const activeFile = component.files[activeFileIdx] || null;

    const activeInterfaceIdx =
        selectedInterfaceIndex >= propsInterfaces.length
            ? 0
            : selectedInterfaceIndex;

    // Detect language from file path extension
    const getLanguage = (path: string) => {
        if (path.endsWith('.tsx') || path.endsWith('.jsx')) {
            return 'tsx';
        }

        if (path.endsWith('.ts') || path.endsWith('.js')) {
            return 'typescript';
        }

        if (path.endsWith('.css')) {
            return 'css';
        }

        return 'html';
    };

    // Label formatting helper
    const getGroupLabel = (cat: string) => {
        const labels: Record<string, string> = {
            buttons: 'Buttons',
            inputs: 'Inputs',
            rating: 'Rating Components',
            progress: 'Progress Circle',
            tabs: 'Tab Selectors',
            glow: 'Glow Effects',
            animations: 'Animations',
            canvas: 'Canvas Arts',
            'hero-sections': 'Hero Sections',
            stats: 'Stats & Dashboards',
            media: 'Media Players',
            pricing: 'Pricing Plans',
            forms: 'Booking Forms',
            properties: 'Real Estate Listings',
            reviews: 'Reviews & Testimonials',
            galleries: 'Component Galleries',
            hooks: 'React Hooks',
            lib: 'Utility Libs',
            other: 'Other Components',
        };

        return (
            labels[cat] ||
            cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        );
    };

    return (
        <MainWrapper className="pt-4 pb-12">
            <div className="mb-6">
                <Link
                    href={componentsIndex().url}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to Components
                </Link>
            </div>

            {/* Sidebar + Main content layout */}
            <div className="flex flex-col items-start gap-8 lg:flex-row">
                {/* Sidebar Navigation */}
                <aside
                    scroll-region="true"
                    className="no-scrollbar sticky top-20 hidden max-h-[calc(100vh-8rem)] w-full shrink-0 overflow-y-auto rounded-xl border border-border/40 bg-card/15 p-4 pr-2 md:block lg:w-64"
                >
                    <div className="flex flex-col gap-6">
                        {Object.entries(groupedSidebarItems).map(
                            ([type, items]) => {
                                if (items.length === 0) {
                                    return null;
                                }

                                return (
                                    <div
                                        key={type}
                                        className="flex flex-col gap-2"
                                    >
                                        <h4 className="px-2 text-xs font-semibold tracking-wider text-muted-foreground/85 uppercase">
                                            {getGroupLabel(type)}
                                        </h4>
                                        <div className="flex flex-col gap-0.5">
                                            {items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={show(item.name).url}
                                                    preserveScroll
                                                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                                        component.name ===
                                                        item.name
                                                            ? 'bg-primary/10 font-semibold text-primary'
                                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </aside>

                {/* Main Details Panel */}
                <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
                    {/* Header Details */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="font-mono text-[10px] tracking-wider uppercase"
                            >
                                {REGISTRY_TYPE_LABELS[component.type] ??
                                    'component'}
                            </Badge>
                            {component.categories.map((c) => (
                                <Badge
                                    key={c}
                                    variant="outline"
                                    className="text-[10px] tracking-wider capitalize uppercase"
                                >
                                    {c}
                                </Badge>
                            ))}
                            {component.author && (
                                <span className="text-xs text-muted-foreground">
                                    By {component.author}
                                </span>
                            )}
                        </div>
                        <Heading
                            title={component.title}
                            description={
                                component.description ||
                                'No description provided.'
                            }
                        />
                    </div>

                    {/* Inertia/React Tabs */}
                    <Tabs defaultValue="preview" className="w-full">
                        <TabsList
                            className={`mb-6 grid w-full max-w-sm ${propsInterfaces.length > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}
                        >
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="installation">
                                Installation
                            </TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                            {propsInterfaces.length > 0 && (
                                <TabsTrigger value="api">Props</TabsTrigger>
                            )}
                        </TabsList>

                        {/* Preview Tab Panel */}
                        <TabsContent
                            value="preview"
                            className="animate-in duration-200 fade-in-50 focus-visible:outline-none"
                        >
                            <div
                                ref={containerRef}
                                className="flex w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/25"
                            >
                                {/* Toolbar */}
                                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-t-xl border-b border-border/40 bg-muted/40 px-4 py-2 select-none">
                                    {/* Left: Size presets */}
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant={
                                                previewMode === 'desktop'
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() => {
                                                setPreviewWidth('100%');
                                                setPreviewMode('desktop');
                                            }}
                                            className="h-7 gap-1.5 px-2.5 text-[10px] font-bold tracking-tight uppercase"
                                        >
                                            <Monitor className="size-3" />
                                            Desktop
                                        </Button>
                                        <Button
                                            variant={
                                                previewMode === 'tablet'
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() => {
                                                setPreviewWidth(768);
                                                setPreviewMode('tablet');
                                            }}
                                            className="h-7 gap-1.5 px-2.5 text-[10px] font-bold tracking-tight uppercase"
                                        >
                                            <Tablet className="size-3" />
                                            Tablet
                                        </Button>
                                        <Button
                                            variant={
                                                previewMode === 'mobile'
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() => {
                                                setPreviewWidth(375);
                                                setPreviewMode('mobile');
                                            }}
                                            className="h-7 gap-1.5 px-2.5 text-[10px] font-bold tracking-tight uppercase"
                                        >
                                            <Smartphone className="size-3" />
                                            Mobile
                                        </Button>
                                    </div>

                                    {/* Center: Current width indicator */}
                                    <div className="hidden items-center gap-1 font-mono text-[10px] font-semibold text-muted-foreground sm:flex">
                                        <span>Width:</span>
                                        <span className="text-foreground">
                                            {typeof previewWidth === 'number'
                                                ? `${previewWidth}px`
                                                : '100%'}
                                        </span>
                                        {previewMode === 'custom' && (
                                            <span className="text-primary/70">
                                                (Custom)
                                            </span>
                                        )}
                                    </div>

                                    {/* Right: Fullscreen control */}
                                    <div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setIsFullscreen(true)
                                            }
                                            className="size-7 cursor-pointer text-muted-foreground hover:text-foreground"
                                        >
                                            <Maximize2 className="size-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Preview Frame Area */}
                                <div className="relative flex min-h-[350px] items-center justify-center overflow-x-auto bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:16px_16px] p-6 md:p-8">
                                    <div
                                        ref={previewRef}
                                        style={{
                                            width:
                                                typeof previewWidth === 'number'
                                                    ? `${previewWidth}px`
                                                    : previewWidth,
                                            transition:
                                                previewMode !== 'custom'
                                                    ? 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                    : 'none',
                                        }}
                                        className="relative flex min-h-[250px] items-center justify-center rounded-lg border border-border/40 bg-card/65 pr-3 shadow-sm backdrop-blur-xs"
                                    >
                                        <div className="flex h-full w-full items-center justify-center p-4">
                                            <RegistryPreview
                                                name={component.name}
                                            />
                                        </div>

                                        {/* Right Resize Handle */}
                                        <div
                                            onMouseDown={handleResizeStart}
                                            className="group/handle absolute top-0 right-0 bottom-0 z-20 flex w-3 cursor-ew-resize items-center justify-center select-none"
                                        >
                                            <div className="flex h-10 w-1 items-center justify-center rounded-full bg-border/80 transition-colors group-hover/handle:bg-primary">
                                                <GripVertical className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover/handle:opacity-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Installation Tab Panel */}
                        <TabsContent
                            value="installation"
                            className="flex flex-col gap-6 focus-visible:outline-none"
                        >
                            <Card className="border border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-base font-semibold">
                                        Install via shadcn CLI
                                    </CardTitle>
                                    <CardDescription>
                                        Run the appropriate command below in
                                        your terminal to automatically pull and
                                        resolve this component into your
                                        codebase.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <MainRegistryInstaller
                                        code={component.name}
                                    />
                                </CardContent>
                            </Card>

                            {usageSnippet && (
                                <Card className="border border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-base font-semibold">
                                            How to Use
                                        </CardTitle>
                                        <CardDescription>
                                            Import and render this component in
                                            your project.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <MainCodeBlock
                                            code={usageSnippet}
                                            language="tsx"
                                            variant="default"
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Dependencies Lists */}
                            {(component.dependencies.length > 0 ||
                                component.registryDependencies.length > 0) && (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* NPM dependencies */}
                                    {component.dependencies.length > 0 && (
                                        <Card className="border border-border/50">
                                            <CardHeader className="py-4">
                                                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                                    <Package className="size-4 text-muted-foreground" />
                                                    NPM Dependencies
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-wrap gap-1.5 pb-4">
                                                {component.dependencies.map(
                                                    (dep) => (
                                                        <Badge
                                                            key={dep}
                                                            variant="outline"
                                                        >
                                                            {dep}
                                                        </Badge>
                                                    ),
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Registry dependencies */}
                                    {component.registryDependencies.length >
                                        0 && (
                                        <Card className="border border-border/50">
                                            <CardHeader className="py-4">
                                                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                                    <Settings className="size-4 text-muted-foreground" />
                                                    Registry Dependencies
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-wrap gap-1.5 pb-4">
                                                {component.registryDependencies.map(
                                                    (dep) => {
                                                        // Get the filename / name from registry url
                                                        const depName = dep
                                                            .substring(
                                                                dep.lastIndexOf(
                                                                    '/',
                                                                ) + 1,
                                                            )
                                                            .replace(
                                                                '.json',
                                                                '',
                                                            );

                                                        return (
                                                            <Badge
                                                                key={dep}
                                                                variant="outline"
                                                            >
                                                                {depName}
                                                            </Badge>
                                                        );
                                                    },
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {/* Files to be added */}
                            <Card className="border border-border/50">
                                <CardHeader className="py-4">
                                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                        <FileCode className="size-4 text-muted-foreground" />
                                        Files Added ({component.files.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2 pb-4">
                                    {component.files.map((file) => (
                                        <div
                                            key={file.path}
                                            className="flex items-center justify-between border-b border-border/30 py-2 last:border-b-0"
                                        >
                                            <div className="flex min-w-0 flex-col gap-0.5">
                                                <span className="truncate font-mono text-xs font-semibold">
                                                    {file.path.split('/').pop()}
                                                </span>
                                                <span className="truncate font-mono text-[10px] text-muted-foreground">
                                                    {file.path}
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="shrink-0 font-mono text-[10px] uppercase"
                                            >
                                                {file.type.split(':').pop()}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Code Tab Panel */}
                        <TabsContent
                            value="code"
                            className="flex flex-col gap-4 focus-visible:outline-none"
                        >
                            {/* File Selection bar (if multiple files) */}
                            {component.files.length > 1 && (
                                <div className="flex flex-wrap gap-1 rounded-lg border border-border/40 bg-muted/20 p-1">
                                    {component.files.map((file, idx) => (
                                        <Button
                                            key={file.path}
                                            variant={
                                                selectedFileIndex === idx
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setSelectedFileIndex(idx)
                                            }
                                            className="h-8 font-mono text-xs"
                                        >
                                            {file.path.split('/').pop()}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* Active Codeblock */}
                            {activeFile ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
                                        <span className="font-mono">
                                            {activeFile.path}
                                        </span>
                                        <span className="capitalize">
                                            {getLanguage(activeFile.path)}{' '}
                                            format
                                        </span>
                                    </div>
                                    <MainCodeBlock
                                        code={activeFile.content}
                                        language={getLanguage(activeFile.path)}
                                        variant="default"
                                    />
                                </div>
                            ) : (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    No source files found for this component.
                                </div>
                            )}
                        </TabsContent>

                        {/* API Reference Tab Panel */}
                        {propsInterfaces.length > 0 && (
                            <TabsContent
                                value="api"
                                className="flex flex-col gap-6 focus-visible:outline-none"
                            >
                                <Card className="border border-border/50 bg-card/10">
                                    <CardHeader>
                                        <CardTitle className="text-base font-semibold">
                                            Component API Reference
                                        </CardTitle>
                                        <CardDescription>
                                            Autogenerated properties and options
                                            available for configuring this
                                            component.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Selector if multiple interfaces */}
                                        {propsInterfaces.length > 1 && (
                                            <div className="flex max-w-fit flex-wrap gap-1 rounded-lg border border-border/40 bg-muted/20 p-1">
                                                {propsInterfaces.map(
                                                    (item, idx) => (
                                                        <Button
                                                            key={item.name}
                                                            variant={
                                                                activeInterfaceIdx ===
                                                                idx
                                                                    ? 'secondary'
                                                                    : 'ghost'
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedInterfaceIndex(
                                                                    idx,
                                                                )
                                                            }
                                                            className="h-8 font-mono text-xs"
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    ),
                                                )}
                                            </div>
                                        )}

                                        {/* Table of properties */}
                                        {propsInterfaces[
                                            activeInterfaceIdx
                                        ] && (
                                            <div className="overflow-x-auto rounded-lg border border-border/40">
                                                <table className="w-full border-collapse text-left">
                                                    <thead>
                                                        <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
                                                            <th className="p-3">
                                                                Property
                                                            </th>
                                                            <th className="p-3">
                                                                Type
                                                            </th>
                                                            <th className="p-3">
                                                                Description
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-border/30 text-xs">
                                                        {propsInterfaces[
                                                            activeInterfaceIdx
                                                        ].properties.map(
                                                            (prop) => (
                                                                <tr
                                                                    key={
                                                                        prop.name
                                                                    }
                                                                    className="transition-colors hover:bg-muted/15"
                                                                >
                                                                    <td className="p-3 font-mono font-semibold">
                                                                        {
                                                                            prop.name
                                                                        }
                                                                        {prop.isOptional ? (
                                                                            <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                                                                                (optional)
                                                                            </span>
                                                                        ) : (
                                                                            <span className="ml-1 text-[10px] font-bold text-red-500">
                                                                                *
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        className="max-w-[200px] truncate rounded bg-primary/5 p-3 px-2 font-mono text-primary"
                                                                        title={
                                                                            prop.type
                                                                        }
                                                                    >
                                                                        {
                                                                            prop.type
                                                                        }
                                                                    </td>
                                                                    <td className="p-3 leading-relaxed text-muted-foreground">
                                                                        {
                                                                            prop.description
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </div>
            {/* Fullscreen Preview Overlay */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 flex animate-in flex-col bg-background duration-200 select-none fade-in">
                    {/* Header bar */}
                    <div className="flex h-14 items-center justify-between border-b border-border bg-card/60 px-6 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold">
                                {component.title}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                                {typeof previewWidth === 'number'
                                    ? `${previewWidth}px`
                                    : '100%'}
                            </span>
                        </div>

                        {/* Presets */}
                        <div className="flex items-center gap-1">
                            <Button
                                variant={
                                    previewMode === 'desktop'
                                        ? 'secondary'
                                        : 'ghost'
                                }
                                size="sm"
                                onClick={() => {
                                    setPreviewWidth('100%');
                                    setPreviewMode('desktop');
                                }}
                                className="h-8 gap-1.5 px-3 text-[10px] font-bold tracking-tight uppercase"
                            >
                                <Monitor className="size-3.5" />
                                Desktop
                            </Button>
                            <Button
                                variant={
                                    previewMode === 'tablet'
                                        ? 'secondary'
                                        : 'ghost'
                                }
                                size="sm"
                                onClick={() => {
                                    setPreviewWidth(768);
                                    setPreviewMode('tablet');
                                }}
                                className="h-8 gap-1.5 px-3 text-[10px] font-bold tracking-tight uppercase"
                            >
                                <Tablet className="size-3.5" />
                                Tablet
                            </Button>
                            <Button
                                variant={
                                    previewMode === 'mobile'
                                        ? 'secondary'
                                        : 'ghost'
                                }
                                size="sm"
                                onClick={() => {
                                    setPreviewWidth(375);
                                    setPreviewMode('mobile');
                                }}
                                className="h-8 gap-1.5 px-3 text-[10px] font-bold tracking-tight uppercase"
                            >
                                <Smartphone className="size-3.5" />
                                Mobile
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFullscreen(false)}
                            className="h-8 cursor-pointer gap-1.5 px-3 text-xs font-semibold"
                        >
                            <Minimize2 className="size-3.5" />
                            Close
                        </Button>
                    </div>

                    {/* Content Viewport */}
                    <div
                        ref={containerRef}
                        className="flex flex-1 items-center justify-center overflow-auto bg-muted/10 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:16px_16px] p-8"
                    >
                        <div
                            ref={previewRef}
                            style={{
                                width:
                                    typeof previewWidth === 'number'
                                        ? `${previewWidth}px`
                                        : previewWidth,
                                transition:
                                    previewMode !== 'custom'
                                        ? 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        : 'none',
                            }}
                            className="relative flex min-h-[400px] items-center justify-center rounded-xl border border-border bg-card p-6 shadow-2xl"
                        >
                            <RegistryPreview name={component.name} />

                            {/* Right Resize Handle */}
                            <div
                                onMouseDown={handleResizeStart}
                                className="group/handle absolute top-0 right-0 bottom-0 z-20 flex w-4 cursor-ew-resize items-center justify-center select-none"
                            >
                                <div className="flex h-12 w-1 items-center justify-center rounded-full bg-border transition-colors group-hover/handle:bg-primary">
                                    <GripVertical className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/handle:opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainWrapper>
    );
}

ComponentShow.layout = MainLayout;
ComponentShow.displayName = 'ComponentShow';
