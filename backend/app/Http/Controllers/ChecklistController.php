<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Checklist;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Checklist::all()->load('category', 'tasks');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'category_id' => 'required|integer|exists:categories,id'
        ]);

        $checklist = Checklist::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Checklist created!',
            'checklist' => $checklist
        ], 201); 
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Checklist::findOrFail($id)->load('category', 'tasks');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $checklist = Checklist::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $checklist->update($validated);
        return response()->json([
            'status' => 'success',
            'message' => 'Checklist updated!'

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $checklistToDelete = Checklist::findOrFail($id);
        $checklistToDelete->delete();
    }
}
