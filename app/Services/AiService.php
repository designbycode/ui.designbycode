<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AiService
{
    public function generateFullTheme(string $prompt): ?array
    {
        $apiKey = config('services.puter.key');

        if (! $apiKey) {
            return null;
        }

        $systemPrompt = 'You are a UI theme designer for shadcn/ui themes. Generate a complete theme based on the user\'s description.

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
- radius (e.g. "0.5rem")';

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$apiKey,
        ])->timeout(30)->post('https://api.puter.com/puterai/openai/v1/chat/completions', [
            'model' => config('services.puter.model'),
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => $prompt],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            Log::warning('Puter generateFullTheme failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;
        }

        $data = $response->json();
        $content = $data['choices'][0]['message']['content'] ?? '{}';
        $decoded = json_decode($content, true);

        if (empty($decoded) || empty($decoded['vars_light']) || empty($decoded['vars_dark'])) {
            Log::warning('OpenRouter generateFullTheme returned incomplete data', [
                'content' => $content,
            ]);

            return null;
        }

        $decoded['name'] = Str::kebab($decoded['title'] ?? $decoded['name'] ?? 'ai-theme');
        $decoded['description'] = isset($decoded['description']) ? ltrim($decoded['description'], ': ') : null;
        $decoded['tags'] = $decoded['tags'] ?? [];
        $decoded['font_family'] = $decoded['font_family'] ?? 'Inter';

        return $decoded;
    }

    /**
     * @return array{description: ?string, tags: array<string>}
     */
    public function generateThemeMetadata(string $name, array $colors): array
    {
        $apiKey = config('services.puter.key');

        if (! $apiKey) {
            return ['description' => null, 'tags' => []];
        }

        $colorList = collect($colors)
            ->map(fn ($value, $key) => "{$key}: {$value}")
            ->implode(', ');

        $prompt = "Generate metadata for a UI theme named \"{$name}\" that uses these colors: {$colorList}.
        Return the result in JSON format with two keys:
        1. \"description\": a short, engaging description (max 2 sentences) highlighting the mood or style. The description must not start with a colon.
        2. \"tags\": an array of 2 to 6 relevant style tags (e.g., \"warm\", \"cold\", \"retro\", \"vintage\", \"punk\", \"nature\", \"tech\", \"bold\", \"minimal\", \"elegant\").";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$apiKey,
        ])->timeout(15)->post('https://api.puter.com/puterai/openai/v1/chat/completions', [
            'model' => config('services.puter.model'),
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            Log::warning('Puter generateThemeMetadata failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return ['description' => null, 'tags' => []];
        }

        $data = $response->json();
        $content = $data['choices'][0]['message']['content'] ?? '{}';
        $decoded = json_decode($content, true);

        $description = $decoded['description'] ?? null;

        if ($description) {
            $description = ltrim($description, ': ');
        }

        return [
            'description' => $description,
            'tags' => $decoded['tags'] ?? [],
        ];
    }

    /**
     * @deprecated Use generateThemeMetadata instead.
     */
    public function generateThemeDescription(string $name, array $colors): ?string
    {
        return $this->generateThemeMetadata($name, $colors)['description'];
    }
}
