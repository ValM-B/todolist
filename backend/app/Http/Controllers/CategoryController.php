<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Checklist;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Category::all()->load(['checklists']);;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'picture' => 'required|string'
        ]);

        $category = Category::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Category created!',
            'category' => $category
        ], 201); 
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Category::find($id)->load(['checklists']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'picture' => 'required|string'
        ]);
        $category->update($validated);
        return response()->json([
            'status' => 'success',
            'message' => 'Category updated!'
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoryToDelete = Category::findOrFail($id)->load(['checklists']);
        if($categoryToDelete["checklists"]){
            foreach ($categoryToDelete["checklists"] as $checklist) {
                ChecklistController::destroy($checklist["id"]);
            }
        }
        $categoryToDelete->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted!'
        
        ]);
    }
}
