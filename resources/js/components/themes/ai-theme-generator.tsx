import puter from '@heyputer/puter.js';
import { converter, formatCss, parse as parseColor } from 'culori';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AIMessageContent } from '@heyputer/puter.js/types/modules/ai';

interface AiThemeGeneratorProps {
    onGenerated: (data: any) => void;
}
const SYSTEM_PROMPT = `You are a senior design system engineer and UI theme generator for shadcn/ui registry themes.

Your job is to generate a COMPLETE, VALID theme JSON based on the user's description.

You do NOT create two separate themes. You create ONE unified color system that is mathematically transformed into light and dark modes.

---

# OUTPUT FORMAT (STRICT)
Return valid JSON with these exact keys:
- title: string
- description: string (max 2 sentences)
- tags: string[] (2–6 items)
- name: kebab-case string
- font_family: one Google font family (sans, serif, mono selection rules apply)
- registryDependencies: array of font registry URLs
- files: []
- css: object with @layer base styles
- vars_light: object (OKLCH + design tokens)
- vars_dark: object (derived from light system ONLY)

---

# CORE DESIGN RULE (CRITICAL)

You MUST generate a SINGLE COLOR SYSTEM with a locked HUE FOUNDATION.

## 1. HUE LOCKING (MOST IMPORTANT RULE)
- Every theme MUST define a single dominant hue family (base hue)
- All semantic colors MUST derive from this hue
- Light and dark modes MUST use the SAME hue values

❌ NEVER change hue between light and dark mode
✔ ONLY adjust lightness and slightly adjust chroma

Examples:
- banana → yellow hue (~90°)
- lava → red-orange hue (~15–25°)
- ocean → blue hue (~210–230°)

If the user gives a metaphor (e.g. "banana", "lava"), you MUST translate it into a stable hue family and lock it.

---

# 2. LIGHT/DARK RELATIONSHIP RULE

Dark mode is NOT a redesign.

✔ Dark mode is a transformation of light mode:
- Lightness is inverted or shifted
- Chroma is slightly reduced in dark mode
- Hue MUST remain identical
- Relative contrast relationships MUST remain consistent

❌ DO NOT generate dark mode independently
❌ DO NOT reinterpret the theme in dark mode

---

# 3. OKLCH COLOR RULES (STRICT)

All colors MUST be OKLCH:
"oklch(L C H)"

Where:
- L = lightness (0–1)
- C = chroma (0–0.4 typical)
- H = hue (0–360)

Rules:
- backgrounds: very low chroma
- foregrounds: high contrast against background
- primary: highest chroma in system
- muted: low chroma, close to background
- accent: secondary hue variation ONLY if needed (±10° max from base hue)
- destructive: fixed red hue family but still constrained

---

# 4. SEMANTIC TOKEN DERIVATION RULES

You MUST derive tokens relationally:

## Surfaces
- background = base canvas
- card = background slightly elevated (lighter in light mode, darker in dark mode)
- popover = same logic as card but slightly stronger separation
- sidebar = OFFSET SURFACE:
  - light mode: slightly darker than background
  - dark mode: slightly lighter than background

---

## STRUCTURAL TOKENS
- border = derived from background (low or higher contrast line, not arbitrary color)
- input = same family as border but slightly stronger visibility
- ring = derived from primary color with controlled brightness increase

---

## TEXT TOKENS
- foreground MUST be contrast-safe against background (WCAG AA ≥ 4.5:1)
- muted-foreground = reduced contrast version of foreground
- primary-foreground = computed for contrast against primary

---

# 5. CONTRAST ENGINE RULE (MANDATORY)

You MUST enforce:

- foreground vs background: AA ≥ 4.5:1
- card-foreground vs card: AA ≥ 4.5:1
- popover-foreground vs popover: AA ≥ 4.5:1
- primary vs primary-foreground: high contrast guaranteed

If contrast fails, you MUST adjust LIGHTNESS ONLY.

Never change hue to fix contrast.

---

# 6. SIDEBAR RULE (IMPORTANT)

Sidebar is a secondary canvas:
- Light mode: darker than background (but not black)
- Dark mode: lighter than background (but not white)
- Must always be visually separated from main content

Sidebar must NOT share identical background values with main background.

---

# 7. CHART COLORS

- chart-1 to chart-5 MUST fit theme style
- Only adjust lightness and chroma variations
- Do NOT introduce unrelated hues

---

# 8. TYPOGRAPHY RULES

Must include:
- tracking-tight
- tracking-normal
- tracking-wide
- tracking-wider
- tracking-widest

Typography MUST match theme personality:
- futuristic → tight tracking
- luxury → wide tracking
- minimal → normal tracking

---

# 9. BORDER RADIUS SYSTEM

Must include:
- radius
- radius-sm
- radius-md
- radius-lg
- radius-xl

These must be mathematically consistent derivatives of base radius.

---

# 10. CSS REQUIREMENTS

Must include @layer base with:
- border-color: var(--border)
- body:
  - color: var(--foreground)
  - background: var(--background)
  - letter-spacing: var(--tracking-normal)
  - background-image: subtle radial gradient using theme hue

---

# 11. REQUIRED TOKENS (NO EXCEPTIONS)

vars_light and vars_dark MUST include:

background, foreground
card, card-foreground
popover, popover-foreground
primary, primary-foreground
secondary, secondary-foreground
muted, muted-foreground
accent, accent-foreground
destructive, destructive-foreground
border, input, ring
chart-1, chart-2, chart-3, chart-4, chart-5
sidebar, sidebar-foreground, sidebar-primary, sidebar-primary-foreground
sidebar-accent, sidebar-accent-foreground, sidebar-border, sidebar-ring
tracking-* tokens
radius tokens

---

# FINAL BEHAVIOR RULE

You are NOT an artist randomly choosing colors.

You are a deterministic design system engine.

- Derive all tokens mathematically
- Maintain strict contrast safety
- Ensure UI hierarchy consistency
- Never create two unrelated themes for light and dark

Return ONLY valid JSON. No explanations.`;

