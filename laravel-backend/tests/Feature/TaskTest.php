<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use App\Models\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->authUser();
    }

    /**
     * Test to get all user's tasks
     *
     * @return void
     */
    public function testGetUserTasks()
    {
        Task::factory()->count(3)->create();
        $response = $this->json('GET', route('tasks.index'));

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data'
                ]);
    }

    /**
     * Test to create task
     *
     * @return void
     */
    public function testCreateTask()
    {
        $input = [
            'title' => 'IO first task',
            'description' => 'A fullstack app creation task',
            'completed' => true
        ];
        
        $response = $this->json('POST', route('tasks.store'), $input);
        
        $response->assertStatus(201)
                ->assertJsonStructure([
                    'data'
                ]);
    }

    /**
     * Test to View task
     *
     * @return void
     */
    public function testViewASingleTask()
    {
        $task = Task::factory()->create();
        
        $response = $this->json('GET', route('tasks.show', $task->id));
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data'
                ]);
    }

    /**
     * Test to Update User's task
     *
     * @return void
     */
    public function testUpdateUserTask()
    {
        $task = Task::factory()->create([
            'user_id' => $this->authUser()->id,
            'title' => 'new title',
            'completed' => false
        ]);

        $input = [
            'title' => 'new title',
            'completed' => true
        ];
        
        $response = $this->json('PATCH', route('tasks.update', $task->id), $input);
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data'
                ]);
    }

    /**
     * Test to Update User's task
     *
     * @return void
     */
    public function testCanDIfferentUserUpdateAnotherUserTask()
    {
        $task = Task::factory()->create([
            'title' => 'new title',
            'completed' => false
        ]);

        $input = [
            'title' => 'new title',
            'completed' => true
        ];
        
        $response = $this->json('PATCH', route('tasks.update', $task->id), $input);
        
        $response->assertStatus(403)
                ->assertJsonStructure([
                    'status',
                    'message'
                ]);
    }

    /**
     * Test to Delete User's task
     *
     * @return void
     */
    public function testDeleteUserTask()
    {
        $task = Task::factory()->create([
            'user_id' => $this->authUser()->id
        ]);

        
        $response = $this->json('DELETE', route('tasks.destroy', $task->id));
        
        $response->assertNoContent(204);
    }

}
