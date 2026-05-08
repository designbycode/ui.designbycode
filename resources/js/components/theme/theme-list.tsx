import Heading from '@/components/heading';
import { useCSSVars } from '@/hooks/use-css-vars';
import type { Registry } from '@/types';

function ThemeList({ theme }: { theme: Registry }) {
    const { cssVars } = useCSSVars(theme);

    return (
        <div
            style={cssVars}
            className={`flex justify-between rounded-md border border-border bg-background p-4`}
        >
            <div>
                <Heading
                    as={`h4`}
                    variant={`small`}
                    title={theme?.title || 'Theme'}
                    description={theme?.name}
                />
            </div>
            <div className="flex shrink items-center gap-1.5 rounded-md border border-border p-1.5">
                <div className="size-6 rounded-sm border border-border bg-primary"></div>
                <div className="size-6 rounded-sm border border-border bg-secondary"></div>
                <div className="bg-accents size-6 rounded-sm border border-border"></div>
                <div className="size-6 rounded-sm border border-border bg-muted"></div>
            </div>
        </div>
    );
}

ThemeList.displayName = 'ThemeList';

export default ThemeList;
