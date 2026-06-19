<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Inertia\Inertia;

class ComponentsController extends Controller
{
    /**
     * Display a listing of the registry components.
     */
    public function index()
    {
        $items = Registry::ofTypes([
            'registry:ui',
            'registry:block',
            'registry:hook',
            'registry:lib',
        ])->get();

        $components = $items->map(fn (Registry $item) => [
            'name' => $item->name,
            'title' => $item->title,
            'type' => $item->type,
            'description' => $item->description,
            'categories' => $item->categories ?? [],
            'author' => $item->author,
            'dependencies' => $item->dependencies ?? [],
            'registryDependencies' => $item->registryDependencies ?? [],
        ]);

        // Get unique categories for filtering/display
        $categories = $items->flatMap(fn ($item) => $item->categories ?? [])
            ->unique()
            ->sort()
            ->values()
            ->all();

        return Inertia::render('components/index', [
            'components' => $components,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified registry component.
     */
    public function show(string $name)
    {
        $item = Registry::where('name', $name)->firstOrFail();

        // Get sidebar items for rapid switching between components
        $sidebarItems = Registry::ofTypes([
            'registry:ui',
            'registry:block',
            'registry:hook',
            'registry:lib',
        ])->get()->map(fn (Registry $r) => [
            'name' => $r->name,
            'title' => $r->title,
            'type' => $r->type,
            'categories' => $r->categories ?? [],
        ]);

        return Inertia::render('components/show', [
            'component' => [
                'name' => $item->name,
                'title' => $item->title,
                'type' => $item->type,
                'description' => $item->description,
                'categories' => $item->categories ?? [],
                'author' => $item->author,
                'dependencies' => $item->dependencies ?? [],
                'registryDependencies' => $item->registryDependencies ?? [],
                'files' => $item->files ?? [],
            ],
            'sidebarItems' => $sidebarItems,
        ]);
    }
}
