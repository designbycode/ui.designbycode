import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    loadGoogleFont,
    MONO_FONTS,
    SANS_FONTS,
    SERIF_FONTS,
} from './font-list';
import { Slider } from '@/components/ui/slider';
import { useThemeStore } from '@/lib/theme/store';

const SCALES = [
    { name: 'Minor Second', value: 1.067 },
    { name: 'Major Second', value: 1.125 },
    { name: 'Minor Third', value: 1.2 },
    { name: 'Major Third', value: 1.25 },
    { name: 'Perfect Fourth', value: 1.333 },
    { name: 'Augmented Fourth', value: 1.414 },
    { name: 'Perfect Fifth', value: 1.5 },
    { name: 'Golden Ratio', value: 1.618 },
];

export function TypographyControls() {
    const s = useThemeStore();

    useEffect(() => {
        SANS_FONTS.concat(SERIF_FONTS, MONO_FONTS).forEach(loadGoogleFont);
    }, []);

    return (
        <div className="space-y-5">
            <FontSelect
                kind="sans"
                label="Sans"
                options={SANS_FONTS}
                value={s.fonts.sans}
                onChange={(v) => s.setFont('sans', v)}
            />
            <FontSelect
                kind="serif"
                label="Serif (headings)"
                options={SERIF_FONTS}
                value={s.fonts.serif}
                onChange={(v) => s.setFont('serif', v)}
            />
            <FontSelect
                kind="mono"
                label="Mono"
                options={MONO_FONTS}
                value={s.fonts.mono}
                onChange={(v) => s.setFont('mono', v)}
            />

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Base size</Label>
                    <span className="font-mono text-xs text-muted-foreground">
                        {s.baseFontSize}px
                    </span>
                </div>
                <Slider
                    min={12}
                    max={20}
                    step={1}
                    value={[s.baseFontSize]}
                    onValueChange={([v]) => s.setBaseFontSize(v)}
                />
            </div>

            <div className="space-y-2">
                <Label>Type scale</Label>
                <Select
                    value={String(s.scaleRatio)}
                    onValueChange={(v) => s.setScaleRatio(Number(v))}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {SCALES.map((sc) => (
                            <SelectItem key={sc.value} value={String(sc.value)}>
                                {sc.name} ({sc.value})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Line height</Label>
                    <span className="font-mono text-xs text-muted-foreground">
                        {s.lineHeight.toFixed(2)}
                    </span>
                </div>
                <Slider
                    min={1}
                    max={2}
                    step={0.05}
                    value={[s.lineHeight]}
                    onValueChange={([v]) => s.setLineHeight(v)}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Letter spacing</Label>
                    <span className="font-mono text-xs text-muted-foreground">
                        {s.letterSpacing.toFixed(3)}em
                    </span>
                </div>
                <Slider
                    min={-0.05}
                    max={0.1}
                    step={0.005}
                    value={[s.letterSpacing]}
                    onValueChange={([v]) => s.setLetterSpacing(v)}
                />
            </div>
        </div>
    );
}

function FontSelect({
    kind,
    label,
    options,
    value,
    onChange,
}: {
    kind: string;
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((f) => (
                        <SelectItem key={f} value={f}>
                            <span style={{ fontFamily: `"${f}"` }}>{f}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div
                className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm"
                style={{ fontFamily: `"${value}"` }}
            >
                The quick brown fox jumps over the lazy dog
            </div>
        </div>
    );
}
