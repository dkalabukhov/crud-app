<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia;
use App\Models\users;

class InertiaTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_should_show_the_create_page_without_errors(): void
    {
        $this
            ->get(route('users.create'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Create')
                    ->where('errors', [])
            );
    }

    public function test_it_should_return_errors_when_required_fields_fail_validation(): void
    {
        $this->get(route('users.create'));

        $this
            ->followingRedirects()
            ->post(route('users.store'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Create')
                    ->where('errors.email', 'The email field is required.')
                    ->where('errors.name', 'The name field is required.')
                    ->where('errors.sex', 'The sex field is required.')
                    ->where('errors.birthday', 'The birthday field is required.')
            );
    }


    public function test_it_should_create_a_new_user(): void
    {
        $this->get(route('users.create'));

        $this
            ->followingRedirects()
            ->post(route('users.store'), [
                'email' => 'daniil.kalabukhov@gmail.com',
                'name' => 'Daniil Kalabukhov',
                'sex' => 'male',
                'birthday' => '1998-06-08',
            ])
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Home')
                    ->where('errors', [])
                    ->where('flash.message', 'The user was created successfully')
                    ->where('users.0.email', 'daniil.kalabukhov@gmail.com')
                    ->where('users.0.name', 'Daniil Kalabukhov')
                    ->where('users.0.sex', 'male')
                    ->where('users.0.birthday', '1998-06-08')
            );
    }

    public function test_it_should_delete_the_user()
    {
        $user = users::factory()->create();

        $this->delete(route('users.destroy', $user));

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_it_should_edit_the_user()
    {
        $user = users::factory()->create();

        $newData = [
            'name' => 'New Name',
            'email' => 'newemail@example.com',
            'sex' => 'male',
            'birthday' => '1998-06-08',
        ];

        $this->get(route('users.show', $user))
            ->assertOk();

        $this->put(route('users.update', $user), $newData);

        $this->get('/')
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                ->component('Home')
                ->where('users.0.email', 'newemail@example.com')
                ->Where('users.0.name', 'New Name')
                ->where('users.0.sex', 'male')
                ->where('users.0.birthday', '1998-06-08')
            );
    }
}
