<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Claude Myburgh',
            'email' => 'claude@designbycode.co.za',
        ]);

        $this->call([
            ThemeSeeder::class,
            TagsSeeder::class,
            AnimateSeeder::class,
            FontSeeder::class,
        ]);
    }
}
