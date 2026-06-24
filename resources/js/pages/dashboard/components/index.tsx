import { Head, Link, router } from '@inertiajs/react';
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Grid,
    Package,
    Sliders,
    Settings,
    Layers,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { index, create, edit, destroy } from '@/routes/dashboard/components';
import { dashboard } from '@/routes';

interface ComponentItem {
    id: number;
    name: string;
    title: string;
    type: string;
    description: string | null;
    categories: string[];
    author: string | null;
    dependencies: string[];
    registryDependencies: string[];
}

export default function DashboardComponentsIndex({
    components,
}: {
    components: ComponentItem[];
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    // Filter components based on search and type
    const filteredComponents = useMemo(() => {
        return components.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description &&
                    item.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType =
                selectedType === 'all' || item.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [components, searchQuery, selectedType]);

    // Handle delete action
    const handleDelete = (name: string) => {
        if (confirm(`Are you sure you want to delete component [${name}]?`)) {
            router.delete(destroy(name).url, {
                onSuccess: () => {
                    toast.success('Component deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete component.');
                },
            });
        }
    };

    // Helper for icons based on component type
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

    const getTypeColorClass = (type: string) => {
        switch (type) {
            case 'registry:block':
                return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
            case 'registry:ui':
                return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
            case 'registry:hook':
                return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
            default:
                return 'bg-chart-5/10 text-chart-5 border-chart-5/20';
        }
    };

    return (
        <>
            <Head title="Manage Components" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Registry Components
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create, update, and manage your custom registry
                            components, hooks, blocks, and utilities.
                        </p>
                    </div>
                    <Button className="flex items-center gap-1.5" asChild>
                        <Link href={create().url}>
                            <Plus className="size-4" />
                            Create Component
                        </Link>
                    </Button>
                </div>

                <Card className="border border-border/50 bg-card/40 backdrop-blur-xs">
                    <CardHeader className="p-4 pb-0 md:p-6 md:pb-0">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                                {/* Search */}
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search components..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pr-4 pl-9"
                                    />
                                </div>

                                {/* Type filter dropdown */}
                                <select
                                    value={selectedType}
                                    onChange={(e) =>
                                        setSelectedType(e.target.value)
                                    }
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:w-[180px]"
                                >
                                    <option value="all">All Types</option>
                                    <option value="registry:ui">
                                        UI Components
                                    </option>
                                    <option value="registry:block">
                                        Blocks
                                    </option>
                                    <option value="registry:hook">Hooks</option>
                                    <option value="registry:lib">
                                        Utilities (Lib)
                                    </option>
                                </select>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Total: {filteredComponents.length} components
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 md:p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border/50 text-xs font-medium text-muted-foreground uppercase">
                                        <th className="px-4 py-3">
                                            Title / Name
                                        </th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">
                                            Categories
                                        </th>
                                        <th className="px-4 py-3">
                                            Dependencies
                                        </th>
                                        <th className="px-4 py-3 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {filteredComponents.length > 0 ? (
                                        filteredComponents.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="group transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-4 py-3.5">
                                                    <div className="font-semibold text-foreground transition-colors group-hover:text-primary">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-mono text-xs text-muted-foreground">
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <Badge
                                                        variant="outline"
                                                        className={`flex w-fit items-center gap-1 px-2 py-0.5 font-mono text-[10px] uppercase ${getTypeColorClass(item.type)}`}
                                                    >
                                                        {getTypeIcon(item.type)}
                                                        {item.type.replace(
                                                            'registry:',
                                                            '',
                                                        )}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.categories
                                                            .length > 0 ? (
                                                            item.categories.map(
                                                                (c) => (
                                                                    <Badge
                                                                        key={c}
                                                                        variant="secondary"
                                                                        className="px-1.5 py-0 text-[10px] font-medium capitalize"
                                                                    >
                                                                        {c}
                                                                    </Badge>
                                                                ),
                                                            )
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">
                                                                —
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <div className="flex max-w-[200px] flex-col gap-0.5 truncate text-xs text-muted-foreground">
                                                        {item.dependencies
                                                            .length > 0 && (
                                                            <span className="truncate">
                                                                npm:{' '}
                                                                {item.dependencies.join(
                                                                    ', ',
                                                                )}
                                                            </span>
                                                        )}
                                                        {item
                                                            .registryDependencies
                                                            .length > 0 && (
                                                            <span className="truncate">
                                                                registry:{' '}
                                                                {item.registryDependencies.join(
                                                                    ', ',
                                                                )}
                                                            </span>
                                                        )}
                                                        {item.dependencies
                                                            .length === 0 &&
                                                            item
                                                                .registryDependencies
                                                                .length ===
                                                                0 && (
                                                                <span>
                                                                    None
                                                                </span>
                                                            )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-8"
                                                            title="Edit Component"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={
                                                                    edit(
                                                                        item.name,
                                                                    ).url
                                                                }
                                                            >
                                                                <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-8 hover:bg-destructive/10"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.name,
                                                                )
                                                            }
                                                            title="Delete Component"
                                                        >
                                                            <Trash2 className="size-4 text-destructive/80 hover:text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-12 text-center text-muted-foreground"
                                            >
                                                No components found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

DashboardComponentsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Components',
            href: index().url,
        },
    ],
};
