import React, { useState } from 'react';
import { Tag, Search, Hash, Lock, Check } from 'lucide-react';
import { InputSlug } from '@/registry/new-york/components/ui/inputs/input-slug';
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
} from '@/registry/new-york/components/ui/inputs/multi-select';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function InputsGallery() {
    const [slugValue, setSlugValue] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const options = [
        { label: 'Next.js', value: 'next' },
        { label: 'Laravel', value: 'laravel' },
        { label: 'React', value: 'react' },
        { label: 'Vite', value: 'vite' },
        { label: 'Tailwind CSS', value: 'tailwind' },
    ];

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6">
            <div className="space-y-2">
                <Badge
                    variant="outline"
                    className="bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Component Showcase
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight">
                    Interactive Inputs Gallery
                </h2>
                <p className="text-xs text-muted-foreground">
                    Explore and compare different interactive input fields, tag
                    drop-downs, and auto-formatters.
                </p>
            </div>

            <div className="grid w-full items-stretch gap-6 sm:grid-cols-2">
                {/* 1. Slug Formatter Input */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Hash className="size-4 text-purple-500" />
                            Auto-Slug Input
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Format text dynamically into clean, URL-safe slug
                            strings as you type.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputSlug
                            value={slugValue}
                            onValueChange={setSlugValue}
                            placeholder="Type a title e.g. New Product Launch..."
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            slug:{' '}
                            <span className="font-bold text-primary">
                                {slugValue || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Multi-Select Dropdown */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Tag className="size-4 text-sky-500" />
                            Multi-Select Dropdown
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Dropdown component for selecting and compiling
                            multiple tags.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex min-h-[120px] flex-1 flex-col justify-center space-y-3 pb-6">
                        <MultiSelect
                            value={selectedTags}
                            onValueChange={setSelectedTags}
                        >
                            <MultiSelectTrigger className="h-9 w-full text-xs">
                                <MultiSelectValue placeholder="Select technologies..." />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {options.map((opt) => (
                                    <MultiSelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </MultiSelectItem>
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            Selected:{' '}
                            <span className="font-bold text-primary">
                                {selectedTags.join(', ') || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Focus-Glow Search Input */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Search className="size-4 text-emerald-500" />
                            Focus-Glow Search
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Expands and updates border glow states upon search
                            selection.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center pb-6">
                        <div className="relative">
                            <Search
                                className={`absolute top-1/2 left-3 size-3.5 -translate-y-1/2 transition-colors duration-300 ${
                                    searchFocused
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            />
                            <Input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                placeholder="Search queries..."
                                className={`h-9 pl-9 text-xs transition-all duration-300 ${
                                    searchFocused
                                        ? 'border-primary bg-card/50 ring-1 ring-primary/20'
                                        : 'border-border/50 bg-card/15'
                                }`}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Secure Password Field */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Lock className="size-4 text-pink-500" />
                            Glow-Border Passcode Field
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Simple passcode field illustrating focused states.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center pb-6">
                        <div className="relative">
                            <Lock className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-9 border-border/50 bg-card/15 pl-9 text-xs focus-visible:border-pink-500/50 focus-visible:ring-[3px] focus-visible:ring-pink-500/10"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default InputsGallery;
