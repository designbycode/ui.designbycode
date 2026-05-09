<?php

namespace App\Models;

use App\Concerns\HasAnimate;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['name', 'title', 'description', 'author', 'user_id', 'type', 'meta', 'css_vars', 'css', 'registryDependencies'])]
class Animate extends Model
{
    use HasAnimate, SoftDeletes;
    
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
            'css_vars' => 'array',
            'css' => 'array',
            'registryDependencies' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
