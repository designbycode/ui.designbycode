import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import Heading from '@/components/heading';
import { useCSSVars } from '@/hooks/use-css-vars';
import { cn } from '@/lib/utils';
import type { Theme } from '@/types/theme';

function ThemeList({
    theme,
    onSelect,
    selected = false,
    compact = false,
    className,
}: {
    theme: Theme;
    onSelect?: (theme: Theme) => void;
    selected?: boolean;
    compact?: boolean;
    className?: string;
}) {
    const { cssVars } = useCSSVars(theme);

    return (
        <button
            type="button"
            onClick={() => onSelect?.(theme)}
            style={cssVars}
            className={cn(
                'flex w-full items-center justify-between overflow-clip rounded-md border border-border bg-background text-left transition-colors hover:bg-accent',
                compact ? 'gap-2 px-4 py-2' : 'gap-4 p-4',
                selected && 'border-primary ring-1 ring-primary',
                className,
            )}
        >
            <div className="flex min-w-0 flex-1 items-center space-x-1">
                {selected && (
                    <motion.div
                        animate={{ x: -5 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        initial={{ x: -50 }}
                    >
                        <Check className="size-4 rounded-full bg-primary p-1 text-primary-foreground" />
                    </motion.div>
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
