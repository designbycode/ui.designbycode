<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Tags\Tag;

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

        if (isset($data['tags'])) {
            if (! is_array($data['tags'])) {
                $errors[] = '"tags" must be an array.';
            } else {
                foreach ($data['tags'] as $i => $tag) {
                    if (! is_string($tag)) {
                        $errors[] = "\"tags.{$i}\" must be a string.";
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

        if (isset($data['tags'])) {
            $theme->attachTags($data['tags']);
        }

        Cache::forget('themes:total_count');
        Cache::forget('themes:available_tags');

        return redirect()->route('themes.show', $theme->name)
            ->with('success', 'Theme created successfully.');
    }

    public function index()
    {
        $availableTags = Cache::remember('themes:available_tags', 3600, function () {
            return Tag::query()
                ->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('taggables')
                        ->whereColumn('taggables.tag_id', 'tags.id')
                        ->where('taggables.taggable_type', Theme::class);
                })
                ->get()
                ->pluck('name')
                ->sort()
                ->values()
                ->all();
        });

        $query = Theme::query()->with('tags');

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($tag = request('tag')) {
            $query->withAnyTags([$tag]);
        }

        $themes = $query->paginate(12)->withQueryString();

        $themes->getCollection()->transform(function ($theme) {
            $data = $theme->toArray();
            $data['tags'] = $theme->tags->pluck('name')->toArray();

            return $data;
        });

        return Inertia::render('themes/index', [
            'themes' => Inertia::scroll($themes),
            'filters' => request()->only(['search', 'tag']),
            'availableTags' => $availableTags,
            'totalThemesCount' => Cache::remember('themes:total_count', 3600, fn () => Theme::count()),
        ]);
    }

    public function show(Theme $theme)
    {
        $theme->load('tags');
        $data = $theme->toArray();
        $data['tags'] = $theme->tags->pluck('name')->toArray();

        return Inertia::render('themes/show', [
            'theme' => $data,
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
