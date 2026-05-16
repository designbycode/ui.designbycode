import { InfiniteScroll, Link, router } from '@inertiajs/react';
import { Plus, SearchX } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainThemeCard from '@/layouts/main/theme/main-theme-card';
import { MainThemeSearch } from '@/layouts/main/theme/main-theme-search';
import MainLayout from '@/layouts/main-layout';
import { create, show } from '@/routes/themes';
import type { PaginatedData, Registry } from '@/types';

function ThemesIndex({
    themes,
    filters,
    availableTags,
    totalThemesCount,
}: {
    themes: PaginatedData<Registry>;
    filters?: { search?: string; tags?: string[] };
    availableTags: string[];
    totalThemesCount: number;
}) {
    return (
        <MainWrapper className={`pt-4 pb-12`}>
            <div className="mb-6 flex items-start justify-between md:items-center">
                <Heading
                    title={`Themes`}
                    description={`Choose from ${totalThemesCount} themes to customize your site's look and feel. Preview, install, and manage them all in one place.`}
                />
                <div className={`shrink-0`}>
                    <Link href={create().url}>
                        <Button
                            variant="outline"
                            className={`transition-colors duration-300`}
                        >
                            <Plus className={`h-4`} />
                            <span className={`sr-only md:not-sr-only`}>
                                Create new theme
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="sticky top-0 z-40 -mx-10 bg-background/75 px-10 pt-18 pb-6 backdrop-blur-sm transition-all duration-200">
                <MainThemeSearch
                    filters={filters}
                    availableTags={availableTags}
                />
            </div>

            <InfiniteScroll
                data="themes"
                loading={() => (
                    <div className="flex justify-center py-12">
                        <Spinner className="size-8 text-primary" />
                    </div>
                )}
            >
                <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {themes.data.map((theme: Registry, index) => (
                        <Link key={theme.name} href={show(theme.name)}>
                            <MainThemeCard theme={theme} index={index} />
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>

            {themes.data.length === 0 &&
                (filters?.search ||
                    (filters?.tags && filters.tags.length > 0)) && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-4 rounded-full bg-muted p-6">
                            <SearchX className="size-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">Theme not found</h3>
                        <p className="mt-2 max-w-xs text-muted-foreground">
                            No themes match your current search and filters. Try
                            adjusting your search or clearing your tags.
                        </p>
                        <Button
                            variant="link"
                            onClick={() => router.get('/themes')}
                            className="mt-4"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}

            {/*<CardsPreview app={themes.data[themeNumber]} />*/}
        </MainWrapper>
    );
}

ThemesIndex.layout = MainLayout;

ThemesIndex.displayName = 'ThemesIndex';

export default ThemesIndex;
