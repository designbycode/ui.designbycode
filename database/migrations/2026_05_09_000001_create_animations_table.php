<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animates', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->string('name')->unique();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('author')->nullable();

            $table->json('meta')->nullable();
            $table->json('css_vars')->nullable();
            $table->json('css')->nullable();
            $table->json('registryDependencies')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
        });

        DB::statement("
            INSERT INTO animates (user_id, name, title, description, author, meta, css_vars, css, registryDependencies, created_at, updated_at)
            SELECT user_id, name, title, description, author, meta, vars_theme, css, registryDependencies, created_at, updated_at
            FROM registries
            WHERE type = 'registry:style' AND JSON_UNQUOTE(JSON_EXTRACT(meta, '$.category')) = 'animations'
        ");

        DB::table('registries')
            ->where('type', 'registry:style')
            ->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(meta, '$.category')) = 'animations'")
            ->delete();
    }

    public function down(): void
    {
        $animates = DB::table('animates')->get();

        foreach ($animates as $animate) {
            DB::table('registries')->insert([
                'user_id' => $animate->user_id,
                'name' => $animate->name,
                'title' => $animate->title,
                'type' => 'registry:style',
                'description' => $animate->description,
                'author' => $animate->author,
                'meta' => $animate->meta,
                'css' => $animate->css,
                'vars_theme' => $animate->css_vars,
                'registryDependencies' => $animate->registryDependencies,
                'created_at' => $animate->created_at,
                'updated_at' => $animate->updated_at,
            ]);
        }

        Schema::dropIfExists('animates');
    }
};
