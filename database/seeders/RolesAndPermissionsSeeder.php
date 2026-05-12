<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::firstOrCreate(['name' => 'access dashboard']);

        // create roles and assign created permissions
        Role::firstOrCreate(['name' => 'guest']);

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo('access dashboard');

        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Assign super-admin to the first user
        $user = User::find(1);
        if ($user) {
            $user->assignRole('super-admin');
        }
    }
}
