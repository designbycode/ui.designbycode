<?php

namespace Tests\Feature\Auth;

use App\Models\Social;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Tests\TestCase;

class SocialiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_socialite_redirects_to_provider()
    {
        $response = $this->get(route('socialite.redirect', 'github'));

        $response->assertRedirect();
        $this->assertStringContainsString('github.com', $response->getTargetUrl());
    }

    public function test_socialite_can_authenticate_and_create_user()
    {
        $socialiteUser = $this->createMock(SocialiteUser::class);
        $socialiteUser->method('getId')->willReturn('12345');
        $socialiteUser->method('getEmail')->willReturn('test@example.com');
        $socialiteUser->method('getName')->willReturn('Test User');
        $socialiteUser->method('getNickname')->willReturn('testuser');
        $socialiteUser->method('getAvatar')->willReturn('https://example.com/avatar.jpg');

        Socialite::shouldReceive('driver->user')->andReturn($socialiteUser);

        $response = $this->get(route('socialite.callback', 'github'));

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('Test User', $user->name);

        $social = Social::where('user_id', $user->id)->first();
        $this->assertNotNull($social);
        $this->assertEquals('github', $social->provider);
        $this->assertEquals('12345', $social->provider_id);
    }

    public function test_socialite_can_link_existing_user_by_email()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $socialiteUser = $this->createMock(SocialiteUser::class);
        $socialiteUser->method('getId')->willReturn('12345');
        $socialiteUser->method('getEmail')->willReturn('test@example.com');
        $socialiteUser->method('getName')->willReturn('Test User');
        $socialiteUser->method('getNickname')->willReturn('testuser');
        $socialiteUser->method('getAvatar')->willReturn('https://example.com/avatar.jpg');

        Socialite::shouldReceive('driver->user')->andReturn($socialiteUser);

        $response = $this->get(route('socialite.callback', 'github'));

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($user);

        $social = Social::where('user_id', $user->id)->first();
        $this->assertNotNull($social);
        $this->assertEquals('github', $social->provider);
    }
}
