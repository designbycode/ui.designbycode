import { Check, Palette, RotateCcw, Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
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
import MainThemeList from '@/layouts/main/theme/main-theme-list';
import type { Theme } from '@/types/theme';

interface Page {
    data: Theme[];
    current_page: number;
    last_page: number;
}

function MainThemeSwitcher() {
    const { themeName } = useColorTheme();
    const [open, setOpen] = useState(false);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 300);
    const [activeSearch, setActiveSearch] = useState('');
    const loaderRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchPage = useCallback(
        (pageNum: number, search: string, append: boolean) => {
            setLoading(true);

            const params = new URLSearchParams();
            params.set('page', String(pageNum));

            if (search) {
                params.set('search', search);
            }

            fetch(`/api/themes?${params}`)
                .then((res) => res.json())
                .then((json: Page) => {
                    setThemes((prev) =>
                        append ? [...prev, ...json.data] : json.data,
                    );
                    setHasMore(
                        search ? false : json.current_page < json.last_page,
                    );
                    setPage(pageNum);
                })
                .catch((error) => {
                    console.error('Failed to fetch themes:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [],
    );

    const [lastOpen, setLastOpen] = useState(false);
    if (open !== lastOpen) {
        setLastOpen(open);
        if (!open) {
            setSearchInput('');
            setActiveSearch('');
            setThemes([]);
            setPage(1);
            setHasMore(true);
        }
    }

    useEffect(() => {
        if (open) {
            fetchPage(1, '', false);
        }
    }, [open, fetchPage]);

    useEffect(() => {
        if (open && debouncedSearch !== activeSearch) {
            flushSync(() => {
                setActiveSearch(debouncedSearch);
                setThemes([]);
            });
            requestAnimationFrame(() => {
                fetchPage(1, debouncedSearch, false);
            });
        }
    }, [open, debouncedSearch, activeSearch, fetchPage]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const el = loaderRef.current;
        const root = scrollRef.current;

        if (!el || !root) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !loading &&
                    !activeSearch
                ) {
                    fetchPage(page + 1, activeSearch, true);
                }
            },
            {
                root,
                rootMargin: '400px',
            },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [open, hasMore, loading, page, activeSearch, fetchPage]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Palette className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-0 pl-5">
                <PlaceholderPattern className="absolute inset-y-0 left-0 h-full w-2 border-r border-border/75 stroke-border/75 md:w-5" />
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

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-4 py-3"
                >
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

                        {themes.map((theme) => (
                            <MainThemeList
                                key={theme.name}
                                theme={theme}
                                className="mb-2"
                                compact
                                selected={theme.name === themeName}
                                onSelect={setColorTheme}
                            />
                        ))}

                        {loading && (
                            <div className="space-y-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-14 animate-pulse rounded-md bg-muted"
                                    />
                                ))}
                            </div>
                        )}

                        {hasMore && !loading && (
                            <div ref={loaderRef} className="h-4" />
                        )}

                        {!hasMore && themes.length > 0 && (
                            <p className="py-4 text-center text-xs text-muted-foreground">
                                {activeSearch
                                    ? 'Search results'
                                    : 'All themes loaded'}
                            </p>
                        )}

                        {!loading && themes.length === 0 && (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No themes found
                            </p>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

MainThemeSwitcher.displayName = 'ThemeSwitcher';

export default MainThemeSwitcher;
