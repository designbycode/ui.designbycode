import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import AppearanceToggle from '@/components/ui/appearance-toggle';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import MainWrapper from '@/layouts/main/main-wrapper';
import { cn } from '@/lib/utils';
import type { UseHeadroomOptions } from '@/registry/new-york/hooks/use-headroom';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { home } from '@/routes';
import { index as themesIndex } from '@/routes/themes';

function MainNavigation() {
    const isMobile = useIsMobile();
    const { ref, pinned } = useHeadroom({
        enabled: !isMobile,
        offset: 16,
        tolerance: {
            down: 5,
            up: 5,
        },
    } as UseHeadroomOptions);

    return (
        <div
            ref={ref}
            suppressHydrationWarning
            className={cn(
                `fixed inset-x-0 top-0 isolate z-50 flex min-h-16 items-center border-b! border-solid! border-border/50! bg-background/50 text-foreground backdrop-blur transition-transform duration-700`,
                pinned ? 'translate-y-0' : '-translate-y-full',
            )}
        >
            <MainWrapper className={`flex justify-between`}>
                <Link
                    prefetch={'hover'}
                    className={`text-semibold flex items-center space-x-1 text-lg`}
                    href={home()}
                >
                    <span className="grid size-7 place-items-center rounded-sm bg-foreground text-background">
                        ui
                    </span>
                    <span>designbycode</span>
                </Link>
                <div className="hidden space-x-4 text-sm md:flex">
                    <Link
                        prefetch={'hover'}
                        className={`rounded-md px-4 py-2 hover:bg-muted`}
                        href={home()}
                    >
                        Home
                    </Link>
                    <Link
                        prefetch={'hover'}
                        className={`rounded-md px-4 py-2 hover:bg-muted`}
                        href={themesIndex()}
                    >
                        Themes
                    </Link>
                    <Link
                        prefetch={'hover'}
                        className={`rounded-md px-4 py-2 hover:bg-muted`}
                        href={home()}
                    >
                        Components
                    </Link>
                    <Link
                        prefetch={'hover'}
                        className={`rounded-md px-4 py-2 hover:bg-muted`}
                        href={home()}
                    >
                        Blocks
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open navigation menu"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <PlaceholderPattern className="absolute inset-y-0 left-0 h-full w-2 border-r border-border/75 stroke-border/75 md:w-5" />

                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <div className="mt-8 flex flex-col space-y-1 px-4">
                                    <Link
                                        prefetch={'hover'}
                                        className="rounded-md px-4 py-2 hover:bg-muted"
                                        href={home()}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        prefetch={'hover'}
                                        className="rounded-md px-4 py-2 hover:bg-muted"
                                        href={themesIndex()}
                                    >
                                        Themes
                                    </Link>
                                    <Link
                                        prefetch={'hover'}
                                        className="rounded-md px-4 py-2 hover:bg-muted"
                                        href={home()}
                                    >
                                        Components
                                    </Link>
                                    <Link
                                        prefetch={'hover'}
                                        className="rounded-md px-4 py-2 hover:bg-muted"
                                        href={home()}
                                    >
                                        Blocks
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <AppearanceToggle />
                    <ThemeSwitcher />
                </div>
            </MainWrapper>
        </div>
    );
}

MainNavigation.displayName = 'MainNavigation';

export default MainNavigation;
