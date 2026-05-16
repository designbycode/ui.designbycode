import { InfiniteScroll, Link } from '@inertiajs/react';
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
    filters?: { search?: string; tag?: string };
    availableTags: string[];
    totalThemesCount: number;
}) {
    return (
        <MainWrapper className={`pt-4`}>
            <div className="flex items-start justify-between md:items-center">
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

            <MainThemeSearch filters={filters} availableTags={availableTags} />

            <InfiniteScroll
                data="themes"
                loading={() => (
                    <div className="flex justify-center py-8">
                        <Spinner className="size-6 text-muted-foreground" />
                    </div>
                )}
            >
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {themes.data.map((theme: Registry, index) => (
                        <Link key={theme.name} href={show(theme.name)}>
                            <MainThemeCard theme={theme} index={index} />
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>

            {themes.data.length === 0 && (filters?.search || filters?.tag) && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <SearchX className="mb-4 size-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Theme not found</h3>
                    <p className="text-muted-foreground">
                        No themes match your search. Try adjusting your filters.
                    </p>
                </div>
            )}

            {/*<CardsPreview app={themes.data[themeNumber]} />*/}
        </MainWrapper>
    );
}

ThemesIndex.layout = MainLayout;

ThemesIndex.displayName = 'ThemesIndex';

export default ThemesIndex;
