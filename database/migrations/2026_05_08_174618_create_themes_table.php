<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();

            $table->string('name')->unique();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('author')->default('designbycode')->nullable();
            $table->string('type')->nullable()->default('registry:theme');
            $table->json('dependencies')->nullable();
            $table->json('devDependencies')->nullable();
            $table->json('registryDependencies')->nullable();
            $table->json('files')->nullable();
            $table->json('css')->nullable();
            $table->json('css_base')->nullable();

            $table->json('vars_theme')->nullable();
            $table->json('vars_light')->nullable();
            $table->json('vars_dark')->nullable();

            $table->string('font_family')->nullable();
            $table->string('font_mono')->nullable();
            $table->string('font_serif')->nullable();
            $table->string('font_provider')->nullable()->default('google');
            $table->string('font_import')->nullable();
            $table->string('font_variable')->nullable();
            $table->json('font_weight')->nullable();
            $table->json('font_subsets')->nullable();
            $table->string('font_selector')->nullable();
            $table->string('font_dependency')->nullable();

            $table->json('tailwind')->nullable();
            $table->json('meta')->nullable();
            $table->text('docs')->nullable();
            $table->json('categories')->nullable();

            $table->string('extends')->nullable();
            $table->string('style')->nullable();
            $table->string('icon_library')->nullable();
            $table->string('base_color')->nullable();
            $table->json('theme')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
        });

    }

    public function down(): void
    {
        $themes = DB::table('themes')->get();

        foreach ($themes as $theme) {
            $data = (array) $theme;
            $data['type'] = 'registry:app';
            unset($data['id'], $data['user_id']);
            DB::table('registries')->insert($data);
        }

        Schema::dropIfExists('themes');
    }
};
