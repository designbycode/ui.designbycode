interface ThemeCreatorLayoutProps {
    children: React.ReactNode;
}

function ThemeCreatorLayout({ children }: ThemeCreatorLayoutProps) {
    return (
        <div className="flex h-screen flex-col bg-background">{children}</div>
    );
}

ThemeCreatorLayout.displayName = 'ThemeCreatorLayout';

export default ThemeCreatorLayout;
