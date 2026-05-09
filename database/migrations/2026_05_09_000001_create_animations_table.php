<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animations', function (Blueprint $table) {
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
            INSERT INTO animations (user_id, name, title, description, author, meta, css_vars, css, registryDependencies, created_at, updated_at)
            SELECT user_id, name, title, description, author, meta, vars_theme, css, registryDependencies, created_at, updated_at
            FROM registries
            WHERE type = 'registry:style' AND meta->>'$.category' = 'animations'
        ");

        DB::table('registries')
            ->where('type', 'registry:style')
            ->whereRaw("meta->>'$.category' = 'animations'")
            ->delete();
    }

    public function down(): void
    {
        $animations = DB::table('animations')->get();

        foreach ($animations as $animation) {
            DB::table('registries')->insert([
                'user_id' => $animation->user_id,
                'name' => $animation->name,
                'title' => $animation->title,
                'type' => 'registry:style',
                'description' => $animation->description,
                'author' => $animation->author,
                'meta' => $animation->meta,
                'css' => $animation->css,
                'vars_theme' => $animation->css_vars,
                'registryDependencies' => $animation->registryDependencies,
                'created_at' => $animation->created_at,
                'updated_at' => $animation->updated_at,
            ]);
        }

        Schema::dropIfExists('animations');
    }
};
