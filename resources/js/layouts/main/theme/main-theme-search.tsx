import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';

const ALL_CATEGORIES = '__all__';

function MainThemeSearch({
    filters,
    availableCategories,
}: {
    filters?: { search?: string; category?: string };
    availableCategories: string[];
}) {
    const [searchInput, setSearchInput] = useState(filters?.search ?? '');
    const [selectedCategory, setSelectedCategory] = useState(
        filters?.category ?? '',
    );
    const debouncedSearch = useDebounce(searchInput, 300);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            return;
        }

        const params: Record<string, string> = {};

        if (debouncedSearch) {
            params.search = debouncedSearch;
        }

        if (selectedCategory) {
            params.category = selectedCategory;
        }

        router.get('/themes', params, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [debouncedSearch, selectedCategory]);

    return (
        <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search themes..."
                    className="pr-8 pl-9"
                />
                {searchInput && (
                    <button
                        onClick={() => setSearchInput('')}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </div>

            <Select
                value={selectedCategory || ALL_CATEGORIES}
                onValueChange={(val) =>
                    setSelectedCategory(val === ALL_CATEGORIES ? '' : val)
                }
            >
                <SelectTrigger className="w-45">
                    <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_CATEGORIES}>
                        All categories
                    </SelectItem>
                    {availableCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export { MainThemeSearch };
