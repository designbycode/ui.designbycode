<?php

namespace App\Observers;

use App\Jobs\GenerateThemeMetadataJob;
use App\Models\Theme;
use Illuminate\Support\Str;

class ThemeObserver
{
    public function creating(Theme $theme): void
    {
        if (! $theme->title) {
            $theme->title = Str::headline($theme->name);
        }
    }

    public function created(Theme $theme): void
    {
        GenerateThemeMetadataJob::dispatch($theme);
    }
}
