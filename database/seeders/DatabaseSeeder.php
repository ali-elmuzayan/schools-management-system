<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollments;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $tenants =  Tenant::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'ali@gmail.com',
            'tenant_id' => 1
        ]);

        foreach($tenants as $tenant) {
            User::factory()->create([
                'tenant_id' => $tenant->id
            ]);

            Teacher::factory(10)->create([
                'tenant_id' => $tenant->id
            ]);

            Student::factory(10)->create([
                'tenant_id' => $tenant->id
            ]);

            Course::factory(10)->create([
                'tenant_id' => $tenant->id
            ]);
        }



    }
}
