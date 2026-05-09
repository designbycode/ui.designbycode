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
            $table->string('type')->default('registry:style');
            $table->text('description')->nullable();
            $table->string('author')->default('designbycode')->nullable();

            $table->json('meta')->nullable();
            $table->json('css_vars')->nullable();
            $table->json('css')->nullable();
            $table->json('registryDependencies')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
        });

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
