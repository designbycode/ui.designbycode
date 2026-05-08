import { Check } from 'lucide-react';
import Heading from '@/components/heading';
import { useCSSVars } from '@/hooks/use-css-vars';
import { cn } from '@/lib/utils';
import type { Registry } from '@/types';

function ThemeList({
    theme,
    onSelect,
    selected = false,
    compact = false,
}: {
    theme: Registry;
    onSelect?: (theme: Registry) => void;
    selected?: boolean;
    compact?: boolean;
}) {
    const { cssVars } = useCSSVars(theme);

    return (
        <button
            type="button"
            onClick={() => onSelect?.(theme)}
            style={cssVars}
            className={cn(
                'flex w-full items-center justify-between rounded-md border border-border bg-background text-left transition-colors hover:bg-accent',
                compact ? 'gap-2 px-4 py-2' : 'gap-4 p-4',
                selected && 'border-primary ring-1 ring-primary',
            )}
        >
            <div className="flex min-w-0 flex-1 items-center space-x-1 transition-all duration-500">
                {selected && (
                    <Check className="size-4 rounded-full bg-primary p-1 text-primary-foreground" />
                )}
                <Heading
                    as={`h4`}
                    variant={`small`}
                    title={theme?.title || 'Theme'}
                    description={compact ? undefined : theme?.name}
                />
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-border p-1.5">
                <div className="size-4 rounded-sm border border-border bg-primary"></div>
                <div className="size-4 rounded-sm border border-border bg-secondary"></div>
                <div className="size-4 rounded-sm border border-border bg-accent"></div>
                <div className="size-4 rounded-sm border border-border bg-muted"></div>
            </div>
        </button>
    );
}

ThemeList.displayName = 'ThemeList';

export default ThemeList;
