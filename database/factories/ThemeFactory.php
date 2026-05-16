<?php

namespace Database\Factories;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Theme>
 */
class ThemeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->slug();

        return [
            'user_id' => User::factory(),
            'name' => $name,
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'vars_light' => [
                'background' => '0 0% 100%',
                'foreground' => '240 10% 3.9%',
                'primary' => '240 5.9% 10%',
            ],
            'vars_dark' => [
                'background' => '240 10% 3.9%',
                'foreground' => '0 0% 98%',
                'primary' => '0 0% 98%',
            ],
        ];
    }
}
