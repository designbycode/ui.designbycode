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
}
