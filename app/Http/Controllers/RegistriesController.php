<?php

namespace App\Http\Controllers;

use App\Models\Animate;
use App\Models\Font;
use App\Models\Registry;
use App\Models\Theme;
use App\Services\FontService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RegistriesController extends Controller
{
    public function show(string $type, string $name, FontService $fontService): JsonResponse
    {
        $model = match ($type) {
            'fonts' => Font::class,
            'animate-css' => Animate::class,
            'themes', 'app' => Theme::class,
            default => Registry::class,
        };

        if ($name === 'registry') {
            $items = $model::all()->map->toRegistry();

            if ($type === 'fonts') {
                $fonts = collect($fontService->getFonts())->map(fn ($f) => $fontService->toRegistry($f));
                $items = $items->merge($fonts);
            }

            return response()->json([
                '$schema' => 'https://ui.shadcn.com/schema/registry.json',
                'name' => 'designbycode',
                'homepage' => 'https://ui.designbycode.co.za',
                'items' => $items->values()->all(),
            ]);
        }

        if ($type === 'fonts') {
            $font = Font::where('name', $name)->first();
            if ($font) {
                return response()->json($font->toRegistry());
            }

            $fontId = Str::after($name, 'font-');
            $fontData = $fontService->getFont($fontId);

            if ($fontData) {
                return response()->json($fontService->toRegistry($fontData));
            }
        }

        return response()->json(
            $model::where('name', $name)->firstOrFail()->toRegistry()
        );
    }
}
