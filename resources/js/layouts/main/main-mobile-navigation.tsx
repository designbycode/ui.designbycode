import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import type { home } from '@/routes';

export interface NavLinkProps {
    label: string;
    href: string | ReturnType<typeof home>;
}

function MainMobileNavigation({ navLinks }: { navLinks: NavLinkProps[] }) {
    return (
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

                    <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                    <div className="mt-8 flex flex-col space-y-1 px-4">
                        {navLinks.map((link: NavLinkProps) => (
                            <Link
                                key={link.label}
                                prefetch={'hover'}
                                className="rounded-md px-4 py-2 hover:bg-muted"
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

MainMobileNavigation.displayName = 'MainMobileNavigation';

export default MainMobileNavigation;
