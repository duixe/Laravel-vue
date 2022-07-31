<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegistrationRequest;

class RegistrationController extends Controller
{   

    /**
     * Store a newly created user resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegistrationRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api');

        return response()->json([
            'status' => 'success',
            'data' => [
                'access_token' => $token->plainTextToken,
                'user' => $user
            ]
        ], 201);
    }
}
