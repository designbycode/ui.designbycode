import { usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import AppearanceToggleTab from '@/components/appearance-tabs';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useCSSVars } from '@/hooks/use-css-vars';
import MainWrapper from '@/layouts/main/main-wrapper';
import { GlowStack } from '@/registry/new-york/components/ui/glow/glow-stack';
import type { Registry } from '@/types';

interface ThemeLayoutProps {
    children: React.ReactNode;
}

function ThemeLayout({ children }: ThemeLayoutProps) {
    const { theme } = usePage<{ theme: Registry }>().props;
    const { cssVars } = useCSSVars(theme);

    return (
        <GlowStack
            className="relative bg-background font-sans"
            style={cssVars as React.CSSProperties}
        >
            <div
                style={cssVars as React.CSSProperties}
                className="fixed inset-x-5 top-0 z-20 flex h-16 items-center justify-between bg-background/75 backdrop-blur"
            >
                <MainWrapper
                    style={cssVars as React.CSSProperties}
                    className="flex items-center justify-between gap-2"
                >
                    <Button variant={`outline`} onClick={() => history.back()}>
                        <ArrowLeft className="size-4" />
                        Back
                    </Button>
                    <AppearanceToggleTab />
                </MainWrapper>
            </div>
            <div className="flex min-h-screen flex-col">
                <div className="my-16 flex-1">{children}</div>
            </div>
            <PlaceholderPattern className="fixed inset-y-0 left-0 z-2 h-full w-2 border-r border-border/75 stroke-border/75 md:w-5" />
            <PlaceholderPattern className="fixed inset-y-0 right-0 z-2 h-full w-2 border-l border-border/75 stroke-border/75 md:w-5" />
        </GlowStack>
    );
}

ThemeLayout.displayName = 'ThemeLayout';

export default ThemeLayout;
