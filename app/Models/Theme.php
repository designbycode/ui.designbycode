<?php

namespace App\Models;

use App\Concerns\HasTheme;
use App\Observers\ThemeObserver;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Tags\HasTags;

#[Fillable([
    'name', 'type', 'title', 'description', 'author',
    'dependencies', 'devDependencies', 'registryDependencies',
    'files',
    'css', 'css_base', 'tailwind',
    'vars_theme', 'vars_light', 'vars_dark',
    'font_family', 'font_mono', 'font_serif',
    'font_provider', 'font_import', 'font_variable',
    'font_weight', 'font_subsets', 'font_selector', 'font_dependency',
    'meta', 'docs',
    'extends',
    'style', 'icon_library', 'base_color', 'theme',
])]
#[ObservedBy(ThemeObserver::class)]
class Theme extends Model
{
    use HasTags, HasTheme, SoftDeletes;

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
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
