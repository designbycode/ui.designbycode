import { router } from '@inertiajs/react';
import { Search, X, Check, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

function MainThemeSearch({
    filters,
    availableTags,
}: {
    filters?: { search?: string; tags?: string[] };
    availableTags: string[];
}) {
    const [searchInput, setSearchInput] = useState(filters?.search ?? '');
    const [selectedTags, setSelectedTags] = useState<string[]>(
        filters?.tags ?? [],
    );
    const [showFilters, setShowFilters] = useState(false);
    const debouncedSearch = useDebounce(searchInput, 300);
    const hasMounted = useRef(false);
    const filtersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            return;
        }

        const params: Record<string, any> = {};

        if (debouncedSearch) {
            params.search = debouncedSearch;
        }

        if (selectedTags.length > 0) {
            params.tags = selectedTags;
        }

        router.get('/themes', params, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [debouncedSearch, selectedTags]);

    useEffect(() => {
        if (!showFilters) return;

        const handler = (e: MouseEvent) => {
            if (
                filtersRef.current &&
                !filtersRef.current.contains(e.target as Node)
            ) {
                setShowFilters(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => document.removeEventListener('mousedown', handler);
    }, [showFilters]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    return (
        <div ref={filtersRef} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="group relative flex-1">
                    <Search className="absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search themes by name, title, or description..."
                        className="h-12 rounded-xl border-muted-foreground/20 bg-background/50 pr-10 pl-10.5 text-base backdrop-blur-sm transition-all hover:border-muted-foreground/40 focus-visible:ring-primary/20"
                    />
                    {searchInput && (
                        <button
                            onClick={() => setSearchInput('')}
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    aria-expanded={showFilters}
                    className={cn(
                        'h-12 rounded-xl border-muted-foreground/20 bg-background/50 px-4 backdrop-blur-sm transition-all hover:bg-muted md:px-5',
                        showFilters && 'bg-muted ring-1 ring-primary/20',
                    )}
                >
                    <SlidersHorizontal className="size-4 md:mr-2" />
                    <span className="hidden md:inline">Filters</span>
                    {selectedTags.length > 0 && (
                        <Badge
                            variant="secondary"
                            className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] font-bold text-primary-foreground"
                        >
                            {selectedTags.length}
                        </Badge>
                    )}
                </Button>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex scrollbar-none flex-wrap items-center gap-2 overflow-x-auto pb-2">
                            {availableTags.map((tag) => {
                                const isSelected = selectedTags.includes(tag);

                                return (
                                    <Badge
                                        key={tag}
                                        variant={
                                            isSelected ? 'default' : 'outline'
                                        }
                                        className={cn(
                                            'cursor-pointer rounded-full border-muted-foreground/20 px-3.5 py-1.5 text-xs font-medium transition-all select-none',
                                            isSelected
                                                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                                                : 'bg-background/50 text-muted-foreground hover:border-muted-foreground/40 hover:bg-muted hover:text-foreground',
                                        )}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {isSelected && (
                                            <Check className="mr-1.5 size-3 stroke-3" />
                                        )}
                                        {tag}
                                    </Badge>
                                );
                            })}

                            {selectedTags.length > 0 && (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className="ml-2 flex items-center gap-1 text-xs font-medium text-destructive transition-colors hover:text-destructive/75"
                                >
                                    <X className="size-3" />
                                    Clear all
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export { MainThemeSearch };
