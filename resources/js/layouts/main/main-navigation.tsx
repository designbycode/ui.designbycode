import { Link } from '@inertiajs/react';
import AppearanceToggle from '@/components/ui/appearance-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import type { NavLinkProps } from '@/layouts/main/main-mobile-navigation';
import MainMobileNavigation from '@/layouts/main/main-mobile-navigation';
import MainWrapper from '@/layouts/main/main-wrapper';
import { cn } from '@/lib/utils';
import type { UseHeadroomOptions } from '@/registry/new-york/hooks/use-headroom';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { home } from '@/routes';
import { index as animateCssIndex } from '@/routes/animate-css';
import { index as fontsIndex } from '@/routes/fonts';
import { index as themesIndex } from '@/routes/themes';
import MainThemeSwitcher from './theme/main-theme-switcher';

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

    const navLinks = [
        { label: 'Home', href: home() },
        { label: 'Themes', href: themesIndex() },
        { label: 'Animate CSS', href: animateCssIndex() },
        { label: 'Fonts', href: fontsIndex() },
        // { label: 'Components', href: home() },
        // { label: 'Blocks', href: home() },
    ] as NavLinkProps[];

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
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            prefetch={'hover'}
                            className={`rounded-md px-4 py-2 hover:bg-muted`}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-2">
                    <AppearanceToggle />
                    <MainThemeSwitcher />
                    <MainMobileNavigation
                        navLinks={navLinks as NavLinkProps[]}
                    />
                </div>
            </MainWrapper>
        </div>
    );
}

MainNavigation.displayName = 'MainNavigation';

export default MainNavigation;
