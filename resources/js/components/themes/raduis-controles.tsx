import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useThemeStore } from '@/lib/theme/store';

export function RadiusControls() {
    const { radius, setRadius } = useThemeStore();

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>Corner radius</Label>
                <span className="font-mono text-xs text-muted-foreground">
                    {radius.toFixed(3)}rem
                </span>
            </div>
            <Slider
                min={0}
                max={1.5}
                step={0.025}
                value={[radius]}
                onValueChange={([v]) => setRadius(v)}
            />
            <div className="flex gap-2">
                {[0, 0.25, 0.5, 0.625, 1, 1.25].map((r) => (
                    <button
                        key={r}
                        onClick={() => setRadius(r)}
                        className="flex flex-1 items-center justify-center border border-border bg-muted/40 px-2 py-3 text-xs text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                        style={{ borderRadius: `${r}rem` }}
                    >
                        {r}
                    </button>
                ))}
            </div>
        </div>
    );
}
