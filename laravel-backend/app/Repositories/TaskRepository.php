<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskRepository implements TaskRepositoryInterface
{
    public function get()
    {
        return auth()->user()->tasks;
    }

    public function create(Request $request)
    {
        return auth()->user()->tasks()->create($request->validated());
    }

    public function show($task)
    {
        //
    }

    public function update(array $validated, Task $task)
    {
        return $task->update($validated);
    }

    public function delete($task)
    {
        //
    }
}
