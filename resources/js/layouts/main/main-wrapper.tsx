import { cn } from '@/lib/utils';

interface MainWrapperProps {
    children: React.ReactNode;
    as?: 'div' | 'section' | 'main';
    className?: string;
    style?: React.CSSProperties;
}

function MainWrapper({
    children,
    as = 'div',
    className,
    style,
    ...props
}: MainWrapperProps) {
    const Component = as;

    return (
        <Component
            {...props}
            style={style}
            className={cn(`container mx-auto px-4 md:px-6 lg:px-8`, className)}
        >
            {children}
        </Component>
    );
}

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
