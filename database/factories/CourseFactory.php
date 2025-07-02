<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = ['math', 'web development', 'science','graphic design','english', 'turkish', 'germany',
        'machine learning', 'ai'];
        return [
            'name' => fake()->randomElement($course),
            'description' => fake()->sentence(),
            'duration' => fake()->numberBetween(1, 300),
        ];
    }
}
