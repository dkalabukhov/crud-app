<?php

namespace Database\Factories;

require_once 'vendor/autoload.php';

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\users>
 */
class UsersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male', 'female']);
        return [
            'email' => $this->faker->email(),
            'name' => $this->faker->name($gender),
            'sex' => $gender,
            'birthday' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
        ];
    }
}
