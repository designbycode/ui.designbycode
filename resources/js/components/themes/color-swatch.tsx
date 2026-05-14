import { Clipboard } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useClipboard } from '@/hooks/use-clipboard';
import { convertColor } from '@/lib/color-utils';
function ColorSwatch({ name, value }: { name: string; value: string }) {
    const [, copy] = useClipboard();
    const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

    const displayValue = useMemo(() => {
        return convertColor(value, format) || value;
    }, [value, format]);

    const handleCopy = async () => {
        await copy(displayValue);
        toast.success(`Copied ${name} to clipboard`);
    };

    return (
        <Card className="overflow-hidden border-border/40 pt-0">
            <div
                className="h-34 w-full border-b border-border/40"
                style={{ backgroundColor: value }}
            />
            <CardContent className="space-y-2 px-3 pt-0">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        {name}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCopy}
                    >
                        <Clipboard className="h-3 w-3" />
                    </Button>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="truncate font-mono text-xs">
                        {displayValue}
                    </span>
                    <div className="flex gap-1">
                        {(['hex', 'rgb', 'hsl'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`rounded border px-1.5 py-0.5 text-[10px] transition-colors ${
                                    format === f
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-transparent bg-muted text-muted-foreground hover:border-border'
                                }`}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

ColorSwatch.displayName = 'ColorSwatch';
export default ColorSwatch;
