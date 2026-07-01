'use client';

import { usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import MainWrapper from '@/layouts/main/main-wrapper';
import { PackageManagerCode } from '@/layouts/main/theme/main-package-manager-code';
import MainThemeCard from '@/layouts/main/theme/main-theme-card';
import ThemeLayout from '@/layouts/theme-layout';
import Carousel3d from '@/registry/new-york/components/ui/carousels/carousel-3d';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import type { Registry } from '@/types';

interface ThemesShowProps {
    theme: Registry;
}

export function ThemeShow({ theme }: ThemesShowProps) {
    const { url } = usePage().props;
    const installerCode = `${url}/r/themes/${theme.name}.json`;

    const codes = {
        bun: `bunx --bun shadcn@latest add ${installerCode}`,
        npm: `npx shadcn@latest add ${installerCode}`,
        pnpm: `pnpm dlx shadcn@latest add ${installerCode}`,
        yarn: `yarn dlx shadcn@latest add ${installerCode}`,
    };

    return (
        <>
            <div
                id={`hero`}
                className={`flex min-h-[600px] items-center bg-background text-foreground`}
            >
                <MainWrapper
                    className={`grid grid-cols-1 gap-6 md:grid-cols-3`}
                >
                    <div className={`col-span-2`}>
                        <HeadingBlock
                            badge={
                                theme.author
                                    ? {
                                          text: theme.author,
                                          icon: CheckCircle,
                                      }
                                    : undefined
                            }
                            heading={<>Theme {theme.title}</>}
                            headClassName={`capabilities font-black`}
                            description={theme.description ?? undefined}
                        />
                        <PackageManagerCode
                            codes={codes}
                            className={`max-w-4xl`}
                        />
                    </div>
                    <div>
                        <MainThemeCard theme={theme} />
                    </div>
                </MainWrapper>
            </div>

            <MainWrapper>
                <Carousel3d items={[Item, Item]} />
            </MainWrapper>
        </>
    );
}

function Item() {
    return (
        <div className={`h-75 w-full bg-primary text-primary-foreground`}></div>
    );
}

ThemeShow.layout = ThemeLayout;
export default ThemeShow;
