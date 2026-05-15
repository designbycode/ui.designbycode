<?php

namespace App\Observers;

use App\Models\Theme;
use App\Services\AiService;
use Illuminate\Support\Str;

class ThemeObserver
{
    /**
     * @var array<string>
     */
    protected static array $suggestedTagsMap = [];

    public function creating(Theme $theme): void
    {
        if (! $theme->title) {
            $theme->title = Str::headline($theme->name);
        }

        if (! $theme->description) {
            $ai = app(AiService::class);
            $metadata = $ai->generateThemeMetadata(
                $theme->name,
                $theme->vars_light ?? []
            );
            $theme->description = $metadata['description'];
            static::$suggestedTagsMap[$theme->name] = $metadata['tags'];
        }
    }

    public function created(Theme $theme): void
    {
        if (isset(static::$suggestedTagsMap[$theme->name])) {
            $theme->attachTags(static::$suggestedTagsMap[$theme->name]);
            unset(static::$suggestedTagsMap[$theme->name]);
        }
    }
}
