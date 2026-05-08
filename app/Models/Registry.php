<?php

namespace App\Models;

use App\Concerns\HasRegistry;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    // Core identity
    'name', 'type', 'title', 'description', 'author',
    // Dependencies
    'dependencies', 'devDependencies', 'registryDependencies',
    // Files
    'files',
    // CSS
    'css', 'css_base', 'tailwind',
    // CSS variable columns (maps to cssVars.theme / light / dark)
    'vars_theme', 'vars_light', 'vars_dark',
    // Font columns (flattened from font{} object)
    'font_family', 'font_mono', 'font_serif',
    'font_provider', 'font_import', 'font_variable',
    'font_weight', 'font_subsets', 'font_selector', 'font_dependency',
    // Metadata
    'meta', 'docs', 'categories',
    // registry:style
    'extends',
    // registry:base
    'style', 'icon_library', 'base_color', 'theme',
])]
class Registry extends Model
{
    use HasRegistry, SoftDeletes;

    // =========================================================================
    // Relationships
    // =========================================================================

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // =========================================================================
    // Casts
    // =========================================================================

    /**
     * Route model binding uses `name` (unique registry identifier).
     */
    public function getRouteKeyName(): string
    {
        return 'name';
    }

    // =========================================================================
    // Routing
    // =========================================================================

    public function scopeHooks(Builder $query): Builder
    {
        return $query->ofType('registry:hook');
    }

    public function scopeStyle(Builder $query): Builder
    {
        return $query->ofType('registry:style');
    }

    public function scopeBase(Builder $query): Builder
    {
        return $query->ofType('registry:base');
    }

    public function scopeFont(Builder $query): Builder
    {
        return $query->ofType('registry:font');
    }

    public function scopeComponent(Builder $query): Builder
    {
        return $query->ofType('registry:component');
    }

    public function scopeBlock(Builder $query): Builder
    {
        return $query->ofType('registry:block');
    }

    public function scopeLib(Builder $query): Builder
    {
        return $query->ofType('registry:lib');
    }

    public function scopePage(Builder $query): Builder
    {
        return $query->ofType('registry:page');
    }

    public function scopeFile(Builder $query): Builder
    {
        return $query->ofType('registry:file');
    }

    public function scopeUi(Builder $query): Builder
    {
        return $query->ofType('registry:ui');
    }

    public function scopeItem(Builder $query): Builder
    {
        return $query->ofType('registry:item');
    }

    /**
     * Filter by a single registry type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    // =========================================================================
    // Query scopes – generic
    // =========================================================================

    /**
     * Filter by multiple registry types.
     *
     * @param  array<int, string>  $types
     */
    public function scopeOfTypes(Builder $query, array $types): Builder
    {
        return $query->whereIn('type', $types);
    }

    /**
     * Filter by a category tag contained in the JSON array.
     */
    public function scopeInCategory(Builder $query, string $category): Builder
    {
        return $query->whereJsonContains('categories', $category);
    }

    /**
     * Filter by font provider (e.g. 'google').
     */
    public function scopeByFontProvider(Builder $query, string $provider): Builder
    {
        return $query->where('font_provider', $provider);
    }

    /**
     * Filter items that declare a specific NPM dependency.
     */
    public function scopeWithDependency(Builder $query, string $package): Builder
    {
        return $query->whereJsonContains('dependencies', $package);
    }

    /**
     * Filter items that declare a specific registry dependency.
     */
    public function scopeWithRegistryDependency(Builder $query, string $name): Builder
    {
        return $query->whereJsonContains('registryDependencies', $name);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // Dependency arrays
            'dependencies' => 'array',
            'devDependencies' => 'array',
            'registryDependencies' => 'array',

            // Files payload
            'files' => 'array',

            // CSS
            'css' => 'array',
            'css_base' => 'array',
            'tailwind' => 'array',

            // CSS variable sets
            'vars_theme' => 'array',
            'vars_light' => 'array',
            'vars_dark' => 'array',

            // Font arrays
            'font_weight' => 'array',
            'font_subsets' => 'array',

            // registry:base theme config
            'theme' => 'array',

            // Metadata
            'meta' => 'array',
            'categories' => 'array',

            // Timestamps
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
