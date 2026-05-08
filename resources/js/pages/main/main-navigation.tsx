import { Link } from '@inertiajs/react';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import AppearanceToggle from '@/components/ui/appearance-toggle';
import MainWrapper from '@/pages/main/main-wrapper';
import { home } from '@/routes';
import { index as themesIndex } from '@/routes/themes';

function MainNavigation() {
    return (
        <div
            className={`grid min-h-16 place-items-center border-b border-border`}
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
                <div className="flex space-x-4 text-sm">
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

                <div className="flex space-x-2">
                    <AppearanceToggle />
                    <ThemeSwitcher />
                </div>
            </MainWrapper>
        </div>
    );
}

MainNavigation.displayName = 'MainNavigation';

export default MainNavigation;
