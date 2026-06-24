<?php

use App\Models\Registry;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from components dashboard', function () {
    $response = $this->get(route('dashboard.components.index'));
    $response->assertRedirect(route('login'));
});

test('non-admin users cannot access the components dashboard', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    // Create a first user so the next one isn't ID 1
    User::factory()->create();

    $user = User::factory()->create();
    $user->assignRole('guest');
    $this->actingAs($user);

    $response = $this->get(route('dashboard.components.index'));
    $response->assertForbidden();
});

test('authenticated admins can view the components dashboard list', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    Registry::forceCreate([
        'name' => 'test-component',
        'type' => 'registry:ui',
        'title' => 'Test Component',
        'description' => 'Test description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => [],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->get(route('dashboard.components.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard/components/index')
        ->has('components')
    );
});

test('admins can access the create component page', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('dashboard.components.create'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard/components/create')
        ->has('categories')
    );
});

test('admins can store a new component', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('dashboard.components.store'), [
        'name' => 'new-test-component',
        'title' => 'New Test Component',
        'type' => 'registry:ui',
        'description' => 'A beautiful new button component',
        'author' => 'designbycode',
        'categories' => ['buttons'],
        'dependencies' => ['framer-motion'],
        'registryDependencies' => ['button'],
        'files' => [
            ['path' => 'components/new-button.tsx', 'type' => 'registry:ui', 'content' => 'export const NewButton = () => {}'],
        ],
    ]);

    $response->assertRedirect(route('dashboard.components.index'));
    $this->assertDatabaseHas('registries', [
        'name' => 'new-test-component',
        'title' => 'New Test Component',
        'user_id' => $user->id,
    ]);
});

test('admins can access the edit component page', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    Registry::forceCreate([
        'name' => 'edit-test-component',
        'type' => 'registry:ui',
        'title' => 'Edit Test Component',
        'description' => 'Test description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => [],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->get(route('dashboard.components.edit', ['name' => 'edit-test-component']));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard/components/edit')
        ->has('component')
        ->where('component.name', 'edit-test-component')
    );
});

test('admins can update a component', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $registry = Registry::forceCreate([
        'name' => 'update-test-component',
        'type' => 'registry:ui',
        'title' => 'Original Title',
        'description' => 'Original description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => [],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->put(route('dashboard.components.update', ['name' => 'update-test-component']), [
        'title' => 'Updated Title',
        'type' => 'registry:ui',
        'description' => 'Updated description',
        'author' => 'designbycode-new',
        'categories' => ['buttons', 'inputs'],
        'dependencies' => ['framer-motion'],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
    ]);

    $response->assertRedirect(route('dashboard.components.index'));
    $this->assertDatabaseHas('registries', [
        'name' => 'update-test-component',
        'title' => 'Updated Title',
        'author' => 'designbycode-new',
    ]);
});

test('admins can delete a component', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    Registry::forceCreate([
        'name' => 'delete-test-component',
        'type' => 'registry:ui',
        'title' => 'Delete Test Component',
        'description' => 'Test description',
        'categories' => ['buttons'],
        'author' => 'designbycode',
        'dependencies' => [],
        'registryDependencies' => [],
        'files' => [['path' => 'components/test.tsx', 'type' => 'registry:ui', 'content' => 'code']],
        'user_id' => $user->id,
    ]);

    $response = $this->delete(route('dashboard.components.destroy', ['name' => 'delete-test-component']));
    $response->assertRedirect(route('dashboard.components.index'));

    $this->assertSoftDeleted('registries', [
        'name' => 'delete-test-component',
    ]);
});
