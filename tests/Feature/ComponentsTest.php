<?php

use App\Models\Registry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('components index page is accessible and lists components', function () {
    $user = User::factory()->create();

    // Create a dummy registry item
    Registry::forceCreate([
        'name' => 'test-component',
        'type' => 'registry:ui',
        'title' => 'Test Component',
        'description' => 'A test description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => ['lodash'],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->get(route('components.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('components/index')
        ->has('components')
        ->has('categories')
    );
});

test('single component show page is accessible', function () {
    $user = User::factory()->create();

    Registry::forceCreate([
        'name' => 'test-component',
        'type' => 'registry:ui',
        'title' => 'Test Component',
        'description' => 'A test description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => ['lodash'],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->get(route('components.show', ['component' => 'test-component']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('components/show')
        ->has('component')
        ->where('component.name', 'test-component')
        ->has('sidebarItems')
    );
});

test('non-existent component show page returns 404', function () {
    $response = $this->get(route('components.show', ['component' => 'non-existent']));
    $response->assertStatus(404);
});
