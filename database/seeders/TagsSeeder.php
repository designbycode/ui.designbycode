<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $themeTags = [
            'polar-drift' => ['cold', 'minimal', 'clean', 'arctic'],
            'yeti' => ['cold', 'dark', 'rugged', 'cyan'],
            'boho' => ['warm', 'organic', 'artistic', 'soft', 'vintage'],
            'tide' => ['warm', 'nature', 'bright', 'tropical'],
            'ember' => ['warm', 'nature', 'harvest', 'earthy'],
            'noir-ice' => ['cold', 'elegant', 'noir', 'dark'],
            'verdant-future' => ['nature', 'green', 'futuristic', 'optimistic'],
            'brutal-industry' => ['industrial', 'retro', 'bold', 'dark'],
            'retrowave' => ['retro', 'neon', 'futuristic', 'vhs'],
            'synth-organica' => ['organic', 'neon', 'tech', 'bio'],
            'dreamscape' => ['retro', 'pastel', 'nostalgic', 'soft'],
            'minimalism' => ['minimal', 'clean', 'bold', 'structured'],
            'soft-extrude' => ['minimal', 'soft', 'modern', 'clean'],
            'frost' => ['cold', 'elegant', 'modern', 'glass'],
            'structured' => ['structured', 'professional', 'modern', 'clean'],
            'corporate' => ['professional', 'clean', 'structured', 'neutral'],
            'treasury' => ['professional', 'clean', 'secure', 'trust'],
            'canopy' => ['nature', 'organic', 'green', 'peaceful'],
            'wabi-sabi' => ['nature', 'minimal', 'organic', 'calm'],
            'gatsby' => ['luxury', 'elegant', 'retro', 'bold'],
            'cosmos' => ['futuristic', 'dark', 'elegant', 'space'],
            'tactical' => ['tech', 'bold', 'utilitarian', 'military'],
            'inferno' => ['warm', 'bold', 'dark', 'fire'],
            'mauve' => ['elegant', 'soft', 'modern', 'purple'],
            'haze' => ['atmospheric', 'soft', 'modern', 'misty'],
            'gothic' => ['dark', 'elegant', 'dramatic', 'vintage'],
            'fantasy' => ['elegant', 'magical', 'bold', 'purple'],
            'mythological' => ['elegant', 'retro', 'bold', 'white'],
            'urban' => ['industrial', 'bold', 'modern', 'grey'],
            'mid-century' => ['retro', 'vintage', 'warm', 'modern'],
            'japanese-zen' => ['minimal', 'nature', 'peaceful', 'clean'],
            'art-nouveau' => ['elegant', 'organic', 'vintage', 'floral'],
            'coastal' => ['nature', 'warm', 'soft', 'peaceful'],
            'scandinavian' => ['minimal', 'clean', 'modern', 'soft'],
            'techno' => ['tech', 'neon', 'dark', 'bold'],
            'rustic' => ['nature', 'warm', 'vintage', 'earthy'],
            'surreal' => ['artistic', 'bold', 'modern', 'dreamy'],
            'spring' => ['nature', 'bright', 'soft', 'floral'],
            'summer' => ['warm', 'nature', 'bright', 'tropical'],
            'autumn' => ['warm', 'nature', 'earthy', 'harvest'],
            'winter' => ['cold', 'minimal', 'clean', 'snowy'],
            'solarpunk' => ['nature', 'futuristic', 'bright', 'green'],
            'steampunk' => ['retro', 'vintage', 'industrial', 'brass'],
        ];

        foreach ($themeTags as $name => $tags) {
            $theme = Theme::where('name', $name)->first();
            if ($theme) {
                $theme->attachTags($tags);
            }
        }

        $this->command->info('Tags seeded and attached to themes.');
    }
}
