<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated super-admins can visit the dashboard', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('super-admin');
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('authenticated admins can visit the dashboard', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('authenticated guests cannot visit the dashboard', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a dummy first user so the next one isn't ID 1
    User::factory()->create();

    $user = User::factory()->create();
    $user->assignRole('guest');
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertForbidden();
});

test('authenticated subscribed users can visit the dashboard', function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $user = User::factory()->create();
    $user->assignRole('guest');

    // Mock the subscribed method
    $user->subscriptions()->create([
        'type' => 'default',
        'paddle_id' => 'sub_123',
        'status' => 'active',
        'trial_ends_at' => null,
        'paused_at' => null,
        'ends_at' => null,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});
