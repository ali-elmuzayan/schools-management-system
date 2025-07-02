<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Tenant::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'ali@gmail.com',
            'tenant_id' => 1
        ]);
    }
}
