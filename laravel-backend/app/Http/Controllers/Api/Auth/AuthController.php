<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * try to authenticate a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            $token = $request->user()->createToken('api');
 
            return response()->json([
                'status' => 'success',
                'data'=> [
                    'access_token'=> $token->plainTextToken,
                    'user'=> $request->user(),
                ]
            ], 200);
        }
 
        return response()->json([
            'status' => 'error',
            'message' => 'sorry, wrong credentials'
        ], 401);
    }

    /**
     * LOg user out of the system.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful'
        ], 200);
    }
}
