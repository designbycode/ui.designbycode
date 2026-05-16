<?php

use App\Models\Theme;
use App\Models\User;
use App\Services\AiService;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
    $user = User::factory()->create();

    $mock = Mockery::mock(AiService::class);
    $mock->shouldReceive('generateFullTheme')
        ->once()
        ->with('blue theme')
        ->andReturn([
            'title' => 'Blue Theme',
            'name' => 'blue-theme',
            'vars_light' => ['primary' => '221.2 83.2% 53.3%'],
            'vars_dark' => ['primary' => '217.2 91.2% 59.8%'],
            'description' => 'A nice blue theme',
            'tags' => ['blue', 'modern'],
        ]);

    $this->app->instance(AiService::class, $mock);

    $response = $this->actingAs($user)->post(route('themes.generate'), [
        'prompt' => 'blue theme',
    ]);

    $response->assertStatus(200);
    $this->assertEquals('blue-theme', $response->json('name'));
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
