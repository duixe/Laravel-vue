<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;

interface TaskRepositoryInterface
{
    public function get();

    public function create(Request $request);

    public function show(Task $task);

    public function update(array $validated, Task $task);

    public function delete(Task $task);
   
}