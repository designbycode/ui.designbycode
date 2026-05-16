<?php

namespace App\Jobs;

use App\Models\Theme;
use App\Services\AiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class GenerateThemeMetadataJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Theme $theme,
    ) {}

    public function handle(AiService $ai): void
    {
        $theme = $this->theme->fresh();

        if (! $theme) {
            return;
        }

        try {
            $metadata = $ai->generateThemeMetadata(
                $theme->name,
                $theme->vars_light ?? [],
            );
        } catch (\Throwable) {
            return;
        }

        $theme->updateQuietly(['description' => $metadata['description']]);

        if (! empty($metadata['tags'])) {
            $theme->attachTags($metadata['tags']);
        }
    }
}
