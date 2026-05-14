import { useMemo } from 'react';
import { toast } from 'sonner';
import { useClipboard } from '@/hooks/use-clipboard';
import { convertColor } from '@/lib/color-utils';

export default function ColorSwatch2({
    name,
    value,
}: {
    name: string;
    value: string;
}) {
    const [, copy] = useClipboard();

    const displayValue = useMemo(
        () => convertColor(value, 'hex') || value,
        [value],
    );

    const handleCopy = async () => {
        await copy(displayValue);
        toast.success(`Copied ${name}`);
    };

    return (
        <button
            onClick={handleCopy}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 px-3 py-2 text-left transition-colors hover:border-border"
        >
            <span
                className="size-12 shrink-0 rounded ring-1 ring-black/10"
                style={{ backgroundColor: value }}
            />
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {name}
            </span>
            {/*<span className="font-mono text-[11px] text-muted-foreground/60">*/}
            {/*    {displayValue}*/}
            {/*</span>*/}
        </button>
    );
}

ColorSwatch2.displayName = 'ColorSwatch2';
