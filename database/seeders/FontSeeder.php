<?php

namespace Database\Seeders;

use App\Models\Font;
use Illuminate\Database\Seeder;

class FontSeeder extends Seeder
{
    public function run(): void
    {
        if (Font::count() > 0) {
            $this->command->warn('Fonts table is not empty — skipping seeder.');

            return;
        }

        $total = 0;

        foreach (static::fonts() as $font) {
            Font::create($font);
            $total++;
        }

        $this->command->info("Seeded {$total} fonts.");
    }

    /**
     * @return list<array<string, mixed>>
     */
    private static function fonts(): array
    {
        $registry = json_decode(
            file_get_contents(base_path('registry.json')),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $fonts = [];

        foreach ($registry['items'] ?? [] as $item) {
            if (($item['type'] ?? '') !== 'registry:font') {
                continue;
            }

            $font = $item['font'] ?? [];

            $fonts[] = [
                'name' => $item['name'],
                'title' => $item['title'],
                'type' => 'registry:font',
                'author' => $item['author'] ?? 'designbycode',
                'meta' => $item['meta'] ?? ['category' => 'fonts', 'version' => '1.0.0'],
                'registryDependencies' => $item['registryDependencies'] ?? [],
                'font_family' => $font['family'] ?? null,
                'font_provider' => $font['provider'] ?? 'google',
                'font_import' => $font['import'] ?? null,
                'font_variable' => $font['variable'] ?? null,
                'font_weight' => $font['weight'] ?? [],
                'font_subsets' => $font['subsets'] ?? [],
                'font_selector' => $font['selector'] ?? null,
                'font_dependency' => $font['dependency'] ?? null,
            ];
        }

        return $fonts;
    }
}