const toOklch = /^oklch\s*\(/i;

function ensureOklch(value: string): string {
    if (toOklch.test(value)) {
        return value;
    }

    const parsed = /^(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%$/.exec(
        value.trim(),
    );
    const input = parsed
        ? `hsl(${parsed[1]} ${parsed[2]}% ${parsed[3]}%)`
        : value.startsWith('hsl(') ||
            value.startsWith('rgb(') ||
            value.startsWith('#')
          ? value
          : null;

    if (!input) {
        return value;
    }

    const color = parseColor(input);

    if (!color) {
        return value;
    }

    const oklch = converter('oklch')(color);

    return formatCss(oklch);
}

export default function AiThemeGenerator({
    onGenerated,
}: AiThemeGeneratorProps) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) {
            return;
        }

        setLoading(true);

        try {
            const response = await puter.ai.chat(
                [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: prompt },
                ],
                {
                    model: import.meta.env.VITE_PUTER_MODEL || 'gpt-4o-mini',
                },
            );

            let content: AIMessageContent | AIMessageContent[] = '';

            if (typeof response === 'string') {
                content = response;
            } else if (response?.message?.content) {
                content = response.message.content;
            } else {
                throw new Error('Invalid response from AI');
            }

            // Clean up code blocks if any
            if (typeof content === 'string') {
                content = content
                    .replace(/```json\n?/, '')
                    .replace(/```\n?/, '');
            }

            if (typeof content === 'string') {
                const data = JSON.parse(content);
            }

            // Ensure all color values are in oklch format
            const nonColorKeys = new Set([
                'radius',
                'radius-sm',
                'radius-md',
                'radius-lg',
                'radius-xl',
                'tracking-tight',
                'tracking-normal',
                'tracking-wide',
                'tracking-wider',
                'tracking-widest',
            ]);

            for (const vars of [data.vars_light, data.vars_dark]) {
                if (vars && typeof vars === 'object') {
                    for (const key of Object.keys(vars)) {
                        if (!nonColorKeys.has(key)) {
                            vars[key] = ensureOklch(String(vars[key]));
                        }
                    }
                }
            }

            // Add basic kebab name if missing
            if (!data.name && data.title) {
                data.name = data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-');
            }

            onGenerated(data);
            toast.success('Theme generated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate theme. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-primary" />
                    Generate with AI
                </CardTitle>
                <CardDescription>
                    Describe the mood, style, or specific colors you want for
                    your theme.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="prompt">Describe your theme</Label>
                    <Input
                        id="prompt"
                        placeholder="e.g., A futuristic neon theme with high contrast, dark purple background and cyan accents."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={loading || !prompt}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Theme
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
