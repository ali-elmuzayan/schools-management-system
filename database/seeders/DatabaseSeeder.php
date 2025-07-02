<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollments;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
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

        School::factory(10)->create();

        // create teachers for each school
        $schools = School::pluck('id', 'tenant_id')->toArray();

        foreach ($schools as $school_id => $tenant_id ) {
            Course::factory(10)->create([
                'tenant_id' => $tenant_id,
                'school_id' => $school_id
            ]);
            Teacher::factory(10)->create([
                'tenant_id' => $tenant_id,
                'school_id' => $school_id,
            ]);

            Student::factory(10)->create([
                'tenant_id' => $tenant_id,
                'school_id' => $school_id
            ]);


            // Enrollments::factory(10)->create([
            //     'tenant_id' => $tenant_id,
            //     'school_id' => $school_id
            // ]);
        }


    }
}
