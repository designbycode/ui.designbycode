<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Inertia\Inertia;

class ThemesController extends Controller
{
    public function index(Registry $registry)
    {
        $query = $registry->themes();

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($category = request('category')) {
            $query->whereJsonContains('categories', $category);
        }

        $themes = $query->paginate(12)->withQueryString();

        $availableCategories = $registry->themes()
            ->select('categories')
            ->get()
            ->pluck('categories')
            ->flatten()
            ->unique()
            ->sort()
            ->values()
            ->all();

        return Inertia::render('themes/index', [
            'themes' => $themes,
            'filters' => request()->only(['search', 'category']),
            'availableCategories' => $availableCategories,
        ]);
    }
}
