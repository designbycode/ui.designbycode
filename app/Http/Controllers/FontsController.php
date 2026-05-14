<?php

namespace App\Http\Controllers;

use App\Services\FontService;
use Inertia\Inertia;
use Illuminate\Support\Str;

class FontsController extends Controller
{
    public function index(FontService $fontService)
    {
        $fonts = collect($fontService->getFonts())->map(fn ($f) => [
            'id' => $f['id'],
            'name' => "font-{$f['id']}",
            'title' => $f['family'],
            'fontFamily' => "'{$f['family']}', {$f['category']}",
            'fontProvider' => $f['type'],
            'fontImport' => Str::studly($f['family']),
            'fontVariable' => "--font-{$f['id']}",
            'fontWeight' => $f['weights'],
            'fontSubsets' => $f['subsets'],
            'fontDependency' => ($f['variable'] ?? false) ? "@fontsource-variable/{$f['id']}" : "@fontsource/{$f['id']}",
            'category' => $f['category'],
        ])->values();

        return Inertia::render('fonts/index', [
            'fonts' => $fonts,
        ]);
    }
}
