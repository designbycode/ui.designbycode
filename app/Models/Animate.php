<?php

namespace App\Models;

use App\Concerns\HasAnimate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animate extends Model
{
    use HasAnimate, SoftDeletes;

    protected $fillable = [
        'name', 'title', 'description', 'author',
        'user_id',
        'type',
        'meta',
        'css_vars', 'css',
        'registryDependencies',
    ];

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
