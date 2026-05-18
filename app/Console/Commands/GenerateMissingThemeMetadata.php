<?php

namespace App\Console\Commands;

use App\Models\Theme;
use App\Services\AiService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('themes:generate-missing-metadata')]
#[Description('Find incomplete themes and generate missing metadata using AI')]
class GenerateMissingThemeMetadata extends Command
{
    public function handle(AiService $ai): void
    {
        $apiKey = config('services.puter.key');

        if (! $apiKey) {
            $this->error('AI service is not configured. Set services.puter.key in your .env or config/services.php.');

            return;
        }

        $themes = Theme::where(function ($query) {
            $query->whereDoesntHave('tags')
                ->orWhereNull('description')
                ->orWhere('description', '');
        })->oldest()->get();

        if ($themes->isEmpty()) {
            $this->info('No incomplete themes found.');

            return;
        }

        $this->line("Found {$themes->count()} incomplete theme(s).");

        foreach ($themes as $theme) {
            $hadDescription = (bool) $theme->description;
            $hadTags = $theme->tags->isNotEmpty();

            $missing = [];
            if (! $hadDescription) {
                $missing[] = 'description';
            }
            if (! $hadTags) {
                $missing[] = 'tags';
            }

            $this->line("  Processing: {$theme->name} (ID: {$theme->id})");
            $this->line('    Missing: '.implode(', ', $missing));

            try {
                $metadata = $ai->generateThemeMetadata(
                    $theme->name,
                    $theme->vars_light ?? [],
                );

                if ($metadata['description'] !== null) {
                    $theme->updateQuietly(['description' => $metadata['description']]);
                }

                if (! empty($metadata['tags'])) {
                    $theme->attachTags($metadata['tags']);
                }

                $theme->refresh()->load('tags');

                $descriptionStatus = match (true) {
                    ! $hadDescription && (bool) $theme->description => 'added',
                    $hadDescription => 'already present',
                    default => 'failed',
                };

                $tagsStatus = match (true) {
                    ! $hadTags && $theme->tags->isNotEmpty() => 'added: '.$theme->tags->pluck('name')->implode(', '),
                    $hadTags => 'already present',
                    default => 'failed (AI returned no tags)',
                };

                $this->line("    <info>✓</info> Description: {$descriptionStatus}");
                $this->line("    <info>✓</info> Tags: {$tagsStatus}");
            } catch (\Throwable $e) {
                $this->error("    Failed: {$e->getMessage()}");
            }
        }
    }
}
