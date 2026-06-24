import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, Save, FileCode } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useFileHandling } from '@/hooks/use-file-handling';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { index, update } from '@/routes/dashboard/components';
import { dashboard } from '@/routes';
import MainEditorBlock from '@/layouts/main/theme/main-editor-block';

const getLanguageFromPath = (path: string) => {
    if (!path) {
        return 'typescript';
    }
    const ext = path.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'css':
            return 'css';
        case 'json':
            return 'json';
        case 'html':
            return 'html';
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'ts':
        case 'tsx':
        default:
            return 'typescript';
    }
};

interface ComponentItem {
    id: number;
    name: string;
    title: string;
    type: string;
    description: string | null;
    author: string | null;
    categories: string[];
    dependencies: string[];
    registryDependencies: string[];
    files: Array<{ path: string; type: string; content: string }>;
}

interface EditProps {
    component: ComponentItem;
    categories: string[];
}

export default function EditComponent({
    component,
    categories: existingCategories,
}: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: component.name,
        title: component.title,
        type: component.type,
        description: component.description || '',
        author: component.author || 'designbycode',
        categoriesInput: component.categories
            ? component.categories.join(', ')
            : '',
        dependenciesInput: component.dependencies
            ? component.dependencies.join(', ')
            : '',
        registryDependenciesInput: component.registryDependencies
            ? component.registryDependencies.join(', ')
            : '',
        files:
            component.files && component.files.length > 0
                ? component.files
                : [{ path: '', type: component.type, content: '' }],
    });

    const { addFile, removeFile, handleFileChange } = useFileHandling(
        data,
        setData,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert comma-separated string inputs to arrays
        const categories = data.categoriesInput
            .split(',')
            .map((c) => c.trim())
            .filter((c) => c !== '');

        const dependencies = data.dependenciesInput
            .split(',')
            .map((d) => d.trim())
            .filter((d) => d !== '');

        const registryDependencies = data.registryDependenciesInput
            .split(',')
            .map((r) => r.trim())
            .filter((r) => r !== '');

        // Put request to update the component
        put(update(component.name).url, {
            ...data,
            categories,
            dependencies,
            registryDependencies,
            onSuccess: () => {
                toast.success('Component updated successfully!');
            },
            onError: (errs) => {
                const message = Object.values(errs).flat().join(' ');
                toast.error(message || 'Failed to update component.');
            },
        } as any);
    };

    return (
        <>
            <Head title={`Edit Component - ${component.title}`} />
            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex items-center gap-3">
                    <Link
                        href={index().url}
                        className="flex size-8 items-center justify-center rounded-md border border-border/80 bg-background text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Edit Component
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Update component details for{' '}
                            <strong>{component.name}</strong>.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card className="border border-border/50 bg-card/40">
                        <CardHeader>
                            <CardTitle className="text-md">
                                Basic Information
                            </CardTitle>
                            <CardDescription>
                                Enter the name, type, and author details of the
                                component.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. Button Particles"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name">
                                        Slug (Name) - Immutable
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        disabled
                                        className="bg-muted opacity-80"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="type">Component Type</Label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            setData((prev) => ({
                                                ...prev,
                                                type: newType,
                                                files: prev.files.map(
                                                    (file) => ({
                                                        ...file,
                                                        type: newType,
                                                    }),
                                                ),
                                            }));
                                        }}
                                        className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        <option value="registry:ui">
                                            UI Component
                                        </option>
                                        <option value="registry:block">
                                            Block
                                        </option>
                                        <option value="registry:hook">
                                            Hook
                                        </option>
                                        <option value="registry:lib">
                                            Utility (Lib)
                                        </option>
                                    </select>
                                    <InputError message={errors.type} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        value={data.author}
                                        onChange={(e) =>
                                            setData('author', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.author} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Briefly describe what this component does..."
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/50 bg-card/40">
                        <CardHeader>
                            <CardTitle className="text-md">
                                Metadata & Dependencies
                            </CardTitle>
                            <CardDescription>
                                Specify categories, package requirements, and
                                other registry dependencies (comma-separated).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="categories">Categories</Label>
                                <Input
                                    id="categories"
                                    placeholder="e.g. buttons, animations, sliders"
                                    value={data.categoriesInput}
                                    onChange={(e) =>
                                        setData(
                                            'categoriesInput',
                                            e.target.value,
                                        )
                                    }
                                />
                                {existingCategories.length > 0 && (
                                    <p className="mt-1 text-[10px] text-muted-foreground">
                                        Existing categories:{' '}
                                        {existingCategories.join(', ')}
                                    </p>
                                )}
                                <InputError message={errors.categories} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="dependencies">
                                        NPM Dependencies
                                    </Label>
                                    <Input
                                        id="dependencies"
                                        placeholder="e.g. lucide-react, framer-motion"
                                        value={data.dependenciesInput}
                                        onChange={(e) =>
                                            setData(
                                                'dependenciesInput',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={errors.dependencies} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="registryDependencies">
                                        Registry Dependencies
                                    </Label>
                                    <Input
                                        id="registryDependencies"
                                        placeholder="e.g. button, label"
                                        value={data.registryDependenciesInput}
                                        onChange={(e) =>
                                            setData(
                                                'registryDependenciesInput',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.registryDependencies}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold tracking-tight">
                                Component Files
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFile}
                                className="h-8"
                            >
                                <Plus className="mr-1 size-3.5" /> Add File
                            </Button>
                        </div>

                        {data.files.map((file, idx) => (
                            <Card
                                key={idx}
                                className="border border-border/50 bg-card/40"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                                    <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                                        <FileCode className="size-4 text-primary" />
                                        File #{idx + 1}
                                    </CardTitle>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="size-7 hover:bg-destructive/10"
                                        onClick={() => removeFile(idx)}
                                    >
                                        <Trash2 className="size-3.5 text-destructive" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-3 p-4 pt-0">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">
                                                File Path
                                            </Label>
                                            <Input
                                                placeholder="e.g. components/marquee.tsx"
                                                value={file.path}
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        idx,
                                                        'path',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">
                                                Type
                                            </Label>
                                            <select
                                                value={file.type}
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        idx,
                                                        'type',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                            >
                                                <option value="registry:ui">
                                                    registry:ui
                                                </option>
                                                <option value="registry:block">
                                                    registry:block
                                                </option>
                                                <option value="registry:hook">
                                                    registry:hook
                                                </option>
                                                <option value="registry:lib">
                                                    registry:lib
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="mb-1.5 block text-xs font-medium">
                                            Code Content
                                        </Label>
                                        <div className="overflow-hidden rounded-md border border-border/80 bg-background">
                                            <MainEditorBlock
                                                value={file.content}
                                                onChange={(val) =>
                                                    handleFileChange(
                                                        idx,
                                                        'content',
                                                        val,
                                                    )
                                                }
                                                language={getLanguageFromPath(
                                                    file.path,
                                                )}
                                                readOnly={false}
                                                height="300px"
                                                variant="minimal"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={index().url}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-1.5 size-4" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditComponent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Components',
            href: index().url,
        },
        {
            title: 'Edit',
            href: '#',
        },
    ],
};
