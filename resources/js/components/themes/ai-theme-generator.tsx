import puter from '@heyputer/puter.js';
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

interface AiThemeGeneratorProps {
    onGenerated: (data: any) => void;
}

const SYSTEM_PROMPT = `You are a UI theme designer for shadcn/ui themes. Generate a complete theme based on the user's description.

Return valid JSON with these exact keys:
- "title": A human-readable theme title
- "description": A short, engaging description (max 2 sentences)
- "tags": An array of 2 to 6 relevant style tags
- "font_family": A Google Font name (e.g. "Inter", "JetBrains Mono")
- "vars_light": Object with HSL color values for light mode
- "vars_dark": Object with HSL color values for dark mode

All color values must be in the shadcn HSL format: "{hue} {saturation}% {lightness}%" where hue is 0-360, saturation is 0-100%, lightness is 0-100%.

Required CSS variables in both vars_light and vars_dark:
- background, foreground
- card, card-foreground
- popover, popover-foreground
- primary, primary-foreground
- secondary, secondary-foreground
- muted, muted-foreground
- accent, accent-foreground
- destructive, destructive-foreground
- border, input, ring
- radius (e.g. "0.5rem")`;

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

            let content = '';
            if (typeof response === 'string') {
                content = response;
            } else if (response?.message?.content) {
                content = response.message.content;
            } else {
                throw new Error('Invalid response from AI');
            }

            // Clean up code blocks if any
            content = content.replace(/```json\n?/, '').replace(/```\n?/, '');

            const data = JSON.parse(content);

            // Add basic kebab name if missing
            if (!data.name && data.title) {
                data.name = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
                    Describe the mood, style, or specific colors you want for your theme.
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
