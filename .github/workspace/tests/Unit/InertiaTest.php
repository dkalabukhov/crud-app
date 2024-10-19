<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia;

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

    public function test_it_should_return_errors_when_required_fileds_fail_validation(): void
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
            );
    }
}
