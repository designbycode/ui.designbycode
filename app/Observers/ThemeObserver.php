<?php

namespace App\Observers;

use App\Models\Theme;
use App\Services\AiService;
use Illuminate\Support\Str;

class ThemeObserver
{
    public function creating(Theme $theme): void
    {
        if (! $theme->title) {
            $theme->title = Str::headline($theme->name);
        }

        if (! $theme->description) {
            $ai = app(AiService::class);
            $theme->description = $ai->generateThemeDescription(
                $theme->name,
                $theme->vars_light ?? []
            );
        }
    }
}
