<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ThemesController extends Controller
{
    public function index()
    {
        $availableCategories = Cache::remember('themes:available_categories', 3600, fn() => Theme::query()
            ->select('categories')
            ->get()
            ->pluck('categories')
            ->flatten()
            ->unique()
            ->sort()
            ->values()
            ->all());

        return Inertia::render('themes/index', [
            'themes' => Inertia::scroll(Theme::paginate(12)->withQueryString()),
            'filters' => request()->only(['search', 'category']),
            'availableCategories' => $availableCategories,
            'totalThemesCount' => Cache::remember('themes:total_count', 3600, fn() => Theme::count()),
        ]);
    }


    public function show(Theme $theme)
    {
        return Inertia::render('themes/show', [
            'theme' => $theme,
            'css' => $theme->toCss(),
        ]);
    }

    public function css(string $name)
    {
        return response(
            Theme::where('name', $name)->firstOrFail()->toCss(),
            200
        )->header('Content-Type', 'text/css');
    }
}
