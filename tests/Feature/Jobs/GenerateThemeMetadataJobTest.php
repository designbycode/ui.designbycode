<?php

namespace Tests\Feature\Jobs;

use App\Jobs\GenerateThemeMetadataJob;
use App\Models\Theme;
use App\Services\AiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GenerateThemeMetadataJobTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_generates_and_saves_metadata(): void
    {
        Http::fake([
            'https://api.puter.com/*' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => json_encode([
                                'description' => 'A neon-drenched cyberpunk theme.',
                                'tags' => ['neon', 'cyberpunk', 'dark'],
                            ]),
                        ],
                    ],
                ],
            ], 200),
        ]);

        config(['services.puter.key' => 'test-key']);
        config(['services.puter.model' => 'test-model']);

        $theme = Theme::create([
            'name' => 'cyber-neon',
            'vars_light' => ['background' => '0 0% 0%'],
        ]);

        (new GenerateThemeMetadataJob($theme))->handle(app(AiService::class));

        $theme->refresh();

        $this->assertSame('A neon-drenched cyberpunk theme.', $theme->description);
        $this->assertCount(3, $theme->tags);
        $this->assertEqualsCanonicalizing(
            ['neon', 'cyberpunk', 'dark'],
            $theme->tags->pluck('name')->toArray(),
        );
    }

    public function test_it_handles_failed_api_call(): void
    {
        Http::fake([
            'https://api.puter.com/*' => Http::response([], 500),
        ]);

        config(['services.puter.key' => 'test-key']);

        $theme = Theme::create([
            'name' => 'test-theme',
        ]);

        (new GenerateThemeMetadataJob($theme))->handle(app(AiService::class));

        $theme->refresh();

        $this->assertNull($theme->description);
        $this->assertCount(0, $theme->tags);
    }
}
