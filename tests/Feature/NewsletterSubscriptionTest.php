<?php

use App\Models\NewsletterSubscription;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can subscribe to newsletter', function () {
    $response = $this->post(route('newsletter.subscribe'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('newsletter_subscriptions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ]);
});

test('email must be unique', function () {
    NewsletterSubscription::factory()->create(['email' => 'jane@example.com']);

    $response = $this->post(route('newsletter.subscribe'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ]);

    $response->assertSessionHasErrors('email');
});

test('name is required', function () {
    $response = $this->post(route('newsletter.subscribe'), [
        'email' => 'jane@example.com',
    ]);

    $response->assertSessionHasErrors('name');
});

test('email must be valid', function () {
    $response = $this->post(route('newsletter.subscribe'), [
        'name' => 'Jane Doe',
        'email' => 'not-an-email',
    ]);

    $response->assertSessionHasErrors('email');
});
