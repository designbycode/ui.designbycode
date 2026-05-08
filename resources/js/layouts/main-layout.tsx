import MainFooter from '@/layouts/main/main-footer';
import MainNavigation from '@/layouts/main/main-navigation';
import { GlowStack } from '@/registry/new-york/components/ui/glow/glow-stack';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <GlowStack className={`relative`}>
            <div className={`flex min-h-screen flex-col`}>
                <MainNavigation />
                <div className={`flex-1`}>{children}</div>
                <MainFooter />
            </div>
        </GlowStack>
    );
}

MainLayout.displayName = 'MainLayout';

export default MainLayout;
