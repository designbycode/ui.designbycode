<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ThemesController extends Controller
{
    public function create()
    {
        return Inertia::render('themes/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'url' => ['required', 'url'],
        ]);

        $response = Http::get($request->url);

        if ($response->failed()) {
            return back()->withErrors(['url' => 'Could not fetch registry from the provided URL.']);
        }

        $data = $response->json();

        if (empty($data) || ! isset($data['name'])) {
            return back()->withErrors(['url' => 'Invalid registry JSON format.']);
        }

        // Check if theme already exists
        if (Theme::where('name', $data['name'])->exists()) {
            return back()->withErrors(['url' => "A theme named [{$data['name']}] already exists."]);
        }

        $theme = Theme::fromRegistry($data);
        $theme->user_id = auth()->id();
        $theme->save();

        Cache::forget('themes:total_count');
        Cache::forget('themes:available_categories');

        return redirect()->route('themes.show', $theme->name)
            ->with('success', 'Theme created successfully.');
    }

    public function index()
    {
        $availableCategories = Cache::remember('themes:available_categories', 3600, fn () => Theme::query()
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
            'totalThemesCount' => Cache::remember('themes:total_count', 3600, fn () => Theme::count()),
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
