import MainNavigation from '@/pages/main/main-navigation';
import MainFooter from '@/pages/main/main-footer';

interface MainLayoutProps {
    children: React.ReactNode
}

function MainLayout({children}: MainLayoutProps) {
    return (
        <div className={`min-h-screen flex flex-col`}>
            <MainNavigation />
            <div className={`flex-1`}>
                {children}
            </div>
            <MainFooter />
        </div>
    )
}

MainLayout.displayName = 'MainLayout'

export default MainLayout


