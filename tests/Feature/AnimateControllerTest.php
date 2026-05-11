<?php

use App\Models\User;
use Database\Seeders\AnimateSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    User::factory()->create(['id' => 1]);
    $this->seed(AnimateSeeder::class);
});

test('index returns a successful response', function () {
    $response = $this->get(route('animate-css.index'));

    $response->assertOk();
});

test('index renders the correct Inertia component', function () {
    $response = $this->get(route('animate-css.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('animate-css/index'),
    );
});

test('index returns animations with the correct structure', function () {
    $response = $this->get(route('animate-css.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('animations')
        ->has('categories'),
    );
});

test('index returns bounce animation as first entry', function () {
    $response = $this->get(route('animate-css.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->where('animations.0.name', 'animate-bounce')
        ->where('animations.0.text', 'Bounce'),
    );
});

test('index returns sorted categories', function () {
    $response = $this->get(route('animate-css.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->where('categories', ['animations']),
    );
});

test('show returns JSON for existing animation', function () {
    $response = $this->get('/r/animate-css/animate-bounce.json');

    $response->assertOk()
        ->assertJsonStructure([
            'name',
            'title',
            'type',
            'meta',
            'author',
            'description',
            'cssVars',
            'css',
        ]);
});

test('show returns the correct animation data', function () {
    $response = $this->get('/r/animate-css/animate-bounce.json');

    $response->assertJson([
        'name' => 'animate-bounce',
        'title' => 'Animate Bounce',
        'type' => 'registry:style',
        'author' => 'designbycode',
    ]);
});

test('show includes cssVars with app wrapper', function () {
    $response = $this->get('/r/animate-css/animate-bounce.json');

    $response->assertJson([
        'cssVars' => [
            'app' => [
                '--animate-bounce' => 'bounce 1s',
            ],
        ],
    ]);
});

test('show returns 404 for non-existent animation', function () {
    $response = $this->get('/r/animate-css/non-existent.json');

    $response->assertNotFound();
});

test('show returns 404 for empty name', function () {
    $response = $this->get('/r/animate-css/.json');

    $response->assertNotFound();
});
