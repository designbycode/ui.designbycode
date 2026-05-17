import { Link } from '@inertiajs/react';
import { GithubIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import MainWrapper from '@/layouts/main/main-wrapper';
import { home } from '@/routes';
import XIcon from '@/components/icons/x-icon';

const navLinks = [
    { href: '#', label: 'Features' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Licence' },
    { href: '#', label: 'Privacy' },
];

const socialLinks = [
    {
        href: '#',
        label: 'X',
        icon: <XIcon />,
    },
    {
        href: '#',
        label: 'Github',
        icon: <GithubIcon />,
    },
];

export default function MainFooter() {
    return (
        <footer className="mt-6">
            <div className={`relative`}>
                <div className={`relative mx-5 h-5`}>
                    <PlaceholderPattern className="absolute inset-0 h-full w-full border-y border-border/75 stroke-border/75" />
                </div>
            </div>
            <MainWrapper>
                <div className="flex flex-col gap-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link prefetch href={home()}>
                                <span className="flex items-center gap-2 text-lg">
                                    <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
                                        ui
                                    </span>
                                    <span>designbycode</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            {socialLinks.map(({ href, label, icon }) => (
                                <Button
                                    asChild
                                    key={label}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <a aria-label={label} href={href}>
                                        {icon}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <nav>
                        <ul className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground md:gap-6">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        className="hover:text-foreground"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </MainWrapper>
            <div className={`relative`}>
                <div className={`relative mx-5 h-5`}>
                    <PlaceholderPattern className="absolute inset-0 h-full w-full border-y border-border/75 stroke-border/75" />
                </div>
            </div>

            <MainWrapper>
                <div className="flex items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ui.designbycode</p>

                    <p className="inline-flex items-center gap-1">
                        <span>Built by</span>
                        <a
                            aria-label="x/twitter"
                            className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
                            href={'https://designbycode.co.za'}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {/*<img*/}
                            {/*    alt="shaban"*/}
                            {/*    className="size-4 rounded-full"*/}
                            {/*    height="auto"*/}
                            {/*    src="https://github.com/shabanhr.png"*/}
                            {/*    width="auto"*/}
                            {/*/>*/}
                            designbycode
                        </a>
                    </p>
                </div>
            </MainWrapper>
        </footer>
    );
}

MainFooter.displayName = 'MainFooter';
