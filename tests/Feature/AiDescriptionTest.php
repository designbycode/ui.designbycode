<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiDescriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_generates_description_on_theme_creation()
    {
        Http::fake([
            'https://openrouter.ai/*' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'A beautiful dark theme with neon accents.'
                        ]
                    ]
                ]
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

        config(['services.openrouter.key' => 'test-key']);

        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('themes.store'), [
            'url' => 'https://example.com/theme.json',
        ]);

        $this->assertDatabaseHas('themes', [
            'name' => 'neon-dark',
            'description' => 'A beautiful dark theme with neon accents.',
        ]);
    }
}
