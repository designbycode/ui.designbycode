<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fonts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();

            $table->string('name')->unique();
            $table->string('title')->nullable();
            $table->string('type')->default('registry:font');
            $table->string('author')->nullable();

            $table->json('meta')->nullable();
            $table->json('categories')->nullable();

            $table->json('registryDependencies')->nullable();
            $table->json('dependencies')->nullable();
            $table->json('devDependencies')->nullable();
            $table->json('files')->nullable();

            $table->string('font_family')->nullable();
            $table->string('font_provider')->nullable()->default('google');
            $table->string('font_import')->nullable();
            $table->string('font_variable')->nullable();
            $table->json('font_weight')->nullable();
            $table->json('font_subsets')->nullable();
            $table->string('font_selector')->nullable();
            $table->string('font_dependency')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
        });

        DB::statement('
            INSERT INTO fonts (
                name, title, type, author,
                meta, categories,
                registryDependencies, dependencies, devDependencies, files,
                font_family, font_provider, font_import, font_variable,
                font_weight, font_subsets, font_selector, font_dependency,
                created_at, updated_at, deleted_at
            )
            SELECT
                name, title, type, author,
                meta, categories,
                registryDependencies, dependencies, devDependencies, files,
                font_family, font_provider, font_import, font_variable,
                font_weight, font_subsets, font_selector, font_dependency,
                created_at, updated_at, deleted_at
            FROM registries
            WHERE type = \'registry:font\'
        ');

        DB::table('registries')->where('type', 'registry:font')->delete();
    }

    public function down(): void
    {
        $fonts = DB::table('fonts')->get();

        foreach ($fonts as $font) {
            $data = (array) $font;
            $data['type'] = 'registry:font';
            unset($data['id'], $data['user_id']);
            DB::table('registries')->insert($data);
        }

        Schema::dropIfExists('fonts');
    }
};
