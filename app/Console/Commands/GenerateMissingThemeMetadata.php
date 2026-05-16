<?php

namespace App\Console\Commands;

use App\Jobs\GenerateThemeMetadataJob;
use App\Models\Theme;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('themes:generate-missing-metadata')]
#[Description('Find incomplete themes and generate missing metadata using AI')]
class GenerateMissingThemeMetadata extends Command
{
    public function handle(): void
    {
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

            GenerateThemeMetadataJob::dispatchSync($theme);

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
        }
    }
}
