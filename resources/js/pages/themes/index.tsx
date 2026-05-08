import { Plus } from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { CardsPreview } from '@/components/preview/CardsPreview';
import ThemeCard from '@/components/theme/theme-card';
import { ThemeSearch } from '@/components/theme/theme-search';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import MainLayout from '@/layouts/main-layout';
import type { PaginatedData, Registry } from '@/types';
import MainWrapper from '../../layouts/main/main-wrapper';

function ThemesIndex({
    themes,
    filters,
    availableCategories,
}: {
    themes: PaginatedData<Registry>;
    filters?: { search?: string; category?: string };
    availableCategories: string[];
}) {
    const [themeNumber, setThemeNumber] = useState<number>(0);

    return (
        <MainWrapper className={`pt-4`}>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Themes ${themes.total}`}
                    description={`  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            esse hic illo ipsum, laudantium molestiae nesciunt quia quo totam
            veniam.`}
                />
                <Button>
                    <Plus className={`h-4`} />
                    <span>Create new theme</span>
                </Button>
            </div>

            <ThemeSearch
                filters={filters}
                availableCategories={availableCategories}
            />

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                {themes.data.map((theme: Registry, _index) => (
                    <ThemeCard
                        onClick={() => setThemeNumber(_index)}
                        key={_index}
                        theme={theme}
                    />
                ))}
            </div>

            <Pagination pagination={themes} />

            <CardsPreview theme={themes.data[themeNumber]} />
        </MainWrapper>
    );
}

ThemesIndex.layout = MainLayout;

ThemesIndex.displayName = 'ThemesIndex';

export default ThemesIndex;
