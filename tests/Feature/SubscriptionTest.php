<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_pricing_page_is_accessible()
    {
        $response = $this->get('/pricing');

        $response->assertStatus(200);
    }

    public function test_subscription_edit_page_requires_auth()
    {
        $response = $this->get('/settings/subscription');

        $response->assertRedirect('/login');
    }

    public function test_subscription_edit_page_is_accessible_to_authenticated_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/settings/subscription');

        $response->assertStatus(200);
    }

    public function test_checkout_requires_valid_price_id()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/settings/subscription/checkout', [
            'price_id' => 'invalid_id',
        ]);

        $response->assertSessionHas('error', 'Please select a valid plan.');
    }

    public function test_checkout_returns_paddle_options()
    {
        $this->markTestSkipped('Paddle API interaction requires valid API keys or more extensive mocking.');

        config(['cashier.api_key' => 'test_api_key']);
        config(['cashier.seller_id' => 'test_seller_id']);

        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/settings/subscription/checkout', [
            'price_id' => 'pri_123',
        ]);

        $response->assertSessionHas('checkout');
    }
}
