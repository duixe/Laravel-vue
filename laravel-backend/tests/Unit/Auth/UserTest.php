<?php

namespace Tests\Unit\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
    }
    
    /**
     * Test for User Registration
     *
     * @return void
     */
    public function testIsUserRegisteredIfAllInputAreValid()
    {
        $input = [
            'name' => 'My fullname',
            'email' => 'duixe@gmail.com',
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ];

        $response = $this->json('POST', route('auth.register'), $input);
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'status',
            'data' => [
                'access_token',
                'user'
            ]
        ]);

    }
}
