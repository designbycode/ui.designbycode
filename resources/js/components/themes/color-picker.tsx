import { useMemo, useState } from 'react';
import TailwindIcon from '@/components/icons/tailwind-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverHeader,
    PopoverTitle,
} from '@/components/ui/popover';
import { convertColor, TAILWIND_COLORS, oklchToHex } from '@/lib/color-utils';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);

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

    const handleTailwindColorSelect = (colorValue: string) => {
        if (colorValue === 'transparent') {
            onChange('transparent');
        } else {
            const hsl = convertColor(colorValue, 'hsl');

            if (hsl) {
                const match = hsl.match(/hsl\(([^)]+)\)/);

                if (match) {
                    const parts = match[1].split(/[,\s]+/).filter(Boolean);
                    onChange(parts.join(' '));
                }
            }
        }

        setOpen(false);
    };

    const filteredColors = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const colors: Array<{ name: string; value: string; hex: string }> = [];

        for (const [colorName, shades] of Object.entries(TAILWIND_COLORS)) {
            if (
                colorName === 'black' ||
                colorName === 'white' ||
                colorName === 'transparent'
            ) {
                const shadeValue =
                    'DEFAULT' in shades
                        ? shades.DEFAULT
                        : shades[500] || Object.values(shades)[0];
                colors.push({
                    name: colorName,
                    value: shadeValue,
                    hex:
                        shadeValue === 'transparent'
                            ? 'transparent'
                            : oklchToHex(shadeValue),
                });
            } else {
                for (const [shade, shadeValue] of Object.entries(shades)) {
                    const fullName = `${colorName}-${shade}`;

                    if (fullName.includes(query)) {
                        colors.push({
                            name: fullName,
                            value: shadeValue,
                            hex: oklchToHex(shadeValue),
                        });
                    }
                }
            }
        }

        return colors;
    }, [searchQuery]);

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
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button size="icon" className="size-8" variant="ghost">
                            <TailwindIcon className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <PopoverHeader className="border-b p-3">
                            <PopoverTitle className="text-sm">
                                Tailwind v4
                            </PopoverTitle>
                        </PopoverHeader>
                        <div className="p-3">
                            <Input
                                placeholder="Search Tailwind colors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 text-xs"
                            />
                        </div>
                        <div className="max-h-80 overflow-y-auto p-2">
                            <div className="grid grid-cols-1 gap-1">
                                {filteredColors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() =>
                                            handleTailwindColorSelect(
                                                color.value,
                                            )
                                        }
                                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {color.hex === 'transparent' ? (
                                            <div className="size-4 shrink-0 rounded border border-border bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQYV2NkYGAwYmBg0AFGFAxQEEI4O4g4BAA5XQI4Xg1+5QAAAABJRU5ErkJggg==')] bg-repeat" />
                                        ) : (
                                            <div
                                                className="size-4 shrink-0 rounded border border-border"
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            />
                                        )}
                                        <span className="capitalize">
                                            {color.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
