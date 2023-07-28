<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'picture', 'status'];
    
    /**
     * Defines the "OnetoMany" relationship between the Category model and the Checklist model
     * 
     * @return HasMany
     */
    public function checklists(): HasMany
    {
        return $this->hasMany(Checklist::class);
    }
}
