import { Sparkles } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    derivePaletteFromPrimary,
    hexToTokenValue,
    tokenValueToHex,
} from '@/lib/theme/color';
import { TOKEN_GROUPS } from '@/lib/theme/defaults';
import { useThemeStore } from '@/lib/theme/store';
import { PALETTE_PRESETS } from './pallets-preset';

export function ColorControls() {
    const { light, dark, setToken, setManyTokens } = useThemeStore();

    return (
        <div className="space-y-5">
            <div>
                <Label className="mb-2 block text-xs tracking-wide text-muted-foreground uppercase">
                    Palette presets
                </Label>
                <div className="grid grid-cols-5 gap-2">
                    {PALETTE_PRESETS.map((p) => (
                        <button
                            key={p.name}
                            title={p.name}
                            onClick={() => {
                                setManyTokens(
                                    'light',
                                    derivePaletteFromPrimary(p.primary, false),
                                );
                                setManyTokens(
                                    'dark',
                                    derivePaletteFromPrimary(p.primary, true),
                                );
                            }}
                            className="group flex flex-col items-center gap-1 rounded-md border border-border p-2 transition hover:border-foreground/30"
                        >
                            <span
                                className="h-6 w-6 rounded-full ring-1 ring-border"
                                style={{ background: p.primary }}
                            />
                            <span className="truncate text-[10px] text-muted-foreground group-hover:text-foreground">
                                {p.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <Tabs defaultValue="light">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="light">Light</TabsTrigger>
                    <TabsTrigger value="dark">Dark</TabsTrigger>
                </TabsList>
                {(['light', 'dark'] as const).map((mode) => (
                    <TabsContent
                        key={mode}
                        value={mode}
                        className="space-y-5 pt-3"
                    >
                        <DeriveFromPrimary mode={mode} />
                        {TOKEN_GROUPS.map((g) => (
                            <div key={g.label} className="space-y-2">
                                <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    {g.label}
                                </div>
                                {g.tokens.map((t) => {
                                    const value = (
                                        mode === 'light' ? light : dark
                                    )[t];
                                    const hex = value
                                        ? tokenValueToHex(value)
                                        : '#000000';

                                    return (
                                        <div
                                            key={t}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="color"
                                                value={hex}
                                                onChange={(e) =>
                                                    setToken(
                                                        mode,
                                                        t,
                                                        hexToTokenValue(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="h-8 w-10 cursor-pointer rounded border border-border bg-transparent"
                                            />
                                            <div className="flex-1 text-xs">
                                                <div className="font-mono text-foreground">
                                                    --{t}
                                                </div>
                                                <div className="truncate font-mono text-[10px] text-muted-foreground">
                                                    {value}
                                                </div>
                                            </div>
                                            <Input
                                                value={hex}
                                                onChange={(e) =>
                                                    setToken(
                                                        mode,
                                                        t,
                                                        hexToTokenValue(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="h-7 w-24 font-mono text-xs"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

const DeriveFromPrimary = memo(function DeriveFromPrimary({
    mode,
}: {
    mode: 'light' | 'dark';
}) {
    const { light, dark, setManyTokens } = useThemeStore();
    const current = (mode === 'light' ? light : dark).primary;
    const hex = tokenValueToHex(current);

    return (
        <div className="flex items-center gap-2 rounded-md border border-dashed border-border p-2">
            <input
                type="color"
                value={hex}
                onChange={(e) =>
                    setManyTokens(
                        mode,
                        derivePaletteFromPrimary(
                            e.target.value,
                            mode === 'dark',
                        ),
                    )
                }
                className="h-8 w-10 cursor-pointer rounded border border-border bg-transparent"
            />
            <div className="flex-1 text-xs text-muted-foreground">
                Generate the whole {mode} palette from a single primary color.
            </div>
            <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                    setManyTokens(
                        mode,
                        derivePaletteFromPrimary(hex, mode === 'dark'),
                    )
                }
            >
                <Sparkles /> Derive
            </Button>
        </div>
    );
});
