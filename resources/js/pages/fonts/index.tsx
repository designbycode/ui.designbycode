import { useEffect, useMemo, useState } from 'react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useInView } from '@/hooks/use-in-view';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainRegistryInstaller from '@/layouts/main/theme/main-registry-installer';
import MainLayout from '@/layouts/main-layout';

type FontItem = {
    id: string;
    name: string;
    title: string;
    fontFamily: string | null;
    fontProvider: string | null;
    fontImport: string | null;
    fontVariable: string | null;
    fontWeight: string[] | null;
    fontSubsets: string[] | null;
    fontDependency: string | null;
    category: string;
};

const ITEMS_PER_PAGE = 20;

export default function FontsIndex({ fonts }: { fonts: FontItem[] }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filteredFonts = useMemo(() => {
        return fonts.filter((font) => {
            const matchesSearch =
                font.title.toLowerCase().includes(search.toLowerCase()) ||
                font.id.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                category === 'all' || font.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [fonts, search, category]);

    const categories = useMemo(() => {
        const cats = new Set(fonts.map((f) => f.category));

        return Array.from(cats).sort();
    }, [fonts]);

    const visibleFonts = useMemo(() => {
        return filteredFonts.slice(0, visibleCount);
    }, [filteredFonts, visibleCount]);

    const [lastQuery, setLastQuery] = useState({ search: '', category: 'all' });

    if (search !== lastQuery.search || category !== lastQuery.category) {
        setLastQuery({ search, category });
        setVisibleCount(ITEMS_PER_PAGE);
    }

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <MainWrapper className="pt-4">
            <Heading
                title="Fonts"
                description="Browse and install Google Fonts for your project. Each font includes the CSS variable and import snippet."
            />

            <div className="mb-8 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <Input
                            placeholder="Search fonts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-48">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {visibleFonts.map((font) => (
                    <FontCard key={font.name} font={font} />
                ))}
            </div>

            {visibleCount < filteredFonts.length && (
                <div className="mt-8 flex justify-center pb-12">
                    <LoadMoreTrigger onInView={handleLoadMore} />
                </div>
            )}

            {filteredFonts.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                    No fonts found matching your criteria.
                </div>
            )}
        </MainWrapper>
    );
}

FontsIndex.layout = MainLayout;

function LoadMoreTrigger({ onInView }: { onInView: () => void }) {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            onInView();
        }
    }, [inView, onInView]);

    return <div ref={ref} className="h-10" />;
}

function FontCard({ font }: { font: FontItem }) {
    const sampleText = font.title;
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    return (
        <Card
            ref={ref}
            className="group overflow-hidden transition-colors hover:bg-muted/50"
        >
            {inView && (
                <link
                    rel="stylesheet"
                    href={`https://fonts.googleapis.com/css2?family=${font.title.replace(/ /g, '+')}&display=swap`}
                />
            )}
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{font.title}</span>
                    <div className="flex gap-2">
                        {font.category && (
                            <Badge variant="secondary" className="text-[10px]">
                                {font.category}
                            </Badge>
                        )}
                        {font.fontProvider && (
                            <Badge variant="outline" className="text-[10px]">
                                {font.fontProvider}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
                <div
                    className="grid aspect-video place-content-center items-center justify-center rounded-lg bg-card/50 px-4 text-[clamp(0.75rem,9vw+2rem,5rem)] tracking-wider"
                    style={{
                        fontFamily: inView
                            ? `"${font.title}", ${font.fontFamily?.split(',').pop()?.trim() ?? 'sans-serif'}`
                            : 'inherit',
                    }}
                >
                    <span className="line-clamp-1 whitespace-nowrap text-muted-foreground/60">
                        {sampleText}
                    </span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                    {font.fontFamily && (
                        <div className="flex justify-between gap-2">
                            <span className="shrink-0">Family:</span>
                            <span className="truncate text-right font-medium text-foreground">
                                {font.fontFamily}
                            </span>
                        </div>
                    )}
                    {font.fontVariable && (
                        <div className="flex justify-between gap-2">
                            <span className="shrink-0">Variable:</span>
                            <code className="truncate text-right text-xs text-foreground">
                                {font.fontVariable}
                            </code>
                        </div>
                    )}
                </div>

                <MainRegistryInstaller code={`fonts/${font.name}`} />
            </CardContent>
        </Card>
    );
}
