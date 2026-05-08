import { cn } from '@/lib/utils';

interface MainWrapperProps {
    children: React.ReactNode;
    as?: 'div' | 'section' | 'main';
    className?: string;
}

function MainWrapper({ children, as = 'div', className }: MainWrapperProps) {
    const Component = as;

    return (
        <Component
            className={cn(`container mx-auto px-4 md:px-6 lg:px-8`, className)}
        >
            {children}
        </Component>
    );
}

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
