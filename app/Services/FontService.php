<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class FontService
{
    protected string $baseUrl = 'https://api.fontsource.org/v1';

    public function getFonts(): array
    {
        return Cache::remember('fonts_list', 86400, function () {
            $response = Http::get("{$this->baseUrl}/fonts");
            if ($response->failed()) {
                return [];
            }
            return $response->json();
        });
    }

    public function getFont(string $id): ?array
    {
        return Cache::remember("font_details_{$id}", 86400, function () use ($id) {
            $response = Http::get("{$this->baseUrl}/fonts/{$id}");
            if ($response->failed()) {
                return null;
            }
            return $response->json();
        });
    }

    public function toRegistry(array $fontData): array
    {
        $id = $fontData['id'];
        $family = $fontData['family'];
        $importName = Str::studly($family);
        $variableName = "--font-{$id}";
        $isVariable = $fontData['variable'] ?? false;
        $dependency = $isVariable ? "@fontsource-variable/{$id}" : "@fontsource/{$id}";

        return [
            'name' => "font-{$id}",
            'title' => $family,
            'type' => 'registry:font',
            'meta' => [
                'version' => '1.0.0',
                'category' => 'fonts'
            ],
            'author' => 'designbycode',
            'font' => [
                'family' => "'{$family}', sans-serif",
                'provider' => 'google',
                'import' => $importName,
                'variable' => $variableName,
                'subsets' => $fontData['subsets'] ?? ['latin'],
                'dependency' => $dependency
            ]
        ];
    }
}
