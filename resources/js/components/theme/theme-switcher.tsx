import { Check, Palette, RotateCcw, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiIndex } from '@/actions/App/Http/Controllers/ThemesController';
import ThemeList from '@/components/theme/theme-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    clearColorTheme,
    setColorTheme,
    useColorTheme,
} from '@/hooks/use-color-theme';
import { useDebounce } from '@/hooks/use-debounce';
import type { Registry } from '@/types';

function ThemeSwitcher() {
    const { themeName } = useColorTheme();
    const [themes, setThemes] = useState<Registry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 300);

    useEffect(() => {
        fetch(apiIndex().url)
            .then((res) => res.json())
            .then((data: Registry[]) => {
                setThemes(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = useMemo(
        () =>
            themes.filter((t) => {
                if (!debouncedSearch) {
                    return true;
                }

                const q = debouncedSearch.toLowerCase();

                return (
                    t.name.toLowerCase().includes(q) ||
                    t.title.toLowerCase().includes(q) ||
                    (t.description ?? '').toLowerCase().includes(q)
                );
            }),
        [themes, debouncedSearch],
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Palette className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-0 p-0">
                <SheetHeader className="px-4 pt-4 pb-2">
                    <SheetTitle>Theme Color</SheetTitle>
                    <SheetDescription>
                        Choose a color theme for the interface
                    </SheetDescription>
                </SheetHeader>

                <div className="relative border-b border-border px-4 pb-3">
                    <Search className="absolute top-0 left-7 size-4 translate-y-2.5 text-muted-foreground" />
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search themes..."
                        className="pr-8 pl-9"
                    />
                    {searchInput && (
                        <button
                            onClick={() => setSearchInput('')}
                            className="absolute top-0 right-7 translate-y-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3">
                    {loading ? (
                        <div className="space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 animate-pulse rounded-md bg-muted"
                                />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            No themes found
                        </p>
                    ) : (
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={clearColorTheme}
                                className={`flex w-full items-center justify-between gap-2 rounded-md border p-2 text-left transition-colors hover:bg-accent ${!themeName ? 'border-primary ring-1 ring-primary' : 'border-border bg-background'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-md border border-border bg-background">
                                        <RotateCcw className="size-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Default theme
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Reset to default colors
                                        </p>
                                    </div>
                                </div>
                                {!themeName && (
                                    <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Check className="size-3" />
                                    </div>
                                )}
                            </button>
                            {filtered.map((theme) => (
                                <ThemeList
                                    key={theme.name}
                                    theme={theme}
                                    compact
                                    selected={theme.name === themeName}
                                    onSelect={setColorTheme}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;
