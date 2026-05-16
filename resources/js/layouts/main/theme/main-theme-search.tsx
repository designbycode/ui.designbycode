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

const ALL_TAGS = '__all__';

function MainThemeSearch({
    filters,
    availableTags,
}: {
    filters?: { search?: string; tag?: string };
    availableTags: string[];
}) {
    const [searchInput, setSearchInput] = useState(filters?.search ?? '');
    const [selectedTag, setSelectedTag] = useState(
        filters?.tag ?? '',
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

        if (selectedTag) {
            params.tag = selectedTag;
        }

        router.get('/themes', params, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [debouncedSearch, selectedTag]);

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
                value={selectedTag || ALL_TAGS}
                onValueChange={(val) =>
                    setSelectedTag(val === ALL_TAGS ? '' : val)
                }
            >
                <SelectTrigger className="w-45">
                    <SelectValue placeholder="All tags" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_TAGS}>
                        All tags
                    </SelectItem>
                    {availableTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                            {tag}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export { MainThemeSearch };
