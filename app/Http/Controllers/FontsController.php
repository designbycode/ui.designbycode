<?php

namespace App\Http\Controllers;

use App\Models\Font;
use Inertia\Inertia;

class FontsController extends Controller
{
    public function index()
    {
        return Inertia::render('fonts/index', [
            'fonts' => Font::query()->orderBy('title')->get()->map(fn ($f) => [
                'name' => $f->name,
                'title' => $f->title,
                'fontFamily' => $f->font_family,
                'fontProvider' => $f->font_provider,
                'fontImport' => $f->font_import,
                'fontVariable' => $f->font_variable,
                'fontWeight' => $f->font_weight,
                'fontSubsets' => $f->font_subsets,
                'fontDependency' => $f->font_dependency,
            ]),
        ]);
    }

    public function show(string $name)
    {
        $font = Font::where('name', $name)->firstOrFail();

        return response()->json($font->toRegistry());
    }
}
