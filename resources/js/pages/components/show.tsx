import { Link } from '@inertiajs/react';
import { ArrowLeft, Check, Copy, Grid, Package, Sliders, Settings, FileCode, CheckCircle2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import MainRegistryInstaller from '@/layouts/main/theme/main-registry-installer';
import { MainCodeBlock } from '@/layouts/main/theme/main-code-block';
import RegistryPreview from '@/components/registry-preview';
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

    // Group sidebar items by type for nice organization
    const groupedSidebarItems = useMemo(() => {
        const groups: Record<string, SidebarItem[]> = {
            'registry:ui': [],
            'registry:block': [],
            'registry:hook': [],
            'registry:lib': [],
        };
        
        sidebarItems.forEach((item) => {
            if (groups[item.type]) {
                groups[item.type].push(item);
            } else {
                groups['registry:lib'].push(item);
            }
        });

        return groups;
    }, [sidebarItems]);

    // Parse TypeScript interfaces or type aliases ending with Props, Options or Config
    const propsInterfaces = useMemo(() => {
        const list: { 
            name: string; 
            properties: { name: string; type: string; isOptional: boolean; description: string }[] 
        }[] = [];
        
        component.files.forEach((file) => {
            if (!file.content) {
                return;
            }
            
            // Match interface name and body (simple search for braces)
            const interfaceRegex = /(?:export\s+)?(?:interface|type)\s+(\w+Props|\w+Options|\w+Config)\s*(?:extends\s+[^{]+)?\s*\{([\s\S]*?)\}/g;
            
            let match;
            while ((match = interfaceRegex.exec(file.content)) !== null) {
                const interfaceName = match[1];
                const interfaceBody = match[2];
                
                // Matches standard property definitions: propName(?:): type
                // Handles preceding JSDoc comment /** ... */
                const propRegex = /(?:\/\*\*([\s\S]*?)\*\/)?\s*(\w+)(\?)?\s*:\s*([^;/\n]+)/g;
                const properties: { name: string; type: string; isOptional: boolean; description: string }[] = [];
                
                let propMatch;
                while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
                    const comment = propMatch[1] 
                        ? propMatch[1].replace(/\*+/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() 
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
                        description: comment || 'No description available.'
                    });
                }
                
                if (properties.length > 0) {
                    list.push({
                        name: interfaceName,
                        properties
                    });
                }
            }
        });
        
        return list;
    }, [component.files]);

    const activeFileIdx = selectedFileIndex >= component.files.length ? 0 : selectedFileIndex;
    const activeFile = component.files[activeFileIdx] || null;

    const activeInterfaceIdx = selectedInterfaceIndex >= propsInterfaces.length ? 0 : selectedInterfaceIndex;

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
    const getGroupLabel = (type: string) => {
        switch (type) {
            case 'registry:ui':
                return 'UI Components';
            case 'registry:block':
                return 'Blocks';
            case 'registry:hook':
                return 'Hooks';
            case 'registry:lib':
                return 'Utilities';
            default:
                return 'Other';
        }
    };

    return (
        <MainWrapper className="pt-4 pb-12">
            <div className="mb-6">
                <Link href={componentsIndex().url} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="size-3.5" />
                    Back to Components
                </Link>
            </div>

            {/* Sidebar + Main content layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 sticky top-20 border border-border/40 bg-card/15 rounded-xl p-4 hidden md:block no-scrollbar">
                    <div className="flex flex-col gap-6">
                        {Object.entries(groupedSidebarItems).map(([type, items]) => {
                            if (items.length === 0) {
                                return null;
                            }
                            return (
                                <div key={type} className="flex flex-col gap-2">
                                    <h4 className="text-xs font-semibold text-muted-foreground/85 uppercase tracking-wider px-2">
                                        {getGroupLabel(type)}
                                    </h4>
                                    <div className="flex flex-col gap-0.5">
                                        {items.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={show(item.name).url}
                                                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                                                    component.name === item.name
                                                        ? 'bg-primary/10 text-primary font-semibold'
                                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                }`}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Details Panel */}
                <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
                    {/* Header Details */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider">
                                {REGISTRY_TYPE_LABELS[component.type] ?? 'component'}
                            </Badge>
                            {component.categories.map((c) => (
                                <Badge key={c} variant="outline" className="text-[10px] uppercase tracking-wider capitalize">
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
                            description={component.description || 'No description provided.'}
                        />
                    </div>

                    {/* Inertia/React Tabs */}
                    <Tabs defaultValue="preview" className="w-full">
                        <TabsList className={`grid w-full max-w-sm mb-6 ${propsInterfaces.length > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="installation">Installation</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                            {propsInterfaces.length > 0 && (
                                <TabsTrigger value="api">Props</TabsTrigger>
                            )}
                        </TabsList>

                        {/* Preview Tab Panel */}
                        <TabsContent value="preview" className="focus-visible:outline-none">
                            <Card className="border border-border/50 overflow-hidden bg-card/20 min-h-[350px] flex items-center justify-center p-6 md:p-12 relative">
                                <RegistryPreview name={component.name} />
                            </Card>
                        </TabsContent>

                        {/* Installation Tab Panel */}
                        <TabsContent value="installation" className="focus-visible:outline-none flex flex-col gap-6">
                            <Card className="border border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-base font-semibold">Install via shadcn CLI</CardTitle>
                                    <CardDescription>
                                        Run the appropriate command below in your terminal to automatically pull and resolve this component into your codebase.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <MainRegistryInstaller code={component.name} />
                                </CardContent>
                            </Card>

                            {/* Dependencies Lists */}
                            {(component.dependencies.length > 0 || component.registryDependencies.length > 0) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* NPM dependencies */}
                                    {component.dependencies.length > 0 && (
                                        <Card className="border border-border/50">
                                            <CardHeader className="py-4">
                                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                                    <Package className="size-4 text-muted-foreground" />
                                                    NPM Dependencies
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-4 flex flex-wrap gap-1.5">
                                                {component.dependencies.map((dep) => (
                                                    <Badge key={dep} variant="outline" className="font-mono text-xs py-0.5 px-2">
                                                        {dep}
                                                    </Badge>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Registry dependencies */}
                                    {component.registryDependencies.length > 0 && (
                                        <Card className="border border-border/50">
                                            <CardHeader className="py-4">
                                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                                    <Settings className="size-4 text-muted-foreground" />
                                                    Registry Dependencies
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-4 flex flex-wrap gap-1.5">
                                                {component.registryDependencies.map((dep) => {
                                                    // Get the filename / name from registry url
                                                    const depName = dep.substring(dep.lastIndexOf('/') + 1).replace('.json', '');
                                                    return (
                                                        <Badge key={dep} variant="outline" className="font-mono text-xs py-0.5 px-2 bg-primary/5 border-primary/20 text-primary-foreground">
                                                            {depName}
                                                        </Badge>
                                                    );
                                                })}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {/* Files to be added */}
                            <Card className="border border-border/50">
                                <CardHeader className="py-4">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <FileCode className="size-4 text-muted-foreground" />
                                        Files Added ({component.files.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4 flex flex-col gap-2">
                                    {component.files.map((file) => (
                                        <div key={file.path} className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0">
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="text-xs font-mono truncate font-semibold">{file.path.split('/').pop()}</span>
                                                <span className="text-[10px] text-muted-foreground truncate font-mono">{file.path}</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] uppercase font-mono shrink-0">
                                                {file.type.split(':').pop()}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Code Tab Panel */}
                        <TabsContent value="code" className="focus-visible:outline-none flex flex-col gap-4">
                            {/* File Selection bar (if multiple files) */}
                            {component.files.length > 1 && (
                                <div className="flex flex-wrap gap-1 border border-border/40 p-1 bg-muted/20 rounded-lg">
                                    {component.files.map((file, idx) => (
                                        <Button
                                            key={file.path}
                                            variant={selectedFileIndex === idx ? 'secondary' : 'ghost'}
                                            size="sm"
                                            onClick={() => setSelectedFileIndex(idx)}
                                            className="h-8 text-xs font-mono"
                                        >
                                            {file.path.split('/').pop()}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* Active Codeblock */}
                            {activeFile ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                                        <span className="font-mono">{activeFile.path}</span>
                                        <span className="capitalize">{getLanguage(activeFile.path)} format</span>
                                    </div>
                                    <MainCodeBlock
                                        code={activeFile.content}
                                        language={getLanguage(activeFile.path)}
                                        variant="default"
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground text-sm">
                                    No source files found for this component.
                                </div>
                            )}
                        </TabsContent>

                        {/* API Reference Tab Panel */}
                        {propsInterfaces.length > 0 && (
                            <TabsContent value="api" className="focus-visible:outline-none flex flex-col gap-6">
                                <Card className="border border-border/50 bg-card/10">
                                    <CardHeader>
                                        <CardTitle className="text-base font-semibold">Component API Reference</CardTitle>
                                        <CardDescription>
                                            Autogenerated properties and options available for configuring this component.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Selector if multiple interfaces */}
                                        {propsInterfaces.length > 1 && (
                                            <div className="flex flex-wrap gap-1 border border-border/40 p-1 bg-muted/20 rounded-lg max-w-fit">
                                                {propsInterfaces.map((item, idx) => (
                                                    <Button
                                                        key={item.name}
                                                        variant={activeInterfaceIdx === idx ? 'secondary' : 'ghost'}
                                                        size="sm"
                                                        onClick={() => setSelectedInterfaceIndex(idx)}
                                                        className="h-8 text-xs font-mono"
                                                    >
                                                        {item.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {/* Table of properties */}
                                        {propsInterfaces[activeInterfaceIdx] && (
                                            <div className="overflow-x-auto rounded-lg border border-border/40">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
                                                            <th className="p-3">Property</th>
                                                            <th className="p-3">Type</th>
                                                            <th className="p-3">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-xs divide-y divide-border/30">
                                                        {propsInterfaces[activeInterfaceIdx].properties.map((prop) => (
                                                            <tr key={prop.name} className="hover:bg-muted/15 transition-colors">
                                                                <td className="p-3 font-mono font-semibold">
                                                                    {prop.name}
                                                                    {prop.isOptional ? (
                                                                        <span className="text-[10px] text-muted-foreground font-normal ml-1">(optional)</span>
                                                                    ) : (
                                                                        <span className="text-[10px] text-red-500 font-bold ml-1">*</span>
                                                                    )}
                                                                </td>
                                                                <td className="p-3 font-mono text-primary bg-primary/5 rounded px-2 max-w-[200px] truncate" title={prop.type}>
                                                                    {prop.type}
                                                                </td>
                                                                <td className="p-3 text-muted-foreground leading-relaxed">
                                                                    {prop.description}
                                                                </td>
                                                            </tr>
                                                        ))}
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
        </MainWrapper>
    );
}

ComponentShow.layout = MainLayout;
ComponentShow.displayName = 'ComponentShow';
