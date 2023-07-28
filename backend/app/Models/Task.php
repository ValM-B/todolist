<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status', 'checklist_id'];

    /**
     * Defines the "BelongsTo" relationship between Checklist model ans the Task model
     * 
     * @return BelongsTo
     */
    public function checklist():BelongsTo
    {
        return $this->belongsTo(Checklist::class);
    }
}
