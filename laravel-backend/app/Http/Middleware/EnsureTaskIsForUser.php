<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Model\Task;

class EnsureTaskIsForUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        //check whether task (passed in as a param) user_id == auth user->id
        if (
            $request->task->user_id !==
            auth()->user()->id
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'sorry, you cant access this task'
            ], 403);
        }

        return $next($request);
    }
}
