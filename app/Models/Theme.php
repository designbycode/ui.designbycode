<?php

namespace App\Models;

use App\Concerns\HasTheme;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name', 'title', 'description', 'author',
    'dependencies', 'devDependencies', 'registryDependencies',
    'files',
    'css', 'css_base', 'tailwind',
    'vars_theme', 'vars_light', 'vars_dark',
    'font_family', 'font_mono', 'font_serif',
    'font_provider', 'font_import', 'font_variable',
    'font_weight', 'font_subsets', 'font_selector', 'font_dependency',
    'meta', 'docs', 'categories',
    'extends',
    'style', 'icon_library', 'base_color', 'theme',
])]
class Theme extends Model
{
    use HasTheme, SoftDeletes;

    protected $table = 'themes';

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
            'dependencies' => 'array',
            'devDependencies' => 'array',
            'registryDependencies' => 'array',
            'files' => 'array',
            'css' => 'array',
            'css_base' => 'array',
            'tailwind' => 'array',
            'vars_theme' => 'array',
            'vars_light' => 'array',
            'vars_dark' => 'array',
            'font_weight' => 'array',
            'font_subsets' => 'array',
            'theme' => 'array',
            'meta' => 'array',
            'categories' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
