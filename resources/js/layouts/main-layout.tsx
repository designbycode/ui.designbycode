import MainFooter from '@/layouts/main/main-footer';
import MainNavigation from '@/layouts/main/main-navigation';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={`flex min-h-screen flex-col`}>
            <MainNavigation />
            <div className={`flex-1`}>{children}</div>
            <MainFooter />
        </div>
    );
}

MainLayout.displayName = 'MainLayout';

export default MainLayout;
