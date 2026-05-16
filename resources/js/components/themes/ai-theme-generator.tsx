import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generate } from '@/routes/themes';

interface AiThemeGeneratorProps {
    onGenerated: (data: any) => void;
}

export default function AiThemeGenerator({ onGenerated }: AiThemeGeneratorProps) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) {
return;
}

        setLoading(true);

        try {
            const response = await fetch(generate().url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate theme');
            }

            const data = await response.json();
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
