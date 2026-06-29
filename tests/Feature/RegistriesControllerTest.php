<?php

use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    User::factory()->create(['id' => 1]);
});

test('theme registry endpoint returns the theme successfully', function () {
    $theme = Theme::factory()->create([
        'name' => 'japanese-zen',
        'css' => [],
        'vars_light' => [],
        'vars_dark' => [],
        'font_family' => null,
    ]);

    $response = $this->get('/r/themes/japanese-zen.json');

    $response->assertOk()
        ->assertJson([
            'name' => 'japanese-zen',
            'type' => 'registry:theme',
        ]);
});

test('theme registry endpoint omits empty css field to avoid empty array schema mismatch', function () {
    $theme = Theme::factory()->create([
        'name' => 'japanese-zen',
        'css' => [],
    ]);

    $response = $this->get('/r/themes/japanese-zen.json');

    $response->assertOk();
    $data = $response->json();
    expect($data)->not->toHaveKey('css');
});

test('theme registry endpoint includes css field when it is populated', function () {
    $theme = Theme::factory()->create([
        'name' => 'japanese-zen',
        'css' => [
            '@layer base' => [
                'body' => [
                    'background' => 'var(--background)',
                ],
            ],
        ],
    ]);

    $response = $this->get('/r/themes/japanese-zen.json');

    $response->assertOk();
    $data = $response->json();
    expect($data)->toHaveKey('css')
        ->and($data['css'])->toBeArray(); // Since decoded from JSON object into PHP associative array
});

test('theme registry endpoint omits empty cssVars field', function () {
    $theme = Theme::factory()->create([
        'name' => 'japanese-zen',
        'vars_light' => [],
        'vars_dark' => [],
        'vars_theme' => [],
        'font_family' => null,
        'font_mono' => null,
        'font_serif' => null,
    ]);

    $response = $this->get('/r/themes/japanese-zen.json');

    $response->assertOk();
    $data = $response->json();
    expect($data)->not->toHaveKey('cssVars');
});

test('theme registry endpoint includes cssVars when populated', function () {
    $theme = Theme::factory()->create([
        'name' => 'japanese-zen',
        'vars_light' => [
            'background' => 'oklch(0.97 0.01 90)',
        ],
    ]);

    $response = $this->get('/r/themes/japanese-zen.json');

    $response->assertOk();
    $data = $response->json();
    expect($data)->toHaveKey('cssVars')
        ->and($data['cssVars'])->toBeArray();
});
