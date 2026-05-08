<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registries', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            // ── Core identity ────────────────────────────────────────────────
            $table->string('name')->unique()->comment('Unique registry item identifier');
            $table->string('type')->comment(
                'registry:lib | registry:block | registry:component | registry:ui | '.
                'registry:hook | registry:theme | registry:page | registry:file | '.
                'registry:style | registry:base | registry:font | registry:item'
            );
            $table->string('title')->nullable()->comment('Human-readable title');
            $table->text('description')->nullable();
            $table->string('author')->nullable()->comment('Format: username <url>');

            // ── Dependencies ─────────────────────────────────────────────────
            $table->json('dependencies')->nullable()->comment('NPM runtime dependencies');
            $table->json('devDependencies')->nullable()->comment('NPM dev dependencies');
            $table->json('registryDependencies')->nullable()->comment('Registry item names or URLs');

            // ── Files payload ─────────────────────────────────────────────────
            // Each file: { path, content, type, target }
            // target is required when type is registry:file or registry:page
            $table->json('files')->nullable();

            // ── CSS ───────────────────────────────────────────────────────────
            // Arbitrary CSS: at-rules, selectors, nested rules, utilities, layers
            $table->json('css')->nullable()->comment('Top-level CSS definitions');
            $table->json('css_base')->nullable()->comment('@layer base rules {selector: {property: value}}');

            // ── CSS Variables (cssVars in schema) ─────────────────────────────
            // Shadcn splits into theme / light / dark
            $table->json('vars_theme')->nullable()->comment('cssVars.theme – @theme inline tokens');
            $table->json('vars_light')->nullable()->comment('cssVars.light – :root token map');
            $table->json('vars_dark')->nullable()->comment('cssVars.dark – .dark token map');

            // ── Font columns (flattened from schema font{} object) ────────────
            // Flat columns make querying/indexing possible without JSON extraction
            $table->string('font_family')->nullable()->comment('font.family e.g. "Inter"');
            $table->string('font_mono')->nullable()->comment('Mono font family');
            $table->string('font_serif')->nullable()->comment('Serif font family');
            $table->string('font_provider')->nullable()->default('google')->comment('font.provider – currently only "google"');
            $table->string('font_import')->nullable()->comment('font.import e.g. "Inter" or "JetBrains_Mono"');
            $table->string('font_variable')->nullable()->comment('font.variable CSS var e.g. "--font-sans"');
            $table->json('font_weight')->nullable()->comment('font.weight[] e.g. ["400","500","700"]');
            $table->json('font_subsets')->nullable()->comment('font.subsets[] e.g. ["latin"]');
            $table->string('font_selector')->nullable()->comment('font.selector CSS selector e.g. "h1,h2,h3"');
            $table->string('font_dependency')->nullable()->comment('font.dependency npm pkg e.g. "@fontsource-variable/inter"');

            // ── Tailwind config (legacy v3 support) ──────────────────────────
            $table->json('tailwind')->nullable()->comment('tailwind.config {content,theme,plugins} for Tailwind v3');

            // ── Metadata ──────────────────────────────────────────────────────
            $table->json('meta')->nullable()->comment('Arbitrary key-value metadata');
            $table->text('docs')->nullable()->comment('Markdown documentation');
            $table->json('categories')->nullable()->comment('String category tags');

            // ── registry:style fields ─────────────────────────────────────────
            $table->string('extends')->nullable()->comment('Base style to extend; "none" = start fresh');

            // ── registry:base fields ──────────────────────────────────────────
            $table->string('style')->nullable()->comment('Style config (registry:base only)');
            $table->string('icon_library')->nullable()->comment('Icon library (registry:base only)');
            $table->string('base_color')->nullable()->comment('Base color (registry:base only)');
            $table->json('theme')->nullable()->comment('Theme config object (registry:base only)');

            $table->timestamps();
            $table->softDeletes();

            // ── Indexes ───────────────────────────────────────────────────────
            $table->index('type');
            $table->index('font_provider');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registries');
    }
};
