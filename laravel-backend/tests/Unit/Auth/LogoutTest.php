<?php

namespace Tests\Unit\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->authUser();
    }

    /**
     * A basic unit test to delet user token a.k.a logout
     *
     * @return void
     */
    public function testIsUserLoggedOut()
    {
        $response = $this->json('POST', route('auth.logout'));
        $response->assertOk()
                ->assertJsonStructure([
                    'status',
                    'message'
                ]);

    }
}
