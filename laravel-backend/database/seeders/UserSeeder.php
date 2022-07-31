<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(3)->create()->each(function($user) {
            //seed each user with 4 task
            $tasks = Task::factory()->count(4)->make();
            $user->tasks()->saveMany($tasks);
        });
    }
}
