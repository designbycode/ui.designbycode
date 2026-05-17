<?php

use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

test('themes index page is accessible', function () {
    $response = $this->get(route('themes.index'));
    $response->assertStatus(200);
});

test('themes create page requires authentication', function () {
    $response = $this->get(route('themes.create'));
    $response->assertRedirect(route('login'));
});

test('authenticated user can access themes create page', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get(route('themes.create'));
    $response->assertStatus(200);
});

test('user can store theme via direct data', function () {
    $user = User::factory()->create();

    $themeData = [
        'name' => 'test-theme',
        'title' => 'Test Theme',
        'vars_light' => ['primary' => '0 0% 0%'],
        'vars_dark' => ['primary' => '0 0% 100%'],
    ];

    $response = $this->actingAs($user)->post(route('themes.store'), [
        'theme_data' => $themeData,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('themes', ['name' => 'test-theme']);
});

test('user can generate theme via AI', function () {
    Http::fake([
        'https://api.puter.com/puterai/openai/v1/chat/completions' => Http::response([
            'choices' => [
                [
                    'message' => [
                        'content' => json_encode([
                            'title' => 'Blue Theme',
                            'description' => 'A nice blue theme',
                            'tags' => ['blue', 'modern'],
                            'font_family' => 'Inter',
                            'vars_light' => [
                                'background' => '221.2 83.2% 95%',
                                'foreground' => '221.2 83.2% 10%',
                                'primary' => '221.2 83.2% 53.3%',
                                'primary-foreground' => '0 0% 100%',
                                'secondary' => '221.2 50% 90%',
                                'secondary-foreground' => '221.2 83.2% 10%',
                                'muted' => '221.2 30% 95%',
                                'muted-foreground' => '221.2 10% 40%',
                                'accent' => '221.2 50% 90%',
                                'accent-foreground' => '221.2 83.2% 10%',
                                'destructive' => '0 84.2% 60.2%',
                                'destructive-foreground' => '0 0% 98%',
                                'card' => '0 0% 100%',
                                'card-foreground' => '221.2 83.2% 10%',
                                'popover' => '0 0% 100%',
                                'popover-foreground' => '221.2 83.2% 10%',
                                'border' => '221.2 30% 85%',
                                'input' => '221.2 30% 85%',
                                'ring' => '221.2 83.2% 53.3%',
                                'radius' => '0.5rem',
                            ],
                            'vars_dark' => [
                                'background' => '221.2 83.2% 10%',
                                'foreground' => '221.2 10% 95%',
                                'primary' => '217.2 91.2% 59.8%',
                                'primary-foreground' => '0 0% 100%',
                                'secondary' => '221.2 30% 20%',
                                'secondary-foreground' => '221.2 10% 95%',
                                'muted' => '221.2 30% 15%',
                                'muted-foreground' => '221.2 10% 65%',
                                'accent' => '221.2 30% 20%',
                                'accent-foreground' => '221.2 10% 95%',
                                'destructive' => '0 62.8% 30.6%',
                                'destructive-foreground' => '0 0% 98%',
                                'card' => '221.2 83.2% 12%',
                                'card-foreground' => '221.2 10% 95%',
                                'popover' => '221.2 83.2% 12%',
                                'popover-foreground' => '221.2 10% 95%',
                                'border' => '221.2 30% 20%',
                                'input' => '221.2 30% 20%',
                                'ring' => '217.2 91.2% 59.8%',
                                'radius' => '0.5rem',
                            ],
                        ]),
                    ],
                ],
            ],
        ], 200),
    ]);

    config(['services.puter.key' => 'test-key']);
    config(['services.puter.model' => 'test-model']);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('themes.generate'), [
        'prompt' => 'blue theme',
    ]);

    $response->assertStatus(200);
    expect($response->json('name'))->toBe('blue-theme');
    expect($response->json('title'))->toBe('Blue Theme');
    expect($response->json('description'))->toBe('A nice blue theme');
    expect($response->json('tags'))->toBe(['blue', 'modern']);
    expect($response->json('vars_light.primary'))->toBe('221.2 83.2% 53.3%');
    expect($response->json('vars_dark.primary'))->toBe('217.2 91.2% 59.8%');
    expect($response->json('font_family'))->toBe('Inter');
});

test('ai generate returns 500 when openrouter api fails', function () {
    Http::fake([
        'https://api.puter.com/puterai/openai/v1/chat/completions' => Http::response([], 500),
    ]);

    config(['services.puter.key' => 'test-key']);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('themes.generate'), [
        'prompt' => 'blue theme',
    ]);

    $response->assertStatus(500);
    expect($response->json('error'))->toBe('Failed to generate theme.');
});

test('ai generate returns 500 when no api key is configured', function () {
    config(['services.puter.key' => null]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('themes.generate'), [
        'prompt' => 'blue theme',
    ]);

    $response->assertStatus(500);
    expect($response->json('error'))->toBe('Failed to generate theme.');
});

test('forking a theme passes base theme data to view', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create(['name' => 'original-theme']);

    $response = $this->actingAs($user)->get(route('themes.create', ['fork' => 'original-theme']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('themes/create')
        ->has('baseTheme')
        ->where('baseTheme.name', 'original-theme')
    );
});
