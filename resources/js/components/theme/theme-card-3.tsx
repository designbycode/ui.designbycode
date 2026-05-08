import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useCSSVars } from '@/hooks/use-css-vars';
import type { Registry } from '@/types/registry';

interface ThemeCard3Props extends React.ComponentPropsWithoutRef<typeof Card> {
    theme: Registry;
}

const SWATCHES = [
    { key: 'Primary', bgClass: 'bg-primary', flex: 3 },
    { key: 'Secondary', bgClass: 'bg-secondary', flex: 2 },
    { key: 'Accent', bgClass: 'bg-accent', flex: 2 },
    { key: 'Muted', bgClass: 'bg-muted', flex: 1 },
] as const;

const SURFACE_STRIPS = [
    { label: 'BG', bgClass: 'bg-background' },
    { label: 'Card', bgClass: 'bg-card' },
    { label: 'Border', bgClass: 'bg-border' },
    { label: 'Ring', bgClass: 'bg-ring' },
] as const;

function ThemeCard3({ theme, ...props }: ThemeCard3Props) {
    const { cssVars } = useCSSVars(theme);

    return (
        <Card
            {...props}
            className={[
                'group relative overflow-hidden rounded-2xl border border-border/40',
                'bg-card shadow-sm transition-all duration-500',
                'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
                props.className ?? '',
            ].join(' ')}
        >
            {/* ── Colour hero ───────────────────────────────────────── */}
            <div
                style={cssVars}
                className="relative h-36 w-full overflow-hidden"
            >
                {/* Panoramic swatch strip */}
                <div className="flex h-full w-full">
                    {SWATCHES.map(({ key, bgClass, flex }) => (
                        <div
                            key={key}
                            style={{ flex }}
                            className={`${bgClass} h-full transition-all duration-500 group-hover:opacity-90`}
                        />
                    ))}
                </div>

                {/* Frosted label strip at bottom of hero */}
                <div className="absolute inset-x-0 bottom-0 flex h-8 bg-background/60 backdrop-blur-sm">
                    {SWATCHES.map(({ key, flex }) => (
                        <div
                            key={key}
                            style={{ flex }}
                            className="flex items-center justify-center"
                        >
                            <span className="text-[10px] font-semibold tracking-widest text-foreground/50 uppercase">
                                {key}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Text content ──────────────────────────────────────── */}
            <CardHeader className="px-5 pt-4 pb-2">
                <CardTitle className="text-base font-bold tracking-tight text-foreground">
                    {theme.title}
                </CardTitle>
                <CardDescription className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {theme.description}
                </CardDescription>
            </CardHeader>

            {/* ── Surface tokens ────────────────────────────────────── */}
            <CardContent style={cssVars} className="px-5 pt-1 pb-5">
                <div className="flex gap-2">
                    {SURFACE_STRIPS.map(({ label, bgClass }) => (
                        <div
                            key={label}
                            className="flex flex-1 flex-col items-center gap-1.5"
                        >
                            <div
                                className={`${bgClass} h-1.5 w-full rounded-full border border-border/60`}
                            />
                            <span className="text-[9px] font-medium tracking-wider text-muted-foreground/60 uppercase">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* ── Subtle accent glow on hover ───────────────────────── */}
            <div
                style={cssVars}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/30 transition-opacity duration-500 ring-inset group-hover:opacity-100"
            />
        </Card>
    );
}

ThemeCard3.displayName = 'ThemeCard3';
export default ThemeCard3;
