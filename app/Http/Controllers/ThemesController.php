<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
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

        if (empty($data) || ! is_array($data)) {
            return back()->withErrors(['url' => 'Invalid registry JSON format.']);
        }

        $errors = [];

        if (! is_string($data['name'] ?? null) || $data['name'] === '') {
            $errors[] = 'The registry must contain a non-empty "name" field.';
        } elseif (! preg_match('/^[a-z0-9\-]+$/i', $data['name'])) {
            $errors[] = 'The theme name must only contain letters, numbers, and hyphens.';
        }

        if (isset($data['cssVars'])) {
            if (! is_array($data['cssVars'])) {
                $errors[] = '"cssVars" must be an object.';
            } else {
                if (isset($data['cssVars']['light']) && ! is_array($data['cssVars']['light'])) {
                    $errors[] = '"cssVars.light" must be an object.';
                }

                if (isset($data['cssVars']['dark']) && ! is_array($data['cssVars']['dark'])) {
                    $errors[] = '"cssVars.dark" must be an object.';
                }
            }
        }

        if (isset($data['files'])) {
            if (! is_array($data['files'])) {
                $errors[] = '"files" must be an array.';
            } else {
                $fileErrors = Theme::validateFiles($data['files']);
                foreach ($fileErrors as $error) {
                    $errors[] = $error;
                }
            }
        }

        if (isset($data['font'])) {
            if (! is_array($data['font'])) {
                $errors[] = '"font" must be an object.';
            } else {
                foreach (['family', 'provider', 'import', 'variable', 'selector', 'dependency'] as $field) {
                    if (isset($data['font'][$field]) && ! is_string($data['font'][$field])) {
                        $errors[] = "\"font.{$field}\" must be a string.";
                    }
                }

                foreach (['weight', 'subsets'] as $field) {
                    if (isset($data['font'][$field]) && ! is_array($data['font'][$field])) {
                        $errors[] = "\"font.{$field}\" must be an array.";
                    }
                }
            }
        }

        if (isset($data['categories'])) {
            if (! is_array($data['categories'])) {
                $errors[] = '"categories" must be an array.';
            } else {
                foreach ($data['categories'] as $i => $category) {
                    if (! is_string($category)) {
                        $errors[] = "\"categories.{$i}\" must be a string.";
                    }
                }
            }
        }

        if (! empty($errors)) {
            return back()->withErrors(['url' => implode(' ', $errors)]);
        }

        $data['name'] = Str::kebab($data['name']);
        $data['type'] = 'registry:theme';

        if (! ($data['author'] ?? null)) {
            $host = Str::of(parse_url($request->url, PHP_URL_HOST))
                ->replaceFirst('www.', '')
                ->before('.')
                ->toString();
            $data['author'] = $host;
        }

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
