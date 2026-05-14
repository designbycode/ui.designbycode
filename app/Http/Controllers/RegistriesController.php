<?php

namespace App\Http\Controllers;

use App\Models\Animate;
use App\Models\Font;
use App\Models\Registry;
use App\Models\Theme;
use Illuminate\Http\JsonResponse;

class RegistriesController extends Controller
{
    public function show(string $type, string $name): JsonResponse
    {
        $model = match ($type) {
            'fonts' => Font::class,
            'animate-css' => Animate::class,
            'themes', 'theme' => Theme::class,
            default => Registry::class,
        };

        if ($name === 'registry') {
            $items = $model::all()->map->toRegistry()->values();

            return response()->json([
                '$schema' => 'https://ui.shadcn.com/schema/registry.json',
                'name' => 'designbycode',
                'homepage' => 'https://ui.designbycode.co.za',
                'items' => $items->all(),
            ]);
        }

        return response()->json(
            $model::where('name', $name)->firstOrFail()->toRegistry()
        );
    }
}
