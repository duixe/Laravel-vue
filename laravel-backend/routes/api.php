<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\RegistrationController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', RegistrationController::class)->name('auth.register');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::apiResource('tasks', TaskController::class);
});

