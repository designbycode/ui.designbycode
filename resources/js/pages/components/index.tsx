import { Link } from '@inertiajs/react';
import { Search, Grid, Package, Sliders, Settings, HelpCircle } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import { show } from '@/routes/components';
import { REGISTRY_TYPE_LABELS } from '@/types/registry';

interface ComponentListItem {
    name: string;
    title: string;
    type: string;
    description: string | null;
    categories: string[];
    author: string | null;
    dependencies: string[];
    registryDependencies: string[];
}

export default function ComponentsIndex({
    components,
    categories,
}: {
    components: ComponentListItem[];
    categories: string[];
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter components based on search query, type, and category
    const filteredComponents = useMemo(() => {
        return components.filter((item) => {
            const matchesSearch = 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesType = 
                selectedType === 'all' || 
                (selectedType === 'ui' && item.type === 'registry:ui') ||
                (selectedType === 'block' && item.type === 'registry:block') ||
                (selectedType === 'hook' && item.type === 'registry:hook') ||
                (selectedType === 'lib' && item.type === 'registry:lib');

            const matchesCategory = 
                selectedCategory === 'all' || 
                item.categories.includes(selectedCategory);

            return matchesSearch && matchesType && matchesCategory;
        });
    }, [components, searchQuery, selectedType, selectedCategory]);

    const typeCounts = useMemo(() => {
        return {
            all: components.length,
            ui: components.filter((c) => c.type === 'registry:ui').length,
            block: components.filter((c) => c.type === 'registry:block').length,
            hook: components.filter((c) => c.type === 'registry:hook').length,
            lib: components.filter((c) => c.type === 'registry:lib').length,
        };
    }, [components]);

    // Icon mapping based on component type
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'registry:block':
                return <Grid className="size-4" />;
            case 'registry:ui':
                return <Package className="size-4" />;
            case 'registry:hook':
                return <Sliders className="size-4" />;
            default:
                return <Settings className="size-4" />;
        }
    };

    // Style helper for type pills
    const getTypeBadgeClass = (type: string) => {
        switch (type) {
            case 'registry:block':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'registry:ui':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'registry:hook':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default:
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
        }
    };

    return (
        <MainWrapper className="pt-4 pb-12">
            <Heading
                title="Components"
                description="Explore our interactive shadcn registry components. Copy-paste high-quality React components, hooks, blocks, and libraries directly into your design system."
            />

            {/* Filter Tabs */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-6 mb-8">
                <div className="flex flex-wrap gap-2">
                    <Button 
                        variant={selectedType === 'all' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setSelectedType('all')}
                        className="rounded-full"
                    >
                        All ({typeCounts.all})
                    </Button>
                    <Button 
                        variant={selectedType === 'ui' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setSelectedType('ui')}
                        className="rounded-full"
                    >
                        UI Components ({typeCounts.ui})
                    </Button>
                    <Button 
                        variant={selectedType === 'block' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setSelectedType('block')}
                        className="rounded-full"
                    >
                        Blocks ({typeCounts.block})
                    </Button>
                    <Button 
                        variant={selectedType === 'hook' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setSelectedType('hook')}
                        className="rounded-full"
                    >
                        Hooks ({typeCounts.hook})
                    </Button>
                    <Button 
                        variant={selectedType === 'lib' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setSelectedType('lib')}
                        className="rounded-full"
                    >
                        Utilities ({typeCounts.lib})
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search registry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4"
                    />
                </div>
            </div>

            {/* Category Pill Filters */}
            <div className="mb-8">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Categories</span>
                <div className="flex flex-wrap gap-1.5">
                    <Button
                        variant={selectedCategory === 'all' ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory('all')}
                        className="h-7 px-3 text-xs rounded-full"
                    >
                        All Categories
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="h-7 px-3 text-xs rounded-full capitalize"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Component Cards Grid */}
            {filteredComponents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComponents.map((item) => (
                        <Link 
                            key={item.name} 
                            href={show(item.name).url} 
                            prefetch="hover"
                            className="block group"
                        >
                            <Card className="h-full border border-border/50 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-border-foreground/20 hover:bg-card/75 hover:shadow-md">
                                <CardHeader className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge 
                                            variant="outline" 
                                            className={`flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 ${getTypeBadgeClass(item.type)}`}
                                        >
                                            {getTypeIcon(item.type)}
                                            {REGISTRY_TYPE_LABELS[item.type] ?? 'component'}
                                        </Badge>
                                        
                                        <div className="flex gap-1.5">
                                            {item.categories.map((c) => (
                                                <span 
                                                    key={c} 
                                                    className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded capitalize"
                                                >
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm line-clamp-2 min-h-[40px]">
                                        {item.description || 'No description provided.'}
                                    </CardDescription>
                                    
                                    <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>By {item.author || 'designbycode'}</span>
                                        {item.dependencies.length > 0 && (
                                            <span>{item.dependencies.length} dependencies</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/60 rounded-xl bg-card/10">
                    <HelpCircle className="size-12 text-muted-foreground/60 mb-4 animate-pulse" />
                    <h3 className="text-lg font-semibold">No components found</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                        No registry components match your search query or active filter tags.
                    </p>
                    <Button 
                        variant="link" 
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedType('all');
                            setSelectedCategory('all');
                        }}
                        className="mt-4"
                    >
                        Reset all filters
                    </Button>
                </div>
            )}
        </MainWrapper>
    );
}

ComponentsIndex.layout = MainLayout;
ComponentsIndex.displayName = 'ComponentsIndex';
