import MainFooter from '@/layouts/main/main-footer';
import MainNavigation from '@/layouts/main/main-navigation';
import { GlowStack } from '@/registry/new-york/components/ui/glow/glow-stack';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <GlowStack className={`relative`}>
            <div className={`flex min-h-screen flex-col py-16`}>
                <PlaceholderPattern className="fixed inset-y-0 left-0 h-full w-2 border-r border-border/75 stroke-border/75 md:w-5" />
                <PlaceholderPattern className="fixed inset-y-0 right-0 h-full w-2 border-l border-border/75 stroke-border/75 md:w-5" />
                <MainNavigation />
                <div className={`flex-1`}>{children}</div>

                <MainFooter />
            </div>
        </GlowStack>
    );
}

MainLayout.displayName = 'MainLayout';

export default MainLayout;
