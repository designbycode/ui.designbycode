<?php

use App\Models\Theme;
use App\Models\User;
use Database\Seeders\FontSeeder;
use Database\Seeders\ThemeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('theme seeder correctly seeds garden-shed theme', function () {
    User::factory()->create(['id' => 1]);

    $this->seed([FontSeeder::class, ThemeSeeder::class]);

    $theme = Theme::where('name', 'garden-shed')->first();

    expect($theme)->not->toBeNull();
    expect($theme->title)->toBe('Garden Shed');
    expect($theme->description)->toContain('rustic workspace theme');
    expect($theme->font_family)->toBe('Geist Variable, sans-serif');

    // Test vars_theme configuration
    expect($theme->vars_theme)->toBeArray();
    expect($theme->vars_theme['font-sans'])->toBe('Geist Variable, sans-serif');
    expect($theme->vars_theme['radius'])->toBe('0.75rem');

    // Test light/dark mode variables
    expect($theme->vars_light)->toBeArray();
    expect($theme->vars_light['primary'])->toBe('oklch(0.7245 0.0998 82.35)');
    expect($theme->vars_light['secondary'])->toBe('oklch(0.95 0.018 125)');

    expect($theme->vars_dark)->toBeArray();
    expect($theme->vars_dark['primary'])->toBe('oklch(0.7245 0.0998 82.35)');
    expect($theme->vars_dark['secondary'])->toBe('oklch(0.30 0.025 125)');

    // Test base css rules
    expect($theme->css)->toBeArray();
    expect($theme->css['@layer base']['*']['@apply'])->toBe('border-border outline-ring/50');

    // Test dynamic font dependencies resolution
    $registryPayload = $theme->toRegistry();
    expect($registryPayload['dependencies'])->toContain('@fontsource-variable/geist');
});
