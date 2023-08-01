<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class TaskController extends Controller
{
 

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Task::all()->load('checklist');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'checklist_id' => 'required|integer|exists:checklists,id'
        ]);

        $task = Task::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created!',
            'task' => $task->load('checklist')
        ], 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Task::find($id)->load('checklist');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'checklist_id' => 'integer|exists:checklists,id'
        ]);
        $task->update($validated);
        return response()->json([
            'status' => 'success',
            'message' => 'Task updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public static function destroy(string $id)
    {
        $taskToDelete = Task::findOrFail($id);
        $taskToDelete->delete();
    }
}
