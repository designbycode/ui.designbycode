<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiService
{
    public function generateThemeDescription(string $name, array $colors): ?string
    {
        $apiKey = config('services.openrouter.key');

        if (! $apiKey) {
            return null;
        }

        $colorList = collect($colors)
            ->map(fn ($value, $key) => "{$key}: {$value}")
            ->implode(', ');

        $prompt = "Generate a short, engaging description (max 2 sentences) for a UI theme named \"{$name}\" that uses these colors: {$colorList}. The description should highlight the mood or style of the theme.";

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
        ]);

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();

        return $data['choices'][0]['message']['content'] ?? null;
    }
}
