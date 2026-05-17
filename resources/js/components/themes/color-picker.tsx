import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import TailwindIcon from '@/components/icons/tailwind-icon';
import { convertColor } from '@/lib/color-utils';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function ColorPicker({
    label,
    value,
    onChange,
}: ColorPickerProps) {
    const hexValue = useMemo(() => {
        return convertColor(`hsl(${value})`, 'hex') || '#000000';
    }, [value]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        const hsl = convertColor(hex, 'hsl');

        if (hsl) {
            const match = hsl.match(/hsl\(([^)]+)\)/);

            if (match) {
                const parts = match[1].split(/[,\s]+/).filter(Boolean);
                onChange(parts.join(' '));
            }
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                {label}
            </Label>
            <div className="flex items-center gap-2">
                <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-sm">
                    <input
                        type="color"
                        value={hexValue}
                        onChange={handleColorChange}
                        className="absolute -inset-2 size-12 cursor-pointer appearance-none rounded-md border-none"
                        style={{}}
                    />
                </div>

                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 font-mono text-xs"
                />
                <Button size={`sm`} className="size-8" variant="outline">
                    <TailwindIcon />
                </Button>
            </div>
        </div>
    );
}
