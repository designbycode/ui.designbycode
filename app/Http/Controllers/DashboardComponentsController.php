<?php

namespace App\Http\Controllers;

use App\Actions\Registry\DeleteRegistryAction;
use App\Actions\Registry\StoreRegistryAction;
use App\Actions\Registry\UpdateRegistryAction;
use App\Http\Requests\Registry\StoreRequest;
use App\Http\Requests\Registry\UpdateRequest;
use App\Models\Registry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardComponentsController extends Controller
{
    /**
     * Display a listing of the components.
     */
    public function index(Request $request): Response
    {
        $components = Registry::ofTypes([
            'registry:ui',
            'registry:block',
            'registry:hook',
            'registry:lib',
        ])
            ->orderBy('title')
            ->get()
            ->map(fn (Registry $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'title' => $item->title,
                'type' => $item->type,
                'description' => $item->description,
                'categories' => $item->categories ?? [],
                'author' => $item->author,
                'dependencies' => $item->dependencies ?? [],
                'registryDependencies' => $item->registryDependencies ?? [],
            ]);

        return Inertia::render('dashboard/components/index', [
            'components' => $components,
        ]);
    }

    /**
     * Show the form for creating a new component.
     */
    public function create(): Response
    {
        // Get all unique categories across components for suggestions
        $categories = Registry::ofTypes([
            'registry:ui',
            'registry:block',
            'registry:hook',
            'registry:lib',
        ])
            ->get()
            ->flatMap(fn ($item) => $item->categories ?? [])
            ->unique()
            ->sort()
            ->values()
            ->all();

        return Inertia::render('dashboard/components/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created component in storage.
     */
    public function store(StoreRequest $request, StoreRegistryAction $action)
    {
        $action->handle($request->validated());

        return redirect()
            ->route('dashboard.components.index')
            ->with('success', 'Component created successfully.');
    }

    /**
     * Show the form for editing the specified component.
     */
    public function edit(string $name): Response
    {
        $component = Registry::where('name', $name)->firstOrFail();

        // Get all unique categories for suggestions
        $categories = Registry::ofTypes([
            'registry:ui',
            'registry:block',
            'registry:hook',
            'registry:lib',
        ])
            ->get()
            ->flatMap(fn ($item) => $item->categories ?? [])
            ->unique()
            ->sort()
            ->values()
            ->all();

        return Inertia::render('dashboard/components/edit', [
            'component' => [
                'id' => $component->id,
                'name' => $component->name,
                'title' => $component->title,
                'type' => $component->type,
                'description' => $component->description,
                'author' => $component->author,
                'categories' => $component->categories ?? [],
                'dependencies' => $component->dependencies ?? [],
                'registryDependencies' => $component->registryDependencies ?? [],
                'files' => $component->files ?? [],
                'css' => $component->css ?? [],
                'css_base' => $component->css_base ?? [],
                'vars_theme' => $component->vars_theme ?? [],
                'vars_light' => $component->vars_light ?? [],
                'vars_dark' => $component->vars_dark ?? [],
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified component in storage.
     */
    public function update(UpdateRequest $request, string $name, UpdateRegistryAction $action)
    {
        $component = Registry::where('name', $name)->firstOrFail();

        // Ensure the ID is available for uniqueness validation checks
        $request->merge(['id' => $component->id]);

        $action->handle($component, $request->validated());

        return redirect()
            ->route('dashboard.components.index')
            ->with('success', 'Component updated successfully.');
    }

    /**
     * Remove the specified component from storage.
     */
    public function destroy(string $name, DeleteRegistryAction $action)
    {
        $action->handle($name);

        return redirect()
            ->route('dashboard.components.index')
            ->with('success', 'Component deleted successfully.');
    }
}
