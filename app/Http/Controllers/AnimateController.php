<?php

namespace App\Http\Controllers;

use App\Models\Animate;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AnimateController extends Controller
{
    public function index()
    {
        $animates = Animate::all()->map(fn(Animate $a) => [
            'name' => $a->name,
            'title' => $a->title,
            'text' => Str::title(Str::replace('-', ' ', Str::after($a->name, 'animate-'))),
            'category' => $a->meta['category'] ?? 'animations',
        ]);

        $categories = $animates->pluck('category')->unique()->sort()->values()->all();

        return Inertia::render('animate-css/index', [
            'animations' => $animates,
            'categories' => $categories,
        ]);
    }

    public function show(string $name)
    {
        return response()->json(
            Animate::where('name', $name)->firstOrFail()->toRegistry()
        );
    }
}
