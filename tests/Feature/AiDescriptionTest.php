<?php

namespace Tests\Feature;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiDescriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_generates_description_and_tags_on_theme_creation()
    {
        Http::fake([
            'https://api.puter.com/puterai/openai/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => json_encode([
                                'description' => 'A beautiful dark theme with neon accents.',
                                'tags' => ['dark', 'neon', 'retro'],
                            ]),
                        ],
                    ],
                ],
            ], 200),
            'https://example.com/theme.json' => Http::response([
                'name' => 'neon-dark',
                'cssVars' => [
                    'light' => [
                        'background' => '0 0% 100%',
                        'foreground' => '222.2 84% 4.9%',
                    ],
                ],
            ], 200),
        ]);

        config(['services.puter.key' => 'test-key']);
        config(['services.puter.model' => 'test-model']);

        $user = User::factory()->create();

        $this->withoutExceptionHandling();

        $response = $this->actingAs($user)->post(route('themes.store'), [
            'url' => 'https://example.com/theme.json',
        ]);

        $this->assertDatabaseHas('themes', [
            'name' => 'neon-dark',
            'description' => 'A beautiful dark theme with neon accents.',
        ]);

        $theme = Theme::where('name', 'neon-dark')->first();
        $this->assertCount(3, $theme->tags);
        $this->assertEquals(['dark', 'neon', 'retro'], $theme->tags->pluck('name')->toArray());
    }
}
