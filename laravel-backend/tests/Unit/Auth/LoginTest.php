<?php

namespace Tests\Unit\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic unit test whether is successfully logged in.
     *
     * @return void
     */
    public function testUserLoggedInWithValidCredentials()
    {
        User::factory()->create([
            'email' => 'duixe@gmail.com'
        ]);

        $input = [
           'email' => 'duixe@gmail.com',
           'password' => 'password'
        ];

        $response = $this->json('POST', route('auth.login'), $input);
        $response->assertOk();
        $response->assertJsonStructure([
           'status',
           'data' => [
                'access_token', 'user'
           ]
        ]);
    }

    /**
     * A basic unit test whether is successfully logged in.
     *
     * @return void
     */
    public function testTokenNotGeneratedIfCredentialsIsNotValid()
    {
        User::factory()->create([
            'email' => 'duixe@gmail.com'
        ]);

        $input = [
           'email' => 'duixe@gmail.com',
           'password' => 'password23'
        ];

        $response = $this->json('POST', route('auth.login'), $input);
        $response->assertStatus(401);
        $response->assertJsonStructure([
            'status',
            'message'
         ]);
    }
}
