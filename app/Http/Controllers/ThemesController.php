<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Inertia\Inertia;

class ThemesController extends Controller
{
    public function index()
    {
        $availableCategories = Theme::query()
            ->select('categories')
            ->get()
            ->pluck('categories')
            ->flatten()
            ->unique()
            ->sort()
            ->values()
            ->all();

        return Inertia::render('themes/index', [
            'filters' => request()->only(['search', 'category']),
            'availableCategories' => $availableCategories,
        ]);
    }

    public function show(string $name)
    {
        return response()->json(
            Theme::where('name', $name)->firstOrFail()->toRegistry()
        );
    }

    public function css(string $name)
    {
        return response(
            Theme::where('name', $name)->firstOrFail()->toCss(),
            200
        )->header('Content-Type', 'text/css');
    }
}
