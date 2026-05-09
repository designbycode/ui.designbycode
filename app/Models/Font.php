<?php

namespace App\Models;

use App\Concerns\HasFont;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name', 'title', 'type', 'author', 'user_id',
    'meta', 'categories',
    'registryDependencies', 'dependencies', 'devDependencies', 'files',
    'font_family', 'font_provider', 'font_import', 'font_variable',
    'font_weight', 'font_subsets', 'font_selector', 'font_dependency',
])]
class Font extends Model
{
    use HasFont, SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRouteKeyName(): string
    {
        return 'name';
    }

    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'categories' => 'array',
            'registryDependencies' => 'array',
            'dependencies' => 'array',
            'devDependencies' => 'array',
            'files' => 'array',
            'font_weight' => 'array',
            'font_subsets' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
