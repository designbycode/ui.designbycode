import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { convertColor, TAILWIND_COLORS } from '@/lib/color-utils';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    // We assume the value is HSL "h s% l%"
    const hexValue = useMemo(() => {
        return convertColor(`hsl(${value})`, 'hex') || '#000000';
    }, [value]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        const hsl = convertColor(hex, 'hsl');

        if (hsl) {
            // Extract values from "hsl(h, s%, l%)" or "hsl(h s% l%)"
            const match = hsl.match(/hsl\(([^)]+)\)/);

            if (match) {
                // normalize to "h s% l%"
                const parts = match[1].split(/[,\s]+/).filter(Boolean);
                onChange(parts.join(' '));
            }
        }
    };

    const handleTailwindSelect = (oklch: string) => {
        const hsl = convertColor(oklch, 'hsl');

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
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="size-8 shrink-0 rounded-md border border-border shadow-sm transition-transform hover:scale-105"
                            style={{ backgroundColor: `hsl(${value})` }}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-3 border-b">
                            <Label className="text-xs mb-2 block">Custom Color</Label>
                            <input
                                type="color"
                                value={hexValue}
                                onChange={handleColorChange}
                                className="h-10 w-full cursor-pointer border-none bg-transparent"
                            />
                        </div>
                        <div className="h-64 overflow-y-auto p-3">
                            <Label className="text-xs mb-2 block">Tailwind Colors</Label>
                            <div className="grid grid-cols-1 gap-4">
                                {Object.entries(TAILWIND_COLORS).map(([colorName, shades]) => (
                                    <div key={colorName} className="space-y-1.5">
                                        <span className="text-[10px] text-muted-foreground capitalize">{colorName}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {Object.entries(shades).map(([shade, oklch]) => (
                                                <button
                                                    key={shade}
                                                    title={`${colorName}-${shade}`}
                                                    className="size-5 rounded-sm border border-black/10 transition-transform hover:scale-110"
                                                    style={{ backgroundColor: oklch }}
                                                    onClick={() => handleTailwindSelect(oklch)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 text-xs font-mono"
                />
            </div>
        </div>
    );
}
