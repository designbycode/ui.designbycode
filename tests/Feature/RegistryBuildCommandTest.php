<?php

use App\Models\Registry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;

uses(RefreshDatabase::class);

test('registry build command scans files and generates database items and seeder', function () {
    // Create first user in database to satisfy foreign key constraint on user_id
    User::factory()->create();

    // Ensure database is empty before running command
    expect(Registry::count())->toBe(0);

    // Assert the seeder file doesn't exist or we will check that it gets written
    $seederPath = database_path('seeders/RegistrySeeder.php');
    if (File::exists($seederPath)) {
        File::delete($seederPath);
    }
    expect(File::exists($seederPath))->toBeFalse();

    // Run the artisan command
    $this->artisan('registry:build')
        ->expectsOutput('Scanning resources/js/registry/new-york...')
        ->expectsOutput('Resolving file contents and dependencies...')
        ->expectsOutput('Generating RegistrySeeder.php...')
        ->expectsOutput('Running RegistrySeeder to seed/update database...')
        ->assertExitCode(0);

    // 1. Assert that the seeder file was created
    expect(File::exists($seederPath))->toBeTrue();

    // 2. Assert that items were seeded to database
    expect(Registry::count())->toBeGreaterThan(0);

    // 3. Assert a specific hook item exists and was parsed correctly
    $useHover = Registry::where('name', 'use-hover')->first();
    expect($useHover)->not->toBeNull()
        ->and($useHover->type)->toBe('registry:hook')
        ->and($useHover->files)->toBeArray()
        ->and(count($useHover->files))->toBe(1)
        ->and($useHover->files[0]['content'])->toContain('export function useHover');

    // 4. Assert a specific UI component item exists and was parsed correctly
    $textAnimator = Registry::where('name', 'text-animator')->first();
    expect($textAnimator)->not->toBeNull()
        ->and($textAnimator->type)->toBe('registry:ui')
        ->and($textAnimator->dependencies)->toContain('gsap')
        ->and($textAnimator->dependencies)->toContain('@gsap/react')
        ->and($textAnimator->files)->toBeArray()
        ->and(count($textAnimator->files))->toBe(1)
        ->and($textAnimator->files[0]['content'])->toContain('export type AnimationType');

    // 4b. Assert the newly added numeric / formatted inputs are parsed correctly
    $inputPhone = Registry::where('name', 'input-phone')->first();
    expect($inputPhone)->not->toBeNull()
        ->and($inputPhone->type)->toBe('registry:ui')
        ->and($inputPhone->dependencies)->toContain('lucide-react')
        ->and($inputPhone->registryDependencies)->toContain('input');

    $inputCurrency = Registry::where('name', 'input-currency')->first();
    expect($inputCurrency)->not->toBeNull()
        ->and($inputCurrency->type)->toBe('registry:ui')
        ->and($inputCurrency->registryDependencies)->toContain('input');

    $inputNumber = Registry::where('name', 'input-number')->first();
    expect($inputNumber)->not->toBeNull()
        ->and($inputNumber->type)->toBe('registry:ui')
        ->and($inputNumber->dependencies)->toContain('lucide-react')
        ->and($inputNumber->registryDependencies)->toContain('input');

    // 5. Assert a specific multi-file block component exists and was parsed correctly
    $musicPlayer = Registry::where('name', 'music-player')->first();
    expect($musicPlayer)->not->toBeNull()
        ->and($musicPlayer->type)->toBe('registry:block')
        ->and($musicPlayer->registryDependencies)->toContain(url('r/audio-context.json'))
        ->and($musicPlayer->files)->toBeArray()
        ->and(count($musicPlayer->files))->toBe(8); // music-player folder has 8 files

    // 6. Assert local/standard dependency resolution
    $pixelCanvas = Registry::where('name', 'pixel-canvas')->first();
    expect($pixelCanvas)->not->toBeNull()
        ->and($pixelCanvas->registryDependencies)->toContain('utils')
        ->and($pixelCanvas->registryDependencies)->toContain(url('r/use-pixel-canvas.json'));

});
