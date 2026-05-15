<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiService
{
    /**
     * @return array{description: ?string, tags: array<string>}
     */
    public function generateThemeMetadata(string $name, array $colors): array
    {
        $apiKey = config('services.openrouter.key');

        if (! $apiKey) {
            return ['description' => null, 'tags' => []];
        }

        $colorList = collect($colors)
            ->map(fn ($value, $key) => "{$key}: {$value}")
            ->implode(', ');

        $prompt = "Generate metadata for a UI theme named \"{$name}\" that uses these colors: {$colorList}.
        Return the result in JSON format with two keys:
        1. \"description\": a short, engaging description (max 2 sentences) highlighting the mood or style.
        2. \"tags\": an array of 2 to 6 relevant style tags (e.g., \"warm\", \"cold\", \"retro\", \"vintage\", \"punk\", \"nature\", \"tech\", \"bold\", \"minimal\", \"elegant\").";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$apiKey,
            'HTTP-Referer' => config('app.url'),
            'X-Title' => config('app.name'),
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => config('services.openrouter.model'),
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            return ['description' => null, 'tags' => []];
        }

        $data = $response->json();
        $content = $data['choices'][0]['message']['content'] ?? '{}';
        $decoded = json_decode($content, true);

        return [
            'description' => $decoded['description'] ?? null,
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
